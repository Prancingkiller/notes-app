import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NotesView from '../views/NotesView.vue'
import CalendarView from '../views/CalendarView.vue'
import ManagerView from '../views/ManagerView.vue'
import ManagerView24 from '../views/ManagerView24.vue'
import ManagerViewV3 from '../views/ManagerViewV3.vue'
import profileView from '../views/profileView.vue'
import crewRoom from '../views/crewRoom.vue'
import directorsRoom from '../views/directorsRoom.vue'
import managersRoom from '../views/managersRoom.vue'

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
    path: '/dev/:resource',
    name: 'dev',
    component: ManagerViewV3,
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
    path: '/manager24/:resource',
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
  },
  {
    path: '/crewRoom',
    name: 'crewRoom',
    component: crewRoom,
  },
  {
    path: '/managersRoom',
    name: 'managersRoom',
    component: managersRoom,
  },
  {
    path: '/directorsRoom',
    name: 'directorsRoom',
    component: directorsRoom,
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
