
self.__WB_MANIFEST
console.log("aa")

self.addEventListener('install', evt =>{
    evt.waitUntil(self.skipWaiting());
      evt.waitUntil(
        caches.open(CURRENT_CACHE).then(cache => {
          return cache.addAll(cacheFiles);
        })
      )
                const dbName = "notes";
                const dbVersion = 1;
    
                const request = indexedDB.open(dbName,dbVersion)
    
                    //on upgrade needed
                    request.onupgradeneeded = e => {
                        db = e.target.result
                       /* note = {
                            title: "note1",
                            text: "this is a note"
                        }*/
                        const pNotes = db.createObjectStore("notes_add", {keyPath: "id", autoIncrement:true})
                        const dNotes = db.createObjectStore("notes_remove", {keyPath: "toRemove"})
                        const eventStore = db.createObjectStore("events_add", {keyPath: "id", autoIncrement:true})
                       //alert(`upgrade is called database name: ${db.name} version : ${db.version}`)
    
                    }
                    //on success 
                    request.onsuccess = e => {
                        db = e.target.result
                        //alert(`success is called database name: ${db.name} version : ${db.version}`)
                    }
                    //on error
                    request.onerror = e => {
                        //alert(`error: ${e.target.error} was found `)
                         
                    }
    });