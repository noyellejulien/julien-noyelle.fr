<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

</script>

<template>
    <footer class="nav-footer">
        <div class="nav-footer__left">
            <div class="nav-footer__left__citation">
                <p>Lorem ipsum,</p>
                <p>dolor sit,</p>
                <p>amet</p>
            </div>
            <div class="nav-footer__left__mail">
                <a :href="`mailto:${t('mail')}`">{{ t('mail') }}</a>
            </div>
            <div class="nav-footer__left__extras">
                <div class="nav-footer__left__extras__menu">
                    <a href="#projects" class="nav-footer__left__extras__menu__link">{{ t('projects') }}</a>
                    <a href="#about" class="nav-footer__left__extras__menu__link">{{ t('about') }}</a>
                </div>
                <div class="nav-footer__left__extras__brand">
                    <span>made with ❤️</span>
                </div>
            </div>
        </div>
    </footer>
</template>

<style scoped lang="scss">
@import '../assets/styles/footer.scss';
</style>