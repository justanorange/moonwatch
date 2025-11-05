<script setup lang="ts">
import type { useMoonData } from '@entities/moon/lib/use-moon-data';

const props = defineProps<{
  moonData: ReturnType<typeof useMoonData>;
}>();
const moonData = props.moonData;
</script>

<template>
  {{ moonData?.zodiacSign?.emoji }} {{ moonData?.zodiacSign?.name }}
</template>
