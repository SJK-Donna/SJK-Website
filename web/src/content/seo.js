// Search and social-sharing details for each page. Used twice: at build
// time (vite.config.js writes them into each page's HTML, so search engines
// and link previews see them without running JavaScript) and in the browser
// (components/home/Layout.jsx updates them on in-site navigation).
// Keep titles under ~60 characters and descriptions under ~160.
import { COMPANY, LOCATIONS } from "./site.js";

export const SITE_URL = "https://sjkguahan.com";
export const SITE_NAME = "SJK Guahan Inc.";
export const DEFAULT_IMAGE = "/images/og-image.jpg";

export const PAGES = {
  "/": {
    title: "SJK Guahan Inc. | Golf Carts, Course Care & Grounds Equipment",
    description:
      "SJK Guahan provides golf carts, golf course care, grounds management and specialized equipment in the Philippines, backed by trusted global brands and local after-sales service."
  },
  "/who-we-are": {
    title: "Who We Are | SJK Guahan Inc.",
    description:
      "An equipment, mobility and solutions company in the Philippines since 2017 and award-winning Club Car partner, operating Golfcarts.ph and Groundmasters.ph with four branches nationwide."
  },
  "/brands-partners": {
    title: "Brands & Partners: Club Car, Jacobsen & more | SJK Guahan",
    description:
      "International brands represented by SJK Guahan in the Philippines, including Club Car, Jacobsen, Smithco, Iseki, Campey, Dakota, Trimax and Wacker Neuson, with local parts and service."
  },
  "/projects": {
    title: "Projects | SJK Guahan Inc.",
    description:
      "Golf cart fleets, course care and grounds equipment working at golf courses, resorts and properties across the Philippines."
  },
  "/news": {
    title: "News & Events | SJK Guahan Inc.",
    description:
      "News from SJK Guahan, Golfcarts.ph and Groundmasters.ph: industry events, demonstrations, training, partnerships and company milestones."
  },
  "/contact": {
    title: "Contact Us | SJK Guahan Inc.",
    description:
      "Talk to SJK Guahan about golf carts, course care and grounds equipment, parts or service. Offices in Metro Manila, Cebu, Santa Rosa (Laguna) and Clark (Pampanga)."
  }
};

export const pageMeta = (path) => {
  const page = PAGES[path] ?? PAGES["/"];
  return {
    ...page,
    url: SITE_URL + (path === "/" ? "/" : `${path}/`),
    image: SITE_URL + (page.image ?? DEFAULT_IMAGE)
  };
};

// Structured data (schema.org) describing the company and its branches, for
// Google's knowledge panel and local results.
export const ORGANIZATION_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL + "/",
  logo: SITE_URL + "/icon-512.png",
  image: SITE_URL + DEFAULT_IMAGE,
  foundingDate: "2017",
  areaServed: "PH",
  description: PAGES["/"].description,
  brand: [
    { "@type": "Brand", name: "Golfcarts.ph" },
    { "@type": "Brand", name: "Groundmasters.ph" }
  ],
  sameAs: [COMPANY.facebook, "https://golfcarts.ph"],
  award: [
    "2024 Club Car Asia Best Marketing Award",
    "2024 Club Car Asia Excellent Performance Award – Utility Vehicles",
    "2023 Club Car Black & Gold Partner",
    "2022 Club Car Breakthrough Award"
  ],
  department: LOCATIONS.map((l) => ({
    "@type": "LocalBusiness",
    name: `${SITE_NAME} – ${l.name}`,
    address: { "@type": "PostalAddress", streetAddress: l.address, addressCountry: "PH" },
    ...(l.phones.length ? { telephone: l.phones[0][1] } : {})
  }))
};
