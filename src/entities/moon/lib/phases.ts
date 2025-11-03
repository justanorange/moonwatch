export interface MoonPhase {
  name: string;
  range: [number, number];
  description: string;
  emoji: string;
}

export interface MoonPhases {
  [key: string]: MoonPhase;
}

export const MOON_PHASES: MoonPhases = {
  NEW: {
    name: 'Новолуние',
    range: [0, 0.03],
    description: 'Луна не видна',
    emoji: '🌑'
  },
  WAXING_CRESCENT: {
    name: 'Растущий серп', 
    range: [0.03, 0.23],
    description: 'Тонкий серп растущей луны',
    emoji: '🌒'
  },
  FIRST_QUARTER: {
    name: 'Первая четверть',
    range: [0.23, 0.27],
    description: 'Освещена правая половина',
    emoji: '🌓'
  },
  WAXING_GIBBOUS: {
    name: 'Прибывающая луна',
    range: [0.27, 0.47],
    description: 'Больше половины освещено',
    emoji: '🌔'
  },
  FULL: {
    name: 'Полнолуние',
    range: [0.47, 0.53],
    description: 'Полностью освещена',
    emoji: '🌕'
  },
  WANING_GIBBOUS: {
    name: 'Убывающая луна', 
    range: [0.53, 0.72],
    description: 'Начинает уменьшаться',
    emoji: '🌖'
  },
  LAST_QUARTER: {
    name: 'Последняя четверть',
    range: [0.72, 0.77],
    description: 'Освещена левая половина',
    emoji: '🌗'
  },
  WANING_CRESCENT: {
    name: 'Старая луна',
    range: [0.77, 0.97],
    description: 'Тонкий серп перед новолунием',
    emoji: '🌘'
  }
};

export const MOON_PHASE_KEYS = Object.keys(MOON_PHASES);
