import { APISettings } from '../config.js';
export default {
    name:"EventsMethods",

    async loadEvents(data){
        const response = await fetch(APISettings.baseURL+"/events2?"+ new URLSearchParams(data),{
            mode: 'cors',
            credentials: 'include',
            method: 'GET',
        });
        const result = await response.json();
        return result;
    },

}