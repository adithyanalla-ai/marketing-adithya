"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, LazyMotion, animate, domAnimation, m, useReducedMotion } from "framer-motion";
import { STATS } from "@/content/site";
import { FunnelGraphic } from "./FunnelGraphic";
import {
  ArrowDownIcon, ArrowUpIcon, CameraIcon, ChatIcon, CrownIcon, FormIcon, InfinityIcon, MegaphoneIcon, TagIcon, TrendIcon, UsersIcon,
} from "../icons";

const W = 660;
const H = 640;
const BLUE = "#1D5CFF", TEAL = "#14B8A6", ORANGE = "#F59E0B", VIOLET = "#6366F1";

/* ---------- helpers ---------- */

function useCountUp(target: number, delay: number, reduced: boolean) {
  const [v, setV] = useState(reduced ? target : 0);
  useEffect(() => {
    if (reduced) { setV(target); return; }
    const c = animate(0, target, { duration: 1.6, delay, ease: "easeOut", onUpdate: (x) => setV(Math.round(x)) });
    return () => c.stop();
  }, [target, delay, reduced]);
  return v;
}

function Chip({ color, children }: { color: string; children: ReactNode }) {
  return (
    <span className="grid size-8 shrink-0 place-items-center rounded-[10px] text-white" style={{ background: color }}>
      {children}
    </span>
  );
}

/** Absolutely positioned card that enters in a stagger and then floats gently. */
function Float({ x, y, w, h, i, reduced, children }: { x: number; y: number; w: number; h?: number; i: number; reduced: boolean; children: ReactNode }) {
  return (
    <m.div
      className="absolute"
      style={{ left: x, top: y, width: w, height: h }}
      initial={reduced ? false : { opacity: 0, y: 16 }}
      animate={reduced ? undefined : { opacity: 1, y: [0, -5, 0] }}
      transition={reduced ? undefined : {
        opacity: { duration: 0.5, delay: 0.1 + i * 0.09 },
        y: { duration: 5 + (i % 4) * 0.7, delay: 0.1 + i * 0.09, repeat: Infinity, ease: "easeInOut" },
      }}
    >
      <div className="card card-lift h-full">{children}</div>
    </m.div>
  );
}

/* ---------- cards ---------- */

function KpiCard({ value, suffix, label, color, icon, trend, delay, reduced }: {
  value: number; suffix: string; label: string; color: string; icon: ReactNode; trend: "up" | "down"; delay: number; reduced: boolean;
}) {
  const n = useCountUp(value, delay, reduced);
  return (
    <div className="flex h-full flex-col justify-between p-3.5">
      <div className="flex items-center justify-between">
        <Chip color={color}>{icon}</Chip>
        <span className="grid size-6 place-items-center rounded-full bg-[#E8F7EE] text-success">
          {trend === "up" ? <ArrowUpIcon width={13} height={13} strokeWidth={3} /> : <ArrowDownIcon width={13} height={13} strokeWidth={3} />}
        </span>
      </div>
      <div>
        <p className="font-display text-[26px] font-extrabold leading-none tracking-tight text-ink">
          {n.toLocaleString("en-IN")}{suffix}
        </p>
        <p className="mt-1 text-[12px] font-semibold text-slate">{label}</p>
      </div>
    </div>
  );
}

const SOURCES = [
  { name: "Website Form", color: BLUE, icon: <FormIcon width={16} height={16} /> },
  { name: "Google Ads", color: ORANGE, icon: <MegaphoneIcon width={16} height={16} /> },
  { name: "Meta Ads", color: "#0866FF", icon: <InfinityIcon width={16} height={16} /> },
  { name: "Instagram", color: "#D946A8", icon: <CameraIcon width={16} height={16} /> },
  { name: "Chat / WhatsApp", color: "#16A34A", icon: <ChatIcon width={16} height={16} /> },
];

