<template>
    <h3>Crew Room</h3>
    <div>
        <button @click="router.push('notes')">Notes</button>
        <button @click="router.push('calendar')">Calendar</button>
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