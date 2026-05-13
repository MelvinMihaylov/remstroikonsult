import type { CSSProperties, FormEventHandler, ReactNode, RefObject } from "react";

import { siteConfig } from "../../app/site-config";
import { pricingRoute } from "../pricing/data";
import {
  aboutPoints,
  contactFormAction,
  contactFormSubject,
  footerSeoText,
  heroCardItems,
  heroStats,
  navLinks,
  priceCards,
  reviews,
  serviceOptions,
  services,
  trustItems,
} from "./content";

const navButtonStyle: CSSProperties = {
  padding: "0.6rem 1.4rem",
  fontSize: "0.875rem",
};

const mobilePhoneStyle: CSSProperties = {
  color: "var(--copper)",
  fontWeight: 600,
  marginTop: "0.5rem",
};

const centeredLeadStyle: CSSProperties = {
  textAlign: "center",
  margin: "1rem auto 0",
};

const heroCardCtaStyle: CSSProperties = {
  background: "var(--copper)",
  color: "white",
  borderRadius: "8px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.5rem",
  padding: "1rem",
  fontWeight: 600,
  fontSize: "0.95rem",
  transition: "background 0.25s",
  textDecoration: "none",
};

const footerSeoStyle: CSSProperties = {
  marginTop: "1.5rem",
};

const ctaActionsStyle: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  gap: "1rem",
  flexWrap: "wrap",
};

const phoneNumber = siteConfig.phoneHref.replace("tel:", "");
const viberHref = `viber://chat?number=${phoneNumber}`;
const navPhoneDisplay = siteConfig.phoneDisplay.replace(/ /g, "\u00A0");

type SubmissionState = {
  kind: "success" | "error";
  message: string;
} | null;

type SiteHeaderProps = {
  isNavScrolled: boolean;
  isMobileMenuOpen: boolean;
  navRef: RefObject<HTMLElement | null>;
  mobileMenuRef: RefObject<HTMLElement | null>;
  onToggleMobileMenu: () => void;
  onCloseMobileMenu: () => void;
  brandHref?: string;
  ctaHref?: string;
  links?: typeof navLinks;
  secondaryContent?: ReactNode;
  isSecondaryContentVisible?: boolean;
};

type ContactSectionProps = {
  formRef: RefObject<HTMLFormElement | null>;
  formStatus: SubmissionState;
  isSubmitting: boolean;
  onSubmit: FormEventHandler<HTMLFormElement>;
};

function joinClassNames(...classNames: Array<string | false | null | undefined>) {
  return classNames.filter(Boolean).join(" ");
}

function resolveSectionHref(href: string, prefix?: string) {
  if (!prefix || !href.startsWith("#")) {
    return href;
  }

  return `${prefix}${href}`;
}

function CurrentYear() {
  const year = new Date().getFullYear();

  return (
    <time dateTime={String(year)} suppressHydrationWarning>
      {year}
    </time>
  );
}

export function FloatingPhoneButton() {
  return (
    <a href={siteConfig.phoneHref} className="float-phone" title="Обади се">
      📞
    </a>
  );
}

