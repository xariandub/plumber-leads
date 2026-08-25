import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { WhyUs } from "@/components/WhyUs";
import { Reviews } from "@/components/Reviews";
import { ServiceArea } from "@/components/ServiceArea";
import { LeadForm } from "@/components/LeadForm";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <WhyUs />
      <Reviews />
      <ServiceArea />
      <LeadForm />
    </>
  );
}
