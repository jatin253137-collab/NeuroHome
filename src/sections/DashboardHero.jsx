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
      <div className="relative z-10 flex min-h-[560px] flex-col justify-between p-5 sm:p-8">
        {/* ── Top row: greeting + stat pills ── */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-xl">
            <p className="inline-flex items-center gap-2 rounded-full bg-porcelain/20 px-3 py-1.5 text-xs font-medium text-porcelain backdrop-blur-xl sm:px-4 sm:py-2 sm:text-sm">
              <Sparkles size={14} className="sm:h-4 sm:w-4" />
              {activeScene.name} scene active
            </p>
            <h1 className="mt-4 max-w-xl text-3xl font-semibold leading-tight text-porcelain [text-shadow:0_10px_26px_rgba(0,0,0,0.32)] sm:mt-6 sm:text-5xl lg:text-6xl">
              {getGreeting()}, Jatin
            </h1>
            <p className="mt-3 max-w-lg text-sm leading-6 text-porcelain/80 [text-shadow:0_7px_18px_rgba(0,0,0,0.28)] sm:mt-4 sm:text-base sm:leading-7">
              NeuroHome has balanced comfort, lighting, and security for a quiet evening at home.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:min-w-72 sm:gap-3">
            <div className="rounded-soft border border-white/20 bg-porcelain/18 p-3 text-porcelain backdrop-blur-xl sm:p-4">
              <p className="text-xs text-porcelain/64">Local time</p>
              <p className="mt-1.5 text-xl font-semibold sm:mt-2 sm:text-2xl">{time}</p>
            </div>
            <div className="rounded-soft border border-white/20 bg-porcelain/18 p-3 text-porcelain backdrop-blur-xl sm:p-4">
              <p className="text-xs text-porcelain/64">Outside</p>
              <p className="mt-1.5 flex items-center gap-1.5 text-base font-semibold sm:mt-2 sm:gap-2 sm:text-lg">
                <CloudSun size={17} className="shrink-0 sm:hidden" />
                <CloudSun size={19} className="hidden shrink-0 sm:block" />
                {environment.outsideWeather}
              </p>
            </div>
          </div>
        </div>

        {/* ── Bottom row: status pills + room cards ── */}
        <div className="mt-6 sm:mt-0">
          {/* Status pills — wrap cleanly on mobile */}
          <div className="mb-4 flex flex-wrap gap-2 sm:mb-5 sm:gap-3">
            <StatusIndicator active label={`${activeDevices} devices active`} />
            <StatusIndicator active label={`${environment.airQuality} AQI`} />
            <StatusIndicator active label={`${environment.energyNow} kW live`} />
          </div>
          {/* Room cards — 2-col on mobile, 4-col from sm */}
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
            {rooms.map((room, i) => {
              const RoomIcon = roomIcons[i] ?? roomIcons[0];
              return (
                <MotionLink
                  key={room.id}
                  to="/rooms"
                  whileHover={{ y: -2, backgroundColor: 'rgba(247,244,238,0.22)' }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="block rounded-soft border border-white/15 bg-porcelain/15 p-3 text-porcelain shadow-insetSoft backdrop-blur-xl transition-colors duration-500 sm:p-4"
                >
                  <div className="flex items-center justify-between gap-2">
                    <RoomIcon size={16} className="sm:hidden" />
                    <RoomIcon size={18} className="hidden sm:block" />
                    <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: room.accent }} />
                  </div>
                  <p className="mt-3 text-xs text-porcelain/64 sm:mt-5 sm:text-sm">{room.floor}</p>
                  <h3 className="mt-0.5 text-sm font-semibold sm:mt-1 sm:text-base">{room.name}</h3>
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
