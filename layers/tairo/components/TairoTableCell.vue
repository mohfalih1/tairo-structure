<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    light?: boolean
    spaced?: boolean
  }>(),
  {
    light: false,
    spaced: false,
  },
)
</script>

<template>
  <td
    class="font-alt whitespace-nowrap bg-transparent text-center text-sm"
    :class="[
      props.light
        ? 'text-muted-950 dark:text-white'
        : 'text-muted-950 dark:text-white',
      props.spaced ? 'p-4' : 'py-4',
    ]"
  >
    <slot />
  </td>
</template>
