import './style/main.css'
import axios from 'axios'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VCalendar from 'v-calendar';
import 'v-calendar/style.css';

const app = createApp(App)
app.use(VCalendar, {})
app.use(router)
app.mount('#app')

const api = axios.create({
  baseURL: 'https://localhost:8081'
})

export default api
