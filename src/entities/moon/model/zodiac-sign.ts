import { SIDEREAL_MONTH } from '@shared/lib/astronomy/constants';
import { daysBetween } from '@shared/lib/dates/calculations';

/**
 * Массив объектов, представляющих знаки зодиака.
 * Используется для определения положения Луны.
 */
export const SIGNS = [
  { 
    name: 'Овен',
    emoji: '♈',
    symbol: '🐏',
    element: 'Огонь'
  },
  { 
    name: 'Телец',
    emoji: '♉', 
    symbol: '🐂',
    element: 'Земля'
  },
  { 
    name: 'Близнецы',
    emoji: '♊',
    symbol: '👬',
    element: 'Воздух'
  },
  { 
    name: 'Рак',
    emoji: '♋',
    symbol: '🦀',
    element: 'Вода'
  },
  { 
    name: 'Лев',
    emoji: '♌',
    symbol: '🦁',
    element: 'Огонь'
  },
  { 
    name: 'Дева',
    emoji: '♍',
    symbol: '🌾',
    element: 'Земля'
  },
  { 
    name: 'Весы',
    emoji: '♎',
    symbol: '⚖️',
    element: 'Воздух'
  },
  { 
    name: 'Скорпион',
    emoji: '♏',
    symbol: '🦂',
    element: 'Вода'
  },
  { 
    name: 'Стрелец',
    emoji: '♐',
    symbol: '🏹',
    element: 'Огонь'
  },
  { 
    name: 'Козерог',
    emoji: '♑',
    symbol: '🐐',
    element: 'Земля'
  },
  { 
    name: 'Водолей',
    emoji: '♒',
    symbol: '💧',
    element: 'Воздух'
  },
  { 
    name: 'Рыбы',
    emoji: '♓',
    symbol: '🐠',
    element: 'Вода'
  }
];

/**
 * Определяет знак зодиака, в котором находится Луна в указанную дату.
 * Расчет основан на сидерическом месяце.
 * @param date - Дата, для которой производится расчет.
 * @returns Объект, представляющий знак зодиака.
 */
export const getMoonZodiacSign = (date = new Date()) => {
  // Точка отсчета: известная дата, когда Луна была в Овне.
  const knownMoonInAries = new Date(Date.UTC(2000, 0, 1, 0, 0));
  
  const daysFromAries = daysBetween(date, knownMoonInAries);
  // Определяем индекс знака, основываясь на прошедшем времени и длине сидерического месяца.
  const signIndex = Math.floor((daysFromAries % SIDEREAL_MONTH) / SIDEREAL_MONTH * 12);
  
  return SIGNS[signIndex];
}
