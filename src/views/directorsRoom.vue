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
    </div>
</template>
<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import BaseOptions from '../components/BaseOptions.vue'
import directorMethods from '../api/resources/directorMethods.js'
export default {
    setup() {
        const router = useRouter();
        const content = ref(null);
        const options = ref([]);

        async function getOptions() {
            options.value = await directorMethods.getAllOptions();
        }

        onMounted(() => {
            getOptions();
        })

        function setContent(data) {
            content.value = data;
            console.log(options.value);
        }

        return {
            content, router, options, setContent, getOptions
        }
    },
    components: {
        BaseOptions
    },
}
</script>