import { createFileRoute } from "@tanstack/react-router";

import { FloatingWhatsApp } from "@/components/site/floating-whatsapp";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteNav } from "@/components/site/site-nav";
import { DISCLAIMER } from "@/lib/antera-data";
import { CONTACT } from "@/lib/projects";

export const Route = createFileRoute("/legal")({
  head: () => ({
    meta: [
      { title: "Privacy, Terms & Disclaimer | Antera Realty" },
      {
        name: "description",
        content: "Privacy policy, terms of use and disclaimer for the Antera Realty website.",
      },
    ],
    links: [{ rel: "canonical", href: "https://anterarealty.com/legal" }],
  }),
  component: LegalPage,
});

const SECTIONS = [
  {
    id: "privacy",
    title: "Privacy Policy",
    body: [
      "When you submit an enquiry on this website, the details you enter (name, phone number, optional email, project of interest and message) are placed into a WhatsApp message addressed to Antera Realty. Nothing is sent until you press Send in WhatsApp, and this website does not store your details on its own servers.",
      "We use the information you share only to respond to your enquiry, arrange site visits and share project information you have asked for. We do not sell your personal information.",
      `The map on this site is provided by Google Maps and the chat button opens WhatsApp; those services have their own privacy policies. To ask about or remove information you have shared with us, contact ${CONTACT.email} or ${CONTACT.phoneDisplay}.`,
    ],
  },
  {
    id: "terms",
    title: "Terms of Use",
    body: [
      "The content on this website is for general information about projects marketed by Antera Realty and does not constitute an offer, contract or commitment to sell.",
      "Prices, availability, layouts and specifications are indicative, are dated where shown, and may change without notice. Confirm all details with our team and the promoter before making any payment.",
      "Project names, logos and creatives belong to their respective promoters, including Mugdha Realty for Magnus Smart City and Mirai.",
    ],
  },
  {
    id: "disclaimer",
    title: "Disclaimer",
    body: [
      DISCLAIMER,
      "Approval and registration numbers are reproduced from the promoter’s certificates and official announcements. Each approval applies only to the specific project phase for which it was issued. TG RERA registrations can be verified at rera.telangana.gov.in.",
      "Architectural renders and lifestyle images are representational and are not photographs of the actual site. Nothing on this site is a promise of returns or appreciation.",
    ],
  },
];

function LegalPage() {
  return (
    <>
      <SiteNav overlay={false} />
      <main id="main" className="bg-background pb-24 pt-36 sm:pt-44">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <aside className="lg:col-span-3">
            <nav className="flex flex-col gap-2 lg:sticky lg:top-32" aria-label="Legal sections">
              {SECTIONS.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  {s.title}
                </a>
              ))}
            </nav>
          </aside>
          <div className="flex flex-col gap-16 lg:col-span-8">
            <h1 className="big-title">Legal</h1>
            {SECTIONS.map((s) => (
              <section key={s.id} id={s.id} className="flex scroll-mt-28 flex-col gap-5">
                <h2 className="font-display text-3xl">{s.title}</h2>
                {s.body.map((p) => (
                  <p
                    key={p.slice(0, 32)}
                    className="max-w-3xl text-base leading-relaxed text-foreground/75"
                  >
                    {p}
                  </p>
                ))}
              </section>
            ))}
            <p className="text-xs text-muted-foreground">Last updated: November 2026</p>
          </div>
        </div>
      </main>
      <SiteFooter />
      <FloatingWhatsApp />
    </>
  );
}
