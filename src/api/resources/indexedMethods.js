export default {
  name: "indexedMethods",
  initiate() {
    return new Promise((resolve, reject) => {
      var db = null;
      const dbName = "notes";
      const dbVersion = 1;
      const request = indexedDB.open(dbName, dbVersion);
      request.onupgradeneeded = e => {
        db = e.target.result
        const pNotes = db.createObjectStore("notes_add", { keyPath: "id", autoIncrement: true })
        const salaryStore = db.createObjectStore("salary_add", { keyPath: "idIndexed", autoIncrement: true })
        const eventStore = db.createObjectStore("events_add", { keyPath: "idIndexed", autoIncrement: true })
        resolve(db);
      }
      request.onsuccess = e => {
        db = e.target.result
        resolve(db);
      }
    })

  },
  getDataDb(db, store) {
    return new Promise((resolve, reject) => {
      const tx = db.transaction(store, "readwrite")
      const pNotes = tx.objectStore(store)
      const request = pNotes.getAll()
      request.onsuccess = e => {
        resolve(JSON.stringify(request.result));
      }
    })
  },
  saveData(db, data, store) {
    return new Promise((resolve, reject) => {
      const tx = db.transaction(store, "readwrite")
      tx.onerror = e => alert(` Error! ${e.target.error}  `)
      const pNotes = tx.objectStore(store)
      data.forEach((element) => {
        pNotes.put(element)
      })
      resolve();
    })
  },
  async deleteNote(db, id, store) {
    try {
      await db.transaction(store, "readwrite").objectStore(store).delete(+id);
      console.log("Temporary object deleted");
    }
    catch (id) {
      alert("Error, you can delete this but something happened")
    }
  }
}