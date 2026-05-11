import { Area, AreaChart, ResponsiveContainer, Tooltip } from 'recharts';
import { Zap } from 'lucide-react';
import { GlassCard } from '../components/GlassCard.jsx';
import { useAnalytics } from '../hooks/useAnalytics.js';
import { useEnvironment } from '../hooks/useEnvironment.js';

export function EnergyWidget() {
  const { energy, efficiency } = useAnalytics();
  const { environment } = useEnvironment();

  return (
    <GlassCard className="p-6 lg:col-span-4">
      <div className="mb-5 flex items-start justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-sage">Energy</p>
          <h2 className="mt-1.5 text-xl font-semibold tracking-tight text-graphite">{environment.energyNow} kW</h2>
        </div>
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-graphite text-porcelain">
          <Zap size={20} />
        </span>
      </div>
      <div className="h-32">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={energy} margin={{ top: 8, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="energy-dashboard" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#8BA7A1" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#8BA7A1" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <Tooltip
              contentStyle={{
                border: '1px solid rgba(255,255,255,0.7)',
                borderRadius: 16,
                background: 'rgba(247,244,238,0.9)',
              }}
            />
            <Area
              type="monotone"
              dataKey="usage"
              stroke="#8BA7A1"
              strokeWidth={3}
              fill="url(#energy-dashboard)"
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-soft bg-white/42 p-4">
          <p className="text-xs font-medium text-slateSoft">Efficiency</p>
          <p className="mt-2 text-2xl font-semibold text-graphite">{efficiency}%</p>
        </div>
        <div className="rounded-soft bg-white/42 p-4">
          <p className="text-xs font-medium text-slateSoft">Trend</p>
          <p className="mt-2 text-2xl font-semibold text-graphite">-8%</p>
        </div>
      </div>
    </GlassCard>
  );
}
