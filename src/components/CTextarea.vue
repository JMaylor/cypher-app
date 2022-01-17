<script lang="ts" setup>
import autosize from "autosize";

const props = defineProps<{
  modelValue?: string;
  title: string;
}>();

const input = ref();
watch(
  () => props.modelValue,
  () => {
    autosize(input.value);
  }
);
setTimeout(() => {
  autosize(input.value);
}, 0);

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

function onInput(event: InputEvent) {
  emit("update:modelValue", (<HTMLTextAreaElement>event.target).value);
}
</script>

<template>
  <div class="flex flex-col flex-grow divide-y divide-slate-500 shadow">
    <div class="w-full p-2 bg-white rounded-t font-bold capitalize">
      {{ title }}
    </div>
    <textarea
      ref="input"
      class="bg-white flex-grow resize-none rounded-b p-2"
      @input="onInput($event as InputEvent)"
      :value="modelValue"
      v-bind="$attrs"
    />
  </div>
</template>
