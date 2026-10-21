// All website copy and records, sourced from the "Corporate Website Strategy
// & Content Brief" (7 October 2026). Edit here, not in the components.
//
// Projects, testimonials, news and Giving Back are intentionally empty: the
// brief requires real, internally verified content ("Credibility is more
// important than exaggerated numbers"). Each homepage section and page
// listing renders automatically as soon as its array has entries — follow
// the commented example shape in each one.

export const COMPANY = {
  name: "SJK Guahan Inc.",
  headline: "Solutions That Move People, Shape Landscapes and Improve the Outdoors.",
  positioning:
    "SJK Guahan provides mobility, turf, grounds management and specialized equipment solutions supported by trusted global brands, local expertise and dependable after-sales service.",
  mission:
    "Enhancing the enjoyment of being outdoors through products you can afford, trust and rely on — supported by strong service and long-term customer care.",
  vision:
    "To shape the future of outdoor mobility and landscape management in Southeast Asia by leading the adoption of innovative, sustainable machinery that works in harmony with people and enhances how outdoor environments are maintained, experienced and enjoyed.",
  // Contact details were not in the brief — fill these in before launch.
  phone: "",
  email: ""
};

export const NAV = [
  { to: "/", label: "Home" },
  { to: "/who-we-are", label: "Who We Are" },
  { to: "/brands-partners", label: "Brands & Partners" },
  { to: "/projects", label: "Projects" },
  { to: "/news", label: "News" },
  { to: "/contact", label: "Contact Us" }
];

export const HERO_IMAGES = [
  { src: "/images/carousel/slide-1.jpg", alt: "Golf cart fleet on a golf course at dawn" },
  { src: "/images/carousel/slide-3.jpg", alt: "Fairway mower maintaining championship turf" },
  { src: "/images/brands/wacker-neuson-mountain.jpg", alt: "Compact excavator working on a mountain site" },
  { src: "/images/brands/smithco-bunker-rake.jpg", alt: "Bunker rake grooming a golf course sand trap" },
  { src: "/images/carousel/slide-2.jpg", alt: "Electric golf cart beneath trees on a property" },
  { src: "/images/brands/campey.jpg", alt: "Turf renovation machine working a sports pitch" }
];

export const INTRO = {
  eyebrow: "More Than Equipment",
  body: [
    "Established in 2017, SJK Guahan Inc. is a joint venture between Philippine and Guam partners created to bring trusted products, new technologies and strong after-sales support to the Philippine market.",
    "Over the years, our business has grown across golf, resorts, property development, landscaping, turf and grounds management, specialized mobility and compact equipment."
  ],
  philosophy: "Represent good products. Support them properly. Build long-term relationships with our customers."
};

export const BUSINESSES = [
  {
    id: "golf-carts-ph",
    name: "Golf Carts PH",
    tagline: "Mobility Solutions",
    logo: "/images/brands/golfcarts-ph-logo.png",
    body: "Golf Carts PH provides golf, resort, commercial and specialized low-speed electric mobility solutions supported by local parts, technical service and fleet management expertise.",
    img: "/images/brands/golf-carts-ph.jpg",
    alt: "Golf Carts PH golf cart fleet on a misty golf course",
    cta: "Explore Golf Carts PH",
    // The brief names the domain ("Visit GolfCarts.ph").
    url: "https://golfcarts.ph",
    vision: "Lead the market in golf carts and low-speed electric mobility solutions."
  },
  {
    id: "ground-masters",
    name: "Ground Masters",
    tagline: "Turf, Grounds & Equipment Solutions",
    logo: "/images/brands/groundmasters-ph-logo.png",
    body: "Ground Masters provides professional equipment and solutions for golf courses, sports turf, landscaping, grounds maintenance and compact equipment applications.",
    img: "/images/carousel/slide-3.jpg",
    alt: "Fairway mower maintaining a golf course",
    cta: "Explore Ground Masters",
    // Website address not confirmed in the brief — set it here when known.
    // Until then the button opens the Ground Masters section of Brands & Partners.
    url: "",
    vision: "Lead the way in professional turf, grounds and landscape management solutions."
  }
];

