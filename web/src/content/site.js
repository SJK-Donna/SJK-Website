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
    "SJK Guahan provides mobility, golf course care, grounds management and specialized equipment solutions supported by trusted global brands, local expertise and dependable after-sales service.",
  mission:
    "Enhancing the enjoyment of being outdoors through products you can afford, trust and rely on — supported by strong service and long-term customer care.",
  vision:
    "To shape the future of outdoor mobility and landscape management in Southeast Asia by leading the adoption of innovative, sustainable machinery that works in harmony with people and enhances how outdoor environments are maintained, experienced and enjoyed.",
  // Contact details were not in the brief — fill these in before launch.
  phone: "",
  email: "",
  facebook: "https://www.facebook.com/sjkguahanph/"
};

export const NAV = [
  { to: "/", label: "Home" },
  { to: "/who-we-are", label: "Who We Are" },
  { to: "/brands-partners", label: "Brands & Partners" },
  { to: "/projects", label: "Projects" },
  { to: "/news", label: "News" },
  { to: "/contact", label: "Contact Us" }
];

// Brief §7: hero imagery rotating every 3–5 seconds, covering golf carts,
// course care equipment, compact equipment, customer projects and team activity.
// The first slide is a short clip (`video`), as the brief asks for.
export const HERO_SLIDES = [
  { caption: "Golfers heading out in a Club Car fleet", src: "/images/videos/hero-fleet.jpg", video: "/images/videos/hero-fleet.mp4", alt: "Golfers and caddies boarding white Club Car golf carts on the cart path beside a pond", position: "65% 50%" },
  { caption: "Golfcarts.ph fleet on a customer course", src: "/images/sjk/fleet-course.jpg", alt: "Fleet of black Club Car golf carts lined up beside a tropical course" },
  { caption: "Fairway mowing on a championship course", src: "/images/carousel/slide-3.jpg", alt: "Fairway mower maintaining a championship golf course" },
  { caption: "Compact equipment shaping a site", src: "/images/brands/wacker-neuson-mountain.jpg", alt: "Compact excavator working on a mountain site", position: "50% 20%" },
  { caption: "Golfcarts.ph fleet at The Vista Country Club", src: "/images/sjk/vista-fleet.jpg", alt: "White Club Car golf carts on the cart path at a country club course", position: "100% 50%" },
  { caption: "Hands-on product training with our team", src: "/images/sjk/product-training.jpg", alt: "SJK team receiving hands-on product training on new course care equipment" }
];

export const INTRO = {
  eyebrow: "More Than Equipment",
  body: [
    "Established in 2017, SJK Guahan Inc. is a joint venture between Philippine and Guam partners created to bring trusted products, new technologies and strong after-sales support to the Philippine market.",
    "Over the years, our business has grown across golf, resorts, property development, landscaping, golf course and grounds management, specialized mobility and compact equipment."
  ],
  philosophy: "Represent good products. Support them properly. Build long-term relationships with our customers.",
  img: "/images/sjk/fleet-delivery.jpg",
  alt: "Rows of new white golf carts, still in protective wrap, ready for delivery"
};

export const BUSINESSES = [
  {
    id: "golf-carts-ph",
    name: "Golfcarts.ph",
    tagline: "Mobility Solutions",
    logo: "/images/brands/golfcarts-ph-logo.png",
    body: "Golfcarts.ph provides golf, resort, commercial and specialized low-speed electric mobility solutions supported by local parts, technical service and fleet management expertise.",
    img: "/images/sjk/vista-fleet.jpg",
    alt: "White Club Car golf carts on the cart path at a country club course",
    imgPosition: "100% 50%",
    cta: "Explore Golfcarts.ph",
    // The brief names the domain ("Visit Golfcarts.ph").
    url: "https://golfcarts.ph",
    vision: "Lead the market in golf carts and low-speed electric mobility solutions."
  },
  {
    id: "ground-masters",
    name: "Groundmasters.ph",
    tagline: "Course Care, Grounds & Equipment Solutions",
    logo: "/images/brands/groundmasters-ph-logo.png",
    body: "Groundmasters.ph provides professional equipment and solutions for golf courses, sports fields, landscaping, grounds maintenance and compact equipment applications.",
    img: "/images/sjk/campey-assembly.jpg",
    alt: "SJK team assembling Campey fertilizer spreaders in the warehouse",
    cta: "Explore Groundmasters.ph",
    // Website address not confirmed in the brief — set it here when known.
    // Until then the button opens the Groundmasters.ph section of Brands & Partners.
    url: "",
    vision: "Lead the way in professional course care, grounds and landscape management solutions."
  }
];

// What Golfcarts.ph provides, from the brief and its customer guidance.
export const GOLFCARTS_SERVICES = [
  "Golf course fleets",
  "Resort and hotel mobility",
  "Commercial and utility vehicles",
  "Lithium and lead-acid battery options",
  "Maintenance contracts, parts and technical service",
  "Fleet personalization: colors, branding, seating and add-ons"
];

