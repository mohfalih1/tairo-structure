<script setup lang="ts">
  const props = defineProps<{
    label?:string
    size?: 'sm'|'md'|'lg'
  }>()
  const model = defineModel()
</script>
<template>
  <BaseTextarea
    :size="props.size ?? 'md'"
    :label="props.label"
    :placeholder="props.label"
    v-model="model"
  />
</template>
