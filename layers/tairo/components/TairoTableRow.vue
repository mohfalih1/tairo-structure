<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    hoverable?: boolean
  }>(),
  {
    hoverable: false,
  },
)
</script>

<template>
  <tr :class="[
    props.hoverable
      ? 'bg-transparent hover:bg-muted-50 dark:hover:bg-primary-400 transition-colors duration-300 '
      : 'bg-transparent',
  ]">
    <slot />
  </tr>
</template>
