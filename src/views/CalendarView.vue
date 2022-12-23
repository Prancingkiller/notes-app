<template>
    <h1>Calendar</h1>
    <div class="col-md-10 text-center">
          <h2 class="mb-5 text-center">Seleziona la Data</h2>
          <input type="hidden" class="form-control w-25 mx-auto mb-3" id="result" placeholder="" disabled="">
          <form action="#" class="row">
            <div class="col-md-12">
              <div id="inline_cal"></div>
            </div>
          </form>
     </div>
</template>
<script>
import { onMounted } from 'vue' 
import { Rome } from '@bevacqua/rome'
import { moment } from 'moment'
export default{
    setup(){
        onMounted(loadCalendar)

        function loadCalendar() {
            Rome('inline_cal', {time: false, inputFormat: 'YYYY-MM-DD', dateValidator: function (d) {
            return moment(d).day();
            }}).on('data', function (value) {
            var pickedDay = value;
            })
        }
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