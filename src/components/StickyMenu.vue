<script setup lang="ts">
import { computed, onMounted, ref, type ComputedRef } from 'vue';
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps(['burgerIsActive', 'wWidth', 'wHeight']);

const viewHeight = ref(0);

const headerHeight = ref(0);

const stickyMenuBg = computed(() => {
    const header = document.querySelector('header');
    if (header != null) {
        const headerStyle = window.getComputedStyle(header, null);
        headerHeight.value = parseFloat(headerStyle.height);
        
        viewHeight.value = props.wHeight - headerHeight.value - parseFloat(headerStyle.paddingTop);
    }
    return props.burgerIsActive ? { 'top': `${headerHeight.value}px`, 'height': `${viewHeight.value}px` } : { 'top': `${headerHeight.value}px` };
})

</script>

<template>
    <div class="nav-header__sticky-menu">
        <div class="sticky-menu__background" :class="{ hidden: !burgerIsActive }" :style="stickyMenuBg"></div>
        <div class="sticky-menu__content" :class="{ hidden: !burgerIsActive }"
            :style="{ 'top': `${headerHeight}px`, 'height': `${viewHeight}px` }">
            <div class="sticky-menu__content__left">
                <div class="sticky-menu__content__left__links">
                    <a href="#projects" class="sticky-menu__content__left__links__link">{{ t('projects') }}</a>
                    <a href="#about" class="sticky-menu__content__left__links__link">{{ t('about') }}</a>
                </div>
                <div class="sticky-menu__content__left__extras">
                    <div class="sticky-menu__content__left__extras__brand">
                        <span>made with ❤️</span>
                    </div>
                </div>
            </div>
            <div class="sticky-menu__content__right">
                <div class="sticky-menu__content__right__sweets">
                    <div class="sticky-menu__content__right__sweet sweet__image">
                        <img src="../assets/images/img_01.webp" alt="">
                    </div>
                    <p class="sticky-menu__content__right__sweet sweet__text"></p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import '../assets/styles/sticky_menu.scss';
</style>