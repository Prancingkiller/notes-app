<template>
	<div v-if="note.temp==true" style="max-width:150px;background-color: #0000002b;" class="card">
		<div class="card-body">
			<h5 class="card-title">{{note.title}}</h5>
			<p class="card-text">{{note.text}}</p>
			<button class="btn btn-danger" @touchstart="$emit('delete', note)" @click="$emit('delete', note)" >Cancella</button>
		</div>
	</div>
	<div v-else style="max-width:150px" class="card">
		<div class="card-body">
			<h5 class="card-title">{{note.title}}</h5>
			<p class="card-text">{{note.text}}</p>
			<button class="btn btn-danger" @touchstart="$emit('delete', note)" @click="$emit('delete', note)" >Cancella</button>
		</div>
	</div>
</template>
<script>
export default{
		name:"BaseNote",
		props:{
				note:{
						type:Object
				}
		}
}
</script>