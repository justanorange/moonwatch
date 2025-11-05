<script setup lang="ts">
import type { useMoonData } from '@entities/moon/lib/use-moon-data';
import { pluralizeDays } from '@shared/lib/pluralize/pluralize-days';

const props = defineProps<{
  moonData: ReturnType<typeof useMoonData>;
}>();
const moonData = props.moonData;
</script>

<template>
  🕒 {{ pluralizeDays(Math.floor(moonData.age)) }}
</template>
