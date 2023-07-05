import { APISettings } from '../config.js';
export default {
    name:"ManagerMethods",

    async makeShift(data){
        const response = await fetch(APISettings.baseURL+"/shifts.php",{
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            headers: {
              //'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
              'Trusted': 'yes'
            },
            contentType: 'application/json',
            body:data
            }).catch(err=>{console.log(err)});
        const result = await response.json();
        if(result.data.status == "allGood"){
            return(result);
        }
        else{
            alert(result.data.status)
        }
    },
    async postEvent(data){
        const response  = await fetch(APISettings.baseURL+"/eventsAddTest", {
            mode: 'cors',
            credentials: 'include',
            method: 'POST',	
            headers: {
                'Trusted': 'yes'
            },
            contentType: 'application/json',
            body: JSON.stringify(data)
        }).catch((err)=>{console.log(err); return false})
        if(response.ok){
            const result = await response.json();
            return result;
        }
        else{
            return false;
        }
    },

}