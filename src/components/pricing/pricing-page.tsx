"use client";

import { type RefObject, useEffect, useMemo, useRef, useState } from "react";

import { siteConfig } from "../../app/site-config";
import { FloatingPhoneButton, SiteFooter, SiteHeader } from "../landing/sections";
import {
  type PricingCategory,
  defaultPricingCategorySlug,
  pricingCategories,
  pricingRoute,
  resolvePricingCategorySlug,
} from "./data";
import styles from "./pricing-page.module.css";

const pricingCategoryMap = new Map(pricingCategories.map((category) => [category.slug, category]));

const pricingNavigationLinks = [
  { href: "/#services", label: "Услуги" },
  { href: pricingRoute, label: "Цени" },
  { href: "/#gallery", label: "Галерия" },
  { href: "/#reviews", label: "Отзиви" },
  { href: "/#contact", label: "Контакти" },
];

function getCategoryFromHash(hash: string) {
  return resolvePricingCategorySlug(hash.replace(/^#/, ""));
}

function formatCellValue(value?: string) {
  return value ?? "—";
}

function joinClassNames(...classNames: Array<string | false | null | undefined>) {
  return classNames.filter(Boolean).join(" ");
}

function PricingTabIcon({ slug, className }: { slug: string; className?: string }) {
  switch (slug) {
    case "finishing-works":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <path
            d="M5 7.25A2.25 2.25 0 0 1 7.25 5h9.5A2.25 2.25 0 0 1 19 7.25v9.5A2.25 2.25 0 0 1 16.75 19h-9.5A2.25 2.25 0 0 1 5 16.75v-9.5Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path d="M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M12 5v14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "floor-screeds":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <path
            d="M4.5 9.5 12 5l7.5 4.5-7.5 4.5L4.5 9.5Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="M7 13.5 12 16.5l5-3"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path d="M7 17l5 3 5-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "plumbing":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <path
            d="M12 4c2.7 3.3 4 5.4 4 7.3A4 4 0 1 1 8 11.3C8 9.4 9.3 7.3 12 4Z"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <path d="M12 17.5v2.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "bathroom-renovation":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <path
            d="M7 9.5h10a2 2 0 0 1 2 2V13H5v-1.5a2 2 0 0 1 2-2Z"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <path d="M7 13v1a5 5 0 0 0 10 0v-1" stroke="currentColor" strokeWidth="1.8" />
          <path d="M8 7V5.5A1.5 1.5 0 0 1 9.5 4H11" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      );
    case "microcement":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <path
            d="M12 4.5l1.7 4.3L18 10.5l-4.3 1.7L12 16.5l-1.7-4.3L6 10.5l4.3-1.7L12 4.5Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="m18.5 4-.5 1.3L16.7 6l1.3.7.5 1.3.5-1.3L20.3 6 19 5.3 18.5 4Z"
            fill="currentColor"
          />
        </svg>
      );
    case "drywall":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <rect x="5" y="4" width="14" height="16" rx="2" stroke="currentColor" strokeWidth="1.8" />
          <path d="M12 4v16" stroke="currentColor" strokeWidth="1.8" />
          <path d="M8.5 8h1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M14.5 8h1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "plastering":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <path
            d="M5 16.5 13.5 8l4.5 4.5-8.5 8.5H5v-4.5Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path d="M14.5 7l2-2 2.5 2.5-2 2" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      );
    case "electrical":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <path
            d="M13 3 7 13h4l-1 8 7-11h-4l1-7Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
      );
    default:
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className={className}
          aria-hidden="true"
          stroke="currentColor"
          strokeWidth="1.7"
        >
          <circle cx="12" cy="12" r="7" />
        </svg>
      );
  }
}

