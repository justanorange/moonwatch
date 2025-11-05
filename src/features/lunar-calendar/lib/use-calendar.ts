import { ref, computed } from 'vue';
import type { CalendarDay } from '../model/types';

// Константа для количества ячеек в сетке календаря (6 недель по 7 дней)
const CALENDAR_GRID_CELLS = 42;

export const useCalendar = () => {
  const currentDate = ref(new Date());
  const selectedDate = ref(new Date());

  const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

  const currentMonthYear = computed(() => {
    return currentDate.value.toLocaleDateString('ru-RU', {
      month: 'long',
      year: 'numeric'
    });
  });

  const createCalendarDay = (date: Date, isCurrentMonth: boolean): CalendarDay => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return {
      date,
      dayNumber: date.getDate(),
      isCurrentMonth,
      isToday: date.getTime() === today.getTime(),
      isSelected: date.getTime() === selectedDate.value.getTime()
    };
  };

  const calendarDays = computed(() => {
    const year = currentDate.value.getFullYear();
    const month = currentDate.value.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    // День недели первого дня месяца (0 - Вс, 1 - Пн, ..., 6 - Сб)
    // Приводим к европейскому стандарту (1 - Пн, ..., 7 - Вс)
    const firstDayOfWeek = firstDay.getDay() === 0 ? 7 : firstDay.getDay();

    const days: CalendarDay[] = [];

    // Добавляем дни из предыдущего месяца
    for (let i = 1; i < firstDayOfWeek; i++) {
      const date = new Date(year, month, 1 - (firstDayOfWeek - i));
      days.push(createCalendarDay(date, false));
    }

    // Добавляем дни текущего месяца
    for (let day = 1; day <= lastDay.getDate(); day++) {
      const date = new Date(year, month, day);
      days.push(createCalendarDay(date, true));
    }

    // Добавляем дни из следующего месяца
    const nextMonthDaysCount = CALENDAR_GRID_CELLS - days.length;
    for (let day = 1; day <= nextMonthDaysCount; day++) {
      const date = new Date(year, month + 1, day);
      days.push(createCalendarDay(date, false));
    }

    return days;
  });

  const prevMonth = () => {
    currentDate.value = new Date(
      currentDate.value.getFullYear(),
      currentDate.value.getMonth() - 1,
      1
    );
  };

  const nextMonth = () => {
    currentDate.value = new Date(
      currentDate.value.getFullYear(),
      currentDate.value.getMonth() + 1,
      1
    );
  };

  const selectDate = (date: Date) => {
    selectedDate.value = date;
  };

  return {
    weekDays,
    currentMonthYear,
    calendarDays,
    selectedDate,
    prevMonth,
    nextMonth,
    selectDate,
  };
};
