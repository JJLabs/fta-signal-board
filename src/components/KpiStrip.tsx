import { formatMoney } from '@/lib/data';

type Props = {
  total7d: number;
  rounds7d: number;
  medianRound7d: number;
  mostActiveSector: string;
};

export function KpiStrip({ total7d, rounds7d, medianRound7d, mostActiveSector }: Props) {
  const items = [
    { label: '7D Total Funding', value: formatMoney(total7d) },
    { label: '# Rounds (7D)', value: rounds7d.toString() },
    { label: 'Median Round (7D)', value: formatMoney(medianRound7d) },
    { label: 'Most Active Sector', value: mostActiveSector }
  ];

  return (
    <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <div className="card" key={item.label}>
          <p className="text-xs uppercase tracking-wider text-slate-400">{item.label}</p>
          <p className="mt-2 text-xl font-semibold text-white">{item.value}</p>
        </div>
      ))}
    </section>
  );
}