export default function PricingPage() {
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLElement>(null);
  const tabsShellRef = useRef<HTMLDivElement>(null);
  const navTabsRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const [isNavScrolled, setIsNavScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSlug, setActiveSlug] = useState(defaultPricingCategorySlug);
  const [isTabsDocked, setIsTabsDocked] = useState(false);
  const fallbackCategory = pricingCategories[0];

  if (!fallbackCategory) {
    return null;
  }

  useEffect(() => {
    const onScroll = () => {
      setIsNavScrolled(window.scrollY > 30);

      if (window.innerWidth <= 1024 || !tabsShellRef.current) {
        setIsTabsDocked(false);
        return;
      }

      setIsTabsDocked(tabsShellRef.current.getBoundingClientRect().top <= 92);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return;
    }

    const onDocumentClick = (event: MouseEvent) => {
      if (!(event.target instanceof Node)) {
        return;
      }

      if (navRef.current?.contains(event.target) || mobileMenuRef.current?.contains(event.target)) {
        return;
      }

      setIsMobileMenuOpen(false);
    };

    document.addEventListener("click", onDocumentClick);

    return () => {
      document.removeEventListener("click", onDocumentClick);
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const syncFromHash = () => {
      const rawHash = window.location.hash.replace(/^#/, "");
      const hashCategory = getCategoryFromHash(window.location.hash);

      if (!hashCategory) {
        return;
      }

      setActiveSlug(hashCategory);

      if (window.location.pathname !== pricingRoute || rawHash !== hashCategory) {
        window.history.replaceState(null, "", `${pricingRoute}#${hashCategory}`);
      }
    };

    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);

    return () => {
      window.removeEventListener("hashchange", syncFromHash);
    };
  }, []);

  useEffect(() => {
    const shellRefs = isTabsDocked ? [tabsShellRef, navTabsRef] : [tabsShellRef];

    for (const shellRef of shellRefs) {
      const activeTab = shellRef.current?.querySelector<HTMLElement>(
        `[data-pricing-tab="${activeSlug}"]`,
      );

      activeTab?.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [activeSlug, isTabsDocked]);

  const activeCategory = pricingCategoryMap.get(activeSlug) ?? fallbackCategory;

  const totalItems = useMemo(
    () => activeCategory.sections.reduce((count, section) => count + section.items.length, 0),
    [activeCategory],
  );

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((current) => !current);
  };

  const scrollToPanelTop = () => {
    if (!panelRef.current) {
      return;
    }

    const navHeight = navRef.current?.getBoundingClientRect().height ?? 76;
    const tabsHeight =
      window.innerWidth <= 1024 ? (tabsShellRef.current?.getBoundingClientRect().height ?? 0) : 0;
    const top =
      panelRef.current.getBoundingClientRect().top + window.scrollY - navHeight - tabsHeight - 20;

    window.scrollTo({
      top: Math.max(top, 0),
      behavior: "smooth",
    });
  };

  const selectCategory = (category: PricingCategory) => {
    setActiveSlug(category.slug);
    window.history.replaceState(null, "", `${pricingRoute}#${category.slug}`);

    window.requestAnimationFrame(() => {
      scrollToPanelTop();
    });
  };

  const renderTabs = (variant: "inline" | "nav", shellRef?: RefObject<HTMLDivElement | null>) => {
    const isNavVariant = variant === "nav";

    return (
      <div
        ref={shellRef}
        className={joinClassNames(styles.tabsShell, isNavVariant && styles.tabsShellNav)}
      >
        <div
          className={joinClassNames(styles.tabs, isNavVariant && styles.tabsNav)}
          role="tablist"
          aria-label="Категории цени"
        >
          {pricingCategories.map((category) => (
            <button
              key={`${variant}-${category.slug}`}
              id={`pricing-tab-${variant}-${category.slug}`}
              type="button"
              role="tab"
              data-pricing-tab={category.slug}
              aria-selected={category.slug === activeCategory.slug}
              aria-controls={`pricing-panel-${category.slug}`}
              className={joinClassNames(
                styles.tabButton,
                isNavVariant && styles.tabButtonNav,
                category.slug === activeCategory.slug && styles.tabButtonActive,
              )}
              onClick={() => selectCategory(category)}
            >
              <span className={joinClassNames(styles.tabTop, isNavVariant && styles.tabTopNav)}>
                <PricingTabIcon
                  slug={category.slug}
                  className={joinClassNames(styles.tabIcon, isNavVariant && styles.tabIconNav)}
                />
                <span
                  className={joinClassNames(styles.tabLabel, isNavVariant && styles.tabLabelNav)}
                >
                  {category.tabLabel}
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={styles.pageShell}>
      <FloatingPhoneButton />
      <SiteHeader
        isNavScrolled={isNavScrolled}
        isMobileMenuOpen={isMobileMenuOpen}
        navRef={navRef}
        mobileMenuRef={mobileMenuRef}
        onToggleMobileMenu={toggleMobileMenu}
        onCloseMobileMenu={closeMobileMenu}
        brandHref="/"
        ctaHref="/#contact"
        links={pricingNavigationLinks}
        secondaryContent={renderTabs("nav", navTabsRef)}
        isSecondaryContentVisible={isTabsDocked}
      />

      <main className={styles.page}>
        <section className={styles.hero}>
          <div className="container">
            <div className={styles.heroShell}>
              <div className={styles.heroCopy}>
                <div className="section-eyebrow">Цени 2026</div>
                <h1 className={styles.title}>Пълен ценораспис</h1>
                <p className="lead">
                  Изберете категория и вижте цените подредени като в официалния PDF.
                </p>

                <div className={styles.heroActions}>
                  <a
                    href={activeCategory.pdfHref}
                    className="btn btn-primary"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Отвори PDF
                  </a>
                </div>
              </div>

              <aside className={styles.heroAside}>
                <div className={styles.activeEyebrow}>{activeCategory.subtitle}</div>
                <h2 className={styles.activeTitle}>{activeCategory.title}</h2>
                <p className={styles.activeSummary}>{activeCategory.summary}</p>
                <div className={styles.activeMeta}>
                  {activeCategory.sections.length} секции · {totalItems} позиции
                </div>

                <ul className={styles.highlightList}>
                  {activeCategory.highlights.map((highlight) => (
                    <li key={highlight} className={styles.highlightItem}>
                      {highlight}
                    </li>
                  ))}
                </ul>

                {activeCategory.featuredValue ? (
                  <div className={styles.featuredBlock}>
                    <div className={styles.featuredValue}>{activeCategory.featuredValue}</div>
                    <div className={styles.featuredLabel}>{activeCategory.featuredLabel}</div>
                  </div>
                ) : null}
              </aside>
            </div>
          </div>
        </section>

        <section className={styles.contentSection}>
          <div className="container">
            {renderTabs("inline", tabsShellRef)}

            <section
              ref={panelRef}
              id={`pricing-panel-${activeCategory.slug}`}
              role="tabpanel"
              aria-label={activeCategory.title}
              className={styles.panel}
            >
              <div className={styles.panelHeader}>
                <div className={styles.panelHeaderMain}>
                  <div className={styles.panelEyebrow}>Категория</div>
                  <h2 className={styles.panelTitle}>{activeCategory.title}</h2>
                  <p className={styles.panelSummary}>{activeCategory.summary}</p>
                  <div className={styles.panelMeta}>
                    {activeCategory.sections.length} секции · {totalItems} позиции
                  </div>
                </div>

                <div className={styles.overviewActions}>
                  <a
                    href={activeCategory.pdfHref}
                    className={styles.inlineAction}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Виж PDF файла
                  </a>
                </div>
              </div>

              {activeCategory.note ? (
                <div className={styles.noteBox}>
                  <strong>Важно:</strong> {activeCategory.note}
                </div>
              ) : null}

              <div className={styles.sections}>
                {activeCategory.sections.map((section) => (
                  <article key={section.title} className={styles.sectionCard}>
                    <div className={styles.sectionHeader}>
                      <div>
                        <div className={styles.sectionKicker}>Раздел</div>
                        <h3 className={styles.sectionTitle}>{section.title}</h3>
                      </div>
                      {section.description ? (
                        <p className={styles.sectionDescription}>{section.description}</p>
                      ) : null}
                    </div>

                    <div className={styles.tableWrap}>
                      <table className={styles.pricingTable}>
                        <thead>
                          <tr>
                            <th>Услуга</th>
                            <th>Единица</th>
                            <th>Труд</th>
                            <th>Материали</th>
                            <th>Общо</th>
                          </tr>
                        </thead>
                        <tbody>
                          {section.items.map((item) => (
                            <tr key={`${section.title}-${item.title}`}>
                              <th scope="row" className={styles.serviceCell}>
                                <span className={styles.serviceName}>{item.title}</span>
                                {item.description ? (
                                  <span className={styles.serviceDescription}>
                                    {item.description}
                                  </span>
                                ) : null}
                              </th>
                              <td data-label="Единица">{formatCellValue(item.unit)}</td>
                              <td data-label="Труд">{formatCellValue(item.labor)}</td>
                              <td data-label="Материали">{formatCellValue(item.materials)}</td>
                              <td data-label="Общо">{formatCellValue(item.total)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </section>

        <section className={styles.bottomCta}>
          <div className="container">
            <div className={styles.bottomCtaCard}>
              <div>
                <div className={styles.bottomCtaEyebrow}>Нужна е точна оферта?</div>
                <h2 className={styles.bottomCtaTitle}>
                  Ще подготвим конкретна цена за вашия обект.
                </h2>
                <p className={styles.bottomCtaText}>
                  Изпратете размери, снимки или заявка за оглед и ще получите ясна оферта без неясни
                  позиции.
                </p>
              </div>

              <div className={styles.bottomCtaActions}>
                <a
                  href={siteConfig.phoneHref}
                  className={`btn btn-primary ${styles.bottomActionButton}`}
                >
                  📞 {siteConfig.phoneDisplay}
                </a>
                <a
                  href="/#contact"
                  className={`btn btn-outline ${styles.bottomActionButton} ${styles.bottomActionButtonSecondary}`}
                >
                  Поискай оферта
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter sectionLinkPrefix="/" />
    </div>
  );
}
