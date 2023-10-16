<template>
    <h3>Managers Room</h3>
    <div>
        <button @click="router.push('profile')">Notes</button>
        <button>Calendar</button>
        <button>Crew Planner</button>
        <button>Hostess Planner</button>
        <button>Managers Planner</button>
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