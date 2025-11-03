import { daysBetween } from '@shared/lib/dates/calculations';
import { SYNODIC_MONTH, KNOWN_NEW_MOON } from '@shared/lib/astronomy/constants';

export const getMoonAge = (date = new Date()) => {
  const daysSinceNewMoon = daysBetween(date, KNOWN_NEW_MOON);
  const age = daysSinceNewMoon % SYNODIC_MONTH;
  return Number(age.toFixed(1));
}
