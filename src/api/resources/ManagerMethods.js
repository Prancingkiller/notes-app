import { APISettings } from '../config.js';
export default {
    name:"ManagerMethods",

    async makeShift(data){
        const response = await fetch(APISettings.baseURL+"/shifts",{
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            headers: {
              'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
              "Content-Type": "application/json",
            },
            body:data
            });
        const result = await response.json();
        if(result.data.status == "allGood"){
            return(result);
        }
        else{
            alert(result.data.status)
        }
    }

}