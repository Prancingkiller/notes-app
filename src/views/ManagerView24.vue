<template>
	<button class="btn btn-primary" :disabled="tempEvents.length > 1" @click="makeShift">Genera Turni</button>
	<button class="btn btn-warning" :disabled="tempEvents.length == 0" @click="debugShift">Debug Turni</button>
	<button class="btn btn-success" :disabled="tempEvents.length == 0" @click="postShift">Pubblica Turni</button>
	<vue-cal :selected-date="selectedDay" :timeFrom="calendarRanges.apertura" :timeTo="calendarRanges.chiusura"
		:disableViews="disabledViews" :events="daysTest" :sticky-split-labels=true :snapToTime=15 editable-events
		overlapEventStartOnly :split-days="splits" :special-hours="highlights" :min-split-width=70 locale="it"
		:overlapsPerTimeStep=true @event-drop="updateEvent(($event))" active-view="day"
		@event-duration-change="updateEvent($event)" @view-change="updateSelectedDay($event)" @ready="loadEvents()">

	</vue-cal>
	<!-- <div class="row" style="display:none">
		<div v-for="(day,i) in daysTest" :key="i" class="col">
		<draggable
		class="list-group"
		:list="day"
		group="people"
		itemKey="start"
		>
		
			<div v-for="(slot,i) in day" :key="i" style="border:solid">
				<p>Worker ID: {{ slot.workerId }}</p>
				<p>Start: <span><input type="time" v-model="slot.start"></span></p>
				<p>Finish: <span><input type="time" v-model="slot.end"></span></p>
			</div>

		
		</draggable>
	</div>
	</div> -->
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
		<div v-for="(worker, ii) in workers" :key="worker.id">
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
				<!-- <div>Mar <input v-for="(slot, i) in fullTest" :key="i" type="checkbox" v-model="worker.SlotDays.Mar"
						:value="slot"><span @click="toggleAll(ii, 'Mar')">All</span></div>
				<div>Mer <input v-for="(slot, i) in fullTest" :key="i" type="checkbox" v-model="worker.SlotDays.Mer"
						:value="slot"><span @click="toggleAll(ii, 'Mer')">All</span></div>
				<div>Gio <input v-for="(slot, i) in fullTest" :key="i" type="checkbox" v-model="worker.SlotDays.Gio"
						:value="slot"><span @click="toggleAll(ii, 'Gio')">All</span></div>
				<div>Ven <input v-for="(slot, i) in fullTest" :key="i" type="checkbox" v-model="worker.SlotDays.Ven"
						:value="slot"><span @click="toggleAll(ii, 'Ven')">All</span></div>
				<div>Sab <input v-for="(slot, i) in fullTest" :key="i" type="checkbox" v-model="worker.SlotDays.Sab"
						:value="slot"><span @click="toggleAll(ii, 'Sab')">All</span></div>
				<div>Dom <input v-for="(slot, i) in fullTest" :key="i" type="checkbox" v-model="worker.SlotDays.Dom"
						:value="slot"><span @click="toggleAll(ii, 'Dom')">All</span></div> -->
			</div>
		</div>
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
</template>
<script lang="ts">
import WorkersMethods from "@/api/resources/WorkersMethods"
import ManagerMethods from "@/api/resources/ManagerMethods";
import { ref, computed, onBeforeMount, onMounted } from "vue"
import { useRoute } from 'vue-router'
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'
import type { workersData } from '../types/workers'
import type { shiftsData, eventPHP } from '../types/shifts'

