import { createContext, useMemo, useState } from 'react';

export const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [reducedGlow, setReducedGlow] = useState(false);
  const [quietMode, setQuietMode] = useState(false);

  const value = useMemo(
    () => ({
      reducedGlow,
      quietMode,
      setReducedGlow,
      setQuietMode,
    }),
    [quietMode, reducedGlow],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
