import { TOOLS } from "@/content/site";

/** Honest tools strip: only tools Adithya works with. Marks are simple original glyphs, not official logos. */
export function ToolsStrip({ names, id = "tools", heading = "Tools I work with", className = "" }: { names?: string[]; id?: string; heading?: string; className?: string }) {
  const tools = names ? TOOLS.filter((t) => names.includes(t.name)) : TOOLS;
  return (
    <section id={id} aria-labelledby={`${id}-h`} className={`container-x py-10 ${className}`}>
      <h2 id={`${id}-h`} className="text-center font-sans text-xs font-bold uppercase tracking-[0.2em] text-slate">{heading}</h2>
      <ul className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
        {tools.map((t) => (
          <li key={t.name} className="card card-lift group flex items-center gap-3 !rounded-2xl px-5 py-3.5">
            <span aria-hidden="true" className="grid size-8 place-items-center rounded-lg text-[11px] font-extrabold text-white" style={{ background: t.color }}>{t.mark}</span>
            <span className="text-[15px] font-semibold text-ink">{t.name}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
