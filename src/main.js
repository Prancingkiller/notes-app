import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import Modal from 'vue-bs-modal'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

createApp(App).use(router).use(Modal).mount('#app')
