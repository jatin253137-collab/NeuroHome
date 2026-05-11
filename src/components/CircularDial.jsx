import { Minus, Plus } from 'lucide-react';
import { clamp } from '../utils/formatters.js';

export function CircularDial({ label, value, min = 16, max = 30, suffix = '°', onChange }) {
  const progress = (value - min) / (max - min);
  const radius = 68;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - progress * circumference;

  const update = (direction) => {
    onChange(clamp(value + direction, min, max));
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative grid h-44 w-44 place-items-center">
        <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 176 176">
          <circle
            cx="88"
            cy="88"
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.62)"
            strokeWidth="12"
          />
          <circle
            cx="88"
            cy="88"
            r={radius}
            fill="none"
            stroke="#8BA7A1"
            strokeLinecap="round"
            strokeWidth="12"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
        <div className="text-center">
          <p className="text-sm text-slateSoft">{label}</p>
          <p className="mt-1 text-4xl font-semibold text-graphite">
            {value}
            {suffix}
          </p>
        </div>
      </div>
      <div className="mt-2 flex items-center gap-3">
        <button
          type="button"
          aria-label={`Lower ${label}`}
          onClick={() => update(-1)}
          className="grid h-11 w-11 place-items-center rounded-full bg-white/60 text-graphite shadow-insetSoft transition hover:bg-white"
        >
          <Minus size={18} />
        </button>
        <button
          type="button"
          aria-label={`Raise ${label}`}
          onClick={() => update(1)}
          className="grid h-11 w-11 place-items-center rounded-full bg-graphite text-porcelain shadow-insetSoft transition hover:scale-[1.03]"
        >
          <Plus size={18} />
        </button>
      </div>
    </div>
  );
}
