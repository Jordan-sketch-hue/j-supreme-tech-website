export type VercelProject = {
  name: string;
  productionUrl: string | null;
  updated: string;
  nodeVersion: string;
  category: "JST" | "Client" | "Internal" | "Prototype";
};

export const VERCEL_PROJECTS: VercelProject[] = [
  {
    name: "j-supreme-conglomerate",
    productionUrl: "https://j-supreme-conglomerate.vercel.app",
    updated: "2h",
    nodeVersion: "24.x",
    category: "JST",
  },
  {
    name: "j-supreme-tech-website",
    productionUrl: "https://j-supreme-tech-website-jordan-sketch-hues-projects.vercel.app",
    updated: "4h",
    nodeVersion: "24.x",
    category: "JST",
  },
  { name: "aboo-tours", productionUrl: "https://abo-tours.vercel.app", updated: "22h", nodeVersion: "24.x", category: "Client" },
  { name: "solace-auto-imports", productionUrl: "https://solace-auto-imports.vercel.app", updated: "24h", nodeVersion: "24.x", category: "Client" },
  { name: "courier-app", productionUrl: "https://courier-app-gamma.vercel.app", updated: "1d", nodeVersion: "24.x", category: "Client" },
  { name: "jader", productionUrl: null, updated: "1d", nodeVersion: "24.x", category: "Prototype" },
  { name: "thelanguagecradle", productionUrl: "https://thelanguagecradle.vercel.app", updated: "1d", nodeVersion: "24.x", category: "Client" },
  { name: "fora-web", productionUrl: "https://fora-web.vercel.app", updated: "1d", nodeVersion: "24.x", category: "Client" },
  { name: "only-source-wholesale", productionUrl: "https://only-source-wholesale.vercel.app", updated: "1d", nodeVersion: "24.x", category: "Client" },
  { name: "island-rise-events", productionUrl: "https://island-rise-events.vercel.app", updated: "1d", nodeVersion: "24.x", category: "Client" },
  { name: "infinitteherbs", productionUrl: "https://infinitteherbs.vercel.app", updated: "1d", nodeVersion: "24.x", category: "Client" },
  { name: "lingua-caribe", productionUrl: "https://lingua-caribe.vercel.app", updated: "1d", nodeVersion: "24.x", category: "Client" },
  { name: "wander", productionUrl: "https://wander-henna.vercel.app", updated: "1d", nodeVersion: "24.x", category: "Client" },
  { name: "islandbridge-freight", productionUrl: "https://islandbridge-freight.vercel.app", updated: "1d", nodeVersion: "24.x", category: "Client" },
  { name: "islandrelay", productionUrl: "https://empty-window-eight.vercel.app", updated: "1d", nodeVersion: "24.x", category: "Client" },
  { name: "carib-ortho-supply", productionUrl: "https://carib-ortho-supply.vercel.app", updated: "1d", nodeVersion: "24.x", category: "Client" },
  { name: "damazin-by-dee", productionUrl: "https://damazin-by-dee.vercel.app", updated: "1d", nodeVersion: "24.x", category: "Client" },
  { name: "jutatoursja", productionUrl: "https://jutatoursja.vercel.app", updated: "1d", nodeVersion: "24.x", category: "Client" },
  { name: "supplyandemand", productionUrl: "https://supplyandemand.vercel.app", updated: "1d", nodeVersion: "24.x", category: "Client" },
  {
    name: "jsuprememarketinsititue",
    productionUrl: "https://jsuprememarketinsititue-jordan-sketch-hues-projects.vercel.app",
    updated: "1d",
    nodeVersion: "24.x",
    category: "JST",
  },
  { name: "sortedja", productionUrl: "https://sortedja.vercel.app", updated: "1d", nodeVersion: "24.x", category: "Client" },
  { name: "j-supreme-marketing-web", productionUrl: "https://j-supreme-marketing-web.vercel.app", updated: "1d", nodeVersion: "24.x", category: "JST" },
];
