import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import ToastService from 'primevue/toastservice'

import App from './App.vue'

const app = createApp(App)

app.use(createPinia())
app.use(ToastService)

app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
})

app.mount('#app')
