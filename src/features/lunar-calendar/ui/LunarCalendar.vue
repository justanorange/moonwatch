<script setup lang="ts">
import MoonPhaseIcon from './MoonPhaseIcon.vue';
import { useCalendar } from '../lib/use-calendar';

const {
  weekDays,
  currentMonthYear,
  calendarDays,
  prevMonth,
  nextMonth,
  selectDate,
} = useCalendar();
</script>
<template>
  <div class="lunar-calendar">
    <div class="calendar-header">
      <button @click="prevMonth" class="nav-button">‹</button>
      <h2>{{ currentMonthYear }}</h2>
      <button @click="nextMonth" class="nav-button">›</button>
    </div>

    <div class="week-days">
      <div v-for="day in weekDays" :key="day" class="week-day">
        {{ day }}
      </div>
    </div>

    <div class="calendar-grid">
      <div 
        v-for="day in calendarDays" 
        :key="day.date.toString()"
        :class="[
          'calendar-day',
          { 
            'current-month': day.isCurrentMonth,
            'today': day.isToday,
            'selected': day.isSelected
          }
        ]"
        @click="selectDate(day.date)"
      >
        <div class="day-number">{{ day.dayNumber }}</div>
        <div class="moon-phase">
          <MoonPhaseIcon 
            :date="day.date"
            :size="12" 
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.lunar-calendar {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  margin: 0 20px 20px;
  font-family: Arial, sans-serif;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}

.calendar-header h2 {
  margin: 0;
  text-transform: uppercase;
  font-size: 16px;
  font-weight: bold;
}

.nav-button {
  color: #fff;
  background: none;
  border: none;
  width: 28px;
  height: 28px;
  line-height: 1;
  cursor: pointer;
  font-size: 18px;
}

.week-days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  margin-bottom: 4px;
}

.week-day {
  text-align: center;
  font-weight: bold;
  font-size: 12px;
  color: #aaa;
}

.calendar-grid {
  flex: 1;
  gap: 2px;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}

.calendar-day {
  padding: 4px;
  text-align: center;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
}

.calendar-day.current-month {
  color: #fff;
  background: #333;
}

.calendar-day:not(.current-month) {
  color: #ccc;
  opacity: 0.5;
}

.calendar-day.today {
  background: #ffe899;
  color: #333;
}

.calendar-day.selected {
  background: #f6efd7;
  color: #000;
}

.day-number {
  font-size: 12px;
  line-height: 1.1;
  font-weight: bold;
  margin-bottom: 4px;
}

.moon-phase {
  margin: 2px 0;
}
</style>