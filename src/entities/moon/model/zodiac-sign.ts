import { SIDEREAL_MONTH } from '@shared/lib/astronomy/constants';
import { daysBetween } from '@shared/lib/dates/calculations';

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

export const getMoonZodiacSign = (date = new Date()) => {
  const knownMoonInAries = new Date(Date.UTC(2000, 0, 1, 0, 0)); // Луна в Овне
  
  const daysFromAries = daysBetween(date, knownMoonInAries);
  const signIndex = Math.floor((daysFromAries % SIDEREAL_MONTH) / SIDEREAL_MONTH * 12);
  
  return SIGNS[signIndex];
}
