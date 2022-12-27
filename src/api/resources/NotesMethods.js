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
        const dataa = new FormData();
        let csrfToken = null;
        let cookieValue = `; ${document.cookie}`;
        let parts = cookieValue.split(`; safeapptoken=`); // This needs to match the value set in csrf_config.php file
        if (parts.length === 2) {
            csrfToken = parts.pop().split(';').shift();
        }
        dataa.append('data', data)
        dataa.append('safeapptoken', csrfToken)
        const response  = await fetch(APISettings.baseURL+"/add2", {
            mode: 'cors',
            credentials: 'include',
            method: 'POST',	
            contentType: 'application/json',
            body: JSON.stringify(dataa)
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
