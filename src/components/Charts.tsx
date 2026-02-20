type Point = { label: string; value: number };

function MiniLineChart({ data, title }: { data: Point[]; title: string }) {
  const width = 420;
  const height = 160;
  const max = Math.max(...data.map((d) => d.value), 1);
  const points = data
    .map((d, i) => {
      const x = (i / Math.max(data.length - 1, 1)) * (width - 20) + 10;
      const y = height - (d.value / max) * (height - 20) - 10;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div className="card">
      <h3 className="mb-2 text-sm font-semibold text-slate-200">{title}</h3>
      <svg viewBox={`0 0 ${width} ${height}`} className="h-40 w-full">
        <polyline fill="none" stroke="#38bdf8" strokeWidth="3" points={points} />
      </svg>
      <div className="mt-2 flex justify-between gap-2 overflow-hidden text-xs text-slate-400">
        <span>{data[0]?.label}</span>
        <span>{data[data.length - 1]?.label}</span>
      </div>
    </div>
  );
}

function HorizontalBars({ data, title, money = false }: { data: Point[]; title: string; money?: boolean }) {
  const max = Math.max(...data.map((d) => d.value), 1);

  return (
    <div className="card">
      <h3 className="mb-3 text-sm font-semibold text-slate-200">{title}</h3>
      <div className="space-y-2">
        {data.slice(0, 6).map((item) => (
          <div key={item.label}>
            <div className="mb-1 flex justify-between text-xs text-slate-300">
              <span>{item.label}</span>
              <span>{money ? `$${item.value.toFixed(1)}M` : item.value}</span>
            </div>
            <div className="h-2 rounded bg-slate-800">
              <div className="h-2 rounded bg-radar" style={{ width: `${(item.value / max) * 100}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Charts({
  fundingOverTime,
  sectorMix,
  stageMix
}: {
  fundingOverTime: Point[];
  sectorMix: Point[];
  stageMix: Point[];
}) {
  return (
    <section>
      <h2 className="mb-3 text-lg font-semibold">Market Radar</h2>
      <div className="grid gap-3 lg:grid-cols-3">
        <MiniLineChart data={fundingOverTime} title="Funding over time" />
        <HorizontalBars data={sectorMix} title="Sector mix" money />
        <HorizontalBars data={stageMix} title="Stage mix" />
      </div>
    </section>
  );
}
