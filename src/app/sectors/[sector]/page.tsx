import Link from 'next/link';
import { notFound } from 'next/navigation';
import { DealTable } from '@/components/DealTable';
import { allDeals, formatMoney, uniqueSectors } from '@/lib/data';

export default function SectorPage({ params }: { params: { sector: string } }) {
  const sector = decodeURIComponent(params.sector);
  if (!uniqueSectors.includes(sector)) notFound();

  const deals = allDeals.filter((d) => d.sector === sector);
  const total = deals.reduce((sum, d) => sum + d.amountM, 0);

  return (
    <div className="space-y-6">
      <Link href="/" className="text-sm text-slate-400 hover:text-white">
        ← Back
      </Link>
      <header>
        <h1 className="text-2xl font-bold">{sector}</h1>
        <p className="text-sm text-slate-400">
          {deals.length} rounds · {formatMoney(total)} total raised
        </p>
      </header>
      <DealTable deals={deals} />
    </div>
  );
}
