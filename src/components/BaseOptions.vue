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
                    <tr>
                        <td>Apertura</td>
                        <td><input type="time" v-model="userGroup.options.apertura"></td>
                    </tr>
                    <tr>
                        <td>Chiusura</td>
                        <td><input type="time" v-model="userGroup.options.chiusura"></td>
                    </tr>
                    <tr>
                        <td>Pausa minima tra turni (h)</td>
                        <td><input type="number" v-model="userGroup.options.minTimeBetweenShifts"></td>
                    </tr>
                    <tr>
                        <td>Turno minimo (h)</td>
                        <td><input type="number" v-model="userGroup.options.baseShift"></td>
                    </tr>
                    <tr>
                        <td>Abilita doppi turni</td>
                        <td><input type="checkbox" v-model="userGroup.options.allowDoubleShifts"></td>
                    </tr>
                </tbody>
            </table>
        </div>
</template>
<script>

export default {
    props: {
        userGroup: {
            type: Object
        }
    },
}
</script>