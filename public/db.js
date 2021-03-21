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
}

function saveRecord () {

}

window.addEventListener(`online`, checkDatabase);