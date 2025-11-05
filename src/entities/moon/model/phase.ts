import { daysBetween } from '@shared/lib/dates/calculations';
import { SYNODIC_MONTH, KNOWN_NEW_MOON } from '@shared/lib/astronomy/constants';
import { MOON_PHASES } from '@entities/moon/lib/phases';

import type { MoonPhaseData } from '@entities/moon/lib/phases';

export const getMoonPhase = (date = new Date()) => {
  const daysSinceNewMoon = daysBetween(date, KNOWN_NEW_MOON);
  return (daysSinceNewMoon % SYNODIC_MONTH) / SYNODIC_MONTH;
};

const getPhaseForValue = (phaseValue: number) => {
  const isInRange = (value: number, [start, end]: [number, number]) => {
    if (start <= end) {
      return value >= start && value < end;
    }
    return value >= start || value < end;
  };

  for (const [key, phase] of Object.entries(MOON_PHASES)) {
    if (isInRange(phaseValue, phase.range)) {
      return { key, phase };
    }
  }

  return null;
};

export interface DayPhaseInfo {
  currentPhase: { key: string; phase: MoonPhaseData } | null;
  event: { key: string; phase: MoonPhaseData } | null;
  value: number;
  exactTime: Date | undefined;
}

export const getDayPhaseInfo = (date = new Date()): DayPhaseInfo => {
  const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
  const endOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59);

  const startPhase = getMoonPhase(startOfDay);
  const endPhase = getMoonPhase(endOfDay);

  const didCrossPoint = (start: number, end: number, point: number) => {
    if (start === end) return false;
    if (start < end) {
      return point >= start && point <= end;
    }
    return (point >= start && point <= 1.0) || (point >= 0 && point <= end);
  };

  let event: { key: string; phase: typeof MOON_PHASES[string] } | null = null;
  for (const [key, phase] of Object.entries(MOON_PHASES)) {
    if (phase.important === undefined || phase.exactValue === undefined) continue;
    if (didCrossPoint(startPhase, endPhase, phase.exactValue)) {
      event = { key, phase };
      break;
    }
  }

  const midPhase = getMoonPhase(new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12, 0, 0));

  return {
    currentPhase: getPhaseForValue(midPhase),
    event,
    value: midPhase,
    exactTime: event ? (event.phase.exactValue === startPhase ? startOfDay : endOfDay) : undefined
  };
};
