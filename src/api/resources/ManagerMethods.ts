import { APISettings } from '../config';
import type { eventPHP } from '../../types/shifts'
type toSend = BodyInit & {
    allowDoubles: string,
    baseShift: number,
    days: string[],
    minTimeBetweenShifts: number,
    slots: {
        slotN: number,
        required: number
    }[],
    testEfficency: boolean,
    workers: {
        SlotDays: {
            Lun: number[],
            Mar: number[],
            Mer: number[],
            Gio: number[],
            Ven: number[],
            Sab: number[],
            Dom: number[]
        }[],
        favouriteSlots: {
            Lun: number[],
            Mar: number[],
            Mer: number[],
            Gio: number[],
            Ven: number[],
            Sab: number[],
            Dom: number[]
        }[],
        hours: number,
        id: number,
        label: string
        name: string,
        showDays: boolean
    }[]
}

type ApiResponse = {
    data: {
        0: string,
        1: {
            Lun: number[],
            Mar: number[],
            Mer: number[],
            Gio: number[],
            Ven: number[],
            Sab: number[],
            Dom: number[],
            fairness: number,
            left: number
        }[],
        efficency: string,
        hoursDeficit: number,
        hoursWasted: number,
        reportSettings: string,
        status: string,
    }
}

export default {
    name: "ManagerMethods",
    async makeShiftV3<TResponse>(data: toSend): Promise<TResponse> {
        const response = await fetch(APISettings.baseURL + "/shiftsV4.php", {
            method: "POST",
            mode: "cors",
            cache: "no-store",
            headers: {
                //'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
                'Trusted': 'yes'
            },
            body: data,
            keepalive: true
        })
        const result = await response.json();
        if (result.data.status == "allGood") {
            return (result);
        }
        else {
            alert(result.data.status)
            return (result);
        }
    },
    async makeShift<TResponse>(data: toSend): Promise<TResponse> {
        const response = await fetch(APISettings.baseURL + "/shifts.php", {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            headers: {
                //'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
                'Trusted': 'yes'
            },
            body: data
        })
        const result = await response.json();
        if (result.data.status == "allGood") {
            return (result);
        }
        else {
            alert(result.data.status)
            return (result);
        }
    },
    async postEvent(data) {
        const response = await fetch(APISettings.baseURL + "/eventsAddTest", {
            mode: 'cors',
            credentials: 'include',
            method: 'POST',
            headers: {
                'Trusted': 'yes'
            },
            body: JSON.stringify(data)
        })
        if (response.ok) {
            const result = await response.json();
            return result;
        }
        else {
            return false;
        }
    },

    async loadOptions(type){
        const response = await fetch(APISettings.baseURL + "/options?type="+type, {
            mode: 'cors',
            credentials: 'include',
            method: 'GET',
        });
        const result = await response.json();
        const returns = {allowDoubleShifts:false,minTimeBetweenShifts:0,baseShift:0,slots:{Lun:[{slotN:null,required:null}],Mar:[{slotN:null,required:null}],Mer:[{slotN:null,required:null}],Gio:[{slotN:null,required:null}],Ven:[{slotN:null,required:null}],Sab:[{slotN:null,required:null}],Dom:[{slotN:null,required:null}]},
        openings:[]
    };
        result.forEach(element=>{
            if(element.option_name == "allowDoubleShifts"){
                if(element.value == "1"){
                    element.value = true;
                }
                else{
                    element.value = false;
                }
            }
            returns[element.option_name]=element.value;
        })
        return returns;
    },

    async loadEvents(month,year){
        const response = await fetch(APISettings.baseURL + "/eventsManager?month="+month+"&year="+year, {
            mode: 'cors',
            credentials: 'include',
            method: 'GET',
        });
        const result = await response.json();
        return result;
    },
    async loadGroups(){
        const response = await fetch(APISettings.baseURL + "/getGroups", {
            mode: 'cors',
            credentials: 'include',
            method: 'GET',
        });
        const result = await response.json();
        return result;
    }

}