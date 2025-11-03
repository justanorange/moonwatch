<script setup lang="ts">
import { useMoonData } from '@entities/moon/lib/use-moon-data';

const moonData = useMoonData();
</script>

<template>
  <div class="moon-phase">
    {{ moonData?.phaseData?.emoji }}
  </div>
</template>

<style scoped>

.moon-phase {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 50dvw;
}
</style>
