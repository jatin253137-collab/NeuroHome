import { GlassCard } from './GlassCard.jsx';

export function FloatingPanel({ title, eyebrow, children, action }) {
  return (
    <GlassCard className="p-6">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          {eyebrow ? <p className="text-xs font-semibold uppercase text-sage">{eyebrow}</p> : null}
          <h2 className="mt-2 text-xl font-semibold text-graphite">{title}</h2>
        </div>
        {action}
      </div>
      {children}
    </GlassCard>
  );
}
