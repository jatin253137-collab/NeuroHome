import { motion } from 'framer-motion';
import { useState } from 'react';
import { Bell, Moon, Palette, Sparkles, UserRound } from 'lucide-react';
import { GlassCard } from '../components/GlassCard.jsx';
import { PageTransition } from '../components/PageTransition.jsx';
import { ToggleSwitch } from '../components/ToggleSwitch.jsx';
import { heroImage } from '../data/rooms.js';
import { useScenes } from '../hooks/useScenes.js';
import { useTheme } from '../hooks/useTheme.js';
import { cn } from '../utils/cn.js';

export function Settings() {
  const { quietMode, reducedGlow, setQuietMode, setReducedGlow } = useTheme();
  const { activeScene } = useScenes();
  const [gentleAlerts, setGentleAlerts] = useState(true);
  const [warmPalette, setWarmPalette] = useState(true);

  return (
    <PageTransition>
      <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase text-sage">Settings</p>
          <h1 className="mt-3 text-4xl font-semibold text-graphite md:text-5xl">Personal profile</h1>
        </div>
        <p className="max-w-xl text-base leading-7 text-slateSoft">
          Preference controls for ambience, notifications, and the companion interface.
        </p>
      </div>

      <section className="grid gap-6 lg:grid-cols-12">
        <GlassCard className="relative min-h-[520px] overflow-hidden p-0 lg:col-span-4" hover={false}>
          <img
            src={heroImage}
            alt="Minimal smart-living profile environment"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-[center_20%]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(31,41,55,0.04)_0%,rgba(31,41,55,0.85)_100%)]" />
          <div className="relative z-10 flex min-h-[520px] flex-col justify-between p-7 text-porcelain">
            <div className="grid h-16 w-16 place-items-center rounded-2xl bg-porcelain/14 backdrop-blur-xl">
              <UserRound size={28} />
            </div>
            <div>
              <h2 className="text-3xl font-semibold tracking-tight">Jatin Teli</h2>
              <p className="mt-3 text-porcelain/68">Primary resident</p>
              <div className="relative mt-8 overflow-hidden rounded-soft border border-white/20 p-5 shadow-glass backdrop-blur-xl">
                <motion.div
                  className="pointer-events-none absolute inset-0 z-0 bg-porcelain/10"
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                />
                <div className="relative z-10 flex items-center gap-2">
                  <p className="text-sm text-porcelain/58">Active ambience</p>
                  <span
                    className="h-2 w-2 rounded-sm"
                    style={{ backgroundColor: activeScene.accent }}
                  />
                </div>
                <motion.p
                  key={activeScene.name}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="relative z-10 mt-2 text-xl font-semibold tracking-tight"
                >
                  {activeScene.name}
                </motion.p>
              </div>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-7 lg:col-span-8" hover={false}>
          <p className="text-xs font-semibold uppercase text-sage">Preferences</p>
          <h2 className="mt-2 text-2xl font-semibold text-graphite">Interface tuning</h2>
          <div className="mt-7 grid gap-4">
            <SettingRow
              icon={Moon}
              title="Quiet mode"
              text="Softens contrast and dims ambient surfaces."
              checked={quietMode}
              onToggle={() => setQuietMode((value) => !value)}
            />
            <SettingRow
              icon={Sparkles}
              title="Reduced glow"
              text="Keeps the futuristic atmosphere more restrained."
              checked={reducedGlow}
              onToggle={() => setReducedGlow((value) => !value)}
            />
            <SettingRow
              icon={Bell}
              title="Gentle alerts"
              text="Security and climate notifications stay low priority unless urgent."
              checked={gentleAlerts}
              onToggle={() => setGentleAlerts((v) => !v)}
            />
            <SettingRow
              icon={Palette}
              title="Warm neutral palette"
              text="Uses porcelain, sage, graphite, and cashmere accents."
              checked={warmPalette}
              onToggle={() => setWarmPalette((v) => !v)}
            />
          </div>
        </GlassCard>
      </section>
    </PageTransition>
  );
}

function SettingRow({ icon: Icon, title, text, checked, onToggle }) {
  return (
    <div
      className={cn(
        'flex flex-col items-start justify-between gap-4 rounded-soft border p-5 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:flex-row sm:items-center',
        checked
          ? 'border-transparent bg-gradient-to-r from-sage/10 to-white/60 shadow-[inset_3px_0_0_rgba(139,167,161,0.4),inset_0_2px_15px_rgba(255,255,255,0.5)]'
          : 'border-[#ffffff] bg-white/82 shadow-[0_14px_34px_rgba(15,23,42,0.045)] ring-1 ring-white/80 hover:bg-white/88'
      )}
    >
      <div className="flex items-center gap-4">
        <span
          className={cn(
            'grid h-12 w-12 place-items-center rounded-2xl transition-colors duration-500',
            checked ? 'bg-sage/10 text-sage' : 'bg-white/60 text-slateSoft'
          )}
        >
          <Icon size={20} />
        </span>
        <div>
          <h3 className="font-semibold tracking-tight text-graphite/92">{title}</h3>
          <p className="mt-1 text-sm leading-6 text-graphite/72">{text}</p>
        </div>
      </div>
      <ToggleSwitch checked={checked} label={title} onChange={onToggle} />
    </div>
  );
}
