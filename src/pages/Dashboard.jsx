import { ActivityTimeline } from '../sections/ActivityTimeline.jsx';
import { DashboardHero } from '../sections/DashboardHero.jsx';
import { DeviceGrid } from '../sections/DeviceGrid.jsx';
import { EnergyWidget } from '../sections/EnergyWidget.jsx';
import { EnvironmentWidget } from '../sections/EnvironmentWidget.jsx';
import { InsightsPanel } from '../sections/InsightsPanel.jsx';
import { MusicWidget } from '../sections/MusicWidget.jsx';
import { SceneControls } from '../sections/SceneControls.jsx';
import { SecurityWidget } from '../sections/SecurityWidget.jsx';
import { PageTransition } from '../components/PageTransition.jsx';

export function Dashboard() {
  return (
    <PageTransition>
      <section className="grid gap-5 lg:grid-cols-12">
        <DashboardHero />
        <div className="grid gap-5 lg:col-span-4">
          <EnvironmentWidget />
          <EnergyWidget />
          <SecurityWidget />
        </div>
        <DeviceGrid />
        <SceneControls />
        <MusicWidget />
        <ActivityTimeline />
        <InsightsPanel />
      </section>
    </PageTransition>
  );
}
