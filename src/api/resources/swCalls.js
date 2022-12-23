export default {
    name:"swCalls",

    registersync(syncObj){
        navigator.serviceWorker.ready.then(
            swRegistration=>{
                swRegistration.sync.register(syncObj);
                console.log("background sync registered! "+syncObj);
            }
            )
    }
}