import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { GlassCard } from './GlassCard.jsx';

export function ChartWidget({ title, eyebrow, value, data, dataKey = 'usage', color = '#8BA7A1', strokeWidth = 2, chartHeight = 'h-44' }) {
  return (
    <GlassCard className="min-h-[300px] p-6">
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          {eyebrow ? <p className="text-xs font-semibold uppercase text-sage">{eyebrow}</p> : null}
          <h2 className="mt-2 text-xl font-semibold text-graphite">{title}</h2>
        </div>
        {value ? <p className="text-2xl font-semibold text-graphite">{value}</p> : null}
      </div>
      <div className={chartHeight}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 12, right: 12, left: -26, bottom: 0 }}>
            <defs>
              <linearGradient id={`${dataKey}-fill`} x1="0" x2="0" y1="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.2} />
                <stop offset="95%" stopColor={color} stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(95,107,115,0.08)" vertical={false} />
            <XAxis dataKey="time" tick={{ fill: '#4B5563', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#4B5563', fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip
              cursor={{ stroke: 'rgba(139,167,161,0.36)' }}
              contentStyle={{
                border: '1px solid rgba(255,255,255,0.7)',
                borderRadius: 18,
                background: 'rgba(247,244,238,0.88)',
                boxShadow: '0 16px 40px rgba(31,41,55,0.12)',
              }}
            />
            <Area
              type="natural"
              dataKey={dataKey}
              stroke={color}
              strokeWidth={strokeWidth}
              fill={`url(#${dataKey}-fill)`}
              animationDuration={2000}
              animationEasing="ease"
              activeDot={{ r: 4, fill: color, stroke: '#F7F4EE', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  );
}
