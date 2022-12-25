<template>
	<p>{{ pickedDay }}</p>
	<div ref="calendar" @click="clicked"></div>
</template>
<script>
import  moment  from 'moment'
import {onMounted,ref,onUpdated} from 'vue'
import EventsMethods from '../api/resources/EventsMethods'
export default{
	emits: ['updateModal','showModal'],
	name:"BaseCalendar",
	setup(props,context){
		var pickedDay = ref({});
		var pickedMonth = ref({});
		var pickedYear = ref({});
		var events = ref({});
		const calendar = ref(null)
		const rome = require("../../node_modules/@bevacqua/rome/")

		onMounted(init)

		function init(){
			rome(calendar.value,{time: false, inputFormat: 'YYYY-MM-DD', dateValidator: function (d) {
			return moment(d).day();
			}}).on('data', function (value) {
				pickedDay.value = value;
				context.emit('updateModal',pickedDay.value)
			})
			.on('month', function (value) {
				pickedMonth.value = value+1;
				loadEvents();
			})
			.on('ready', function (value) {
				pickedDay.value = moment().locale("Europe/Rome").format("YYYY-MM-DD");
				pickedMonth.value = moment().locale("Europe/Rome").format("MM");
				pickedYear.value = moment().locale("Europe/Rome").format("YYYY");
				loadEvents();
			})
		}
		function clicked(event){
			if(event.target.className == "rd-day-body rd-day-selected"){
				context.emit('showModal',pickedDay.value)
			}
		}

		async function loadEvents(){
			var object = {
				month:pickedMonth.value,
				year:pickedYear.value
			}
			events.value = await EventsMethods.loadEvents(object);
			console.log(events.value)
		}

		return{calendar,pickedDay,clicked}
	},
}
</script>