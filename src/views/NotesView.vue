<template>
  <h1>Notes!</h1>
  <div class="notesForm">
    <BaseInput v-model="note.title" label="Title"/>
    <BaseInput v-model="note.text" label="Text" />
    <button class="btn btn-primary">Add Note</button>
  </div>
  <div class="row row-cols-1 row-cols-md-3 g-4">
    <BaseNote v-for="note in notes" :key="note.id" :title="note.title" :text="note.text" />
  </div>
</template>
<script>
import { ref,onMounted } from 'vue'
import BaseInput from '../components/BaseInput'
import LogMethods from '../api/resources/NotesMethods'
import BaseNote from '../components/BaseNote'
import indexedMethods from "../api/resources/indexedMethods"
export default{
   setup(){
    const note = ref({
      title:'',
      text:''
    })
    const notes = ref([]); 
    const db = ref({});
    onMounted(WriteNotes)

    async function WriteNotes(){
        const dbName = "notes";
        const dbVersion = 1;
        const request = indexedDB.open(dbName,dbVersion);
         request.onupgradeneeded = e => {
              db.value = e.target.result
              const pNotes = db.value.createObjectStore("notes_add", {keyPath: "id", autoIncrement:true})
                        const dNotes = db.value.createObjectStore("notes_remove", {keyPath: "toRemove"})
                        const eventStore = db.value.createObjectStore("events_add", {keyPath: "id", autoIncrement:true})
                
              }
        request.onsuccess = e => {
              db.value = e.target.result
              
            }
      console.log(db.value);
      notes.value = await LogMethods.getNotes(db.value);
      console.log("online data: "+notes.value)
      const OfflineNotes = await indexedMethods.getDataDb(db.value);
      console.log("offline data: "+OfflineNotes)
      Array.prototype.push.apply(notes.value,JSON.parse(OfflineNotes));
      notes.value = JSON.stringify(notes.value);
      console.log(notes.value)
    }

    return{note,notes}
  },
  components:{
    BaseInput,
    BaseNote
  }
}
</script>