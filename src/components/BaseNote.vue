<template>
	<div style="max-width:150px" class="card">
		<img src="../assets/icon-256x256.png" class="card-img-top" alt="...">
		<div class="card-body">
			<h5 class="card-title">{{note.title}}</h5>
			<p class="card-text">{{note.text}}</p>
		<button class="btn btn-danger" @click="$emit('delete', note)" >Cancella</button>
	</div>
	<div class="card-footer">
			<p class="card-text">
				<small v-if="note.temp==true" class="text-muted">Not Synced...</small>
				<small v-else class="text-muted">Online</small></p>
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