export function SiteHeader({
  isNavScrolled,
  isMobileMenuOpen,
  navRef,
  mobileMenuRef,
  onToggleMobileMenu,
  onCloseMobileMenu,
  brandHref = "#hero",
  ctaHref = "#contact",
  links = navLinks,
  secondaryContent,
  isSecondaryContentVisible = false,
}: SiteHeaderProps) {
  return (
    <header>
      <nav
        ref={navRef}
        className={joinClassNames(
          "nav",
          isNavScrolled && "scrolled",
          Boolean(secondaryContent) && "nav-with-secondary",
          isSecondaryContentVisible && "nav-secondary-open",
        )}
        id="mainNav"
      >
        <div className="nav-inner">
          <a href={brandHref} className="nav-brand">
            <div className="nav-brand-mark">
              <img
                src="/images/remstroi/remstroi-logo.png"
                alt={`${siteConfig.name} лого`}
                className="nav-brand-logo"
              />
            </div>
            <div className="nav-brand-name">
              <span className="nav-brand-top">{siteConfig.name}</span>
              <span className="nav-brand-sub">Варна</span>
            </div>
          </a>

          <div className="nav-center">
            <ul className="nav-links">
              {links.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="nav-cta">
            <a href={siteConfig.phoneHref} className="nav-phone-link">
              <span>📞</span> {navPhoneDisplay}
            </a>
            <a href={ctaHref} className="btn btn-primary" style={navButtonStyle}>
              Безплатна оферта
            </a>
          </div>

          {secondaryContent ? (
            <div className="nav-secondary" aria-hidden={!isSecondaryContentVisible}>
              <div className="nav-secondary-inner">{secondaryContent}</div>
            </div>
          ) : null}

          <button
            type="button"
            className="hamburger"
            id="hamburger"
            aria-label="Меню"
            aria-controls="mobileMenu"
            aria-expanded={isMobileMenuOpen}
            onClick={onToggleMobileMenu}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      <nav
        ref={mobileMenuRef}
        className={joinClassNames("mobile-menu", isMobileMenuOpen && "open")}
        id="mobileMenu"
      >
        {links.map((link) => (
          <a key={link.href} href={link.href} onClick={onCloseMobileMenu}>
            {link.label}
          </a>
        ))}
        <a href={siteConfig.phoneHref} onClick={onCloseMobileMenu} style={mobilePhoneStyle}>
          📞 {siteConfig.phoneDisplay}
        </a>
      </nav>
    </header>
  );
}

export function HeroSection() {
  return (
    <section id="hero" className="hero">
      <div className="hero-bg" />
      <div className="hero-image-layer" />
      <div className="hero-pattern" />

      <div className="hero-content">
        <div className="hero-badge">
          <span className="hero-badge-dot" />
          Строителна фирма · Варна
        </div>

        <h1 className="hero-title">
          Професионални
          <br />
          ремонти и
          <br />
          <span className="accent">довършителни работи</span>
          <br />
          във Варна
        </h1>

        <p className="hero-sub">
          Плочки, ВиК, замазки и бани до ключ –
          <br />
          качество, точност и коректност
        </p>

        <div className="hero-actions">
          <a href={siteConfig.phoneHref} className="btn btn-primary btn-lg">
            <span>📞</span> Обади се сега
          </a>
          <a href="#contact" className="btn btn-outline-white btn-lg">
            Поискай оферта
          </a>
        </div>

        <div className="hero-stats">
          {heroStats.map((stat) => (
            <div key={stat.label} className="stat">
              <div className="stat-num">
                {stat.value}
                <span>{stat.suffix}</span>
              </div>
              <div className="stat-lbl">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="hero-panel">
        <div className="hero-card">
          <div className="hero-card-title">Нашите услуги</div>
          <div className="hero-card-sub">Изберете услуга за бърза оценка</div>
          <div className="hero-card-items">
            {heroCardItems.map((item) => (
              <div key={item.name} className="hero-card-item">
                <div className="hci-icon">{item.icon}</div>
                <div>
                  <div className="hci-name">{item.name}</div>
                  <div className="hci-price">{item.price}</div>
                </div>
              </div>
            ))}
          </div>
          <a
            href={siteConfig.phoneHref}
            className="btn btn-copper hero-card-cta"
            style={heroCardCtaStyle}
          >
            📞 {siteConfig.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}

export function TrustBar() {
  return (
    <div className="trust-bar">
      <div className="trust-bar-inner">
        {trustItems.map((item) => (
          <div key={item.title} className="trust-item">
            <span className="trust-icon">{item.icon}</span>
            <div className="trust-text">
              <div className="trust-title">{item.title}</div>
              <div className="trust-desc">{item.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AboutSection() {
  return (
    <section className="about-strip">
      <div className="container">
        <div className="about-strip-inner">
          <div className="about-visual reveal">
            <img
              src="/images/remstroi/remstroi-about-main.png"
              alt={`${siteConfig.name} – строителни работи Варна`}
              className="about-main-img"
            />
            <div className="about-badge-card">
              <div className="about-badge-num">600+</div>
              <div className="about-badge-lbl">
                завършени
                <br />
                обекта
              </div>
            </div>
          </div>
          <div className="about-content reveal">
            <div className="section-eyebrow">За нас</div>
            <h2 className="headline">
              Строим с
              <br />
              отговорност
            </h2>
            <p className="lead" style={{ marginTop: "1rem" }}>
              Ремстрой Консулт е специализирана строителна фирма с над 15 години опит в довършителни
              работи, ВиК и ремонти на бани. Работим с проверени материали, опитен екип и ясни
              правила.
            </p>
            <div className="about-points">
              {aboutPoints.map((point) => (
                <div key={point.title} className="about-point">
                  <div className="about-point-icon">{point.icon}</div>
                  <div>
                    <div className="about-point-title">{point.title}</div>
                    <div className="about-point-text">{point.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ServicesSection() {
  return (
    <section className="section services-section" id="services">
      <div className="container">
        <div className="services-header reveal">
          <div className="section-eyebrow">Нашите услуги</div>
          <h2 className="headline">
            Шест специализирани
            <br />
            направления
          </h2>
          <p className="lead" style={centeredLeadStyle}>
            От единична ВиК точка до пълна реконструкция на баня – изпълняваме всичко с еднаква
            прецизност.
          </p>
        </div>
        <div className="services-grid">
          {services.map((service) => (
            <div
              key={service.number}
              className={joinClassNames("svc", "reveal", service.delayClass)}
            >
              <div className="svc-num">{service.number}</div>
              <div className="svc-icon">{service.icon}</div>
              <div className="svc-name">{service.name}</div>
              <p className="svc-desc">{service.description}</p>
              <div className="svc-tags">
                {service.tags.map((tag) => (
                  <span key={tag} className="svc-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PricesSection() {
  return (
    <section className="section prices-section" id="prices">
      <div className="container">
        <div className="prices-header reveal">
          <div className="section-eyebrow">Цени 2026</div>
          <h2 className="headline">
            Прозрачни цени
            <br />
            без изненади
          </h2>
          <p className="lead">
            Знаете точно какво плащате – преди да започнем. Всички цени са само за труд, ако не е
            упоменато друго.
          </p>
          <p className="prices-note">
            „Работим в по-висок ценови клас, защото залагаме на качество, прецизност и дълготрайни
            решения."
          </p>
        </div>

        <div className="prices-grid reveal">
          {priceCards.map((card) => (
            <div
              key={`${card.label}-${card.name}`}
              className={joinClassNames("price-cell", card.featured && "featured")}
            >
              <div className="price-cell-label">{card.label}</div>
              <div className="price-cell-name">{card.name}</div>
              <div className="price-range">
                <span className="price-from">{card.from}</span>
                <span className="price-to">{card.to}</span>
              </div>
              <div className="price-unit">{card.unit}</div>
              <ul className="price-includes">
                {card.includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="price-card-footer">
                <a href={`${pricingRoute}#${card.detailsSlug}`} className="price-card-link">
                  Виж ценораспис
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="prices-cta-box reveal">
          <p>
            <strong>Не сте сигурни какво ще струва вашият ремонт?</strong>
            <br />
            Обадете се или изпратете запитване – ще дойдем за безплатен оглед и ще ви дадем точна
            оферта в рамките на 24 часа.
          </p>
          <a href={siteConfig.phoneHref} className="btn btn-primary btn-lg">
            📞 {siteConfig.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}

export function ReviewsSection() {
  return (
    <section className="section reviews-section" id="reviews">
      <div className="container">
        <div className="reviews-header reveal">
          <div className="section-eyebrow">Отзиви</div>
          <h2 className="headline">
            Клиентите ни
            <br />
            препоръчват
          </h2>
          <p className="lead" style={{ textAlign: "center", margin: "0.8rem auto 0" }}>
            Реални отзиви от хора, доверили ни своите домове.
          </p>
        </div>
        <div className="reviews-grid">
          {reviews.map((review) => (
            <div
              key={review.name}
              className={joinClassNames(
                "review-card",
                review.featured && "featured-review",
                "reveal",
                review.delayClass,
              )}
            >
              <div className="review-quote-mark">"</div>
              <p className="review-text">{review.text}</p>
              <div className="review-meta">
                <div className="review-avatar">{review.initials}</div>
                <div>
                  <div className="review-name">{review.name}</div>
                  <div className="review-info">{review.info}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CtaSection() {
  return (
    <section className="cta-section">
      <div className="container">
        <div className="cta-inner reveal">
          <div className="section-eyebrow">Готови сте?</div>
          <h2 className="cta-headline">
            Свържете се с нас за
            <br />
            <span className="accent">безплатна консултация</span>
            <br />и оглед
          </h2>
          <p className="cta-sub">
            Обадете се или изпратете запитване. Отговаряме до 2 часа и организираме безплатен оглед
            на обекта.
          </p>
          <div style={ctaActionsStyle}>
            <a href={siteConfig.phoneHref} className="btn btn-primary btn-lg">
              📞 Обади се сега
            </a>
            <a href="#contact" className="btn btn-outline-white btn-lg">
              Изпрати запитване
            </a>
          </div>
          <div className="cta-contact-cards">
            <a href={siteConfig.phoneHref} className="cta-contact-card">
              <div className="ccc-icon">📞</div>
              <div>
                <div className="ccc-label">Телефон</div>
                <div className="ccc-value">{siteConfig.phoneDisplay}</div>
              </div>
            </a>
            <a href={viberHref} className="cta-contact-card">
              <div className="ccc-icon">💬</div>
              <div>
                <div className="ccc-label">Viber</div>
                <div className="ccc-value">{siteConfig.phoneDisplay}</div>
              </div>
            </a>
            <a href={`mailto:${siteConfig.email}`} className="cta-contact-card">
              <div className="ccc-icon">✉️</div>
              <div>
                <div className="ccc-label">Имейл</div>
                <div className="ccc-value">{siteConfig.email}</div>
              </div>
            </a>
          </div>
          <div className="cta-guarantee">
            ✅ Безплатен оглед · Без ангажимент · Отговор до 2 часа
          </div>
        </div>
      </div>
    </section>
  );
}

export function ContactSection({
  formRef,
  formStatus,
  isSubmitting,
  onSubmit,
}: ContactSectionProps) {
  return (
    <section className="section contact-section" id="contact">
      <div className="container">
        <div className="contact-grid">
          <div className="reveal">
            <div className="section-eyebrow">Контакти</div>
            <h2 className="headline">
              Заявете
              <br />
              безплатен оглед
            </h2>
            <p className="lead" style={{ marginTop: "0.8rem" }}>
              Свържете се с нас за безплатна консултация и оглед. Ще ви изготвим оферта до 24 часа.
            </p>
            <div className="contact-items">
              <div className="ci">
                <div className="ci-icon-wrap">📞</div>
                <div className="ci-body">
                  <div className="ci-label">Телефон</div>
                  <div className="ci-value">
                    <a href={siteConfig.phoneHref}>{siteConfig.phoneDisplay}</a>
                  </div>
                  <div className="ci-note">Пон–Пет 08:00–18:00, Събота до 14:00</div>
                </div>
              </div>
              <div className="ci">
                <div className="ci-icon-wrap">💬</div>
                <div className="ci-body">
                  <div className="ci-label">Viber</div>
                  <div className="ci-value">
                    <a href={viberHref}>{siteConfig.phoneDisplay}</a>
                  </div>
                  <div className="ci-note">Пишете и ще отговорим бързо</div>
                </div>
              </div>
              <div className="ci">
                <div className="ci-icon-wrap">✉️</div>
                <div className="ci-body">
                  <div className="ci-label">Имейл</div>
                  <div className="ci-value">
                    <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
                  </div>
                  <div className="ci-note">Отговаряме в рамките на деня</div>
                </div>
              </div>
              <div className="ci">
                <div className="ci-icon-wrap">📍</div>
                <div className="ci-body">
                  <div className="ci-label">Зона на работа</div>
                  <div className="ci-value">{siteConfig.serviceArea}</div>
                  <div className="ci-note">Приемаме обекти в Варна и околността</div>
                </div>
              </div>
            </div>
            <div className="contact-area">
              🗺️ Работим в Чайка, Бриз, Виница, Владислав, Левски, Централна Варна и всички квартали
            </div>
          </div>

          <div className="reveal d2">
            <div className="form-card">
              <div className="form-title">Изпрати запитване</div>
              <div className="form-sub">Попълнете формата и ще ви се обадим до 2 часа</div>
              <form
                ref={formRef}
                id="contactForm"
                action={contactFormAction}
                method="POST"
                noValidate
                onSubmit={onSubmit}
              >
                <input type="hidden" name="_subject" value={contactFormSubject} />
                <input type="hidden" name="_template" value="table" />
                <input type="hidden" name="_captcha" value="false" />
                <input
                  type="text"
                  name="_honey"
                  className="form-honey"
                  tabIndex={-1}
                  autoComplete="off"
                />
                <div className="form-row-2">
                  <div className="form-row">
                    <label htmlFor="contact-name">Вашето име *</label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      autoComplete="name"
                      placeholder="Иван Иванов"
                      required
                    />
                  </div>
                  <div className="form-row">
                    <label htmlFor="contact-phone">Телефон *</label>
                    <input
                      id="contact-phone"
                      type="tel"
                      name="phone"
                      autoComplete="tel"
                      placeholder="0896 153 160"
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <label htmlFor="contact-service">Услуга</label>
                  <select id="contact-service" name="service">
                    <option value="">Изберете услуга...</option>
                    {serviceOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-row">
                  <label htmlFor="contact-address">Адрес на обекта</label>
                  <input
                    id="contact-address"
                    type="text"
                    name="address"
                    autoComplete="street-address"
                    placeholder="Квартал / улица, Варна"
                  />
                </div>
                <div className="form-row">
                  <label htmlFor="contact-area">Площ (приблизително)</label>
                  <input
                    id="contact-area"
                    type="text"
                    name="area"
                    placeholder="напр. 8 м² баня, 60 м² апартамент..."
                  />
                </div>
                <div className="form-row">
                  <label htmlFor="contact-message">Описание</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    placeholder="Опишете какво искате да се направи, желан срок, специфики..."
                  />
                </div>
                <button type="submit" className="btn btn-navy form-submit" disabled={isSubmitting}>
                  {isSubmitting ? "Изпращане..." : "Изпрати запитване →"}
                </button>
                <output
                  className="form-success"
                  htmlFor="contact-name contact-phone contact-service contact-address contact-area contact-message"
                  aria-live="polite"
                  style={formStatus?.kind === "success" ? { display: "block" } : undefined}
                >
                  {formStatus?.kind === "success" ? formStatus.message : ""}
                </output>
                <div
                  className="form-error"
                  role="alert"
                  style={formStatus?.kind === "error" ? { display: "block" } : undefined}
                >
                  {formStatus?.kind === "error" ? formStatus.message : ""}
                </div>
                <p className="form-note">Без задължения. Огледът е напълно безплатен.</p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SiteFooter({ sectionLinkPrefix = "" }: { sectionLinkPrefix?: string }) {
  return (
    <footer>
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-brand-name">{siteConfig.name}</div>
            <div className="footer-brand-tagline">Строителна фирма · Варна</div>
            <div className="footer-brand-desc">
              Професионални ремонти и довършителни работи в Варна и региона.
            </div>
          </div>
          <div>
            <div className="footer-col-title">Услуги</div>
            <ul className="footer-links-list">
              {services.map((service) => (
                <li key={service.name}>
                  <a href={resolveSectionHref("#services", sectionLinkPrefix)}>{service.name}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="footer-col-title">Контакти</div>
            <ul className="footer-links-list">
              <li>
                <a href={siteConfig.phoneHref}>📞 {siteConfig.phoneDisplay}</a>
              </li>
              <li>
                <a href={viberHref}>💬 Viber: {siteConfig.phoneDisplay}</a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.email}`}>✉️ {siteConfig.email}</a>
              </li>
              <li>
                <a href={resolveSectionHref("#contact", sectionLinkPrefix)}>📍 Варна и региона</a>
              </li>
              <li>
                <a href={resolveSectionHref("#contact", sectionLinkPrefix)}>
                  🕐 Пон–Пет 08:00–18:00
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-copy">
            © <CurrentYear /> {siteConfig.name} · Всички права запазени
          </div>
          <a href={siteConfig.phoneHref} className="footer-phone">
            📞 {siteConfig.phoneDisplay}
          </a>
        </div>
        <div className="footer-seo" style={footerSeoStyle}>
          {footerSeoText}
        </div>
      </div>
    </footer>
  );
}
