<template>
    <h3>Managers Room</h3>
    <div>
        <button class="btn btn-primary" @click="router.push('notes')">Notes</button>
        <button class="btn btn-primary" @click="router.push('calendar')">Calendar</button>
        <button class="btn btn-primary" @click="router.push({ name: 'planner', params: { resource: 'crew' } })">Crew Planner</button>
        <button class="btn btn-primary" @click="router.push({ name: 'planner', params: { resource: 'hostess' } })">Hostess Planner</button>
        <button class="btn btn-primary" @click="router.push({ name: 'planner', params: { resource: 'manager' } })">Managers Planner</button>
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