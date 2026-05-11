import { NavLink } from 'react-router-dom';
import { mobileNavigation } from '../constants/navigation.js';
import { cn } from '../utils/cn.js';

export function BottomNavigation() {
  return (
    <nav className="fixed bottom-4 left-1/2 z-40 grid w-[calc(100%-1.5rem)] max-w-md -translate-x-1/2 grid-cols-5 rounded-cloud border border-white/60 bg-porcelain/78 px-2 py-2 shadow-glass backdrop-blur-2xl md:hidden">
      {mobileNavigation.map(({ label, path, icon: Icon }) => (
        <NavLink
          key={path}
          to={path}
          className={({ isActive }) =>
            cn(
              'flex min-w-0 flex-col items-center gap-1 rounded-[22px] px-1 py-2 text-[11px] font-medium transition duration-200',
              isActive ? 'bg-graphite text-porcelain' : 'text-slateSoft hover:bg-white/55',
            )
          }
        >
          <Icon size={18} strokeWidth={1.9} />
          <span className="w-full truncate text-center">{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