export const WAY_FORWARD = {
  title: "Setting the Way Forward",
  body: [
    "The industries we serve continue to evolve. Electric mobility, sustainable turf management, smarter equipment, improved fleet management and new technologies are changing how golf courses, resorts, properties and outdoor environments operate.",
    "Our role is to bring these solutions closer to our customers through product demonstrations, technical support, operator training, education and real-world testing — helping customers understand not only what new technologies are available, but why and where they can create value."
  ],
  closing: ["We believe that introducing a product is only the beginning.", "The real value comes from making the solution work."],
  img: "/images/brands/campey.jpg",
  alt: "Campey turf renovation machine at work on a sports pitch"
};

// Only the four qualitative milestones the brief lists. Add verified figures
// (customers served, courses supported, vehicles deployed…) as
// { value: "120+", label: "…", detail: "…" } once confirmed internally.
export const MILESTONES = [
  { value: "Since 2017", detail: "Serving the Philippine market" },
  { value: "Nationwide Projects", detail: "Across golf, resorts, commercial properties, mobility and grounds management" },
  { value: "Global Partners", detail: "Representing leading international equipment and technology brands" },
  { value: "Local Technical Support", detail: "Service, parts and product support" }
];

export const BRAND_GROUPS = [
  { business: "Golf Carts PH", group: "Golf & Mobility", brands: ["Club Car"] },
  {
    business: "Ground Masters",
    group: "Ground Masters",
    brands: ["Jacobsen", "Smithco", "Iseki", "Campey", "Dakota", "Trimax", "Wacker Neuson", "Aqua-Aid", "ONECOTE"]
  }
];

// Customers and partners carried over from the previous site.
export const PARTNERS = [
  { src: "/images/partners/8.png", name: "Manila Golf", cat: "Golf Club" },
  { src: "/images/partners/1.png", name: "Amanpulo", cat: "Luxury Resort" },
  { src: "/images/partners/6.png", name: "Forest Hills Golf & Country Club", cat: "Golf & Country Club" },
  { src: "/images/partners/2.png", name: "FedEx", cat: "Logistics Partner" },
  { src: "/images/partners/4.png", name: "Anvaya Cove Golf & Sports Club", cat: "Golf & Sports Club" },
  { src: "/images/partners/3.png", name: "The Farm at San Benito", cat: "Wellness Resort" },
  { src: "/images/partners/5.png", name: "Valley Golf", cat: "Golf Course" },
  { src: "/images/partners/7.png", name: "Mimosa Plus Golf Course", cat: "Golf Course" }
];

