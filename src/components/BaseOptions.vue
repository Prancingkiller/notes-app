<template>
    <button class="btn btn-primary" @click="openModal">
        {{ data.name }}
    </button>

    <div class="modal fade" tabindex="-1" aria-hidden="true" ref="modalRef">
        <div class="modal-dialog modal-fullscreen">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Opzioni per gruppo: {{ data.name }}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                        @click="closeModal"></button>
                </div>
                <div class="modal-body">
                    <div class="notesForm">
                        <div style="display:flex;flex-direction: column;">
                            <div class="p-4">
                                <h3></h3>
                                <table class="table table-sm">
                                    <thead>
                                        <tr>
                                            <th>Opzione</th>
                                            <th>Valore</th>
                                        </tr>

                                    </thead>
                                    <tbody>
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
                            <div style="display:flex;flex-direction: row;justify-content: center;">
                                <div v-for="(day, i) in days" :key="i" style="display:flex;flex-direction: column" class="m-3">
                                    <div v-for="(opening,i) in data.openings[day]" :key="i">
                                    {{ day }}<br>
                                        <input type="time" v-model="opening.apertura">
                                        <input type="time" v-model="opening.chiusura">
                                    </div>
                                </div>
                            </div>
                            <div style="display:flex;flex-direction:row;justify-content: center;">
                                <div v-for="(day, i) in days" :key="i">
                                    {{ day }}
                                    <table style="margin:5px" class="tableResult">
                                        <tr v-for="(slot, i) in data.slots[day]" :key="i">
                                            <td>{{ slot.start }}-{{ slot.finish }}</td>
                                            <td>
                                                <input type="number" v-model="slot.required" style="width:35px;border:0px">
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-success" @click="saveOptions()">Salva</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import directorMethods from '../api/resources/directorMethods.js'
import { ref, onMounted } from 'vue'
import { Modal } from 'bootstrap'
export default {
    props: {
        userGroup: {
            type: {
                user_group: Number,
                options: {
                    allowDoubleShifts: Boolean,
                    baseShift: Number,
                    minTimeBetweenShifts: Number,
                    chiusura: String,
                    apertura: String,
                    slots: Object,
                    openings: Object
                }
            }
        }
    },
    emits: ['inFocus', 'submit'],
    setup(props, ctx) {
        const modalRef = ref(null);
        var modal = Modal;
        const data = ref(props.userGroup);
        const days = ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"];
        if (data.value.user_group == 0) {
            data.value.name = "Crew"
        }
        if (data.value.user_group == 1) {
            data.value.name = "Cafè"
        }
        if (data.value.user_group == 2) {
            data.value.name = "Drive"
        }
        if (data.value.user_group == 3) {
            data.value.name = "Hostess"
        }
        if (data.value.user_group == 4) {
            data.value.name = "Manager"
        }
        if (data.value.user_group == 5) {
            data.value.name = "Direttore"
        }
        function openModal() {
            modal.show()
        }
        function closeModal() {
            modal.hide()
        }
        onMounted(() => {
            modal = new Modal(modalRef.value);
        })
        async function saveOptions() {
            let obj = [data.value];
            const res = await directorMethods.postAllOptions(obj);
            if (res) {
                ctx.emit('submit')
            }
            else {
                console.log("problems saving! offline?")
            }
        }

        return { data, days, saveOptions, openModal, closeModal, modalRef }
    }
}
</script>
<style scoped>
.tableResult /deep/ td {
    border-style: solid;
    border-width: 1px;
    border-color: black
}

.tableResult /deep/ .red {
    background-color: red;
}

.tableResult /deep/ .green {
    background-color: green;
}

.tableResult /deep/ .orange {
    background-color: orange;
}

.tableResult /deep/ .black {
    background-color: black;
}

.red {
    background-color: red;
}

.green {
    background-color: green;
}

.orange {
    background-color: orange;
}

.black {
    background-color: black;
}
</style>