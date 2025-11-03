<script setup lang="ts">
import { useMoonData } from '@entities/moon/lib/use-moon-data';
import { usePluralize } from '@shared/lib/pluralize/use-pluralize';

const moonData = useMoonData();
const { pluralize } = usePluralize();

const pluralizeDays = (count: number): string => {
  return pluralize(count, {
    one: 'день',
    few: 'дня', 
    many: 'дней'
  });
};
</script>

<template>
  <div class="info-overlay">
    <div class="info-content top-left">
      <div>{{ moonData?.phaseData?.name }}</div>
    </div>
    <div class="info-content top-right">
      <div>{{ moonData?.zodiacSign?.emoji }} {{ moonData?.zodiacSign?.name }}</div>
    </div>
    <div class="info-content bottom-left">
      <div>🕒 {{ pluralizeDays(Math.floor(moonData.age)) }}</div>
    </div>
    <div class="info-content bottom-right">{{ moonData?.nextPhase?.nextPhaseData?.emoji }} через {{ pluralizeDays(moonData.nextPhase.days) }}</div>
  </div>
</template>

<style scoped>
.info-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  padding: 20px;
  box-sizing: border-box;
}

.info-content {
  border-radius: 12px;
  max-width: 140px;
  font-size: 14px;
}

.top-left {
  justify-self: start;
  align-self: start;
}

.top-right {
  justify-self: end;
  align-self: start;
}

.bottom-left {
  justify-self: start;
  align-self: end;
}

.bottom-right {
  justify-self: end;
  align-self: end;
}
</style>
