<script setup lang="ts">
import { useMoonData } from '@entities/moon';
import { computed, type PropType } from 'vue';

const props = defineProps({
  date: {
    type: Object as PropType<Date>,
    required: true
  },
  size: {
    type: Number,
    default: 24
  }
});

const moonData = computed(() => useMoonData(props.date));

const emoji = computed(() => moonData.value.currentPhase?.phase.emoji ?? '');
const isHighlighted = computed(() => moonData.value.event !== null);
</script>

<template>
  <div 
    class="moon-phase-icon"
    :class="{
      'moon-phase-icon--highlighted': isHighlighted
    }"
    :style="{
      width: size + 'px',
      height: size + 'px'
    }"
  >
    {{ emoji }}
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
