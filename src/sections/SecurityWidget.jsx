import { Cctv, Lock, Radar, ShieldCheck } from 'lucide-react';
import { GlassCard } from '../components/GlassCard.jsx';
import { useDevices } from '../hooks/useDevices.js';

export function SecurityWidget() {
  const { devices } = useDevices();
  const lock = devices.find((device) => device.type === 'lock');
  const camera = devices.find((device) => device.type === 'camera');

  return (
    <GlassCard className="p-6 lg:col-span-4">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-sage">Security</p>
          <h2 className="mt-1.5 text-xl font-semibold tracking-tight text-graphite">
            {lock?.locked ? 'Secured' : 'Unlocked'}
          </h2>
        </div>
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-graphite text-porcelain">
          <ShieldCheck size={20} />
        </span>
      </div>
      <div className="space-y-3">
        <div className="flex items-center justify-between rounded-soft bg-white/42 p-4">
          <span className="flex items-center gap-3 text-sm font-medium text-graphite">
            <Lock size={18} className="text-sage" />
            Entry lock
          </span>
          <span className="text-sm font-medium text-slateSoft">{lock?.locked ? 'Locked' : 'Open'}</span>
        </div>
        <div className="flex items-center justify-between rounded-soft bg-white/42 p-4">
          <span className="flex items-center gap-3 text-sm font-medium text-graphite">
            <Cctv size={18} className="text-sage" />
            Cameras
          </span>
          <span className="text-sm font-medium text-slateSoft">{camera?.recording ? 'Active' : 'Idle'}</span>
        </div>
        <div className="flex items-center justify-between rounded-soft bg-white/42 p-4">
          <span className="flex items-center gap-3 text-sm font-medium text-graphite">
            <Radar size={18} className="text-sage" />
            Motion
          </span>
          <span className="text-sm font-medium text-slateSoft">{camera?.motion ? 'Detected' : 'Clear'}</span>
        </div>
      </div>
    </GlassCard>
  );
}
