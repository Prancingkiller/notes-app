<template>
    <h3>Directors Room</h3>
    <div>
        <button class="btn btn-primary" @click="router.push('notes')">Notes</button>
        <button class="btn btn-primary" @click="setContent('generalOptions')">General Options</button>
        <button class="btn btn-primary" @click="setContent('resourcesOptions')">Resources Manager</button>
    </div>
    <div>
        <div class="m-4" v-if="content == 'generalOptions'" style="display:flex;flex-direction: row;justify-content: center;">
            <BaseOptions v-for="(set, i) in options" :key="i" :userGroup="set" @submit="getOptions()"></BaseOptions>
        </div>
        <div class="m-4" v-if="content == 'resourcesOptions'" style="display:flex;flex-direction: row;justify-content: center;">
            <BaseResources v-for="(set, i) in resources" :key="i" :userGroup="set" @submit="getResources()"></BaseResources>
        </div>
    </div>
</template>
<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import BaseOptions from '../components/BaseOptions.vue'
import BaseResources from '../components/BaseResources.vue'
import directorMethods from '../api/resources/directorMethods.js'
import ManagerMethods from "@/api/resources/ManagerMethods";
export default {
    setup() {
        const router = useRouter();
        const content = ref(null);
        const options = ref([]);
        const resources = ref([]);
        const groups = ref([]);
        async function getOptions() {
            let allOptions = await directorMethods.getAllOptions();
            allOptions.forEach((element,i)=>{
                let groupId = element.user_group;
                let exists = false;
                console.log("ricerco "+groupId+" in");
                console.log(groups.value);
                groups.value.every(actualGroup=>{
                    if(actualGroup.id == groupId){
                        exists = true;
                        return false;
                    }
                })
                if(!exists){
                    allOptions.splice(i, 1);
                }
            }) 
        }
        async function getResources() {
            let res = await directorMethods.getAllWorkers();
            res.forEach((element,i)=>{
                let group = element.user_group;
                options.value.forEach(e=>{
                    if(parseInt(e.user_group) == group){
                        res[i].rules = e;
                    }
                })
            })
			resources.value = res;
            console.log(resources.value)
		}

        onMounted(async () => {
            groups.value = await ManagerMethods.loadGroups();
            await getOptions();
            await getResources();

        })

        function setContent(data) {
            content.value = data;
            console.log(options.value);
        }

        return {
            content, router, options, setContent, getOptions, resources
        }
    },
    components: {
        BaseOptions,BaseResources
    },
}
</script>