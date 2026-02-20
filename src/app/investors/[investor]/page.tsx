import Link from 'next/link';
import { notFound } from 'next/navigation';
import { DealTable } from '@/components/DealTable';
import { allDeals, formatMoney, uniqueInvestors } from '@/lib/data';

export default function InvestorPage({ params }: { params: { investor: string } }) {
  const investor = decodeURIComponent(params.investor);
  if (!uniqueInvestors.includes(investor)) notFound();

  const deals = allDeals.filter((d) => d.investors.includes(investor));
  const total = deals.reduce((sum, d) => sum + d.amountM, 0);

  return (
    <div className="space-y-6">
      <Link href="/" className="text-sm text-slate-400 hover:text-white">
        ← Back
      </Link>
      <header>
        <h1 className="text-2xl font-bold">{investor}</h1>
        <p className="text-sm text-slate-400">
          {deals.length} appearances · {formatMoney(total)} cumulative exposure
        </p>
      </header>
      <DealTable deals={deals} />
    </div>
  );
}
