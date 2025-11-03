import { getMoonPhase } from './phase';
import { MOON_PHASES } from '../lib/phases';
import { SYNODIC_MONTH } from '@shared/lib/astronomy/constants';
import type { MoonPhase } from '../lib/phases';

export const getNextPhase = (date = new Date()) => {
  const phase = getMoonPhase(date);
  
  let daysToNext;
  
  if (phase < 0.25) {
    daysToNext = 0.25 - phase;
  } else if (phase < 0.5) {
    daysToNext = 0.5 - phase;
  } else if (phase < 0.75) {
    daysToNext = 0.75 - phase;
  } else {
    daysToNext = 1.0 - phase;
  }
  
  daysToNext = daysToNext * SYNODIC_MONTH;
  const nextDate = new Date(date.getTime() + daysToNext * 86400000);
  
  return {
    nextPhaseData: MOON_PHASES[getNextPhaseKey(phase)],
    date: nextDate,
    days: Math.floor(daysToNext),
    hours: Math.floor((daysToNext % 1) * 24)
  };
}

export const getNextPhaseKey = (currentPhaseValue: number) => {
  const phases = Object.entries(MOON_PHASES).filter(Boolean) as [string, MoonPhase][];
  const currentIndex = phases.findIndex(([_, phase]) => 
    currentPhaseValue >= phase.range[0] && currentPhaseValue < phase.range[1]
  );

  if (currentIndex === -1) {
    return 'NEW';
  }
  
  // @ts-ignore
  return phases[(currentIndex + 1) % phases.length][0];
};
