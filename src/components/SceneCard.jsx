import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '../utils/cn.js';

export function SceneCard({ scene, active, onSelect }) {
  return (
    <motion.button
      type="button"
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
      style={!active ? { borderTopColor: `${scene.accent}55` } : undefined}
      className={cn(
        'min-h-32 rounded-soft border p-5 text-left transition duration-300',
        active
          ? 'border-graphite/10 bg-graphite text-porcelain shadow-lift'
          : 'border-white/60 bg-white/42 text-graphite hover:bg-white/62',
      )}
    >
      <span
        className="mb-5 block h-2 w-12 rounded-full"
        style={{ backgroundColor: scene.accent }}
      />
      <span className="flex items-center justify-between gap-3">
        <span className="text-base font-semibold">{scene.name}</span>
        {active ? <Check size={18} /> : null}
      </span>
      <span className={cn('mt-2 block text-sm', active ? 'text-porcelain/70' : 'text-slateSoft')}>
        {scene.tone}
      </span>
    </motion.button>
  );
}

