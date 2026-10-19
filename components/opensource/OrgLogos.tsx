"use client";

import React from "react";

interface OrgLogoProps {
  orgKey: string;
  className?: string;
}

export function OrgLogo({ orgKey, className = "w-5 h-5" }: OrgLogoProps) {
  switch (orgKey) {
    case "meta":
      // Meta infinity loop
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-label="Meta logo">
          <path d="M16.98 6.55c-1.87 0-3.37 1.13-4.98 3.19-1.61-2.06-3.11-3.19-4.98-3.19C3.78 6.55 1.5 9.07 1.5 12.37c0 3.86 3.11 6.83 6.02 6.83 1.95 0 3.32-.97 4.48-2.3 1.16 1.33 2.53 2.3 4.48 2.3 2.91 0 6.02-2.97 6.02-6.83 0-3.3-2.28-5.82-5.52-5.82zm-9.96 10.3c-1.89 0-3.69-1.87-3.69-4.48 0-2.02 1.37-3.69 3.33-3.69 1.48 0 2.65.98 3.91 2.67-1.46 2.89-2.58 5.5-3.55 5.5zm9.96 0c-.97 0-2.09-2.61-3.55-5.5 1.26-1.69 2.43-2.67 3.91-2.67 1.96 0 3.33 1.67 3.33 3.69 0 2.61-1.8 4.48-3.69 4.48z" />
        </svg>
      );

    case "apache":
      // Apache feather emblem
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-label="Apache logo">
          <path d="M18.84 2.53c-1.28 1.46-2.53 3.64-3.58 6.27-.47-1.12-1.07-2.19-1.82-3.15-.35 1.16-.62 2.38-.8 3.63-.58 4.07-.38 7.97-.2 9.54.02.16.14.28.3.28h.04c.16-.02.28-.14.28-.3 0-1.57.17-5.46-.38-9.52-.16-1.16-.38-2.29-.68-3.37.66.9 1.18 1.89 1.59 2.92-.93 2.39-1.74 5.09-2.29 7.97l-.02.11c-.03.16.08.31.24.34.16.03.31-.08.34-.24l.02-.11c.53-2.77 1.31-5.36 2.2-7.66.83 2.21 1.76 4.3 2.78 6.2.07.14.22.21.37.17.15-.05.23-.2.19-.35-.98-1.83-1.88-3.83-2.68-5.95 1.05-2.67 2.3-4.88 3.58-6.35.11-.13.09-.32-.04-.43-.13-.11-.32-.09-.43.04z" />
          <path d="M12.3 8.1c-.8-1.55-1.8-2.9-2.95-3.95-.12-.11-.31-.1-.42.02-.11.12-.1.31.02.42 1.1 1.01 2.05 2.3 2.82 3.79.06.12.19.18.32.15.13-.03.22-.15.19-.28l.02-.15z" />
        </svg>
      );

    case "intel":
      // Intel modern geometric mark
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-label="Intel logo">
          <path d="M4.3 7.8c0-.7.6-1.3 1.3-1.3s1.3.6 1.3 1.3c0 .7-.6 1.3-1.3 1.3s-1.3-.6-1.3-1.3zm.2 3.1h2.2v6.8H4.5v-6.8zm4.1 0h2.1v.9c.5-.7 1.3-1.1 2.3-1.1 1.8 0 2.9 1.2 2.9 3.2v3.8h-2.1v-3.4c0-1.1-.5-1.7-1.4-1.7-.9 0-1.6.6-1.6 1.7v3.4H8.6v-6.8zm11 1.8h-1.4V11h-1.6v1.7H15v1.6h1.6v2.1c0 1.2.6 1.9 2 1.9.6 0 1.1-.1 1.4-.3v-1.6c-.2.1-.5.1-.8.1-.5 0-.8-.3-.8-.8v-1.4h1.8v-1.6z" />
        </svg>
      );

    case "azure":
      // Microsoft Azure cloud/origami emblem
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-label="Microsoft Azure logo">
          <path d="M13.05 4.5l-6.15 9.25 4.3 3.4 6.7-12.65h-4.85zm1.85 4.55l-3.3 6.2 3.9 4.25h5.5l-6.1-10.45zM3 17.5h5.45l2.45-3.7-2.65-2.1L3 17.5z" />
        </svg>
      );

    case "ibm":
      // IBM 8-bar classic geometric identity
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-label="IBM logo">
          <path d="M2 5h4v1H2V5zm0 2h4v1H2V7zm0 2h4v1H2V9zm0 2h4v1H2v-1zm0 2h4v1H2v-1zm0 2h4v1H2v-1zm0 2h4v1H2v-1zm0 2h4v1H2v-1zM7 5h4v1H7V5zm0 2h4v1H7V7zm0 2h4v1H7V9zm0 2h4v1H7v-1zm0 2h4v1H7v-1zm0 2h4v1H7v-1zm0 2h4v1H7v-1zm0 2h4v1H7v-1zm5-14h10v1H12V5zm0 2h10v1H12V7zm0 2h3.5v1H12V9zm6.5 0H22v1h-3.5V9zm-6.5 2h3.5v1H12v-1zm6.5 0H22v1h-3.5v-1zm-6.5 2h10v1H12v-1zm0 2h10v1H12v-1zm0 2h3.5v1H12v-1zm6.5 0H22v1h-3.5v-1zm-6.5 2h10v1H12v-1z" />
        </svg>
      );

    case "docker":
      // Docker whale with containers
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-label="Docker logo">
          <path d="M13.98 8.16h1.74v1.65h-1.74V8.16zm-2.4 0h1.74v1.65h-1.74V8.16zm-2.41 0h1.74v1.65H9.17V8.16zm7.21 2.37h1.74v1.65h-1.74v-1.65zm-2.4 0h1.74v1.65h-1.74v-1.65zm-2.4 0h1.74v1.65h-1.74v-1.65zm-2.41 0h1.74v1.65H9.17v-1.65zm-2.4 0h1.73v1.65H6.77v-1.65zm16.14 2.12c-.37-.27-1.22-.38-2.02-.19-.13-.76-.57-1.39-1.23-1.84l-.53-.33-.36.52c-.41.6-.54 1.43-.37 2.19-.38.2-.87.35-1.46.42H2.21c-.4 1.95.27 4.09 1.76 5.51 1.79 1.72 4.67 2.24 8.75 2.24 6.84 0 10.15-3.66 10.37-7.46.59-.44.89-1.06.18-1.06h-.36z" />
        </svg>
      );

    case "sap":
      // SAP classic monogram / shield geometry
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-label="SAP logo">
          <path d="M2.5 7.5L12 3l9.5 4.5v9L12 21l-9.5-4.5v-9zm3.8 6.4c.5.8 1.4 1.3 2.5 1.3 1.1 0 1.8-.5 1.8-1.2 0-1.6-3.8-.9-3.8-3.3 0-1.4 1.2-2.4 2.9-2.4 1.2 0 2.2.4 2.7 1.2l-1.1.9c-.4-.5-1-.8-1.7-.8-.8 0-1.4.4-1.4 1 0 1.5 3.8.9 3.8 3.3 0 1.5-1.2 2.5-3.1 2.5-1.5 0-2.6-.6-3.2-1.6l1.2-.9zm8.5-4.5h1.7l2.8 7.3h-1.6l-.6-1.7h-2.9l-.6 1.7h-1.6l2.8-7.3zm1.1 4.3h2l-1-2.9-1 2.9z" />
        </svg>
      );

    case "github":
      // GitHub Octocat mark
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-label="GitHub logo">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      );

    case "rocm":
      // AMD ROCm arrow chevron mark
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-label="AMD logo">
          <path d="M2.5 4h8.8l-4.4 4.4h-4.4V4zm10.2 0H21.5v8.8l-4.4-4.4V4h-4.4zm4.4 11.2l4.4 4.8V20h-8.8l4.4-4.8zM2.5 9.8h4.4l4.4 4.4-4.4 4.4H2.5V9.8z" />
        </svg>
      );

    case "cloudflare":
      // Cloudflare cloud mark
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-label="Cloudflare logo">
          <path d="M18.2 11.3c-.3-2.4-2.3-4.3-4.8-4.3-1.8 0-3.3 1-4.1 2.5-.5-.3-1.1-.4-1.7-.4-2 0-3.6 1.6-3.6 3.6 0 .2 0 .4.1.6-1.5.5-2.6 1.9-2.6 3.6 0 2.1 1.7 3.8 3.8 3.8h12.9c2.3 0 4.2-1.9 4.2-4.2-.1-2.4-1.9-4.3-4.2-4.2z" />
        </svg>
      );

    case "qualcomm":
      // Qualcomm monogram
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-label="Qualcomm logo">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c2.31 0 4.44-.79 6.14-2.12l-2.06-2.06A7.05 7.05 0 0 1 12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7c0 1.55-.5 2.98-1.35 4.15l2.12 2.12C21.1 16.58 22 14.39 22 12c0-5.52-4.48-10-10-10zm.75 6.5h-1.5v6h1.5v-6z" />
        </svg>
      );

    case "nvidia":
      // NVIDIA claw / eye emblem
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-label="NVIDIA logo">
          <path d="M7.74 18.06c-2.37-1.63-3.8-3.95-3.8-6.19 0-3.84 4.09-6.39 8.21-6.39 3.51 0 6.64 1.83 7.82 4.41-.61-.92-1.89-1.63-3.64-1.63-3.51 0-6.13 2.46-6.13 5.49 0 2.25 1.48 4.07 3.73 4.49-1.87.5-4.42.06-6.19-.18zm6.54-6.68c0-1.82 1.57-3.3 3.5-3.3 1.07 0 1.99.45 2.57 1.15.54.66.89 1.52.89 2.48 0 1.99-1.62 3.61-3.61 3.61-1.85 0-3.35-1.78-3.35-3.94zm7.64-4.83C20.15 4.54 16.5 3 12.15 3 5.44 3 0 8.01 0 14.18c0 4.19 2.53 7.86 6.35 9.82-.41-.75-.65-1.57-.65-2.43 0-2.08 1.43-3.91 3.39-4.83-2.03-1.07-3.14-2.81-3.14-4.7 0-3.79 3.75-6.57 8.35-6.57 3.55 0 6.44 1.68 7.62 4.08z" />
        </svg>
      );

    case "airbnb":
      // Airbnb Bélo icon
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-label="Airbnb logo">
          <path d="M12 2C8.36 2 6 4.7 6 7.9c0 3.2 2.1 6.54 6 12.1 3.9-5.56 6-8.9 6-12.1C18 4.7 15.64 2 12 2zm0 15.68c-2.83-4.22-4.5-6.95-4.5-9.78C7.5 5.56 9.3 3.5 12 3.5s4.5 2.06 4.5 4.4c0 2.83-1.67 5.56-4.5 9.78zm0-12.18a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z" />
        </svg>
      );

    case "apple":
      // Apple icon
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-label="Apple logo">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.61-.75 1.04-1.8 1.01-2.87-.92.04-2.02.62-2.66 1.37-.56.65-.99 1.71-.93 2.74 1.02.08 2.03-.54 2.58-1.24z" />
        </svg>
      );


    case "pinterest":
      return <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-label="Pinterest logo"><path d="M12 2C6.48 2 2 6.48 2 12c0 4.1 2.47 7.63 6 9.17-.03-.7-.01-1.54.17-2.3l1.3-5.5s-.32-.64-.32-1.58c0-1.48.86-2.58 1.94-2.58.92 0 1.37.69 1.37 1.52 0 .93-.59 2.33-.9 3.63-.26 1.08.54 1.96 1.6 1.96 1.92 0 3.4-2.02 3.4-4.94 0-2.58-1.85-4.38-4.48-4.38-3.05 0-4.84 2.29-4.84 4.65 0 .92.35 1.91.79 2.45.09.11.1.21.07.33l-.29 1.18c-.05.19-.15.23-.35.14-1.3-.61-2.11-2.53-2.11-4.07 0-3.31 2.4-6.36 6.91-6.36 3.63 0 6.45 2.59 6.45 6.04 0 3.6-2.27 6.51-5.42 6.51-1.06 0-2.06-.55-2.4-1.2l-.65 2.48c-.24.91-.89 2.05-1.32 2.75.99.31 2.03.47 3.11.47 5.52 0 10-4.48 10-10S17.52 2 12 2z"/></svg>;
    case "uber":
      return <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-label="Uber logo"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 3.2a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm-4.3 5.2h8.6v2.1H7.7v-2.1zm0 4h8.6v2.1H7.7v-2.1z"/></svg>;
    case "jruby":
      return <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-label="JRuby logo"><path d="M12 2.2a9.8 9.8 0 1 0 0 19.6 9.8 9.8 0 0 0 0-19.6zm0 3.1a6.7 6.7 0 1 1 0 13.4 6.7 6.7 0 0 1 0-13.4zm-2.2 3.1v7.2h2.4V8.4H9.8z"/></svg>;
    case "nasa":
      return <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-label="NASA logo"><circle cx="12" cy="12" r="10"/><path d="M4.4 13.5 19.8 8l-9.1 9.3 2-5.6z" fill="white"/><path d="M6 6 18 18" stroke="#fff" strokeWidth=".7"/></svg>;
    case "aws":
      return <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-label="AWS logo"><path d="M6.4 15.5c-1.4-.5-2.3-1.5-2.3-3 0-1.9 1.6-3.4 3.8-3.4.6 0 1.3.1 1.8.4.8-2.3 2.8-3.7 5.1-3.7 3 0 5.4 2.4 5.4 5.4v.4c1.1.4 1.8 1.3 1.8 2.4 0 1.5-1.2 2.7-2.7 2.7H7.9c-.6 0-1.1-.1-1.5-.2zm1.3 3.1 9.4-.1-1.2 1.7-8.2-1.6z"/></svg>;
    case "dotnet":
      return <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-label="Microsoft .NET logo"><path d="M12 2 22 7.5v9L12 22 2 16.5v-9L12 2zm0 2.4L4.5 8.5 12 12.6l7.5-4.1L12 4.4zm-8 5.6v5.1l7 3.9v-5.1l-7-3.9zm16 0-7 3.9V19l7-3.9v-5.1z"/></svg>;
    case "adobe":
      return <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-label="Adobe logo"><path d="M1.5 21.5 8.4 2.5h4.2L5.7 21.5H1.5zm12.6-19h4.2l4.2 19h-4.2l-4.2-19zM9.1 16.7h5.8l1.2 4.8h-8.2l1.2-4.8z"/></svg>;
    case "stripe":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-label="Stripe logo">
          <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697.5 12.521.5 6.056.5 1.76 3.844 1.76 9.387c0 5.438 4.79 7.34 8.789 8.772 2.65.952 3.55 1.674 3.55 2.677 0 1.057-1.042 1.583-2.528 1.583-2.483 0-5.385-1.127-7.25-2.224l-.886 5.568c1.642.753 4.57 1.487 7.734 1.487 6.777 0 11.233-3.238 11.233-9.083 0-5.694-4.832-7.554-8.426-9.017z" />
        </svg>
      );
    case "salesforce":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-label="Salesforce logo">
          <path d="M10.22 5.18a6.52 6.52 0 0 1 5.76 3.42 5.58 5.58 0 0 1 4.54 5.46 5.58 5.58 0 0 1-5.58 5.58H5.94A5.94 5.94 0 0 1 0 13.7a5.95 5.95 0 0 1 4.59-5.78 6.52 6.52 0 0 1 5.63-2.74z" />
        </svg>
      );
    case "ogx-ai":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-label="Ogx AI logo">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4" />
          <path d="M12 8h.01" />
        </svg>
      );
  }
}
