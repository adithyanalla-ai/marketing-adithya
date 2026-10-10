import { TOOLS } from "@/content/site";

/** Honest tools strip: only tools Adithya actually works with. Marks are simple original glyphs, not official logos. */
export function ToolsStrip() {
  return (
    <section id="tools" aria-labelledby="tools-h" className="border-y border-card-line bg-white/60">
      <div className="container-x py-9">
        <h2 id="tools-h" className="text-center font-sans text-xs font-bold uppercase tracking-[0.18em] text-slate">Tools I work with</h2>
        <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-5 sm:gap-x-12">
          {TOOLS.map((t) => (
            <li key={t.name} className="group flex items-center gap-2.5 grayscale transition duration-200 hover:grayscale-0">
              <span aria-hidden="true" className="grid size-8 place-items-center rounded-lg text-[11px] font-extrabold text-white" style={{ background: t.color }}>{t.mark}</span>
              <span className="font-display text-[17px] font-extrabold tracking-tight text-ink">{t.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
