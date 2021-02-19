importScripts("https://storage.googleapis.com/workbox-cdn/releases/6.0.2/workbox-sw.js");


const staticCache = 'site-static';
const assets = [
    "terminal.html",
    "terminal.js",
    "terminalmanifest.json",
    "terminalsw.js",
    "terminal/terminal512.png",
    "https://fonts.googleapis.com/icon?family=Material+Icons",
    "https://fonts.gstatic.com/s/materialicons/v77/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2"
];
// workbox.routing.registerRoute(
//     ({request}) => request.destination === "image",
//     new workbox.strategies.CacheFirst()
// );

self.addEventListener("install", e => {
    // console.log("service worker installed");
    e.waitUntil(
        caches.open(staticCache).then(cache => {
        //add here tutorial
        console.log("caching shell assets");
        cache.addAll(assets);
        })
    );
    
});

self.addEventListener("activate", e => {
    // console.log("service worker activated");
});

self.addEventListener("fetch", e => {
    // console.log("fetch event", e);
    e.respondWith(
        caches.match(e.request).then(cacheRes => {
            // return cached file, if no cached file exists, fetch the file
            return cacheRes || fetch(e.request);
        })
    );
});