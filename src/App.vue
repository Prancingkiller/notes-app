<template>
	<nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
		<div class="container-fluid">
			<router-link to="/" class="navbar-brand">Home</router-link>
			<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse"
				aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
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
					<li class="nav-item">
						<router-link class="nav-link" to="/crewRoom">Crew Room</router-link>
					</li>
					<li class="nav-item">
						<router-link class="nav-link" to="/managersRoom">Managers Room</router-link>
					</li>
					<li class="nav-item">
						<router-link class="nav-link" to="/directorsRoom">Directors Room</router-link>
					</li>
				</ul>
				<LoginForm @profilePage="toEdit()" />
			</div>
		</div>
	</nav>
	<router-view />
	<!-- {{ tokenFirebase }}
	<button class="btn btn-primary" style="position:fixed;left:0px;bottom:0px" @click="enableNotification">Enable
		Notification</button> -->
</template>
<script lang="ts">
import { ref, onMounted } from 'vue'
import LoginForm from "./components/LoginForm.vue"
import { useRouter } from 'vue-router'
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

interface SyncManager {
	getTags(): Promise<string[]>;
	register(tag: string): Promise<void>;
}

declare global {
	interface ServiceWorkerRegistration {
		readonly sync: SyncManager;
	}
}
export default {
	components: {
		LoginForm
	},
	setup() {
		const tokenFirebase = ref("loading");
		const router = useRouter();
		function registerSyncP() {
			if (localStorage.getItem("logged")) {
				navigator.serviceWorker.ready.then((registration) => {
					registration.sync.getTags().then((tags) => {
						if (tags.includes("notes_add")) {
							console.log("Sync already registered");
						}
						else {
							registration.sync.register("notes_add");
							console.log("Periodic background sync registered!");
						}
						setTimer();
					});
				});
			} else { setTimer(); }
		}
		function setTimer() {
			setTimeout(registerSyncP, 10000);
		}
		function handlerSync() {
			if ('serviceWorker' in navigator && 'SyncManager' in window) {
				setTimer()
			} else {
				console.error('Background sync not supported');
				navigator.serviceWorker.ready.then(() => {
					//navigator.serviceWorker.controller.postMessage("pushOffline")
				})
			}
		}
		onMounted(handlerSync);
		function toEdit() {
			router.push({ name: 'profile' });
		}

		const firebaseConfig = {
			apiKey: "AIzaSyDVOywAzrenIOUt44Y3saRYTiZpvBQdTmQ",
			authDomain: "shifts-app-8ce5c.firebaseapp.com",
			projectId: "shifts-app-8ce5c",
			storageBucket: "shifts-app-8ce5c.appspot.com",
			messagingSenderId: "796717147654",
			appId: "1:796717147654:web:fb39f7a21c3e1733ff8587",
			measurementId: "G-BH5ZWGE1EB"
		};
		const app = initializeApp(firebaseConfig);
		const messaging = getMessaging(app);
		async function registerPush() {
			const registration = await navigator.serviceWorker.ready;
			await getToken(messaging, { serviceWorkerRegistration: registration, vapidKey: 'BEwUVtwADSiAOmfEIFnn_za5k_XhnFSj6bXmtQjPHoRi7DFMA46dcRE6dHxNeL47TUQ6aBBbtlmCZvmXJELF-1s' })
				.then(async (currentToken) => {
					if (currentToken) {
						tokenFirebase.value = currentToken;
						localStorage.setItem("tokenFirebase",currentToken);
						console.log("token received: " + currentToken)
						// Send the token to your server and update the UI if necessary

						await fetch("https://notes-api.it/api/subscribeNot", {
							mode: 'cors',
							credentials: 'include',
							method: 'POST',
							headers: {
								'Trusted': 'yes'
							},
							body: JSON.stringify(currentToken)
						})

					} else {
						// Show permission request UI
						console.log('No registration token available. Request permission to generate one.');
						// ...
					}
				}).catch((err) => {
					console.log('An error occurred while retrieving token. ', err);
					// ...
				});
		}
		onMessage(messaging, (payload) => {
			console.log(payload)
			if (Notification.permission === "granted") {
				let data = {
					type: "notification",
					payload: payload
				}
				navigator.serviceWorker.controller?.postMessage(data)
			}
		});
		function askNotificationPermission() {
			return new Promise((resolve, reject) => {
				if (checkNotificationPromise()) {
					Notification.requestPermission().then(resolve)
				} else {
					Notification.requestPermission(resolve)
				}
			})
		}

		function checkNotificationPromise() {
			try {
				Notification.requestPermission().then();
			} catch (e) {
				return false;
			}

			return true;
		}
		function testNotification() {
			let data = {
				type: "notification",
				payload: { title: "title", body: "body" }
			}
			navigator.serviceWorker.controller?.postMessage(data)
		}
		async function enableNotification() {
			if (Notification.permission != "granted") {
				await askNotificationPermission();
				enableNotification();
			}
			else {
				registerPush();
			}
		}
		return {
			toEdit, askNotificationPermission, tokenFirebase, testNotification, enableNotification
		}
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
