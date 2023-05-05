<template>
	<button @click="makeShift">Make Shift</button>
	<div ref="tableResult" class="tableResult"></div>
	<input type="checkbox" v-model="days" value="Lun">
	<input type="checkbox" v-model="days" value="Mar">
	<input type="checkbox" v-model="days" value="Mer">
	<input type="checkbox" v-model="days" value="Gio">
	<input type="checkbox" v-model="days" value="Ven">
	<input type="checkbox" v-model="days" value="Sab">
	<input type="checkbox" v-model="days" value="Dom">
	<div v-for="worker in workers" :key="worker.id">
	<p>{{ worker.name }}<span> - Ore: <input type="number" v-model="worker.hours"></span></p> 
	<div>Lun <input v-for="(slot,i) in full" :key="i" type="checkbox" v-model="worker.SlotDays.Lun" :value="slot"></div>
	<div>Mar <input v-for="(slot,i) in full" :key="i" type="checkbox" v-model="worker.SlotDays.Mar" :value="slot"></div>
	<div>Mer <input v-for="(slot,i) in full" :key="i" type="checkbox" v-model="worker.SlotDays.Mer" :value="slot"></div>
	<div>Gio <input v-for="(slot,i) in full" :key="i" type="checkbox" v-model="worker.SlotDays.Gio" :value="slot"></div>
	<div>Ven <input v-for="(slot,i) in full" :key="i" type="checkbox" v-model="worker.SlotDays.Ven" :value="slot"></div>
	<div>Sab <input v-for="(slot,i) in full" :key="i" type="checkbox" v-model="worker.SlotDays.Sab" :value="slot"></div>
	<div>Dom <input v-for="(slot,i) in full" :key="i" type="checkbox" v-model="worker.SlotDays.Dom" :value="slot"></div>
	</div>
	<div>
		<h1>Options:</h1>
		<p>Minimum time between shifts (in hours): <span><input type="number" v-model="minTimeBetweenShifts"></span></p>
	</div>
	<div class="row">
    <div class="col-8">
      <h3>Nested draggable</h3>
      <nested-draggable :tasks="shift.data[1]" />
    </div>

    <rawDisplayer class="col-3" :value="shift.data[1]" title="Data" />
  </div>
