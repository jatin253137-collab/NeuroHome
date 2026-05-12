import { motion } from 'framer-motion';
import { cn } from '../utils/cn.js';

export function ToggleSwitch({ checked, onChange, label }) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={checked}
      onClick={onChange}
      className={cn(
        'relative h-8 w-14 overflow-hidden rounded-full border p-1 transition-cinematic',
        checked
          ? 'border-sage/30 bg-sage/60 shadow-[0_6px_18px_rgba(139,167,161,0.2)]'
          : 'border-stonewash/70 bg-stonewash/40 hover:bg-stonewash/55 hover:border-stonewash/80',
      )}
    >
      {checked ? (
        <motion.span
          className="absolute inset-0 rounded-full bg-white/20"
          animate={{ opacity: [0.12, 0.24, 0.12] }}
          transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      ) : null}
      <motion.span
        layout
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'block h-6 w-6 rounded-full bg-porcelain shadow-[0_2px_8px_rgba(31,41,55,0.18),0_0_1px_rgba(31,41,55,0.1)]',
          checked ? 'ml-6' : 'ml-0',
        )}
      />
    </button>
  );
}
