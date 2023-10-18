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
        return result;
    }
}