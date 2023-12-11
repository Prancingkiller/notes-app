<template>
    <button class="btn btn-primary" @click="openModal">
        {{ data.name }}
    </button>

    <div class="modal fade" tabindex="-1" aria-hidden="true" ref="modalRef">
        <div class="modal-dialog modal-fullscreen">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Risorse per gruppo: {{ data.name }}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                        @click="closeModal"></button>
                </div>
                <div class="modal-body">
                    <div class="notesForm" style="display:flex;flex-direction: row;flex-wrap: wrap;">
                        <div class="border" style="width:350px;" v-for="(worker, ii) in data.workers" :key="worker.id">
                            <p v-if="worker.id != 0">{{ worker.name }}<span> - Ore: {{ worker.hours }} <input type="range" min="0" max="40" v-model="worker.hours"></span></p>
                            <div v-else>
                                <div><p>Nome</p><input  type="text" v-model="worker.name"></div>
                                <div><p>Email</p><input  type="text" v-model="worker.email"></div>
                                <div><p>Password</p><input  type="text" v-model="worker.password"></div>
                            </div>
                            <p>Soddisfazione: {{ worker.fairness }}</p>
                            <button @click="togglePanel(ii)" class="btn btn-primary">Pannello
                                orari</button>
                            <div v-if="worker.showDays">
                                <div>Lun
                                    <div v-for="(slot, i) in worker.SlotDays.Lun" :key="i">
                                        <input type="time" v-model="slot.start">
                                        <input type="time" v-model="slot.finish">
                                    </div>
                                    <button @click="addSlotDay(ii,'Lun')">Add</button>
                                </div>
                                <div>Mar
                                    <div v-for="(slot, i) in worker.SlotDays.Mar" :key="i">
                                        <input type="time" v-model="slot.start">
                                        <input type="time" v-model="slot.finish">
                                    </div>
                                    <button @click="addSlotDay(ii,'Mar')">Add</button>
                                </div>
                                <div>Mer
                                    <div v-for="(slot, i) in worker.SlotDays.Mer" :key="i">
                                        <input type="time" v-model="slot.start">
                                        <input type="time" v-model="slot.finish">
                                    </div>
                                    <button @click="addSlotDay(ii,'Mer')">Add</button>
                                </div>
                                <div>Gio
                                    <div v-for="(slot, i) in worker.SlotDays.Gio" :key="i">
                                        <input type="time" v-model="slot.start">
                                        <input type="time" v-model="slot.finish">
                                    </div>
                                    <button @click="addSlotDay(ii,'Gio')">Add</button>
                                </div>
                                <div>Ven
                                    <div v-for="(slot, i) in worker.SlotDays.Ven" :key="i">
                                        <input type="time" v-model="slot.start">
                                        <input type="time" v-model="slot.finish">
                                    </div>
                                    <button @click="addSlotDay(ii,'Ven')">Add</button>
                                </div>
                                <div>Sab
                                    <div v-for="(slot, i) in worker.SlotDays.Sab" :key="i">
                                        <input type="time" v-model="slot.start">
                                        <input type="time" v-model="slot.finish">
                                    </div>
                                    <button @click="addSlotDay(ii,'Sab')">Add</button>
                                </div>
                                <div>Dom
                                    <div v-for="(slot, i) in worker.SlotDays.Dom" :key="i">
                                        <input type="time" v-model="slot.start">
                                        <input type="time" v-model="slot.finish">
                                    </div>
                                    <button @click="addSlotDay(ii,'Dom')">Add</button>
                                </div>
                            </div>
                            <button class="btn btn-danger" @click="deleteWorker(worker.id,ii)">Elimina</button>
                        </div>
                        <div><font-awesome-icon icon="circle-plus" class="fa-4x" @click="addResource" /></div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-success" @click="updateWorkers()">Salva</button>
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
    emits: ['inFocus', 'submit'],
    setup(props, ctx) {
        const data = ref(props.userGroup);
        const modalRef = ref(null);
        var modal = Modal;
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
            console.log(data.value.rules.openings);
            let obj = {
                showDays: false,
                name: "",
                password:"",
                email:"",
                label: "",
                id: 0,
                user_group: data.value.user_group,
                hours: 0,
                SlotDays: {
                    Lun: [
                    ],
                    Mar: [
                    ],
                    Mer: [
                    ],
                    Gio: [
                    ],
                    Ven: [
                    ],
                    Sab: [
                    ],
                    Dom: [
                    ]
                }
            }
            for (const day in data.value.rules.openings) {
                data.value.rules.openings[day].forEach(element=>{
                    element.id = 0;
                    element.start = element.apertura;
                    element.finish = element.chiusura;
                })
                obj.SlotDays[day] = data.value.rules.openings[day];        
            }
            data.value.workers.push(obj);
        }
        async function updateWorkers(){
            let obj = data.value;
            const res = await directorMethods.updateResources(obj);
            if (res) {
                ctx.emit('submit')
            }
            else {
                console.log("problems saving! offline?")
            }
        }
        async function deleteWorker(workerId,index){
            if(workerId == 0){
                data.value.workers.splice(index,1);
            }
            else{
                const res = await directorMethods.deleteResource([workerId]);
                if(!res){
                    console.log("delete fallito!");
                }
                else{
                    console.log(res);
                    data.value.workers.splice(index,1);
                }
            }
        }
        function addSlotDay(index,day){
            let obj={
                id:0,
                start:"00:00",
                finish:"00:00"
            }
            data.value.workers[index].SlotDays[day].push(obj);
        }

        return {
            data, openModal, closeModal, modalRef, togglePanel, addResource,updateWorkers,deleteWorker,addSlotDay
        }
    }
}
</script>