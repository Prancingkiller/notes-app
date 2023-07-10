import { APISettings } from '../config.ts';
export default {
    name: "LogMethods",
    async getNotes() {
        const response = await fetch(APISettings.baseURL + "/index2", {
            mode: 'cors',
            credentials: 'include',
            method: 'GET',
        });
        const result = await response.json();
        return result;
    },

    async postNote(data) {
        const response = await fetch(APISettings.baseURL + "/add2", {
            mode: 'cors',
            credentials: 'include',
            method: 'POST',
            headers: {
                'Trusted': 'yes'
            },
            contentType: 'application/json',
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
    async reorder(data) {
        const response = await fetch(APISettings.baseURL + "/reorderNotes", {
            mode: 'cors',
            credentials: 'include',
            method: 'POST',
            headers: {
                'Trusted': 'yes'
            },
            contentType: 'application/json',
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
    async deleteNote(data) {
        const response = await fetch(APISettings.baseURL + "/delete2", {
            mode: 'cors',
            credentials: 'include',
            method: 'DELETE',
            contentType: 'application/json',
            body: JSON.stringify(data)
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
