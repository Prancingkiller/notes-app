<template>
  <div class="container">
    <div class="row">
      <div class="col-6">
        <font-awesome-icon icon="note-sticky" class="fa-10x" @click="goNotes" />
      </div>
      <div class="col-6">
        <font-awesome-icon icon="calendar" class="fa-10x" @click="goCalendar" />
      </div>
    </div>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import indexedMethods from "../api/resources/indexedMethods"
import { useRouter, useRoute } from 'vue-router'


export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },
  setup(){
    const router = useRouter()
		const db = indexedMethods.initiate();

    function goNotes(){
      router.push({
        name: 'notes'
      })
    }
    function goCalendar(){
      router.push({
        name: 'calendar'
      })
    }
		return{db,goCalendar,goNotes}
	}
}
</script>
