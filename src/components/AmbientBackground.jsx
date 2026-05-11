import { motion } from 'framer-motion';
import { useAmbientMode } from '../hooks/useAmbientMode.js';

export function AmbientBackground() {
  const ambient = useAmbientMode();

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden bg-paper">
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: ambient.isDimmed ? 0.72 : 1 }}
        transition={{ duration: 0.6 }}
        style={{
          background: `
            linear-gradient(135deg, rgba(245, 243, 239, 0.98) 0%, rgba(234, 231, 225, 0.92) 42%, rgba(217, 214, 209, 0.72) 100%),
            radial-gradient(130% 92% at 50% -10%, ${ambient.glow} 0%, transparent 54%)
          `,
        }}
      />
      <motion.div
        className="absolute inset-x-0 top-0 h-[58vh]"
        animate={{ opacity: [0.55, 0.78, 0.55] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          background: `linear-gradient(180deg, ${ambient.glow} 0%, rgba(247, 244, 238, 0) 74%)`,
        }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.22)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[size:72px_72px] opacity-[0.18]" />
    </div>
  );
}
