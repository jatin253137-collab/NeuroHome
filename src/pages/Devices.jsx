import { useMemo, useState } from 'react';
import { DeviceCard } from '../components/DeviceCard.jsx';
import { PageTransition } from '../components/PageTransition.jsx';
import { useDevices } from '../hooks/useDevices.js';
import { cn } from '../utils/cn.js';

const filters = ['All', 'Living', 'Climate', 'Security', 'Utility'];

export function Devices() {
  const [filter, setFilter] = useState('All');
  const { devices } = useDevices();

  const filteredDevices = useMemo(
    () => (filter === 'All' ? devices : devices.filter((device) => device.category === filter)),
    [devices, filter],
  );

  return (
    <PageTransition>
      <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase text-sage">Devices</p>
          <h1 className="mt-3 text-4xl font-semibold text-graphite md:text-5xl">Control surface</h1>
        </div>
        <p className="max-w-xl text-base leading-7 text-slateSoft">
          Fast access to lighting, climate, security, media, and utility devices.
        </p>
      </div>

      <div className="mb-6 flex gap-3 overflow-x-auto pb-2">
        {filters.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setFilter(item)}
            className={cn(
              'rounded-full border px-5 py-3 text-sm font-medium transition duration-200',
              filter === item
                ? 'border-graphite bg-graphite text-porcelain'
                : 'border-white/60 bg-white/42 text-slateSoft hover:bg-white/70',
            )}
          >
            {item}
          </button>
        ))}
      </div>

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {filteredDevices.map((device) => (
          <DeviceCard key={device.id} device={device} />
        ))}
      </section>
    </PageTransition>
  );
}
