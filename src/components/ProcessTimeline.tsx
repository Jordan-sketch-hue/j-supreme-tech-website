const steps = ["Discover", "Design", "Architect", "Build", "Test", "Launch", "Support & Scale"];

export function ProcessTimeline() {
  return (
    <div className="mt-12 grid gap-4 lg:grid-cols-7">
      {steps.map((step, index) => (
        <div key={step} className="relative rounded-2xl border border-white/10 bg-[#050505]/70 p-5">
          <div className="mb-8 flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-[0.22em] text-[#A855F7]">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="h-2 w-2 rounded-full bg-[#6D5BFF] shadow-[0_0_22px_rgba(109,91,255,0.9)]" />
          </div>
          <h3 className="text-lg font-black text-white">{step}</h3>
          <p className="mt-3 text-sm leading-6 text-[#B3B3B3]">
            {index === 0 && "Clarify goals, audience, offers, workflows, and measurable business outcomes."}
            {index === 1 && "Shape the interface, content hierarchy, visual direction, and conversion paths."}
            {index === 2 && "Map the system structure, data flow, integrations, dashboards, and automation logic."}
            {index === 3 && "Develop the responsive frontend, backend logic, CMS, forms, and core features."}
            {index === 4 && "Review speed, mobile behavior, user flows, security basics, and production readiness."}
            {index === 5 && "Deploy to a Vercel-ready environment with SEO metadata and handoff support."}
            {index === 6 && "Improve, automate, expand, and evolve the ecosystem as the business grows."}
          </p>
        </div>
      ))}
    </div>
  );
}
