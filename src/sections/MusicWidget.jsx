import { AnimatePresence, motion } from 'framer-motion';
import { Pause, Play, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';
import { useRef, useState } from 'react';
import { GlassCard } from '../components/GlassCard.jsx';

const bars = [32, 46, 30, 58, 72, 42, 64, 38, 50, 68, 36, 56];
const barOpacity = [0.7, 0.85, 0.6, 0.9, 0.75, 0.65, 0.88, 0.7, 0.8, 0.72, 0.6, 0.82];
const sessions = ['Soft Architecture - Vol. 03', 'Low Light Residence', 'Morning Glass'];
const sessionImages = [
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&q=80&w=600'
];

export function MusicWidget() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [sessionIndex, setSessionIndex] = useState(0);
  const [volume, setVolume] = useState(65);
  const [isMuted, setIsMuted] = useState(false);
  const [showVolume, setShowVolume] = useState(false);
  const [isDraggingVolume, setIsDraggingVolume] = useState(false);
  const hideTimeoutRef = useRef(null);
  
  const session = sessions[sessionIndex];
  const isPanelVisible = showVolume || isDraggingVolume;

  const handleMouseEnter = () => {
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    setShowVolume(true);
  };

  const handleMouseLeave = () => {
    hideTimeoutRef.current = setTimeout(() => {
      setShowVolume(false);
    }, 150);
  };

  const updateVolumeFromEvent = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = 1 - (e.clientY - rect.top) / rect.height;
    setVolume(Math.max(0, Math.min(100, Math.round(percent * 100))));
    setIsMuted(false);
  };

  const handleVolumePointerDown = (e) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsDraggingVolume(true);
    updateVolumeFromEvent(e);
  };

  const handleVolumePointerMove = (e) => {
    if (isDraggingVolume) updateVolumeFromEvent(e);
  };

  const handleVolumePointerUp = (e) => {
    e.currentTarget.releasePointerCapture(e.pointerId);
    setIsDraggingVolume(false);
  };

  const changeSession = (direction) => {
    setSessionIndex((current) => (current + direction + sessions.length) % sessions.length);
    setIsPlaying(true);
  };

  return (
    <GlassCard className="relative overflow-hidden p-6 lg:col-span-4">
      <AnimatePresence mode="wait">
        <motion.img
          key={sessionIndex}
          src={sessionImages[sessionIndex]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          className="absolute inset-0 h-full w-full object-cover saturate-50 blur-lg"
          alt="Session atmosphere"
        />
      </AnimatePresence>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-graphite/15" />

      <div className="relative z-20 mb-7 flex items-start justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-sage">Audio</p>
          <h2 className="mt-1.5 text-xl font-semibold tracking-tight text-graphite">Ambient Session</h2>
          <motion.p
            key={session}
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28 }}
            className="mt-1.5 text-sm font-medium text-slateSoft"
          >
            {session}
          </motion.p>
        </div>
        <div 
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <span 
            className="grid h-11 w-11 cursor-pointer place-items-center rounded-2xl bg-white/58 text-slateSoft shadow-insetSoft transition-colors duration-400 hover:bg-white/70"
            onClick={() => setIsMuted(!isMuted)}
          >
            {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </span>
          {/* Luxury Volume Hover Panel */}
          <div 
            className={`absolute -right-2 top-full z-20 pt-3 transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isPanelVisible 
                ? 'pointer-events-auto translate-y-0 opacity-100' 
                : 'pointer-events-none translate-y-1 opacity-0'
            }`}
          >
            <div className="flex w-12 flex-col items-center gap-4 rounded-[24px] border border-white/20 bg-white/50 py-4 shadow-[0_12px_40px_rgba(31,41,55,0.08)] backdrop-blur-2xl">
              <span className="text-[10px] font-semibold text-slateSoft">{isMuted ? 0 : volume}%</span>
              <div 
                className="relative h-20 w-1.5 cursor-pointer overflow-hidden rounded-full bg-white/40 touch-none"
                onPointerDown={handleVolumePointerDown}
                onPointerMove={handleVolumePointerMove}
                onPointerUp={handleVolumePointerUp}
              >
                <motion.div 
                  className="absolute bottom-0 w-full rounded-full bg-graphite"
                  animate={{ height: `${isMuted ? 0 : volume}%` }}
                  transition={isDraggingVolume ? { duration: 0.05 } : { type: 'tween', duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative z-10 flex h-24 items-end gap-[9px] overflow-hidden rounded-soft bg-white/40 p-4 shadow-insetSoft">
        <motion.div
          className="absolute inset-0 blur-2xl"
          animate={{ opacity: isPlaying ? [0.08, 0.18, 0.08] : 0 }}
          transition={{ duration: 6, repeat: isPlaying ? Infinity : 0, ease: 'easeInOut' }}
          style={{ background: 'radial-gradient(circle at center, #8BA7A1 0%, transparent 70%)' }}
        />
        {bars.map((height, index) => (
          <motion.span
            key={height + index}
            className="relative z-10 w-full rounded-full"
            style={{ backgroundColor: `rgba(139,167,161,${barOpacity[index] ?? 0.7})` }}
            animate={{
              height: isPlaying
                ? [`${height * 0.6}%`, `${Math.min(84, height + sessionIndex * 5)}%`, `${height * 0.7}%`]
                : `${Math.max(16, height * 0.32)}%`,
              opacity: isPlaying ? 0.9 : 0.45,
            }}
            transition={{
              duration: isPlaying ? 4.5 + index * 0.25 : 0.55,
              repeat: isPlaying ? Infinity : 0,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
      <div className="relative z-10 mt-7 flex items-center justify-center gap-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => changeSession(-1)}
          className="grid h-11 w-11 place-items-center rounded-full bg-white/50 text-graphite shadow-sm transition-colors duration-300 hover:bg-white/80"
          type="button"
          aria-label="Previous ambient session"
        >
          <SkipBack size={18} />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsPlaying((playing) => !playing)}
          className="grid h-14 w-14 place-items-center rounded-full bg-graphite text-porcelain shadow-md transition-colors duration-500 hover:bg-graphite/90"
          type="button"
          aria-label={isPlaying ? 'Pause ambient session' : 'Play ambient session'}
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-0.5" />}
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => changeSession(1)}
          className="grid h-11 w-11 place-items-center rounded-full bg-white/50 text-graphite shadow-sm transition-colors duration-300 hover:bg-white/80"
          type="button"
          aria-label="Next ambient session"
        >
          <SkipForward size={18} />
        </motion.button>
      </div>
    </GlassCard>
  );
}
