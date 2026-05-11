import { DeviceProvider } from '../context/DeviceContext.jsx';
import { EnvironmentProvider } from '../context/EnvironmentContext.jsx';
import { SceneProvider } from '../context/SceneContext.jsx';
import { ThemeProvider } from '../context/ThemeContext.jsx';

export function AppProviders({ children }) {
  return (
    <ThemeProvider>
      <SceneProvider>
        <EnvironmentProvider>
          <DeviceProvider>{children}</DeviceProvider>
        </EnvironmentProvider>
      </SceneProvider>
    </ThemeProvider>
  );
}
