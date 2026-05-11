import { useContext } from 'react';
import { DeviceContext } from '../context/DeviceContext.jsx';

export function useDevices() {
  const value = useContext(DeviceContext);

  if (!value) {
    throw new Error('useDevices must be used inside DeviceProvider');
  }

  return value;
}
