<script setup lang="ts"></script>

<template>
  <div class="mt-32 flex flex-col items-center justify-center gap-32">
    <header class="text-3xl font-medium tracking-wide text-white">
      IP Address Tracker
    </header>

    <input
      class="h-64 w-full max-w-[560px] rounded-xl border-2 border-white px-24 py-18 transition-all duration-300 hover:translate-y-4 hover:scale-105 hover:border-grey hover:shadow-lg focus:outline-none focus:ring-0"
      placeholder="Search for any IP address or domain"
    />
  </div>
  <main>
    <section>
      <ul class="flex">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </section>
  </main>
</template>

<style></style>
