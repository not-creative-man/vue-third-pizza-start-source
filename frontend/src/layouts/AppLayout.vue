<template>
  <div class="app_layout">
    <app-header></app-header>
    <main class="content">
      <slot></slot>
    </main>
  </div>
</template>

<script setup>
import AppHeader from "./AppHeader.vue";
</script>