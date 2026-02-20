import Link from 'next/link';
import { Signal } from '@/lib/types';

const badgeColor: Record<Signal['kind'], string> = {
  spike: 'bg-radar/20 text-radar',
  'repeat-investor': 'bg-mint/20 text-mint',
  'mega-round': 'bg-alert/20 text-alert',
  'stage-shift': 'bg-fuchsia-500/20 text-fuchsia-300'
};

export function SignalCards({ signals }: { signals: Signal[] }) {
  return (
    <section>
      <h2 className="mb-3 text-lg font-semibold">Signals</h2>
      <div className="grid gap-3 md:grid-cols-2">
        {signals.map((signal, idx) => {
          const content = (
            <div className="card h-full">
              <span className={`rounded-full px-2 py-1 text-xs font-medium ${badgeColor[signal.kind]}`}>{signal.kind.replace('-', ' ')}</span>
              <h3 className="mt-2 text-base font-semibold">{signal.title}</h3>
              <p className="mt-2 text-sm text-slate-300">{signal.detail}</p>
            </div>
          );
          return signal.href ? (
            <Link key={`${signal.title}-${idx}`} href={signal.href} className="block transition hover:opacity-90">
              {content}
            </Link>
          ) : (
            <div key={`${signal.title}-${idx}`}>{content}</div>
          );
        })}
      </div>
    </section>
  );
}
