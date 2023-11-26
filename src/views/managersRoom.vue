<template>
    <h3>Managers Room</h3>
    <div>
        <button class="btn btn-primary" @click="router.push('notes')">Notes</button>
        <button class="btn btn-primary" @click="router.push('calendar')">Calendar</button>
        <button v-for="group in groups" :key="group.id" class="btn btn-primary" @click="router.push({ name: 'manager24', params: { resource: group.id } })">{{group.user_group_name}} Planner</button>
    </div>
</template>
<script>
import { useRouter } from 'vue-router'
import { onMounted } from "vue"
import ManagerMethods from "@/api/resources/ManagerMethods";
export default{
    setup(){
        const router = useRouter();
        const groups = ref([]);
        onMounted(()=>{
            let result = ManagerMethods.loadGroups();
            groups.value = result;
        })

        return{
            router,groups
        }
    }
}
</script>
<style>
</style>