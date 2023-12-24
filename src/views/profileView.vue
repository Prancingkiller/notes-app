<template>
    <h3>Profile Page</h3>
    <div>
        <h5>Favourite slots:</h5>
        <div v-for="(days, i) in favouriteSlots" :key="i" class="p-5" style="display: flex;
    flex-direction: column;
    align-items: center;">
            {{ days.day }}
            <div style="display:flex;flex-wrap:wrap">
                <div v-for="(slot, slotI) in days.favourites" :key="slot.id" class="card" style="width: 14rem;">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-6">
                                <BaseInput
                                    :class="slot.start < configuration.openings[days.day].apertura || slot.start > configuration.openings[days.day].chiusura || parseInt(slot.start.split(':')[1]) % 15 != 0 ? 'invalid' : ''"
                                    style="max-width:80px" type="time" v-model="slot.start" label="Start"
                                    :min="configuration.openings[days.day].apertura" step="900"
                                    :max="configuration.openings[days.day].chiusura" />
                            </div>
                            <div class="col-6">
                                <BaseInput
                                    :class="slot.finish < configuration.openings[days.day].apertura || slot.finish > configuration.openings[days.day].chiusura || parseInt(slot.finish.split(':')[1]) % 15 != 0 ? 'invalid' : ''"
                                    style="max-width:80px" type="time" v-model="slot.finish" label="Finish"
                                    :min="configuration.openings[days.day].apertura" step="900"
                                    :max="configuration.openings[days.day].chiusura" />
                            </div>
                        </div>
                        <div class="row">
                            <button style="width:8rem;margin:auto;margin-top:5px"
                                @click="deleteFav(i, slotI, slot)">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
            <button @click="addFav(i)">Add New</button>
        </div>


        {{ tokenFirebase }}
        <button class="btn btn-primary" style="position:fixed;left:0px;bottom:0px" @click="enableNotification">Enable
            Notification</button>

    </div>
    <div style="position:fixed;right:0px;bottom:0px">
        <button @click="postFavs()">Salva</button>
    </div>
</template>
<script >
import BaseInput from "../components/BaseInput.vue"
import WorkersMethods from "@/api/resources/WorkersMethods"
import ManagerMethods from "@/api/resources/ManagerMethods";
import { ref, onMounted } from "vue"
export default {
    components: {
        BaseInput
    },
    setup() {

        const favouriteSlots = ref([{ day: null, favourites: [{ id: null, start: null, finish: null, temp: true }] }]);
        const configuration = ref({});
        onMounted(async () => {
            let data = await ManagerMethods.loadOptions(0);
            configuration.value = data;
            console.log(configuration.value);
            favouriteSlots.value = await WorkersMethods.getFavouriteSlots();
        });

        function addFav(index) {
            favouriteSlots.value[index].favourites.push({
                id: 0,
                start: "00:00",
                finish: "00:00",
                temp: true
            })
        }
        async function deleteFav(index, slotI, slot) {
            if (slot.temp) {
                favouriteSlots.value[index].favourites.splice(slotI, 1);
            }
            else {
                const res = await WorkersMethods.deleteFav(slot.id);
                if (!res) {
                    console.log("delete fallito!");
                }
                else {
                    console.log(res);
                    favouriteSlots.value[index].favourites.splice(slotI, 1);
                }
            }

        }
        async function postFavs() {
            const res = await WorkersMethods.postFavs(favouriteSlots.value);
            if (!res) {
                console.log("post fallito!");
            }
            else {
                console.log(res);
            }
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
        const tokenFirebase = ref(localStorage.getItem("tokenFirebase"));
        async function registerPush() {
            const registration = await navigator.serviceWorker.ready;
            await getToken(messaging, { serviceWorkerRegistration: registration, vapidKey: 'BEwUVtwADSiAOmfEIFnn_za5k_XhnFSj6bXmtQjPHoRi7DFMA46dcRE6dHxNeL47TUQ6aBBbtlmCZvmXJELF-1s' })
                .then(async (currentToken) => {
                    if (currentToken) {
                        tokenFirebase.value = currentToken
                        localStorage.setItem("tokenFirebase", currentToken);
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
            favouriteSlots, addFav, deleteFav, postFavs, configuration, enableNotification
        }
    }
}
</script>
<style scoped>
BaseInput:valid {
    background: rgb(135, 229, 135)
}

BaseInput:invalid {
    background: rgb(255, 98, 98)
}

.invalid {
    background: rgb(255, 98, 98)
}</style>