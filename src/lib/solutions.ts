export type SolutionBenefit = { title: string; body: string };
export type SolutionFAQ = { q: string; a: string };

export type Solution = {
  slug: string;
  title: string;
  headline: string;
  subhead: string;
  offerKey: string;
  eyebrow: string;
  accentIndex: number; // 0-7 maps to spectrum colors
  benefits: SolutionBenefit[];
  faqs: SolutionFAQ[];
  relatedSlugs: string[];
  processHighlights: string[];
};

export const SOLUTIONS: Solution[] = [
  {
    slug: "websites",
    title: "Websites & Landing Pages",
    headline: "Your brand's first impression. Built to convert.",
    subhead:
      "From one-page launches to full editorial sites — fast, beautiful, and wired for growth from day one.",
    offerKey: "digital-presence",
    eyebrow: "Digital Presence",
    accentIndex: 4, // cyan
    benefits: [
      { title: "Launch in 5–7 business days", body: "Structured sprint from discovery to live — no month-long delays." },
      { title: "Conversion-first architecture", body: "Every section is placed intentionally. Hero, proof, offer, action — nothing random." },
      { title: "Full CMS integration", body: "Edit pages, posts, and products without touching code." },
      { title: "Mobile-perfect from line one", body: "Designed mobile-first, refined for desktop — not the other way around." },
      { title: "Contact, booking & payment hooks", body: "Forms, WhatsApp triggers, and WiPay or Stripe checkout — wired on day one." },
      { title: "SEO-structured from the ground up", body: "Semantic HTML, Open Graph, sitemap, and Core Web Vitals pass." },
    ],
    processHighlights: ["Discovery call", "Wireframe review", "Design delivery", "Development", "Copywriting", "Launch"],
    faqs: [
      { q: "How long does a website take?", a: "Standard sites launch in 5–7 business days from kickoff. Complex sites with custom CMS integrations typically take 2–3 weeks." },
      { q: "Do I need to provide copy?", a: "No. We write the copy as part of the build. You provide brand direction; we handle the words." },
      { q: "Can I edit the site after launch?", a: "Yes — every site ships with a CMS (usually Sanity or Supabase-backed admin) so you can manage content independently." },
      { q: "Is hosting included?", a: "Sites deploy on Vercel with a custom domain. Hosting is minimal cost — typically US$0–20/mo depending on traffic tier." },
    ],
    relatedSlugs: ["web-apps", "ecommerce", "marketing-creative"],
  },
  {
    slug: "web-apps",
    title: "Web Applications",
    headline: "Software that runs the business, not just represents it.",
    subhead:
      "Customer portals, operator dashboards, internal tools — engineered as a full system, not just a page.",
    offerKey: "commerce-application",
    eyebrow: "Web Applications",
    accentIndex: 5, // blue
    benefits: [
      { title: "Multi-role dashboards", body: "Customer view, staff view, admin view — each user sees exactly what they need." },
      { title: "Real-time data", body: "Supabase and WebSocket-powered live updates so your team always has current state." },
      { title: "Payment gateway integration", body: "WiPay JMD, Stripe USD, PayPal — whichever fits your market." },
      { title: "Role-based access and auth", body: "Secure sign-up, login, and granular permission levels out of the box." },
      { title: "Scales without a rewrite", body: "Architecture chosen for growth — the MVP and the enterprise version share the same codebase." },
      { title: "Fully white-labeled", body: "Your colors, your logo, your domain — zero J Supreme branding in sight." },
    ],
    processHighlights: ["Requirements audit", "System design", "Database schema", "API architecture", "Frontend build", "QA & launch"],
    faqs: [
      { q: "What's the difference between a website and a web app?", a: "A website presents information. A web app lets users do things — book, pay, manage, track. If it has logins and data, it's a web app." },
      { q: "How do you handle data security?", a: "Row-level security (RLS) on all Supabase tables, server-side auth validation, encrypted secrets, and secure API keys — our standard, not an add-on." },
      { q: "Can you integrate with my existing tools?", a: "Yes. We build REST or webhook integrations with most platforms — WhatsApp Business API, Stripe, Google Calendar, Mailchimp, and custom ERPs." },
      { q: "Do you provide ongoing support?", a: "Yes. We offer monthly maintenance retainers that include hosting, updates, bug fixes, and new feature deployments." },
    ],
    relatedSlugs: ["crms", "mobile-apps", "ai-systems"],
  },
  {
    slug: "mobile-apps",
    title: "Mobile Apps",
    headline: "Your product in every pocket.",
    subhead:
      "Native iOS + Android apps, or installable PWAs — built for real-world usage, not just demos.",
    offerKey: "mobile-app",
    eyebrow: "Mobile Applications",
    accentIndex: 6, // violet
    benefits: [
      { title: "Native or cross-platform", body: "True native iOS/Android for maximum performance, or Expo cross-platform for faster timelines." },
      { title: "App Store & Play Store submission", body: "We handle the full submission process — screenshots, metadata, compliance review." },
      { title: "Push notifications, geolocation, offline", body: "Full device capability access — not a limited web wrapper." },
      { title: "Real-time backend sync", body: "Live order updates, tracking, messaging — your app stays current." },
      { title: "Admin panel included", body: "A web-based admin panel for managing content, users, and data — no app update needed." },
      { title: "Store-ready from day one", body: "Design and code reviewed against Apple and Google policies before submission." },
    ],
    processHighlights: ["Feature scoping", "UX prototyping", "UI design", "Development sprints", "Device testing", "Store submission"],
    faqs: [
      { q: "Should I build native or cross-platform?", a: "Cross-platform (Expo/React Native) is faster and cheaper for most businesses. Native Swift/Kotlin is only worth it for apps that need deep device integration (AR, Bluetooth, complex camera)." },
      { q: "How long does App Store approval take?", a: "Apple typically takes 1–3 business days for review. Google Play is usually 24–48 hours. We handle the submission and respond to any reviewer feedback." },
      { q: "Can the app work with my existing website?", a: "Yes. The app connects to the same backend as your website — shared data, shared user accounts, consistent experience." },
      { q: "What's included in the app package?", a: "Mobile app (iOS + Android), admin web panel, backend API, database, push notifications, and App Store submission. End-to-end." },
    ],
    relatedSlugs: ["web-apps", "crms", "ai-systems"],
  },
  {
    slug: "crms",
    title: "CRM & Business Dashboards",
    headline: "Stop running your business from a spreadsheet.",
    subhead:
      "Custom CRMs and internal dashboards tailored to how your team actually works — not how a software vendor imagined it.",
    offerKey: "business-operating",
    eyebrow: "Business Systems",
    accentIndex: 2, // yellow
    benefits: [
      { title: "Client, lead, and deal management", body: "Full pipeline from first contact to closed invoice — all in one place." },
      { title: "Invoice generation and payment tracking", body: "Create, send, and track invoices. See who's paid, who's overdue, who needs a nudge." },
      { title: "Project pipeline with team assignments", body: "Assign tasks, set milestones, track status — your team always knows what's next." },
      { title: "Real-time KPI dashboards", body: "Revenue, lead count, conversion rate, open projects — updated live." },
      { title: "Communication logs", body: "WhatsApp and email threads linked to the right client record, automatically." },
      { title: "Role-based permissions", body: "Staff see their tasks. Managers see the full picture. Admins control everything." },
    ],
    processHighlights: ["Workflow audit", "Data modeling", "Schema design", "UI build", "Team training", "Handover & support"],
    faqs: [
      { q: "Why not just use an off-the-shelf CRM?", a: "Off-the-shelf CRMs are built for the average business. Your workflows are specific — your CRM should match them, not the other way around." },
      { q: "Can we migrate from an existing system?", a: "Yes. We can import data from spreadsheets, HubSpot, Zoho, or any system that exports CSV or has an API." },
      { q: "How long to build a custom CRM?", a: "Core CRM builds typically take 3–5 weeks. Operations suites with billing, team management, and AI features take 6–8 weeks." },
      { q: "Does the team need training?", a: "We build with simplicity in mind — most teams are productive on day one. We also provide a walkthrough session and documentation on handover." },
    ],
    relatedSlugs: ["web-apps", "automation", "ai-systems"],
  },
  {
    slug: "ecommerce",
    title: "E-Commerce Platforms",
    headline: "A store that sells while you sleep.",
    subhead:
      "Full online stores with inventory, payments, order management, and the marketing hooks to drive traffic to all of it.",
    offerKey: "commerce-application",
    eyebrow: "Commerce",
    accentIndex: 1, // orange
    benefits: [
      { title: "Product catalog with variants and inventory", body: "Manage products, sizes, colors, stock levels, and reorder points — all in the admin panel." },
      { title: "WiPay, Stripe, and bank transfer checkout", body: "JMD and USD checkout options ready for your customer base wherever they are." },
      { title: "Order tracking and fulfillment", body: "Customers track their orders. Your team manages fulfillment from a clean dashboard." },
      { title: "Promo codes, bundles, and loyalty", body: "Discount engine, product bundles, and a loyalty point system — all configurable." },
      { title: "Customer accounts and order history", body: "Returning customers see their history, saved addresses, and reorder with one click." },
      { title: "Marketing integrations", body: "Email capture, Meta Pixel, Google Analytics, and WhatsApp checkout flow — wired on launch." },
    ],
    processHighlights: ["Product audit", "Catalog structure", "Checkout build", "Payment integration", "Marketing wiring", "Launch"],
    faqs: [
      { q: "Can you migrate my existing Shopify or WooCommerce store?", a: "Yes. We can import your product catalog, customer list, and order history during the build." },
      { q: "Which payment methods do Jamaican customers prefer?", a: "WiPay handles JMD card payments with local bank integration. Bank transfer is widely used for larger orders. We wire all three channels at launch." },
      { q: "Is shipping rate calculation included?", a: "Yes. We integrate with your carrier rates or set manual flat rates / zone-based pricing." },
      { q: "How do I manage the store after launch?", a: "A full admin panel is included. Add products, update prices, process orders, and view reports — no developer needed." },
    ],
    relatedSlugs: ["websites", "marketing-creative", "automation"],
  },
  {
    slug: "booking-systems",
    title: "Booking & Scheduling Systems",
    headline: "Let clients book themselves. You just show up.",
    subhead:
      "Smart booking engines with real-time availability, online payments, and automated confirmations built in.",
    offerKey: "booking-reservation",
    eyebrow: "Booking Systems",
    accentIndex: 3, // green
    benefits: [
      { title: "Real-time calendar and availability", body: "Clients only see open slots. No double-bookings. No back-and-forth." },
      { title: "Online payment at booking", body: "Collect deposits or full payment at the time of booking — WiPay, Stripe, or cash option." },
      { title: "Automated confirmations and reminders", body: "WhatsApp and email confirmations sent instantly. Reminder 24 hours before appointment." },
      { title: "Multi-staff and multi-location", body: "Clients select their preferred staff member or location — your team manages their own calendars." },
      { title: "Client portal", body: "Clients can view upcoming bookings, reschedule, or book again from their account." },
      { title: "Admin panel", body: "See your full schedule, manage blackout dates, and generate reports on bookings and revenue." },
    ],
    processHighlights: ["Service catalog", "Calendar setup", "Payment integration", "Notification flows", "Staff training", "Go live"],
    faqs: [
      { q: "Can the booking system sync with Google Calendar?", a: "Yes. Staff calendars sync two-way with Google Calendar so appointments appear in both places automatically." },
      { q: "What happens if a client needs to cancel?", a: "You set the cancellation policy — full refund, credit, or no refund. The system enforces it automatically." },
      { q: "Can I offer free and paid bookings?", a: "Yes. You can have free consultations, paid sessions, and deposit-required bookings all in the same system." },
      { q: "Does it work for group classes or events?", a: "Yes. Set a maximum capacity per slot and the system handles enrollment, waitlists, and group confirmations." },
    ],
    relatedSlugs: ["crms", "websites", "automation"],
  },
  {
    slug: "automation",
    title: "Business Automation",
    headline: "Stop doing manually what a system can handle.",
    subhead:
      "Workflows, triggers, and pipelines that move data, send messages, and execute tasks — no human clicking required.",
    offerKey: "creative-technology",
    eyebrow: "Automation",
    accentIndex: 7, // magenta
    benefits: [
      { title: "WhatsApp and email sequences", body: "Lead → welcome → follow-up → invoice — executed automatically based on triggers you define." },
      { title: "CRM-triggered workflows", body: "Status changes, new bookings, or payments can instantly fire the next action in your pipeline." },
      { title: "Social media scheduling", body: "Automated posting across Instagram, Facebook, TikTok, and Google Business — from one content queue." },
      { title: "Inventory and order alerts", body: "Low stock, new order, and overdue payment notifications sent to the right person instantly." },
      { title: "Scheduled report delivery", body: "Revenue, bookings, and KPI reports delivered to your inbox on schedule — no logging in required." },
      { title: "Custom API integrations", body: "Connect any two platforms via webhook or API — if it has an endpoint, we can wire it." },
    ],
    processHighlights: ["Workflow mapping", "Trigger design", "Integration build", "Test runs", "Monitoring setup", "Handover"],
    faqs: [
      { q: "What platforms can you connect?", a: "WhatsApp Business API, Meta, Google, Stripe, WiPay, Supabase, Airtable, Notion, Mailchimp, Resend, Slack, and most platforms with a public API." },
      { q: "Can automation replace a staff member?", a: "For repetitive, rules-based tasks — yes. Confirmations, reminders, reports, and data entry are ideal for automation. Judgment calls stay with your team." },
      { q: "How do we know the automation is working?", a: "We build monitoring into every workflow — logs, alerts, and a simple dashboard so you can see what ran, what failed, and why." },
      { q: "What happens if an automation breaks?", a: "Critical automations send you an alert immediately. For retainer clients we monitor and fix automatically — you may never notice." },
    ],
    relatedSlugs: ["ai-systems", "crms", "web-apps"],
  },
  {
    slug: "ai-systems",
    title: "AI Systems",
    headline: "Make your business smarter at scale.",
    subhead:
      "AI chatbots, voice agents, and intelligent automation that handle repetitive work — so your team handles the work that matters.",
    offerKey: "creative-technology",
    eyebrow: "AI & Intelligence",
    accentIndex: 6, // violet
    benefits: [
      { title: "AI chatbot trained on your business", body: "Answers questions about your products, pricing, services, and FAQs — 24/7, in your brand voice." },
      { title: "AI voice agent for phone inquiries", body: "Handles incoming calls, qualifies leads, books appointments, and escalates when needed." },
      { title: "Inbox triage and response drafts", body: "AI reads incoming messages and drafts replies for your team — they review and send." },
      { title: "Smart search across your catalog", body: "Natural language search across your product catalog, knowledge base, or content library." },
      { title: "Automated content generation", body: "Social captions, email drafts, and product descriptions generated from your guidelines." },
      { title: "Behavioral pattern detection", body: "AI analysis of customer behavior — which segments convert, when they drop off, and what to do about it." },
    ],
    processHighlights: ["Use case audit", "Model selection", "Training data", "Integration", "Evaluation", "Deployment"],
    faqs: [
      { q: "How is the AI trained on my business?", a: "We compile your product catalog, pricing, FAQs, and documentation into a structured knowledge base. The AI is then prompted with your business context before every conversation." },
      { q: "Can the chatbot hand off to a human?", a: "Yes. If the AI can't handle the request, it escalates to your WhatsApp or email with full conversation context." },
      { q: "Is my data used to train OpenAI or other models?", a: "No. API-based usage is not used for training. Your business data stays in your knowledge base." },
      { q: "Which AI models do you use?", a: "Claude (Anthropic), GPT-4o (OpenAI), and Gemini — selected per use case for cost, speed, and capability." },
    ],
    relatedSlugs: ["automation", "web-apps", "crms"],
  },
  {
    slug: "marketing-creative",
    title: "Marketing & Creative",
    headline: "Growth isn't an accident. It's a system.",
    subhead:
      "Social media management, ad creative, and brand design — executed as a repeatable monthly system that runs alongside your business.",
    offerKey: "social-media-marketing",
    eyebrow: "Marketing & Creative",
    accentIndex: 0, // red
    benefits: [
      { title: "Content calendar and daily posting", body: "We plan, create, and post across Instagram, Facebook, TikTok, and Google — every day." },
      { title: "Ad creative that converts", body: "Stills, carousels, and short-form video — designed for the algorithm and your audience." },
      { title: "Paid social campaigns", body: "Meta Ads, TikTok Ads, and Google Ads — launched, monitored, and optimized every month." },
      { title: "Monthly performance reports", body: "Reach, engagement, leads, and ad spend ROI — reported honestly, not just the good numbers." },
      { title: "Brand design and identity", body: "Logo, brand kit, and design templates — so every piece of content looks like it came from one place." },
      { title: "Email and newsletter management", body: "Monthly email campaigns, subscriber list management, and automation flows." },
    ],
    processHighlights: ["Brand audit", "Strategy session", "Content plan", "Creative production", "Posting & ads", "Monthly review"],
    faqs: [
      { q: "Do I need to provide the content?", a: "No. We write the copy, design the graphics, and produce the creative. You approve before it posts." },
      { q: "How many posts per month?", a: "Starter: 3–4 per week (12–16/mo). Plus: daily (28–31/mo). Elite: daily + Stories + Reels on all platforms." },
      { q: "Can you run ads if we have a small budget?", a: "Yes. We can run effective campaigns from J$15,000/mo in ad spend. We'll be transparent about what's realistic at each budget level." },
      { q: "Is branding design a separate service?", a: "It can be purchased standalone (Logo from J$25K, Brand Kit from J$60K) or bundled into a marketing retainer." },
    ],
    relatedSlugs: ["websites", "ecommerce", "ai-systems"],
  },
];

export const SOLUTION_MAP = Object.fromEntries(SOLUTIONS.map((s) => [s.slug, s]));

export const SPECTRUM_COLORS = [
  "#ff2020", // red
  "#ff8c00", // orange
  "#ffd700", // yellow
  "#00e054", // green
  "#00d4ff", // cyan
  "#3d6bff", // blue
  "#9b51ff", // violet
  "#ff2db4", // magenta
];
