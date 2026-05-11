import { CloudSun, Droplets, Leaf, Thermometer, Wind } from 'lucide-react';
import { GlassCard } from '../components/GlassCard.jsx';
import { useEnvironment } from '../hooks/useEnvironment.js';

const metrics = [
  { key: 'temperature', label: 'Temperature', suffix: '°', icon: Thermometer, max: 40 },
  { key: 'humidity', label: 'Humidity', suffix: '%', icon: Droplets, max: 100 },
  { key: 'airQuality', label: 'Air Quality', suffix: '', icon: Leaf, max: 100 },
  { key: 'wind', label: 'Wind', suffix: ' km/h', icon: Wind, max: 30 },
];

export function EnvironmentWidget() {
  const { environment } = useEnvironment();

  return (
    <GlassCard className="p-6 lg:col-span-4">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-sage">Environment</p>
          <h2 className="mt-1.5 text-xl font-semibold tracking-tight text-graphite">Home climate</h2>
        </div>
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white/58 text-slateSoft">
          <CloudSun size={20} />
        </span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {metrics.map(({ key, label, suffix, icon: Icon, max }) => {
          const raw = key === 'temperature' ? environment[key] : environment[key];
          const pct = Math.min(100, Math.round((raw / max) * 100));
          return (
            <div key={key} className="rounded-soft bg-white/42 p-4">
              <Icon size={18} className="text-sage" />
              <p className="mt-5 text-xs font-medium text-slateSoft">{label}</p>
              <p className="mt-1 text-2xl font-semibold text-graphite">
                {key === 'temperature' ? environment[key].toFixed(1) : environment[key]}
                {suffix}
              </p>
              <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/60">
                <div
                  className="h-full rounded-full bg-sage/60 transition-all duration-700"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
}

