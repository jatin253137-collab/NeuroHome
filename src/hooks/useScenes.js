import { useContext } from 'react';
import { SceneContext } from '../context/SceneContext.jsx';

export function useScenes() {
  const value = useContext(SceneContext);

  if (!value) {
    throw new Error('useScenes must be used inside SceneProvider');
  }

  return value;
}
