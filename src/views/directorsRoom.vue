<template>
    <h3>Directors Room</h3>
    <div>
        <button @click="router.push('notes')">Notes</button>
        <button @click="setContent('generalOptions')">General Options</button>
        <button @click="setContent('resourcesOptions')">Resources Manager</button>
    </div>
    <div>
        <div v-if="content=='generalOptions'">
            <BaseOptions  v-for="(set,i) in options" :key="i" :userGroup="set"></BaseOptions>
        </div>
    </div>
</template>
<script>
import {ref,onMounted} from 'vue'
import { useRouter } from 'vue-router'
import BaseOptions from '../components/BaseOptions.vue'
import directorMethods from '../api/resources/directorMethods.js'
export default{
    components:{
        BaseOptions
    },
    setup(){
        const router = useRouter();
        const content = ref(null);
        const options = ref([]);

        async function getOptions(){
            options.value = (directorMethods.getAllOptions());
        }

        onMounted(()=>{
            getOptions();
        })

        function setContent(data){
            content.value = data;
            console.log(options.value);
        }

        return{
            content,router,options,setContent
        }
    }
}
</script>