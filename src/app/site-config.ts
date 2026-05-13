const defaultSiteUrl = "https://remstroikonsult.com";

export const siteConfig = {
  name: "Ремстрой Консулт",
  title: "Ремстрой Консулт Варна | Професионални ремонти и довършителни работи",
  description:
    "Ремстрой Консулт – премиум строителна фирма във Варна. Лепене на плочки, ВиК, замазки, гипсокартон, бани до ключ. Безплатна консултация ☎ 0896 153 160",
  keywords: [
    "строителна фирма Варна",
    "лепене плочки Варна",
    "ВиК Варна",
    "замазки Варна",
    "гипсокартон Варна",
    "баня до ключ Варна",
    "ремонт Варна",
    "микроцимент Варна",
    "Ремстрой Консулт",
  ],
  phoneDisplay: "0896 153 160",
  phoneHref: "tel:0896153160",
  email: "peturvulkov1963@gmail.com",
  serviceArea: "гр. Варна и региона",
  defaultSiteUrl,
};

export function getSiteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? defaultSiteUrl).replace(/\/$/, "");
}
