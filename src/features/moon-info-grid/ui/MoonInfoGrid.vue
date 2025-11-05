<script setup lang="ts">
import MoonAgeWidget from '@features/moon-info-widget/ui/MoonAgeWidget.vue';
import MoonCurrentPhaseWidget from '@features/moon-info-widget/ui/MoonCurrentPhaseWidget.vue';
import MoonNextPhaseWidget from '@features/moon-info-widget/ui/MoonNextPhaseWidget.vue';
import MoonZodiacSignWidget from '@features/moon-info-widget/ui/MoonZodiacSignWidget.vue';
</script>

<template>
  <div class="info-overlay">
    <div class="info-content top-left">
      <MoonCurrentPhaseWidget />
    </div>
    <div class="info-content top-right">
      <MoonZodiacSignWidget />
    </div>
    <div class="info-content bottom-left">
      <MoonAgeWidget />
    </div>
    <div class="info-content bottom-right">
      <MoonNextPhaseWidget />
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
