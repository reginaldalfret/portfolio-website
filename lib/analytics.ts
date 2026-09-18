import { sendGAEvent } from "@next/third-parties/google";

/**
 * Portfolio Analytics Integration
 * Strict Privacy: No PII (names, emails, phone numbers, IP addresses) is ever transmitted.
 */

export type ProjectIdentifier =
  | "301-super-ai-agents"
  | "tor-unveil"
  | "ai-crop-recommendation";

export type ContactChannel = "email" | "github" | "linkedin";

export function trackEvent(action: string, params?: Record<string, any>) {
  if (typeof window === "undefined") return;

  try {
    // 1. Direct gtag support if initialized
    if (typeof (window as any).gtag === "function") {
      (window as any).gtag("event", action, params);
      return;
    }

    // 2. Next.js third-parties helper fallback
    sendGAEvent("event", action, params || {});
  } catch {
    // Silently continue so analytics never disrupts the UI or animations
  }
}

/**
 * Track resume downloads without PII
 */
export function trackResumeDownload() {
  trackEvent("resume_download");
}

/**
 * Track project interactions with safe project identifiers
 */
export function trackProjectOpen(projectName: ProjectIdentifier) {
  trackEvent("project_open", { project_name: projectName });
}

/**
 * Track contact / external channel clicks
 */
export function trackContactClick(channel: ContactChannel) {
  switch (channel) {
    case "email":
      trackEvent("email_click");
      break;
    case "github":
      trackEvent("github_click");
      break;
    case "linkedin":
      trackEvent("linkedin_click");
      break;
  }
}
