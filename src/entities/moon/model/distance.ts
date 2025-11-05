import { LUNAR_ECCENTRICITY, LUNAR_DISTANCE_KM } from '@shared/lib/astronomy/constants';

/**
 * Рассчитывает примерное расстояние до Луны в километрах на основе текущей фазы.
 * Используется упрощенная формула, учитывающая эллиптическую орбиту.
 * @param phase - Текущее значение фазы Луны (от 0.0 до 1.0).
 * @returns Расстояние до Луны в километрах, округленное до целого числа.
 */
export const getMoonDistance = (phase: number) => {
  // Средняя аномалия - угловое расстояние от перигея до текущего положения Луны.
  const anomaly = (phase * Math.PI * 2);
  
  // Вариация расстояния из-за эллиптичности орбиты.
  const distanceVariation = Math.cos(anomaly) * LUNAR_ECCENTRICITY * LUNAR_DISTANCE_KM;
  const currentDistance = LUNAR_DISTANCE_KM + distanceVariation;
  
  return Math.round(currentDistance);
}
