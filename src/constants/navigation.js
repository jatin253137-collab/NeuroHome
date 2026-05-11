import {
  BarChart3,
  DoorOpen,
  Home,
  LayoutGrid,
  Settings,
  ShieldCheck,
  UserRound,
} from 'lucide-react';

export const desktopNavigation = [
  { label: 'Dashboard', path: '/', icon: Home },
  { label: 'Rooms', path: '/rooms', icon: DoorOpen },
  { label: 'Analytics', path: '/analytics', icon: BarChart3 },
  { label: 'Security', path: '/security', icon: ShieldCheck },
  { label: 'Settings', path: '/settings', icon: Settings },
];

export const mobileNavigation = [
  { label: 'Home', path: '/', icon: Home },
  { label: 'Rooms', path: '/rooms', icon: DoorOpen },
  { label: 'Devices', path: '/devices', icon: LayoutGrid },
  { label: 'Analytics', path: '/analytics', icon: BarChart3 },
  { label: 'Profile', path: '/settings', icon: UserRound },
];
