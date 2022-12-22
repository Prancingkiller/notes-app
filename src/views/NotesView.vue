<template>
  <h1>Notes!</h1>
  <div class="notesForm">
    <BaseInput v-model="note.title" label="Title"/>
    <BaseInput v-model="note.text" label="Text" />
    <button class="btn btn-primary" @click="PostNote">Add Note</button>
    <p>{{ notes }}</p>
  </div>
  <div class="row row-cols-1 row-cols-md-3 g-4">
    <BaseNote v-for="note in notes" :key="note.id" :title="note.title" :text="note.text" />
  </div>
</template>
<script>
import { ref,onMounted } from 'vue'
import BaseInput from '../components/BaseInput'
import NotesMethods from '../api/resources/NotesMethods'
import BaseNote from '../components/BaseNote'
import indexedMethods from "../api/resources/indexedMethods"
export default{
   setup(){
    const note = ref({
      title:'',
      text:''
    })
    const notes = ref([]); 
    onMounted(ShowNotes)

    async function ShowNotes(){
      var db;
      db = await indexedMethods.initiate();
      notes.value = await NotesMethods.getNotes();
      console.log("online data: "+notes.value)
      const OfflineNotes = await indexedMethods.getDataDb(db);
      console.log("offline data: "+OfflineNotes)
      Array.prototype.push.apply(notes.value,JSON.parse(OfflineNotes));
      console.log(notes.value)
    }
    async function PostNote(){
      if(await NotesMethods.postNote(note.value)==false){
        console.log("sei offline!")
      }
      else{
        console.log("Nota inviata")
        ShowNotes();
      }
    }

    return{note,notes,PostNote}
  },
  components:{
    BaseInput,
    BaseNote
  }
}
</script>