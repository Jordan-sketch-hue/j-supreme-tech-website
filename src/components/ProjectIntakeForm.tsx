"use client";

import { FormEvent, useState } from "react";
import { ArrowRight } from "lucide-react";

const intakeServices = [
  "Digital Presence Systems",
  "Mobile App Development",
  "Commerce & Application Systems",
  "Business Operating Systems",
  "Booking & Reservation Systems",
  "Creative Technology & Digital Systems",
  "Branding & Digital Presentation",
];

const sopDiscoveryItems = [
  "Help me clarify my business idea and brand direction",
  "Help me define my goals and ideal customers",
  "Create a visual layout before building",
  "Make the website work well on phones, tablets, and computers",
  "Help with colors, fonts, logo style, and brand visuals",
  "Build the full system, including website, dashboard, login, or database features",
  "Add booking, payments, customer tracking, automation, or reports",
  "Test everything, launch it online, and show me how to use it",
];

const integrationOptions = [
  "Put the website online",
  "Save the project code safely",
  "Store customer, booking, product, or form data",
  "Add secure sign in / account login",
  "Use my logo, photos, flyers, or design files",
  "Create or use AI-style images for the brand",
  "Accept online payments",
  "Send automatic emails, confirmations, or alerts",
];

const textFields = ["Name", "Business Name", "Email", "WhatsApp Number"];

type SubmissionState = "idle" | "submitting" | "success" | "error";

