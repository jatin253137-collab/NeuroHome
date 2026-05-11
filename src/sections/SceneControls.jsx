import { SceneCard } from '../components/SceneCard.jsx';
import { GlassCard } from '../components/GlassCard.jsx';
import { useScenes } from '../hooks/useScenes.js';

export function SceneControls() {
  const { activeSceneId, scenes, setScene } = useScenes();

  return (
    <GlassCard className="p-6 lg:col-span-4" hover={false}>
      <div className="mb-6">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-sage">Scenes</p>
        <h2 className="mt-1.5 text-2xl font-semibold tracking-tight text-graphite">Ambience presets</h2>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
        {scenes.map((scene) => (
          <SceneCard
            key={scene.id}
            scene={scene}
            active={activeSceneId === scene.id}
            onSelect={() => setScene(scene.id)}
          />
        ))}
      </div>
    </GlassCard>
  );
}
