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

    async deleteEvent(data){
        const response  = await fetch(APISettings.baseURL+"/eventsDelete2", {
            mode: 'cors',
            credentials: 'include',
            method: 'DELETE',	
            contentType: 'application/json',
            body: JSON.stringify(data)
        }).catch(()=>{return false})
        if(response.ok){
            const result = await response.json();
            return result;
        }
        else{
            return false;
        } 
    },

    async postEvent(data){
        const response  = await fetch(APISettings.baseURL+"/eventsAdd2", {
            mode: 'cors',
            credentials: 'include',
            method: 'POST',	
            contentType: 'application/json',
            body: JSON.stringify(data)
        }).catch(()=>{return false})
        if(response.ok){
            const result = await response.json();
            return result;
        }
        else{
            return false;
        }
    },

}