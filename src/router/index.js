import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NotesView from '../views/NotesView.vue'
import CalendarView from '../views/CalendarView.vue'
import ManagerView from '../views/ManagerView.vue'
import ManagerView24 from '../views/ManagerView24.vue'
import profileView from '../views/profileView.vue'
function checkLog() {
  if (localStorage.getItem("logged")) {
    return true;
  }
  else {
    console.log("login first!")
    return false;
  }
}
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/notes',
    name: 'notes',
    component: NotesView,
    beforeEnter: (to, from) => {
      if (checkLog()) {
        return true;
      }
      else {
        return false;
      }
    },
  },
  {
    path: '/calendar',
    name: 'calendar',
    component: CalendarView,
    beforeEnter: (to, from) => {
      if (checkLog()) {
        return true;
      }
      else {
        return false;
      }
    },
  },
  {
    path: '/manager',
    name: 'manager',
    component: ManagerView,
    // beforeEnter: (to, from) => {
    //   if(checkLog()){
    //     return true;
    //   }
    //   else{
    //     return false;
    //   }
    // },
  },
  {
    path: '/manager24',
    name: 'manager24',
    component: ManagerView24,
    // beforeEnter: (to, from) => {
    //   if(checkLog()){
    //     return true;
    //   }
    //   else{
    //     return false;
    //   }
    // },
  },
  {
    path: '/profile',
    name: 'profile',
    component: profileView,
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
