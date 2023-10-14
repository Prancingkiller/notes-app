<template>
    <h3>Profile Page</h3>
    <div>
        <h5>Favourite slots:</h5>
        <div v-for="(days, i) in favouriteSlots" :key="i">
            {{ days.day }}
            <div v-for="(slot,i) in days" :key="i">
                <input type="time" v-model="slot.start">
                <input type="time" v-model="slot.finish">
            </div>
        </div>
    </div>
</template>
<script>
import WorkersMethods from "@/api/resources/WorkersMethods"
import { ref, onMounted } from "vue"
export default {
    setup() {

        favouriteSlots = ref(null);

        onMounted(() => {
            loadFavouriteSlots()
        }),

            function loadFavouriteSlots() {
                favouriteSlots.value = await WorkersMethods.getFavourites();
            }
        return {
            favouriteSlots,
        }
    }
}
</script>