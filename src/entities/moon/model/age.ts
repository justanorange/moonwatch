import { daysBetween } from '@shared/lib/dates/calculations';
import { SYNODIC_MONTH, KNOWN_NEW_MOON } from '@shared/lib/astronomy/constants';

/**
 * Рассчитывает возраст Луны в днях с момента последнего новолуния.
 * @param date - Дата, для которой производится расчет.
 * @returns Возраст луны в днях, округленный до одного знака после запятой.
 */
export const getMoonAge = (date = new Date()) => {
  const daysSinceNewMoon = daysBetween(date, KNOWN_NEW_MOON);
  const age = daysSinceNewMoon % SYNODIC_MONTH;
  return Number(age.toFixed(1));
}
