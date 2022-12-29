<template>
  <div class="container">
    <div class="row">
      <div class="col-6">
        <font-awesome-icon icon="note-sticky" class="fa-10x" />
      </div>
      <div class="col-6">
        <font-awesome-icon icon="calendar" class="fa-10x" />
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
