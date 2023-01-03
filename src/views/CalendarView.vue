<template>
		<h1>Calendar</h1>
		<div class="col-md-10 text-center">
					<h3>Totale ore mese: {{ HrMonth }}</h3>
					<h3 v-if="realSalary == null">Previsione Stipendio: {{ PrevisionSalary }}</h3>
					<h3 v-else>Stipendio ricevuto: {{ realSalary }}</h3>
					<input type="hidden" class="form-control w-25 mx-auto mb-3" id="result" placeholder="" disabled="">
					<form action="#" class="row">
						<div class="col-md-12">
							<BaseCalendar @updateModal="onDayChange" @showModal="onShowModal" />
						</div>
					</form>
		</div>
		<div class="modal fade" tabindex="-1" aria-hidden="true" ref="modalRef">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="exampleModalLabel">Giorno: {{ pickedDay }}</h5>
						<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div class="modal-body">
						<div id="dayBody">
							<p>Events for Today:</p>
							<div style="display:flex;flex-wrap:wrap">
								<div v-for="(event,i) in dayEvents" :key="i" class="card" style="width: 14rem;">
									<div class="card-body">
										<div class="row">
											<div class="col-6">
												<BaseInput style="max-width:80px" type="time" v-model="event.time_start" label="Start" />
											</div>
											<div class="col-6">
												<BaseInput style="max-width:80px" type="time" v-model="event.time_finish" label="Finish" />
											</div>
											<p v-if="event.temp==true">Not Sync...</p>
										</div>
										<div class="row">
											<button style="width:8rem;margin:auto;margin-top:5px" @click="eventDelete(event,i)">Delete</button>
										</div>
									</div>
									</div>
							</div>
							<p>New events:</p>
							<div style="display:flex;flex-wrap:wrap">
								<div v-for="(event,i) in newEvents" :key="i" class="card" style="width: 14rem;">
									<div class="card-body">
										<div class="row">
											<div class="col-6">
												<BaseInput style="max-width:80px" type="time" v-model="event.time_start" label="Start" />
											</div>
											<div class="col-6">
												<BaseInput style="max-width:80px" type="time" v-model="event.time_finish" label="Finish" />
											</div>
											<p v-if="event.temp==true">Not Sync...</p>
										</div>
										<div class="row">
											<button style="width:8rem;margin:auto;margin-top:5px" @click="eventDelete(event,i)">Delete</button>
										</div>
									</div>
								</div>
							</div>		
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-primary" @click="addNewEvent">Add New</button>
						<button type="button" class="btn btn-success" @click="PostEvent">Save changes</button>
					</div>
				</div>
			</div>
		</div>
					
			
