export default{
    name:"indexedMethods",
    initiate(){
        const dbName = "notes";
        const dbVersion = 1;
        const request = indexedDB.open(dbName,dbVersion);
         request.onupgradeneeded = e => {
              const db = e.target.result
              const pNotes = db.createObjectStore("notes_add", {keyPath: "id", autoIncrement:true})
                        const dNotes = db.createObjectStore("notes_remove", {keyPath: "toRemove"})
                        const eventStore = db.createObjectStore("events_add", {keyPath: "id", autoIncrement:true})
                return db;
              }
        request.onsuccess = e => {
              const db = e.target.result
              return db;
            }
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