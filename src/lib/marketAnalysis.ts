/**
 * marketAnalysis.ts — competitor pricing research for the 13 JST systems.
 *
 * Rendered on /market ("Market & Competition"). Prices are published list
 * prices in USD unless marked, snapshotted RESEARCH_DATE from vendor pricing
 * pages and 2026 buyer guides. "~" = triangulated from third-party guides
 * (vendor gates pricing behind sales calls).
 *
 * When JST launch pricing is finalized, fill the optional `jst` field on a
 * system and the black row on /market switches from "pricing at launch" to
 * the real numbers — no layout changes needed.
 */

export const RESEARCH_DATE = "June 2026";
export const FX_NOTE = "US$1 ≈ J$157";

/** How a competitor charges — the structure, not just the number. */
export type FeeModel =
  | "Flat monthly"
  | "Per-seat monthly"
  | "Per-unit monthly"
  | "Usage-metered"
  | "Commission"
  | "One-time + monthly"
  | "Free + processing"
  | "Custom quote";

export type Competitor = {
  name: string;
  model: FeeModel;
  /** One-time fees: setup, onboarding, hardware. "None" when monthly-only. */
  oneTime: string;
  /** Ongoing price as published. */
  ongoing: string;
  notes: string;
};

export type SystemMarket = {
  id: number;
  name: string;
  slug: string;
  category: "Operations" | "Booking" | "Education" | "Growth" | "Intelligence";
  /** Engine modules this system lights up. */
  modules: string;
  competitors: Competitor[];
  /** What the market actually charges — the one-paragraph read. */
  marketNorm: string;
  /** Dominant fee structure in this category. */
  feeStructure: string;
  /** Where JST wins against this market. */
  jstAngle: string;
  /** Set when JST launch pricing is finalized. */
  jst?: { oneTime?: string; monthly?: string; note?: string };
};

export const FEE_MODEL_LEGEND: Array<{ model: FeeModel; meaning: string }> = [
  { model: "Flat monthly", meaning: "One subscription price per business" },
  { model: "Per-seat monthly", meaning: "Price multiplies by staff / users" },
  { model: "Per-unit monthly", meaning: "Price multiplies by units, doors, students or vehicles" },
  { model: "Usage-metered", meaning: "Pay per credit, conversation, minute or order" },
  { model: "Commission", meaning: "A % of every booking or sale — often $0 monthly" },
  { model: "One-time + monthly", meaning: "Setup, onboarding or hardware fee, then a subscription" },
  { model: "Free + processing", meaning: "Software is free; they earn on card processing" },
  { model: "Custom quote", meaning: "Sales-gated pricing, usually annual contracts" },
];

