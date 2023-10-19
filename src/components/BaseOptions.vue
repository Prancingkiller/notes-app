<template>
        <div class="p-4">
            <h3>Opzioni per gruppo: {{ data.user_group }}</h3>
            <table class="table table-sm">
                <thead>
                    <tr>
                        <th>Opzione</th>
                        <th>Valore</th>
                    </tr>

                </thead>
                <tbody>
                    <tr>
                        <td>Apertura</td>
                        <td><input type="time" v-model="data.options.apertura"></td>
                    </tr>
                    <tr>
                        <td>Chiusura</td>
                        <td><input type="time" v-model="data.options.chiusura"></td>
                    </tr>
                    <tr>
                        <td>Pausa minima tra turni (h)</td>
                        <td><input type="number" v-model="data.options.minTimeBetweenShifts"></td>
                    </tr>
                    <tr>
                        <td>Turno minimo (h)</td>
                        <td><input type="number" v-model="data.options.baseShift"></td>
                    </tr>
                    <tr>
                        <td>Abilita doppi turni</td>
                        <td><input type="checkbox" v-model="data.options.allowDoubleShifts"></td>
                    </tr>
                </tbody>
            </table>
        </div>
</template>
<script>
export default {
    props: {
        userGroup: {
            type: {
                user_group:Number,
                options:{
                    allowDoubleShifts:Boolean,
                    baseShift:Number,
                    minTimeBetweenShifts:Number,
                    chiusura:String,
                    apertura:String
                }
            }
        }
    },
    setup(props){
        const data = props.userGroup;

        if(data.user_group == 0){
            data.user_group = "Crew"
        }
        if(data.user_group == 1){
            data.user_group = "Hostess"
        }
        if(data.user_group == 2){
            data.user_group = "Manager"
        }

        return{data}
    }
}
</script>