function EnquiriesCard() {
  return (
    <div className="p-3.5">
      <p className="mb-1 text-[13px] font-extrabold text-ink">Enquiries</p>
      <ul>
        {SOURCES.map((s) => (
          <li key={s.name} className="flex h-[46px] items-center gap-2.5">
            <Chip color={s.color}>{s.icon}</Chip>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[12px] font-bold leading-tight text-ink">{s.name}</span>
              <span className="block text-[10px] font-semibold text-success">New lead</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const CRM = [
  { n: "Priya", s: "Captured", c: BLUE, bg: "#E8EFFF" },
  { n: "Rahul", s: "Nurturing", c: "#B45309", bg: "#FEF3C7" },
  { n: "Anjali", s: "Engaged", c: "#4F46E5", bg: "#EAEAFE" },
  { n: "Vikram", s: "Won", c: "#15803D", bg: "#DCFCE7" },
];

function CrmCard() {
  return (
    <div className="p-3.5">
      <div className="flex items-center justify-between">
        <p className="text-[13px] font-extrabold text-ink">CRM &amp; Automation</p>
      </div>
      <ul className="mt-2">
        {CRM.map((r, i) => (
          <li key={r.n} className="flex h-[46px] items-center gap-2">
            <span className="grid size-7 shrink-0 place-items-center rounded-full text-[11px] font-extrabold text-white" style={{ background: [BLUE, ORANGE, VIOLET, TEAL][i] }}>{r.n[0]}</span>
            <span className="min-w-0 flex-1 truncate text-[12px] font-bold text-ink">{r.n}</span>
            <span className="rounded-full px-2 py-0.5 text-[10px] font-extrabold" style={{ color: r.c, background: r.bg }}>{r.s}</span>
          </li>
        ))}
      </ul>
      <p className="text-right text-[9.5px] font-semibold uppercase tracking-wide text-slate/80">Sample data</p>
    </div>
  );
}

function RevenueCard({ reduced }: { reduced: boolean }) {
  return (
    <div className="flex h-full p-3.5">
      <div className="flex min-w-0 flex-1 flex-col justify-between">
        <div className="flex items-center gap-2">
          <Chip color={BLUE}><TrendIcon width={16} height={16} /></Chip>
          <p className="text-[13px] font-extrabold">Revenue Growth</p>
        </div>
        <div>
          <p className="font-display text-[25px] font-extrabold leading-none tracking-tight text-brand">{STATS.revenueFacilitated.text}</p>
          <p className="mt-1 text-[12px] font-semibold text-slate">{STATS.revenueFacilitated.label}</p>
        </div>
        <p className="text-[9.5px] font-semibold uppercase tracking-wide text-slate/80">Illustrative chart</p>
      </div>
      <svg viewBox="0 0 190 110" className="mt-1 h-full w-[190px] shrink-0" aria-hidden="true">
        <defs>
          <linearGradient id="rev-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor={BLUE} stopOpacity=".28" /><stop offset="1" stopColor={BLUE} stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <rect key={i} x={8 + i * 30} y={100 - (14 + i * 11)} width="16" height={14 + i * 11} rx="4" fill={BLUE} opacity={0.12 + i * 0.05} />
        ))}
        <path d="M8 84 C 38 80, 52 70, 76 62 S 124 40, 150 26 L 174 16 L 174 100 L 8 100 Z" fill="url(#rev-fill)" />
        <m.path d="M8 84 C 38 80, 52 70, 76 62 S 124 40, 150 26 L 172 17" fill="none" stroke={BLUE} strokeWidth="3" strokeLinecap="round"
          initial={reduced ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.4, delay: 0.9, ease: "easeOut" }} />
        <path d="M163 12 175 15 169 27" fill="none" stroke={BLUE} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

const CUSTOMERS = [
  { big: `${STATS.studentsAdmitted.value}${STATS.studentsAdmitted.suffix}`, small: STATS.studentsAdmitted.label },
  { big: STATS.seatsWon.text, small: STATS.seatsWon.label },
];

function MoreCustomersCard({ reduced }: { reduced: boolean }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => setI((v) => (v + 1) % CUSTOMERS.length), 4500);
    return () => clearInterval(t);
  }, [reduced]);
  const c = CUSTOMERS[i];
  return (
    <div className="flex h-full flex-col justify-between p-3.5">
      <div className="flex items-center gap-2">
        <Chip color={ORANGE}><CrownIcon width={16} height={16} /></Chip>
        <p className="text-[13px] font-extrabold">More Customers</p>
      </div>
      <div className="relative h-[52px]">
        <AnimatePresence mode="wait" initial={false}>
          <m.div key={c.big} initial={reduced ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }} className="absolute inset-0">
            <p className="font-display text-[30px] font-extrabold leading-none tracking-tight text-ink">{c.big}</p>
            <p className="mt-1 text-[12px] font-semibold text-slate">{c.small}</p>
          </m.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ---------- connectors ---------- */

function Dots({ d, id, delay, reduced }: { d: string; id: string; delay: number; reduced: boolean }) {
  return (
    <>
      <mask id={id} maskUnits="userSpaceOnUse" x="0" y="0" width={W} height={H}>
        <m.path d={d} fill="none" stroke="#fff" strokeWidth="6" initial={reduced ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.1, delay, ease: "easeOut" }} />
      </mask>
      <path d={d} fill="none" stroke={BLUE} strokeOpacity=".8" strokeWidth="2.6" strokeLinecap="round" strokeDasharray="0.1 6" mask={`url(#${id})`} />
    </>
  );
}

