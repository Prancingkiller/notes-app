<template>
    <button class="btn btn-secondary" @click="openModal">{{ label }}</button>

    <div class="modal fade" tabindex="-1" aria-hidden="true" ref="modalRef">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Aggiungi Gruppo: {{ data.name }}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                        @click="closeModal"></button>
                </div>
                <div class="modal-body">
                    <div class="notesForm" style="display:flex;flex-direction: row;flex-wrap: wrap;">
                        <input type="text" v-model="data.name">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-success" @click="addGroup()">Salva</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { ref, onMounted } from 'vue'
import { Modal } from 'bootstrap'
export default {
    props: {
        label:String
    },
    setup(props){
        const modalRef = ref(null);
        var modal = Modal;
        const data = ref({id:0,name:""});
        onMounted(() => {
            modal = new Modal(modalRef.value);
        })
        function openModal() {
            modal.show()
        }
        function closeModal() {
            modal.hide()
        }
        function addGroup(){
            console.log(data.value)
        }
        return{
            modalRef,openModal,closeModal,addGroup,data
        }
    }
}
</script>