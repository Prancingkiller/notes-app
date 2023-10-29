<template>
    <button class="btn btn-primary" @click="openModal">
        {{ data.user_group }}
    </button>

    <div class="modal fade" tabindex="-1" aria-hidden="true" ref="modalRef">
        <div class="modal-dialog modal-fullscreen">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Risorse per gruppo: {{ data.user_group }}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                        @click="closeModal"></button>
                </div>
                <div class="modal-body">
                    <div class="notesForm" style="display:flex;flex-direction: row;flex-wrap: wrap;">
                        <div class="border" style="width:350px;" v-for="(worker, ii) in data.workers" :key="worker.id">
                            <p v-if="worker.id != 0">{{ worker.name }}<span> - Ore: <input type="number" v-model="worker.hours"></span></p>
                            <div v-else>
                                Nome<input  type="text" v-model="worker.name">
                                Email<input  type="text" v-model="worker.password">
                                Password<input  type="text" v-model="worker.email">
                            </div>
                            <p>Soddisfazione: {{ worker.fairness }}</p><button @click="togglePanel(ii)">Pannello
                                orari</button>
                            <div v-if="worker.showDays">
                                <div>Lun
                                    <div v-for="(slot, i) in worker.SlotDays.Lun" :key="i">
                                        <input type="time" v-model="slot.start">
                                        <input type="time" v-model="slot.finish">
                                    </div>
                                </div>
                                <div>Mar
                                    <div v-for="(slot, i) in worker.SlotDays.Mar" :key="i">
                                        <input type="time" v-model="slot.start">
                                        <input type="time" v-model="slot.finish">
                                    </div>
                                </div>
                                <div>Mer
                                    <div v-for="(slot, i) in worker.SlotDays.Mer" :key="i">
                                        <input type="time" v-model="slot.start">
                                        <input type="time" v-model="slot.finish">
                                    </div>
                                </div>
                                <div>Gio
                                    <div v-for="(slot, i) in worker.SlotDays.Gio" :key="i">
                                        <input type="time" v-model="slot.start">
                                        <input type="time" v-model="slot.finish">
                                    </div>
                                </div>
                                <div>Ven
                                    <div v-for="(slot, i) in worker.SlotDays.Ven" :key="i">
                                        <input type="time" v-model="slot.start">
                                        <input type="time" v-model="slot.finish">
                                    </div>
                                </div>
                                <div>Sab
                                    <div v-for="(slot, i) in worker.SlotDays.Sab" :key="i">
                                        <input type="time" v-model="slot.start">
                                        <input type="time" v-model="slot.finish">
                                    </div>
                                </div>
                                <div>Dom
                                    <div v-for="(slot, i) in worker.SlotDays.Dom" :key="i">
                                        <input type="time" v-model="slot.start">
                                        <input type="time" v-model="slot.finish">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div><font-awesome-icon icon="circle-plus" class="fa-4x" @click="addResource" /></div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-success">Salva</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script >
import directorMethods from '../api/resources/directorMethods.js'
import { ref, onMounted } from 'vue'
import { Modal } from 'bootstrap'
export default {
    props: {
        userGroup: {
            type: {
                user_group: Number,
                workers: {
                    showDays: Boolean,
                    name: String,
                    label: String,
                    id: Number,
                    hours: Number,
                    SlotDays: []
                }
            }
        }
    },
    setup(props, ctx) {
        const data = ref(props.userGroup);
        const modalRef = ref(null);
        var modal = Modal;
        if (data.value.user_group == 0) {
            data.value.user_group = "Crew"
        }
        if (data.value.user_group == 1) {
            data.value.user_group = "Hostess"
        }
        if (data.value.user_group == 2) {
            data.value.user_group = "Manager"
        }
        onMounted(() => {
            modal = new Modal(modalRef.value);
        })
        function openModal() {
            modal.show()
        }
        function closeModal() {
            modal.hide()
        }
        function togglePanel(index) {
            data.value.workers[index].showDays = !data.value.workers[index].showDays;
        }

        function addResource() {
            let obj = {
                showDays: false,
                name: "",
                password:"",
                email:"",
                label: "",
                id: 0,
                hours: 0,
                SlotDays: {
                    Lun: [{start: "08:00",finish: "08:00",}
                    ],
                    Mar: [{start: "08:00",finish: "08:00",}
                    ],
                    Mer: [{start: "08:00",finish: "08:00",}
                    ],
                    Gio: [{start: "08:00","finish": "08:00",}
                    ],
                    Ven: [{start: "08:00",finish: "08:00",}
                    ],
                    Sab: [{start: "08:00",finish: "08:00",}
                    ],
                    Dom: [{start: "08:00",finish: "08:00",}
                    ]
                }
            }
            data.value.workers.push(obj);
        }

        return {
            data, openModal, closeModal, modalRef, togglePanel, addResource
        }
    }
}
</script>