<template>
    <h3>Managers Room</h3>
    <div>
        <button @click="router.push('notes')">Notes</button>
        <button @click="router.push('calendar')">Calendar</button>
        <button @click="router.push('manager')">Crew Planner</button>
        <button @click="router.push('manager')">Hostess Planner</button>
        <button @click="router.push('manager')">Managers Planner</button>
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