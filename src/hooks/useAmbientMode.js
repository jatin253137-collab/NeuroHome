import { useMemo } from 'react';
import { useEnvironment } from './useEnvironment.js';
import { useScenes } from './useScenes.js';
import { useTheme } from './useTheme.js';

export function useAmbientMode() {
  const { activeScene } = useScenes();
  const { environment } = useEnvironment();
  const { reducedGlow, quietMode } = useTheme();

  return useMemo(
    () => ({
      accent: activeScene.accent,
      glow: reducedGlow ? 'rgba(139, 167, 161, 0.16)' : activeScene.glow,
      tone: activeScene.tone,
      isDimmed: quietMode || environment.light < 32,
    }),
    [activeScene, environment.light, quietMode, reducedGlow],
  );
}
