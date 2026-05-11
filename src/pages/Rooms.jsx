import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { DoorOpen, Droplets, Leaf, Thermometer } from 'lucide-react';
import { DeviceCard } from '../components/DeviceCard.jsx';
import { GlassCard } from '../components/GlassCard.jsx';
import { PageTransition } from '../components/PageTransition.jsx';
import { rooms } from '../data/rooms.js';
import { useDevices } from '../hooks/useDevices.js';
import { cn } from '../utils/cn.js';

export function Rooms() {
  const [selectedRoomId, setSelectedRoomId] = useState(rooms[0].id);
  const { getRoomDevices } = useDevices();
  const selectedRoom = rooms.find((room) => room.id === selectedRoomId) ?? rooms[0];
  const devices = useMemo(() => getRoomDevices(selectedRoom.id), [getRoomDevices, selectedRoom.id]);

  return (
    <PageTransition>
      <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase text-sage">Rooms</p>
          <h1 className="mt-3 text-4xl font-semibold text-graphite md:text-5xl">Living zones</h1>
        </div>
        <p className="max-w-xl text-base leading-7 text-slateSoft">
          Each room carries its own comfort profile, lighting character, and device rhythm.
        </p>
      </div>

      <div className="mb-5 flex gap-2 overflow-x-auto pb-2">
        {rooms.map((room) => (
          <button
            key={room.id}
            type="button"
            onClick={() => setSelectedRoomId(room.id)}
            className={cn(
              'relative whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium transition duration-400',
              selectedRoomId === room.id
                ? 'text-porcelain'
                : 'text-slateSoft hover:bg-white/40',
            )}
          >
            {selectedRoomId === room.id && (
              <motion.span
                layoutId="room-tab-pill"
                className="absolute inset-0 rounded-full bg-graphite"
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              />
            )}
            <span className="relative z-10">{room.name}</span>
          </button>
        ))}
      </div>

      <section className="grid gap-5 lg:grid-cols-12">
        <GlassCard className="relative min-h-[520px] overflow-hidden p-0 lg:col-span-7" hover={false}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={selectedRoomId}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="absolute inset-0"
            >
              <img 
                src={selectedRoom.image} 
                alt={selectedRoom.name} 
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover object-center" 
              />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(28,36,46,0.06)_0%,rgba(28,36,46,0.76)_100%)]" />
          <motion.div
            key={`glow-${selectedRoomId}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.12 }}
            transition={{ duration: 3.5, ease: 'easeInOut' }}
            className="absolute inset-x-0 bottom-0 h-80 blur-[80px]"
            style={{ background: `radial-gradient(ellipse at bottom, ${selectedRoom.accent} 0%, transparent 65%)` }}
          />
          <div className="relative z-10 flex min-h-[520px] flex-col justify-between p-6 sm:p-8">
            <div className="flex justify-end">
              <span className="rounded-full bg-porcelain/20 px-4 py-2 text-sm font-medium text-porcelain backdrop-blur-xl">
                {selectedRoom.mood}
              </span>
            </div>
            <div>
              <span className="mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-porcelain/20 text-porcelain backdrop-blur-xl">
                <DoorOpen size={24} />
              </span>
              <p className="text-sm text-porcelain/68">{selectedRoom.floor}</p>
              <h2 className="mt-2 text-4xl font-semibold tracking-tight text-porcelain md:text-5xl">{selectedRoom.name}</h2>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <RoomMetric key={`temp-${selectedRoom.id}`} delay={0.05} icon={Thermometer} label="Temp" value={`${selectedRoom.environment.temperature}°`} />
                <RoomMetric key={`hum-${selectedRoom.id}`} delay={0.12} icon={Droplets} label="Humidity" value={`${selectedRoom.environment.humidity}%`} />
                <RoomMetric key={`aqi-${selectedRoom.id}`} delay={0.19} icon={Leaf} label="AQI" value={selectedRoom.environment.airQuality} />
              </div>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6 lg:col-span-5" hover={false}>
          <div className="mb-6">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-sage">Room Devices</p>
            <h2 className="mt-1.5 text-2xl font-semibold tracking-tight text-graphite">{devices.length} connected</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {devices.map((device) => (
              <DeviceCard key={device.id} device={device} compact />
            ))}
          </div>
        </GlassCard>
      </section>
    </PageTransition>
  );
}

function RoomMetric({ icon: Icon, label, value, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ backgroundColor: 'rgba(247,244,238,0.16)' }}
      className="rounded-soft border border-white/12 bg-porcelain/10 p-4 text-porcelain shadow-insetSoft backdrop-blur-xl transition-colors duration-400"
    >
      <Icon size={18} className="text-porcelain/90" />
      <p className="mt-4 text-xs font-medium text-porcelain/75">{label}</p>
      <p className="mt-1 text-xl font-semibold tracking-tight">{value}</p>
    </motion.div>
  );
}
