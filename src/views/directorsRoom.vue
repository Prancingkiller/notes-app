<template>
    <h3>Directors Room</h3>
    <div>
        <button @click="router.push('notes')">Notes</button>
        <button>Resources Manager</button>
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