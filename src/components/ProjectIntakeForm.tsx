"use client";

import { FormEvent, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { track } from "@/lib/track";

const intakeServices = [
  "Digital Presence Systems",
  "Mobile App Development",
  "Commerce & Application Systems",
  "Business Operating Systems",
  "Booking & Reservation Systems",
  "Creative Technology & Digital Systems",
  "Social Media Marketing",
  "Branding & Design",
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

const fieldClass =
  "mt-2 w-full rounded-lg border border-line bg-white px-4 py-3 text-sm text-ink-900 outline-none transition focus:border-ink-900 placeholder:text-ink-400";
const labelClass = "block text-sm font-medium text-ink-800";

export function ProjectIntakeForm({ defaultService }: { defaultService?: string } = {}) {
  const [status, setStatus] = useState<SubmissionState>("idle");
  const [message, setMessage] = useState("");
  const formStarted = useRef(false);

  function handleFirstInput() {
    if (!formStarted.current) {
      formStarted.current = true;
      track("form_start", { form: "intake" });
    }
  }

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
      track("intake_submit", { service: payload.serviceNeeded, budget: payload.budgetRange });
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
    <form
      onSubmit={handleSubmit}
      onFocus={handleFirstInput}
      className="card p-5 shadow-[0_30px_60px_-32px_rgba(0,0,0,0.22)] md:p-8"
    >
      <div className="grid gap-4 md:grid-cols-2">
        {textFields.map((field) => {
          const name =
            field === "Business Name"
              ? "businessName"
              : field === "WhatsApp Number"
                ? "whatsapp"
                : field.toLowerCase();
          return (
            <label key={field} className={labelClass}>
              {field}
              <input
                name={name}
                required={field !== "Business Name"}
                className={fieldClass}
                placeholder={field}
              />
            </label>
          );
        })}
        <label className={labelClass}>
          Service Needed
          <select name="serviceNeeded" className={fieldClass} defaultValue={defaultService}>
            <option>Website Development</option>
            <option>Mobile App Development</option>
            <option>E-Commerce System</option>
            <option>Booking System</option>
            <option>CRM / Dashboard</option>
            <option>Social Media Marketing</option>
            <option>Branding &amp; Design</option>
            <option>Full Digital Ecosystem</option>
          </select>
        </label>
        <label className={labelClass}>
          Budget Range
          <select name="budgetRange" className={fieldClass}>
            <option>JMD $10,000 - $50,000</option>
            <option>JMD $50,000 - $150,000</option>
            <option>JMD $150,000+</option>
            <option>Custom enterprise quote</option>
          </select>
        </label>
        <label className={labelClass}>
          Project Stage
          <select name="projectStage" className={fieldClass}>
            <option>Idea / planning</option>
            <option>Existing business, needs upgrade</option>
            <option>Existing website or system</option>
            <option>Ready to build now</option>
            <option>Scaling an active operation</option>
          </select>
        </label>
        <label className={labelClass}>
          Target Launch Timeline
          <select name="timeline" className={fieldClass}>
            <option>ASAP</option>
            <option>2-4 weeks</option>
            <option>1-3 months</option>
            <option>3+ months</option>
            <option>Not sure yet</option>
          </select>
        </label>
        <label className={`${labelClass} md:col-span-2`}>
          SOP Service Category
          <select name="sopCategory" className={fieldClass}>
            {intakeServices.map((service) => (
              <option key={service}>{service}</option>
            ))}
          </select>
        </label>
        <fieldset className="rounded-xl border border-line bg-ink-50 p-4 md:col-span-2">
          <legend className="px-2 text-sm font-semibold text-ink-900">
            What Do You Need Help With?
          </legend>
          <p className="mt-1 text-sm leading-6 text-ink-500">
            Select anything you want J Supreme Tech to handle. It is fine if you
            are not sure yet.
          </p>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {sopDiscoveryItems.map((item) => (
              <label
                key={item}
                className="flex items-start gap-3 text-sm leading-6 text-ink-600"
              >
                <input
                  name="discoveryRequirements"
                  value={item}
                  type="checkbox"
                  className="mt-1 h-4 w-4 rounded border-ink-300 accent-ink-900"
                />
                {item}
              </label>
            ))}
          </div>
        </fieldset>
        <fieldset className="rounded-xl border border-line bg-ink-50 p-4 md:col-span-2">
          <legend className="px-2 text-sm font-semibold text-ink-900">
            Tools Or Features You May Need
          </legend>
          <p className="mt-1 text-sm leading-6 text-ink-500">
            Choose the features that sound useful. We will recommend the right
            tools after reviewing your project.
          </p>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {integrationOptions.map((item) => (
              <label
                key={item}
                className="flex items-start gap-3 text-sm leading-6 text-ink-600"
              >
                <input
                  name="integrations"
                  value={item}
                  type="checkbox"
                  className="mt-1 h-4 w-4 rounded border-ink-300 accent-ink-900"
                />
                {item}
              </label>
            ))}
          </div>
        </fieldset>
        <label className={`${labelClass} md:col-span-2`}>
          Business Goals &amp; Target Audience
          <textarea
            name="goalsAudience"
            required
            className={`${fieldClass} min-h-28`}
            placeholder="Who do you serve, what do you sell, and what should the system help you achieve?"
          />
        </label>
        <label className={`${labelClass} md:col-span-2`}>
          Existing Links / Assets / References
          <textarea
            name="references"
            className={`${fieldClass} min-h-24`}
            placeholder="Add website links, GitHub links, brand folders, Adobe assets, Midjourney references, dashboards, or competitor references."
          />
        </label>
        <label className={`${labelClass} md:col-span-2`}>
          Project Description
          <textarea
            name="projectDescription"
            required
            className={`${fieldClass} min-h-36`}
            placeholder="Describe the website, app, dashboard, booking system, CRM, automation, branding system, or full digital ecosystem you want to build."
          />
        </label>
        <label className={`${labelClass} md:col-span-2`}>
          Quality Control Notes
          <textarea
            name="qualityControlNotes"
            className={`${fieldClass} min-h-24`}
            placeholder="List must-have standards for visual presentation, responsiveness, performance, animations, documentation, or deployment readiness."
          />
        </label>
      </div>
      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn btn-dark mt-6 w-full disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? "Sending Inquiry..." : "Send Project Inquiry"}
        <ArrowRight className="h-4 w-4" />
      </button>
      {message ? (
        <p
          className={`mt-4 rounded-lg border px-4 py-3 text-sm ${
            status === "success"
              ? "border-ink-300 bg-ink-100 text-ink-900"
              : "border-red-300 bg-red-50 text-red-700"
          }`}
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
