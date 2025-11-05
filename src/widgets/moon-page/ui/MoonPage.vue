<script setup lang="ts">
import MoonPhase from '@features/moon-phase-display/ui/MoonPhase.vue'
import MoonInfoGrid from '@features/moon-info-grid/ui/MoonInfoGrid.vue';
import LunarCalendar from '@features/lunar-calendar/ui/LunarCalendar.vue';
</script>

<template>
  <div class="moon-page">
    <div class="moon-section">
      <MoonPhase />
      <MoonInfoGrid />
    </div>

    <LunarCalendar />
  </div>
</template>

<style scoped>
.moon-page {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.moon-section {
  position: relative;
  width: 100%;
  aspect-ratio: 6 / 5;
  flex-shrink: 0;
}
</style>
