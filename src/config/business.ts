// Single source of truth for the business's contact info, service menu, and
// hours. Edit this file to rebrand the site — every component reads from it.

export const business = {
  name: "[Your Plumbing Co.]",
  tagline: "Fast, Honest Plumbing — Day or Night",
  phone: "(555) 123-4567",
  // Use the E.164 form for `tel:` links (e.g. +15551234567).
  phoneTel: "+15551234567",
  email: "leads@yourplumbingco.com",
  area: "Greater [City] Area",
  hours: "24/7 Emergency Service",
  license: "License #PL-000000",
  insured: "Licensed • Bonded • Insured",
  yearsInBusiness: 15,
  responseMinutes: 30,
  services: [
    "Burst pipes",
    "Drain cleaning",
    "Water heater repair & install",
    "Sewer line service",
    "Fixture installs",
    "Leak detection",
  ] as const,
} as const;

export type Service = (typeof business.services)[number];
