<template>
	<h1>Notes!</h1>
	<div class="notesForm">
		<BaseInput v-model="note[0].title" label="Title"/>
		<BaseInput v-model="note[0].text" label="Text" />
		<button class="btn btn-primary" @click="PostNote">Add Note</button>
		<p>{{ notes }}</p>
		<p>{{ note }}</p>
	</div>
	<div class="row row-cols-1 row-cols-md-3 g-4">
		<BaseNote v-for="note in notes" :key="note.id" :title="note.title" :text="note.text" />
	</div>
</template>
<script>
import { ref,onMounted,reactive } from 'vue'
import BaseInput from '../components/BaseInput'
import NotesMethods from '../api/resources/NotesMethods'
import BaseNote from '../components/BaseNote'
import indexedMethods from "../api/resources/indexedMethods"
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
			const OfflineNotes = await indexedMethods.getDataDb(indexedDB.value);
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
				await indexedMethods.saveNote(indexedDB.value,object)
			}
			else {
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