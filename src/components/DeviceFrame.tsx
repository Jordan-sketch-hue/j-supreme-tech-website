/* Presentational device mockups around self-captured screenshots in
   /public/showcase (popups dismissed, content settled — see portfolio.ts). */
import { shotDesktop, shotMobile } from "@/lib/portfolio";

type BrowserProps = {
  host: string;
  alt: string;
  className?: string;
};

export function BrowserFrame({ host, alt, className = "" }: BrowserProps) {
  return (
    <div className={`browser ${className}`}>
      <div className="browser-bar">
        <span className="browser-dot" />
        <span className="browser-dot" />
        <span className="browser-dot" />
        <span className="browser-url">{host}</span>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="shot"
        src={shotDesktop(host)}
        alt={alt}
        loading="lazy"
        width={1440}
        height={900}
      />
    </div>
  );
}

export function LaptopFrame({ host, alt, className = "" }: BrowserProps) {
  return (
    <div className={className}>
      <div className="laptop-lid">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="shot"
          src={shotDesktop(host)}
          alt={alt}
          loading="lazy"
          width={1440}
          height={900}
        />
      </div>
      <div className="laptop-base" />
    </div>
  );
}

export function PhoneFrame({ host, alt, className = "" }: BrowserProps) {
  return (
    <div className={`phone ${className}`}>
      <div className="phone-screen">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="shot"
          src={shotMobile(host)}
          alt={alt}
          loading="lazy"
          width={460}
          height={958}
        />
      </div>
    </div>
  );
}
