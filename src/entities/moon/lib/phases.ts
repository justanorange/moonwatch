export interface MoonPhaseData {
  name: string;
  description: string;
  emoji: string;
  important?: boolean;
  exactValue: number;
  range: [number, number];
}

export const MOON_PHASES: Record<string, MoonPhaseData> = {
  NEW: {
    name: 'Новолуние',
    description: 'Новолуние',
    emoji: '🌑',
    important: true,
    exactValue: 0.0,
    range: [0.96, 0.04],
  },
  WAXING_CRESCENT: {
    name: 'Растущий серп',
    description: 'Тонкий серп растущей луны',
    emoji: '🌒',
    exactValue: 0.125,
    range: [0.04, 0.21],
  },
  FIRST_QUARTER: {
    name: 'Первая четверть',
    description: 'Освещена правая половина',
    emoji: '🌓',
    exactValue: 0.25,
    range: [0.21, 0.29],
  },
  WAXING_GIBBOUS: {
    name: 'Прибывающая луна',
    description: 'Больше половины освещено',
    emoji: '🌔',
    exactValue: 0.375,
    range: [0.29, 0.46],
  },
  FULL: {
    name: 'Полнолуние',
    description: 'Полностью освещена',
    emoji: '🌕',
    important: true,
    exactValue: 0.5,
    range: [0.46, 0.54],
  },
  WANING_GIBBOUS: {
    name: 'Убывающая луна',
    description: 'Начинает уменьшаться',
    emoji: '🌖',
    exactValue: 0.625,
    range: [0.54, 0.71],
  },
  LAST_QUARTER: {
    name: 'Последняя четверть',
    description: 'Освещена левая половина',
    emoji: '🌗',
    exactValue: 0.75,
    range: [0.71, 0.79],
  },
  WANING_CRESCENT: {
    name: 'Старая луна',
    description: 'Тонкий серп перед новолунием',
    emoji: '🌘',
    exactValue: 0.875,
    range: [0.79, 0.96],
  }
};

export const MOON_PHASE_KEYS = Object.keys(MOON_PHASES);
