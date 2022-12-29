import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import Modal from 'vue-bs-modal'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faNotes,faCalendar } from '@fortawesome/free-solid-svg-icons'
library.add(faNotes)

createApp(App).component('font-awesome-icon', FontAwesomeIcon).use(router).use(Modal).mount('#app')
