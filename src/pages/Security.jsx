import { motion } from 'framer-motion';
import { useState } from 'react';
import { Camera, Home, Lock, Radar, ShieldCheck } from 'lucide-react';
import { GlassCard } from '../components/GlassCard.jsx';
import { PageTransition } from '../components/PageTransition.jsx';
import { ToggleSwitch } from '../components/ToggleSwitch.jsx';
import { useDevices } from '../hooks/useDevices.js';
import { cn } from '../utils/cn.js';

const modes = ['Home', 'Night', 'Away'];

export function Security() {
  const [mode, setMode] = useState('Home');
  const { devices, updateDevice } = useDevices();
  const lock = devices.find((device) => device.type === 'lock');
  const camera = devices.find((device) => device.type === 'camera');

  return (
    <PageTransition>
      <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase text-sage">Security</p>
          <h1 className="mt-3 text-4xl font-semibold text-graphite md:text-5xl">Quiet protection</h1>
        </div>
        <div className="flex rounded-full border border-white/60 bg-white/42 p-1">
          {modes.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setMode(item)}
              className={cn(
                'relative rounded-full px-5 py-2.5 text-sm font-medium transition duration-200',
                mode === item ? 'text-porcelain' : 'text-slateSoft hover:bg-white/60',
              )}
            >
              {mode === item && (
                <motion.span
                  layoutId="security-mode-pill"
                  className="absolute inset-0 rounded-full bg-graphite"
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                />
              )}
              <span className="relative z-10">{item}</span>
            </button>
          ))}
        </div>
      </div>

      <section className="grid gap-5 lg:grid-cols-12">
        <GlassCard
          className="p-7 text-porcelain lg:col-span-5"
          hover={false}
          style={{ background: 'linear-gradient(155deg, rgba(38,50,64,0.88), rgba(30,40,52,0.92))' }}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-porcelain/52">Current mode</p>
              <h2 className="mt-3 text-5xl font-semibold text-porcelain">{mode}</h2>
            </div>
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-porcelain/14">
              <ShieldCheck size={24} className="text-porcelain/90" />
            </span>
          </div>
          <PerimeterScan active={mode !== 'Home' || camera?.recording} />
          <div className="mt-12 grid gap-3">
            <SecurityRow icon={Lock} label="Front lock" value={lock?.locked ? 'Secured' : 'Unlocked'} />
            <SecurityRow icon={Camera} label="Camera stream" value={camera?.recording ? 'Active' : 'Paused'} />
            <SecurityRow icon={Radar} label="Motion field" value={camera?.motion ? 'Detected' : 'Clear'} />
          </div>
        </GlassCard>

        <GlassCard className="p-7 lg:col-span-7" hover={false}>
          <p className="text-xs font-semibold uppercase text-sage">Devices</p>
          <h2 className="mt-2 text-2xl font-semibold text-graphite">Entry systems</h2>
          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            {lock ? (
              <SecurityDevice
                icon={Lock}
                title="Smart Lock"
                value={lock.locked ? 'Locked' : 'Unlocked'}
                checked={lock.locked}
                onToggle={() => updateDevice(lock.id, { locked: !lock.locked, status: true })}
              />
            ) : null}
            {camera ? (
              <SecurityDevice
                icon={Camera}
                title="Security Camera"
                value={camera.recording ? 'Recording' : 'Standby'}
                checked={camera.recording}
                onToggle={() => updateDevice(camera.id, { recording: !camera.recording, status: true })}
              />
            ) : null}
          </div>
          <div className="mt-5 rounded-soft border border-white/60 bg-white/60 p-5">
            <p className="text-sm font-semibold text-graphite">Recent scan</p>
            <p className="mt-2 text-sm leading-6 text-slateSoft">
              Perimeter clear, camera latency stable, and lock battery reported healthy.
            </p>
          </div>
        </GlassCard>
      </section>
    </PageTransition>
  );
}

