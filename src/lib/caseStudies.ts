export type CaseStudy = {
  slug: string;
  client: string;
  tag: string;
  headline: string;
  subhead: string;
  problem: string;
  solution: string;
  results: { metric: string; label: string }[];
  stack: string[];
  host: string;
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "bp-couriers",
    client: "BP Couriers",
    tag: "Logistics Platform",
    headline: "Same-day delivery, fully automated.",
    subhead: "Booking, dispatch, and driver tracking — one platform, built from scratch.",
    problem: "BP Couriers was managing pickups via WhatsApp and phone calls. No system to track orders, assign drivers, or confirm delivery. Every job was manual, every mistake was expensive.",
    solution: "We built a full courier operating system: a customer booking flow, a driver app with live job assignments, and an admin console with real-time dispatch. Payments via WiPay, automated WhatsApp confirmations, and a map view for the ops team.",
    results: [
      { metric: "100%", label: "Orders tracked digitally" },
      { metric: "3×", label: "Daily job capacity" },
      { metric: "0", label: "Manual WhatsApp dispatch calls" },
      { metric: "< 1 wk", label: "Time to live" },
    ],
    stack: ["Next.js", "Supabase", "Payload CMS", "Clerk", "WiPay", "WhatsApp Cloud API", "Vercel"],
    host: "bpcouriers.online",
  },
  {
    slug: "language-cradle",
    client: "The Language Cradle",
    tag: "Education Platform",
    headline: "A language institute with a full digital backbone.",
    subhead: "CMS, role portal, social media system, and a custom app — all in one.",
    problem: "The Language Cradle had a basic website and no system to manage courses, enrol students, or run marketing. Social media was sporadic. The admin team had no tools.",
    solution: "We built thelanguagecradle.com with a full CMS, staff and student portals, and a Global Voice™ enrolment flow. Separately, we deployed a daily social media content system that auto-posts to Instagram and Facebook — generating content, rendering creative, and posting programmatically.",
    results: [
      { metric: "12+", label: "Courses live in CMS" },
      { metric: "Daily", label: "Auto-posted social content" },
      { metric: "2", label: "Student portals (web + app)" },
      { metric: "3 wks", label: "Full platform delivery" },
    ],
    stack: ["Next.js", "Supabase", "Meta Graph API", "React Native", "Resend", "Vercel"],
    host: "thelanguagecradle.com",
  },
  {
    slug: "ridelink-jamaica",
    client: "RideLink Jamaica",
    tag: "Ride-Hail Super App",
    headline: "Ride-hailing built for the Caribbean.",
    subhead: "Rider, driver, and admin portals — one interconnected system.",
    problem: "No ride-hailing solution existed that was built for Jamaican market conditions: JMD pricing, local payment methods, and the realities of Jamaican address data.",
    solution: "We designed and built a full ride-hail system: a customer-facing booking app, a driver app with earnings tracking, and a live admin console for fleet management. Built mobile-first with React Native for the apps and Next.js for admin.",
    results: [
      { metric: "3", label: "Distinct portals in one system" },
      { metric: "JMD", label: "Native currency support" },
      { metric: "iOS + Android", label: "Dual mobile platforms" },
      { metric: "Real-time", label: "Driver dispatch + tracking" },
    ],
    stack: ["Next.js", "React Native", "Supabase", "Expo", "Codemagic", "Vercel"],
    host: "ridelink-jamaica.vercel.app",
  },
  {
    slug: "ferguson-law",
    client: "Ferguson Law",
    tag: "Legal Services Platform",
    headline: "A law firm with a full-service digital office.",
    subhead: "CRM, booking, client portal, and an AI legal chatbot — all connected.",
    problem: "Ferguson Law had no digital presence beyond a basic site. Client intake was entirely manual. No way to book consultations online, manage client records, or answer common queries without a staff member.",
    solution: "We built a comprehensive firm platform: public website with SEO-optimized practice area pages, an online booking system for consultations, a client-facing portal, an internal CRM, and an AI chatbot trained on Jamaican legal FAQs to handle inbound queries 24/7.",
    results: [
      { metric: "24/7", label: "AI chatbot for client queries" },
      { metric: "Online", label: "Consultation booking" },
      { metric: "1", label: "Unified CRM for all clients" },
      { metric: "< 2 wks", label: "Full delivery" },
    ],
    stack: ["Next.js", "Supabase", "Claude AI", "Resend", "WiPay", "Vercel"],
    host: "ferguson-law.vercel.app",
  },
];

export function getCaseStudy(slug: string) {
  return CASE_STUDIES.find((c) => c.slug === slug);
}
