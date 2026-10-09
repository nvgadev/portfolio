import { useEffect, useRef, useState } from 'react';

// Tabbed terminal that auto-plays a short session per tool, then moves to the next tab.
// Clicking a tab replays that session and pauses the auto-advance.
const SESSIONS = [
  {
    tab: 'terraform',
    lines: [
      { t: 'cmd', s: 'terraform plan -out=landing-zone.tfplan' },
      { t: 'out', s: 'module.control_tower   module.aft   module.scp' },
      { t: 'cmd', s: 'terraform apply landing-zone.tfplan' },
      { t: 'ok', s: '✓ control_tower   ✓ aft   ✓ guardrails' },
      { t: 'ok', s: '✓ cloud_wan       ✓ network_firewall' },
      { t: 'out', s: 'Apply complete. No drift detected.' },
    ],
  },
  {
    tab: 'aws',
    lines: [
      { t: 'cmd', s: 'aws sts get-caller-identity' },
      { t: 'out', s: '"Arn": "…:assumed-role/platform-deployer/gha-oidc"' },
      { t: 'cmd', s: 'aws networkmanager get-core-network --id cwan' },
      { t: 'ok', s: 'State: AVAILABLE' },
      { t: 'out', s: 'Segments: prod | non-prod | shared-services' },
    ],
  },
  {
    tab: 'kubectl',
    lines: [
      { t: 'cmd', s: 'kubectl config use-context eks-platform' },
      { t: 'cmd', s: 'helm upgrade --install api ./charts/api' },
      { t: 'ok', s: 'Release "api" has been upgraded. Happy Helming!' },
      { t: 'cmd', s: 'argocd app sync api' },
      { t: 'ok', s: 'Health: Healthy   Sync: Synced' },
    ],
  },
  {
    tab: 'checkov',
    lines: [
      { t: 'cmd', s: 'checkov -d ./infra --framework terraform' },
      { t: 'out', s: 'Scanning modules: vpc, iam, s3, kms …' },
      { t: 'ok', s: '✓ Encryption at rest     ✓ Least-privilege IAM' },
      { t: 'ok', s: '✓ No public buckets      ✓ Logging enabled' },
      { t: 'out', s: 'Failed checks: 0' },
    ],
  },
  {
    tab: 'gh',
    lines: [
      { t: 'cmd', s: 'gh workflow run deploy.yml -f env=prod' },
      { t: 'out', s: 'runner: self-hosted (in-VPC)' },
      { t: 'ok', s: '✓ OIDC token exchanged, no static keys' },
      { t: 'ok', s: '✓ checkov   ✓ plan   ✓ apply' },
      { t: 'out', s: 'Deployment succeeded.' },
    ],
  },
];

export default function Terminal() {
  const [tab, setTab] = useState(0);
  const [lines, setLines] = useState([]);
  const [typing, setTyping] = useState('');
  const auto = useRef(true);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const script = SESSIONS[tab].lines;
    setLines([]);
    setTyping('');
    if (reduce) {
      setLines(script);
      return undefined;
    }
    let cancelled = false;
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    (async () => {
      await sleep(500);
      for (const line of script) {
        if (cancelled) return;
        if (line.t === 'cmd') {
          for (let i = 1; i <= line.s.length; i++) {
            if (cancelled) return;
            setTyping(line.s.slice(0, i));
            await sleep(26);
          }
          await sleep(200);
          setTyping('');
        } else {
          await sleep(180);
        }
        if (cancelled) return;
        setLines((l) => [...l, line]);
      }
      await sleep(2600);
      if (!cancelled && auto.current) setTab((t) => (t + 1) % SESSIONS.length);
    })();
    return () => {
      cancelled = true;
    };
  }, [tab]);

  return (
    <div className="w-[23rem] overflow-hidden rounded-2xl border border-white/10 bg-[#0d1424]/95 shadow-[0_30px_80px_-20px_rgba(37,99,235,0.45)] backdrop-blur">
      <div className="flex items-center gap-1.5 border-b border-white/10 px-3 pt-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="mr-2 h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <div className="flex gap-0.5 overflow-x-auto" role="tablist" aria-label="Terminal sessions">
          {SESSIONS.map((s, i) => (
            <button
              key={s.tab}
              role="tab"
              aria-selected={tab === i}
              onClick={() => {
                auto.current = false;
                setTab(i);
              }}
              className={`rounded-t-md px-2.5 py-1.5 font-mono text-[10.5px] transition-colors ${
                tab === i ? 'bg-white/10 text-white' : 'text-white/45 hover:text-white/80'
              }`}
            >
              {s.tab}
            </button>
          ))}
        </div>
      </div>
      <div className="min-h-[12.5rem] px-4 py-3 font-mono text-[11.5px] leading-6" aria-live="polite">
        {lines.map((l, i) => (
          <div key={i} className={`truncate ${l.t === 'cmd' ? 'text-white' : l.t === 'ok' ? 'text-[#4ade80]' : 'text-white/55'}`}>
            {l.t === 'cmd' && <span className="text-[#ffb547]">❯ </span>}
            {l.s}
          </div>
        ))}
        {lines.length < SESSIONS[tab].lines.length && (
          <div className="truncate text-white">
            <span className="text-[#ffb547]">❯ </span>
            {typing}
            <span className="ml-0.5 inline-block h-3.5 w-1.5 translate-y-0.5 animate-pulse bg-[#ffb547]" />
          </div>
        )}
      </div>
      <div className="flex h-1 bg-white/5">
        {SESSIONS.map((s, i) => (
          <span key={s.tab} className={`flex-1 transition-colors duration-500 ${i <= tab ? 'bg-gradient-to-r from-[#ff9900] to-[#7c3aed]' : ''}`} />
        ))}
      </div>
    </div>
  );
}
