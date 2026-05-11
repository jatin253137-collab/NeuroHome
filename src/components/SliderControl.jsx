import { cn } from '../utils/cn.js';

export function SliderControl({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  suffix = '%',
  className,
}) {
  const progress = ((value - min) / (max - min)) * 100;

  return (
    <label className={cn('block', className)}>
      <span className="mb-3 flex items-center justify-between text-sm text-slateSoft">
        <span>{label}</span>
        <span className="rounded-full bg-white/48 px-3 py-1 font-semibold text-graphite shadow-insetSoft transition duration-300">
          {value}
          {suffix}
        </span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="smart-slider"
        style={{
          background: `linear-gradient(90deg, rgba(139,167,161,0.92) 0%, rgba(207,197,182,0.88) ${progress}%, rgba(255,255,255,0.58) ${progress}%, rgba(255,255,255,0.58) 100%)`,
        }}
      />
    </label>
  );
}
