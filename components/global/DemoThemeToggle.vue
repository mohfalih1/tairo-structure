
<script setup lang="ts">
import { ref } from 'vue'

const isDark = ref(localStorage.getItem('dark') === 'true')

const toggleDarkMode = () => {
  isDark.value = !isDark.value
  localStorage.setItem('dark', isDark.value ? 'true' : 'false')
  document.documentElement.classList.toggle('dark', isDark.value)
}
</script>
<template>
  <BaseThemeToggle @click="toggleDarkMode" ></BaseThemeToggle>
</template>