function Connectors({ reduced }: { reduced: boolean }) {
  const paths = SOURCES.map((_, i) => {
    const y0 = 112 + 44 + i * 46 + 10;
    const y1 = 130 + i * 15;
    return `M178 ${y0} C 196 ${y0}, 188 ${y1}, 212 ${y1}`;
  });
  return (
    <svg className="pointer-events-none absolute inset-0" width={W} height={H} viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
      {paths.map((d, i) => <Dots key={i} id={`dots-${i}`} d={d} delay={0.7 + i * 0.12} reduced={reduced} />)}
      <Dots id="dots-out" d="M446 322 C 462 322, 464 300, 482 300" delay={1.4} reduced={reduced} />
    </svg>
  );
}

/* ---------- layouts ---------- */

function Desktop({ reduced }: { reduced: boolean }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setScale(Math.min(1, el.clientWidth / W)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const kw = (W - 32) / 3;
  return (
    <div ref={boxRef} className="absolute inset-0">
      <div style={{ width: W, height: H, transform: `scale(${scale})`, transformOrigin: "top left" }} className="relative">
        <div className="pointer-events-none absolute left-1/2 top-[34%] size-[420px] -translate-x-1/2 rounded-full bg-brand/10 blur-3xl" />
        <Connectors reduced={reduced} />
        <Float x={0} y={0} w={kw} h={96} i={0} reduced={reduced}>
          <KpiCard {...STATS.qualifiedLeads} color={BLUE} icon={<UsersIcon width={17} height={17} />} trend="up" delay={0.5} reduced={reduced} />
        </Float>
        <Float x={kw + 16} y={0} w={kw} h={96} i={1} reduced={reduced}>
          <KpiCard {...STATS.conversionLift} color={TEAL} icon={<TrendIcon width={17} height={17} />} trend="up" delay={0.6} reduced={reduced} />
        </Float>
        <Float x={(kw + 16) * 2} y={0} w={kw} h={96} i={2} reduced={reduced}>
          <KpiCard {...STATS.lowerCostPerLead} color={ORANGE} icon={<TagIcon width={17} height={17} />} trend="down" delay={0.7} reduced={reduced} />
        </Float>
        <Float x={0} y={112} w={178} h={290} i={3} reduced={reduced}><EnquiriesCard /></Float>
        <m.div className="absolute" style={{ left: 190, top: 112, width: 280 }} initial={reduced ? false : { opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.35 }}>
          <FunnelGraphic />
        </m.div>
        <Float x={482} y={112} w={178} h={290} i={5} reduced={reduced}><CrmCard /></Float>
        <Float x={0} y={424} w={400} h={170} i={6} reduced={reduced}><RevenueCard reduced={reduced} /></Float>
        <Float x={416} y={424} w={244} h={170} i={7} reduced={reduced}><MoreCustomersCard reduced={reduced} /></Float>
      </div>
    </div>
  );
}

function Mobile({ reduced }: { reduced: boolean }) {
  return (
    <div className="flex h-full flex-col gap-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="card h-[96px]"><KpiCard {...STATS.conversionLift} color={TEAL} icon={<TrendIcon width={17} height={17} />} trend="up" delay={0.3} reduced={reduced} /></div>
        <div className="card h-[96px]"><KpiCard {...STATS.lowerCostPerLead} color={ORANGE} icon={<TagIcon width={17} height={17} />} trend="down" delay={0.4} reduced={reduced} /></div>
      </div>
      <FunnelGraphic className="mx-auto w-full max-w-[320px]" />
    </div>
  );
}

export default function HeroDashboard() {
  const reducedPref = useReducedMotion();
  const reduced = !!reducedPref;
  const [wide, setWide] = useState(() => (typeof window === "undefined" ? true : window.matchMedia("(min-width: 640px)").matches));
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");
    const on = () => setWide(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return <LazyMotion features={domAnimation}>{wide ? <Desktop reduced={reduced} /> : <Mobile reduced={reduced} />}</LazyMotion>;
}
