import { useMemo, useRef, useState } from 'react';
import {
  Building2, Network, Code2, GitBranch, Container, Activity, ArrowUpRight, Check, Copy, Mail, Linkedin, Github,
  GraduationCap, MapPin, ShieldCheck, Search, BadgeCheck, CircleCheck, Briefcase,
  UserRound, Sparkles, FolderGit2, Wrench, Award, Cloud,
} from 'lucide-react';
import { profile, stats, expertise, experience, projects, skills, certifications, education, journey } from '../data/profile';
import byeBody from '../assets/bye-body.webp';
import byeHand from '../assets/bye-hand.webp';

const ICONS = {
  'landing-zone': [Building2, '#FF9900'],
  network: [Network, '#2563EB'],
  iac: [Code2, '#7C3AED'],
  cicd: [GitBranch, '#F2552C'],
  containers: [Container, '#0EA5E9'],
  observability: [Activity, '#16A34A'],
};

// Section heading with an icon tile for the section (no numbers, so it can't be confused with timelines)
function Heading({ icon: Icon, kicker, title, sub }) {
  return (
    <div className="reveal mb-12 flex items-end gap-5 md:mb-14">
      <span className="bg-grad hidden h-[5.5rem] w-[5.5rem] shrink-0 place-items-center rounded-3xl text-white shadow-[0_18px_40px_-16px_rgba(242,85,44,0.7)] sm:grid" aria-hidden="true">
        <Icon size={40} strokeWidth={1.75} />
      </span>
      <div className="max-w-3xl">
        <p className="mb-2 inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-awsdeep">
          <Icon size={14} className="sm:hidden" aria-hidden="true" />{kicker}
        </p>
        <h2 className="font-display text-5xl uppercase leading-[0.95] tracking-tight text-ink sm:text-6xl lg:text-7xl" style={{ textWrap: 'balance' }}>
          {title}
        </h2>
        {sub && <p className="mt-3 text-lg text-muted">{sub}</p>}
      </div>
    </div>
  );
}

const Wrap = ({ id, children, className = '' }) => (
  <section id={id} className={`relative px-5 py-24 sm:px-8 md:py-28 ${className}`}>
    <div className="relative mx-auto max-w-7xl">{children}</div>
  </section>
);

