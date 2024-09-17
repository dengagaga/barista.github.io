<script setup>
defineProps({
  title: String
})
</script>
<template>
  <div class="main_top-info">
    <h3>{{ title }}:</h3>
    <slot></slot>
  </div>
</template>
<style>
.main_top-info {
  padding-top: 15px;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
}
</style>
