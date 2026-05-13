import type { Metadata } from "next";

import PricingPage from "../../components/pricing/pricing-page";
import { siteConfig } from "../site-config";

export const metadata: Metadata = {
  title: `Цени 2026 | ${siteConfig.name}`,
  description:
    "Пълен ценораспис по категории за довършителни работи, ВиК, ремонти на бани, замазки, гипсокартон, мазилки и електроинсталации във Варна.",
  alternates: {
    canonical: "/prices",
  },
  openGraph: {
    title: `Цени 2026 | ${siteConfig.name}`,
    description:
      "Разгледайте пълния ценораспис по категории и отворете директен линк към точния раздел за вашия обект във Варна.",
    url: "/prices",
    siteName: siteConfig.name,
    locale: "bg_BG",
    type: "website",
  },
};

export default function PricesRoute() {
  return <PricingPage />;
}
