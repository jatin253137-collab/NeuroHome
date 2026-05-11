import { cn } from '../utils/cn.js';

export function StatusIndicator({ active, label }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-white/50 px-3 py-1.5 text-xs font-medium text-slateSoft">
      <span
        className={cn(
          'h-2 w-2 rounded-full',
          active ? 'bg-sage shadow-[0_0_14px_rgba(139,167,161,0.75)]' : 'bg-stonewash',
        )}
      />
      {label}
    </span>
  );
}
