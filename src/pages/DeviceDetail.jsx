import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Battery,
  Blinds,
  Camera,
  Fan,
  Gauge,
  Lamp,
  Lock,
  Power,
  Radio,
  Shield,
  SlidersHorizontal,
  Sparkles,
  Tv,
  Volume2,
  Wifi,
  Wind,
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { CircularDial } from '../components/CircularDial.jsx';
import { GlassCard } from '../components/GlassCard.jsx';
import { PageTransition } from '../components/PageTransition.jsx';
import { SliderControl } from '../components/SliderControl.jsx';
import { ToggleSwitch } from '../components/ToggleSwitch.jsx';
import { heroImage, rooms } from '../data/rooms.js';
import { useDevices } from '../hooks/useDevices.js';
import { cn } from '../utils/cn.js';

const glowByType = {
  light: 'rgba(207, 197, 182, 0.72)',
  media: 'rgba(95, 107, 115, 0.58)',
  speaker: 'rgba(139, 167, 161, 0.62)',
  cover: 'rgba(247, 244, 238, 0.58)',
  climate: 'rgba(168, 195, 188, 0.64)',
  lock: 'rgba(139, 167, 161, 0.56)',
  camera: 'rgba(139, 167, 161, 0.56)',
  network: 'rgba(168, 195, 188, 0.58)',
  utility: 'rgba(207, 197, 182, 0.58)',
};

const deviceIcons = {
  light: Lamp,
  media: Tv,
  speaker: Volume2,
  cover: Blinds,
  climate: Wind,
  lock: Lock,
  camera: Camera,
  network: Wifi,
  utility: Battery,
};

export function DeviceDetail() {
  const { deviceId } = useParams();
  const { getDevice, toggleDevice, updateDevice } = useDevices();
  const device = getDevice(deviceId);

  if (!device) {
    return (
      <PageTransition>
        <GlassCard className="p-8">
          <h1 className="text-3xl font-semibold text-graphite">Device not found</h1>
          <Link to="/devices" className="mt-6 inline-flex rounded-full bg-graphite px-5 py-3 text-sm font-medium text-porcelain">
            Back to devices
          </Link>
        </GlassCard>
      </PageTransition>
    );
  }

  const room = rooms.find((item) => item.id === device.roomId);
  const glow = glowByType[device.type] ?? glowByType.utility;
  const Icon = deviceIcons[device.type] ?? Power;
  const intensity = getDeviceIntensity(device);

  return (
    <PageTransition>
      <div className="mb-7 flex items-center justify-between gap-4">
        <Link
          to="/devices"
          className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/52 text-graphite shadow-insetSoft transition duration-300 hover:-translate-y-0.5 hover:bg-white/78"
        >
          <ArrowLeft size={20} />
        </Link>
        <ToggleSwitch
          checked={device.status}
          label={`Toggle ${device.name}`}
          onChange={() => toggleDevice(device.id)}
        />
      </div>

      <section className="grid gap-5 lg:grid-cols-12">
        <GlassCard className="relative min-h-[520px] overflow-hidden bg-graphite p-0 text-porcelain lg:col-span-5" hover={false}>
          <img
            src={room?.image ?? heroImage}
            alt={`${device.room} smart living environment`}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(31,41,55,0.2)_0%,rgba(31,41,55,0.55)_55%,rgba(31,41,55,0.84)_100%)]" />
          <motion.div
            className="absolute -right-20 top-12 h-72 w-72 rounded-full blur-3xl"
            animate={{ opacity: device.status ? [0.28, 0.46, 0.28] : 0.12, scale: device.status ? [1, 1.06, 1] : 1 }}
            transition={{ duration: 5.8, repeat: device.status ? Infinity : 0, ease: 'easeInOut' }}
            style={{ background: glow }}
          />

          <div className="relative z-10 flex min-h-[520px] flex-col justify-between p-7">
            <div>
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-porcelain/62">{device.room}</p>
                  <h1 className="mt-3 text-4xl font-semibold leading-tight md:text-5xl">{device.name}</h1>
                </div>
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-white/10 bg-porcelain/12 backdrop-blur-xl">
                  <Icon size={24} />
                </span>
              </div>
              <p className="max-w-md text-base leading-7 text-porcelain/72">
                {getDeviceDescription(device)}
              </p>
            </div>

            <DeviceAmbientPreview device={device} intensity={intensity} glow={glow} />

            <div className="grid grid-cols-2 gap-3">
              <DetailStat label="Status" value={device.status ? 'Active' : 'Idle'} />
              <DetailStat label="Signal" value={getSignalLabel(device)} />
              <DetailStat label="Room" value={device.room} />
              <DetailStat label="Type" value={device.category} />
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-7 lg:col-span-7" hover={false}>
          <div className="mb-7 flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase text-sage">Controls</p>
              <h2 className="mt-2 text-2xl font-semibold text-graphite">Fine tuning</h2>
            </div>
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/54 text-slateSoft shadow-insetSoft">
              <SlidersHorizontal size={21} />
            </span>
          </div>
          <ControlMeter device={device} intensity={intensity} />
          <DeviceControls device={device} updateDevice={updateDevice} />
        </GlassCard>
      </section>
    </PageTransition>
  );
}

