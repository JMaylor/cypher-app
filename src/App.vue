<script setup lang="ts">
// const open = ref(false);
</script>

<template>
  <div class="h-full bg-slate-200 text-slate-900 font-mono">
    <header class="w-full h-14 shadow fixed bg-white top-0 z-50">
      <div
        class="px-4 md:px-8 lg:px-16 py-2 flex items-center justify-between mx-auto w-full"
      >
        <div class="space-x-2 flex items-center">
          <CypherLogo class="h-10" />
          <h1 class="text-2xl font-bold">Cypher</h1>
        </div>
      </div>
    </header>

    <div class="flex flex-col min-h-full pt-14">
      <main class="flex-grow mx-auto w-full p-4 md:p-8 lg:px-16">
        <router-view />
      </main>
      <footer class="w-full p-2">
        <div
          class="w-full max-w-screen-2xl mx-auto text-center flex items-center justify-center h-full"
        >
          Made in 2022
        </div>
      </footer>
    </div>
  </div>
</template>
