<template>
  <div class="home">
    <img alt="Notes App" src="../assets/icon-256x256.png">
    <div class="row">
      <div class="col-6">
        <font-awesome-icon icon="fa-solid fa-notes" />
      </div>
      <div class="col-6">
        <font-awesome-icon icon="fa-solid fa-calendar" />
      </div>
    </div>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import indexedMethods from "../api/resources/indexedMethods"

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },
  setup(){
		const db = indexedMethods.initiate();
		return{db}
	}
}
</script>
