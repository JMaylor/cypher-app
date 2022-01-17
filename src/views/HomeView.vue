<script setup lang="ts">
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from "@headlessui/vue";
import { encrypt } from "@/encryption";

const modes = ["encrypt", "decrypt"];

const mode = useLocalStorage("cypherDirection", modes[0]);
const input = useLocalStorage("input", "For your eyes only.");
const key = useLocalStorage("cypherKey", "foobar");
const toggle = useLocalStorage("toggle", true);

const output = computed(() =>
  encrypt(input.value, key.value, mode.value == "decrypt")
);

watch(mode, (mode) => {
  if (toggle.value)
    input.value = encrypt(input.value, key.value, mode != "decrypt");
});
</script>

<template>
  <div class="mb-2 space-y-2">
    <label for="key">Encryption key</label><br />
    <input class="rounded p-2" v-model="key" id="key" />
  </div>
  <div class="mb-2 space-x-2 flex items-center">
    <label class="cursor-pointer" for="switch">Switch text on toggle?</label>
    <input
      v-model="toggle"
      type="checkbox"
      name="switch"
      id="switch"
      class="accent-emerald-500 cursor-pointer"
    />
  </div>
  <!-- <button class="px-2 py-1 bg-emerald-500 text-black rounded mb-2">
    Delete My Data
  </button> -->
  <div class="flex flex-col lg:flex-row w-full gap-2">
    <c-textarea v-model="input" title="input" />
    <RadioGroup v-model="mode">
      <RadioGroupLabel class="sr-only">Encrypt or Decrypt</RadioGroupLabel>
      <div class="flex space-x-2">
        <RadioGroupOption
          as="template"
          v-for="mode in modes"
          :value="mode"
          v-slot="{ active, checked }"
        >
          <div
            :class="[
              active
                ? 'ring-2 ring-offset-2 ring-offset-sky-300 ring-white ring-opacity-60'
                : '',
              checked ? 'bg-sky-900 bg-opacity-75 text-white ' : 'bg-white ',
            ]"
            class="relative flex px-5 py-4 rounded-lg shadow-md cursor-pointer focus:outline-none transition"
          >
            <div class="flex items-center justify-between w-full">
              <div class="flex items-center">
                <div class="text-sm">
                  <RadioGroupLabel
                    as="p"
                    :class="checked ? 'text-slate-100' : 'text-slate-900'"
                    class="font-medium capitalize"
                  >
                    {{ mode }}
                  </RadioGroupLabel>
                </div>
              </div>
            </div>
          </div>
        </RadioGroupOption>
      </div>
    </RadioGroup>
    <c-textarea
      :value="output"
      readonly
      class="cursor-default"
      :title="`${mode}ed message`"
    />
  </div>
</template>
