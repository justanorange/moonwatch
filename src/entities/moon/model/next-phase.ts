import { getMoonPhase } from './phase';
import { MOON_PHASES, type MoonPhaseData } from '../lib/phases';
import { SYNODIC_MONTH } from '@shared/lib/astronomy/constants';

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
  const phases = (Object.entries(MOON_PHASES) as [string, MoonPhaseData][])
    .slice()
    .sort((a, b) => a[1].exactValue - b[1].exactValue);

  for (let i = 0; i < phases.length; i++) {
    const entry = phases[i];
    if (!entry) continue;
    const [key, phase] = entry;
    if (phase.exactValue > currentPhaseValue) {
      return key;
    }
  }

  return phases.length && phases[0] ? phases[0][0] : 'NEW';
};
