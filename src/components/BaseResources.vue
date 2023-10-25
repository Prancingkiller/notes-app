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
                    <div class="notesForm">
                        <div v-for="(worker, ii) in data.workers" :key="worker.id">
                            <p>{{ worker.name }}<span> - Ore: <input type="number" v-model="worker.hours"></span></p>
                            <button @click="togglePanel(ii)">Pannello orari</button>
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
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-success">Salva</button>
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
        const data = ref(props.user_group);
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

        return {
            data, openModal, closeModal, modalRef,togglePanel
        }
    }
}
</script>