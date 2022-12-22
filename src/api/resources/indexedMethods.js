export default{
    name:"indexedMethods",
    initiate(){
      return new Promise((resolve,reject)=>{
        var db = null;
        const dbName = "notes";
        const dbVersion = 1;
        const request = indexedDB.open(dbName,dbVersion);
         request.onupgradeneeded = e => {
              db = e.target.result
              const pNotes = db.createObjectStore("notes_add", {keyPath: "id", autoIncrement:true})
                        const dNotes = db.createObjectStore("notes_remove", {keyPath: "toRemove"})
                        const eventStore = db.createObjectStore("events_add", {keyPath: "id", autoIncrement:true})
                
              }
        request.onsuccess = e => {
              db = e.target.result
              
            }
        resolve(db);
      })
       
    },
    getDataDb(db){
      return new Promise((resolve,reject)=>{
        const tx = db.transaction('notes_add',"readwrite")
                const pNotes = tx.objectStore('notes_add')
                //const request = pNotes.openCursor()
          const request = pNotes.getAll()
          request.onsuccess = e => {
          //console.log(request.result);
          console.log("Loading data from offline DB");
          resolve(JSON.stringify(request.result));		
            }
      })
    }
}