function PerimeterScan({ active }) {
  return (
    <div className="mt-10 rounded-soft border border-white/5 bg-porcelain/5 p-4 backdrop-blur-xl">
      <div className="mb-4 flex items-center justify-between text-sm">
        <span className="text-porcelain/68">Perimeter scan</span>
        <span className="font-semibold text-sage">{active ? 'Live' : 'Calm'}</span>
      </div>
      <div className="relative flex h-36 items-center justify-center overflow-hidden rounded-[20px] bg-black/30">
        {/* concentric ring pulses — architectural, quiet */}
        {[1, 2, 3].map((ring) => (
          <motion.span
            key={ring}
            className="absolute rounded-full border border-sage/30"
            style={{ width: ring * 52, height: ring * 52 }}
            animate={active
              ? { opacity: [0.12, 0.38, 0.12], scale: [0.94, 1.04, 0.94] }
              : { opacity: 0.08 }
            }
            transition={{
              duration: 4.5 + ring * 1.1,
              repeat: active ? Infinity : 0,
              ease: 'easeInOut',
              delay: ring * 0.7,
            }}
          />
        ))}
        {/* soft ambient glow behind centre — very slow, barely perceptible */}
        <motion.div
          className="absolute h-20 w-20 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(168,195,188,0.18) 0%, transparent 70%)' }}
          animate={{ opacity: [0.4, 0.85, 0.4], scale: [0.9, 1.12, 0.9] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* centre home icon */}
        <div className="relative z-10 grid h-11 w-11 place-items-center rounded-xl border border-white/18 bg-porcelain/14 backdrop-blur-md">
          <Home size={18} className="text-porcelain" />
        </div>
        {/* sensor nodes */}
        {[
          { top: '22%', left: '22%' },
          { top: '22%', right: '22%' },
          { bottom: '22%', left: '22%' },
          { bottom: '22%', right: '22%' },
        ].map((pos, i) => (
          <motion.span
            key={i}
            className="absolute h-1.5 w-1.5 rounded-full bg-sage"
            style={pos}
            animate={active ? { opacity: [0.5, 1, 0.5] } : { opacity: 0.35 }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
          />
        ))}
      </div>
    </div>
  );
}

function SecurityRow({ icon: Icon, label, value }) {
  const clear = value === 'Locked' || value === 'Active' || value === 'Clear';
  return (
    <div
      className="flex items-center justify-between rounded-soft border border-white/5 bg-porcelain/5 p-4 transition-colors duration-300 hover:bg-porcelain/10"
      style={{ borderLeftColor: clear ? 'rgba(168,195,188,0.4)' : 'rgba(247,244,238,0.15)', borderLeftWidth: 2 }}
    >
      <span className="flex items-center gap-3 text-sm text-porcelain/72">
        <Icon size={16} className="text-porcelain/50" />
        {label}
      </span>
      <span className="text-sm font-medium text-porcelain/95">{value}</span>
    </div>
  );
}

function SecurityDevice({ icon: Icon, title, value, checked, onToggle }) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-cloud border border-white/90 bg-white/92 p-5 shadow-[0_16px_42px_rgba(15,23,42,0.06)] shadow-insetSoft backdrop-blur-xl transition-cinematic hover:bg-white/97 hover:border-white/95 hover:shadow-[0_20px_50px_rgba(15,23,42,0.09)]"
    >
      <div className="flex items-start justify-between gap-4">
        <span className="grid h-12 w-12 place-items-center rounded-2xl border border-white/85 bg-graphite text-porcelain shadow-[0_6px_18px_rgba(15,23,42,0.05)] shadow-insetSoft">
          <Icon size={20} />
        </span>
        <ToggleSwitch checked={checked} label={title} onChange={onToggle} />
      </div>
      <p className="mt-7 text-sm text-graphite/76">{title}</p>
      <h3 className="mt-1 text-2xl font-semibold text-graphite/92">{value}</h3>
    </motion.div>
  );
}
