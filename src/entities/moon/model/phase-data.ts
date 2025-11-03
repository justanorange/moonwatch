import { MOON_PHASES } from '../lib/phases';

export const getPhaseByValue = (phaseValue: number) => {
  if (isNaN(phaseValue)) return null;
  return Object.values(MOON_PHASES).find(phase => 
    phaseValue >= phase.range[0] && phaseValue < phase.range[1]
  ) || MOON_PHASES.NEW;
};
