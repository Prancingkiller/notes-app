<template>
	<h1>Notes!</h1>
	<div class="notesForm">
		<BaseInput v-model="note[0].title" label="Title"/>
		<BaseInput v-model="note[0].text" label="Text" />
		<button class="btn btn-primary" @click="PostNote">Add Note</button>
		<p>{{ notes }}</p>
		<p>{{ note }}</p>
	</div>
	<div style="max-width:600px;margin:auto" class="card-group">
		<BaseNote v-for="note in notes" :key="note.id" :note="note" @delete="onDelete" />
	</div>
</template>
<script>
import { ref,onMounted,reactive } from 'vue'
import BaseInput from '../components/BaseInput'
import NotesMethods from '../api/resources/NotesMethods'
import BaseNote from '../components/BaseNote'
import indexedMethods from "../api/resources/indexedMethods"
import swCalls from "../api/resources/swCalls"

export default{
	setup(){
		const note = reactive([{
			title:'',
			text:''
		}])
		const notes = ref([]);
		const indexedDB = ref({}); 
		onMounted(ShowNotes)

		async function ShowNotes(){
			var db;
			db = await indexedMethods.initiate();
			indexedDB.value = db;
			notes.value = await NotesMethods.getNotes();
			console.log("online data: "+notes.value)
			const OfflineNotes = await indexedMethods.getDataDb(indexedDB.value,"notes_add");
			console.log("offline data: "+OfflineNotes)
			Array.prototype.push.apply(notes.value,JSON.parse(OfflineNotes));
			console.log(notes.value)
		}
		async function PostNote(){
			if(await NotesMethods.postNote(note)==false){
				console.log("sei offline!")
				const object = [{
					title:note[0].title,
					text:note[0].text,
					temp:true
			}];
				await indexedMethods.saveData(indexedDB.value,object,'notes_add')
				swCalls.registersync("notes_add")
				ShowNotes();
			}
			else {
				console.log("Nota inviata")
				ShowNotes();
			}
		}
		navigator.serviceWorker.addEventListener('message', function(event) {
			if(event.data.store=="notes_add"){
				if(event.data.newData != false){
					ShowNotes();
				}
			}
		})

		async function onDelete(e){
			if(e.temp == true){
				indexedMethods.deleteNote(indexedDB.value,e.id)
				ShowNotes();
			}
			else{
				const object = [{
					toRemove:e.id
				}];
				if( await NotesMethods.deleteNote(object)==false){
				alert("Impossible cancellare, sei offline?")
				}
				else{
				console.log("nota cancellata")
				ShowNotes();
				}
			}
			
		}
		return{note,notes,PostNote,onDelete}
	},
	components:{
		BaseInput,
		BaseNote
	}
}
</script>