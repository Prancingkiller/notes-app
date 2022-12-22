const CACHE_VERSION = 10;
const CURRENT_CACHE = `main-${CACHE_VERSION}`;
const cacheFiles = [
    'index.html'
    ];
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

    // fetch the resource from the network
const fromNetwork = (request, timeout) =>
new Promise((fulfill, reject) => {
  const timeoutId = setTimeout(reject, timeout);
  fetch(request).then(response => {
    clearTimeout(timeoutId);
    fulfill(response);
    //update(request);
  }, reject);
});

// fetch the resource from the browser cache
const fromCache = request =>
caches
  .open(CURRENT_CACHE)
  .then(cache =>
    cache
      .match(request)
      .then(matching => matching || cache.match('/offline/'))
  );
  
// cache the current page to make it available for offline
const update = request =>
caches
  .open(CURRENT_CACHE)
  .then(cache =>
    fetch(request).then(response => cache.put(request, response))
  );
  
// general strategy when making a request (eg if online try to fetch it
// from the network with a timeout, if something fails serve from cache)
self.addEventListener('fetch', evt => {
  type = evt.request.method;
evt.respondWith(
  fromNetwork(evt.request, 10000)
  .catch(() => fromCache(evt.request).then(console.log("da cache")))
);
if(type == "GET"){
evt.waitUntil(update(evt.request))
};
});