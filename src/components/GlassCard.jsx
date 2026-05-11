import { motion } from 'framer-motion';
import { cn } from '../utils/cn.js';

export function GlassCard({
  as: Component = motion.section,
  children,
  className,
  hover = true,
  delay = 0,
  ...props
}) {
  return (
    <Component
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={hover ? { y: -4, scale: 1.006 } : undefined}
      className={cn(
        'glass-surface rounded-cloud border border-white/55 shadow-glass',
        'transition-[box-shadow,transform,background-color] duration-300 ease-out hover:shadow-lift',
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}