function getDeviceIntensity(device) {
  if (!device.status && !device.locked && !device.recording) return 18;
  if (device.type === 'light') return device.brightness ?? 70;
  if (device.type === 'cover') return device.position ?? 50;
  if (device.type === 'climate') return device.temperature ? (device.temperature - 16) * 7 : (device.fanSpeed ?? 1) * 24;
  if (device.type === 'media' || device.type === 'speaker') return device.volume ?? 36;
  if (device.type === 'lock') return device.locked ? 92 : 38;
  if (device.type === 'camera') return device.recording ? 86 : 30;
  if (device.type === 'network') return device.signal ?? 80;
  if (device.type === 'utility') return device.battery ?? 64;
  return 62;
}

function getSignalLabel(device) {
  if (device.type === 'lock') return device.locked ? 'Secured' : 'Open';
  if (device.type === 'camera') return device.recording ? 'Live' : 'Standby';
  if (device.type === 'network') return `${device.signal}%`;
  if ('battery' in device) return `${device.battery}%`;
  return `${device.power ?? 0} W`;
}

function getDeviceDescription(device) {
  if (device.type === 'light') return 'Light tone and brightness are tuned into the active room ambience.';
  if (device.type === 'cover') return 'Natural light is shaped softly through the room brightness model.';
  if (device.type === 'media') return 'Display, volume, and scene glow are balanced for cinematic comfort.';
  if (device.type === 'speaker') return 'Ambient playback follows the room scene without breaking the quiet mood.';
  if (device.type === 'climate') return 'Climate flow adapts gently around comfort, air quality, and energy draw.';
  if (device.type === 'lock' || device.type === 'camera') return 'Security state remains visible, calm, and ready without visual noise.';
  return 'Connected utility state is monitored as part of the wider home intelligence layer.';
}

function DetailStat({ label, value }) {
  return (
    <div className="rounded-soft border border-white/10 bg-porcelain/10 p-4 backdrop-blur-xl">
      <p className="text-xs text-porcelain/54">{label}</p>
      <p className="mt-2 truncate text-lg font-semibold">{value}</p>
    </div>
  );
}

