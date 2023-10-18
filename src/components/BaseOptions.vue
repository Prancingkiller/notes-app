<template>
    Options for {{ userGroup.user_group }}
    <div>
        <div v-for="(option,i) in userGroup.options" :key="i">
            {{ option.name }}
            <BaseInput v-if="option.type=='number' || option.type=='date'" :type="option.type" v-model="option.value"></BaseInput>
            
        </div>
    </div>
</template>
<script>
import BaseInput from './BaseInput.vue'
export default {
    props: {
        userGroup: {
            type: Object
        }
    },
    components:{
        BaseInput
    }
}
</script>