import {
  Blinds,
  Bot,
  Cctv,
  Droplets,
  Lamp,
  LampDesk,
  Lock,
  Snowflake,
  Speaker,
  Tv,
  Wifi,
  Wind,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDevices } from '../hooks/useDevices.js';
import { cn } from '../utils/cn.js';
import { ToggleSwitch } from './ToggleSwitch.jsx';

const icons = {
  Blinds,
  Bot,
  Cctv,
  Droplets,
  Lamp,
  LampDesk,
  Lock,
  Snowflake,
  Speaker,
  Tv,
  Wifi,
  Wind,
};

function getDeviceMeta(device) {
  if (!device.status && device.type !== 'lock') return device.id.includes('2') ? 'Idle' : 'Standby';
  if (device.type === 'light') return `${device.brightness}% \u00b7 Adaptive`;
  if (device.type === 'cover') return `${device.position}% \u00b7 Positioned`;
  if (device.type === 'climate' && device.temperature) return `${device.temperature}\u00b0 \u00b7 Sync active`;
  if (device.type === 'speaker' || device.type === 'media') return `${device.volume}% \u00b7 Quiet playback`;
  if (device.type === 'lock') return device.locked ? 'Secured' : 'Unlocked';
  if (device.type === 'camera') return device.recording ? 'Monitoring' : 'Standby';
  if (device.type === 'network') return `${device.signal}% \u00b7 Stable`;
  if (device.type === 'utility') return device.mode;
  return 'Active';
}

function getProgressValue(device) {
  return device.brightness ?? device.signal ?? device.volume ?? device.position ?? device.battery ?? 72;
}

export function DeviceCard({ device, compact = false }) {
  const navigate = useNavigate();
  const { toggleDevice } = useDevices();
  const Icon = icons[device.icon] ?? Lamp;
  const progress = device.status ? `${Math.min(100, Math.max(18, getProgressValue(device)))}%` : '18%';

  return (
    <motion.article
      role="button"
      tabIndex={0}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.985 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => navigate(`/device/${device.id}`)}
      onKeyDown={(event) => {
        if (event.key === 'Enter') navigate(`/device/${device.id}`);
      }}
      className={cn(
        'group relative flex flex-col justify-between cursor-pointer overflow-hidden rounded-cloud border border-white/70 bg-white/82 p-6 shadow-[0_10px_30px_rgba(15,23,42,0.05)] shadow-insetSoft backdrop-blur-xl transition-cinematic hover:bg-white/92 hover:border-white/80 hover:shadow-[0_14px_44px_rgba(31,41,55,0.10)]',
        device.status && 'shadow-[0_10px_30px_rgba(15,23,42,0.05),0_22px_58px_rgba(139,167,161,0.16)]',
        compact ? 'min-h-40' : 'min-h-[200px]',
      )}
    >
      {device.status ? (
        <>
          <div className="absolute inset-x-6 top-0 h-16 rounded-full bg-sage/18 blur-2xl transition-opacity duration-300 group-hover:opacity-90" />
          <motion.span
            className="absolute right-5 top-5 h-2.5 w-2.5 rounded-full bg-sage"
            animate={{ scale: [1, 1.28, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </>
      ) : null}

      <div className="relative z-10 flex items-center justify-between gap-4">
        <div
          className={cn(
            'grid h-12 w-12 place-items-center rounded-2xl transition duration-300 group-hover:scale-[1.04]',
            device.status
              ? 'bg-graphite text-porcelain shadow-[0_10px_24px_rgba(31,41,55,0.18)]'
              : 'bg-white/60 text-slateSoft/80',
          )}
        >
          <Icon size={21} strokeWidth={1.8} />
        </div>
        <div
          className="origin-right scale-[0.85] opacity-95 transition-opacity duration-500 group-hover:opacity-100"
          onClick={(event) => event.stopPropagation()}
          onKeyDown={(event) => event.stopPropagation()}
        >
          <ToggleSwitch
            checked={device.status}
            label={`Toggle ${device.name}`}
            onChange={() => toggleDevice(device.id)}
          />
        </div>
      </div>

      <div className="relative z-10 mt-6 flex-grow">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-slateSoft/80">{device.room}</p>
        <h3 className="mt-1 text-[19px] font-semibold tracking-tight text-graphite">{device.name}</h3>
        <p className={cn('mt-1 text-[13px]', device.status ? 'text-graphite/70' : 'text-graphite/80')}>{getDeviceMeta(device)}</p>
      </div>
      <div className={cn("relative z-10 mt-6 h-[5px] overflow-hidden rounded-full", device.status ? "bg-white/58" : "bg-white/50")}>
        {device.status ? (
          <motion.div
            className="h-full rounded-full bg-sage"
            style={{ width: progress }}
            animate={{ opacity: [0.88, 0.96, 0.88] }}
            transition={{ duration: 7, delay: Math.random() * 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        ) : (
          <div
            className="h-full rounded-full bg-slateSoft/42 transition-all duration-500"
            style={{ width: progress }}
          />
        )}
      </div>
    </motion.article>
  );
}
