<template>
	<loading :active="isLoading" :can-cancel="true" :on-cancel="onCancel" :is-full-page="fullPage"></loading>
	<div class="external-event" v-for="(item, i) in baseDrag" :key="i" draggable="true"
		@dragstart="onEventDragStart($event, item)">
		<button>Crea Turno Base (trascina)</button>
		<!-- ({{ item.duration ? `${item.duration} min` : 'no duration' }}) -->
	</div>
	<button class="btn btn-primary" :disabled="tempEvents.length > 1 || activeView != 'day'" @click="makeShift">Genera
		Turni</button>
	<button class="btn btn-warning" :disabled="daysTest.length == 0" @click="debugShift">Debug Turni</button>
	<button class="btn btn-success" :disabled="tempEvents.length == 0" @click="postShift">Pubblica Turni</button>
	<vue-cal class="" :selected-date="selectedDay" :timeFrom="calendarRanges.apertura" :timeTo="calendarRanges.chiusura"
		:disableViews="disabledViews" :events="daysTest" :sticky-split-labels=true :snapToTime=15 :split-days="workers"
		:special-hours="highlights" :min-split-width=70 locale="it" :active-view="activeView" editable-events
		@view-change="updateSelectedDay($event)" @ready="loadEvents()" :on-event-create="onEventCreate"
		:drag-to-create-event="false" @event-change="changeEvent($event)" @event-delete="deleteEvent($event)"
		:on-event-dblclick="selectEvent">

	</vue-cal>
	<div ref="tableResult" class="tableResult" style="display:none"></div>

	<h1 @click="showOptions">Options:</h1>
	<div v-if="options">
		<input type="checkbox" v-model="days" value="Lun">
		<input type="checkbox" v-model="days" value="Mar">
		<input type="checkbox" v-model="days" value="Mer">
		<input type="checkbox" v-model="days" value="Gio">
		<input type="checkbox" v-model="days" value="Ven">
		<input type="checkbox" v-model="days" value="Sab">
		<input type="checkbox" v-model="days" value="Dom">
		<div class="notesForm" style="display:flex;flex-direction: row;flex-wrap: wrap;">
			<div class="border p-3" style="width:350px;" v-for="(worker, ii) in workers" :key="worker.id">
				<p>{{ worker.name }}<span> - Ore: {{ worker.hours }} <input type="range" min="0"
							max="40" v-model="worker.hours"></span></p>
				<button @click="togglePanel(ii)" class="btn btn-primary">Pannello
					orari</button>
				<div v-if="worker.showDays">
					<div>Lun
						<div v-for="(slot, i) in worker.SlotDays.Lun" :key="i">
							<input type="time" v-model="slot.start">
							<input type="time" v-model="slot.finish">
						</div>
						<button @click="addSlotDay(ii, 'Lun')">Add</button>
					</div>
					<div>Mar
						<div v-for="(slot, i) in worker.SlotDays.Mar" :key="i">
							<input type="time" v-model="slot.start">
							<input type="time" v-model="slot.finish">
						</div>
						<button @click="addSlotDay(ii, 'Mar')">Add</button>
					</div>
					<div>Mer
						<div v-for="(slot, i) in worker.SlotDays.Mer" :key="i">
							<input type="time" v-model="slot.start">
							<input type="time" v-model="slot.finish">
						</div>
						<button @click="addSlotDay(ii, 'Mer')">Add</button>
					</div>
					<div>Gio
						<div v-for="(slot, i) in worker.SlotDays.Gio" :key="i">
							<input type="time" v-model="slot.start">
							<input type="time" v-model="slot.finish">
						</div>
						<button @click="addSlotDay(ii, 'Gio')">Add</button>
					</div>
					<div>Ven
						<div v-for="(slot, i) in worker.SlotDays.Ven" :key="i">
							<input type="time" v-model="slot.start">
							<input type="time" v-model="slot.finish">
						</div>
						<button @click="addSlotDay(ii, 'Ven')">Add</button>
					</div>
					<div>Sab
						<div v-for="(slot, i) in worker.SlotDays.Sab" :key="i">
							<input type="time" v-model="slot.start">
							<input type="time" v-model="slot.finish">
						</div>
						<button @click="addSlotDay(ii, 'Sab')">Add</button>
					</div>
					<div>Dom
						<div v-for="(slot, i) in worker.SlotDays.Dom" :key="i">
							<input type="time" v-model="slot.start">
							<input type="time" v-model="slot.finish">
						</div>
						<button @click="addSlotDay(ii, 'Dom')">Add</button>
					</div>
				</div>
			</div>
		</div>
		<!-- <div v-for="(worker, ii) in workers" :key="worker.id">
			<p>{{ worker.name }}<span> - Ore: <input type="number" v-model="worker.hours"></span></p>
			<button @click="togglePanel(ii)">Pannello orari</button>
			<div v-if="worker.showDays">
				<div>Lun
					<div v-for="(slot, i) in worker.SlotDays.Lun" :key="i">
						<input type="time" v-model="slot.start">
						<input type="time" v-model="slot.finish">
					</div>
				</div>
				<div>Mar
					<div v-for="(slot, i) in worker.SlotDays.Mar" :key="i">
						<input type="time" v-model="slot.start">
						<input type="time" v-model="slot.finish">
					</div>
				</div>
				<div>Mer
					<div v-for="(slot, i) in worker.SlotDays.Mer" :key="i">
						<input type="time" v-model="slot.start">
						<input type="time" v-model="slot.finish">
					</div>
				</div>
				<div>Gio
					<div v-for="(slot, i) in worker.SlotDays.Gio" :key="i">
						<input type="time" v-model="slot.start">
						<input type="time" v-model="slot.finish">
					</div>
				</div>
				<div>Ven
					<div v-for="(slot, i) in worker.SlotDays.Ven" :key="i">
						<input type="time" v-model="slot.start">
						<input type="time" v-model="slot.finish">
					</div>
				</div>
				<div>Sab
					<div v-for="(slot, i) in worker.SlotDays.Sab" :key="i">
						<input type="time" v-model="slot.start">
						<input type="time" v-model="slot.finish">
					</div>
				</div>
				<div>Dom
					<div v-for="(slot, i) in worker.SlotDays.Dom" :key="i">
						<input type="time" v-model="slot.start">
						<input type="time" v-model="slot.finish">
					</div>
				</div>
			</div>
		</div> -->
		<p>Minimum time between shifts (in hours): <span><input type="number"
					v-model="configuration.minTimeBetweenShifts"></span></p>
		<p>Allow double turns (even if not strictly needed):<input type="checkbox"
				v-model="configuration.allowDoubleShifts"></p>
		<p>Minimum shift assignable (in hours): <input type="number" min="3" max="8" v-model="configuration.baseShift"></p>
		<div style="display:flex;flex-direction:row;justify-content: center;">
			<div v-for="(day, i) in days" :key="i">
				{{ day }}
				<table style="margin:5px" class="tableResult">
					<tr v-for="(slot, i) in configuration.slots[day]" :key="i">
						<td>{{ slot.start }}-{{ slot.finish }}</td>
						<td>
							<input type="number" v-model="slot.required" style="width:35px;border:0px">
						</td>
					</tr>
				</table>
			</div>
		</div>

	</div>
	<div v-if="efficency" style="position:fixed;bottom:5px;right:5px">
		<p>Efficenza: {{ efficency }}</p>
	</div>
