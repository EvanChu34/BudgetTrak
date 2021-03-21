const FILES_TO_CACHE = [
"/",
"/index.html",
"/db.js",
"/index.js",
"/manifest.webamainfest",
"/style.css"
];

const CACHE_NAME = "static-cache-v2";
const DATA_CACHE_NAME = "data-cache-v1";

self.addEventListener("install", (event) => {
    event.waitUntil(
      caches.open(CACHE_NAME).then(cache => {
        console.log("Your files were pre-cached successfully!");
        return cache.addAll(FILES_TO_CACHE);
      })
    );
  
    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then(keyList) => {
      Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME && key !== DATA_CACHE_NAME){
            return caches.delete(key);
          }
          return undefined
        })
      
      )
  )
})





