import { APISettings } from '../config.js';
export default {
    name: "LogMethods",
    async Login(data) {
        const response = await fetch(APISettings.baseURL + "/login2", {
            mode: 'cors',
            credentials: 'include',
            method: 'POST',
            body: data,
        });
        const result = await response.json();
        return result;
    },
    async Logout() {
        const response = await fetch(APISettings.baseURL + "/logout2", {
            mode: 'cors',
            credentials: 'include',
            method: 'POST',
        })
        const result = await response.json();
        return result;
    },
    async recover(data) {
        const response = await fetch(APISettings.baseURL + "/recover", {
            mode: 'cors',
            credentials: 'include',
            method: 'POST',
            body: data,
        });
        const result = await response.json();
        return result;
    }
}
