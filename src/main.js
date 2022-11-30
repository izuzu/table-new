import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import axios from 'axios'



// export const bus = new Vue();

import './assets/main.css'

import mitt from 'mitt';
const emitter = mitt();

const app = createApp(App)
app.config.globalProperties.emitter = emitter;
app.config.globalProperties.axios=axios


app.use(createPinia())

app.mount('#app')


