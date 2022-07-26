<script setup lang="ts">

import { ref, type Ref } from 'vue';
import StickyMenu from './StickyMenu.vue';
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const doc = document.documentElement;
const props = defineProps(['wWidth', 'wHeight'])
const burgerIsActive : Ref<boolean> = ref(false);

</script>

<template>
    <header class="nav-header" ref="test">
        <div class="nav-header__brand">
            <a class="notanimated" href="#" @click.prevent="doc.toggleAttribute('data-color-scheme-dark')">{{
                    t('brand')
            }}</a>
        </div>
        <div class="nav-header__menu">
            <div class="nav-header__menu__links" :class="{ hidden: burgerIsActive }">
                <a href="#projects" class="nav-header__menu__links__link">{{ t("projects") }}</a>
                <a href="#about" class="nav-header__menu__links__link">{{ t("about") }}</a>
            </div>
            <div class="nav-header__menu__burger" :class="{ active: burgerIsActive }"
                @click="burgerIsActive = burgerIsActive ? false : true">
                <div class="nav-header__menu__burger__line"></div>
                <div class="nav-header__menu__burger__line"></div>
                <div class="nav-header__menu__burger__line"></div>
            </div>
        </div>


        <StickyMenu :burgerIsActive="burgerIsActive" :wWidth="wWidth" :wHeight="wHeight"  />

    </header>


</template>

<style scoped lang="scss">
@import '../assets/styles/header.scss';
</style>