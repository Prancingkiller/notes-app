<template>
    Options for {{ userGroup.user_group }}
    <div>
        <div v-for="(option,i) in userGroup.options" :key="i">
            {{ option.name }}
            <BaseInput v-if="option.type=='number' || option.type=='time'" :type="option.type" v-model="option.value"></BaseInput>
            <BaseCheckbox v-if="option.type=='boolean'" v-model="option.value"></BaseCheckbox>
        </div>
    </div>
</template>
<script>
import BaseInput from './BaseInput.vue'
import BaseCheckbox from './BaseCheckbox.vue'
export default {
    props: {
        userGroup: {
            type: Object
        }
    },
    components:{
        BaseInput,BaseCheckbox
    }
}
</script>