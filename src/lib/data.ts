import deals from '../../data/deals.json';
import { Deal, Signal } from './types';

const DAY_MS = 24 * 60 * 60 * 1000;

export const allDeals = (deals as Deal[]).slice().sort((a, b) => (a.date < b.date ? 1 : -1));

const toTime = (isoDate: string) => new Date(`${isoDate}T00:00:00Z`).getTime();

export const filterByDays = (rows: Deal[], days: number, now = Date.now()) =>
  rows.filter((deal) => now - toTime(deal.date) <= days * DAY_MS);

export function formatMoney(m: number) {
  return m >= 1000 ? `$${(m / 1000).toFixed(1)}B` : `$${m.toFixed(1)}M`;
}

export function getKpis(rows: Deal[]) {
  const recent = filterByDays(rows, 7);
  const total = recent.reduce((sum, d) => sum + d.amountM, 0);
  const sorted = recent.map((d) => d.amountM).sort((a, b) => a - b);
  const median = sorted.length ? sorted[Math.floor(sorted.length / 2)] : 0;

  const sectorTotals = new Map<string, number>();
  recent.forEach((d) => {
    sectorTotals.set(d.sector, (sectorTotals.get(d.sector) ?? 0) + d.amountM);
  });

  const mostActiveSector = [...sectorTotals.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? 'N/A';

  return {
    total7d: total,
    rounds7d: recent.length,
    medianRound7d: median,
    mostActiveSector
  };
}

export function getSignals(rows: Deal[]): Signal[] {
  const now = Date.now();
  const last7 = filterByDays(rows, 7, now);
  const last14 = filterByDays(rows, 14, now);
  const last30 = filterByDays(rows, 30, now);
  const prev30 = rows.filter((deal) => {
    const age = now - toTime(deal.date);
    return age > 30 * DAY_MS && age <= 60 * DAY_MS;
  });
  const last90 = filterByDays(rows, 90, now);

  const signals: Signal[] = [];

  const sector7 = new Map<string, number>();
  const sector90 = new Map<string, number>();

  last7.forEach((d) => sector7.set(d.sector, (sector7.get(d.sector) ?? 0) + d.amountM));
  last90.forEach((d) => sector90.set(d.sector, (sector90.get(d.sector) ?? 0) + d.amountM));

  for (const [sector, total7] of sector7.entries()) {
    const weeklyAvg90 = (sector90.get(sector) ?? 0) / (90 / 7);
    if (weeklyAvg90 > 0 && total7 > 2 * weeklyAvg90) {
      signals.push({
        kind: 'spike',
        title: `${sector} funding spike`,
        detail: `7D funding reached ${formatMoney(total7)} vs 90D weekly avg ${formatMoney(weeklyAvg90)}.`,
        href: `/sectors/${encodeURIComponent(sector)}`
      });
    }
  }

  const investorCount = new Map<string, number>();
  last14.forEach((d) => {
    d.investors.forEach((inv) => investorCount.set(inv, (investorCount.get(inv) ?? 0) + 1));
  });

  for (const [investor, count] of investorCount.entries()) {
    if (count >= 3) {
      signals.push({
        kind: 'repeat-investor',
        title: `${investor} is repeatedly active`,
        detail: `${investor} appeared in ${count} rounds in the last 14 days.`,
        href: `/investors/${encodeURIComponent(investor)}`
      });
    }
  }

  rows.forEach((d) => {
    if (d.amountM >= 100 && now - toTime(d.date) <= 14 * DAY_MS) {
      signals.push({
        kind: 'mega-round',
        title: `Mega round: ${d.company}`,
        detail: `${d.company} raised ${formatMoney(d.amountM)} (${d.stage}) led by ${d.leadInvestor}.`,
        href: `/sectors/${encodeURIComponent(d.sector)}`
      });
    }
  });

  const stageShare = (items: Deal[]) => {
    const m = new Map<string, number>();
    items.forEach((d) => m.set(d.stage, (m.get(d.stage) ?? 0) + 1));
    return m;
  };

  const currentStage = stageShare(last30);
  const previousStage = stageShare(prev30);

  for (const [stage, count] of currentStage.entries()) {
    const prev = previousStage.get(stage) ?? 0;
    if (count >= 3 && prev > 0 && count >= prev * 1.8) {
      signals.push({
        kind: 'stage-shift',
        title: `${stage} momentum shift`,
        detail: `${stage} deal count is ${count} in the last 30D vs ${prev} in the prior 30D.`
      });
    }
  }

  return signals.slice(0, 8);
}

export function chartSeries(rows: Deal[]) {
  const byWeek = new Map<string, number>();
  rows.forEach((d) => {
    const dt = new Date(`${d.date}T00:00:00Z`);
    const weekStart = new Date(dt.getTime() - dt.getUTCDay() * DAY_MS).toISOString().slice(0, 10);
    byWeek.set(weekStart, (byWeek.get(weekStart) ?? 0) + d.amountM);
  });

  const fundingOverTime = [...byWeek.entries()]
    .sort((a, b) => (a[0] > b[0] ? 1 : -1))
    .map(([week, amount]) => ({ label: week.slice(5), value: amount }));

  const bySector = new Map<string, number>();
  rows.forEach((d) => bySector.set(d.sector, (bySector.get(d.sector) ?? 0) + d.amountM));

  const sectorMix = [...bySector.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([label, value]) => ({ label, value }));

  const byStage = new Map<string, number>();
  rows.forEach((d) => byStage.set(d.stage, (byStage.get(d.stage) ?? 0) + 1));

  const stageMix = [...byStage.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([label, value]) => ({ label, value }));

  return { fundingOverTime, sectorMix, stageMix };
}

export const uniqueSectors = [...new Set(allDeals.map((d) => d.sector))].sort();
export const uniqueInvestors = [...new Set(allDeals.flatMap((d) => d.investors))].sort();
