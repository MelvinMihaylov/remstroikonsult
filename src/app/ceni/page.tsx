"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import {
  defaultPricingCategorySlug,
  pricingRoute,
  resolvePricingCategorySlug,
} from "../../components/pricing/data";

export default function LegacyPricesRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    const rawHash = window.location.hash.replace(/^#/, "");
    const slug = resolvePricingCategorySlug(rawHash) ?? defaultPricingCategorySlug;

    router.replace(rawHash ? `${pricingRoute}#${slug}` : pricingRoute);
  }, [router]);

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "2rem",
        textAlign: "center",
        background: "linear-gradient(180deg, #f8fafc 0%, #eef3f9 100%)",
      }}
    >
      <div>
        <p style={{ color: "#5b6478", marginBottom: "0.8rem" }}>Пренасочваме към новия адрес…</p>
        <Link href={pricingRoute} style={{ color: "#0f2744", fontWeight: 600 }}>
          Продължи към пълния ценораспис
        </Link>
      </div>
    </main>
  );
}
