import { daysBetween } from '@shared/lib/dates/calculations';
import { SYNODIC_MONTH, KNOWN_NEW_MOON } from '@shared/lib/astronomy/constants';

export const getMoonPhase = (date = new Date()) => {
  const daysSinceNewMoon = daysBetween(date, KNOWN_NEW_MOON);
  return (daysSinceNewMoon % SYNODIC_MONTH) / SYNODIC_MONTH;
};
