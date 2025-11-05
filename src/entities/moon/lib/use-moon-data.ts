import {
  getMoonPhase,
  getDayPhaseInfo,
  getNextPhase,
  getMoonAge,
  getMoonZodiacSign,
  getMoonDistance,
  getMoonIllumination,
} from '../model';

export const useMoonData = (date = new Date()) => {
  const phaseInfo = getDayPhaseInfo(date);
  const currentPhase = getMoonPhase(date);
  
  return {
    // Данные о текущей фазе и событиях
    ...phaseInfo,
    // Дополнительная информация о луне
    nextPhase: getNextPhase(date),
    age: getMoonAge(date),
    zodiacSign: getMoonZodiacSign(date),
    moonDistance: getMoonDistance(currentPhase),
    moonIllumination: getMoonIllumination(currentPhase),
  };
};
