import { cn } from '../utils/cn.js';

export function StatusIndicator({ active, label }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-porcelain/28 px-3 py-1.5 text-xs font-medium text-porcelain/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] backdrop-blur-md">
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
