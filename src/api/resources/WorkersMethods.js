import { APISettings } from '../config.ts';
export default {
    name: "WorkersMethods",

    async getWorkers2() {
        const response = await fetch("https://notes-api.it:8443/workersData", {
            mode: 'cors',
            method: 'GET',
            credentials:'include'
        });
        const result = await response.json();
        return result;
    },

    async getWorkers(type) {
        const response = await fetch("https://notes-api.it/api/workersData?type="+type, {
            mode: 'cors',
            method: 'GET',
            credentials:'include'
        });
        const result = await response.json();
        return result;
    },

    async getFavouriteSlots() {
        const response = await fetch("https://notes-api.it/api/favourites", {
            mode: 'cors',
            method: 'GET',
            credentials:'include'
        });
        const result = await response.json();
        return result;
    },

    async postFavs(data){
        const response = await fetch(APISettings.baseURL + "/favouritesEdit", {
            mode: 'cors',
            credentials: 'include',
            method: 'POST',
            headers: {
                'Trusted': 'yes'
            },
            body: JSON.stringify(data)
        }).catch(() => { return false })
        if (response.ok) {
            const result = await response.json();
            return result;
        }
        else {
            return false;
        }
    },

    async deleteFav(data){
        const response = await fetch(APISettings.baseURL + "/favouritesDelete", {
            mode: 'cors',
            credentials: 'include',
            method: 'DELETE',
            contentType: 'application/json',
            body: JSON.stringify([{id:data}])
        }).catch(() => { return false })
        if (response.ok) {
            const result = await response.json();
            return result;
        }
        else {
            return false;
        }
    }
}