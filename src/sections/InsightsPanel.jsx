import { motion } from 'framer-motion';
import { Brain, Leaf, ShieldCheck, Sparkle } from 'lucide-react';
import { GlassCard } from '../components/GlassCard.jsx';
import { useEnvironment } from '../hooks/useEnvironment.js';

export function InsightsPanel() {
  const { environment } = useEnvironment();

  const insights = [
    {
      icon: Leaf,
      title: 'Climate comfort',
      text: `${environment.temperature.toFixed(1)}° with ${environment.humidity}% humidity is inside the preferred range.`,
    },
    {
      icon: ShieldCheck,
      title: 'Security posture',
      text: 'Entry systems are armed with no unusual motion patterns.',
    },
    {
      icon: Sparkle,
      title: 'Scene learning',
      text: 'Evening light is trending warmer based on recent manual adjustments.',
    },
  ];

  return (
    <GlassCard className="p-6 lg:col-span-4">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-sage">Insights</p>
          <h2 className="mt-1.5 text-xl font-semibold tracking-tight text-graphite">Neural suggestions</h2>
        </div>
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-graphite text-porcelain">
          <Brain size={20} />
        </span>
      </div>
      <div className="space-y-4 mt-2">
        {insights.map(({ icon: Icon, title, text }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-soft border border-white/20 bg-white/20 p-4 shadow-glass transition-colors duration-500 hover:bg-white/40"
          >
            <div className="mb-3 flex items-center gap-3">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-sage/15">
                <Icon size={14} className="text-sage" />
              </span>
              <h3 className="text-sm font-semibold tracking-tight text-graphite">{title}</h3>
            </div>
            <p className="text-sm leading-6 text-slateSoft">{text}</p>
          </motion.div>
        ))}
      </div>
    </GlassCard>
  );
}
