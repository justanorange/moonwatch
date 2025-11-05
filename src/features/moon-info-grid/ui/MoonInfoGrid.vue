<script setup lang="ts">
import Age from '@features/moon-info-widgets/ui/Age.vue';
import CurrentPhase from '@features/moon-info-widgets/ui/CurrentPhase.vue';
import NextPhase from '@features/moon-info-widgets/ui/NextPhase.vue';
import ZodiacSign from '@features/moon-info-widgets/ui/ZodiacSign.vue';
import { useMoonData } from '@entities/moon/lib/use-moon-data';

const moonData = useMoonData();
</script>

<template>
  <div class="info-overlay">
    <div class="info-content top-left">
      <CurrentPhase :moonData="moonData" />
    </div>
    <div class="info-content top-right">
      <ZodiacSign :moonData="moonData" />
    </div>
    <div class="info-content bottom-left">
      <Age :moonData="moonData" />
    </div>
    <div class="info-content bottom-right">
      <NextPhase :moonData="moonData" />
    </div>
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
