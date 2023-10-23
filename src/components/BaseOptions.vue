<template>
    <div style="display:flex;flex-direction: column;">
        <div class="p-4">
            <h3>Opzioni per gruppo: {{ data.user_group }}</h3>
            <table class="table table-sm">
                <thead>
                    <tr>
                        <th>Opzione</th>
                        <th>Valore</th>
                    </tr>

                </thead>
                <tbody>
                    <tr>
                        <td>Pausa minima tra turni (h)</td>
                        <td><input type="number" v-model="data.options.minTimeBetweenShifts"></td>
                    </tr>
                    <tr>
                        <td>Turno minimo (h)</td>
                        <td><input type="number" v-model="data.options.baseShift"></td>
                    </tr>
                    <tr>
                        <td>Abilita doppi turni</td>
                        <td><input type="checkbox" v-model="data.options.allowDoubleShifts"></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div style="display:flex;flex-direction: row;">
            <div v-for="(day, i) in days" :key="i" style="display:flex;flex-direction: column;">
                {{ day }}<br>
                <input type="time" v-model="data.openings[day].apertura">
                <input type="time" v-model="data.openings[day].chiusura">
            </div>
        </div>
        <div style="display:flex;flex-direction:row;justify-content: center;">
			<div v-for="(day, i) in days" :key="i">
				{{ day }}
				<table style="margin:5px" class="tableResult">
					<tr v-for="(slot, i) in data.slots[day]" :key="i">
						<td>{{ slot.start }}-{{ slot.finish }}</td>
						<td>
							<input type="number" v-model="slot.required" style="width:35px;border:0px">
						</td>
					</tr>
				</table>
			</div>
		</div>
    </div>
    <button @click="saveOptions()">Salva</button>
</template>
<script>
import { ref } from 'vue'
export default {
    props: {
        userGroup: {
            type: {
                user_group: Number,
                options: {
                    allowDoubleShifts: Boolean,
                    baseShift: Number,
                    minTimeBetweenShifts: Number,
                    chiusura: String,
                    apertura: String,
                    slots: Object,
                    openings: Object
                }
            }
        }
    },
    emits: ['inFocus', 'submit'],
    setup(props,ctx) {
        const data = ref(props.userGroup);
        const days = ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"];
        if (data.value.user_group == 0) {
            data.value.user_group = "Crew"
        }
        if (data.value.user_group == 1) {
            data.value.user_group = "Hostess"
        }
        if (data.value.user_group == 2) {
            data.value.user_group = "Manager"
        }

        async function saveOptions(){
            let obj = [data];
            const res = await directorMethods.postAllOptions(obj);
            if(res){
                ctx.emit('submit')
            }
            else{
                console.log("problems saving! offline?")
            } 
        }

        return { data, days }
    }
}
</script>
<style scoped>
.tableResult /deep/ td {
	border-style: solid;
	border-width: 1px;
	border-color: black
}

.tableResult /deep/ .red {
	background-color: red;
}

.tableResult /deep/ .green {
	background-color: green;
}

.tableResult /deep/ .orange {
	background-color: orange;
}

.tableResult /deep/ .black {
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
</style>