"use client";

import { FormEvent, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { track } from "@/lib/track";

const SERVICE_OPTIONS = [
  "Website Development",
  "Mobile App Development",
  "E-Commerce System",
  "Booking System",
  "CRM / Dashboard",
  "Social Media Marketing",
  "Branding & Design",
  "Full Digital Ecosystem",
] as const;

// The internal SOP taxonomy used to still exist as a second, near-duplicate
// dropdown in this form. It's derived automatically from the service picked
// above instead of asking the client the same question twice.
const SOP_CATEGORY_BY_SERVICE: Record<string, string> = {
  "Website Development": "Digital Presence Systems",
  "Mobile App Development": "Mobile App Development",
  "E-Commerce System": "Commerce & Application Systems",
  "Booking System": "Booking & Reservation Systems",
  "CRM / Dashboard": "Business Operating Systems",
  "Social Media Marketing": "Social Media Marketing",
  "Branding & Design": "Branding & Design",
  "Full Digital Ecosystem": "Creative Technology & Digital Systems",
};

const BUDGET_OPTIONS = [
  "JMD $10,000 - $50,000",
  "JMD $50,000 - $150,000",
  "JMD $150,000+",
  "Custom enterprise quote",
];

const STAGE_OPTIONS = [
  "Idea / planning",
  "Existing business, needs upgrade",
  "Existing website or system",
  "Ready to build now",
  "Scaling an active operation",
];

const TIMELINE_OPTIONS = ["ASAP", "2-4 weeks", "1-3 months", "3+ months", "Not sure yet"];

// Replaces the old 16-checkbox pair (8 "discovery requirements" + 8
// "integrations"). Baseline delivery items — mobile-responsive, launch,
// hosting, QA — were dropped; those are standard service delivery, not a
// client decision. What's left is genuine scoping signal.
const EXTRAS_OPTIONS = [
  "Help with branding, colors, or visual design",
  "Help defining my goals and target audience",
  "Full system — dashboard, login, database",
  "Booking, payments, or customer tracking",
  "Secure sign-in / accounts",
  "Use my existing logo, photos, or files",
  "AI-generated images for the brand",
  "Automated emails, confirmations, or alerts",
];

type FormValues = {
  name: string;
  businessName: string;
  email: string;
  whatsapp: string;
  serviceNeeded: string;
  budgetRange: string;
  projectStage: string;
  timeline: string;
  extras: string[];
  projectDescription: string;
  references: string;
};

type SubmissionState = "idle" | "submitting" | "success" | "error";

const STEP_LABELS = ["About You", "Your Project", "Tell Us More"];

const fieldClass =
  "mt-2 w-full rounded-lg border border-line bg-white px-4 py-3 text-sm text-ink-900 outline-none transition focus:border-ink-900 placeholder:text-ink-400";
const labelClass = "block text-sm font-medium text-ink-800";

function initialValues(defaultService?: string): FormValues {
  return {
    name: "",
    businessName: "",
    email: "",
    whatsapp: "",
    serviceNeeded: defaultService ?? "",
    budgetRange: "",
    projectStage: "",
    timeline: "",
    extras: [],
    projectDescription: "",
    references: "",
  };
}

export function ProjectIntakeForm({ defaultService }: { defaultService?: string } = {}) {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<FormValues>(() => initialValues(defaultService));
  const [status, setStatus] = useState<SubmissionState>("idle");
  const [message, setMessage] = useState("");
  const [stepError, setStepError] = useState("");
  const formStarted = useRef(false);

  function handleFirstInput() {
    if (!formStarted.current) {
      formStarted.current = true;
      track("form_start", { form: "intake" });
    }
  }

  function set<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function toggleExtra(item: string) {
    setValues((prev) => ({
      ...prev,
      extras: prev.extras.includes(item)
        ? prev.extras.filter((e) => e !== item)
        : [...prev.extras, item],
    }));
  }

  function goNext() {
    if (step === 0) {
      if (!values.name.trim() || !values.email.trim() || !values.whatsapp.trim()) {
        setStepError("Name, email, and WhatsApp number are required.");
        return;
      }
    }
    setStepError("");
    setStep((s) => Math.min(s + 1, STEP_LABELS.length - 1));
  }

  function goBack() {
    setStepError("");
    setStep((s) => Math.max(s - 1, 0));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!values.projectDescription.trim()) {
      setStepError("Tell us what you're trying to build — this field is required.");
      return;
    }

    setStatus("submitting");
    setMessage("");
    setStepError("");

    const sopCategory = SOP_CATEGORY_BY_SERVICE[values.serviceNeeded] ?? values.serviceNeeded;

    const payload = {
      name: values.name,
      businessName: values.businessName || undefined,
      email: values.email,
      whatsapp: values.whatsapp,
      serviceNeeded: values.serviceNeeded || undefined,
      budgetRange: values.budgetRange || undefined,
      projectStage: values.projectStage || undefined,
      timeline: values.timeline || undefined,
      sopCategory: values.serviceNeeded ? sopCategory : undefined,
      discoveryRequirements: values.extras,
      integrations: values.extras,
      references: values.references || undefined,
      projectDescription: values.projectDescription,
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
      setValues(initialValues());
      setStep(0);
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Submission failed. Please contact J Supreme Tech by WhatsApp or email.",
      );
    }
  }

  if (status === "success") {
    return (
      <div className="card p-8 text-center shadow-[0_30px_60px_-32px_rgba(0,0,0,0.22)]">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-ink-900 text-white">
          <Check className="h-6 w-6" />
        </div>
        <p className="mt-4 text-lg font-semibold text-ink-900">{message}</p>
        <p className="mt-2 text-sm text-ink-500">
          We&apos;ll come back with a system plan, scope, and timeline.
        </p>
      </div>
    );
  }

  return (
    <form
      id="project-intake-form"
      onSubmit={handleSubmit}
      onFocus={handleFirstInput}
      className="card p-5 shadow-[0_30px_60px_-32px_rgba(0,0,0,0.22)] md:p-8"
    >
      {/* Step progress */}
      <div className="flex items-center justify-between gap-2">
        {STEP_LABELS.map((label, i) => (
          <div key={label} className="flex flex-1 items-center gap-2">
            <span
              className={`flex h-6 w-6 flex-none items-center justify-center rounded-full font-mono text-[0.65rem] font-semibold transition ${
                i <= step ? "bg-ink-900 text-white" : "bg-ink-100 text-ink-400"
              }`}
            >
              {i + 1}
            </span>
            <span
              className={`hidden text-xs font-medium sm:inline ${i <= step ? "text-ink-900" : "text-ink-400"}`}
            >
              {label}
            </span>
            {i < STEP_LABELS.length - 1 && (
              <span className={`h-px flex-1 ${i < step ? "bg-ink-900" : "bg-ink-100"}`} />
            )}
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs font-medium uppercase tracking-[0.1em] text-ink-400 sm:hidden">
        Step {step + 1} of {STEP_LABELS.length} — {STEP_LABELS[step]}
      </p>

      {/* Step 1 — About You */}
      {step === 0 && (
        <div className="mt-6 grid gap-4">
          <label className={labelClass}>
            Name
            <input
              value={values.name}
              onChange={(e) => set("name", e.target.value)}
              required
              className={fieldClass}
              placeholder="Your name"
            />
          </label>
          <label className={labelClass}>
            Business Name <span className="text-ink-400">(optional)</span>
            <input
              value={values.businessName}
              onChange={(e) => set("businessName", e.target.value)}
              className={fieldClass}
              placeholder="Business name"
            />
          </label>
          <label className={labelClass}>
            Email
            <input
              type="email"
              value={values.email}
              onChange={(e) => set("email", e.target.value)}
              required
              className={fieldClass}
              placeholder="you@email.com"
            />
          </label>
          <label className={labelClass}>
            WhatsApp Number
            <input
              value={values.whatsapp}
              onChange={(e) => set("whatsapp", e.target.value)}
              required
              className={fieldClass}
              placeholder="876 555 0123"
            />
          </label>
        </div>
      )}

      {/* Step 2 — Your Project */}
      {step === 1 && (
        <div className="mt-6 grid gap-4">
          <label className={labelClass}>
            What do you need?
            <select
              value={values.serviceNeeded}
              onChange={(e) => set("serviceNeeded", e.target.value)}
              className={fieldClass}
            >
              <option value="">Select a service</option>
              {SERVICE_OPTIONS.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className={labelClass}>
              Budget
              <select
                value={values.budgetRange}
                onChange={(e) => set("budgetRange", e.target.value)}
                className={fieldClass}
              >
                <option value="">Select a range</option>
                {BUDGET_OPTIONS.map((b) => (
                  <option key={b}>{b}</option>
                ))}
              </select>
            </label>
            <label className={labelClass}>
              Launch Timeline
              <select
                value={values.timeline}
                onChange={(e) => set("timeline", e.target.value)}
                className={fieldClass}
              >
                <option value="">Select a timeline</option>
                {TIMELINE_OPTIONS.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </label>
          </div>
          <label className={labelClass}>
            Project Stage
            <select
              value={values.projectStage}
              onChange={(e) => set("projectStage", e.target.value)}
              className={fieldClass}
            >
              <option value="">Select a stage</option>
              {STAGE_OPTIONS.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </label>
          <fieldset className="rounded-xl border border-line bg-ink-50 p-4">
            <legend className="px-2 text-sm font-semibold text-ink-900">
              Anything else you need?
            </legend>
            <div className="mt-2 grid gap-3 sm:grid-cols-2">
              {EXTRAS_OPTIONS.map((item) => (
                <label
                  key={item}
                  className="flex items-start gap-3 text-sm leading-6 text-ink-600"
                >
                  <input
                    type="checkbox"
                    checked={values.extras.includes(item)}
                    onChange={() => toggleExtra(item)}
                    className="mt-1 h-4 w-4 rounded border-ink-300 accent-ink-900"
                  />
                  {item}
                </label>
              ))}
            </div>
          </fieldset>
        </div>
      )}

      {/* Step 3 — Tell Us More */}
      {step === 2 && (
        <div className="mt-6 grid gap-4">
          <label className={labelClass}>
            Tell us what you&apos;re trying to build or accomplish
            <textarea
              value={values.projectDescription}
              onChange={(e) => set("projectDescription", e.target.value)}
              required
              className={`${fieldClass} min-h-40`}
              placeholder="Tell us what you need, what you already have, and what you want the finished system to do."
            />
          </label>
          <label className={labelClass}>
            Links / references / files <span className="text-ink-400">(optional)</span>
            <textarea
              value={values.references}
              onChange={(e) => set("references", e.target.value)}
              className={`${fieldClass} min-h-20`}
              placeholder="Website links, brand assets, or anything else to reference."
            />
          </label>
        </div>
      )}

      {stepError ? (
        <p className="mt-4 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
          {stepError}
        </p>
      ) : null}

      <div className="mt-6 flex items-center gap-3">
        {step > 0 && (
          <button
            type="button"
            onClick={goBack}
            className="btn btn-outline"
            disabled={status === "submitting"}
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
        )}
        {step < STEP_LABELS.length - 1 ? (
          <button type="button" onClick={goNext} className="btn btn-dark ml-auto">
            Continue
            <ArrowRight className="h-4 w-4" />
          </button>
        ) : (
          <button
            type="submit"
            disabled={status === "submitting"}
            className="btn btn-dark ml-auto disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "submitting" ? "Sending Inquiry..." : "Send Project Inquiry"}
            <ArrowRight className="h-4 w-4" />
          </button>
        )}
      </div>

      {status === "error" && message ? (
        <p className="mt-4 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
          {message}
        </p>
      ) : null}
    </form>
  );
}
