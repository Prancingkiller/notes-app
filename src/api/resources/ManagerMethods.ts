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

    async loadOptions(){
        const response = await fetch(APISettings.baseURL + "/options", {
            mode: 'cors',
            credentials: 'include',
            method: 'GET',
        });
        const result = await response.json();
        if(result.allowDoubles == 1){
            result.allowDoubles = true;
        }
        else{
            result.allowDoubles = false;
        }
        return result;
    }

}