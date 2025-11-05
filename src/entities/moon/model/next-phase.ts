import { getMoonPhase } from './phase';
import { MOON_PHASES, type MoonPhaseData } from '../lib/phases';
import { SYNODIC_MONTH } from '@shared/lib/astronomy/constants';

/**
 * Определяет ключ следующей важной астрономической фазы луны.
 * Важными считаются новолуние, первая четверть, полнолуние и последняя четверть.
 * @param currentPhaseValue - Текущее значение фазы (от 0.0 до 1.0).
 * @returns Ключ следующей важной фазы (например, 'FIRST_QUARTER', 'FULL').
 */
export const getNextPhaseKey = (currentPhaseValue: number): string => {
  // Фильтруем только важные фазы и сортируем их по значению
  const importantPhases = Object.entries(MOON_PHASES)
    .filter(([, phase]) => phase.important)
    .sort(([, a], [, b]) => a.exactValue - b.exactValue);

  // Находим первую важную фазу, значение которой больше текущего
  for (const [key, phase] of importantPhases) {
    if (phase.exactValue > currentPhaseValue) {
      return key;
    }
  }

  // Если таких фаз нет (например, текущая фаза 0.8), значит, следующая важная фаза - новолуние (0.0)
  // Возвращаем ключ первой важной фазы в отсортированном списке (это всегда 'NEW')
  return importantPhases[0]?.[0] ?? 'NEW';
};

/**
 * Рассчитывает информацию о следующей важной лунной фазе.
 * @param date - Дата, от которой ведется расчет.
 * @returns Объект с данными о следующей фазе, датой ее наступления и временем до нее.
 */
export const getNextPhase = (date = new Date()) => {
  const currentPhaseValue = getMoonPhase(date);
  const nextPhaseKey = getNextPhaseKey(currentPhaseValue);
  const nextPhaseData = MOON_PHASES[nextPhaseKey] as MoonPhaseData;

  let phaseDifference = nextPhaseData.exactValue - currentPhaseValue;

  // Если разница отрицательная, это означает, что следующая фаза находится в следующем цикле
  // (например, текущая фаза 0.8, а следующая - новолуние 0.0).
  if (phaseDifference < 0) {
    phaseDifference += 1; // Добавляем 1, чтобы "перейти" через нулевую отметку
  }

  // Переводим разницу в фазах в количество дней
  const daysToNext = phaseDifference * SYNODIC_MONTH;
  
  // Рассчитываем точную дату и время следующей фазы
  const nextDate = new Date(date.getTime() + daysToNext * 24 * 60 * 60 * 1000);

  return {
    key: nextPhaseKey,
    nextPhaseData,
    date: nextDate,
    days: Math.floor(daysToNext),
    hours: Math.floor((daysToNext % 1) * 24),
  };
};