export function ProjectIntakeForm() {
  const [status, setStatus] = useState<SubmissionState>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: formData.get("name"),
      businessName: formData.get("businessName"),
      email: formData.get("email"),
      whatsapp: formData.get("whatsapp"),
      serviceNeeded: formData.get("serviceNeeded"),
      budgetRange: formData.get("budgetRange"),
      projectStage: formData.get("projectStage"),
      timeline: formData.get("timeline"),
      sopCategory: formData.get("sopCategory"),
      discoveryRequirements: formData.getAll("discoveryRequirements"),
      integrations: formData.getAll("integrations"),
      goalsAudience: formData.get("goalsAudience"),
      references: formData.get("references"),
      projectDescription: formData.get("projectDescription"),
      qualityControlNotes: formData.get("qualityControlNotes"),
    };

    try {
      const response = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Submission failed.");
      }

      setStatus("success");
      setMessage(data.message || "Project inquiry received.");
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Submission failed. Please contact J Supreme Tech by WhatsApp or email.",
      );
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl border border-white/10 bg-white/[0.05] p-5 shadow-[0_0_90px_rgba(123,47,255,0.16)] backdrop-blur md:p-8">
      <div className="grid gap-4 md:grid-cols-2">
        {textFields.map((field) => {
          const name = field === "Business Name" ? "businessName" : field === "WhatsApp Number" ? "whatsapp" : field.toLowerCase();
          return (
            <label key={field} className="text-sm font-semibold text-white">
              {field}
              <input name={name} required={field !== "Business Name"} className="mt-2 w-full rounded-xl border border-white/10 bg-[#050505] px-4 py-3 text-sm text-white outline-none focus:border-[#A855F7]" placeholder={field} />
            </label>
          );
        })}
        <label className="text-sm font-semibold text-white">
          Service Needed
          <select name="serviceNeeded" className="mt-2 w-full rounded-xl border border-white/10 bg-[#050505] px-4 py-3 text-sm text-white outline-none focus:border-[#A855F7]">
            <option>Website Development</option>
            <option>Mobile App Development</option>
            <option>E-Commerce System</option>
            <option>Booking System</option>
            <option>CRM / Dashboard</option>
            <option>Full Digital Ecosystem</option>
          </select>
        </label>
        <label className="text-sm font-semibold text-white">
          Budget Range
          <select name="budgetRange" className="mt-2 w-full rounded-xl border border-white/10 bg-[#050505] px-4 py-3 text-sm text-white outline-none focus:border-[#A855F7]">
            <option>JMD $10,000 - $50,000</option>
            <option>JMD $50,000 - $150,000</option>
            <option>JMD $150,000+</option>
            <option>Custom enterprise quote</option>
          </select>
        </label>
        <label className="text-sm font-semibold text-white">
          Project Stage
          <select name="projectStage" className="mt-2 w-full rounded-xl border border-white/10 bg-[#050505] px-4 py-3 text-sm text-white outline-none focus:border-[#A855F7]">
            <option>Idea / planning</option>
            <option>Existing business, needs upgrade</option>
            <option>Existing website or system</option>
            <option>Ready to build now</option>
            <option>Scaling an active operation</option>
          </select>
        </label>
        <label className="text-sm font-semibold text-white">
          Target Launch Timeline
          <select name="timeline" className="mt-2 w-full rounded-xl border border-white/10 bg-[#050505] px-4 py-3 text-sm text-white outline-none focus:border-[#A855F7]">
            <option>ASAP</option>
            <option>2-4 weeks</option>
            <option>1-3 months</option>
            <option>3+ months</option>
            <option>Not sure yet</option>
          </select>
        </label>
        <label className="text-sm font-semibold text-white md:col-span-2">
          SOP Service Category
          <select name="sopCategory" className="mt-2 w-full rounded-xl border border-white/10 bg-[#050505] px-4 py-3 text-sm text-white outline-none focus:border-[#A855F7]">
            {intakeServices.map((service) => (
              <option key={service}>{service}</option>
            ))}
          </select>
        </label>
        <fieldset className="rounded-2xl border border-white/10 bg-[#050505]/70 p-4 md:col-span-2">
          <legend className="px-2 text-sm font-bold text-white">What Do You Need Help With?</legend>
          <p className="mt-1 text-sm leading-6 text-[#B3B3B3]">
            Select anything you want J Supreme Tech to handle. It is fine if you are not sure yet.
          </p>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {sopDiscoveryItems.map((item) => (
              <label key={item} className="flex items-start gap-3 text-sm leading-6 text-[#B3B3B3]">
                <input name="discoveryRequirements" value={item} type="checkbox" className="mt-1 h-4 w-4 rounded border-white/20 bg-[#050505] accent-[#7B2FFF]" />
                {item}
              </label>
            ))}
          </div>
        </fieldset>
        <fieldset className="rounded-2xl border border-white/10 bg-[#050505]/70 p-4 md:col-span-2">
          <legend className="px-2 text-sm font-bold text-white">Tools Or Features You May Need</legend>
          <p className="mt-1 text-sm leading-6 text-[#B3B3B3]">
            Choose the features that sound useful. We will recommend the right tools after reviewing your project.
          </p>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {integrationOptions.map((item) => (
              <label key={item} className="flex items-start gap-3 text-sm leading-6 text-[#B3B3B3]">
                <input name="integrations" value={item} type="checkbox" className="mt-1 h-4 w-4 rounded border-white/20 bg-[#050505] accent-[#7B2FFF]" />
                {item}
              </label>
            ))}
          </div>
        </fieldset>
        <label className="text-sm font-semibold text-white md:col-span-2">
          Business Goals & Target Audience
          <textarea name="goalsAudience" required className="mt-2 min-h-28 w-full rounded-xl border border-white/10 bg-[#050505] px-4 py-3 text-sm text-white outline-none focus:border-[#A855F7]" placeholder="Who do you serve, what do you sell, and what should the system help you achieve?" />
        </label>
        <label className="text-sm font-semibold text-white md:col-span-2">
          Existing Links / Assets / References
          <textarea name="references" className="mt-2 min-h-24 w-full rounded-xl border border-white/10 bg-[#050505] px-4 py-3 text-sm text-white outline-none focus:border-[#A855F7]" placeholder="Add website links, GitHub links, brand folders, Adobe assets, Midjourney references, dashboards, or competitor references." />
        </label>
        <label className="text-sm font-semibold text-white md:col-span-2">
          Project Description
          <textarea name="projectDescription" required className="mt-2 min-h-36 w-full rounded-xl border border-white/10 bg-[#050505] px-4 py-3 text-sm text-white outline-none focus:border-[#A855F7]" placeholder="Describe the website, app, dashboard, booking system, CRM, automation, branding system, or full digital ecosystem you want to build." />
        </label>
        <label className="text-sm font-semibold text-white md:col-span-2">
          Quality Control Notes
          <textarea name="qualityControlNotes" className="mt-2 min-h-24 w-full rounded-xl border border-white/10 bg-[#050505] px-4 py-3 text-sm text-white outline-none focus:border-[#A855F7]" placeholder="List must-have standards for visual presentation, responsiveness, performance, animations, documentation, or deployment readiness." />
        </label>
      </div>
      <button type="submit" disabled={status === "submitting"} className="premium-button mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-4 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-70">
        {status === "submitting" ? "Sending Inquiry..." : "Send Project Inquiry"}
        <ArrowRight className="h-4 w-4" />
      </button>
      {message ? (
        <p className={`mt-4 rounded-xl border px-4 py-3 text-sm ${status === "success" ? "border-[#00D26A]/30 bg-[#00D26A]/10 text-[#00D26A]" : "border-red-400/30 bg-red-500/10 text-red-200"}`}>
          {message}
        </p>
      ) : null}
    </form>
  );
}
