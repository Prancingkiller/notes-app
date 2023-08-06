import { APISettings } from '../config.ts';
export default {
    name: "WorkersMethods",

    async getWorkers() {
        const response = await fetch("https://notes-api.it:8443/workersData", {
            mode: 'cors',
            credentials: 'include',
            method: 'GET',
        });
        const result = await response.json();
        return result;
    },
}