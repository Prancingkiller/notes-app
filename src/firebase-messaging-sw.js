let db = null;
self.__WB_MANIFEST
const CACHE_VERSION = 10;
const CURRENT_CACHE = `main-${CACHE_VERSION}`;

import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging/sw";
import { onBackgroundMessage } from "firebase/messaging/sw";
// import { onMessage } from "firebase/messaging";

const cacheFiles = [
  '/',
  'index.html'
];

self.addEventListener('install', evt => {
  evt.waitUntil(self.skipWaiting());
  evt.waitUntil(
    caches.open(CURRENT_CACHE).then(cache => {
      return cache.addAll(cacheFiles);
    })
  )
  const dbName = "notes";
  const dbVersion = 1;

  const request = indexedDB.open(dbName, dbVersion)

  //on upgrade needed
  request.onupgradeneeded = e => {
    db = e.target.result
    /* note = {
         title: "note1",
         text: "this is a note"
     }*/
    const pNotes = db.createObjectStore("notes_add", { keyPath: "id", autoIncrement: true })
    const salaryStore = db.createObjectStore("salary_add", { keyPath: "idIndexed", autoIncrement: true })
    const eventStore = db.createObjectStore("events_add", { keyPath: "idIndexed", autoIncrement: true })
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


// on activation we clean up the previously registered service workers
self.addEventListener('activate', evt => {
  evt.waitUntil(self.clients.claim());
  evt.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CURRENT_CACHE) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  )
  const dbName = "notes";
  const dbVersion = 1;

  const request = indexedDB.open(dbName, dbVersion)

  //on upgrade needed
  request.onsuccess = e => {
    db = e.target.result
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
  var type = evt.request.method;
  evt.respondWith(
    fromNetwork(evt.request, 20000)
      .catch(() => fromCache(evt.request).then(console.log("da cache")))
  );
  if (type == "GET") {
    evt.waitUntil(update(evt.request))
  }
});

self.addEventListener('sync', function (event) {
  if (event.tag === 'notes_add') {
    event.waitUntil(backgroundSync())
  }
  if (event.tag === 'notes_delete') {
    event.waitUntil(removeData('notes_remove'))
    console.log("Backend sync request received (delete)");
  }
});

self.addEventListener('message', function (data) {
  console.log(data);
  if (data.data.type == "notification") {
    showNotification(data.data.payload)
  }
})

async function backgroundSync() {
  const PromiseNotes = syncThing('notes_add', "add2")
  const PromiseEvents = syncThing('events_add', "eventsAdd2")
  const PromiseSalary = syncThing('salary_add', "salaryNewAverage2")

  Promise.all([PromiseNotes, PromiseEvents, PromiseSalary]).then((values) => {
    console.log("sync complete");
  });
}

async function syncThing(indexedStore, apiName) {
  console.log("Backend sync request received");
  var data = await addData(indexedStore);
  if (Object.keys(data).length != 0) { //controllo che ho dati nel db offline
    //console.log("Got data from offlinedb notes:"+Object.keys(data).length);
    var response = await fetch('https://notes-api.it/api/' + apiName, {
      mode: 'cors',
      credentials: 'include',
      method: 'POST',
      headers: {
        'Trusted': 'yes'
      },
      contentType: 'application/json',
      body: JSON.stringify(data)
    })
    var dataStatus = await response.json();
    if (dataStatus.status == true) {
      await clearStore(indexedStore);
      clie = await self.clients.matchAll();
      clie.forEach(client => client.postMessage({ store: indexedStore }));
    }
    else {
      clie = await self.clients.matchAll();
      clie.forEach(client => {
        client.postMessage({ store: indexedStore });
        client.postMessage("loginCheck");
      }
      );
      return;
    }
  }
  else {
    console.log("No data in offline DB");
    var clie = await self.clients.matchAll();
    clie.forEach(client => {
      client.postMessage({ store: indexedStore });
    })
  }
}



function addData(syncData) {
  return new Promise((resolve, reject) => {
    const dbName = "notes";
    const dbVersion = 1;
    const dbb = indexedDB.open(dbName, dbVersion)

    //on upgrade needed
    dbb.onsuccess = e => {
      db = e.target.result
      const tx = db.transaction(syncData, "readwrite")
      const pNotes = tx.objectStore(syncData)
      //const request = pNotes.openCursor()
      const request = pNotes.getAll()
      request.onsuccess = e => {
        resolve(request.result);
        //console.log("Got data from offlinedb "+request.result.lenght);
      }
    }
  })
}
function clearStore(syncData) {
  return new Promise((resolve, reject) => {
    const dbName = "notes";
    const dbVersion = 1;
    const dbb = indexedDB.open(dbName, dbVersion)

    //on upgrade needed
    dbb.onsuccess = e => {
      db = e.target.result
      const tx = db.transaction(syncData, "readwrite")
      const pNotes = tx.objectStore(syncData)
      pNotes.clear();
      console.log("Store Pulito");
      resolve();
    }
  })
}

function addContent(newdata) {

  fetch('api/add2', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    contentType: 'application/json',
    body: JSON.stringify(newdata)
  })
}

async function complete(syncData) {

}


function removeData(syncData) {
  const tx = db.transaction(syncData, "readwrite")
  const pNotes = tx.objectStore(syncData)
  //const request = pNotes.openCursor()
  const request = pNotes.getAll()
  request.onsuccess = e => {
    //console.log(request.result);
    self.clients.matchAll().then(clients => {
      clients.forEach(client => client.postMessage({ store: syncData, content: request.result }));
    })
    pNotes.clear();
    console.log("Backend sync request responded (delete)");
  }
}


const firebaseConfig = {
  apiKey: "AIzaSyDVOywAzrenIOUt44Y3saRYTiZpvBQdTmQ",
  authDomain: "shifts-app-8ce5c.firebaseapp.com",
  projectId: "shifts-app-8ce5c",
  storageBucket: "shifts-app-8ce5c.appspot.com",
  messagingSenderId: "796717147654",
  appId: "1:796717147654:web:fb39f7a21c3e1733ff8587",
  measurementId: "G-BH5ZWGE1EB"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);
onBackgroundMessage(messaging, (payload) => {
  showNotification(payload);
});



function showNotification(payload) {
  let notificationTitle = "Title";
  if (payload.notification?.title) {
    notificationTitle = payload.notification?.title
  }
  let notificationOptions = {
    body: payload.notification?.body,
    icon: '/firebase-logo.png',
    tag:payload.data.tag
  };
  self.registration.showNotification(notificationTitle,
    notificationOptions);
}