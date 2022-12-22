import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NotesView from '../views/NotesView.vue'
import CalendarView from '../views/CalendarView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/notes',
    name: 'notes',
    component: NotesView
  },
  {
    path: '/calendar',
    name: 'calendar',
    component: CalendarView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
