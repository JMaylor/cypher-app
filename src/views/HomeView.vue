<script setup lang="ts">
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from "@headlessui/vue";
import { encrypt } from "@/encryption";
import autosize from "autosize";

const modes = ["encrypt", "decrypt"];

const loadInitialState = () => ({
  mode: modes[0],
  input: "For your eyes only.",
  key: "foobar",
  toggle: true,
});
const state = useLocalStorage("state", loadInitialState());
const resetState = () => {
  state.value.mode = "encrypt";
  nextTick(() => (state.value = loadInitialState()));
};

const mode = useLocalStorage("cypherDirection", modes[0]);
const key = useLocalStorage("cypherKey", "foobar");
const toggle = useLocalStorage("toggle", true);

const output = computed(() =>
  encrypt(state.value.input, state.value.key, state.value.mode == "decrypt")
);

watch(
  () => state.value.mode,
  (mode) => {
    if (state.value.toggle)
      state.value.input = encrypt(
        state.value.input,
        state.value.key,
        mode !== "decrypt"
      );
  }
);

const inputTextarea = ref();
const { height } = useElementSize(inputTextarea);

watch([() => state.value.input, inputTextarea], () => {
  autosize(inputTextarea.value);
});

const outputTextarea = ref();
const copyOutput = () => {
  outputTextarea.value.text.select();
  document.execCommand("copy");
};
</script>

<template>
  <button
    class="bg-tertiary rounded py-1 mb-8 px-4 hover:ring transition outline-none focus:ring"
    @click="resetState"
  >
    Reset
  </button>
  <div
    class="flex flex-col lg:flex-row gap-8 items-center lg:items-start justify-center"
  >
    <div class="w-full lg:flex-grow basis-0 shadow rounded bg-white max-w-xl">
      <h1 class="p-2 text-primary text-lg font-bold border-b">Input</h1>
      <textarea
        rows="6"
        class="p-2 resize-none w-full h-full block outline-none overflow-y-hidden focus:ring transition rounded bg-transparent"
        v-model="state.input"
        ref="inputTextarea"
      />
    </div>
    <div class="bg-white rounded shadow max-w-xl w-full lg:w-auto relative">
      <div
        class="h-8 w-8 absolute bg-primary left-1/2 lg:-translate-x-4 top-0 -translate-y-full lg:-left-4 lg:translate-y-2 text-white text-xl flex items-center justify-center"
      >
        +
      </div>
      <div
        class="h-8 w-8 absolute bg-primary left-1/2 lg:left-auto bottom-0 lg:top-0 translate-y-full lg:right-0 lg:translate-x-full lg:translate-y-2 text-white text-xl flex items-center justify-center"
      >
        =
      </div>
      <h1 class="p-2 text-primary text-lg font-bold border-b">Settings</h1>
      <RadioGroup v-model="state.mode" class="p-4 border-b">
        <RadioGroupLabel class="sr-only">Encrypt or Decrypt?</RadioGroupLabel>
        <div class="flex space-x-2 justify-around">
          <RadioGroupOption
            as="template"
            v-for="mode in modes"
            :value="mode"
            v-slot="{ active, checked }"
          >
            <div
              :class="[
                active ? 'ring-2' : '',
                checked ? 'bg-primary bg-opacity-75' : 'bg-white ',
              ]"
              class="px-3 py-1 rounded shadow cursor-pointer focus:outline-none transition text-white"
            >
              <RadioGroupLabel
                as="p"
                :class="checked ? '' : 'text-primary'"
                class="font-medium capitalize"
              >
                {{ mode }}
              </RadioGroupLabel>
            </div>
          </RadioGroupOption>
        </div>
      </RadioGroup>

      <div class="px-4 py-2 space-y-2 border-b flex flex-col">
        <label for="key" class="text-primary uppercase font-bold">Key</label>
        <input class="font-bold outline-none" v-model="state.key" id="key" />
      </div>
      <div class="px-4 py-2 space-x-2 flex items-center">
        <label for="switch" class="text-primary uppercase font-bold"
          >Flip text on mode change?</label
        >
        <input
          v-model="state.toggle"
          type="checkbox"
          name="switch"
          id="switch"
          class="accent-primary cursor-pointer"
        />
      </div>
    </div>
    <div class="w-full lg:flex-grow basis-0 shadow rounded bg-white max-w-xl">
      <div class="flex justify-between items-center border-b p-2">
        <h1 class="text-primary text-lg font-bold">Output</h1>
        <button
          @click="copyOutput"
          class="h-6 w-6 flex justify-center items-center"
        >
          <span class="iconify" data-icon="akar-icons:clipboard"></span>
        </button>
      </div>

      <textarea
        readonly
        :style="{ height: `${height + 16}px` }"
        class="p-2 resize-none w-full h-full block relative outline-none bg-transparent break-all"
        :value="output"
        ref="outputTextarea"
      />
    </div>
  </div>
</template>
