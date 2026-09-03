/* =========================================================
   IMOLE 2027 — SERVICE WORKER
   Hon. Nurudeen Abayomi Sadeeq
   NDC • Ojo Constituency II
   =========================================================

   FEATURES
   ---------------------------------------------------------
   ✓ PWA / Offline support
   ✓ GitHub Pages compatible
   ✓ Network-first HTML pages
   ✓ Cache-first static assets
   ✓ Automatic cache versioning
   ✓ Old cache cleanup
   ✓ Offline fallback to index.html
   ✓ Background asset refresh
   ✓ Handles failed network requests
   ✓ Supports app installation
   ✓ Safe activation/update process
   ✓ Chrome Android friendly
   ✓ Prevents stale HTML from being served
   =========================================================
*/

"use strict";

/* =========================================================
   1. CACHE VERSION
   ---------------------------------------------------------
   CHANGE THIS VERSION whenever you make major website
   changes. This forces the browser to create a new cache.
   ========================================================= */

const CACHE_VERSION = "imole-2026-09-03-v2";

const STATIC_CACHE = `${CACHE_VERSION}-static`;
const PAGE_CACHE = `${CACHE_VERSION}-pages`;
const IMAGE_CACHE = `${CACHE_VERSION}-images`;


/* =========================================================
   2. WEBSITE ROOT
   ---------------------------------------------------------
   GitHub Pages may host the website inside a repository
   subfolder. We therefore calculate the root dynamically.
   ========================================================= */

const SITE_ROOT = self.registration.scope;


/* =========================================================
   3. CORE FILES
   ---------------------------------------------------------
   These files are cached during installation.

   IMPORTANT:
   Only include files that actually exist in your repository.
   ========================================================= */

const CORE_FILES = [
    "./",
    "./index.html",

    "./about.html",
    "./manifesto.html",
    "./polling-units.html",
    "./results.html",
    "./news.html",
    "./events.html",
    "./gallery.html",
    "./media.html",
    "./today.html",
    "./contact.html",
    "./join.html",
    "./community.html",

    "./manifest.json",

    "./today-history.js"
];


/* =========================================================
   4. OPTIONAL ASSETS
   ---------------------------------------------------------
   These are cached when available.

   A missing file will NOT stop installation.
   ========================================================= */

const OPTIONAL_ASSETS = [

    /* Candidate / Party Images */
    "./assets/Hon%20Nurudeen%20Abayomi%20Sadeeq.jpg",
    "./assets/IMG-20260710-WA0004.jpg",
    "./assets/IMG-20260728-WA0032.jpg",

    /* Other candidate images */
    "./assets/Mr%20Peter%20Obi.jpg",
    "./assets/Hon%20Seyi%20Sowunmi.jpg",

    /* Common site assets */
    "./assets/favicon.ico",
    "./assets/icon-192.png",
    "./assets/icon-512.png",

    /* CSS / JS if present */
    "./style.css",
    "./styles.css",
    "./script.js",
    "./app.js"
];


/* =========================================================
   5. INSTALL EVENT
   ========================================================= */

self.addEventListener("install", event => {

    console.log(
        "[IMOLE SW] Installing:",
        CACHE_VERSION
    );

    event.waitUntil(

        Promise.all([

            /* Cache essential pages */
            caches.open(PAGE_CACHE)
                .then(cache => {

                    return Promise.all(
                        CORE_FILES.map(file => {

                            return cache.add(file)
                                .catch(error => {

                                    console.warn(
                                        "[IMOLE SW] Could not cache:",
                                        file,
                                        error
                                    );

                                });

                        })
                    );

                }),


            /* Cache optional assets */
            caches.open(STATIC_CACHE)
                .then(cache => {

                    return Promise.all(
                        OPTIONAL_ASSETS.map(file => {

                            return cache.add(file)
                                .catch(error => {

                                    console.warn(
                                        "[IMOLE SW] Optional asset unavailable:",
                                        file
                                    );

                                });

                        })
                    );

                })

        ])

        /* Activate the new worker immediately */
        .then(() => self.skipWaiting())

    );

});


/* =========================================================
   6. ACTIVATE EVENT
   ---------------------------------------------------------
   Removes caches belonging to older versions.
   ========================================================= */

