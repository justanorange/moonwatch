<script setup lang="ts">
import { useMoonData } from '@entities/moon';
import { computed } from 'vue';
import { LUNAR_DISTANCE_KM, LUNAR_ECCENTRICITY } from '@shared/lib/astronomy/constants';

const moonData = useMoonData();

const isSupermoon = computed(() => {
  if (!moonData) return false;
  const isFull = moonData.currentPhase?.key === 'FULL';
  if (!isFull) return false;
  const dist = moonData.moonDistance;
  if (typeof dist !== 'number') return false;

  const perigee = LUNAR_DISTANCE_KM * (1 - LUNAR_ECCENTRICITY);
  return dist <= perigee + 1000;
});
</script>

<template>
  <span>
    <span v-if="isSupermoon" class="supermoon">🌕✨</span>
    {{ moonData?.currentPhase?.phase.name }}
  </span>
</template>

<style scoped>
.supermoon {
  font-size: 0.9em;
}
</style>
