import Link from "next/link";
import { casePath, getCaseById, view } from "@/lib/case-study";

/** Inline client label. Prints the client name only when permission.clientNamePublic is true. */
export function CaseName({ id }: { id: string }) {
  const c = getCaseById(id);
  return <>{c ? view(c).name : "a client"}</>;
}

/** Verified facts for a case, rendered through the permission layer (numbers appear only if figuresPublic). */
export function CaseFacts({ id }: { id: string }) {
  const c = getCaseById(id);
  if (!c) return null;
  const v = view(c);
  return (
    <aside className="not-prose my-6 rounded-2xl border border-card-line bg-white p-5 text-[15px]">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand">Verified facts</p>
      <p className="mt-2"><strong>Role:</strong> {v.role}{v.period ? `, ${v.period}` : ""}. <strong>Client:</strong> <span className="capitalize-first inline-block">{v.name}</span>.</p>
      <ul className="mt-3 list-disc space-y-1 pl-5">
        {v.actions.map((a) => <li key={a}>{a}</li>)}
      </ul>
      {v.results.length > 0 && (
        <>
          <p className="mt-4 font-bold">Results</p>
          <ul className="mt-1 list-disc space-y-1 pl-5">
            {v.results.map((r) => <li key={r.label + (r.value ?? "")}>{r.value ? `${r.value} ${r.label}${r.scope ? ` (${r.scope})` : ""}` : r.label}</li>)}
          </ul>
        </>
      )}
      <p className="mt-4"><Link className="font-semibold text-brand underline" href={casePath(c)}>Read the full case study</Link></p>
    </aside>
  );
}
