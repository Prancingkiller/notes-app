<template>
    <h3>Managers Room</h3>
    <div>
        <button class="btn btn-primary" @click="router.push('notes')">Notes</button>
        <button class="btn btn-primary" @click="router.push('calendar')">Calendar</button>
        <button class="btn btn-primary" @click="router.push({ name: 'manager24', params: { resource: 'crew' } })">Crew Planner</button>
        <button class="btn btn-primary" @click="router.push({ name: 'manager24', params: { resource: 'cafe' } })">Cafe Planner</button>
        <button class="btn btn-primary" >Drive Planner</button>
        <button class="btn btn-primary" >Hostess Planner</button>
        <button class="btn btn-primary" >Managers Planner</button>
    </div>
</template>
<script>
import { useRouter } from 'vue-router'
export default{
    setup(){
        const router = useRouter();

        return{
            router,
        }
    }
}
</script>
<style>
</style>