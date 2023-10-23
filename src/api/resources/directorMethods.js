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
    },
    async postAllOptions(data){
        const response = await fetch(APISettings.baseURL + "/postAllOptions", {
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
    }
}