// Branch addresses and numbers as supplied by SJK. `phones` pairs the
// number as displayed with its dialable form; branches without a direct
// line point visitors to the Contact page. Roles come from the brief
// (none was given for Clark).
const directions = (address) => `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;

export const LOCATIONS = [
  {
    id: "manila",
    name: "Manila",
    role: "Corporate / Sales / Service Operations",
    address: "1877 Honda Cars Manila Building, Paz M. Guazon St. cor Pres. Quirino Ave., Paco, Manila, 1007 National Capital Region",
    phones: [
      ["(02) 7745-5089", "+63277455089"],
      ["(+63) 999 997 7688", "+639999977688"],
      ["(+63) 917 631 2184", "+639176312184"]
    ],
    point: "manila"
  },
  {
    id: "cebu",
    name: "Cebu",
    role: "Visayas Sales & Service Support",
    address: "Unit 301 Clotilde Commercial Center, ML Quezon Ave., Casuntingan, Mandaue City, 6014 Cebu",
    phones: [["(+63) 917 310 5239", "+639173105239"]],
    point: "cebu"
  },
  {
    id: "laguna",
    name: "Laguna",
    role: "Assembly / Technical / Operations",
    address: "Nissan Technopark, Purok 5 NMPI Rd, City of Santa Rosa, Laguna",
    phones: [],
    point: "santaRosa"
  },
  {
    id: "clark",
    name: "Clark",
    role: "",
    address: "Unit 16E-F, Philexcel Business Park, M.A. Roxas Highway, Clark Freeport Zone, Pampanga",
    phones: [],
    point: "clark"
  }
].map((l) => ({ ...l, mapsUrl: directions(l.address) }));

export const CORE_MESSAGES = [
  { title: "Quality Products", body: "We partner with trusted manufacturers and technology providers." },
  { title: "Local Support", body: "We provide local service, technical support, parts and customer care." },
  { title: "Real Experience", body: "Our products and solutions are operating across real projects and customer environments." },
  { title: "Long-Term Partnerships", body: "Our relationship with the customer does not end when the equipment is delivered." },
  { title: "Forward-Thinking Solutions", body: "We continue to introduce mobility, turf, grounds and machinery solutions that improve efficiency, performance and sustainability." }
];

export const PRINCIPLES = [
  { title: "Open Communication", body: "We encourage honest dialogue and welcome ideas, feedback and concerns. Our management team listens, responds promptly and handles concerns with respect for privacy. People should feel safe to speak up without fear of retaliation." },
  { title: "Respect & Honesty", body: "We treat everyone with dignity and act honestly and fairly. We build trust through transparent relationships, avoid taking unfair advantage and address conduct that falls short of our values." },
  { title: "Hospitable Efficiency", subtitle: "The Masters Approach", body: "We combine warm, attentive service with prompt, accurate work. Through respect, responsiveness, empathy and professionalism, we make people feel valued while delivering results efficiently and to a high standard." },
  { title: "Accountability", body: "We own our work, actions and decisions. We deliver quality work on time, admit mistakes, support colleagues and focus on solutions without shifting blame. Leaders set clear expectations, provide feedback and lead by example." },
  { title: "Entrepreneurial Mindset", body: "We encourage initiative, practical innovation and continuous learning. We look for better ways to serve customers, use resources wisely and collaborate. We make thoughtful decisions, adapt to change and learn from both successes and setbacks." }
];

export const WHO_WE_ARE = [
  "SJK Guahan Inc. is a Philippine-based company established as a joint venture between Philippine and Guam shareholders.",
  "Since 2017, the company has focused on bringing trusted international brands, practical technologies and professional local support to industries connected to mobility, golf, turf, landscaping, grounds management and outdoor environments.",
  "Our business has grown by focusing on long-term customer relationships rather than simply equipment sales."
];

export const TIMELINE = [
  { when: "2017", what: "SJK Guahan Inc. established in the Philippines." },
  { when: "Early Years", what: "Development of the golf cart and golf industry business." },
  { when: "Expansion", what: "Addition of professional turf, grounds management and equipment solutions." },
  { when: "Growth", what: "Expansion of technical capabilities, locations, product lines and national customer base." },
  { when: "Today", what: "SJK operates through Golf Carts PH, Ground Masters and a growing portfolio of international partners." },
  { when: "The Future", what: "Continued investment in electric mobility, sustainable outdoor solutions, technology, technical capability and expanded regional customer support." }
];

export const TEAM = {
  intro: [
    "Our company is built around people with backgrounds in sales, engineering, operations, service, finance and customer support.",
    "Together, our team works across different industries with one objective — ensuring that the solutions we provide continue performing long after delivery."
  ],
  // { name: "…", position: "…", photo: "/images/team/….jpg" }
  members: []
};

export const PROJECT_CATEGORIES = ["Golf & Turf", "Mobility", "Resorts & Hospitality", "Property Development", "Grounds & Landscaping", "Compact Equipment", "Community"];

// {
//   client: "Client / Project name", location: "City, Province",
//   category: "Golf & Turf", industry: "Golf", type: "Golf Fleet Project",
//   summary: "One-line description for cards.",
//   requirement: "What did the customer need?",
//   solution: "What did SJK provide?",
//   result: "What was improved?",
//   brands: ["Club Car"], img: "/images/projects/….jpg", featured: true
// }
export const PROJECTS = [];

// { quote: "…", name: "Client Name", role: "Position / Company", img: "/images/…" }
export const TESTIMONIALS = [];

export const NEWS_CATEGORIES = ["Company News", "Projects", "Product News", "Events", "Demonstrations", "Industry Insights", "Community"];

// { title: "…", date: "2026-10-07", category: "Company News", summary: "…", img: "/images/news/….jpg" }
export const NEWS = [];

// Real activities only — { title: "…", body: "…", img: "/images/…" }
export const GIVING_BACK = [];

export const CONTACT_INTERESTS = [
  "Golf Carts / Electric Vehicles",
  "Turf & Golf Course Equipment",
  "Grounds & Landscaping",
  "Compact Equipment",
  "Parts & Service",
  "Partnership Inquiry",
  "General Inquiry"
];
