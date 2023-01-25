<template>
		<nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
	<div class="container-fluid">
		<router-link to="/" class="navbar-brand">Home</router-link>
		<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
			<span class="navbar-toggler-icon"></span>
		</button>
		<div class="collapse navbar-collapse" id="navbarCollapse">
			<ul class="navbar-nav me-auto mb-2 mb-md-0">
				<li class="nav-item">
					<router-link class="nav-link" to="/notes">Notes</router-link>
				</li>
				<li class="nav-item">
					<router-link class="nav-link" to="/calendar">Calendar</router-link>
				</li>
			</ul>
				<LoginForm />
		</div>
	</div>
</nav>
	<router-view/>
</template>
<script>
import { onMounted } from 'vue'
import LoginForm from "./components/LoginForm"
	export default{
	components:{
		LoginForm
	},
	setup(){
		function registerSyncP(){
			if(localStorage.getItem("logged")){
			navigator.serviceWorker.ready.then((registration) => {
				registration.sync.getTags().then((tags) => {
				if (tags.includes("notes_add")){
					console.log("Sync already registered");
				}
				else{
					registration.sync.register("notes_add");
					console.log("Periodic background sync registered!");
				}
				setTimer();
				});
			});
			}else{setTimer();}
		}
		function setTimer(){
		setTimeout(registerSyncP, 10000);
		}
		function handlerSync(){
			if ('serviceWorker' in navigator && 'SyncManager' in window) {
				setTimer()
			} else {
				console.error('Background sync not supported');
				navigator.serviceWorker.ready.then((registration) => {
					navigator.serviceWorker.controller.postMessage("pushOffline")
				})
			}
		}
		onMounted(handlerSync)
	}

}
</script>
<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}

nav {
	padding: 30px;
}

nav a {
	font-weight: bold;
	color: #2c3e50;
}

nav a.router-link-exact-active {
	color: #42b983;
}
</style>
