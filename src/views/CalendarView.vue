<template>
    <h1>Calendar</h1>
    <div class="col-md-10 text-center">
          <h2 class="mb-5 text-center">Seleziona la Data</h2>
          <p></p>
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
              <table style="margin:auto">
                  <tr v-for="event in dayEvents" :key="event.id">
                  <td style="padding:10px"><BaseInput type="time" v-model="event.time_start" label="Time Start" /></td>  
                  <td style="padding:10px"><BaseInput type="time" v-model="event.time_finish" label="Time Finish" /></td>
                  </tr>
                </table>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="addNewEvent">Add New</button>
            <button type="button" class="btn btn-success">Save changes</button>
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
import{ref,onMounted} from 'vue'
import  {Modal}  from 'bootstrap'
export default {

setup(){
  var events = ref({});
	var dayEvents = ref([]);
  const modalRef = ref(null)
  var pickedDay = ref();
  var pickedMonth = ref({});
	var pickedYear = ref({});
  let modal = Modal ;
  onMounted(() => {
    if (modalRef.value) {
    modal = new Modal(modalRef.value)
    }
  })
  function launchModal() {
    modal.show()
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

      dayEvents.value = [{
        time_start:"Loading..."
      }];
			var object = {
				month:pickedMonth.value,
				year:pickedYear.value
			}
			events.value = await EventsMethods.loadEvents(object);
      const offlineEvents = JSON.parse(await indexedMethods(db,"events_add"))
      var ids = new Set(offlineEvents.map(d=>d.id));
      const merged = [...offlineEvents,...events.value.filter(d=>!ids.has(d.id))];
      events.value = JSON.stringify(merged)
			loadDay();
		}
    function loadDay(){
      dayEvents.value=[];
			events.value.forEach(element =>{
				if(element.date == pickedDay.value){
					dayEvents.value.push(element)
				}
			})
			console.log(dayEvents.value)
		}
    
    function addNewEvent(){
      const object = [];
      dayEvents.value.push(object)
  }

  return{pickedDay,onDayChange,modalRef,onShowModal,dayEvents,addNewEvent}
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