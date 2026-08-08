import skyClouds from "@/assets/sky-clouds.png.asset.json";
import heroHouse from "@/assets/hero-house.png.asset.json";
import cloudStrip from "@/assets/cloud-strip.png.asset.json";
import shadowOverlay from "@/assets/shadow-overlay.png.asset.json";
import mapImg from "@/assets/map.png.asset.json";
import logoMark from "@/assets/logo-mark.png.asset.json";
import prop1 from "@/assets/prop-1.png.asset.json";
import prop2 from "@/assets/prop-2.png.asset.json";
import prop3 from "@/assets/prop-3.png.asset.json";
import prop4 from "@/assets/prop-4.png.asset.json";
import prop5 from "@/assets/prop-5.png.asset.json";
import prop6 from "@/assets/prop-6.jpeg.asset.json";
import prop7 from "@/assets/prop-7.jpeg.asset.json";
import houseHillside from "@/assets/house-hillside.png.asset.json";
import houseWater from "@/assets/house-water.png.asset.json";
import houseModern from "@/assets/house-modern.png.asset.json";
import houseWhite from "@/assets/house-white.png.asset.json";
import houseTerrace from "@/assets/house-terrace.png.asset.json";
import houseGlass from "@/assets/house-glass.png.asset.json";
import houseCube from "@/assets/house-cube.png.asset.json";
import person1 from "@/assets/person-1.png.asset.json";
import person2 from "@/assets/person-2.png.asset.json";
import person3 from "@/assets/person-3.png.asset.json";
import person4 from "@/assets/person-4.png.asset.json";
import person5 from "@/assets/person-5.png.asset.json";
import person6 from "@/assets/person-6.png.asset.json";
import personRed from "@/assets/person-red.png.asset.json";
import showcaseVideo from "@/assets/showcase.mp4.asset.json";
import anteraLogo from "@/assets/antera-logo.png.asset.json";
import masterPlan from "@/assets/avatar2-master-plan.jpeg.asset.json";
import avatar2Deck from "@/assets/Aspirealty_Avatar_2_Presentation.pdf.asset.json";
import magnusBrochure from "@/assets/Magnus_SmartCity_E-Brochure.pdf.asset.json";
import marvelBrochure from "@/assets/Marvel-Smart-City-Luxury-Villa-Plots_updt.pdf.asset.json";
import avatar2Price from "@/assets/New.._Price_Structure_Avatar-2.pdf.asset.json";
import magnusRera from "@/assets/TG_RERA_APPROVED_CERTIFICATE-8.pdf.asset.json";

export const ASSETS = {
  sky: skyClouds.url,
  heroHouse: heroHouse.url,
  cloudStrip: cloudStrip.url,
  shadow: shadowOverlay.url,
  map: mapImg.url,
  logo: logoMark.url,
  anteraLogo: anteraLogo.url,
  masterPlan: masterPlan.url,
  docs: {
    avatar2Deck: avatar2Deck.url,
    avatar2Price: avatar2Price.url,
    marvelBrochure: marvelBrochure.url,
    magnusBrochure: magnusBrochure.url,
    magnusRera: magnusRera.url,
  },
  props: [prop1.url, prop2.url, prop3.url, prop4.url, prop5.url, prop6.url, prop7.url],
  houses: {
    hillside: houseHillside.url,
    water: houseWater.url,
    modern: houseModern.url,
    white: houseWhite.url,
    terrace: houseTerrace.url,
    glass: houseGlass.url,
    cube: houseCube.url,
  },
  people: [
    person1.url,
    person2.url,
    person3.url,
    person4.url,
    person5.url,
    person6.url,
    personRed.url,
  ],
  video: showcaseVideo.url,
} as const;