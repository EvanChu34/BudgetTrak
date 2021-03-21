const pendingObjectStoreName = `pending`;

const request = indexedDB.open(`budget`, 1);

request.onupgradeneeded = event => {
  const db = request.result;
  console.log(event);

  if (!db.objectStoreNames.contains(pendingObjectStoreName)) {
    db.createObjectStore(pendingObjectStoreName, { autoIncrement: true });
  }
};

request.onsuccess = event => {
    console.log(`Success! ${event.type}`);
    if (navigator.onLine) {
      checkDatabase();
    }
};
  
request.onerror = event => console.error(event);

function checkDatabase () {
    const db = request.result;
    let transaction = db.transaction([pendingObjectStoreName], `readwrite`);
    let store = transaction.objectStore(pendingObjectStoreName);
    const getAll = store.getAll();

    getAll.onsuccess = () => {
        if (getAll.result.length > 0) {
            fetch(`/api/transaction/bulk`, {
                method: 'POST',
                body: JSON.stringify(getAll.result),
                headers:{
                   Accept: `application/json, text/plain, */*`,
                   "Content-Type": `application/json` 
                }
            })
            .then()
            .then()

        }
    }

}

function saveRecord () {

}

window.addEventListener(`online`, checkDatabase);