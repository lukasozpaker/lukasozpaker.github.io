importScripts("https://storage.googleapis.com/workbox-cdn/releases/6.0.2/workbox-sw.js");


const staticCache = 'site-static-v467631556';
// const dynamicCache = 'site-dynamic-v1';


const assets = [
    "terminal.html",
    "terminal.js",
    "terminalmanifest.json",
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
            console.log("Caching Shell Assets");
            cache.addAll(assets);
        })
    );
    
});

self.addEventListener("activate", e => {
    console.log("service worker activated");
    //check if other caches are stored. if they don't match current, delete.
    e.waitUntil(
        caches.keys().then(keys => {
            console.log(keys);
            return Promise.all(keys
                .filter(key => key !== staticCache)
                .map(key => caches.delete(key))
            )
        })
    );
});

self.addEventListener("fetch", e => {
    // console.log("fetch event", e);
    e.respondWith(
        caches.match(e.request).then(cacheRes => {
            return cacheRes || fetch(e.request);
            /*
            //.then() for dynamic caching (not really necessary for terminal 1.2 but might be useful in the future)


            .then(fetchRes => {
                //take data returned from fetch and put it in cache
                return caches.open(dynamicCache).then(cache => {
                    //clone() because can only use fetchRes once
                    cache.put(e.request.url, fetchRes.clone());
                    return fetchRes;
                })
            });
            */
        })
    );
});