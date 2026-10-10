export type Lead = {
  name: string;
  email: string;
  company: string;
  budget: string;
  message: string;
  receivedAt: Date;
};

export type NotifyResult = { ok: boolean; channel: "whatsapp" | "email"; provider: string; skipped?: boolean; error?: string };
