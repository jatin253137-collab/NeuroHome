import { DeviceCard } from '../components/DeviceCard.jsx';
import { GlassCard } from '../components/GlassCard.jsx';
import { useDevices } from '../hooks/useDevices.js';

export function DeviceGrid() {
  const { devices } = useDevices();

  return (
    <GlassCard className="p-6 lg:col-span-8" hover={false}>
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-sage">Devices</p>
          <h2 className="mt-1.5 text-2xl font-semibold tracking-tight text-graphite">Living controls</h2>
        </div>
        <p className="text-sm text-slateSoft">{devices.filter((device) => device.status).length} active now</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {devices.slice(0, 8).map((device) => (
          <DeviceCard key={device.id} device={device} compact />
        ))}
      </div>
    </GlassCard>
  );
}
