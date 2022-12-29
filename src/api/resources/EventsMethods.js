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
            headers: {
                'Trusted': 'yes'
            },
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

    async getAverageSalary(){
        const response = await fetch(APISettings.baseURL+"/salaryGetAverage2",{
            mode: 'cors',
            credentials: 'include',
            method: 'GET',
        });
        const result = await response.json();
        return result.value;
    },
    
    async postAverage(data){
        const response  = await fetch(APISettings.baseURL+"/salaryNewAverage2", {
            mode: 'cors',
            credentials: 'include',
            method: 'POST',	
            headers: {
                'Trusted': 'yes'
            },
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

    async getSalaryAmount(data){
        const response = await fetch(APISettings.baseURL+"/getSalary2?"+ new URLSearchParams(data),{
            mode: 'cors',
            credentials: 'include',
            method: 'GET',
        });
        const result = await response.json();
        return result.value;
    }

}