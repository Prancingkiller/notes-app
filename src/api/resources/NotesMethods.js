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
    }
}