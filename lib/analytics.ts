type Params = Record<string, string | number | boolean>;

/** Sends a GA4 event. Safe to call before GA has loaded (events queue on dataLayer) and when GA is not configured. */
export function track(event: string, params: Params = {}) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { dataLayer?: unknown[]; gtag?: (...a: unknown[]) => void };
  w.dataLayer = w.dataLayer || [];
  if (!w.gtag) w.gtag = function () { w.dataLayer!.push(arguments); };
  w.gtag("event", event, params);
}
