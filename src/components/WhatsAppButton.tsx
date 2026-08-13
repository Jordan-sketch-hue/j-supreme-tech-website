"use client";

const PHONE = "16582182282";
const DEFAULT_MSG = encodeURIComponent(
  "Hi J Supreme Tech! I'd like to move forward with a project. Here's what I need:"
);

// WhatsApp brand green — kept as the single functional accent so the button
// reads as WhatsApp while the ink-black surface stays true to the mono brand.
const WA_GREEN = "#25D366";

export function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${PHONE}?text=${DEFAULT_MSG}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="group fixed bottom-24 right-6 z-[69] flex h-14 w-14 items-center justify-center rounded-full bg-ink-950 ring-1 ring-[#25D366]/35 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.6)] transition-transform duration-200 hover:scale-105"
    >
      {/* live "online" dot — reinforces WhatsApp without coloring the whole button */}
      <span className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5">
        <span
          className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-70"
          style={{ backgroundColor: WA_GREEN }}
        />
        <span
          className="relative inline-flex h-3.5 w-3.5 rounded-full ring-2 ring-ink-950"
          style={{ backgroundColor: WA_GREEN }}
        />
      </span>

      <svg viewBox="0 0 32 32" fill={WA_GREEN} className="h-7 w-7 transition-transform duration-200 group-hover:scale-110">
        <path d="M16.004 2.667C8.641 2.667 2.667 8.64 2.667 16c0 2.341.64 4.63 1.856 6.629L2.667 29.333l6.875-1.803A13.267 13.267 0 0 0 16.004 29.333c7.362 0 13.33-5.973 13.33-13.333S23.366 2.667 16.004 2.667zm0 24a11.067 11.067 0 0 1-5.632-1.536l-.403-.24-4.08 1.07 1.088-3.973-.264-.408A11.04 11.04 0 0 1 4.933 16c0-6.107 4.965-11.067 11.071-11.067S27.071 9.893 27.071 16c0 6.109-4.963 11.067-11.067 11.067zm6.07-8.283c-.333-.167-1.968-.971-2.274-1.082-.304-.109-.526-.167-.746.167-.22.333-.854 1.082-1.047 1.302-.192.22-.385.25-.718.083-.333-.167-1.406-.518-2.678-1.653-.989-.882-1.657-1.971-1.851-2.304-.193-.333-.02-.513.147-.678.15-.149.333-.387.5-.58.167-.193.222-.333.333-.555.111-.222.055-.417-.028-.583-.083-.167-.746-1.8-1.022-2.466-.27-.648-.543-.56-.746-.57l-.635-.011c-.22 0-.577.083-.879.417-.304.333-1.155 1.129-1.155 2.753s1.183 3.193 1.347 3.416c.167.222 2.327 3.554 5.638 4.985.788.34 1.402.543 1.882.695.79.251 1.51.215 2.078.13.634-.094 1.968-.804 2.247-1.581.277-.777.277-1.443.193-1.581-.082-.138-.304-.222-.637-.389z" />
      </svg>
    </a>
  );
}