// Card that tilts in 3D toward the pointer, with a soft spotlight
function TiltCard({ children, className = '', as: Tag = 'div' }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${-y * 6}deg) rotateY(${x * 8}deg) translateY(-4px)`;
    el.style.setProperty('--mx', `${(x + 0.5) * 100}%`);
    el.style.setProperty('--my', `${(y + 0.5) * 100}%`);
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = '';
  };
  return (
    <Tag ref={ref} onPointerMove={onMove} onPointerLeave={onLeave} className={`group relative overflow-hidden transition-[transform,box-shadow] duration-200 ease-out ${className}`}>
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: 'radial-gradient(420px circle at var(--mx,50%) var(--my,50%), rgba(255,153,0,0.13), transparent 45%)' }}
        aria-hidden="true"
      />
      {children}
    </Tag>
  );
}

function CopyButton({ value, label, className = '' }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        Promise.resolve()
          .then(() => navigator.clipboard.writeText(value))
          .then(() => {
            setDone(true);
            setTimeout(() => setDone(false), 1600);
          })
          .catch(() => {});
      }}
      className={`inline-flex items-center gap-1.5 ${className}`}
    >
      {done ? <Check size={15} /> : <Copy size={15} />}
      {done ? 'Copied' : label}
    </button>
  );
}

const card = 'rounded-3xl bg-card ring-1 ring-line shadow-[0_10px_40px_-22px_rgba(14,21,37,0.35)]';

export function About() {
  return (
    <Wrap id="about" className="bg-card">
      <Heading icon={UserRound} kicker="About me" title={<>Platform engineer, <span className="text-grad">security-first.</span></>} />
      <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr]">
        <div className="reveal space-y-5 text-lg leading-relaxed text-ink/80">
          <p>{profile.summary}</p>
          <p>{profile.current}</p>
          <div className="flex flex-wrap gap-3 pt-2 text-sm">
            <span className="inline-flex items-center gap-2 rounded-full bg-paper px-3.5 py-2 text-ink/80 ring-1 ring-line"><GraduationCap size={16} className="text-awsdeep" />{education.degree}, {education.school} · {education.year}</span>
            <span className="inline-flex items-center gap-2 rounded-full bg-paper px-3.5 py-2 text-ink/80 ring-1 ring-line"><MapPin size={16} className="text-awsdeep" />{profile.location}</span>
            <span className="inline-flex items-center gap-2 rounded-full bg-paper px-3.5 py-2 text-ink/80 ring-1 ring-line"><BadgeCheck size={16} className="text-awsdeep" />AWS DevOps Engineer – Professional</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {stats.map((s, i) => (
            <TiltCard key={s.label} className={`reveal rounded-3xl p-6 sm:p-7 ${i === 0 ? 'bg-grad text-white shadow-[0_20px_50px_-20px_rgba(242,85,44,0.7)]' : 'bg-paper ring-1 ring-line'}`}>
              <p className={`font-display text-5xl sm:text-6xl ${i === 0 ? 'text-white' : 'text-grad'}`}>{s.value}</p>
              <p className={`mt-2 text-sm font-medium ${i === 0 ? 'text-white/90' : 'text-muted'}`}>{s.label}</p>
            </TiltCard>
          ))}
        </div>
      </div>
      {/* Career journey, oldest to newest */}
      <div className="reveal mt-16">
        <p className="mb-6 font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-awsdeep">My journey</p>
        <ol className="relative grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          <span className="bg-grad absolute left-6 right-6 top-[22px] hidden h-0.5 rounded-full opacity-60 lg:block" aria-hidden="true" />
          {journey.map((j, i) => (
            <li key={j.year} className="relative flex flex-col">
              <span className={`relative z-10 mb-4 hidden h-11 w-11 shrink-0 self-start lg:grid place-items-center rounded-full font-mono text-xs font-bold ring-4 ring-card ${i === journey.length - 1 ? 'bg-grad text-white' : 'bg-paper text-ink ring-offset-0'}`}>
                {(() => {
                  const Ico = [GraduationCap, Briefcase, ShieldCheck, Cloud][i] || Briefcase;
                  return <Ico size={18} />;
                })()}
              </span>
              <div className={`h-full rounded-2xl p-4 ring-1 sm:p-5 ${i === journey.length - 1 ? 'bg-paper ring-aws/50 shadow-[0_16px_40px_-20px_rgba(242,85,44,0.6)]' : 'bg-paper ring-line'}`}>
                <p className="font-display text-3xl leading-none text-grad sm:text-4xl">{j.year}</p>
                <p className="mt-2 text-[14px] font-semibold leading-snug text-ink sm:text-base">{j.role}</p>
                <p className="text-xs text-muted sm:text-sm">{j.org}</p>
                {i === journey.length - 1 && <p className="mt-2 inline-flex rounded-full bg-aws/15 px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-widest text-awsdeep">Now</p>}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Wrap>
  );
}

export function Expertise() {
  return (
    <Wrap id="expertise" className="dot-grid">
      <Heading icon={Sparkles} kicker="Expertise" title="What I build" sub="Six areas I own end to end, from account vending to the packet path." />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {expertise.map((e) => {
          const [Icon, color] = ICONS[e.key];
          return (
            <TiltCard key={e.key} className={`reveal p-7 ${card}`}>
              <span className="mb-6 grid h-12 w-12 place-items-center rounded-2xl text-white" style={{ background: color, boxShadow: `0 12px 24px -10px ${color}` }}>
                <Icon size={22} />
              </span>
              <h3 className="mb-2 text-xl font-bold text-ink">{e.title}</h3>
              <p className="text-[15px] leading-relaxed text-muted">{e.body}</p>
            </TiltCard>
          );
        })}
      </div>
    </Wrap>
  );
}

export function Experience() {
  const [sel, setSel] = useState(0);
  const [area, setArea] = useState(0);
  const x = experience[sel];
  const a = x.areas[Math.min(area, x.areas.length - 1)];

  return (
    <Wrap id="experience" className="bg-card">
      <Heading icon={Briefcase} kicker="Experience" title="Where I've shipped" sub="8+ years across enterprise insurance and federal programs." />
      <div className="grid gap-8 lg:grid-cols-[19rem_1fr]">
        {/* Timeline of roles */}
        <ol className="reveal relative flex gap-3 overflow-x-auto pb-2 lg:block lg:space-y-3 lg:overflow-visible lg:pb-0" role="tablist" aria-label="Roles">
          <span className="absolute bottom-6 left-[11px] top-6 hidden w-px bg-line lg:block" aria-hidden="true" />
          {experience.map((r, i) => (
            <li key={r.role + r.period} className="relative shrink-0 lg:pl-8">
              <span
                className={`absolute left-[5px] top-7 hidden h-[13px] w-[13px] rounded-full ring-4 lg:block ${sel === i ? 'bg-aws ring-aws/25' : 'bg-card ring-line'}`}
                aria-hidden="true"
              />
              <button
                role="tab"
                aria-selected={sel === i}
                onClick={() => {
                  setSel(i);
                  setArea(0);
                }}
                className={`w-[16rem] rounded-2xl p-4 text-left transition-all lg:w-full ${
                  sel === i ? 'bg-paper ring-2 ring-aws/60 shadow-[0_16px_40px_-20px_rgba(242,85,44,0.6)]' : 'ring-1 ring-transparent hover:bg-paper'
                }`}
              >
                <p className="font-mono text-[11px] uppercase tracking-widest text-muted">{r.period}</p>
                <p className="mt-1 text-lg font-bold text-ink">{r.role}</p>
                <p className="text-sm text-muted">{r.company}</p>
              </button>
            </li>
          ))}
        </ol>

        {/* Role detail */}
        <div className="relative overflow-hidden rounded-3xl bg-paper p-6 ring-1 ring-line sm:p-9" role="tabpanel">
          <div className="bg-grad absolute inset-x-0 top-0 h-1" aria-hidden="true" />
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h3 className="text-2xl font-bold text-ink sm:text-[2rem] sm:leading-tight">{x.role}</h3>
              <p className="mt-1 flex flex-wrap items-center gap-x-2 text-[15px]">
                <span className="font-semibold text-awsdeep">{x.company}</span>
                <span className="text-muted">/</span>
                <span className="inline-flex items-center gap-1 text-muted"><MapPin size={14} />{x.place}</span>
              </p>
            </div>
            <span className="self-start whitespace-nowrap rounded-full bg-card px-3.5 py-1.5 font-mono text-xs font-semibold text-ink ring-1 ring-line">{x.period}</span>
          </div>

          <div className="mb-6 flex flex-wrap gap-2" role="tablist" aria-label="Focus areas" data-guide="exp-tabs">
            {x.areas.map((ar, i) => (
              <button
                key={ar.name}
                role="tab"
                aria-selected={area === i}
                onClick={() => setArea(i)}
                className={`rounded-full px-4 py-2 text-[13px] font-semibold transition-all ${
                  area === i ? 'bg-grad text-white shadow-[0_8px_20px_-8px_rgba(242,85,44,0.7)]' : 'bg-card text-ink/75 ring-1 ring-line hover:text-ink'
                }`}
              >
                {ar.name}
              </button>
            ))}
          </div>

          <ul key={`${sel}-${area}`} className="space-y-4" role="tabpanel">
            {a.points.map((p, i) => (
              <li key={p} className="animate-pop flex gap-3 text-[15.5px] leading-relaxed text-ink/85" style={{ animationDelay: `${i * 50}ms` }}>
                <ArrowUpRight size={18} className="mt-1 shrink-0 text-[#0EA5E9]" />
                {p}
              </li>
            ))}
          </ul>

          <div className="mt-8 border-t border-line pt-6">
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-muted">Environment</p>
            <div className="flex flex-wrap gap-2">
              {x.environment.map((s) => (
                <span key={s} className="rounded-md bg-card px-2.5 py-1 font-mono text-[12px] text-ink/75 ring-1 ring-line">{s}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Wrap>
  );
}

export function Projects() {
  const kinds = ['All', ...Array.from(new Set(projects.map((p) => p.kind)))];
  const [kind, setKind] = useState('All');
  const list = projects.map((p, i) => ({ ...p, n: i + 1 })).filter((p) => kind === 'All' || p.kind === kind);

  return (
    <Wrap id="projects" className="dot-grid">
      <Heading icon={FolderGit2} kicker="Projects" title="Things I've shipped" />
      <div className="reveal mb-8 flex flex-wrap gap-2" role="tablist" aria-label="Project type" data-guide="proj-filter">
        {kinds.map((k) => {
          const count = k === 'All' ? projects.length : projects.filter((p) => p.kind === k).length;
          return (
            <button
              key={k}
              role="tab"
              aria-selected={kind === k}
              onClick={() => setKind(k)}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                kind === k ? 'bg-grad text-white shadow-[0_8px_20px_-8px_rgba(242,85,44,0.7)]' : 'bg-card text-ink/75 ring-1 ring-line hover:text-ink'
              }`}
            >
              {k}
              <span className={`rounded-full px-1.5 text-[11px] ${kind === k ? 'bg-white/25' : 'bg-paper text-muted'}`}>{count}</span>
            </button>
          );
        })}
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {list.map((p) => {
          const Icon = p.kind === 'Open source' ? Github : Briefcase;
          return (
            <TiltCard key={p.title} className={`flex flex-col p-7 ${card}`}>
              <div className="mb-5 flex items-center justify-between">
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">
                  {String(p.n).padStart(2, '0')} · {p.kind}
                </p>
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-paper text-awsdeep ring-1 ring-line"><Icon size={17} /></span>
              </div>
              <h3 className="text-xl font-bold leading-snug text-ink">{p.title}</h3>
              <p className="mt-1 text-sm font-semibold text-awsdeep">{p.org}</p>
              <p className="mt-4 text-[15px] leading-relaxed text-muted">{p.body}</p>
              <ul className="mt-5 space-y-2.5">
                {p.points.map((pt) => (
                  <li key={pt} className="flex gap-2.5 text-[14px] leading-relaxed text-ink/85">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0EA5E9]" />
                    {pt}
                  </li>
                ))}
              </ul>
              {p.metric && (
                <div className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1 rounded-2xl bg-paper px-4 py-3 ring-1 ring-line">
                  <span className={`whitespace-nowrap font-display text-grad ${p.metric.value.length > 5 ? 'text-2xl' : 'text-3xl'}`}>{p.metric.value}</span>
                  <span className="text-sm text-muted">{p.metric.label}</span>
                </div>
              )}
              <div className="mt-auto pt-6">
                <div className="flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <span key={t} className="rounded-md bg-paper px-2 py-1 font-mono text-[11px] text-ink/70 ring-1 ring-line">{t}</span>
                  ))}
                </div>
                {p.link && (
                  <a href={p.link} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-awsdeep hover:underline">
                    View on GitHub <ArrowUpRight size={15} />
                  </a>
                )}
              </div>
            </TiltCard>
          );
        })}
      </div>
    </Wrap>
  );
}

