import { daysBetween } from '@shared/lib/dates/calculations';
import { SYNODIC_MONTH, KNOWN_NEW_MOON } from '@shared/lib/astronomy/constants';
import { MOON_PHASES } from '@entities/moon/lib/phases';

import type { MoonPhaseData } from '@entities/moon/lib/phases';

/**
 * Определяет лунную фазу для конкретной даты.
 * @param date - Дата, для которой нужно рассчитать фазу.
 * @returns Значение фазы от 0.0 (новолуние) до 1.0 (следующее новолуние).
 */
export const getMoonPhase = (date = new Date()) => {
  const daysSinceNewMoon = daysBetween(date, KNOWN_NEW_MOON);
  return (daysSinceNewMoon % SYNODIC_MONTH) / SYNODIC_MONTH;
};

/**
 * Находит ключ и данные фазы для заданного числового значения.
 * @param phaseValue - Значение фазы (0.0 - 1.0).
 * @returns Объект с ключом и данными фазы или null, если фаза не найдена.
 */
const getPhaseForValue = (phaseValue: number) => {
  /**
   * Проверяет, находится ли значение в заданном диапазоне.
   * Учитывает "циклические" диапазоны, например, для новолуния [0.96, 0.04],
   * где конец диапазона меньше его начала.
   */
  const isInRange = (value: number, [start, end]: [number, number]) => {
    if (start <= end) {
      // Обычный диапазон, например [0.04, 0.21]
      return value >= start && value < end;
    }
    // Циклический диапазон, например [0.96, 0.04]
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

/**
 * Собирает полную информацию о лунной фазе за определенный день.
 * Определяет текущую фазу (на середину дня) и проверяет, произошло ли
 * важное событие (например, полнолуние) в течение этого дня.
 * @param date - Дата для анализа.
 * @returns Объект DayPhaseInfo с подробной информацией о фазе.
 */
export const getDayPhaseInfo = (date = new Date()): DayPhaseInfo => {
  const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
  const endOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59);

  const startPhase = getMoonPhase(startOfDay);
  const endPhase = getMoonPhase(endOfDay);

  /**
   * Проверяет, пересекло ли значение фазы определенную точку (например, 0.5 для полнолуния)
   * в течение дня.
   */
  const didCrossPoint = (start: number, end: number, point: number) => {
    if (start === end) return false;
    // Если фаза не пересекала нулевую отметку
    if (start < end) {
      return point >= start && point <= end;
    }
    // Если фаза пересекла нулевую отметку (например, с 0.98 до 0.01)
    return (point >= start && point <= 1.0) || (point >= 0 && point <= end);
  };

  let event: { key: string; phase: typeof MOON_PHASES[string] } | null = null;
  for (const [key, phase] of Object.entries(MOON_PHASES)) {
    // Ищем только важные события, у которых есть точное значение
    if (phase.important === undefined || phase.exactValue === undefined) continue;
    if (didCrossPoint(startPhase, endPhase, phase.exactValue)) {
      event = { key, phase };
      break;
    }
  }

  // Фаза на середину дня используется как "текущая"
  const midPhase = getMoonPhase(new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12, 0, 0));

  return {
    currentPhase: getPhaseForValue(midPhase),
    event,
    value: midPhase,
    exactTime: event ? (event.phase.exactValue === startPhase ? startOfDay : endOfDay) : undefined
  };
};
