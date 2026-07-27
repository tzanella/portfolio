<template>
  <div></div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  navigateTo('/', { replace: true })
})
</script>
