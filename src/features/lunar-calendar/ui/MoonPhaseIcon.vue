<script setup lang="ts">
import { getPhaseByValue } from '@entities/moon';
import { computed } from 'vue';

const props = defineProps({
  phase: {
    type: Number,
    required: true
  },
  size: {
    type: Number,
    default: 24
  }
});

const phaseData = computed(() => {
  return getPhaseByValue(props.phase);
});
</script>

<template>
  <div 
    class="moon-phase-icon"
    :class="{
      'moon-phase-icon--highlighted': phase >= 0.97 || phase <= 0.03 || (phase >= 0.47 && phase <= 0.53)
    }"
    :style="{
      width: size + 'px',
      height: size + 'px'
    }"
  >
    {{ phaseData?.emoji }}
  </div>
</template>

<style scoped>
.moon-phase-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  filter: grayscale(0.75);
}

.moon-phase-icon--highlighted {
  filter: grayscale(0);
}
</style>