</template>
<script lang="ts">
import WorkersMethods from "@/api/resources/WorkersMethods"
import ManagerMethods from "@/api/resources/ManagerMethods";
import { ref, computed, onBeforeMount, watch } from "vue"
import { useRoute } from 'vue-router'
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'
import type { workersData } from '../types/workers'
import type { shiftsData, eventPHP } from '../types/shifts'
import Loading from 'vue3-loading-overlay';
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';

declare global {
	interface Date {
		addDays(days: number, useThis?: boolean): Date,
	}
}
Date.prototype.addDays = function (d: number) { return new Date(this.valueOf() + 864E5 * d); };
export default {
	setup() {
		const workers = ref<workersData>([
			{ showDays: false, name: "user", label: "user", id: 0, hours: 0, SlotDays: { Lun: [{ start: "", finish: "" }], Mar: [{ start: "", finish: "" }], Mer: [{ start: "", finish: "" }], Gio: [{ start: "", finish: "" }], Ven: [{ start: "", finish: "" }], Sab: [{ start: "", finish: "" }], Dom: [{ start: "", finish: "" }] } },
		]);
		const days = ref(["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"]);

		const tableResult = ref<HTMLDivElement>();
		const daysTest = ref<eventPHP[]>([]);
		const tempEvents = ref<eventPHP[]>([]);
		var data;
		const disabledViews = ["years", "year", "week"];
		const activeView = ref("day");
		const selectedDay = ref(new Date(new Date().setHours(12, 0, 0, 0)));
		const selectedMonth = ref(selectedDay.value.getMonth() + 1);
		const selectedYear = ref(selectedDay.value.getFullYear());
		const splits = ref([{}]);
		const highlights = ref({});
		const shift = ref<{ data: eventPHP[] }>({ data: [] });
		const options = ref(false);
		const calendarRanges = { apertura: 0, chiusura: 1000 };
		var loadSettings = -1;
		const baseDrag = ref([{ duration: 0 }]);
		const efficency = ref<number | string | null>(null);
		const isLoading = ref(false);
		const fullPage = ref(true);
		const configuration = ref({
			minTimeBetweenShifts: 2,
			allowDoubleShifts: true,
			baseShift: 3,
			slots: { Lun: [{ slotN: null, required: null }], Mar: [{ slotN: null, required: null }], Mer: [{ slotN: null, required: null }], Gio: [{ slotN: null, required: null }], Ven: [{ slotN: null, required: null }], Sab: [{ slotN: null, required: null }], Dom: [{ slotN: null, required: null }] },
			openings: {},
		});

		onBeforeMount(async () => {
			const route = useRoute();
			let type = route.params.resource;
			loadOptions(type);
			loadWokersData(type);
		})

		async function loadOptions(type) {
			let data = await ManagerMethods.loadOptions(type);
			configuration.value = data;
			getLongestDay();
			baseDrag.value[0].duration = configuration.value.baseShift * 60
		}

		async function loadWokersData(type) {
			data = await WorkersMethods.getWorkers(type);
			workers.value = data;
			renderSplits();
		}


		function showOptions() {
			options.value = !options.value;
		}

		async function testEfficency() {
			efficency.value = "in corso...";
			data = JSON.stringify({
				days: days.value,
				startingDate: selectedMonday.value.toISOString().split('T')[0],
				slots: configuration.value.slots,
				workers: workers.value,
				minTimeBetweenShifts: (configuration.value.minTimeBetweenShifts * 4),
				allowDoubles: configuration.value.allowDoubleShifts,
				baseShift: configuration.value.baseShift,
				testEfficency: true,
				openings: configuration.value.openings
			})
			let result: { data: { efficency: number } } = await ManagerMethods.makeShiftV3(data);
			efficency.value = result.data.efficency
		}
		async function makeShift() {
			isLoading.value = true;
			data = JSON.stringify({
				days: days.value,
				startingDate: selectedMonday.value.toISOString().split('T')[0],
				slots: configuration.value.slots,
				workers: workers.value,
				minTimeBetweenShifts: (configuration.value.minTimeBetweenShifts * 4),
				allowDoubles: configuration.value.allowDoubleShifts,
				baseShift: configuration.value.baseShift,
				testEfficency: false,
				openings: configuration.value.openings
			})
			shift.value = await ManagerMethods.makeShiftV3(data)
			var year = "2023";
			var month = "10";
			var day = "15";
			var shiftId = 0;
			tempEvents.value = [];
			for (const worker in shift.value.data[1]) {

				var inner = shift.value.data[1][worker];
				for (const propp in inner) {
					console.log(shift.value.data[1][worker][propp].start + "-" + shift.value.data[1][worker][propp].finish)
					var shiftTest: eventPHP = {
						eventId: 0,
						workerId: "",
						start: "",
						end: "",
						split: 0,
						class: ""
					};
					shiftTest.eventId = shiftId++;
					shiftTest.workerId = worker;
					shiftTest.class = 'temporary-event';
					shiftTest.start = shift.value.data[1][worker][propp].start;
					if (shift.value.data[1][worker][propp].finish == "0:00") {
						shiftTest.end = "24:00";
					}
					else {
						shiftTest.end = shift.value.data[1][worker][propp].finish;
					}
					shiftTest.split = parseInt(worker),
						tempEvents.value.push(shiftTest)
				}
			}
			tempEvents.value.sort((a, b) => (a.start > b.start) ? 1 : -1);
			daysTest.value = daysTest.value.concat(tempEvents.value);
			renderSplits();
			isLoading.value = false;
		}
		function debugShift() {
			console.log(daysTest.value)
		}
		async function postShift() {
			var data: shiftsData = [];
			tempEvents.value.forEach(element => {
				var fullDateStart = new Date(element.start)
				var fullDateFinish = new Date(element.end)
				var datePostE = fullDateFinish.getFullYear() + "-" + String(fullDateFinish.getMonth() + 1).padStart(2, "0") + "-" + fullDateFinish.getDate()
				var datePost = fullDateStart.getFullYear() + "-" + String(fullDateStart.getMonth() + 1).padStart(2, "0") + "-" + fullDateStart.getDate()
				var workerId = element.split;
				var startTime = String(fullDateStart.getHours()).padStart(2, "0") + ":" + String(fullDateStart.getMinutes()).padStart(2, "0");
				var endTime = String(fullDateFinish.getHours()).padStart(2, "0") + ":" + String(fullDateFinish.getMinutes()).padStart(2, "0");
				data.push({
					id: 0,
					date: datePost,
					date_start: datePost + " " + startTime,
					date_finish: datePostE + " " + endTime,
					time_start: startTime,
					time_finish: endTime,
					userId: workerId
				})
			})
			if (await ManagerMethods.postEvent(data) == false) {
				console.log("error!");
			}
			else {
				console.log("all ok");
				tempEvents.value = [];
				loadEvents();
			}
		}

		async function updateSelectedDay(e: any) {
			activeView.value = e.view
			selectedDay.value = e.endDate;
			let month = parseInt(e.endDate.getMonth()) + 1;
			if (selectedMonth.value != month) {
				selectedMonth.value = e.endDate.getMonth() + 1;
				selectedYear.value = e.endDate.getFullYear();
				await loadEvents();
			}
			else {
				await renderSplits();
			}
		}
		function togglePanel(index: number) {
			workers.value[index].showDays = !workers.value[index].showDays;
		}
		function toggleAll(index: number, day: string) {
			var added = false;
			for (let i = 1; i <= 54; i++) {
				if (!workers.value[index].SlotDays[day].includes(i)) {
					added = true;
					workers.value[index].SlotDays[day].push(i);
				}
			}
			if (!added) {
				workers.value[index].SlotDays[day] = [];
			}

		}
		const selectedMonday = computed(() => {
			let index = selectedDay.value.getDay();
			if (index == 0) {
				index = 7;
			}
			let toRemove = 0 - (index - 1);
			return selectedDay.value.addDays(toRemove);
		})
		function getLongestDay() {
			let aperture: {}[] = [];
			let chiusure: {}[] = [];
			for (const key in configuration.value.openings) {
				configuration.value.openings[key].forEach(op => {
					aperture.push(op.apertura);
					chiusure.push(op.chiusura);
				})
			}
			aperture.sort(function (a, b) {
				a = "02/13/2009 " + a;
				b = "02/13/2009 " + b;
				return (toTimestamp(a) - toTimestamp(b));
			});
			chiusure.sort(function (a, b) {
				a = "02/13/2009 " + a;
				b = "02/13/2009 " + b;
				return (toTimestamp(b) - toTimestamp(a));
			});
			calendarRanges.apertura = strToMinPast00(aperture[0]);
			calendarRanges.chiusura = strToMinPast00(chiusure[0]);
			console.log(calendarRanges);
		}
		function strToMinPast00(str) {
			let result = 0;
			let array = str.split(":");
			result = (parseInt(array[0]) * 60) + parseInt(array[1]);
			return result;
		}

		function toTimestamp(strDate) {
			var datum = Date.parse(strDate);
			return datum / 1000;
		}
		async function loadEvents() {
			isLoading.value = true;
			let month = selectedMonth.value;
			let year = selectedYear.value;
			let result = await ManagerMethods.loadEvents(month, year, selectedDay.value.toLocaleDateString().replaceAll("/", "-"));
			daysTest.value = result.concat(tempEvents.value);
			renderSplits();
			isLoading.value = false;
		}
		function renderSplits() {
			// splits.value = [];
			// let array: number[] = [];
			// let dateString = selectedYear.value + "-" + selectedMonth.value + "-" + selectedDay.value.toLocaleDateString("it-IT", {day: "2-digit",});
			// daysTest.value.forEach(shift => {
			// 	let shiftStart = shift.start.split(" ")[0];
			// 	let shiftEnd = shift.end.split(" ")[0];
			// 	if (dateString == shiftStart || dateString == shiftEnd) {
			// 		if (!array.includes(shift.split)) {
			// 			array.push(shift.split);
			// 		}
			// 	}
			// 	else {
			// 		// console.log(dateString+" non è uguale a "+shiftStart+" o "+shiftEnd);
			// 	}
			// })
			// workers.value.forEach(worker => {
			// 	if (array.includes(worker.id)) {
			// 		let obj = {
			// 			id: worker.id,
			// 			label: worker.label
			// 		}
			// 		splits.value.push(obj);
			// 	}
			// })
			renderHighlightHours();
		}
		function capitalizeFirstLetter(string) {
			return string.charAt(0).toUpperCase() + string.slice(1);
		}
		function renderHighlightHours() {
			highlights.value = {};
			let dateString = selectedYear.value + "-" + selectedMonth.value + "-" + selectedDay.value.getDate();
			let dayNumber = selectedDay.value.getDay();
			if (dayNumber == 0) {
				dayNumber = 7;
			}
			let dayWord = capitalizeFirstLetter(selectedDay.value.toLocaleDateString('it', { weekday: 'short' }));
			highlights.value[dayNumber] = [];
			configuration.value.slots[dayWord].forEach(element => {
				let required = element.required
				let slotStartString = element.start
				let slotFinishString = element.finish
				let slotStart: string | Date = selectedYear.value + "-" + selectedMonth.value + "-" + selectedDay.value.getDate() + " " + element.start;
				let slotFinish: string | Date = selectedYear.value + "-" + selectedMonth.value + "-" + selectedDay.value.getDate() + " " + element.finish;
				slotStart = new Date(slotStart);
				slotFinish = new Date(slotFinish);
				daysTest.value.forEach(shift => {
					let shiftStart = new Date(shift.start);
					let shiftEnd = new Date(shift.end);
					if (slotStart >= shiftStart && slotFinish <= shiftEnd) {
						required--;
					}
				})
				if (required == 1) {
					let obj = { from: (parseInt(slotStartString.split(":")[0])) * 60 + parseInt(slotStartString.split(":")[1]), to: parseInt((slotFinishString.split(":")[0])) * 60 + parseInt(slotFinishString.split(":")[1]), class: 'deficit', required: required }
					highlights.value[dayNumber].push(obj)
				}
				else if (required > 1) {
					let obj = { from: (parseInt(slotStartString.split(":")[0])) * 60 + parseInt(slotStartString.split(":")[1]), to: parseInt((slotFinishString.split(":")[0])) * 60 + parseInt(slotFinishString.split(":")[1]), class: 'deficitMany', required: required }
					highlights.value[dayNumber].push(obj)
				}
				else if (required == 0) {
					let obj = { from: (parseInt(slotStartString.split(":")[0])) * 60 + parseInt(slotStartString.split(":")[1]), to: parseInt((slotFinishString.split(":")[0])) * 60 + parseInt(slotFinishString.split(":")[1]), class: 'perfect', required: required }
					highlights.value[dayNumber].push(obj)
				}
				else if (required == -1) {
					let obj = { from: (parseInt(slotStartString.split(":")[0])) * 60 + parseInt(slotStartString.split(":")[1]), to: parseInt((slotFinishString.split(":")[0])) * 60 + parseInt(slotFinishString.split(":")[1]), class: 'oneMore', required: required }
					highlights.value[dayNumber].push(obj)
				}
				else if (required < -1) {
					let obj = { from: (parseInt(slotStartString.split(":")[0])) * 60 + parseInt(slotStartString.split(":")[1]), to: parseInt((slotFinishString.split(":")[0])) * 60 + parseInt(slotFinishString.split(":")[1]), class: 'manyMore', required: required }
					highlights.value[dayNumber].push(obj)
				}
			})
		}
		watch(() => [configuration.value, workers.value], async () => {
			if (loadSettings != -1) {
				clearTimeout(loadSettings);
			}
			// loadSettings = setTimeout(testEfficency, 5000);
		}, { deep: true })
		function average(arr: number[]) { return (arr.reduce((p, c) => p + c, 0) / arr.length) }

		function onEventDragStart(e, draggable) {
			// Passing the event's data to Vue Cal through the DataTransfer object.
			e.dataTransfer.setData('event', JSON.stringify(draggable))
			e.dataTransfer.setData('cursor-grab-at', e.offsetY)
			console.log("DRAGGING")
		}
		async function onEventCreate(e, deleteEventFunction) {
			console.log("LANCIO CREATE EVENT")
			console.log(e);
			deleteEventFunction.value = deleteEventFunction;
			await new Promise(r => setTimeout(r, 1000));
			if (await checkShift(e)) {
				e.class = "temporary-event"
				e.eventId = e._eid;
				e.start = e.start.getFullYear() + "-" + String(e.start.getMonth() + 1).padStart(2, "0") + "-" + e.start.toLocaleDateString("it-IT", { day: "2-digit", }) + " " + String(e.start.getHours()).padStart(2, "0") + ":" + String(e.start.getMinutes()).padStart(2, "0")
				e.end = e.end.getFullYear() + "-" + String(e.end.getMonth() + 1).padStart(2, "0") + "-" + e.end.toLocaleDateString("it-IT", { day: "2-digit", }) + " " + String(e.end.getHours()).padStart(2, "0") + ":" + String(e.end.getMinutes()).padStart(2, "0")		
				daysTest.value.push(e)
				renderSplits();
				return e;
			}
			else {
				deleteEventFunction.value()
			}
		}
		function deleteEvent(e) {
			daysTest.value.forEach((element, i) => {
				if (element.eventId == e.eventId) {
					daysTest.value.splice(i, 1);
				}
			})
			renderSplits();
		}
		async function changeEvent(e) {
			console.log("LANCIO CHANGE EVENT")
			if (e.originalEvent && e.originalEvent.start) {
				console.log("CHANGE FUNCTION")
				daysTest.value.forEach(element => {
					if (element.eventId == e.event.eventId) {
						let a = new Date(element.end);
						e.originalEvent.end = a.toISOString();
					}
				})
				console.log("Funzione change - Controllo se posso modificare " + e.event.eventId);
				console.log(e)
				if (await checkShift(e)) {
					daysTest.value.forEach(element => {
						if (element.eventId == e.event.eventId) {
							element.start = e.event.start.getFullYear() + "-" + String(e.event.start.getMonth() + 1).padStart(2, "0") + "-" + e.event.start.toLocaleDateString("it-IT", { day: "2-digit", }) + " " + String(e.event.start.getHours()).padStart(2, "0") + ":" + String(e.event.start.getMinutes()).padStart(2, "0")
							element.end = e.event.end.getFullYear() + "-" + String(e.event.end.getMonth() + 1).padStart(2, "0") + "-" + e.event.end.toLocaleDateString("it-IT", { day: "2-digit", }) + " " + String(e.event.end.getHours()).padStart(2, "0") + ":" + String(e.event.end.getMinutes()).padStart(2, "0")
							element.split = e.event.split;
							element.workerId = e.event.split;
							element._eid = e.event._eid;
							console.log("cambio")
						}
					})
				}
				else {
					daysTest.value.forEach(element => {
						if (element.eventId == e.originalEvent.eventId) {
							// let origS = new Date(e.originalEvent.start);
							// let origE = new Date(e.originalEvent.end);
							// element.start = origS.getFullYear() + "-" + String(origS.getMonth() + 1).padStart(2, "0") + "-" + origS.toLocaleDateString("it-IT", { day: "2-digit", }) + " " + String(origS.getHours()).padStart(2, "0") + ":" + String(origS.getMinutes()).padStart(2, "0")
							// element.end = origE.getFullYear() + "-" + String(origE.getMonth() + 1).padStart(2, "0") + "-" + origE.toLocaleDateString("it-IT", { day: "2-digit", }) + " " + String(origE.getHours()).padStart(2, "0") + ":" + String(origE.getMinutes()).padStart(2, "0")
							// element.split = e.originalEvent.split;
							// element.workerId = e.originalEvent.split;
							element._eid = e.originalEvent._eid;
							console.log("cambio non fattibile, ritorno a " + element.start + "-" + element.end)
						}
					})
				}
			}
			// else if(e.originalEvent){
			// 	console.log("CHANGE FUNCTION")
			// 	console.log(e);
			// 	deleteEvent(e);
			// }
			// else{
			// 	console.log("NO CHANGE FUNCTION")
			// 	console.log(e);
			// 	deleteEvent(e);
			// }
			renderSplits();
		}
		async function checkShift(e) {
			console.log("LANCIO CHECK")
			console.log(e)
			isLoading.value = true;
			let doable = false;
			let data = {
				workers: workers.value,
				options: configuration.value,
				tempEvents: daysTest.value,
				eventInfo: e,
				startingDate: selectedMonday.value.toISOString().split('T')[0]
			}
			const res: boolean = await ManagerMethods.canWork(data);
			doable = res;
			isLoading.value = false;
			return doable;
		}
		function selectEvent(event) {
			daysTest.value.forEach(element => {
				if (element.eventId == event.eventId) {
					console.log(event)
				}
			})
		}
		function onCancel() {
			console.log('User cancelled the loader.');
			isLoading.value = false;
		}
		function addSlotDay(index,day){
            let obj={
                id:0,
                start:"00:00",
                finish:"00:00"
            }
            workers.value[index].SlotDays[day].push(obj);
        }

		return {
			shift, workers, days, makeShift, calendarRanges, tempEvents, activeView,
			tableResult, options, showOptions, daysTest, configuration,
			disabledViews, selectedDay, updateSelectedDay, selectedMonday, splits, highlights,
			debugShift, postShift, togglePanel, toggleAll, loadEvents, efficency,
			baseDrag, onEventDragStart, onEventCreate, deleteEvent, changeEvent, selectEvent,
			onCancel, isLoading, fullPage,
			addSlotDay
		}
	},
	components: {
		VueCal, Loading
	}
}
</script>
<style>
.deficit {
	background-color: rgba(255, 0, 0, 0.11);
}

.deficitMany {
	background-color: rgba(85, 0, 0, 0.11);
}

.perfect {
	background-color: rgba(0, 128, 0, 0.233);
}

.oneMore {
	background-color: rgba(1, 74, 1, 0.233);
}

.manyMore {
	background-color: rgba(0, 42, 0, 0.233);
}

.tableResult td {
	border-style: solid;
	border-width: 1px;
	border-color: black
}

.tableResult .red {
	background-color: red;
}

.tableResult .green {
	background-color: green;
}

.tableResult .orange {
	background-color: orange;
}

.tableResult .black {
	background-color: black;
}

.red {
	background-color: red;
}

.green {
	background-color: green;
}

.orange {
	background-color: orange;
}

.black {
	background-color: black;
}

.past-event {
	background-color: #212529ad;
	color: white;
	border: 2px solid black;
}

.future-event {
	background-color: #773eeead;
	color: white;
	border: 2px solid black;
}

.temporary-event {
	background-color: #ff8383;
	color: white;
	border: 2px solid black;
}

.vuecal__cell-date {
	height: 45px;
}

.vuecal__cell--has-events {
	background-color: #00800036;
}</style>