</template>
<script>
import ManagerMethods from "@/api/resources/ManagerMethods";
import {ref} from "vue"
import { VueDraggableNext } from 'vue-draggable-next'
export default{
	setup(){
		var full = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54];
		var morning = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29];
		var afternoon = [28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54];
		const workers = ref([
			{name:"Salome",id:1,hours:18,SlotDays:{Lun:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29],Mar:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29],Mer:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29],Gio:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29],Ven:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29],Sab:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29],Dom:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29]}},
			{name:"Stefano",id:2,hours:21,SlotDays:{Lun:full,Mar:full,Mer:full,Gio:full,Ven:full,Sab:full,Dom:full}},
			{name:"Marco",id:3,hours:18,SlotDays:{Lun:morning,Mar:morning,Mer:morning,Gio:morning,Ven:morning,Sab:morning,Dom:morning}},
			{name:"Luca",id:4,hours:18,SlotDays:{Lun:full,Mar:full,Mer:full,Gio:full,Ven:full,Sab:full,Dom:full}},
			{name:"Diego",id:5,hours:18,SlotDays:{Lun:full,Mar:full,Mer:full,Gio:full,Ven:full,Sab:full,Dom:full}},
			{name:"Luigi",id:6,hours:21.5,SlotDays:{Lun:full,Mar:full,Mer:full,Gio:full,Ven:full,Sab:full,Dom:full}},
			{name:"Francesca",id:7,hours:18,SlotDays:{Lun:morning,Mar:morning,Mer:morning,Gio:morning,Ven:morning,Sab:morning,Dom:morning}},
			{name:"Elena",id:8,hours:21,SlotDays:{Lun:morning,Mar:morning,Mer:morning,Gio:morning,Ven:morning,Sab:morning,Dom:morning}},
			{name:"Roberta",id:9,hours:18,SlotDays:{Lun:full,Mar:full,Mer:full,Gio:full,Ven:full,Sab:full,Dom:full}},
			{name:"Giulia",id:10,hours:18,SlotDays:{Lun:full,Mar:full,Mer:full,Gio:full,Ven:full,Sab:full,Dom:full}},
			{name:"Giorgia",id:11,hours:18,SlotDays:{Lun:full,Mar:full,Mer:full,Gio:full,Ven:full,Sab:full,Dom:full}},
			{name:"Simone",id:12,hours:21,SlotDays:{Lun:full,Mar:full,Mer:full,Gio:full,Ven:full,Sab:full,Dom:full}},
			{name:"Francesco",id:13,hours:21,SlotDays:{Lun:afternoon,Mar:afternoon,Mer:afternoon,Gio:afternoon,Ven:afternoon,Sab:afternoon,Dom:afternoon}},
			{name:"Ettore",id:14,hours:21,SlotDays:{Lun:afternoon,Mar:afternoon,Mer:afternoon,Gio:afternoon,Ven:afternoon,Sab:afternoon,Dom:afternoon}},
			{name:"Matteo",id:15,hours:18,SlotDays:{Lun:full,Mar:full,Mer:full,Gio:full,Ven:full,Sab:full,Dom:full}},
			{name:"Chiara",id:16,hours:18,SlotDays:{Lun:full,Mar:full,Mer:full,Gio:full,Ven:full,Sab:full,Dom:full}},
			{name:"Daniele",id:17,hours:18,SlotDays:{Lun:full,Mar:full,Mer:full,Gio:full,Ven:full,Sab:full,Dom:full}},
			{name:"Vittorio",id:18,hours:21,SlotDays:{Lun:full,Mar:full,Mer:full,Gio:full,Ven:full,Sab:full,Dom:full}},
			{name:"Marika",id:19,hours:32,SlotDays:{Lun:afternoon,Mar:afternoon,Mer:afternoon,Gio:afternoon,Ven:afternoon,Sab:afternoon,Dom:afternoon}},
			{name:"Sergio",id:20,hours:18,SlotDays:{Lun:afternoon,Mar:afternoon,Mer:afternoon,Gio:afternoon,Ven:afternoon,Sab:afternoon,Dom:afternoon}},
			{name:"Emanuele",id:21,hours:22,SlotDays:{Lun:afternoon,Mar:afternoon,Mer:afternoon,Gio:afternoon,Ven:afternoon,Sab:afternoon,Dom:afternoon}},
			{name:"Flaminio",id:22,hours:22,SlotDays:{Lun:afternoon,Mar:afternoon,Mer:afternoon,Gio:afternoon,Ven:afternoon,Sab:afternoon,Dom:afternoon}},
			{name:"Laura",id:23,hours:40,SlotDays:{Lun:afternoon,Mar:afternoon,Mer:afternoon,Gio:afternoon,Ven:afternoon,Sab:afternoon,Dom:afternoon}},
			{name:"Giada",id:24,hours:40,SlotDays:{Lun:full,Mar:full,Mer:full,Gio:full,Ven:full,Sab:full,Dom:full}},
			{name:"Giovanni",id:25,hours:24,SlotDays:{Lun:morning,Mar:morning,Mer:morning,Gio:morning,Ven:morning,Sab:morning,Dom:morning}}
			]);
		const slots = ref([
			{slotN:1,required:1},{slotN:2,required:1},{slotN:3,required:1},{slotN:4,required:1},{slotN:5,required:2},{slotN:6,required:2},{slotN:7,required:2},{slotN:8,required:3},{slotN:9,required:3},{slotN:10,required:3},{slotN:11,required:3},{slotN:12,required:3},{slotN:13,required:4},{slotN:14,required:4},{slotN:15,required:4},{slotN:16,required:4},{slotN:17,required:6},{slotN:18,required:6},{slotN:19,required:6},{slotN:20,required:7},{slotN:21,required:7},{slotN:22,required:8},{slotN:23,required:8},{slotN:24,required:8},{slotN:25,required:8},{slotN:26,required:7},{slotN:27,required:7},{slotN:28,required:6},{slotN:29,required:6},{slotN:30,required:5},{slotN:31,required:5},{slotN:32,required:4},{slotN:33,required:4},{slotN:34,required:5},{slotN:35,required:5},{slotN:36,required:5},{slotN:37,required:6},{slotN:38,required:6},{slotN:39,required:6},{slotN:40,required:7},{slotN:41,required:7},{slotN:42,required:8},{slotN:43,required:8},{slotN:44,required:7},{slotN:45,required:7},{slotN:46,required:7},{slotN:47,required:7},{slotN:48,required:7},{slotN:49,required:7},{slotN:50,required:6},{slotN:51,required:6},{slotN:52,required:5},{slotN:53,required:5},{slotN:54,required:4}
			]);
		const days = ref(["Lun","Mar","Mer","Gio","Ven","Sab","Dom"]);
		const minTimeBetweenShifts = ref(2);
		const tableResult = ref(null);
		var data;
		const shift = ref({data:[null,null]});
		async function makeShift(){
			data = JSON.stringify({
				days:days.value,
				slots:slots.value,
				workers:workers.value,
				minTimeBetweenShifts:(minTimeBetweenShifts.value*4)
			})
			shift.value = await ManagerMethods.makeShift(data)
			console.log(shift.value);
			tableResult.value.innerHTML = shift.value.data[0];
		}

		return{workers,slots,days,makeShift,full,minTimeBetweenShifts,tableResult,shift}
	},
	components:{
		
	}
}
</script>
<style scoped>
.tableResult /deep/ td{
	border-style: solid;
	border-width:1px;
	border-color:black
}

.tableResult /deep/ .red{
background-color:red;
}
.tableResult /deep/ .green{
background-color:green;
}
.tableResult /deep/ .orange{
background-color:orange;
}
.tableResult /deep/ .black{
background-color:black;
}
.red{
background-color:red;
}
.green{
background-color:green;
}
.orange{
background-color:orange;
}
.black{
background-color:black;
}
</style>