export function Skills() {
  const [group, setGroup] = useState('All');
  const [q, setQ] = useState('');
  const groups = ['All', ...skills.map((s) => s.group)];
  const visible = useMemo(() => {
    const term = q.trim().toLowerCase();
    return skills
      .filter((g) => group === 'All' || g.group === group)
      .map((g) => ({ ...g, items: g.items.filter((i) => !term || i.toLowerCase().includes(term)) }))
      .filter((g) => g.items.length);
  }, [group, q]);
  const count = visible.reduce((n, g) => n + g.items.length, 0);

  return (
    <Wrap id="skills" className="bg-card">
      <Heading icon={Wrench} kicker="Toolbox" title="Technical skills" />
      <div className="reveal mb-4 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Skill categories">
          {groups.map((g) => (
            <button
              key={g}
              role="tab"
              aria-selected={group === g}
              onClick={() => setGroup(g)}
              className={`rounded-full px-4 py-2 text-[13px] font-semibold transition-all ${
                group === g ? 'bg-grad text-white shadow-[0_8px_20px_-8px_rgba(242,85,44,0.7)]' : 'bg-paper text-ink/75 ring-1 ring-line hover:text-ink'
              }`}
            >
              {g}
            </button>
          ))}
        </div>
        <label className="relative block shrink-0" htmlFor="skill-search">
          <span className="sr-only">Search skills</span>
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
          <input
            id="skill-search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search a tool… e.g. Terraform"
            className="w-full rounded-full bg-paper py-2.5 pl-10 pr-4 text-sm text-ink outline-none ring-1 ring-line placeholder:text-muted focus:ring-2 focus:ring-aws lg:w-72"
          />
        </label>
      </div>
      <p className="mb-8 font-mono text-[11px] uppercase tracking-[0.25em] text-muted" aria-live="polite">{count} tools in view</p>
      <div className="columns-1 gap-5 md:columns-2 xl:columns-3">
        {visible.map((g) => (
          <div key={g.group} className="mb-5 break-inside-avoid rounded-3xl bg-paper p-6 ring-1 ring-line">
            <h3 className="mb-4 text-lg font-bold text-awsdeep">{g.group}</h3>
            <div className="flex flex-wrap gap-2">
              {g.items.map((s) => (
                <span key={s} className="rounded-lg bg-card px-3 py-1.5 text-[13px] font-medium text-ink/85 ring-1 ring-line transition-all hover:-translate-y-0.5 hover:shadow-md hover:ring-aws/60">
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      {!visible.length && <p className="text-muted">No tools match “{q}”. Try another name.</p>}
    </Wrap>
  );
}

// Hanging AWS badge that swings gently
function AwsBadge() {
  return (
    <div className="relative mx-auto flex flex-col items-center">
      <span className="h-10 w-px bg-gradient-to-b from-transparent to-[#4FC3F7]" aria-hidden="true" />
      <div className="animate-swing relative h-52 w-48" style={{ transformOrigin: '50% -40px' }}>
        <svg viewBox="0 0 200 220" className="absolute inset-0 h-full w-full drop-shadow-[0_24px_40px_rgba(30,136,229,0.45)]" aria-hidden="true">
          <defs>
            <linearGradient id="hexEdge" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#81D4FA" />
              <stop offset="1" stopColor="#1E88E5" />
            </linearGradient>
            <linearGradient id="hexFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#1A2540" />
              <stop offset="1" stopColor="#0E1525" />
            </linearGradient>
            <linearGradient id="ribbon" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#1565C0" />
              <stop offset="0.5" stopColor="#1E88E5" />
              <stop offset="1" stopColor="#1565C0" />
            </linearGradient>
          </defs>
          <polygon points="100,6 190,58 190,162 100,214 10,162 10,58" fill="url(#hexFill)" stroke="url(#hexEdge)" strokeWidth="7" />
          <polygon points="100,22 176,66 176,154 100,198 24,154 24,66" fill="none" stroke="rgba(129,212,250,0.25)" strokeWidth="1.5" />
          <clipPath id="hexInner">
            <polygon points="100,22 176,66 176,154 100,198 24,154 24,66" />
          </clipPath>
          <rect x="24" y="147" width="152" height="22" fill="url(#ribbon)" clipPath="url(#hexInner)" />
          <text x="100" y="158.5" textAnchor="middle" dominantBaseline="central" fill="#fff" fontSize="10.5" fontWeight="700" letterSpacing="2.6" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
            PROFESSIONAL
          </text>
        </svg>
        <div className="relative flex h-full flex-col items-center pt-10 text-center">
          <p className="font-sans text-[34px] font-extrabold lowercase leading-none tracking-tight text-white">aws</p>
          <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/70">Certified</p>
          <p className="mt-0.5 text-[15px] font-bold text-white">DevOps Engineer</p>
        </div>
      </div>
    </div>
  );
}

export function Certifications() {
  return (
    <Wrap id="certifications" className="dot-grid">
      <Heading icon={Award} kicker="Certifications" title="Verified credentials" />
      {certifications.map((c) => (
        <div key={c.credentialId} className="reveal relative overflow-hidden rounded-[2rem] bg-night p-6 text-white ring-1 ring-white/10 sm:p-10">
          <div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(circle at 15% 30%, rgba(30,136,229,0.35), transparent 45%), radial-gradient(circle at 90% 100%, rgba(255,153,0,0.25), transparent 50%)' }} aria-hidden="true" />
          <div className="relative grid items-center gap-10 md:grid-cols-[16rem_1fr]">
            <AwsBadge />
            <div>
              <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7DD3FC] ring-1 ring-[#7DD3FC]/40">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#7DD3FC]" /> Verifiable credential
              </p>
              <h3 className="text-3xl font-bold leading-tight sm:text-4xl" style={{ textWrap: 'balance' }}>{c.name}</h3>
              <p className="mt-2 inline-flex items-center gap-2 text-white/70"><ShieldCheck size={16} className="text-aws" /> Issued by {c.issuer} · {c.level}</p>
              <div className="mt-6 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                <p className="mb-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-white/50">Validation number</p>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="select-all break-all font-mono text-[15px] text-[#FFB547]">{c.credentialId}</span>
                  <CopyButton value={c.credentialId} label="Copy" className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/85 ring-1 ring-white/15 hover:bg-white/20" />
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {c.domains.map((d) => (
                  <span key={d} className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1.5 text-[13px] text-white/80 ring-1 ring-white/10">
                    <CircleCheck size={14} className="text-[#7DD3FC]" /> {d}
                  </span>
                ))}
              </div>
              <a
                data-guide="verify"
                href={c.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#FFB547] px-6 py-3 text-sm font-bold text-[#0E1525] shadow-[0_14px_30px_-10px_rgba(255,181,71,0.8)] transition-transform hover:-translate-y-0.5"
              >
                Verify on AWS Certmetrics <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </div>
      ))}
    </Wrap>
  );
}

export function Contact() {
  return (
    <section id="contact" className="px-5 pb-10 pt-6 sm:px-8">
      <div className="reveal relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-night text-white ring-1 ring-white/10">
        <div className="animate-drift absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-[#FF9900]/25 blur-[100px]" aria-hidden="true" />
        <div className="animate-drift absolute -left-10 -top-24 h-[28rem] w-[28rem] rounded-full bg-[#7C3AED]/35 blur-[110px]" style={{ animationDelay: '-6s' }} aria-hidden="true" />
        <div className="relative grid items-end gap-4 lg:grid-cols-[1fr_minmax(0,24rem)]">
          <div className="px-6 pb-6 pt-14 sm:px-12 lg:pb-16 lg:pt-16">
            <p className="mb-4 font-mono text-xs font-semibold uppercase tracking-[0.3em] text-[#7DD3FC]">Contact</p>
            <h2 className="text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.4rem]" style={{ textWrap: 'balance' }}>
              Need a cloud platform that&apos;s <span className="text-[#FFB547]">secure from day one?</span>
            </h2>
            <p className="mt-5 max-w-xl text-lg text-white/75">
              I design AWS landing zones, zero-trust networks and keyless CI/CD that teams can ship on safely, with every change in code and every account audited.
            </p>
            <ul className="mt-6 grid max-w-xl gap-2 text-[15px] text-white/80 sm:grid-cols-2">
              {['Open to senior cloud & DevSecOps roles', 'Remote or hybrid · Florida, USA', 'AWS Certified DevOps Professional', 'Usually replies within a day'].map((t) => (
                <li key={t} className="flex items-center gap-2"><CircleCheck size={16} className="shrink-0 text-[#7DD3FC]" />{t}</li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap items-center gap-3" data-guide="email-row">
              <a data-guide="email" href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 rounded-full bg-[#7DD3FC] px-5 py-3 font-semibold text-[#0E1525] transition-transform hover:-translate-y-0.5">
                <Mail size={18} /> <span className="select-all">{profile.email}</span>
              </a>
              <CopyButton value={profile.email} label="Copy email" className="rounded-full px-5 py-3 text-sm font-semibold text-white/85 ring-1 ring-white/20 hover:bg-white/10" />
            </div>
            <div className="mt-5 flex gap-3">
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="grid h-11 w-11 place-items-center rounded-full ring-1 ring-white/20 transition-colors hover:bg-[#0A66C2]"><Linkedin size={18} /></a>
              <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="grid h-11 w-11 place-items-center rounded-full ring-1 ring-white/20 transition-colors hover:bg-white/15"><Github size={18} /></a>
            </div>
          </div>
          <div className="relative flex justify-center px-6 lg:justify-end lg:px-0">
            <div className="relative mb-[-9%] w-[min(24rem,80vw)] pt-16 lg:mr-10 lg:pt-6">
              {/* Speech bubble sits beside the avatar, clear of the face */}
              <div className="absolute left-[4%] top-0 z-10 lg:left-[-16%] lg:top-[5%]">
                <div className="animate-bob whitespace-nowrap rounded-2xl rounded-br-md bg-white px-4 py-2.5 text-[15px] font-semibold leading-snug text-[#0E1525] shadow-xl">
                  Bye for now! 👋
                  <span className="block text-[13px] font-medium text-[#5B6478]">Thanks for stopping by.</span>
                </div>
              </div>
              {/* Portrait crop; the hand waves from the wrist, which sits below the card edge */}
              <div className="relative" style={{ transform: 'scaleX(-1)', aspectRatio: '527 / 444' }}>
                <img src={byeBody} alt={`3D avatar of ${profile.name}, waving goodbye`} className="absolute inset-0 block h-full w-full select-none" draggable="false" />
                <img
                  src={byeHand}
                  alt=""
                  aria-hidden="true"
                  className="animate-byewave absolute inset-0 block h-full w-full select-none"
                  style={{ transformOrigin: '11.76% 92.3%' }}
                  draggable="false"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="px-5 pb-8 sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 text-xs text-muted sm:flex-row">
        <p>© {new Date().getFullYear()} {profile.name} · {profile.location}</p>
        <p className="font-mono">Built with React, Three.js & GSAP</p>
      </div>
    </footer>
  );
}
