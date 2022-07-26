<script setup lang="ts">
defineProps(["project", "wWidth", "wHeight"]);
</script>

<template>
  <div class="project-container">
    <div :style="{ width: `${wWidth}px` }">
      <h1>Projet {{ project.id }} - {{ project.title }}</h1>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../assets/styles/project.scss";
</style>