self.addEventListener("activate", event => {

    console.log(
        "[IMOLE SW] Activating:",
        CACHE_VERSION
    );

    event.waitUntil(

        caches.keys()

            .then(cacheNames => {

                return Promise.all(

                    cacheNames
                        .filter(cacheName => {

                            return (
                                cacheName.startsWith("imole-") &&
                                !cacheName.includes(CACHE_VERSION)
                            );

                        })

                        .map(cacheName => {

                            console.log(
                                "[IMOLE SW] Removing old cache:",
                                cacheName
                            );

                            return caches.delete(cacheName);

                        })

                );

            })

            /* Take control of open pages */
            .then(() => self.clients.claim())

    );

});


/* =========================================================
   7. FETCH EVENT
   ========================================================= */

self.addEventListener("fetch", event => {

    const request = event.request;

    /* Only handle GET requests */
    if (request.method !== "GET") {
        return;
    }

    /* Ignore browser extensions */
    if (
        request.url.startsWith("chrome-extension://") ||
        request.url.startsWith("moz-extension://")
    ) {
        return;
    }

    /* Ignore non-HTTP requests */
    if (
        !request.url.startsWith("http://") &&
        !request.url.startsWith("https://")
    ) {
        return;
    }


    /* =====================================================
       REQUEST TYPE
       ===================================================== */

    const url = new URL(request.url);

    const isHTML =
        request.mode === "navigate" ||
        request.destination === "document" ||
        url.pathname.endsWith(".html") ||
        url.pathname === "/" ||
        url.pathname.endsWith("/");


    const isImage =
        request.destination === "image" ||
        /\.(jpg|jpeg|png|gif|webp|svg|ico)$/i.test(
            url.pathname
        );


    const isStaticAsset =
        request.destination === "script" ||
        request.destination === "style" ||
        request.destination === "font" ||
        /\.(js|css|woff|woff2|ttf)$/i.test(
            url.pathname
        );


    /* =====================================================
       HTML → NETWORK FIRST
       ===================================================== */

    if (isHTML) {

        event.respondWith(
            networkFirstPage(request)
        );

        return;
    }


    /* =====================================================
       IMAGES → CACHE FIRST
       ===================================================== */

    if (isImage) {

        event.respondWith(
            cacheFirstImage(request)
        );

        return;
    }


    /* =====================================================
       CSS / JS / FONTS → CACHE FIRST
       ===================================================== */

    if (isStaticAsset) {

        event.respondWith(
            cacheFirstAsset(request)
        );

        return;
    }


    /* =====================================================
       EVERYTHING ELSE
       ===================================================== */

    event.respondWith(
        networkWithCacheFallback(request)
    );

});


/* =========================================================
   8. NETWORK-FIRST FOR HTML
   ---------------------------------------------------------
   This is especially important for your website because
   you have experienced Chrome showing older versions.
   ========================================================= */

async function networkFirstPage(request) {

    const cache = await caches.open(PAGE_CACHE);

    try {

        const response = await fetch(
            request,
            {
                cache: "no-store"
            }
        );

        if (response && response.ok) {

            /*
             * Store the newest page.
             */
            await cache.put(
                request,
                response.clone()
            );

            return response;
        }

    } catch (error) {

        console.warn(
            "[IMOLE SW] Network unavailable:",
            request.url
        );

    }


    /* =====================================================
       NETWORK FAILED → CACHE
       ===================================================== */

    const cachedResponse = await cache.match(request);

    if (cachedResponse) {
        return cachedResponse;
    }


    /* =====================================================
       FINAL OFFLINE FALLBACK
       ===================================================== */

    const offlinePage =
        await cache.match("./index.html");

    if (offlinePage) {
        return offlinePage;
    }


    /* =====================================================
       EMERGENCY RESPONSE
       ===================================================== */

    return new Response(

        `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta
                name="viewport"
                content="width=device-width,initial-scale=1"
            >
            <title>IMOLE 2027</title>

            <style>
                body{
                    margin:0;
                    padding:40px 20px;
                    font-family:Arial,sans-serif;
                    text-align:center;
                    background:#111;
                    color:#fff;
                }

                h1{
                    margin-bottom:10px;
                }

                p{
                    line-height:1.6;
                    color:#ccc;
                }

                button{
                    padding:14px 22px;
                    border:0;
                    border-radius:8px;
                    font-weight:bold;
                    cursor:pointer;
                }
            </style>
        </head>

        <body>

            <h1>IMOLE 2027</h1>

            <p>
                You are currently offline.
                Please reconnect to the internet
                and try again.
            </p>

            <button onclick="location.reload()">
                Try Again
            </button>

        </body>
        </html>
        `,

        {
            headers: {
                "Content-Type": "text/html; charset=UTF-8"
            }
        }

    );

}


