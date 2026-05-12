import {
  BarChart3,
  DoorOpen,
  Home,
  Settings,
  ShieldCheck,
} from 'lucide-react';

export const desktopNavigation = [
  { label: 'Dashboard', path: '/', icon: Home },
  { label: 'Rooms', path: '/rooms', icon: DoorOpen },
  { label: 'Analytics', path: '/analytics', icon: BarChart3 },
  { label: 'Security', path: '/security', icon: ShieldCheck },
  { label: 'Settings', path: '/settings', icon: Settings },
];

export const mobileNavigation = [
  { label: 'Dashboard', path: '/', icon: Home },
  { label: 'Rooms', path: '/rooms', icon: DoorOpen },
  { label: 'Analytics', path: '/analytics', icon: BarChart3 },
  { label: 'Security', path: '/security', icon: ShieldCheck },
  { label: 'Settings', path: '/settings', icon: Settings },
];
