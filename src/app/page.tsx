import Link from 'next/link';
import { Charts } from '@/components/Charts';
import { DealTable } from '@/components/DealTable';
import { KpiStrip } from '@/components/KpiStrip';
import { SignalCards } from '@/components/SignalCards';
import { allDeals, chartSeries, getKpis, getSignals, uniqueInvestors, uniqueSectors } from '@/lib/data';

export default function HomePage() {
  const kpis = getKpis(allDeals);
  const signals = getSignals(allDeals);
  const charts = chartSeries(allDeals);

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Funding Signal Board</h1>
          <p className="text-sm text-slate-400">Feed The AI · real-time style board using seeded local deal data.</p>
        </div>
      </header>

      <KpiStrip {...kpis} />
      <SignalCards signals={signals} />
      <Charts {...charts} />

      <section className="grid gap-3 lg:grid-cols-2">
        <div className="card">
          <h2 className="mb-2 text-base font-semibold">Sector Drilldowns</h2>
          <div className="flex flex-wrap gap-2">
            {uniqueSectors.map((sector) => (
              <Link className="rounded border border-slate-700 px-2 py-1 text-xs hover:border-radar" key={sector} href={`/sectors/${encodeURIComponent(sector)}`}>
                {sector}
              </Link>
            ))}
          </div>
        </div>
        <div className="card">
          <h2 className="mb-2 text-base font-semibold">Investor Drilldowns</h2>
          <div className="flex flex-wrap gap-2">
            {uniqueInvestors.slice(0, 12).map((investor) => (
              <Link
                className="rounded border border-slate-700 px-2 py-1 text-xs hover:border-mint"
                key={investor}
                href={`/investors/${encodeURIComponent(investor)}`}
              >
                {investor}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold">Latest Deals</h2>
        <DealTable deals={allDeals.slice(0, 20)} />
      </section>
    </div>
  );
}
