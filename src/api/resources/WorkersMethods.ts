import { APISettings } from '../config.js';
export default {
    name: "WorkersMethods",

    async getWorkers() {
        const response = await fetch("https://notes-api.it:8443/workersData", {
            mode: 'cors',
            method: 'GET',
            credentials:'include'
        });
        const result = await response.json();
        return result;
    },

    async getWorkers2() {
        const response = await fetch("https://notes-api.it/api/workersData", {
            mode: 'cors',
            method: 'GET',
            credentials:'include'
        });
        const result = await response.json();
        return result;
    },
}