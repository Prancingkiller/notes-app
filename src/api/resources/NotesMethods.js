import { APISettings } from '../config.js';
export default {
    name:"LogMethods",
    async getNotes(){
        const response = await fetch(APISettings.baseURL+"/index2",{
            mode: 'cors',
            credentials: 'include',
            method: 'GET',
        });
        const result = await response.json();
        return result;
    },

    async postNote(data){
        const response  = await fetch(APISettings.baseURL+"/add2", {
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

    async deleteNote(data){
            const response  = await fetch(APISettings.baseURL+"/delete2", {
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
        }
 }