/* =========================================================
   9. CACHE-FIRST FOR IMAGES
   ========================================================= */

async function cacheFirstImage(request) {

    const cache =
        await caches.open(IMAGE_CACHE);

    const cached =
        await cache.match(request);

    if (cached) {

        /*
         * Return cached image immediately.
         *
         * Then update it in the background.
         */
        refreshCache(request, cache);

        return cached;
    }


    try {

        const response =
            await fetch(request);

        if (response && response.ok) {

            await cache.put(
                request,
                response.clone()
            );

            return response;
        }

    } catch (error) {

        console.warn(
            "[IMOLE SW] Image unavailable:",
            request.url
        );

    }


    return new Response(
        "",
        {
            status: 404,
            statusText: "Image unavailable"
        }
    );

}


/* =========================================================
   10. CACHE-FIRST FOR CSS / JS / FONTS
   ========================================================= */

async function cacheFirstAsset(request) {

    const cache =
        await caches.open(STATIC_CACHE);

    const cached =
        await cache.match(request);

    if (cached) {

        /*
         * Update in background.
         */
        refreshCache(request, cache);

        return cached;
    }


    try {

        const response =
            await fetch(request);

        if (response && response.ok) {

            await cache.put(
                request,
                response.clone()
            );

            return response;
        }

    } catch (error) {

        console.warn(
            "[IMOLE SW] Static asset unavailable:",
            request.url
        );

    }


    return new Response(
        "",
        {
            status: 404,
            statusText: "Asset unavailable"
        }
    );

}


/* =========================================================
   11. NETWORK WITH CACHE FALLBACK
   ========================================================= */

async function networkWithCacheFallback(request) {

    const cache =
        await caches.open(STATIC_CACHE);

    try {

        const response =
            await fetch(request);

        if (response && response.ok) {

            await cache.put(
                request,
                response.clone()
            );

            return response;
        }

    } catch (error) {

        console.warn(
            "[IMOLE SW] Request failed:",
            request.url
        );

    }


    const cached =
        await cache.match(request);

    if (cached) {
        return cached;
    }


    return new Response(
        "Offline",
        {
            status: 503,
            statusText: "Service Unavailable"
        }
    );

}


/* =========================================================
   12. BACKGROUND CACHE REFRESH
   ========================================================= */

async function refreshCache(request, cache) {

    try {

        const response =
            await fetch(
                request,
                {
                    cache: "no-store"
                }
            );

        if (response && response.ok) {

            await cache.put(
                request,
                response.clone()
            );

        }

    } catch (error) {

        /*
         * Background refresh failure is harmless.
         */
        console.warn(
            "[IMOLE SW] Background refresh failed:",
            request.url
        );

    }

}


/* =========================================================
   13. MESSAGE HANDLER
   ---------------------------------------------------------
   Allows index.html to tell the service worker to:
   ✓ skip waiting
   ✓ clear caches
   ✓ refresh
   ========================================================= */

self.addEventListener("message", event => {

    if (!event.data) {
        return;
    }


    /* Force new service worker to activate */
    if (
        event.data.type ===
        "SKIP_WAITING"
    ) {

        self.skipWaiting();

    }


    /* Clear all IMOLE caches */
    if (
        event.data.type ===
        "CLEAR_CACHE"
    ) {

        event.waitUntil(

            caches.keys()
                .then(cacheNames => {

                    return Promise.all(

                        cacheNames
                            .filter(name =>
                                name.startsWith("imole-")
                            )
                            .map(name =>
                                caches.delete(name)
                            )

                    );

                })

        );

    }


    /* Clear everything and reload */
    if (
        event.data.type ===
        "CLEAR_AND_REFRESH"
    ) {

        event.waitUntil(

            caches.keys()
                .then(cacheNames => {

                    return Promise.all(

                        cacheNames
                            .filter(name =>
                                name.startsWith("imole-")
                            )
                            .map(name =>
                                caches.delete(name)
                            )

                    );

                })

                .then(() => {

                    return self.clients.matchAll();

                })

                .then(clients => {

                    clients.forEach(client => {

                        client.postMessage({
                            type:
                                "CACHE_CLEARED"
                        });

                    });

                })

        );

    }

});


