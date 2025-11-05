<script setup lang="ts">
import { useMoonData } from '@entities/moon';
import { pluralizeDays } from '@shared/lib/pluralize/pluralize-days';

const moonData = useMoonData();
</script>

<template>
  🕒 {{ pluralizeDays(Math.floor(moonData.age)) }}
</template>
