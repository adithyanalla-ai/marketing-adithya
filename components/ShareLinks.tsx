export function ShareLinks({ url, title }: { url: string; title: string }) {
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  const links = [
    { label: "Share on LinkedIn", text: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}` },
    { label: "Share on X", text: "X", href: `https://twitter.com/intent/tweet?url=${u}&text=${t}` },
    { label: "Share on WhatsApp", text: "WhatsApp", href: `https://wa.me/?text=${t}%20${u}` },
  ];
  return (
    <div className="flex flex-wrap items-center gap-3 text-sm">
      <span className="font-semibold">Share:</span>
      {links.map((l) => (
        <a key={l.text} href={l.href} aria-label={l.label} rel="noopener noreferrer" target="_blank"
          className="rounded-full border border-line px-3 py-1.5 hover:border-ink">{l.text}</a>
      ))}
    </div>
  );
}