export const WAY_FORWARD = {
  title: "Setting the Way Forward",
  body: [
    "The industries we serve continue to evolve. Electric mobility, sustainable course care, smarter equipment, improved fleet management and new technologies are changing how golf courses, resorts, properties and outdoor environments operate.",
    "Our role is to bring these solutions closer to our customers through product demonstrations, technical support, operator training, education and real-world testing — helping customers understand not only what new technologies are available, but why and where they can create value."
  ],
  closing: ["We believe that introducing a product is only the beginning.", "The real value comes from making the solution work."],
  img: "/images/sjk/product-training.jpg",
  alt: "SJK team receiving hands-on product training on new course care equipment"
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

// Recognition from Club Car, newest first, as shown on the trophies.
// `photo` is the award stage photo where one exists.
export const AWARDS = [
  { year: "2024", title: "Best Marketing Award", by: "Club Car Asia", photo: "/images/sjk/award-best-marketing.jpg", alt: "The SJK team on stage receiving the 2024 Club Car Asia Best Marketing Award" },
  { year: "2024", title: "Excellent Performance Award – Utility Vehicles", by: "Club Car Asia", photo: "/images/sjk/award-excellent-performance.jpg", alt: "SJK receiving the 2024 Club Car Asia Excellent Performance Award alongside other Asia dealers" },
  { year: "2023", title: "Black & Gold Partner", by: "Club Car" },
  { year: "2022", title: "Breakthrough Award", by: "Club Car" }
];

export const AWARDS_PHOTOS = {
  trophies: { src: "/images/sjk/club-car-awards.jpg", alt: "SJK Guahan's Club Car trophies: 2024 Best Marketing, 2024 Excellent Performance, 2022 Breakthrough and the 2023 Black & Gold Partner plaque" },
  conference: { src: "/images/sjk/club-car-dealer-conference.jpg", alt: "SJK team at the 2025 Club Car Asia Dealer Conference", caption: "The team at the 2025 Club Car Asia Dealer Conference" }
};

// Brief §11 additional figures. `value` stays null until the number is
// internally verified; only then does it appear on the public site.
// `sample` is a placeholder shown ONLY in local development (npm run dev),
// tagged "Sample", so the layout can be previewed. Never publish samples.
export const PENDING_FIGURES = [
  { label: "Customers served", value: null, suffix: "+", sample: 250 },
  { label: "Golf courses supported", value: null, suffix: "+", sample: 40 },
  { label: "Electric vehicles deployed", value: null, suffix: "+", sample: 1500 },
  { label: "Provinces and regions covered", value: null, suffix: "", sample: 18 },
  { label: "Technical team members", value: null, suffix: "", sample: 30 },
  { label: "Years of combined industry experience", value: null, suffix: "+", sample: 100 }
];

export const BRAND_GROUPS = [
  { business: "Golfcarts.ph", group: "Golf & Mobility", brands: ["Club Car"] },
  {
    business: "Groundmasters.ph",
    group: "Groundmasters.ph",
    brands: ["Jacobsen", "Smithco", "Iseki", "Campey", "Dakota", "Trimax", "Wacker Neuson"],
    // Brief §22 categories, used on the Brands & Partners page. Placements of
    // Smithco and Dakota are best guesses awaiting confirmation.
    categories: [
      { group: "Professional Course Care Equipment", brands: ["Jacobsen", "Trimax", "Campey"] },
      { group: "Spraying & Application", brands: ["Smithco"] },
      { group: "Tractors & Utility Equipment", brands: ["Iseki"] },
      { group: "Compact Construction Equipment", brands: ["Wacker Neuson"] },
      { group: "Specialized Grounds Equipment", brands: ["Dakota"] }
    ]
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
// line point visitors to the Contact page. Names and roles follow the
// brief §17 (none was given for Clark).
const directions = (address) => `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;

export const LOCATIONS = [
  {
    id: "manila",
    name: "Metro Manila",
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
    name: "Santa Rosa",
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
  { title: "Forward-Thinking Solutions", body: "We continue to introduce mobility, course care, grounds and machinery solutions that improve efficiency, performance and sustainability." }
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
  "Since 2017, the company has focused on bringing trusted international brands, practical technologies and professional local support to industries connected to mobility, golf, course care, landscaping, grounds management and outdoor environments.",
  "Our business has grown by focusing on long-term customer relationships rather than simply equipment sales."
];

// Our Story. Each milestone has a photo that takes over the frame beside
// the timeline as the reader reaches it. The photos show the kind of work
// each stage added; they are not dated to that year, so captions describe
// the scene, not the date.
export const TIMELINE = [
  { when: "2017", what: "SJK Guahan Inc. established in the Philippines.", img: "/images/sjk/fleet-delivery.jpg", caption: "New golf cart fleets ready for delivery" },
  { when: "Early Years", what: "Development of the golf cart and golf industry business.", img: "/images/sjk/club-car-service.jpg", caption: "Golfcarts.ph technicians servicing a Club Car on site" },
  { when: "Expansion", what: "Addition of professional course care, grounds management and equipment solutions.", img: "/images/sjk/turf-equipment-assembly.jpg", caption: "Assembling professional course care equipment in the workshop" },
  { when: "Growth", what: "Expansion of technical capabilities, locations, product lines and national customer base.", img: "/images/sjk/team-warehouse.jpg", caption: "The SJK team with a widening range of course care and grounds equipment" },
  { when: "Today", what: "SJK operates through Golfcarts.ph, Groundmasters.ph and a growing portfolio of international partners.", img: "/images/sjk/gcm-conference-booth.jpg", caption: "SJK, Golfcarts.ph and Groundmasters.ph at the Philippine Golf Course Management Conference" },
  { when: "The Future", what: "Continued investment in electric mobility, sustainable outdoor solutions, technology, technical capability and expanded regional customer support.", img: "/images/sjk/fleet-on-course.jpg", caption: "Electric fleets at work on Philippine fairways" }
];

// Short silent clips for the "In the Field" reels on the homepage. Vertical
// (9:16) phone footage, compressed to 720px wide; `poster` shows before the
// clip loads and for visitors who prefer reduced motion.
export const REELS = [
  { title: "Fleets in Play", tag: "Golfcarts.ph", src: "/images/videos/fleet-on-course.mp4", poster: "/images/videos/fleet-on-course.jpg", alt: "Golfers and caddies boarding a fleet of white golf carts beside the fairway" },
  { title: "On the Cart Path", tag: "Golfcarts.ph", src: "/images/videos/cart-path.mp4", poster: "/images/videos/cart-path.jpg", alt: "A golf cart driving toward the camera along a tree-lined cart path" },
  { title: "Custom Upgrades", tag: "Accessories", src: "/images/videos/custom-wheels.mp4", poster: "/images/videos/custom-wheels.jpg", alt: "Close-up of a customised golf cart with lifted fenders and alloy wheels" },
  { title: "At Industry Events", tag: "SJK Guahan", src: "/images/videos/conference-booth.mp4", poster: "/images/videos/conference-booth.jpg", alt: "The SJK Guahan and Groundmasters.ph booth at a golf course management conference" }
];

export const TEAM = {
  intro: [
    "Our company is built around people with backgrounds in sales, engineering, operations, service, finance and customer support.",
    "Together, our team works across different industries with one objective — ensuring that the solutions we provide continue performing long after delivery."
  ],
  img: "/images/sjk/team-warehouse.jpg",
  alt: "The SJK Guahan team with new course care equipment in the warehouse",
  // { name: "…", position: "…", photo: "/images/team/….jpg" }
  members: []
};

export const PROJECT_CATEGORIES = ["Golf Courses", "Mobility", "Resorts & Hospitality", "Property Development", "Grounds & Landscaping", "Compact Equipment", "Community"];

// {
//   client: "Client / Project name", location: "City, Province",
//   category: "Golf Courses", industry: "Golf", type: "Golf Fleet Project",
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

// { title: "…", date: "2026-10-07", category: "Company News", summary: "…", img: "/images/news/….jpg", alt: "…" }
// Dates below are from the event photos' camera timestamps.
export const NEWS = [
  {
    title: "SJK at the 11th Philippine Golf Course Management Conference",
    date: "2026-05-13",
    category: "Events",
    summary: "SJK Guahan and Groundmasters.ph met the golf course management community, presenting course care and grounds equipment from our partner brands.",
    img: "/images/sjk/gcm-conference-booth.jpg",
    alt: "SJK Guahan and Groundmasters.ph booth with course care equipment displays at the conference"
  },
  {
    title: "Golfcarts.ph at the 9th Philippine Hospitality Summit",
    date: "2026-02-11",
    category: "Events",
    summary: "Golfcarts.ph showcased Club Car passenger carts for hotels, resorts and properties at the 9th Philippine Hospitality Summit.",
    img: "/images/sjk/hospitality-summit-booth.jpg",
    alt: "Golfcarts.ph booth with a Club Car passenger cart and banner at the summit"
  }
];

// Real activities only — { title: "…", body: "…", img: "/images/…" }
export const GIVING_BACK = [];

export const CONTACT_INTERESTS = [
  "Golf Carts / Electric Vehicles",
  "Golf Course Equipment",
  "Grounds & Landscaping",
  "Compact Equipment",
  "Parts & Service",
  "Partnership Inquiry",
  "General Inquiry"
];
