import { createContext, useEffect, useMemo, useState } from 'react';
import { initialEnvironment, weatherStates } from '../data/environment.js';
import { clamp, jitter } from '../utils/formatters.js';
import { useScenes } from '../hooks/useScenes.js';

export const EnvironmentContext = createContext(null);

export function EnvironmentProvider({ children }) {
  const { activeScene } = useScenes();
  const [environment, setEnvironment] = useState(initialEnvironment);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setEnvironment((current) => {
        const weather =
          Math.random() > 0.72
            ? weatherStates[Math.floor(Math.random() * weatherStates.length)]
            : current.outsideWeather;

        return {
          ...current,
          temperature: jitter(
            current.temperature + activeScene.environmentBias.temperature * 0.08,
            0.28,
            19,
            27,
          ),
          humidity: Math.round(
            jitter(current.humidity + activeScene.environmentBias.humidity * 0.05, 1.4, 34, 58, 0),
          ),
          airQuality: Math.round(jitter(current.airQuality, 1.2, 88, 99, 0)),
          energyNow: jitter(current.energyNow, 0.55, 2.2, 5.8),
          outsideWeather: weather,
          wind: Math.round(jitter(current.wind, 1.2, 2, 14, 0)),
          light: Math.round(
            clamp(current.light + activeScene.environmentBias.light * 0.04 + (Math.random() - 0.5) * 2, 18, 86),
          ),
        };
      });
    }, 4200);

    return () => window.clearInterval(timer);
  }, [activeScene]);

  const value = useMemo(() => ({ environment }), [environment]);

  return <EnvironmentContext.Provider value={value}>{children}</EnvironmentContext.Provider>;
}
