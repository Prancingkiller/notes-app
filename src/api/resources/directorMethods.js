import { APISettings } from '../config';
export default {
    name: "directorMethods",

    async getAllOptions(){
        const response = await fetch(APISettings.baseURL + "/allOptions", {
            mode: 'cors',
            credentials: 'include',
            method: 'GET',
        });
        const result = await response.json();
        // let returns = {
        //     apertura: result.apertura,
        //     chiusura: result.chiusura,
        //     minTimeBetweenShifts: result.minTimeBetweenShifts,
        //     allowDoubleShifts: result.allowDoubleShifts,
        //     baseShift: result.baseShift,
        //     slots: JSON.parse(result.slots)
        // }
        // console.log(returns);
        return result;
    }
}