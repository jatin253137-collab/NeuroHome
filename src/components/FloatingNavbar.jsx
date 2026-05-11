import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { desktopNavigation } from '../constants/navigation.js';
import { cn } from '../utils/cn.js';

export function FloatingNavbar() {
  return (
    <motion.header
      className="fixed left-0 right-0 top-5 z-40 hidden justify-center md:flex"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <nav className="glass-surface flex w-[min(94vw,1040px)] items-center justify-between gap-2 rounded-full border border-white/60 px-3 py-2.5 shadow-glass">
        <NavLink
          to="/"
          className="flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold text-graphite"
        >
          <span className="grid h-7 w-7 place-items-center rounded-full bg-graphite text-[11px] text-porcelain">
            N
          </span>
          NeuroHome
        </NavLink>
        {desktopNavigation.map(({ label, path, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              cn(
                'relative flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition duration-200',
                isActive
                  ? 'bg-graphite text-porcelain shadow-insetSoft'
                  : 'text-slateSoft hover:bg-white/45 hover:text-graphite',
              )
            }
          >
            <Icon size={16} strokeWidth={1.8} />
            {label}
          </NavLink>
        ))}
      </nav>
    </motion.header>
  );
}
