<script setup lang="ts">
import { useMoonData } from '@entities/moon';

const moonData = useMoonData();
</script>

<template>
  📐 {{ Math.floor(moonData?.moonDistance) }}
</template>