export const MARKET_SYSTEMS: SystemMarket[] = [
  {
    id: 1,
    name: "Courier & Delivery",
    slug: "courier-delivery",
    category: "Operations",
    modules: "records, pipeline, dispatch, customers, invoices, site, chatbot",
    competitors: [
      { name: "Onfleet", model: "Flat monthly", oneTime: "None", ongoing: "$599–2,999/mo", notes: "Task-capped tiers (2,500–10,000 deliveries). The category's premium anchor." },
      { name: "OptimoRoute", model: "Per-unit monthly", oneTime: "None", ongoing: "$35.10–44.10/driver/mo", notes: "Cheapest credible entry, but cost multiplies with every driver." },
      { name: "Routific", model: "Flat monthly", oneTime: "None", ongoing: "from $150/mo (1,000 orders)", notes: "Order-volume tiers; predictable scaling." },
      { name: "Spoke Dispatch", model: "Usage-metered", oneTime: "None", ongoing: "$125/mo + $0.04/stop over 1,000", notes: "Base plus per-stop overage." },
      { name: "Tookan", model: "Flat monthly", oneTime: "None", ongoing: "~$35–180/mo (task-capped)", notes: "Budget lane; 2026 reviews flag declining support." },
    ],
    marketNorm:
      "Entry runs $35–150/mo, but real fleets land at $150–600+/mo once driver counts or task caps bite. The premium tier (Onfleet) starts at $599/mo for 2,500 deliveries.",
    feeStructure: "Monthly only — no setup fees anywhere. Pricing scales by driver or by delivery volume.",
    jstAngle:
      "Every competitor sells dispatch only. One JST plan bundles dispatch + customer records + invoices + a branded site + a chatbot — the stack a courier would otherwise assemble from 3 subscriptions.",
  },
  {
    id: 2,
    name: "Movers & Storage",
    slug: "movers-storage",
    category: "Operations",
    modules: "jobs, calendar, quotes, storage units, invoices, site",
    competitors: [
      { name: "SmartMoving", model: "One-time + monthly", oneTime: "Onboarding fee (quoted)", ongoing: "from ~$399/mo (Growth)", notes: "Sales-gated; annual contracts typical for 20+ employee ops." },
      { name: "Supermove", model: "Custom quote", oneTime: "Implementation (quoted)", ongoing: "~$500–1,000+/mo (triangulated)", notes: "Enterprise specialist; pricing only via sales call." },
      { name: "MoveitPro", model: "Flat monthly", oneTime: "None published", ongoing: "from ~$135–150/mo", notes: "The budget-conscious lane of the category." },
      { name: "Elromco", model: "Flat monthly", oneTime: "None published", ongoing: "~mid-$200s/mo", notes: "Mid-market mover CRM." },
    ],
    marketNorm:
      "$135–400/mo for small-to-mid movers; the specialist platforms gate pricing behind sales calls and layer on onboarding fees and annual contracts.",
    feeStructure: "One-time onboarding + monthly at the specialist end; flat monthly in the budget lane.",
    jstAngle:
      "The category's leaders hide pricing and lock annual contracts. Published JMD pricing, month-to-month, with storage-unit tracking included (competitors treat storage as an add-on) is a clean wedge.",
  },
  {
    id: 3,
    name: "Warehouse / Inventory (WMS)",
    slug: "warehouse-inventory",
    category: "Operations",
    modules: "inventory, orders, pick/pack, reports",
    competitors: [
      { name: "Zoho Inventory", model: "Flat monthly", oneTime: "None", ongoing: "$29–299/mo", notes: "Order-volume tiers; free plan capped at 50 orders/mo." },
      { name: "Sortly", model: "Flat monthly", oneTime: "None", ongoing: "$49–149/mo", notes: "Simple asset/stock tracking; free plan caps at 100 items." },
      { name: "inFlow", model: "Flat monthly", oneTime: "None", ongoing: "from ~$89–299/mo", notes: "SMB favourite for light warehousing." },
      { name: "Fishbowl", model: "One-time + monthly", oneTime: "Onboarding/implementation (quoted)", ongoing: "from $349/mo + ~$75/user", notes: "Cloud WMS; per-seat adders stack quickly." },
      { name: "Cin7 Core", model: "Flat monthly", oneTime: "Implementation common", ongoing: "$349–999/mo", notes: "5–15 users, 6k–120k orders/yr; advanced WMS at the top tier." },
    ],
    marketNorm:
      "Light inventory is $29–149/mo; true pick/pack WMS jumps to $349–999/mo, and mid-market platforms add $500–3,000 one-time implementation.",
    feeStructure: "Flat monthly at the low end; one-time implementation + monthly once pick/pack workflows appear.",
    jstAngle:
      "There's a hole between $149 toy tools and $349+ real WMS. A JST build with pick/pack and reports priced inside that gap — setup included — undercuts the Fishbowl/Cin7 tier by hundreds a month.",
  },
  {
    id: 4,
    name: "Property Management",
    slug: "property-management",
    category: "Operations",
    modules: "units, tenants, leases, maintenance, rent ledger",
    competitors: [
      { name: "TenantCloud", model: "Flat monthly", oneTime: "None", ongoing: "$18–35+/mo", notes: "DIY landlords; free tier up to 75 units with limited features." },
      { name: "DoorLoop", model: "Per-unit monthly", oneTime: "None", ongoing: "from $59/mo", notes: "Per-unit scaling above the starter band." },
      { name: "Buildium", model: "Flat monthly", oneTime: "None", ongoing: "$58–375/mo", notes: "Flat tiers tied to door count; best under ~150 units." },
      { name: "AppFolio", model: "Per-unit monthly", oneTime: "Onboarding fee", ongoing: "$1.49–5.00/unit/mo · $298/mo minimum", notes: "Enterprise-grade; 50-unit minimum, AI leasing in upper tiers." },
    ],
    marketNorm:
      "Small landlords pay $18–60/mo; professional managers pay $58–375/mo flat or $1.50–5.00 per unit with a ~$298/mo floor at the enterprise end.",
    feeStructure: "Monthly (flat tier or per-unit). Onboarding fees and unit minimums appear at the enterprise end.",
    jstAngle:
      "Per-unit pricing punishes growth. A flat JMD plan with units, leases, maintenance and rent ledger — no per-door math, no 50-unit minimum — reads as instant savings to any Jamaican portfolio over ~30 units.",
  },
  {
    id: 5,
    name: "Restaurant & Hospitality",
    slug: "restaurant-hospitality",
    category: "Operations",
    modules: "menu, orders, tables/reservations, KDS, loyalty",
    competitors: [
      { name: "Square for Restaurants", model: "Free + processing", oneTime: "Hardware optional", ongoing: "$0–60+/mo + ~2.6% processing", notes: "No contract; wins under $500k/yr revenue." },
      { name: "Toast", model: "One-time + monthly", oneTime: "Hardware $500–1,500", ongoing: "$0–165+/mo + 2.99% + 15¢", notes: "2–3 yr contracts with termination fees are standard." },
      { name: "TouchBistro", model: "One-time + monthly", oneTime: "Hardware", ongoing: "from $69/mo + add-ons", notes: "Online ordering, loyalty, reservations are paid add-ons." },
      { name: "Lightspeed Restaurant", model: "Flat monthly", oneTime: "Hardware", ongoing: "$69–399/mo", notes: "Premium tier for multi-location groups." },
    ],
    marketNorm:
      "Software is $0–399/mo, but the true all-in for a full-service location is $300–1,200/mo once hardware, add-ons and 2.4–3.1% card processing land.",
    feeStructure: "One-time hardware + monthly software + processing percentage. Long contracts are the norm outside Square.",
    jstAngle:
      "Every add-on (KDS, reservations, loyalty) is a separate fee in this market. JST shipping menu + orders + tables + KDS + loyalty as one system, contract-free, attacks the add-on stacking directly.",
  },
  {
    id: 6,
    name: "Beauty & Salon Booking",
    slug: "beauty-salon",
    category: "Booking",
    modules: "calendar, bookings, deposits, customers, loyalty",
    competitors: [
      { name: "GlossGenius", model: "Flat monthly", oneTime: "None", ongoing: "$24–148/mo + 2.6% flat", notes: "Solo-tech favourite; flat processing is the hook." },
      { name: "Fresha", model: "Per-seat monthly", oneTime: "None", ongoing: "$19.95/mo + $14.95/staff + 2.29%+20¢", notes: "Moved off pure-free in 2025; fees ride on processing." },
      { name: "Booksy", model: "Per-seat monthly", oneTime: "None", ongoing: "$29.99/mo + $20/user", notes: "Marketplace exposure is the draw." },
      { name: "Vagaro", model: "Per-seat monthly", oneTime: "None", ongoing: "$30–90/mo by staff count + 2.75%", notes: "$30 solo → $90 at 7+ bookable staff." },
      { name: "Square Appointments", model: "Free + processing", oneTime: "None", ongoing: "$0–69/mo per location", notes: "Free solo tier; earns on processing." },
    ],
    marketNorm:
      "A solo nail tech pays $0–48/mo; a 3–7 chair salon pays $50–150/mo. Card processing of 2.3–3.3% sits on top of everything.",
    feeStructure: "Monthly only (flat or per-staff) — zero setup fees anywhere in this category. Processing % is the hidden second price.",
    jstAngle:
      "Deposits are the #1 no-show killer for Jamaican techs, and most platforms gate them behind upper tiers. JST leading with deposits + loyalty punch cards on the entry plan flips the category's upsell model.",
  },
  {
    id: 7,
    name: "Universal Appointment Setter",
    slug: "appointment-setter",
    category: "Booking",
    modules: "calendar, bookings, reminders, intake forms",
    competitors: [
      { name: "Calendly", model: "Per-seat monthly", oneTime: "None", ongoing: "$0–16/user/mo", notes: "Per-seat math scales painfully past a few staff." },
      { name: "Acuity Scheduling", model: "Flat monthly", oneTime: "None", ongoing: "$20–61/mo", notes: "Flat rate regardless of users; no free plan." },
      { name: "Setmore", model: "Per-seat monthly", oneTime: "None", ongoing: "$0–16/user/mo", notes: "Free plan covers 4 users / 200 appointments." },
      { name: "SimplyBook.me", model: "Flat monthly", oneTime: "None", ongoing: "€0–59.90/mo", notes: "Booking-volume pricing with 15 providers included on Standard." },
    ],
    marketNorm:
      "Commodity pricing: $10–20 per user or $20–60 flat. Free tiers everywhere make the entry price effectively $0.",
    feeStructure: "Monthly only. The fight is per-seat vs flat — flat wins for teams.",
    jstAngle:
      "Impossible to win on price alone — win on ownership: white-label booking on the client's own domain with intake forms and reminders, sold as part of a JST site, where Calendly is a generic link.",
  },
  {
    id: 8,
    name: "Tours & Experiences",
    slug: "tours-experiences",
    category: "Booking",
    modules: "trips, availability, bookings, waivers, site",
    competitors: [
      { name: "FareHarbor", model: "Commission", oneTime: "None", ongoing: "$0/mo + ~6% per booking (customer-paid)", notes: "Plus ~2% operator fee on OTA bookings. Dominant in the Caribbean." },
      { name: "Peek Pro", model: "Commission", oneTime: "None", ongoing: "$0/mo + up to ~6% + 2.3% + 30¢", notes: "Fees reported up to 6–8% all-in." },
      { name: "Checkfront", model: "Commission", oneTime: "None", ongoing: "3% per online booking", notes: "Operator can absorb or pass to customer." },
      { name: "Rezdy", model: "One-time + monthly", oneTime: "None", ongoing: "$49–249/mo + ~2%/online booking", notes: "Hybrid: subscription plus a smaller booking fee." },
      { name: "Bokun", model: "Usage-metered", oneTime: "None", ongoing: "~$49/mo + ~1.5% per booking", notes: "Tied into the Viator/Tripadvisor ecosystem." },
    ],
    marketNorm:
      "The category standard is $0 monthly and a 1.5–6% cut of every booking — a tour operator doing US$200k/yr quietly pays $3,000–12,000/yr in commissions.",
    feeStructure: "Commission-led: free to join, paid per booking. Hybrids (Rezdy, Bokun) charge monthly + a smaller %.",
    jstAngle:
      "Flat monthly, 0% commission is the headline. A Jamaican operator doing J$10M/yr in bookings keeps roughly J$600k that FareHarbor's model would have skimmed — the system pays for itself in saved commission.",
  },
  {
    id: 9,
    name: "School / Academy Management",
    slug: "school-academy",
    category: "Education",
    modules: "students, classes, attendance, grades, fees",
    competitors: [
      { name: "Gradelink", model: "Per-unit monthly", oneTime: "Training included", ongoing: "$121/mo (≤50 students) → $210/mo (≤150)", notes: "Banded by active student count." },
      { name: "Sycamore School", model: "Per-unit monthly", oneTime: "Setup common", ongoing: "~$1.20/student/mo", notes: "Pure per-student; minimums apply." },
      { name: "Classe365", model: "Flat monthly", oneTime: "None published", ongoing: "from ~$100/mo (modular)", notes: "Pay only for the modules (SIS, LMS, CRM) you switch on." },
      { name: "PowerSchool / enterprise SIS", model: "Custom quote", oneTime: "Implementation + data migration", ongoing: "per-student/yr (quoted)", notes: "District-grade; heavy onboarding." },
    ],
    marketNorm:
      "Small private schools pay $100–250/mo (or ~$1–3 per student); enterprise SIS adds one-time implementation and data-migration fees on top of per-student annual pricing.",
    feeStructure: "Per-student monthly is the norm; one-time setup/data migration is common as schools scale.",
    jstAngle:
      "Fees collection is where Jamaican academies bleed (manual receipts, no ledger). Bundling fee tracking + parent payment links with attendance and grades makes JST an income tool, not an admin expense.",
  },
  {
    id: 10,
    name: "Loyalty & Rewards",
    slug: "loyalty-rewards",
    category: "Growth",
    modules: "points ledger, tiers, punch cards, campaigns — also an add-on to any system",
    competitors: [
      { name: "Smile.io", model: "Flat monthly", oneTime: "None", ongoing: "$0–999/mo", notes: "Paid plans from $49/mo; tiers scale with order volume." },
      { name: "Kangaroo Rewards", model: "Flat monthly", oneTime: "None", ongoing: "from ~$59/mo", notes: "Omnichannel SMB loyalty." },
      { name: "LoyaltyLion", model: "Flat monthly", oneTime: "None", ongoing: "from $159/mo", notes: "Free ≤400 orders/mo; premium positioning." },
      { name: "Stamped (Loyalty)", model: "Flat monthly", oneTime: "None", ongoing: "from $299/mo (loyalty suite)", notes: "Reviews product is cheaper; loyalty is the pricey half." },
      { name: "Square Loyalty", model: "Per-unit monthly", oneTime: "None", ongoing: "~$45/mo per location", notes: "Simple punch-card-style, tied to Square POS." },
    ],
    marketNorm:
      "Standalone loyalty runs $49–399/mo and climbs with order volume. Nobody charges setup — the fight is monthly price vs order caps.",
    feeStructure: "Monthly only, scaled by order volume or location count.",
    jstAngle:
      "As a built-in add-on to any JST system (salon, restaurant, courier), loyalty becomes a cross-sell at a fraction of the $49–299/mo standalone market — and the punch-card model already proven in JST client work.",
  },
  {
    id: 11,
    name: "Analytics Dashboards",
    slug: "analytics-dashboards",
    category: "Intelligence",
    modules: "cross-system BI, KPIs, exports",
    competitors: [
      { name: "Power BI Pro", model: "Per-seat monthly", oneTime: "None", ongoing: "$14/user/mo", notes: "The volume price-setter; needs a data person to drive it." },
      { name: "Tableau", model: "Per-seat monthly", oneTime: "None", ongoing: "~$70–75/user/mo (Creator)", notes: "Viewers ~$15; 50 users ≈ $25–40k/yr." },
      { name: "Databox", model: "Flat monthly", oneTime: "None", ongoing: "$47–319+/mo", notes: "Scales by data sources and users." },
      { name: "Klipfolio", model: "Flat monthly", oneTime: "None", ongoing: "$90–142+/mo", notes: "Agency plans up to ~$1,025/mo." },
      { name: "Looker", model: "Custom quote", oneTime: "Implementation", ongoing: "~$3,000–5,000/mo (10-user min)", notes: "Enterprise only. Looker Studio remains free." },
      { name: "Custom dashboard agencies", model: "One-time + monthly", oneTime: "$2,000–10,000 build", ongoing: "maintenance retainers", notes: "What SMBs actually buy when tools need a driver." },
    ],
    marketNorm:
      "Self-serve BI is $14–75/user/mo, flat tools $47–320/mo — but every option assumes someone builds the dashboards. Agencies charge $2–10k one-time for that.",
    feeStructure: "Per-seat or flat monthly for tools; one-time build + retainer when done-for-you.",
    jstAngle:
      "JST systems already own the data, so cross-system KPIs ship pre-built — no $2–10k dashboard project, no analyst seat. 'Your numbers, already wired' is the pitch.",
  },
  {
    id: 12,
    name: "AI Chatbot Builder",
    slug: "ai-chatbot",
    category: "Intelligence",
    modules: "trainable assistant, website widget, CRM copilot",
    competitors: [
      { name: "Chatbase", model: "Usage-metered", oneTime: "None", ongoing: "$0–400/mo (credit tiers)", notes: "$40 per extra 1,000 credits; the DIY benchmark." },
      { name: "Tidio + Lyro AI", model: "Usage-metered", oneTime: "None", ongoing: "$29/mo base + $39–289/mo AI", notes: "Per-conversation AI add-on; real spend ~$100–150/mo." },
      { name: "Botpress", model: "Usage-metered", oneTime: "None", ongoing: "PAYG free → ~$89–495/mo + AI spend", notes: "Developer-grade; LLM usage billed on top." },
      { name: "Intercom Fin", model: "Usage-metered", oneTime: "None", ongoing: "$29–132/seat/mo + $0.99/resolution", notes: "50-resolution monthly minimum; enterprise lane." },
      { name: "Custom agency bots", model: "One-time + monthly", oneTime: "$1,000–5,000 build", ongoing: "$50–500/mo retainer", notes: "Trained, branded, maintained for you." },
    ],
    marketNorm:
      "DIY platforms cost $30–400/mo metered by credits or conversations; mid-market support bots run $500–3,000/mo. Done-for-you builds add a $1–5k one-time fee.",
    feeStructure: "Usage-metered monthly for DIY; one-time build + monthly for done-for-you.",
    jstAngle:
      "JST's bot is trained on the client's own CRM and site data as part of the system — the 'done-for-you' tier at DIY pricing, with no per-resolution meter anxiety.",
  },
  {
    id: 13,
    name: "AI Voice Agent",
    slug: "ai-voice-agent",
    category: "Intelligence",
    modules: "in-browser voice receptionist, call summaries",
    competitors: [
      { name: "Retell AI", model: "Usage-metered", oneTime: "None", ongoing: "from $0.07/min (≈$0.10–0.20 all-in)", notes: "Pay-as-you-go, no platform fee." },
      { name: "Vapi", model: "Usage-metered", oneTime: "None", ongoing: "$0.05/min platform → $0.25–0.33/min all-in", notes: "Telephony, voice + LLM fees stack on top." },
      { name: "Bland AI", model: "One-time + monthly", oneTime: "None", ongoing: "$0.14/min free plan → $499/mo @ $0.11/min", notes: "Tiered subscriptions since Dec 2025." },
      { name: "Synthflow", model: "One-time + monthly", oneTime: "None", ongoing: "Pro $450/mo incl. 2,000 min", notes: "No-code; 25 concurrent calls on Pro." },
      { name: "Goodcall", model: "Flat monthly", oneTime: "None", ongoing: "from ~$59/agent/mo", notes: "Productized receptionist for SMBs." },
    ],
    marketNorm:
      "Raw platforms bill $0.07–0.33 per minute; productized receptionists package that as $59–500/mo. A human receptionist is ~$3,000/mo — the category sells against that number.",
    feeStructure: "Usage-metered (per minute) at the platform layer; flat monthly bundles with included minutes at the product layer.",
    jstAngle:
      "Selling the receptionist, not the minutes: a flat JMD plan with included minutes, wired into the client's bookings and CRM, beats quoting Jamaican SMBs in US-cents-per-minute.",
  },
];

export const CATEGORY_ORDER = [
  "Operations",
  "Booking",
  "Education",
  "Growth",
  "Intelligence",
] as const;

export function systemsByCategory(category: (typeof CATEGORY_ORDER)[number]): SystemMarket[] {
  return MARKET_SYSTEMS.filter((s) => s.category === category);
}
