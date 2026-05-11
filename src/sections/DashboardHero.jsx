import { motion } from 'framer-motion';
import { BedDouble, CloudSun, Monitor, Sofa, Sparkles, Thermometer, UtensilsCrossed, Waves } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { GlassCard } from '../components/GlassCard.jsx';
import { StatusIndicator } from '../components/StatusIndicator.jsx';
import { heroImage, rooms } from '../data/rooms.js';
import { useDevices } from '../hooks/useDevices.js';
import { useEnvironment } from '../hooks/useEnvironment.js';
import { useScenes } from '../hooks/useScenes.js';
import { getGreeting, getReadableTime } from '../utils/formatters.js';

const roomIcons = [Sofa, BedDouble, Monitor, UtensilsCrossed];
const MotionLink = motion.create ? motion.create(Link) : motion(Link);

export function DashboardHero() {
  const { environment } = useEnvironment();
  const { activeDevices } = useDevices();
  const { activeScene } = useScenes();
  const [time, setTime] = useState(getReadableTime());

  useEffect(() => {
    const timer = window.setInterval(() => setTime(getReadableTime()), 1000 * 30);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <GlassCard className="relative min-h-[560px] overflow-hidden p-0 lg:col-span-8 lg:row-span-2" hover={false}>
      <img
        src={heroImage}
        alt="Ambient interior living space"
        decoding="async"
        fetchpriority="high"
        className="absolute inset-0 h-full w-full object-cover object-[center_30%]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(28,36,46,0.18)_0%,rgba(28,36,46,0.22)_36%,rgba(28,36,46,0.78)_100%)]" />
      <div className="pointer-events-none absolute left-0 top-0 h-[58%] w-[62%] bg-[radial-gradient(80%_74%_at_22%_26%,rgba(28,36,46,0.38)_0%,rgba(28,36,46,0.18)_46%,transparent_100%)]" />
      <motion.div
        className="absolute inset-x-6 top-6 h-24 rounded-full blur-[80px]"
        animate={{ opacity: [0.15, 0.28, 0.15] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        style={{ background: activeScene.glow }}
      />
      <motion.div
        className="absolute inset-x-16 bottom-0 h-28 rounded-full blur-[100px]"
        animate={{ opacity: [0.1, 0.22, 0.1] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 2.5 }}
        style={{ background: activeScene.glow }}
      />
      <div className="relative z-10 flex min-h-[560px] flex-col justify-between p-6 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-xl">
            <p className="inline-flex items-center gap-2 rounded-full bg-porcelain/20 px-4 py-2 text-sm font-medium text-porcelain backdrop-blur-xl">
              <Sparkles size={16} />
              {activeScene.name} scene active
            </p>
            <h1 className="mt-6 max-w-xl text-4xl font-semibold leading-tight text-porcelain [text-shadow:0_10px_26px_rgba(0,0,0,0.32)] sm:text-5xl lg:text-6xl">
              {getGreeting()}, Jatin
            </h1>
            <p className="mt-4 max-w-lg text-base leading-7 text-porcelain/80 [text-shadow:0_7px_18px_rgba(0,0,0,0.28)]">
              NeuroHome has balanced comfort, lighting, and security for a quiet evening at home.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:min-w-72">
            <div className="rounded-soft border border-white/20 bg-porcelain/18 p-4 text-porcelain backdrop-blur-xl">
              <p className="text-xs text-porcelain/64">Local time</p>
              <p className="mt-2 text-2xl font-semibold">{time}</p>
            </div>
            <div className="rounded-soft border border-white/20 bg-porcelain/18 p-4 text-porcelain backdrop-blur-xl">
              <p className="text-xs text-porcelain/64">Outside</p>
              <p className="mt-2 flex items-center gap-2 text-lg font-semibold">
                <CloudSun size={19} />
                {environment.outsideWeather}
              </p>
            </div>
          </div>
        </div>

        <div>
          <div className="mb-5 flex flex-wrap gap-3">
            <StatusIndicator active label={`${activeDevices} devices active`} />
            <StatusIndicator active label={`${environment.airQuality} AQI`} />
            <StatusIndicator active label={`${environment.energyNow} kW live`} />
          </div>
          <div className="grid gap-3 sm:grid-cols-4">
            {rooms.map((room, i) => {
              const RoomIcon = roomIcons[i] ?? roomIcons[0];
              return (
                <MotionLink
                  key={room.id}
                  to="/rooms"
                  whileHover={{ y: -2, backgroundColor: 'rgba(247,244,238,0.22)' }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="block rounded-soft border border-white/15 bg-porcelain/15 p-4 text-porcelain shadow-insetSoft backdrop-blur-xl transition-colors duration-500"
                >
                  <div className="flex items-center justify-between gap-3">
                    <RoomIcon size={18} />
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: room.accent }} />
                  </div>
                  <p className="mt-5 text-sm text-porcelain/64">{room.floor}</p>
                  <h3 className="mt-1 font-semibold">{room.name}</h3>
                </MotionLink>
              );
            })}
          </div>
        </div>
      </div>
      <div className="absolute bottom-6 right-6 hidden rounded-soft border border-white/20 bg-porcelain/18 p-4 text-porcelain backdrop-blur-xl lg:block">
        <div className="flex items-center gap-4">
          <Thermometer size={20} />
          <span className="font-semibold">{environment.temperature.toFixed(1)}&deg;</span>
          <span className="h-5 w-px bg-white/20" />
          <Waves size={20} />
          <span className="font-semibold">{environment.humidity}%</span>
        </div>
      </div>
    </GlassCard>
  );
}
