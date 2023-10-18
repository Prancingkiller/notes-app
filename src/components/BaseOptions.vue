<template>
        <div>
            <h3>Opzioni per gruppo: {{ userGroup.user_group }}</h3>
            <table class="table table-sm">
                <thead>
                    <tr>
                        <th>Opzione</th>
                        <th>Valore</th>
                    </tr>

                </thead>
                <tbody>
                    <tr v-for="(option, i) in userGroup.options" :key="i">
                        {{ option.name }}
                        <td>
                            <BaseInput v-if="option.type == 'number' || option.type == 'time'" :type="option.type"
                                v-model="option.value"></BaseInput>
                        </td>
                        <td>
                            <BaseCheckbox v-if="option.type == 'boolean'" v-model="option.value"></BaseCheckbox>
                        </td>
                    </tr>
                </tbody>
            </table>
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
    components: {
        BaseInput, BaseCheckbox
    }
}
</script>