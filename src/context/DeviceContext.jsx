import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { initialDevices } from '../data/devices.js';
import { useScenes } from '../hooks/useScenes.js';

export const DeviceContext = createContext(null);

export function DeviceProvider({ children }) {
  const { activeScene } = useScenes();
  const [devices, setDevices] = useState(initialDevices);

  useEffect(() => {
    setDevices((current) =>
      current.map((device) => ({
        ...device,
        ...(activeScene.deviceState[device.id] ?? {}),
      })),
    );
  }, [activeScene]);

  const updateDevice = useCallback((id, patch) => {
    setDevices((current) =>
      current.map((device) => (device.id === id ? { ...device, ...patch } : device)),
    );
  }, []);

  const toggleDevice = useCallback((id) => {
    setDevices((current) =>
      current.map((device) => (device.id === id ? { ...device, status: !device.status } : device)),
    );
  }, []);

  const getDevice = useCallback(
    (id) => devices.find((device) => device.id === id),
    [devices],
  );

  const getRoomDevices = useCallback(
    (roomId) => devices.filter((device) => device.roomId === roomId),
    [devices],
  );

  const value = useMemo(
    () => ({
      devices,
      activeDevices: devices.filter((device) => device.status).length,
      getDevice,
      getRoomDevices,
      toggleDevice,
      updateDevice,
    }),
    [devices, getDevice, getRoomDevices, toggleDevice, updateDevice],
  );

  return <DeviceContext.Provider value={value}>{children}</DeviceContext.Provider>;
}
