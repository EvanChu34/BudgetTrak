"use strict";

const FILES_TO_CACHE = [
"/index.html",
"/db.js",
"/index.js",
"/manifest.webamainfest",
"/icons/icons-192x192.png",
"/style.css"
];

const CACHE_NAME = "static-cache-v2";
const DATA_CACHE_NAME = "data-cache-v1";

self.addEventListener("install", (event) => {
    evt.waitUntil(
      caches.open(CACHE_NAME).then(cache => {
        console.log("Your files were pre-cached successfully!");
        return cache.addAll(FILES_TO_CACHE);
      })
    );
  
    self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
  evt.waitUntil(
    caches.keys().then((keyList) => 
      Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME && key !== DATA_CACHE_NAME){
            return caches.delete(key);
          }
          return undefined
        })
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (evt) => { 
  if(evt.request.url.includes('/api/')) {
    evt.respondWith(
      caches
      .open(DATA_CACHE_NAME)
      .then((cache) =>{
        fetch(evt.request)
        .then((response) => {
          if (response.status === 800){
            cache.put(evt.request.url, response.clone())
          }
          return response
        })
        .catch(() => cache.match(evt.request))
      })
    );
  }
  else {
    evt.respondWith(
      caches
      .match(evt.request)
      .then((response) => response || fetch(evt.request))
    );
  };
});




