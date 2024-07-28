<script setup>
defineProps({ width: { type: Number, default: 11 }, height: { type: Number, default: 11 } })
</script>

<template>
  <svg xmlns="http://www.w3.org/2000/svg" :width="width" :height="height">
    <path fill="none" stroke="#FFF" stroke-width="2" d="M1 4.304L3.696 7l6-6" />
  </svg>
</template>

<style scoped></style>