function ControlMeter({ device, intensity }) {
  return (
    <div className="mb-7 rounded-soft bg-white/40 p-4 shadow-insetSoft">
      <div className="flex items-center justify-between gap-4 text-sm">
        <span className="font-medium text-slateSoft">{device.status ? 'Live response' : 'Ready state'}</span>
        <span className="font-semibold text-graphite">{Math.round(intensity)}%</span>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/62">
        <motion.div
          className="h-full rounded-full bg-sage"
          animate={{ width: `${Math.min(100, Math.max(12, intensity))}%` }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}

function DeviceAmbientPreview({ device, intensity, glow }) {
  return (
    <div className="my-10 rounded-cloud border border-white/12 bg-porcelain/10 p-5 backdrop-blur-xl">
      <div className="relative h-44 overflow-hidden rounded-[26px] bg-graphite/28">
        <motion.div
          className="absolute inset-x-8 bottom-0 h-28 rounded-full blur-3xl"
          animate={{ opacity: device.status ? intensity / 145 : 0.12 }}
          transition={{ duration: 0.4 }}
          style={{ background: glow }}
        />
        <PreviewByType device={device} intensity={intensity} glow={glow} />
      </div>
    </div>
  );
}

function PreviewByType({ device, intensity, glow }) {
  if (device.type === 'cover') {
    return (
      <div className="absolute inset-0 grid place-items-center">
        <div className="relative h-28 w-44 overflow-hidden rounded-2xl border border-white/14 bg-porcelain/12">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(247,244,238,0.12),rgba(247,244,238,0.38))]" />
          <motion.div
            className="absolute inset-y-0 left-0 bg-graphite/58 backdrop-blur-sm"
            animate={{ width: `${100 - (device.position ?? 50)}%` }}
            transition={{ duration: 0.45 }}
          />
          <motion.div
            className="absolute inset-y-0 right-0 bg-cashmere/40"
            animate={{ opacity: (device.position ?? 50) / 110 }}
          />
        </div>
      </div>
    );
  }

  if (device.type === 'media' || device.type === 'speaker') {
    return (
      <div className="absolute inset-0 flex items-center justify-center gap-2">
        {[28, 44, 36, 62, 52, 70, 42].map((height, index) => (
          <motion.span
            key={height}
            className="w-3 rounded-full bg-porcelain/70"
            animate={{
              height: device.status ? [`${height * 0.55}%`, `${Math.min(88, height + intensity / 3)}%`, `${height * 0.65}%`] : '18%',
            }}
            transition={{ duration: 3 + index * 0.15, repeat: device.status ? Infinity : 0, ease: 'easeInOut' }}
          />
        ))}
      </div>
    );
  }

  if (device.type === 'climate') {
    return (
      <div className="absolute inset-0 grid place-items-center">
        <motion.div
          className="grid h-28 w-28 place-items-center rounded-full border border-white/18 bg-porcelain/12"
          animate={{ rotate: device.status ? 360 : 0 }}
          transition={{ duration: 12, repeat: device.status ? Infinity : 0, ease: 'linear' }}
        >
          <Fan size={44} className="text-porcelain/78" />
        </motion.div>
      </div>
    );
  }

  if (device.type === 'lock' || device.type === 'camera') {
    return (
      <div className="absolute inset-0 grid place-items-center">
        <div className="relative h-28 w-40 rounded-2xl border border-white/14 bg-porcelain/10">
          <motion.span
            className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-sage/70"
            animate={{ scale: [0.85, 1.22, 0.85], opacity: [0.2, 0.55, 0.2] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <Shield className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-porcelain/80" size={38} />
        </div>
      </div>
    );
  }

  if (device.type === 'network') {
    return (
      <div className="absolute inset-0 grid place-items-center">
        <Wifi size={54} className="text-porcelain/82" />
        <motion.div
          className="absolute h-28 w-28 rounded-full border border-sage/50"
          animate={{ scale: [0.82, 1.18, 0.82], opacity: [0.2, 0.46, 0.2] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    );
  }

  if (device.type === 'utility') {
    return (
      <div className="absolute inset-0 grid place-items-center">
        <div className="h-6 w-44 overflow-hidden rounded-full border border-white/18 bg-porcelain/12">
          <motion.div className="h-full bg-sage/80" animate={{ width: `${intensity}%` }} transition={{ duration: 0.45 }} />
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 grid place-items-center">
      <motion.div
        className="grid h-28 w-28 place-items-center rounded-full border border-white/16 bg-porcelain/12"
        animate={{ boxShadow: device.status ? `0 0 ${30 + intensity / 2}px ${glow}` : '0 0 0 rgba(0,0,0,0)' }}
      >
        <Sparkles size={44} className="text-porcelain/82" />
      </motion.div>
    </div>
  );
}

function DeviceControls({ device, updateDevice }) {
  if (device.type === 'light') {
    return (
      <div className="space-y-7">
        <SliderControl
          label="Brightness"
          value={device.brightness}
          onChange={(brightness) => updateDevice(device.id, { brightness, status: brightness > 0 })}
        />
        <SliderControl
          label="Warmth"
          value={device.warmth}
          onChange={(warmth) => updateDevice(device.id, { warmth })}
        />
        <ControlNote icon={Lamp} title="Ambient response" text="Lighting tone is included in every scene transition." />
      </div>
    );
  }

  if (device.type === 'climate') {
    return (
      <div className="grid gap-8 lg:grid-cols-[auto_1fr]">
        {device.temperature ? (
          <CircularDial
            label="Temperature"
            value={device.temperature}
            onChange={(temperature) => updateDevice(device.id, { temperature, status: true })}
          />
        ) : null}
        <div className="space-y-7">
          <SliderControl
            label="Fan speed"
            value={device.fanSpeed ?? 1}
            min={1}
            max={4}
            suffix=""
            onChange={(fanSpeed) => updateDevice(device.id, { fanSpeed, status: true })}
          />
          {'humidityTarget' in device ? (
            <SliderControl
              label="Humidity target"
              value={device.humidityTarget}
              min={35}
              max={60}
              onChange={(humidityTarget) => updateDevice(device.id, { humidityTarget, status: true })}
            />
          ) : null}
          <ControlNote icon={Wind} title="Climate mode" text={device.mode ?? 'Adaptive purification'} />
        </div>
      </div>
    );
  }

  if (device.type === 'cover') {
    return (
      <div className="space-y-7">
        <SliderControl
          label="Open position"
          value={device.position}
          onChange={(position) => updateDevice(device.id, { position, status: true })}
        />
        <ControlNote icon={Blinds} title="Room brightness" text="Curtain position updates the room light model." />
      </div>
    );
  }

  if (device.type === 'media' || device.type === 'speaker') {
    return (
      <div className="space-y-7">
        <SliderControl
          label="Volume"
          value={device.volume}
          onChange={(volume) => updateDevice(device.id, { volume, status: volume > 0 })}
        />
        <div className="grid gap-3 sm:grid-cols-3">
          {['Cinema', 'Ambient', 'Voice'].map((mode) => (
            <motion.button
              key={mode}
              type="button"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => updateDevice(device.id, { mediaMode: mode, status: true })}
              className={cn(
                'rounded-soft px-4 py-4 text-sm font-semibold transition duration-300',
                device.mediaMode === mode ? 'bg-graphite text-porcelain shadow-lift' : 'bg-white/48 text-graphite hover:bg-white/72',
              )}
            >
              {mode}
            </motion.button>
          ))}
        </div>
        <ControlNote icon={Radio} title="Media glow" text="Display and speaker states can shift the dashboard ambience." />
      </div>
    );
  }

  if (device.type === 'lock' || device.type === 'camera') {
    return (
      <div className="grid gap-4 sm:grid-cols-2">
        {'locked' in device ? (
          <motion.button
            type="button"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => updateDevice(device.id, { locked: !device.locked, status: true })}
            className="rounded-cloud bg-graphite p-6 text-left text-porcelain shadow-lift"
          >
            <Lock size={24} />
            <p className="mt-6 text-xl font-semibold">{device.locked ? 'Locked' : 'Unlocked'}</p>
            <p className="mt-2 text-sm text-porcelain/64">Entry protection</p>
          </motion.button>
        ) : null}
        {'recording' in device ? (
          <motion.button
            type="button"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => updateDevice(device.id, { recording: !device.recording, status: true })}
            className="rounded-cloud bg-white/50 p-6 text-left text-graphite shadow-insetSoft"
          >
            <Camera size={24} />
            <p className="mt-6 text-xl font-semibold">{device.recording ? 'Recording' : 'Standby'}</p>
            <p className="mt-2 text-sm text-slateSoft">Camera stream</p>
          </motion.button>
        ) : null}
        <ControlNote icon={Shield} title="Security mode" text="Security devices stay prioritized when Away scene is active." />
      </div>
    );
  }

  return (
    <div className="space-y-7">
      {'battery' in device ? (
        <SliderControl
          label="Battery"
          value={device.battery}
          onChange={(battery) => updateDevice(device.id, { battery })}
        />
      ) : null}
      {'signal' in device ? (
        <SliderControl
          label="Signal strength"
          value={device.signal}
          onChange={(signal) => updateDevice(device.id, { signal })}
        />
      ) : null}
      <ControlNote icon={Gauge} title="Utility state" text={device.mode ?? 'Connected'} />
    </div>
  );
}

function ControlNote({ icon: Icon, title, text }) {
  return (
    <div
      className="relative overflow-hidden rounded-soft bg-white/30 p-5 shadow-sm backdrop-blur-md"
      style={{ borderLeft: '2px solid rgba(139,167,161,0.3)' }}
    >
      <div className="absolute right-5 top-5 flex items-center gap-2">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-sage">Auto-sync</span>
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sage/40 opacity-75"></span>
          <span className="relative inline-flex h-2 w-2 rounded-full bg-sage/80"></span>
        </span>
      </div>
      <Icon size={20} className="text-sage" />
      <h3 className="mt-4 text-sm font-semibold text-graphite">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slateSoft">{text}</p>
    </div>
  );
}
