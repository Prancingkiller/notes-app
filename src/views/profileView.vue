<template>
    <h3>Profile Page</h3>
    <div>
        <h5>Favourite slots:</h5>
        <!-- <div v-for="(days, i) in favouriteSlots" :key="i">
            {{ days.day }}
            <div v-for="(slot, i) in days.favourites" :key="days.favourites.id">
                <input type="time" v-model="slot.start">
                <input type="time" v-model="slot.finish">
            </div>
        </div> -->


        <div v-for="(days, i) in favouriteSlots" :key="i" style="display:flex;flex-wrap:wrap">
            {{ days.day }}
            <div v-for="(slot, i) in days.favourites" :key="days.favourites.id" class="card" style="width: 14rem;">
                <div class="card-body">
                    <div class="row">
                        <div class="col-6">
                            <BaseInput style="max-width:80px" type="time" v-model="slot.start" label="Start" />
                        </div>
                        <div class="col-6">
                            <BaseInput style="max-width:80px" type="time" v-model="slot.finish" label="Finish" />
                        </div>
                        <p v-if="slot.temp == true">Not Sync...</p>
                    </div>
                    <div class="row">
                        <!-- <button style="width:8rem;margin:auto;margin-top:5px"
                                @click="eventDelete(event, i)">Delete</button> -->
                    </div>
                </div>
            </div>
        </div>



    </div>
</template>
<script>
import WorkersMethods from "@/api/resources/WorkersMethods"
import { ref, onMounted } from "vue"
export default {
    setup() {

        const favouriteSlots = ref(null);

        onMounted(async () => {
            favouriteSlots.value = await WorkersMethods.getFavouriteSlots();
        });

        return {
            favouriteSlots,
        }
    }
}
</script>