<script setup lang="ts">
import { useMoonData } from '@entities/moon';

const moonData = useMoonData();
</script>

<template>
  {{ moonData?.zodiacSign?.emoji }} {{ moonData?.zodiacSign?.name }}
</template>
