<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
    <div class="about">{{ t('about') }}</div>
</template>

<style scoped lang="scss">
@import '../assets/styles/about.scss';
</style>