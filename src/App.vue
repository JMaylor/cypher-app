<template>
  <header class="w-full shadow sticky bg-white top-0 z-50 p-4">
    <div class="space-x-2 flex items-center">
      <CypherLogo class="h-10" />
      <h1 class="text-xl font-medium">Cypher</h1>
    </div>
  </header>
  <main class="flex-grow bg-slate-100 p-8"><router-view /></main>
  <footer class="w-full bg-red-200">Made in 2022</footer>
</template>
