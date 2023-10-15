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

        <div v-for="(days, i) in favouriteSlots" :key="i" class="p-5" style="display: flex;
    flex-direction: column;
    align-items: center;">
            {{ days.day }}
            <div style="display:flex;flex-wrap:wrap">
                <div v-for="(slot,slotI) in days.favourites" :key="slot.id" class="card" style="width: 14rem;">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-6">
                                <BaseInput style="max-width:80px" type="time" v-model="slot.start" label="Start" />
                            </div>
                            <div class="col-6">
                                <BaseInput style="max-width:80px" type="time" v-model="slot.finish" label="Finish" />
                            </div>
                            <!-- <p v-if="slot.temp == true">Not Sync...</p> -->
                        </div>
                        <div class="row">
                            <!-- <button style="width:8rem;margin:auto;margin-top:5px"
                                @click="eventDelete(event, i)">Delete</button> -->
                                <button style="width:8rem;margin:auto;margin-top:5px"
                                @click="deleteFav(i,slotI)">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
            <button @click="addFav(i)">Add New</button>
        </div>




    </div>
</template>
<script lang="ts">
import BaseInput from "../components/BaseInput.vue"
import WorkersMethods from "@/api/resources/WorkersMethods"
import { ref, onMounted } from "vue"
export default {
    components: {
        BaseInput
    },
    setup() {

        const favouriteSlots = ref<{favourites:{id,start,finish}[],day:String|null}[]>([{day:null,favourites:[{id:null,start:null,finish:null}]}]);

        onMounted(async () => {
            favouriteSlots.value = await WorkersMethods.getFavouriteSlots();
        });

        function addFav(index){
            favouriteSlots.value[index].favourites.push({
                id:0,
                start:"00:00",
                finish:"00:00"
            })
        }
        function deleteFav(index,slotI){
            favouriteSlots.value[index].favourites.splice(slotI,1);
        }

        return {
            favouriteSlots,addFav,deleteFav
        }
    }
}
</script>