/* =========================================================
   14. PERIODIC BACKGROUND SYNC
   ---------------------------------------------------------
   Supported only by some browsers.

   Used to refresh important pages when possible.
   ========================================================= */

self.addEventListener(
    "periodicsync",
    event => {

        if (
            event.tag ===
            "imole-content-refresh"
        ) {

            event.waitUntil(
                refreshImportantPages()
            );

        }

    }
);


/* =========================================================
   15. REFRESH IMPORTANT PAGES
   ========================================================= */

async function refreshImportantPages() {

    const cache =
        await caches.open(PAGE_CACHE);

    const pages = [

        "./index.html",
        "./about.html",
        "./manifesto.html",
        "./polling-units.html",
        "./results.html",
        "./news.html",
        "./events.html",
        "./gallery.html",
        "./media.html",
        "./today.html",
        "./contact.html",
        "./join.html"

    ];


    for (const page of pages) {

        try {

            const response =
                await fetch(
                    page,
                    {
                        cache: "no-store"
                    }
                );

            if (
                response &&
                response.ok
            ) {

                await cache.put(
                    page,
                    response.clone()
                );

            }

        } catch (error) {

            console.warn(
                "[IMOLE SW] Could not refresh:",
                page
            );

        }

    }

}


/* =========================================================
   16. PUSH NOTIFICATION SUPPORT
   ---------------------------------------------------------
   Included for future expansion.

   This does not require notifications to be enabled.
   ========================================================= */

self.addEventListener(
    "push",
    event => {

        let data = {};

        try {

            if (event.data) {
                data = event.data.json();
            }

        } catch (error) {

            data = {
                title: "IMOLE 2027",
                body:
                    event.data
                        ? event.data.text()
                        : "New campaign update"
            };

        }


        const title =
            data.title ||
            "IMOLE 2027";


        const options = {

            body:
                data.body ||
                "New IMOLE 2027 update",

            icon:
                data.icon ||
                "./assets/icon-192.png",

            badge:
                data.badge ||
                "./assets/icon-192.png",

            data:
                data.url ||
                "./index.html",

            vibrate: [
                200,
                100,
                200
            ]

        };


        event.waitUntil(

            self.registration.showNotification(
                title,
                options
            )

        );

    }
);


/* =========================================================
   17. NOTIFICATION CLICK
   ========================================================= */

self.addEventListener(
    "notificationclick",
    event => {

        event.notification.close();


        const destination =
            event.notification.data ||
            "./index.html";


        event.waitUntil(

            clients.matchAll({
                type: "window",
                includeUncontrolled: true
            })

            .then(clientList => {

                /*
                 * If the website is already open,
                 * focus it.
                 */
                for (
                    const client of clientList
                ) {

                    if (
                        "focus" in client
                    ) {

                        return client.focus();

                    }

                }


                /*
                 * Otherwise open the page.
                 */
                if (
                    clients.openWindow
                ) {

                    return clients.openWindow(
                        destination
                    );

                }

            })

        );

    }
);


/* =========================================================
   18. ERROR HANDLING
   ========================================================= */

self.addEventListener(
    "error",
    event => {

        console.error(
            "[IMOLE SW] Service Worker error:",
            event.error
        );

    }
);


self.addEventListener(
    "unhandledrejection",
    event => {

        console.error(
            "[IMOLE SW] Unhandled promise:",
            event.reason
        );

    }
);


/* =========================================================
   19. READY MESSAGE
   ========================================================= */

console.log(
    "=============================================="
);

console.log(
    "IMOLE 2027 Service Worker Loaded"
);

console.log(
    "Version:",
    CACHE_VERSION
);

console.log(
    "Scope:",
    SITE_ROOT
);

console.log(
    "Offline support: ENABLED"
);

console.log(
    "Cache management: ENABLED"
);

console.log(
    "Network-first HTML: ENABLED"
);

console.log(
    "Cache-first assets: ENABLED"
);

console.log(
    "=============================================="
);