</template>
<script> 
import BaseCalendar from '../components/BaseCalendar';
import BaseInput from '../components/BaseInput.vue';
import EventsMethods from '../api/resources/EventsMethods'
import indexedMethods  from '@/api/resources/indexedMethods';
import{ref,onMounted,toRaw} from 'vue'
import  {Modal}  from 'bootstrap'
export default {

setup(){
	var events = ref({});
	var dayEvents = ref([]);
	var newEvents = ref([]);
	const modalRef = ref(null);
	var pickedDay = ref();
	var pickedMonth = ref({});
	var pickedYear = ref({});
	var realSalary = ref(null);
	var HrMonth = ref(null);
	var AverageSalary = ref(null);
	var PrevisionSalary = ref(null);
	let modal = Modal ;
	onMounted(() => {
		if (modalRef.value) {
		modal = new Modal(modalRef.value)
		}
	})
	function launchModal() {
		modal.show()
	}
	function closeModal() {
		modal.hide()
	}
	function onDayChange(e){
		pickedDay.value=e.pickedDay
		pickedMonth.value = e.pickedMonth
		pickedYear.value = e.pickedYear
		loadEvents();
	}
	function onShowModal(e){
		launchModal()
	}
	async function loadEvents(){
			var db;
			db = await indexedMethods.initiate();
			indexedDB.value = db;
			var object = {
				month:pickedMonth.value,
				year:pickedYear.value
			}
			events.value = await EventsMethods.loadEvents(object); 
			const offlineEvents = JSON.parse(await indexedMethods.getDataDb(db,"events_add"))
			var ids = new Set(offlineEvents.map(d=>d.id));
			const merged = [...offlineEvents,...events.value.filter(d=>!ids.has(d.id))];
			events.value = merged
			await getRealSalary();
			loadDay();
			calculation();
		}
		function loadDay(){
			dayEvents.value = []
			newEvents.value = []
			events.value.forEach(element =>{
				if(element.date == pickedDay.value){
					dayEvents.value.push(element)
				}
			})
			console.log(dayEvents.value)
		}
		
		function addNewEvent(){
			const object = {
				id:0,
				date:pickedDay.value,
				temp:true
			};
			newEvents.value.push(object)
		}

		async function eventDelete(event,arrayPos){
		if(event.temp == true){
			if(event.idIndexed == undefined){
				newEvents.value.splice(arrayPos,1)
			}
			else{
				console.log("evento temporaneo!")
				indexedMethods.deleteNote(indexedDB.value,event.idIndexed,"events_add")
				await loadEvents();
				await postNewAverage();
			}
		}
		else{
			const obj = [{
				id : event.id
			}]
			if( await EventsMethods.deleteEvent(obj)==false){
				alert("Impossible cancellare, sei offline?")
				}
				else{
				console.log("Evento cancellato")
				await loadEvents();
				await postNewAverage();
				}
		}
	}

		async function PostEvent(){
			newEvents.value.forEach(element=>{dayEvents.value.push(element)})
			newEvents.value = [];
			if(await EventsMethods.postEvent(dayEvents.value)==false){
			console.log("Sei offline!")
			const object = toRaw(dayEvents.value)
			console.log(object)
			await indexedMethods.saveData(indexedDB.value,object,'events_add')
			await loadEvents();
			await postNewAverage();
			}
			else {
				console.log("Eventi salvati")
				await loadEvents();
				await postNewAverage();
			}
		}

		navigator.serviceWorker.addEventListener('message', function(event) {
			if(event.data.store=="events_add"){
				if(newEvents.value.length == 0){
					loadEvents();
				}
			}
		})  

		function calculateDiff(startTime,finishTime){
			var time_start = new Date();
			var time_end = new Date();
			var value_start = startTime.concat(":00").split(':');
			var value_end = finishTime.concat(":00").split(':');
			time_start.setHours(value_start[0], value_start[1], value_start[2], 0)
			time_end.setHours(value_end[0], value_end[1], value_end[2], 0);
			return ((time_end - time_start)/3600000) // hours
		}
		function calculateMonth(month){
			var total = 0;
			events.value.forEach(element=>{
				var parts = element.date.split('-');
				if(parts[1]==month)
				{
					total += calculateDiff(element.time_start,element.time_finish)
				}
			})
			return total;
		}

		async function calculateSalary(){
			AverageSalary.value = await EventsMethods.getAverageSalary();
			PrevisionSalary.value = (AverageSalary.value*HrMonth.value).toFixed(2);
		}

		async function postNewAverage(){
			const object = {
				actualMonth:pickedMonth.value,
				actualHours:HrMonth.value,
				actualYear:pickedYear.value,
				actualSalary:realSalary.value
			}
			if(await EventsMethods.postAverage(object)==false){
			await indexedMethods.saveData(indexedDB.value,object,'salary_add')
			}
			else {
				console.log("Salaries salvati")
			}
		}

		async function getRealSalary(){
			const object = {
				year:pickedYear.value,
				month:pickedMonth.value
			}
			var sal = await EventsMethods.getSalaryAmount(object);
			if (sal != null){
				realSalary.value = sal
			}
			else{
				realSalary.value = null
			}
		}

		function calculation(){
			HrMonth.value = calculateMonth(pickedMonth.value);
			calculateSalary();
		}

	return{pickedDay,onDayChange,modalRef,onShowModal,dayEvents,addNewEvent,eventDelete,PostEvent,HrMonth,PrevisionSalary,realSalary,newEvents}
},
components:{
	BaseCalendar,
	BaseInput
}
}

</script>
<style>
.rd-container {
	display: none;
	/*border: 1px solid #333;*/
	background-color: #fff;
	padding: 10px;
	text-align: center;
	box-shadow: 0 15px 30px 0 rgba(0,0,0,.2);

}
.rd-container-attachment {
	position: absolute;
}
.rd-month {
	display: inline-block;
	margin-right: 25px;
}
.rd-month:last-child {
	margin-right: 0;
}
.rd-back,
.rd-next {
	cursor: pointer;
	border: none;
	outline: none;
	background: none;
	padding: 0;
	margin: 0;
}
.rd-back[disabled],
.rd-next[disabled] {
	cursor: default;
}
.rd-back {
	float: left;
	margin-left: 10px;
}
.rd-next {
	float: right;
	margin-right: 10px;
}
.rd-back:before {
	display: block;
	content: '\2190';
}
.rd-next:before {
	display: block;
	content: '\2192';
}
.rd-day-body {
	cursor: pointer;
	text-align: center;
	/* new */
	line-height: 0;
	width: 50px!important;
	height: 50px!important;
}
.rd-day-selected,
.rd-time-selected,
.rd-time-option:hover {
	cursor: pointer;
	background-color: #f67280;
	color: #fff;
	/* new */
	border-radius: 50%;
}
.rd-day-prev-month,
.rd-day-next-month {
	color: #ccc;
}
.rd-day-disabled {
	cursor: default;
	color: #fcc;
}
.rd-time {
	position: relative;
	display: inline-block;
	margin-top: 5px;
	min-width: 80px;
}
.rd-time-list {
	display: none;
	position: absolute;
	overflow-y: scroll;
	max-height: 160px;
	left: 0;
	right: 0;
	background-color: #fff;
	color: #333;
}
.rd-time-selected {
	padding: 5px;
}
.rd-time-option {
	padding: 5px;
}
.rd-day-concealed {
	visibility: hidden;
}

.rd-days {
	margin-top: 20px;
}
</style>