<template>
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
		var toParent = ref({
			pickedDay : "",
			pickedMonth : "",
			pickedYear : ""
		});
		var pickedDay = ref({});
		var pickedMonth = ref({});
		var pickedYear = ref({});
		var events = ref({});
		var dayEvents = ref([]);
		const calendar = ref(null)
		const rome = require("../../node_modules/@bevacqua/rome/")

		onMounted(init)

		function init(){
			rome(calendar.value,{time: false, inputFormat: 'YYYY-MM-DD', dateValidator: function (d) {
			return moment(d).day();
			}}).on('data', function (value) {
				toParent.value.pickedDay = value;
				context.emit('updateModal',toParent.value)
			})
			.on('month', function (value) {
				toParent.value.pickedMonth = value+1;
			})
			.on('year', function (value) {
				toParent.value.pickedYear = value;
			})
			.on('ready', function (value) {
				toParent.value.pickedDay = moment().locale("Europe/Rome").format("YYYY-MM-DD");
				toParent.value.pickedMonth = moment().locale("Europe/Rome").format("MM");
				toParent.value.pickedYear = moment().locale("Europe/Rome").format("YYYY");
			})
		}
		function clicked(event){
			if(event.target.className == "rd-day-body rd-day-selected"){
				context.emit('showModal',toParent.value)
			}
		}

		return{calendar,pickedDay,clicked}
	},
}
</script>