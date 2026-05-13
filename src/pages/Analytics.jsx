import { motion } from 'framer-motion';
import { Activity, ArrowDownRight, ArrowUpRight, Gauge, Leaf, Zap } from 'lucide-react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { ChartWidget } from '../components/ChartWidget.jsx';
import { GlassCard } from '../components/GlassCard.jsx';
import { PageTransition } from '../components/PageTransition.jsx';
import { useAnalytics } from '../hooks/useAnalytics.js';
import { useEnvironment } from '../hooks/useEnvironment.js';

const colors = ['#8BA7A1', '#A8C3BC', '#CFC5B6', '#5F6B73', '#D9D6D1'];

export function Analytics() {
  const analytics = useAnalytics();
  const { environment } = useEnvironment();
  const currentUsage = analytics.energy[analytics.energy.length - 1]?.usage ?? 0;
  const previousUsage = analytics.energy[analytics.energy.length - 2]?.usage ?? currentUsage;
  const energyTrend = Number((currentUsage - previousUsage).toFixed(1));

  return (
    <PageTransition>
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase text-sage">Analytics</p>
          <h1 className="mt-3 text-4xl font-semibold text-graphite md:text-5xl">Home intelligence</h1>
        </div>
        <p className="max-w-xl text-base leading-7 text-slateSoft">
          Soft realtime projections for comfort, energy, and active device patterns.
        </p>
      </div>

      <section className="grid gap-6 lg:grid-cols-12 lg:gap-7">
        <div className="grid gap-4 sm:grid-cols-3 lg:col-span-12">
          <LiveMetric
            index={0}
            icon={Zap}
            label="Live draw"
            value={`${currentUsage.toFixed(1)} kW`}
            trend={energyTrend <= 0 ? 'Softening' : 'Rising'}
            good={energyTrend <= 0}
          />
          <LiveMetric
            index={1}
            icon={Leaf}
            label="Air quality"
            value={`${environment.airQuality} AQI`}
            trend="Stable"
            good
          />
          <LiveMetric
            index={2}
            icon={Gauge}
            label="Efficiency"
            value={`${analytics.efficiency}%`}
            trend="Optimized"
            good
          />
        </div>
        <div className="lg:col-span-7">
          <ChartWidget
            title="Energy usage"
            eyebrow="Today"
            value={`${analytics.monthlyProjection} kWh`}
            data={analytics.energy}
            chartHeight="h-52"
          />
        </div>
        <GlassCard className="p-7 lg:col-span-5">
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase text-sage">Distribution</p>
            <h2 className="mt-2 text-xl font-semibold text-graphite">Device energy share</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-[1fr_auto] lg:grid-cols-1 xl:grid-cols-[1fr_auto]">
            <div className="h-56" onPointerDownCapture={(e) => e.stopPropagation()}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={analytics.deviceShare}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={72}
                    outerRadius={90}
                    paddingAngle={2}
                    isAnimationActive={true}
                    animationDuration={2000}
                    animationEasing="ease"
                  >
                    {analytics.deviceShare.map((entry, index) => (
                      <Cell key={entry.name} fill={colors[index % colors.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      border: '1px solid rgba(255,255,255,0.7)',
                      borderRadius: 16,
                      background: 'rgba(247,244,238,0.9)',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2">
              {analytics.deviceShare.map((item, index) => (
                <div key={item.name} className="flex min-w-44 items-center justify-between gap-4 rounded-soft bg-white/42 px-3.5 py-2.5">
                  <span className="flex items-center gap-3 text-sm text-slateSoft">
                    <span className="h-3 w-3 rounded-full" style={{ backgroundColor: colors[index] }} />
                    {item.name}
                  </span>
                  <span className="font-semibold text-graphite">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>
        <div className="lg:col-span-6">
          <ChartWidget
            title="Climate stability"
            eyebrow="Comfort"
            value={`${analytics.efficiency}%`}
            data={analytics.climate}
            dataKey="temperature"
            color="#5F6B73"
            strokeWidth={2.5}
          />
        </div>
        <GlassCard className="p-7 lg:col-span-6">
          <p className="text-xs font-semibold uppercase text-sage">Summary</p>
          <h2 className="mt-2 text-xl font-semibold text-graphite">Efficiency notes</h2>
          <p className="mt-1.5 text-sm leading-6 text-slateSoft">
            The environment is operating within an optimized thermal window, maintaining balance across all active zones.
          </p>
          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            <AnalyticsStat index={0} label="Projected bill" value="-12%" trend="Lower than usual" />
            <AnalyticsStat index={1} label="Comfort score" value="94" trend="Balanced" />
            <AnalyticsStat index={2} label="Peak load" value="4.8kW" trend="18:40 window" />
          </div>
        </GlassCard>
      </section>
    </PageTransition>
  );
}

function LiveMetric({ index = 0, icon: Icon, label, value, trend, good }) {
  const TrendIcon = good ? ArrowDownRight : ArrowUpRight;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.55, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="flex h-full flex-col justify-between rounded-cloud border border-white/85 bg-white/88 p-5 shadow-[0_14px_40px_rgba(15,23,42,0.055)] shadow-insetSoft backdrop-blur-xl transition-cinematic hover:bg-white/95 hover:border-white/90 hover:shadow-[0_18px_48px_rgba(15,23,42,0.08)]"
    >
      <div className="flex items-start justify-between gap-4">
        <span className="grid h-11 w-11 place-items-center rounded-2xl border border-white/70 bg-white/92 text-slateSoft shadow-insetSoft">
          <Icon size={19} />
        </span>
        <span className="inline-flex items-center gap-1 rounded-full border border-white/60 bg-white/80 px-3 py-1 text-xs font-semibold text-slateSoft">
          <TrendIcon size={14} className={good ? 'text-sage' : 'text-slateSoft'} />
          {trend}
        </span>
      </div>
      <div className="mt-6">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-graphite/80">{label}</p>
        <p className="mt-1 text-3xl font-semibold tracking-tight text-graphite/88">{value}</p>
      </div>
    </motion.div>
  );
}

function AnalyticsStat({ index = 0, label, value, trend }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: index * 0.12 + 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-soft bg-white/60 p-5"
    >
      <p className="text-[11px] font-semibold uppercase tracking-wider text-graphite/72">{label}</p>
      <p className="mt-2 text-3xl font-semibold text-graphite">{value}</p>
      <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/60 px-3 py-1 text-xs font-semibold text-slateSoft">
        <Activity size={13} className="text-sage" />
        {trend}
      </p>
    </motion.div>
  );
}
