interface PluralizeOptions {
  one: string;
  few: string;
  many: string;
  other?: string;
}

export const usePluralize = () => {
  const pluralize = (count: number, options: PluralizeOptions): string => {
    const { one, few, many, other } = options;
    
    const lastDigit = count % 10;
    const lastTwoDigits = count % 100;
    
    if (lastDigit === 1 && lastTwoDigits !== 11) {
      return `${count} ${one}`;
    }
    
    if (lastDigit >= 2 && lastDigit <= 4 && !(lastTwoDigits >= 12 && lastTwoDigits <= 14)) {
      return `${count} ${few}`;
    }
    
    return `${count} ${other || many}`;
  };

  return {
    pluralize,
  };
};
