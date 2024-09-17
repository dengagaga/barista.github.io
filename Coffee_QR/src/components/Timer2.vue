<template>
  <div>
    <p>{{ formattedTime }}</p>
  </div>
</template>

<script setup>
defineProps({
  formattedTime: String
})
</script>
