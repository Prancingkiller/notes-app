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
    let db;
    onMounted(WriteNotes)

    async function WriteNotes(){
      db = await indexedMethods.initiate();
      console.log(db);
      notes.value = await LogMethods.getNotes();
      console.log("online data: "+notes.value)
      const OfflineNotes = await indexedMethods.getDataDb(db);
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