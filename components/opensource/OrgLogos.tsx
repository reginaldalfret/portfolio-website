"use client";

import React from "react";

interface OrgLogoProps {
  orgKey: string;
  className?: string;
  monochrome?: boolean;
}

export function OrgLogo({ orgKey, className = "w-5 h-5", monochrome = false }: OrgLogoProps) {
  const normalizedKey = orgKey?.toLowerCase().trim();

  // If explicitly requested as monochrome, use currentColor for all paths
  if (monochrome) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-label={`${orgKey} logo`}>
        <circle cx="12" cy="12" r="10" />
      </svg>
    );
  }

  switch (normalizedKey) {
    case "apple":
      // Apple Inc. official mark (Silver / Crisp White)
      return (
        <svg viewBox="0 0 24 24" className={className} aria-label="Apple logo">
          <path
            fill="#FFFFFF"
            d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.61-.75 1.04-1.8 1.01-2.87-.92.04-2.02.62-2.66 1.37-.56.65-.99 1.71-.93 2.74 1.02.08 2.03-.54 2.58-1.24z"
          />
        </svg>
      );

    case "google":
      // Google Official 4-Color "G"
      return (
        <svg viewBox="0 0 24 24" className={className} aria-label="Google logo">
          <path
            fill="#4285F4"
            d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z"
          />
          <path
            fill="#34A853"
            d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24Z"
          />
          <path
            fill="#FBBC05"
            d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.97 0 12s.45 3.82 1.25 5.42l4.03-3.15Z"
          />
          <path
            fill="#EA4335"
            d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98Z"
          />
        </svg>
      );

    case "googlecloud":
    case "googlecloudplatform":
      // Google Cloud Platform Official 4-Color Cloud
      return (
        <svg viewBox="0 0 24 24" className={className} aria-label="Google Cloud logo">
          <path
            fill="#EA4335"
            d="M19.35 10.04C18.67 6.59 15.64 4 12 4c-2.89 0-5.4 1.64-6.65 4.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"
          />
          <path
            fill="#4285F4"
            d="M19 18H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.94 6 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11c1.56.1 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3z"
          />
          <path
            fill="#FBBC05"
            d="M6 14a4 4 0 0 1 4-4c.34 0 .67.04.99.12A5.99 5.99 0 0 0 5.35 8.04 5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6v-6z"
          />
          <path
            fill="#34A853"
            d="M12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11c1.56.1 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3h-7v-6c0-3.31 2.69-6 6-6z"
          />
        </svg>
      );

    case "microsoft":
      // Microsoft Official 4-Squares
      return (
        <svg viewBox="0 0 24 24" className={className} aria-label="Microsoft logo">
          <rect x="1" y="1" width="10" height="10" fill="#F25022" />
          <rect x="13" y="1" width="10" height="10" fill="#7FBA00" />
          <rect x="1" y="13" width="10" height="10" fill="#00A4EF" />
          <rect x="13" y="13" width="10" height="10" fill="#FFB900" />
        </svg>
      );

    case "aws":
      // Amazon Web Services official white mark with Amazon orange smile arrow
      return (
        <svg viewBox="0 0 24 24" className={className} aria-label="AWS logo">
          <path
            fill="#FFFFFF"
            d="M6.86 10.95c0 .64-.17 1.13-.51 1.47-.34.34-.84.51-1.49.51-.43 0-.81-.08-1.14-.25-.33-.17-.6-.42-.82-.74v.85H1.47V6.5h1.43v2.54c.22-.32.49-.57.82-.74.33-.17.71-.25 1.14-.25.65 0 1.15.17 1.49.51.34.34.51.83.51 1.47v.92zm-1.43 0c0-.36-.08-.63-.25-.81-.17-.18-.43-.27-.78-.27-.37 0-.64.1-.81.29-.17.19-.26.47-.26.85v.8c0 .38.09.66.26.85.17.19.44.29.81.29.35 0 .61-.09.78-.27.17-.18.25-.45.25-.81v-.9zm5.55 1.84h-1.42l-1.02-3.84h1.36l.48 2.45.54-2.45h1.27l.54 2.45.48-2.45h1.36l-1.02 3.84h-1.42l-.58-2.32-.57 2.32zm8.01-1.33c0 .4-.14.72-.41.97-.27.25-.66.38-1.17.38-.49 0-.91-.1-1.25-.3-.34-.2-.59-.49-.75-.86l1.19-.64c.1.2.22.35.37.45.15.1.33.15.54.15.2 0 .36-.04.47-.11.11-.07.16-.18.16-.31 0-.11-.04-.19-.13-.26-.09-.07-.26-.13-.52-.2l-.66-.17c-.49-.13-.86-.31-1.11-.55-.25-.24-.38-.56-.38-.97 0-.39.14-.7.42-.94.28-.24.67-.36 1.18-.36.42 0 .79.08 1.1.24.31.16.54.39.7.69l-1.14.62c-.08-.15-.19-.26-.32-.33-.13-.07-.29-.11-.47-.11-.18 0-.32.04-.42.11-.1.07-.15.16-.15.28 0 .1.04.18.12.24.08.06.24.12.48.18l.64.16c.52.13.9.32 1.15.56.25.24.37.56.37.96z"
          />
          <path
            fill="#FF9900"
            d="M19.14 17.51c-2.48 1.83-6.09 2.79-9.21 2.79-4.37 0-8.31-1.63-11.28-4.35-.23-.21-.02-.5.26-.34 3.2 1.85 7.14 2.97 11.23 2.97 2.77 0 5.86-.68 8.68-2.09.43-.22.75.25.32 1.02z"
          />
          <path
            fill="#FF9900"
            d="M20.26 16.29c-.31-.4-.63-.8-.94-1.2-.1-.13-.05-.27.08-.22.95.38 1.9 1.16 2.45 1.94.13.18.04.38-.17.37-1.02-.07-2.04-.15-3.07-.22-.16-.01-.2-.14-.07-.24.58-.38 1.15-.75 1.72-1.13v.7z"
          />
        </svg>
      );

    case "meta":
      // Meta Platforms official blue gradient infinity loop
      return (
        <svg viewBox="0 0 24 24" className={className} aria-label="Meta logo">
          <defs>
            <linearGradient id="metaLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0081FB" />
              <stop offset="100%" stopColor="#0064E0" />
            </linearGradient>
          </defs>
          <path
            fill="url(#metaLogoGrad)"
            d="M16.98 6.55c-1.87 0-3.37 1.13-4.98 3.19-1.61-2.06-3.11-3.19-4.98-3.19C3.78 6.55 1.5 9.07 1.5 12.37c0 3.86 3.11 6.83 6.02 6.83 1.95 0 3.32-.97 4.48-2.3 1.16 1.33 2.53 2.3 4.48 2.3 2.91 0 6.02-2.97 6.02-6.83 0-3.3-2.28-5.82-5.52-5.82zm-9.96 10.3c-1.89 0-3.69-1.87-3.69-4.48 0-2.02 1.37-3.69 3.33-3.69 1.48 0 2.65.98 3.91 2.67-1.46 2.89-2.58 5.5-3.55 5.5zm9.96 0c-.97 0-2.09-2.61-3.55-5.5 1.26-1.69 2.43-2.67 3.91-2.67 1.96 0 3.33 1.67 3.33 3.69 0 2.61-1.8 4.48-3.69 4.48z"
          />
        </svg>
      );

    case "nvidia":
      // NVIDIA Official Green claw/eye
      return (
        <svg viewBox="0 0 24 24" className={className} aria-label="NVIDIA logo">
          <path
            fill="#76B900"
            d="M7.74 18.06c-2.37-1.63-3.8-3.95-3.8-6.19 0-3.84 4.09-6.39 8.21-6.39 3.51 0 6.64 1.83 7.82 4.41-.61-.92-1.89-1.63-3.64-1.63-3.51 0-6.13 2.46-6.13 5.49 0 2.25 1.48 4.07 3.73 4.49-1.87.5-4.42.06-6.19-.18zm6.54-6.68c0-1.82 1.57-3.3 3.5-3.3 1.07 0 1.99.45 2.57 1.15.54.66.89 1.52.89 2.48 0 1.99-1.62 3.61-3.61 3.61-1.85 0-3.35-1.78-3.35-3.94zm7.64-4.83C20.15 4.54 16.5 3 12.15 3 5.44 3 0 8.01 0 14.18c0 4.19 2.53 7.86 6.35 9.82-.41-.75-.65-1.57-.65-2.43 0-2.08 1.43-3.91 3.39-4.83-2.03-1.07-3.14-2.81-3.14-4.7 0-3.79 3.75-6.57 8.35-6.57 3.55 0 6.44 1.68 7.62 4.08z"
          />
        </svg>
      );

    case "nasa":
      // NASA Official Meatball Insignia (Deep Blue Sphere, Red Chevron, White Stars & Letters)
      return (
        <svg viewBox="0 0 24 24" className={className} aria-label="NASA logo">
          <circle cx="12" cy="12" r="11" fill="#0B3D91" />
          <path d="M3.5 15L19.5 7.5l-8.5 9 1.5-5.5z" fill="#FC3D21" />
          <ellipse cx="12" cy="12" rx="9" ry="3.5" fill="none" stroke="#FFFFFF" strokeWidth="0.8" transform="rotate(-30 12 12)" />
          <circle cx="7" cy="8" r="0.6" fill="#FFFFFF" />
          <circle cx="16" cy="15" r="0.5" fill="#FFFFFF" />
          <circle cx="15" cy="7" r="0.5" fill="#FFFFFF" />
          <circle cx="9" cy="16" r="0.5" fill="#FFFFFF" />
          <circle cx="6" cy="12" r="0.4" fill="#FFFFFF" />
          <text x="12" y="13.5" fill="#FFFFFF" fontSize="4.5" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" letterSpacing="0.4">
            NASA
          </text>
        </svg>
      );

    case "azure":
      // Microsoft Azure Fluent Fold Logo
      return (
        <svg viewBox="0 0 24 24" className={className} aria-label="Azure logo">
          <path fill="#0089D6" d="M13.05 4.5l-6.15 9.25 4.3 3.4 6.7-12.65h-4.85z" />
          <path fill="#0078D4" d="M14.9 9.05l-3.3 6.2 3.9 4.25h5.5l-6.1-10.45z" />
          <path fill="#00BCF2" d="M3 17.5h5.45l2.45-3.7-2.65-2.1L3 17.5z" />
        </svg>
      );

    case "adobe":
      // Adobe Official Red Badge with White "A"
      return (
        <svg viewBox="0 0 24 24" className={className} aria-label="Adobe logo">
          <rect width="24" height="24" rx="4" fill="#DA1F26" />
          <polygon fill="#FFFFFF" points="13.9,4 19.5,19 15.6,19 13.7,13.7 9.8,19 5.5,19 11.2,4" />
          <polygon fill="#DA1F26" points="12.5,9.2 14.1,13.7 10.8,13.7" />
        </svg>
      );

    case "intel":
      // Intel Modern Brand Blue Mark
      return (
        <svg viewBox="0 0 24 24" className={className} aria-label="Intel logo">
          <path
            fill="#0068B5"
            d="M4.3 7.8c0-.7.6-1.3 1.3-1.3s1.3.6 1.3 1.3c0 .7-.6 1.3-1.3 1.3s-1.3-.6-1.3-1.3zm.2 3.1h2.2v6.8H4.5v-6.8zm4.1 0h2.1v.9c.5-.7 1.3-1.1 2.3-1.1 1.8 0 2.9 1.2 2.9 3.2v3.8h-2.1v-3.4c0-1.1-.5-1.7-1.4-1.7-.9 0-1.6.6-1.6 1.7v3.4H8.6v-6.8zm11 1.8h-1.4V11h-1.6v1.7H15v1.6h1.6v2.1c0 1.2.6 1.9 2 1.9.6 0 1.1-.1 1.4-.3v-1.6c-.2.1-.5.1-.8.1-.5 0-.8-.3-.8-.8v-1.4h1.8v-1.6z"
          />
        </svg>
      );

    case "ibm":
      // IBM Official 8-Bar Blue Mark
      return (
        <svg viewBox="0 0 24 24" className={className} aria-label="IBM logo">
          <path
            fill="#0F62FE"
            d="M2 5h4v1H2V5zm0 2h4v1H2V7zm0 2h4v1H2V9zm0 2h4v1H2v-1zm0 2h4v1H2v-1zm0 2h4v1H2v-1zm0 2h4v1H2v-1zm0 2h4v1H2v-1zM7 5h4v1H7V5zm0 2h4v1H7V7zm0 2h4v1H7V9zm0 2h4v1H7v-1zm0 2h4v1H7v-1zm0 2h4v1H7v-1zm0 2h4v1H7v-1zm0 2h4v1H7v-1zm5-14h10v1H12V5zm0 2h10v1H12V7zm0 2h3.5v1H12V9zm6.5 0H22v1h-3.5V9zm-6.5 2h3.5v1H12v-1zm6.5 0H22v1h-3.5v-1zm-6.5 2h10v1H12v-1zm0 2h10v1H12v-1zm0 2h3.5v1H12v-1zm6.5 0H22v1h-3.5v-1zm-6.5 2h10v1H12v-1z"
          />
        </svg>
      );

    case "uber":
      // Uber Official High-Contrast Wordmark / Badge
      return (
        <svg viewBox="0 0 24 24" className={className} aria-label="Uber logo">
          <circle cx="12" cy="12" r="11" fill="#000000" stroke="#FFFFFF" strokeWidth="1" />
          <text x="12" y="15.2" fill="#FFFFFF" fontSize="7" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle" letterSpacing="0.5">
            UBER
          </text>
        </svg>
      );

    case "airbnb":
      // Airbnb Official Bélo (Rausch Coral #FF5A5F)
      return (
        <svg viewBox="0 0 24 24" className={className} aria-label="Airbnb logo">
          <path
            fill="#FF5A5F"
            d="M12 2C8.36 2 6 4.7 6 7.9c0 3.2 2.1 6.54 6 12.1 3.9-5.56 6-8.9 6-12.1C18 4.7 15.64 2 12 2zm0 15.68c-2.83-4.22-4.5-6.95-4.5-9.78C7.5 5.56 9.3 3.5 12 3.5s4.5 2.06 4.5 4.4c0 2.83-1.67 5.56-4.5 9.78zm0-12.18a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z"
          />
        </svg>
      );

    case "github":
      // GitHub Official Invertocat Mark (Crisp White)
      return (
        <svg viewBox="0 0 24 24" className={className} aria-label="GitHub logo">
          <path
            fill="#FFFFFF"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
          />
        </svg>
      );

    case "dell":
      // Dell Official Blue Ring & Typography
      return (
        <svg viewBox="0 0 24 24" className={className} aria-label="Dell logo">
          <circle cx="12" cy="12" r="10.5" fill="none" stroke="#007DB8" strokeWidth="1.8" />
          <text x="12" y="15" fill="#007DB8" fontSize="7" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" letterSpacing="0.2">
            DELL
          </text>
        </svg>
      );

    case "salesforce":
      // Salesforce Official Blue Cloud
      return (
        <svg viewBox="0 0 24 24" className={className} aria-label="Salesforce logo">
          <path
            fill="#00A1E0"
            d="M10.22 5.18a6.52 6.52 0 0 1 5.76 3.42 5.58 5.58 0 0 1 4.54 5.46 5.58 5.58 0 0 1-5.58 5.58H5.94A5.94 5.94 0 0 1 0 13.7a5.95 5.95 0 0 1 4.59-5.78 6.52 6.52 0 0 1 5.63-2.74z"
          />
        </svg>
      );

    case "rocm":
    case "amd":
      // AMD / ROCm Official Red Chevrons
      return (
        <svg viewBox="0 0 24 24" className={className} aria-label="AMD logo">
          <path
            fill="#ED1C24"
            d="M2.5 4h8.8l-4.4 4.4h-4.4V4zm10.2 0H21.5v8.8l-4.4-4.4V4h-4.4zm4.4 11.2l4.4 4.8V20h-8.8l4.4-4.8zM2.5 9.8h4.4l4.4 4.4-4.4 4.4H2.5V9.8z"
          />
        </svg>
      );

    case "sap":
      // SAP Official Navy Blue Shield Badge
      return (
        <svg viewBox="0 0 24 24" className={className} aria-label="SAP logo">
          <path fill="#008FD5" d="M2.5 6.5l9.5-3.5 9.5 3.5v11l-9.5 4-9.5-4v-11z" />
          <text x="12" y="15" fill="#FFFFFF" fontSize="7.5" fontWeight="900" fontFamily="sans-serif" textAnchor="middle">
            SAP
          </text>
        </svg>
      );

    case "pinterest":
      // Pinterest Official Red Circle Badge
      return (
        <svg viewBox="0 0 24 24" className={className} aria-label="Pinterest logo">
          <circle cx="12" cy="12" r="11" fill="#BD081C" />
          <path
            fill="#FFFFFF"
            d="M12.5 5.5c-3.6 0-5.5 2.5-5.5 4.8 0 1.3.5 2.5 1.6 3 .2.1.3 0 .3-.2l.3-1.1c0-.1 0-.2-.1-.3-.3-.4-.5-.9-.5-1.5 0-2 1.5-3.8 3.9-3.8 2.1 0 3.3 1.3 3.3 3 0 2.3-1 4.2-2.5 4.2-.8 0-1.4-.7-1.2-1.5l.5-2.2c.2-.6.3-1.3.1-1.8-.2-.5-.8-.7-1.3-.7-.9 0-1.7 1-1.7 2.3 0 .8.3 1.4.3 1.4l-1.3 5.4c-.4 1.6-.1 3.5 0 3.7.1.1.2.1.3 0 .1-.2 1.4-1.8 1.8-3.4l.7-2.6c.3.6 1.2 1.1 2.2 1.1 2.9 0 4.8-2.6 4.8-6.1 0-2.6-2.2-4.8-5.5-4.8z"
          />
        </svg>
      );

    case "qualcomm":
      // Qualcomm Official Blue "Q"
      return (
        <svg viewBox="0 0 24 24" className={className} aria-label="Qualcomm logo">
          <path
            fill="#0057B8"
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c2.31 0 4.44-.79 6.14-2.12l-2.06-2.06A7.05 7.05 0 0 1 12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7c0 1.55-.5 2.98-1.35 4.15l2.12 2.12C21.1 16.58 22 14.39 22 12c0-5.52-4.48-10-10-10zm.75 6.5h-1.5v6h1.5v-6z"
          />
          <path fill="#3253DC" d="M17.5 16.5l3.5 3.5-1.5 1.5-3.5-3.5 1.5-1.5z" />
        </svg>
      );

    case "stripe":
      // Stripe Official Purple/Blurple "S"
      return (
        <svg viewBox="0 0 24 24" className={className} aria-label="Stripe logo">
          <path
            fill="#635BFF"
            d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697.5 12.521.5 6.056.5 1.76 3.844 1.76 9.387c0 5.438 4.79 7.34 8.789 8.772 2.65.952 3.55 1.674 3.55 2.677 0 1.057-1.042 1.583-2.528 1.583-2.483 0-5.385-1.127-7.25-2.224l-.886 5.568c1.642.753 4.57 1.487 7.734 1.487 6.777 0 11.233-3.238 11.233-9.083 0-5.694-4.832-7.554-8.426-9.017z"
          />
        </svg>
      );

    case "docker":
      // Docker Official Blue Whale & Cargo
      return (
        <svg viewBox="0 0 24 24" className={className} aria-label="Docker logo">
          <path
            fill="#2496ED"
            d="M13.98 8.16h1.74v1.65h-1.74V8.16zm-2.4 0h1.74v1.65h-1.74V8.16zm-2.41 0h1.74v1.65H9.17V8.16zm7.21 2.37h1.74v1.65h-1.74v-1.65zm-2.4 0h1.74v1.65h-1.74v-1.65zm-2.4 0h1.74v1.65h-1.74v-1.65zm-2.41 0h1.74v1.65H9.17v-1.65zm-2.4 0h1.73v1.65H6.77v-1.65zm16.14 2.12c-.37-.27-1.22-.38-2.02-.19-.13-.76-.57-1.39-1.23-1.84l-.53-.33-.36.52c-.41.6-.54 1.43-.37 2.19-.38.2-.87.35-1.46.42H2.21c-.4 1.95.27 4.09 1.76 5.51 1.79 1.72 4.67 2.24 8.75 2.24 6.84 0 10.15-3.66 10.37-7.46.59-.44.89-1.06.18-1.06h-.36z"
          />
        </svg>
      );

    case "apache":
      // Apache Official Feather Gradient
      return (
        <svg viewBox="0 0 24 24" className={className} aria-label="Apache logo">
          <defs>
            <linearGradient id="apacheLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F36F21" />
              <stop offset="35%" stopColor="#D22128" />
              <stop offset="70%" stopColor="#A52175" />
              <stop offset="100%" stopColor="#2980B9" />
            </linearGradient>
          </defs>
          <path
            fill="url(#apacheLogoGrad)"
            d="M18.84 2.53c-1.28 1.46-2.53 3.64-3.58 6.27-.47-1.12-1.07-2.19-1.82-3.15-.35 1.16-.62 2.38-.8 3.63-.58 4.07-.38 7.97-.2 9.54.02.16.14.28.3.28h.04c.16-.02.28-.14.28-.3 0-1.57.17-5.46-.38-9.52-.16-1.16-.38-2.29-.68-3.37.66.9 1.18 1.89 1.59 2.92-.93 2.39-1.74 5.09-2.29 7.97l-.02.11c-.03.16.08.31.24.34.16.03.31-.08.34-.24l.02-.11c.53-2.77 1.31-5.36 2.2-7.66.83 2.21 1.76 4.3 2.78 6.2.07.14.22.21.37.17.15-.05.23-.2.19-.35-.98-1.83-1.88-3.83-2.68-5.95 1.05-2.67 2.3-4.88 3.58-6.35.11-.13.09-.32-.04-.43-.13-.11-.32-.09-.43.04z"
          />
        </svg>
      );

    case "cloudflare":
      // Cloudflare Official Two-Tone Cloud
      return (
        <svg viewBox="0 0 24 24" className={className} aria-label="Cloudflare logo">
          <path
            fill="#F38020"
            d="M18.2 11.3c-.3-2.4-2.3-4.3-4.8-4.3-1.8 0-3.3 1-4.1 2.5-.5-.3-1.1-.4-1.7-.4-2 0-3.6 1.6-3.6 3.6 0 .2 0 .4.1.6-1.5.5-2.6 1.9-2.6 3.6 0 2.1 1.7 3.8 3.8 3.8h12.9c2.3 0 4.2-1.9 4.2-4.2-.1-2.4-1.9-4.3-4.2-4.2z"
          />
          <path
            fill="#FAAE40"
            d="M17.8 13.5c-.2-1.5-1.5-2.7-3.1-2.7-1.1 0-2.1.6-2.6 1.6-.3-.2-.7-.3-1.1-.3-1.3 0-2.3 1-2.3 2.3 0 .1 0 .3.1.4-.9.3-1.6 1.2-1.6 2.3 0 1.3 1.1 2.4 2.4 2.4h8.2c1.5 0 2.7-1.2 2.7-2.7-.1-1.5-1.2-2.7-2.7-2.6z"
          />
        </svg>
      );

    case "openai":
      // OpenAI Official Teal/Green Rosette
      return (
        <svg viewBox="0 0 24 24" className={className} aria-label="OpenAI logo">
          <path
            fill="#10A37F"
            d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.771-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.746-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 8.937a4.485 4.485 0 0 1 2.366-1.973V12.6a.766.766 0 0 0 .388.677l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 8.937zm16.597 3.855l-5.833-3.387L15.119 8.24a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79 7.9 0 0 0-.407-.666zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 10.27V7.934a.08.08 0 0 1 .033-.061l4.84-2.795a4.504 4.504 0 0 1 6.668 4.385v.004zM8.308 14.366l-2.02-1.163a.08.08 0 0 1-.038-.057V7.56a4.499 4.499 0 0 1 7.37-3.454l-.142.08-4.779 2.758a.795.795 0 0 0-.391.681v6.741zm1.782-2.366l2.91-1.68 2.91 1.68v3.36l-2.91 1.68-2.91-1.68v-3.36z"
          />
        </svg>
      );

    case "snapchat":
      // Snapchat Official Yellow Badge & White Ghost
      return (
        <svg viewBox="0 0 24 24" className={className} aria-label="Snapchat logo">
          <rect width="24" height="24" rx="5" fill="#FFFC00" />
          <path
            fill="#FFFFFF"
            stroke="#000000"
            strokeWidth="0.8"
            d="M12.01 4.5c-2.9 0-4.7 1.9-4.7 4.3 0 .6.1 1.5.5 2.2.1.1.1.3.1.4-.1.2-.3.3-.5.5-.5.2-1.2.6-1.2 1.3 0 .7.5 1 1.1 1.2.2.1.4.1.5.3.1.2.1.4.1.7-.1.6-.3 1.5-.3 1.8-.1.5-.1.8.2 1 .2.2.6.3 1.1.3.9 0 1.9-.3 2.8-.6.1 0 .2-.1.3-.1s.2 0 .3.1c.9.3 1.9.6 2.8.6.5 0 .9-.1 1.1-.3.3-.2.3-.5.2-1-.1-.3-.2-1.2-.3-1.8 0-.3 0-.5.1-.7.1-.1.3-.2.5-.3.6-.2 1.1-.5 1.1-1.2 0-.7-.7-1.1-1.2-1.3-.2-.1-.4-.3-.5-.5 0-.1 0-.3.1-.4.4-.7.5-1.6.5-2.2 0-2.4-1.8-4.3-4.7-4.3z"
          />
        </svg>
      );

    case "spotify":
      // Spotify Official Vibrant Green Badge & Black Soundwaves
      return (
        <svg viewBox="0 0 24 24" className={className} aria-label="Spotify logo">
          <circle cx="12" cy="12" r="11" fill="#1DB954" />
          <path
            fill="#000000"
            d="M16.586 16.424a.627.627 0 0 1-.86.208c-2.355-1.439-5.32-1.764-8.815-.965a.627.627 0 1 1-.28-1.222c3.822-.874 7.106-.503 9.747 1.118a.627.627 0 0 1 .208.861zm1.225-2.724a.784.784 0 0 1-1.08.258c-2.696-1.657-6.806-2.135-9.995-1.168a.784.784 0 0 1-.454-1.5c3.644-1.106 8.19-.576 11.27 1.33a.784.784 0 0 1 .259 1.08zm.105-2.835C14.692 8.95 9.375 8.775 6.297 9.71a.941.941 0 1 1-.548-1.8c3.535-1.073 9.404-.868 13.115 1.337a.941.941 0 0 1-1.07 1.624z"
          />
        </svg>
      );

    case "cisco":
      // Cisco Official Cyan Bridge Bars
      return (
        <svg viewBox="0 0 24 24" className={className} aria-label="Cisco logo">
          <path fill="#1BA0D7" d="M2.5 15.5h1.2v3H2.5zm3.2-3.8h1.2v6.8H5.7zm3.3-3.7h1.2v10.5H9zm3.2 3.7h1.2v6.8h-1.2zm3.3-3.7h1.2v10.5h-1.2zm3.2 3.7h1.2v6.8h-1.2zm3.3 3.8h1.2v3H22z" />
        </svg>
      );

    case "netflix":
      // Netflix Official Red Ribbon "N"
      return (
        <svg viewBox="0 0 24 24" className={className} aria-label="Netflix logo">
          <path fill="#B81D24" d="M5.398 0v24c1.17-.432 2.36-.88 3.55-1.332V0H5.398zm9.654 0v18.068l3.55 1.332V0h-3.55z" />
          <path fill="#E50914" d="M8.948.576l6.654 18.048h.048V.576h-2.584l-4.118 11.16V.576h-.002z" />
        </svg>
      );

    case "vercel":
      // Vercel Official Triangle
      return (
        <svg viewBox="0 0 24 24" className={className} aria-label="Vercel logo">
          <path fill="#FFFFFF" d="M12 1L24 22H0L12 1Z" />
        </svg>
      );

    case "mercedes-benz":
      // Mercedes-Benz Silver Star
      return (
        <svg viewBox="0 0 24 24" className={className} aria-label="Mercedes-Benz logo">
          <circle cx="12" cy="12" r="10.5" fill="none" stroke="#E5E7EB" strokeWidth="1" />
          <path fill="#E5E7EB" d="M12 2.5l2 8.5h-4l2-8.5zm0 10l-7.5 4.5 5.5-6.5 2 2zm0 0l7.5 4.5-5.5-6.5-2 2z" />
        </svg>
      );

    case "mozilla":
      // Mozilla Firefox Flame / Mark
      return (
        <svg viewBox="0 0 24 24" className={className} aria-label="Mozilla logo">
          <circle cx="12" cy="12" r="10" fill="#FF7139" />
          <path
            fill="#FFFFFF"
            d="M17.5 9c-.3 1.2-1.1 2.2-2.1 2.8.2-1.2-.2-2.4-1-3.3.4 0 .7.1 1.1.2.6.1 1.4.2 2 .3zm-4.7-5c.8.6 1.5 1.5 1.8 2.5-.9-.2-1.9-.1-2.7.4.3-.9.6-2 .9-2.9zM7 14.8c.2-.9.7-1.8 1.4-2.4-.1.9.1 1.8.6 2.6-.7-.1-1.4-.1-2-.2z"
          />
        </svg>
      );

    case "google-gemini":
      // Google Gemini Radiant Sparkle
      return (
        <svg viewBox="0 0 24 24" className={className} aria-label="Google Gemini logo">
          <defs>
            <linearGradient id="geminiLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4E88F9" />
              <stop offset="100%" stopColor="#9B72CF" />
            </linearGradient>
          </defs>
          <path
            fill="url(#geminiLogoGrad)"
            d="M12 0C12 6.627 6.627 12 0 12c6.627 0 12 5.373 12 12 0-6.627 5.373-12 12-12-6.627 0-12-5.373-12-12z"
          />
        </svg>
      );

    case "juspay":
      // Juspay Cyan Brand Circle
      return (
        <svg viewBox="0 0 24 24" className={className} aria-label="Juspay logo">
          <circle cx="12" cy="12" r="11" fill="#0070BA" />
          <text x="12" y="16.5" fill="#00D2FF" fontSize="12" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">
            J
          </text>
        </svg>
      );

    case "dotnet":
      // Microsoft .NET Purple Hex
      return (
        <svg viewBox="0 0 24 24" className={className} aria-label="Microsoft .NET logo">
          <path fill="#512BD4" d="M12 2 22 7.5v9L12 22 2 16.5v-9L12 2z" />
          <text x="12" y="14.5" fill="#FFFFFF" fontSize="6.5" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">
            .NET
          </text>
        </svg>
      );

    case "jruby":
      // JRuby Red Gem
      return (
        <svg viewBox="0 0 24 24" className={className} aria-label="JRuby logo">
          <path fill="#CC342D" d="M12 2.2a9.8 9.8 0 1 0 0 19.6 9.8 9.8 0 0 0 0-19.6zm0 3.1a6.7 6.7 0 1 1 0 13.4 6.7 6.7 0 0 1 0-13.4zm-2.2 3.1v7.2h2.4V8.4H9.8z" />
        </svg>
      );

    case "containers":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-label="Containers logo">
          <rect x="3" y="3" width="7" height="7" rx="1" fill="#3B82F6" />
          <rect x="14" y="3" width="7" height="7" rx="1" fill="#60A5FA" />
          <rect x="3" y="14" width="7" height="7" rx="1" fill="#60A5FA" />
          <rect x="14" y="14" width="7" height="7" rx="1" fill="#3B82F6" />
        </svg>
      );

    case "ogx-ai":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-label="Ogx AI logo">
          <path fill="#06B6D4" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" className={className}>
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4" />
          <path d="M12 8h.01" />
        </svg>
      );
  }
}
