<script lang="ts" setup>
defineProps<{
  title?: string;
}>();
</script>

<template>
  <CCard class="w-full lg:flex-grow basis-0 max-w-xl">
    <slot name="title">
      <h1 class="p-2 text-primary text-lg font-bold border-b">{{ title }}</h1>
    </slot>
    <slot />
  </CCard>
</template>
