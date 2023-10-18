<template>
    <h3>Managers Room</h3>
    <div>
        <button @click="router.push('notes')">Notes</button>
        <button @click="router.push('calendar')">Calendar</button>
        <button @click="router.push('planner/crew')">Crew Planner</button>
        <button @click="router.push('planner/hostess')">Hostess Planner</button>
        <button @click="router.push('planner/manager')">Managers Planner</button>
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