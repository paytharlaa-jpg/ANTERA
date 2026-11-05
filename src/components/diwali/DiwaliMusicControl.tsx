"use client";

import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Music, Sparkles } from "lucide-react";

interface DiwaliMusicControlProps {
  className?: string;
}

export function DiwaliMusicControl({ className = "" }: DiwaliMusicControlProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(0.5);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const synthNodesRef = useRef<{
    oscillators: OscillatorNode[];
    gainNodes: GainNode[];
    masterGain: GainNode | null;
  }>({
    oscillators: [],
    gainNodes: [],
    masterGain: null,
  });

  // Load saved preference
  useEffect(() => {
    try {
      const savedMute = localStorage.getItem("antera_diwali_music_muted");
      if (savedMute !== null) {
        setIsMuted(savedMute === "true");
      }
      const savedVol = localStorage.getItem("antera_diwali_volume");
      if (savedVol !== null) {
        const v = parseFloat(savedVol);
        if (!isNaN(v) && v >= 0 && v <= 1) setVolume(v);
      }
    } catch {
      // Storage unavailable in private browsing mode
    }
  }, []);

  // Web Audio Synth Fallback (Authentic gentle Tanpura drone & festive chords in D-Major/Bhairav)
  const startSynthDrone = () => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;

      if (!audioContextRef.current) {
        audioContextRef.current = new AudioCtx();
      }

      const ctx = audioContextRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      // Stop existing synth
      stopSynthDrone();

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(isMuted ? 0 : volume * 0.22, ctx.currentTime);
      masterGain.connect(ctx.destination);
      synthNodesRef.current.masterGain = masterGain;

      // Resonant lowpass filter to produce deep acoustic warmth
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(420, ctx.currentTime);
      filter.connect(masterGain);

      // Frequencies for traditional D-Tanpura tuning (Sa-Pa drone: D2=73.42Hz, A2=110.0Hz, D3=146.83Hz, F#3=185Hz)
      const droneNotes = [73.42, 110.0, 146.83, 185.0];

      droneNotes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const noteGain = ctx.createGain();

        // Warm harmonic wave
        osc.type = idx % 2 === 0 ? "sawtooth" : "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // Gentle undulating volume modulation simulating acoustic string strumming
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.setValueAtTime(0.2 + idx * 0.08, ctx.currentTime);
        lfoGain.gain.setValueAtTime(0.04, ctx.currentTime);
        lfo.connect(lfoGain);
        lfoGain.connect(noteGain.gain);
        lfo.start();

        noteGain.gain.setValueAtTime(0.08 / (idx + 1), ctx.currentTime);
        osc.connect(filter);
        osc.start();

        synthNodesRef.current.oscillators.push(osc);
        synthNodesRef.current.gainNodes.push(noteGain);
      });
    } catch {
      // Audio synth not supported, silent fallback
    }
  };

  const stopSynthDrone = () => {
    try {
      synthNodesRef.current.oscillators.forEach((osc) => {
        try {
          osc.stop();
          osc.disconnect();
        } catch {
          // Ignore
        }
      });
      synthNodesRef.current.oscillators = [];
      synthNodesRef.current.gainNodes = [];
      if (synthNodesRef.current.masterGain) {
        synthNodesRef.current.masterGain.disconnect();
        synthNodesRef.current.masterGain = null;
      }
    } catch {
      // Ignore
    }
  };

  // Toggle playback
  const togglePlay = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    try {
      localStorage.setItem("antera_diwali_music_muted", String(nextMuted));
    } catch {
      // Ignore
    }

    if (nextMuted) {
      setIsPlaying(false);
      if (audioRef.current) {
        audioRef.current.pause();
      }
      stopSynthDrone();
    } else {
      setIsPlaying(true);
      // Attempt audio file playback first
      if (!audioRef.current) {
        const audio = new Audio("/audio/diwali-instrumental.mp3");
        audio.loop = true;
        audio.volume = volume;
        audio.onerror = () => {
          // File not found -> seamless fallback to warm Indian ambient synth drone
          audioRef.current = null;
          startSynthDrone();
        };
        audioRef.current = audio;
      }

      audioRef.current
        .play()
        .then(() => {
          if (audioRef.current) audioRef.current.volume = volume;
        })
        .catch(() => {
          // Autoplay blocked or file missing -> fallback to synth
          startSynthDrone();
        });
    }
  };

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    try {
      localStorage.setItem("antera_diwali_volume", String(newVol));
    } catch {
      // Ignore
    }
    if (audioRef.current) {
      audioRef.current.volume = newVol;
    }
    if (synthNodesRef.current.masterGain && audioContextRef.current) {
      synthNodesRef.current.masterGain.gain.setValueAtTime(
        isMuted ? 0 : newVol * 0.22,
        audioContextRef.current.currentTime,
      );
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      stopSynthDrone();
      if (audioContextRef.current && audioContextRef.current.state !== "closed") {
        try {
          audioContextRef.current.close();
        } catch {
          // Ignore
        }
      }
    };
  }, []);

  return (
    <div
      className={`relative inline-flex items-center gap-2 ${className}`}
      onMouseEnter={() => setShowVolumeSlider(true)}
      onMouseLeave={() => setShowVolumeSlider(false)}
    >
      <button
        type="button"
        onClick={togglePlay}
        aria-label={isMuted ? "Play festive Diwali celebration music" : "Mute festive music"}
        className="group relative flex h-11 items-center gap-2.5 rounded-full border border-[#D4AF37]/40 bg-[#100C18]/80 px-4 text-xs font-semibold uppercase tracking-wider text-[#F6D88B] backdrop-blur-md transition-all duration-300 hover:border-[#D4AF37] hover:bg-[#1A122A] hover:shadow-[0_0_20px_rgba(212,175,55,0.35)] focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-2 focus:ring-offset-[#100C18]"
      >
        <span className="relative flex h-3 w-3 items-center justify-center">
          {!isMuted && (
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FFB547] opacity-75" />
          )}
          <span
            className={`relative inline-flex h-2 w-2 rounded-full ${
              !isMuted ? "bg-[#FFB547]" : "bg-white/40"
            }`}
          />
        </span>

        {isMuted ? (
          <VolumeX className="h-4 w-4 text-[#F6D88B]/70 transition-transform group-hover:scale-110" />
        ) : (
          <Volume2 className="h-4 w-4 text-[#FFB547] transition-transform group-hover:scale-110" />
        )}

        <span className="hidden sm:inline">
          {isMuted ? "Festive Music" : "Festive Melody Playing"}
        </span>

        <Sparkles className="h-3 w-3 text-[#D4AF37]/60 transition-transform group-hover:rotate-45" />
      </button>

      {/* Volume slider tooltip */}
      {showVolumeSlider && !isMuted && (
        <div className="absolute -bottom-12 left-0 flex items-center gap-2 rounded-xl border border-[#D4AF37]/30 bg-[#100C18]/95 px-3 py-1.5 shadow-xl backdrop-blur-md z-50">
          <Music className="h-3 w-3 text-[#D4AF37]" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
            aria-label="Diwali music volume"
            className="h-1.5 w-18 accent-[#D4AF37] cursor-pointer bg-white/20 rounded-lg"
          />
          <span className="text-[10px] text-[#F6D88B]/80 font-mono">
            {Math.round(volume * 100)}%
          </span>
        </div>
      )}
    </div>
  );
}
