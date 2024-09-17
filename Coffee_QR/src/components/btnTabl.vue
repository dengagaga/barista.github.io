<script setup>
import { ref } from 'vue'

</script>
<template>
        <button class="tabl_btn" ><slot></slot></button>
</template>
<style>
.tabl_btn {
    color: #e9e9e9;
    font-size: 14px;
    font-weight: 700;
    width: 33%;
}
.active {
    color: var(--btn-color);
}
</style>