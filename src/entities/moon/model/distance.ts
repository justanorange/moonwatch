import { LUNAR_ECCENTRICITY, LUNAR_DISTANCE_KM } from '@shared/lib/astronomy/constants';

export const getMoonDistance = (phase: number) => {
  const anomaly = (phase * Math.PI * 2); // средняя аномалия
  
  // Упрощенная формула с учетом эллиптичности орбиты
  const distanceVariation = Math.cos(anomaly) * LUNAR_ECCENTRICITY * LUNAR_DISTANCE_KM;
  const currentDistance = LUNAR_DISTANCE_KM + distanceVariation;
  
  return Math.round(currentDistance);
}