declare global {
	interface Date {
		addDays(days: number, useThis?: boolean): Date,
	}
}
Date.prototype.addDays = function (d: number) { return new Date(this.valueOf() + 864E5 * d); };
export default {
	setup() {
		var full = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54];
		const fullTest = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54]);

		const workers = ref<workersData>([
			{ showDays: false, name: "user", label: "user", id: 0, hours: 0, SlotDays: { Lun: [{ start: "", finish: "" }], Mar: [{ start: "", finish: "" }], Mer: [{ start: "", finish: "" }], Gio: [{ start: "", finish: "" }], Ven: [{ start: "", finish: "" }], Sab: [{ start: "", finish: "" }], Dom: [{ start: "", finish: "" }] } },
		]);

		const slotsWeekend = ref([{ slotN: 1, required: 2 }, { slotN: 2, required: 2 }, { slotN: 3, required: 3 }, { slotN: 4, required: 4 }, { slotN: 5, required: 4 }, { slotN: 6, required: 4 }, { slotN: 7, required: 4 }, { slotN: 8, required: 4 }, { slotN: 9, required: 4 }, { slotN: 10, required: 4 }, { slotN: 11, required: 4 }, { slotN: 12, required: 4 }, { slotN: 13, required: 5 }, { slotN: 14, required: 5 }, { slotN: 15, required: 5 }, { slotN: 16, required: 5 }, { slotN: 17, required: 7 }, { slotN: 18, required: 7 }, { slotN: 19, required: 7 }, { slotN: 20, required: 8 }, { slotN: 21, required: 8 }, { slotN: 22, required: 9 }, { slotN: 23, required: 9 }, { slotN: 24, required: 9 }, { slotN: 25, required: 9 }, { slotN: 26, required: 8 }, { slotN: 27, required: 8 }, { slotN: 28, required: 7 }, { slotN: 29, required: 7 }, { slotN: 30, required: 6 }, { slotN: 31, required: 6 }, { slotN: 32, required: 6 }, { slotN: 33, required: 6 }, { slotN: 34, required: 6 }, { slotN: 35, required: 6 }, { slotN: 36, required: 6 }, { slotN: 37, required: 7 }, { slotN: 38, required: 7 }, { slotN: 39, required: 7 }, { slotN: 40, required: 8 }, { slotN: 41, required: 8 }, { slotN: 42, required: 9 }, { slotN: 43, required: 9 }, { slotN: 44, required: 8 }, { slotN: 45, required: 8 }, { slotN: 46, required: 8 }, { slotN: 47, required: 8 }, { slotN: 48, required: 8 }, { slotN: 49, required: 8 }, { slotN: 50, required: 7 }, { slotN: 51, required: 7 }, { slotN: 52, required: 6 }, { slotN: 53, required: 6 }, { slotN: 54, required: 5 }]);
		const slotsNormal = ref([{ slotN: 1, required: 1 }, { slotN: 2, required: 1 }, { slotN: 3, required: 1 }, { slotN: 4, required: 1 }, { slotN: 5, required: 2 }, { slotN: 6, required: 2 }, { slotN: 7, required: 2 }, { slotN: 8, required: 3 }, { slotN: 9, required: 3 }, { slotN: 10, required: 3 }, { slotN: 11, required: 3 }, { slotN: 12, required: 3 }, { slotN: 13, required: 4 }, { slotN: 14, required: 4 }, { slotN: 15, required: 4 }, { slotN: 16, required: 4 }, { slotN: 17, required: 6 }, { slotN: 18, required: 6 }, { slotN: 19, required: 6 }, { slotN: 20, required: 7 }, { slotN: 21, required: 7 }, { slotN: 22, required: 8 }, { slotN: 23, required: 8 }, { slotN: 24, required: 8 }, { slotN: 25, required: 8 }, { slotN: 26, required: 7 }, { slotN: 27, required: 7 }, { slotN: 28, required: 6 }, { slotN: 29, required: 6 }, { slotN: 30, required: 5 }, { slotN: 31, required: 5 }, { slotN: 32, required: 4 }, { slotN: 33, required: 4 }, { slotN: 34, required: 5 }, { slotN: 35, required: 5 }, { slotN: 36, required: 5 }, { slotN: 37, required: 6 }, { slotN: 38, required: 6 }, { slotN: 39, required: 6 }, { slotN: 40, required: 7 }, { slotN: 41, required: 7 }, { slotN: 42, required: 8 }, { slotN: 43, required: 8 }, { slotN: 44, required: 7 }, { slotN: 45, required: 7 }, { slotN: 46, required: 7 }, { slotN: 47, required: 7 }, { slotN: 48, required: 7 }, { slotN: 49, required: 7 }, { slotN: 50, required: 6 }, { slotN: 51, required: 6 }, { slotN: 52, required: 5 }, { slotN: 53, required: 5 }, { slotN: 54, required: 4 }]);

		const slots = ref({ Lun: slotsNormal.value, Mar: slotsNormal.value, Mer: slotsNormal.value, Gio: slotsNormal.value, Ven: slotsNormal.value, Sab: slotsWeekend.value, Dom: slotsWeekend.value });
		const days = ref(["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"]);

		const tableResult = ref<HTMLDivElement>();
		const daysTest = ref<eventPHP[]>([]);
		const tempEvents = ref<eventPHP[]>([]);
		var data;
		const disabledViews = ["years", "year", "month", "week"];
		const minEventWidth = 0;
		const selectedDay = ref(new Date(new Date().setHours(12, 0, 0, 0)));
		const selectedMonth = ref(selectedDay.value.getMonth() + 1);
		const selectedYear = ref(selectedDay.value.getFullYear());
		const splits = ref([{}]);
		const highlights = ref({});
		const shift = ref<{ data: eventPHP[] }>({ data: [] });
		const options = ref(false);
		const calendarRanges = { apertura: 0, chiusura: 1000 }
		const configuration = ref({
			minTimeBetweenShifts: 2,
			allowDoubleShifts: true,
			baseShift: 3,
			slots: { Lun: [{ slotN: null, required: null }], Mar: [{ slotN: null, required: null }], Mer: [{ slotN: null, required: null }], Gio: [{ slotN: null, required: null }], Ven: [{ slotN: null, required: null }], Sab: [{ slotN: null, required: null }], Dom: [{ slotN: null, required: null }] },
			openings: [{ apertura: "", chiusura: "" }],
		});
		const longestDay = ref(null);

		onBeforeMount(async () => {
			const route = useRoute();
			let type;
			switch (route.params.resource) {
				case 'crew':
					type = 0
					break;
				case 'cafe':
					type = 1
					break;
				case 'drive':
					type = 2
					break;
				case 'hostess':
					type = 3
					break;
				case 'manager':
					type = 4
					break;
				default:
					type = 0
			}
			loadOptions(type);
			loadWokersData(type);
		})
		// async function init() {

		// }

		async function loadOptions(type) {
			let data = await ManagerMethods.loadOptions(type);
			configuration.value = data;
			getLongestDay();
		}

		async function loadWokersData(type) {
			data = await WorkersMethods.getWorkers(type);
			workers.value = data;
		}


		function showOptions() {
			options.value = !options.value;
		}

		async function testEfficency() {
			data = JSON.stringify({
				days: days.value,
				slots: configuration.value.slots,
				workers: workers.value,
				minTimeBetweenShifts: (configuration.value.minTimeBetweenShifts * 4),
				allowDoubles: configuration.value.allowDoubleShifts,
				baseShift: configuration.value.baseShift,
				testEfficency: true
			})
			let result = await ManagerMethods.makeShift(data);
			console.log(result);
		}
		async function makeShift() {
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
					// if (prop == "Lun") {
					// 	year = selectedMonday.value.getFullYear().toString()
					// 	month = (selectedMonday.value.getMonth()+1).toString()
					// 	day = selectedMonday.value.getDate().toString()
					// }
					// else if (prop == "Mar") {
					// 	year = selectedMonday.value.addDays(1).getFullYear().toString()
					// 	month = (selectedMonday.value.addDays(1).getMonth()+1).toString()
					// 	day = selectedMonday.value.addDays(1).getDate().toString()
					// }
					// else if (prop == "Mer") {
					// 	year = selectedMonday.value.addDays(2).getFullYear().toString()
					// 	month = (selectedMonday.value.addDays(2).getMonth()+1).toString()
					// 	day = selectedMonday.value.addDays(2).getDate().toString()
					// }
					// else if (prop == "Gio") {
					// 	year = selectedMonday.value.addDays(3).getFullYear().toString()
					// 	month = (selectedMonday.value.addDays(3).getMonth()+1).toString()
					// 	day = selectedMonday.value.addDays(3).getDate().toString()
					// }
					// else if (prop == "Ven") {
					// 	year = selectedMonday.value.addDays(4).getFullYear().toString()
					// 	month = (selectedMonday.value.addDays(4).getMonth()+1).toString()
					// 	day = selectedMonday.value.addDays(4).getDate().toString()
					// }
					// else if (prop == "Sab") {
					// 	year = selectedMonday.value.addDays(5).getFullYear().toString()
					// 	month = (selectedMonday.value.addDays(5).getMonth()+1).toString()
					// 	day = selectedMonday.value.addDays(5).getDate().toString()
					// }
					// else if (prop == "Dom") {
					// 	year = selectedMonday.value.addDays(6).getFullYear().toString()
					// 	month = (selectedMonday.value.addDays(6).getMonth()+1).toString()
					// 	day = selectedMonday.value.addDays(6).getDate().toString()
					// }
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
					//shiftTest.title= 'Worker: '+worker,
					shiftTest.split = parseInt(worker),
						tempEvents.value.push(shiftTest)
				}
				// }
			}
			tempEvents.value.sort((a, b) => (a.start > b.start) ? 1 : -1);
			daysTest.value = daysTest.value.concat(tempEvents.value);
			renderSplits();
		}
		function debugShift() {
			console.log(daysTest.value)
		}
		async function postShift() {
			var data: shiftsData = [];
			tempEvents.value.forEach(element => {
				var fullDateStart = new Date(element.start)
				var fullDateFinish = new Date(element.end)
				var datePost = fullDateStart.getFullYear() + "-" + String(fullDateStart.getMonth() + 1).padStart(2, "0") + "-" + fullDateStart.getDate()
				var workerId = element.split;
				var startTime = String(fullDateStart.getHours()).padStart(2, "0") + ":" + String(fullDateStart.getMinutes()).padStart(2, "0");
				var endTime = String(fullDateFinish.getHours()).padStart(2, "0") + ":" + String(fullDateFinish.getMinutes()).padStart(2, "0");
				data.push({
					id: 0,
					date: datePost,
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
		function updateEvent(e: any) {
			daysTest.value.forEach(element => {
				if (element.eventId == e.event.eventId) {
					element.start = e.event.start.getFullYear() + "-" + String(e.event.start.getMonth() + 1).padStart(2, "0") + "-" + e.event.start.getDate() + " " + String(e.event.start.getHours()).padStart(2, "0") + ":" + String(e.event.start.getMinutes()).padStart(2, "0")
					element.end = e.event.end.getFullYear() + "-" + String(e.event.end.getMonth() + 1).padStart(2, "0") + "-" + e.event.end.getDate() + " " + String(e.event.end.getHours()).padStart(2, "0") + ":" + String(e.event.start.getMinutes()).padStart(2, "0")
					element.split = e.event.split;
					element.workerId = e.event.split.toString();
				}
			})
			renderSplits();
		}
		async function updateSelectedDay(e: any) {
			selectedDay.value = e.endDate;
			// console.log("selected month:"+selectedMonth.value);
			// console.log("month in view:"+parseInt(e.endDate.getMonth())+1);
			let month = parseInt(e.endDate.getMonth()) + 1;
			if (selectedMonth.value != month) {
				selectedMonth.value = e.endDate.getMonth() + 1;
				selectedYear.value = e.endDate.getFullYear();
				await loadEvents();
			}
			renderSplits();
			// console.log(e.endDate.toISOString().split('T')[0]);
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
			let aperture: String[] = [];
			let chiusure: String[] = [];
			for (const key in configuration.value.openings) {
				aperture.push(configuration.value.openings[key].apertura);
				chiusure.push(configuration.value.openings[key].chiusura);
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
			let month = selectedMonth.value;
			let year = selectedYear.value;
			let result = await ManagerMethods.loadEvents(month, year);
			daysTest.value = result.concat(tempEvents.value);
		}
		function renderSplits() {
			splits.value = [];
			let array: number[] = [];
			let dateString = selectedYear.value + "-" + selectedMonth.value + "-" + selectedDay.value.getDate();
			daysTest.value.forEach(shift => {
				let shiftStart = shift.start.split(" ")[0];
				let shiftEnd = shift.end.split(" ")[0];
				if (dateString == shiftStart || dateString == shiftEnd) {
					if (!array.includes(shift.split)) {
						array.push(shift.split);
					}
				}
				else {
					// console.log(dateString+" non è uguale a "+shiftStart+" o "+shiftEnd);
				}
			})
			// console.log("splits:"+array);
			workers.value.forEach(worker => {
				if (array.includes(worker.id)) {
					let obj = {
						id: worker.id,
						label: worker.label
					}
					splits.value.push(obj);
				}
			})
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
			console.log(configuration.value.slots[dayWord]);
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
				else if(required == 0) {
					let obj = { from: (parseInt(slotStartString.split(":")[0])) * 60 + parseInt(slotStartString.split(":")[1]), to: parseInt((slotFinishString.split(":")[0])) * 60 + parseInt(slotFinishString.split(":")[1]), class: 'perfect', required: required }
					highlights.value[dayNumber].push(obj)
				}
				else if(required == -1){
					let obj = { from: (parseInt(slotStartString.split(":")[0])) * 60 + parseInt(slotStartString.split(":")[1]), to: parseInt((slotFinishString.split(":")[0])) * 60 + parseInt(slotFinishString.split(":")[1]), class: 'oneMore', required: required }
					highlights.value[dayNumber].push(obj)
				}
				else if(required < -1){
					let obj = { from: (parseInt(slotStartString.split(":")[0])) * 60 + parseInt(slotStartString.split(":")[1]), to: parseInt((slotFinishString.split(":")[0])) * 60 + parseInt(slotFinishString.split(":")[1]), class: 'manyMore', required: required }
					highlights.value[dayNumber].push(obj)
				}
			})
			// console.log(highlights.value);
		}

		return {
			shift, workers, slots, days, makeShift, full, calendarRanges, tempEvents,
			tableResult, fullTest, options, showOptions, daysTest, configuration,
			disabledViews, minEventWidth, selectedDay, updateSelectedDay, selectedMonday, splits, highlights,
			debugShift, postShift, updateEvent, togglePanel, toggleAll, loadEvents
		}
	},
	components: {
		//draggable: VueDraggableNext,
		VueCal

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
</style>