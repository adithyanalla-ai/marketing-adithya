import type { IconName } from "@/components/ui/iconMap";

/** Any string field equal to (or containing) this marker is unresolved and must never render publicly. */
export const TODO = "TODO_CONFIRM";

export type CaseResult = {
  value: string;
  label: string;
  /** Time frame or context, e.g. "within 6 months". Empty string when none was given. */
  scope: string;
  /** Number-free wording shown when permission.figuresPublic is false. */
  qualitative: string;
};

export type CaseStudy = {
  /** Internal id and the URL used only when the client name is public. */
  slug: string;
  /** URL used while the client name is private (never contains the client name). */
  anonymizedSlug: string;
  clientName: string;
  anonymizedLabel: string;
  kind: "employer" | "project";
  /** "{client}" is replaced by the display name (client name only if public). */
  headline: string;
  role: string;
  period: string;
  challenge: string;
  actions: string[];
  /** Number-free rewording of `actions`, used while figures are private. Same length as `actions`. */
  actionsPublic?: string[];
  results: CaseResult[];
  tools: string[];
  permission: { clientNamePublic: boolean; figuresPublic: boolean };
  confirmed: boolean;
  /** YYYY-MM-DD of the last substantive edit to this case. Bump it when you change the content; it becomes the sitemap lastmod. */
  updated: string;
  serviceSlugs: string[];
  /** Blog post that explains the method behind this case. */
  postSlug: string;
  icon: IconName;
};
