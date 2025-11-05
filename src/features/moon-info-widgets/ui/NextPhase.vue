<script setup lang="ts">
import type { useMoonData } from '@entities/moon/lib/use-moon-data';
import { pluralizeDays } from '@shared/lib/pluralize/pluralize-days';

const props = defineProps<{
  moonData: ReturnType<typeof useMoonData>;
}>();
const moonData = props.moonData;

const getNextPhaseInfo = () => {
  if (!moonData.nextPhase || !moonData.nextPhase.nextPhaseData) {
    return '';
  }
  const date = moonData.nextPhase.date;
  const today = new Date();
  const isToday = date.getDate() === today.getDate() && 
                  date.getMonth() === today.getMonth() && 
                  date.getFullYear() === today.getFullYear();
  const hours = date.getHours();
  const mins = date.getMinutes().toString().padStart(2, '0');
  
  if (isToday) {
    return `${moonData.nextPhase.nextPhaseData.emoji} в ${hours}:${mins}`;
  } else if (moonData.nextPhase.days <= 1) {
    return `${moonData.nextPhase.nextPhaseData.emoji} ${date.toLocaleDateString('ru-RU', { month: 'long', day: 'numeric' })} в ${hours}:${mins}`;
  }
  return `${moonData.nextPhase.nextPhaseData.emoji} через ${pluralizeDays(moonData.nextPhase.days)}`;
};
</script>

<template>
  {{ getNextPhaseInfo() }}
</template>
