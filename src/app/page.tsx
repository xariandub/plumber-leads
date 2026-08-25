import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Stats } from "@/components/Stats";
import { Services } from "@/components/Services";
import { Process } from "@/components/Process";
import { Reviews } from "@/components/Reviews";
import { ServiceArea } from "@/components/ServiceArea";
import { LeadForm } from "@/components/LeadForm";

const MARQUEE_PHRASES = [
  "Licensed",
  `${30}-min response`,
  "No-surprise pricing",
  "Bonded",
  "Insured",
  "Family-owned",
  "Available 24/7",
  "Background-checked techs",
  "Written warranty",
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee items={MARQUEE_PHRASES} duration={45} />
      <Stats />
      <Services />
      <Process />
      <Reviews />
      <ServiceArea />
      <LeadForm />
    </>
  );
}
