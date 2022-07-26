import { createApp, h } from "vue";
import { createI18n, useI18n } from "vue-i18n";
import App from "./App.vue";

import en from './locales/en.json'
import fr from './locales/fr.json'

const locales = { en, fr };

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: navigator.language.split('-')[0],
  fallbackLocale: 'en',
  messages: (locales),
});

const app = createApp({
  render: () => h(App),
  setup() {
    const { t } = useI18n() // call `useI18n`, and spread `t` from  `useI18n` returning
    return { t } // return render context that included `t`
  }
});

app.use(i18n);
app.mount("#app");
