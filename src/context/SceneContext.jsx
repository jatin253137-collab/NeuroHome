import { createContext, useMemo, useState } from 'react';
import { scenePresets } from '../data/scenes.js';

export const SceneContext = createContext(null);

export function SceneProvider({ children }) {
  const [activeSceneId, setActiveSceneId] = useState('relax');

  const activeScene = scenePresets.find((scene) => scene.id === activeSceneId) ?? scenePresets[0];

  const value = useMemo(
    () => ({
      activeScene,
      activeSceneId,
      scenes: scenePresets,
      setScene: setActiveSceneId,
    }),
    [activeScene, activeSceneId],
  );

  return <SceneContext.Provider value={value}>{children}</SceneContext.Provider>;
}
