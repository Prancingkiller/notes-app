<template>
  <div class="home">
    <div class="row">
      <div class="col-6">
        <FontAwesomeIcon icon="fa-solid fa-notes" />
      </div>
      <div class="col-6">
        <FontAwesomeIcon icon="fa-solid fa-calendar" />
      </div>
    </div>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import indexedMethods from "../api/resources/indexedMethods"
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default {
  name: 'HomeView',
  components: {
    HelloWorld,
    FontAwesomeIcon
  },
  setup(){
		const db = indexedMethods.initiate();
		return{db}
	}
}
</script>
