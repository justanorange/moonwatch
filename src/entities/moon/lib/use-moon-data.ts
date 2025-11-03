import {
  getMoonPhase,
  getPhaseByValue,
  getNextPhase,
  getMoonAge,
  getMoonZodiacSign,
  getMoonDistance,
  getMoonIllumination,
} from '../model';

export const useMoonData = (date = new Date()) => {
  const phase = getMoonPhase(date);
  
  return {
    phase,
    phaseData: getPhaseByValue(phase),
    nextPhase: getNextPhase(date),
    age: getMoonAge(date),
    zodiacSign: getMoonZodiacSign(date),
    moonDistance: getMoonDistance(phase),
    moonIllumination: getMoonIllumination(phase),
  };
};
