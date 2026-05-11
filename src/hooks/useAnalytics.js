import { useEffect, useMemo, useState } from 'react';
import { climateSeries, deviceShare, energySeries } from '../data/analytics.js';
import { nextChartPoint } from '../services/realtime.js';

export function useAnalytics() {
  const [energy, setEnergy] = useState(energySeries);
  const [pointIndex, setPointIndex] = useState(energySeries.length);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setEnergy((current) => [...current.slice(-7), nextChartPoint(pointIndex)]);
      setPointIndex((current) => current + 1);
    }, 5200);

    return () => window.clearInterval(timer);
  }, [pointIndex]);

  return useMemo(
    () => ({
      climate: climateSeries,
      deviceShare,
      energy,
      efficiency: 91,
      monthlyProjection: 284,
    }),
    [energy],
  );
}
