import { useContext } from 'react';
import { EnvironmentContext } from '../context/EnvironmentContext.jsx';

export function useEnvironment() {
  const value = useContext(EnvironmentContext);

  if (!value) {
    throw new Error('useEnvironment must be used inside EnvironmentProvider');
  }

  return value;
}
