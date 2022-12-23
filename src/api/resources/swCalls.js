export default {
    name:"swCalls",
    registersync(syncObj){
        navigator.serviceWorker.ready.then(
            swRegistration=>{
                swRegistration.sync.register(syncObj);
                console.log("background sync registered! "+syncObj);
            }
            )
    },
     registerSyncP(){
        if(localStorage.getItem("logged")){
        navigator.serviceWorker.ready.then((registration) => {
            registration.sync.getTags().then((tags) => {
            if (tags.includes("notes_add")){
                console.log("Sync already registered");
            }
            else{
                registration.sync.register("notes_add");
                console.log("Periodic background sync registered!");
            }
            setTimer();
            });
        });
    }else{setTimer();}
    }
}