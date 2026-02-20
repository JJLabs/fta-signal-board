import Link from 'next/link';
import { Deal } from '@/lib/types';
import { formatMoney } from '@/lib/data';

export function DealTable({ deals }: { deals: Deal[] }) {
  return (
    <div className="card overflow-auto">
      <table className="w-full min-w-[700px] text-left text-sm">
        <thead className="text-slate-400">
          <tr>
            <th className="pb-2">Date</th>
            <th className="pb-2">Company</th>
            <th className="pb-2">Sector</th>
            <th className="pb-2">Stage</th>
            <th className="pb-2">Amount</th>
            <th className="pb-2">Lead Investor</th>
          </tr>
        </thead>
        <tbody>
          {deals.map((deal) => (
            <tr key={deal.id} className="border-t border-slate-800 text-slate-200">
              <td className="py-2">{deal.date}</td>
              <td className="py-2">{deal.company}</td>
              <td className="py-2">
                <Link href={`/sectors/${encodeURIComponent(deal.sector)}`} className="text-radar hover:underline">
                  {deal.sector}
                </Link>
              </td>
              <td className="py-2">{deal.stage}</td>
              <td className="py-2">{formatMoney(deal.amountM)}</td>
              <td className="py-2">
                <Link href={`/investors/${encodeURIComponent(deal.leadInvestor)}`} className="text-mint hover:underline">
                  {deal.leadInvestor}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
