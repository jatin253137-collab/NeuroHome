import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Activity, Circle } from 'lucide-react';
import { GlassCard } from '../components/GlassCard.jsx';
import { activityTemplates, initialActivity } from '../data/activity.js';
import { nextActivity } from '../services/realtime.js';

export function ActivityTimeline() {
  const [items, setItems] = useState(initialActivity);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setItems((current) => nextActivity(current, activityTemplates));
    }, 6800);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <GlassCard className="p-6 lg:col-span-4">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-sage">Timeline</p>
          <h2 className="mt-1.5 text-xl font-semibold tracking-tight text-graphite">Live activity</h2>
        </div>
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white/58 text-slateSoft">
          <Activity size={20} />
        </span>
      </div>
      <div className="mt-2 space-y-4">
        <AnimatePresence initial={false}>
          {items.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-[auto_1fr_auto] gap-4 rounded-soft border border-white/20 bg-white/20 p-4 shadow-sm transition-colors duration-500 hover:bg-white/30"
            >
              <Circle size={10} className="mt-1.5 fill-sage text-sage opacity-80" />
              <div>
                <p className="text-sm font-semibold tracking-tight text-graphite">{item.title}</p>
                <p className="mt-1 text-sm leading-6 text-graphite/75">{item.detail}</p>
              </div>
              <span className="mt-0.5 text-[11px] font-medium uppercase tracking-wider text-graphite/50">{item.time}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </GlassCard>
  );
}

