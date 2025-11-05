import { usePluralize } from './use-pluralize';

const { pluralize } = usePluralize();

export const pluralizeDays = (count: number): string => {
  return pluralize(count, {
    one: 'день',
    few: 'дня', 
    many: 'дней'
  });
};
