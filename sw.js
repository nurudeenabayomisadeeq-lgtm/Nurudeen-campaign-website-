/* ============================================================
   IMOLE 2027 — PROGRESSIVE WEB APP SERVICE WORKER
   ============================================================

   Candidate:
   Hon. Nurudeen Abayomi Sadeeq

   Position:
   Lagos State House of Assembly
   Ojo Constituency II

   Party:
   Nigeria Democratic Congress (NDC)

   Brand:
   IMOLE 2027

   FILE:
   sw.js

   VERSION:
   2026-09-05-06

   IMPORTANT:
   ------------------------------------------------------------
   • Keep this file in the ROOT of the website.
   • File name must be exactly: sw.js
   • Pages should register ./sw.js?v=VERSION
   • HTML uses NETWORK-FIRST.
   • Images use CACHE-FIRST.
   • CSS/JS use STALE-WHILE-REVALIDATE.
   • MP3/audio range requests bypass the service worker.
   • External websites/APIs are NOT intercepted.
   • Old caches are automatically deleted.
   ============================================================ */

"use strict";


/* ============================================================
   1. VERSIONING
   ============================================================ */

const SW_VERSION = "2026-09-05-06";

const STATIC_CACHE =
    `imole-static-${SW_VERSION}`;

const RUNTIME_CACHE =
    `imole-runtime-${SW_VERSION}`;

const IMAGE_CACHE =
    `imole-images-${SW_VERSION}`;


/* ============================================================
   2. SERVICE WORKER SCOPE
   ============================================================ */

const SW_SCOPE =
    self.registration.scope;

const BASE_PATH =
    new URL("./", SW_SCOPE).pathname;


/* ============================================================
   3. WEBSITE CORE FILES
   ============================================================

   These files are pre-cached during installation.

   Individual files are cached separately so that one missing
   optional page will NOT break the entire installation.
   ============================================================ */

const CORE_FILES = [

    "./",

    "./index.html",

    "./manifest.json",

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

    "./today-history.js"

];


/* ============================================================
   4. OPTIONAL CORE ASSETS
   ============================================================

   These are intentionally optional.

   If an asset does not exist, installation continues normally.
   ============================================================ */

const OPTIONAL_ASSETS = [

    "./assets/IMG-20260728-WA0032.jpg",

    "./assets/Hon Nurudeen Abayomi Sadeeq.jpg",

    "./assets/Hon Seyi Sowunmi.jpg",

    "./assets/Mr Peter Obi.jpg"

];


/* ============================================================
   5. INSTALL
   ============================================================ */

self.addEventListener(
    "install",
    event => {

        console.log(
            `[IMOLE SW] Installing ${SW_VERSION}`
        );

        event.waitUntil(

            precacheCoreFiles()

                .then(() => {

                    console.log(
                        "[IMOLE SW] Core files cached."
                    );

                })

                .catch(error => {

                    console.warn(
                        "[IMOLE SW] Pre-cache warning:",
                        error
                    );

                })

                .then(() => {

                    /*
                     * Activate the newest worker immediately.
                     */

                    return self.skipWaiting();

                })

        );

    }
);


/* ============================================================
   6. PRE-CACHE CORE FILES
   ============================================================ */

async function precacheCoreFiles() {

    const cache =
        await caches.open(STATIC_CACHE);


    /*
     * Cache each file individually.

     * This prevents one missing file from stopping
     * the entire service worker installation.
     */

    await Promise.all(

        CORE_FILES.map(
            async file => {

                const url =
                    new URL(
                        file,
                        SW_SCOPE
                    ).href;

                try {

                    const response =
                        await fetch(
                            new Request(
                                url,
                                {
                                    cache: "no-store"
                                }
                            )
                        );

                    if (
                        response &&
                        response.ok
                    ) {

                        await cache.put(
                            url,
                            response.clone()
                        );

                        console.log(
                            "[IMOLE SW] Cached:",
                            file
                        );

                    } else {

                        console.warn(
                            "[IMOLE SW] Could not cache:",
                            file,
                            response
                                ? response.status
                                : "no response"
                        );

                    }

                } catch (error) {

                    console.warn(
                        "[IMOLE SW] Optional file unavailable:",
                        file,
                        error
                    );

                }

            }
        )

    );


    /*
     * Optional images/assets.
     */

    await Promise.all(

        OPTIONAL_ASSETS.map(
            async file => {

                const url =
                    new URL(
                        file,
                        SW_SCOPE
                    ).href;

                try {

                    const response =
                        await fetch(
                            new Request(
                                url,
                                {
                                    cache: "no-store"
                                }
                            )
                        );

                    if (
                        response &&
                        response.ok
                    ) {

                        await cache.put(
                            url,
                            response.clone()
                        );

                    }

                } catch (error) {

                    console.warn(
                        "[IMOLE SW] Optional asset not cached:",
                        file
                    );

                }

            }
        )

    );

}


/* ============================================================
   7. ACTIVATE
   ============================================================ */

self.addEventListener(
    "activate",
    event => {

        console.log(
            `[IMOLE SW] Activating ${SW_VERSION}`
        );

        event.waitUntil(

            Promise.all([

                removeOldCaches(),

                self.clients.claim()

            ])

        );

    }
);


/* ============================================================
   8. REMOVE OLD CACHES
   ============================================================ */

async function removeOldCaches() {

    const cacheNames =
        await caches.keys();


    await Promise.all(

        cacheNames.map(
            async cacheName => {

                /*
                 * Preserve only caches belonging
                 * to the current version.
                 */

                const keep =

                    cacheName === STATIC_CACHE ||

                    cacheName === RUNTIME_CACHE ||

                    cacheName === IMAGE_CACHE;


                if (!keep) {

                    console.log(
                        "[IMOLE SW] Deleting old cache:",
                        cacheName
                    );

                    await caches.delete(
                        cacheName
                    );

                }

            }
        )

    );

}


/* ============================================================
   9. MESSAGE HANDLER
   ============================================================ */

self.addEventListener(
    "message",
    event => {

        if (!event.data) {
            return;
        }


        /*
         * Force the waiting service worker to activate.
         */

        if (
            event.data.type ===
            "SKIP_WAITING"
        ) {

            self.skipWaiting();

        }


        /*
         * Clear all IMOLE caches.

         * Useful for troubleshooting.
         */

        if (
            event.data.type ===
            "CLEAR_CACHE"
        ) {

            event.waitUntil(

                Promise.all([

                    caches.delete(
                        STATIC_CACHE
                    ),

                    caches.delete(
                        RUNTIME_CACHE
                    ),

                    caches.delete(
                        IMAGE_CACHE
                    )

                ])

            );

        }


        /*
         * Clear ALL caches controlled by this
         * service worker version family.
         */

        if (
            event.data.type ===
            "CLEAR_ALL_IMOLE_CACHES"
        ) {

            event.waitUntil(

                caches.keys()
                    .then(names =>

                        Promise.all(

                            names
                                .filter(
                                    name =>
                                        name.startsWith(
                                            "imole-"
                                        )
                                )
                                .map(
                                    name =>
                                        caches.delete(
                                            name
                                        )
                                )

                        )

                    )

            );

        }

    }
);


/* ============================================================
   10. FETCH EVENT
   ============================================================ */

self.addEventListener(
    "fetch",
    event => {

        const request =
            event.request;


        /*
         * Only GET requests.
         */

        if (
            request.method !==
            "GET"
        ) {

            return;

        }


        const url =
            new URL(
                request.url
            );


        /* ----------------------------------------------------
           NEVER INTERCEPT EXTERNAL WEBSITES
           ----------------------------------------------------

           Examples:
           • WhatsApp
           • Facebook
           • YouTube
           • Google
           • rss2json
           • external APIs
           • social media
           ---------------------------------------------------- */

        if (
            url.origin !==
            self.location.origin
        ) {

            return;

        }


        /* ----------------------------------------------------
           IMPORTANT:
           NEVER CACHE sw.js ITSELF
           ----------------------------------------------------

           This is extremely important for PWA updates.

           Otherwise the service worker could accidentally
           receive an old cached copy of itself.
           ---------------------------------------------------- */

        if (
            url.pathname.endsWith(
                "/sw.js"
            )
        ) {

            return;

        }


        /* ----------------------------------------------------
           BYPASS AUDIO RANGE REQUESTS
           ----------------------------------------------------

           MP3 players frequently use HTTP Range requests.

           Intercepting these requests can cause:
           • songs not playing
           • seeking problems
           • partial audio errors
           • "can't play this file" messages

           Therefore audio/range requests go directly
           to the network/browser.
           ---------------------------------------------------- */

        if (
            request.headers.get(
                "range"
            )
        ) {

            return;

        }


        /* ----------------------------------------------------
           AUDIO FILES
           ---------------------------------------------------- */

        if (

            request.destination ===
            "audio"

            ||

            /\.(mp3|wav|ogg|m4a|aac|flac)$/i
                .test(
                    url.pathname
                )

        ) {

            /*
             * Do not cache campaign audio automatically.
             *
             * This protects playback and prevents
             * very large MP3 files filling the cache.
             */

            event.respondWith(
                fetch(request)
            );

            return;

        }


        /* ----------------------------------------------------
           HTML / PAGE NAVIGATION
           ---------------------------------------------------- */

        if (

            request.mode ===
            "navigate"

            ||

            request.destination ===
            "document"

            ||

            url.pathname.endsWith(
                ".html"
            )

            ||

            url.pathname ===
            BASE_PATH

        ) {

            event.respondWith(

                networkFirstHTML(
                    request
                )

            );

            return;

        }


        /* ----------------------------------------------------
           IMAGES
           ---------------------------------------------------- */

        if (

            request.destination ===
            "image"

            ||

            /\.(png|jpg|jpeg|gif|webp|svg|ico|avif)$/i
                .test(
                    url.pathname
                )

        ) {

            event.respondWith(

                cacheFirstImage(
                    request
                )

            );

            return;

        }


        /* ----------------------------------------------------
           CSS / JAVASCRIPT / FONTS
           ---------------------------------------------------- */

        if (

            request.destination ===
            "script"

            ||

            request.destination ===
            "style"

            ||

            request.destination ===
            "font"

            ||

            /\.(css|js|woff|woff2|ttf|otf)$/i
                .test(
                    url.pathname
                )

        ) {

            event.respondWith(

                staleWhileRevalidate(
                    request
                )

            );

            return;

        }


        /* ----------------------------------------------------
           MANIFEST
           ---------------------------------------------------- */

        if (
            url.pathname.endsWith(
                "/manifest.json"
            )
        ) {

            event.respondWith(

                networkFirstStatic(
                    request
                )

            );

            return;

        }


        /* ----------------------------------------------------
           JSON / SAME-ORIGIN DATA
           ---------------------------------------------------- */

        if (
            url.pathname.endsWith(
                ".json"
            )
        ) {

            event.respondWith(

                networkFirstStatic(
                    request
                )

            );

            return;

        }


        /* ----------------------------------------------------
           OTHER SAME-ORIGIN FILES
           ---------------------------------------------------- */

        event.respondWith(

            staleWhileRevalidate(
                request
            )

        );

    }
);


/* ============================================================
   11. NETWORK-FIRST HTML
   ============================================================

   This is the most important part of the new system.

   ONLINE:
   -----------------------
   Browser gets the newest HTML from the server.

   OFFLINE:
   -----------------------
   Browser gets cached HTML.

   This prevents old HTML from permanently taking priority.
   ============================================================ */

async function networkFirstHTML(
    request
) {

    const cache =
        await caches.open(
            RUNTIME_CACHE
        );


    try {

        const networkResponse =
            await fetch(
                new Request(
                    request,
                    {
                        cache:
                            "no-store"
                    }
                )
            );


        if (
            networkResponse &&
            networkResponse.ok
        ) {

            /*
             * Save the newest version.
             */

            await cache.put(
                request,
                networkResponse.clone()
            );


            /*
             * Also update the static cache
             * for ordinary HTML pages.
             */

            try {

                const staticCache =
                    await caches.open(
                        STATIC_CACHE
                    );

                const cleanURL =
                    new URL(
                        request.url
                    ).href;

                await staticCache.put(
                    cleanURL,
                    networkResponse.clone()
                );

            } catch (error) {

                console.warn(
                    "[IMOLE SW] Static HTML update skipped:",
                    error
                );

            }


            return networkResponse;

        }


        throw new Error(
            `HTTP ${networkResponse.status}`
        );

    }

    catch (error) {

        console.warn(
            "[IMOLE SW] Offline HTML fallback:",
            request.url
        );


        /*
         * First:
         * Try exact URL.
         */

        const exactCache =
            await cache.match(
                request
            );


        if (exactCache) {

            return exactCache;

        }


        /*
         * Second:
         * Try without query parameters.

         * This is important for:
         *
         * news.html?ward=Ilogbo
         * events.html?ward=Ilogbo
         * community.html?ward=Ilogbo
         * polling-units.html?ward=Ilogbo
         */

        const cleanURL =
            new URL(
                request.url
            );

        cleanURL.search = "";


        const cleanRequest =
            new Request(
                cleanURL.href,
                {
                    method: "GET"
                }
            );


        const cleanCache =
            await cache.match(
                cleanRequest
            );


        if (cleanCache) {

            return cleanCache;

        }


        /*
         * Third:
         * Static cache.
         */

        const staticCache =
            await caches.open(
                STATIC_CACHE
            );


        const staticExact =
            await staticCache.match(
                request
            );


        if (staticExact) {

            return staticExact;

        }


        const staticClean =
            await staticCache.match(
                cleanRequest
            );


        if (staticClean) {

            return staticClean;

        }


        /*
         * Fourth:
         * Use index.html as the offline fallback.
         */

        const indexURL =
            new URL(
                "./index.html",
                SW_SCOPE
            ).href;


        const cachedIndex =

            await cache.match(
                indexURL
            )

            ||

            await staticCache.match(
                indexURL
            );


        if (cachedIndex) {

            return cachedIndex;

        }


        /*
         * Final fallback.
         */

        return offlineResponse();

    }

}


/* ============================================================
   12. IMAGE CACHE
   ============================================================

   Strategy:
   CACHE FIRST + background update

   This gives faster loading for:
   • Candidate photo
   • NDC logo
   • Gallery images
   • Campaign images
   ============================================================ */

async function cacheFirstImage(
    request
) {

    const cache =
        await caches.open(
            IMAGE_CACHE
        );


    const cached =
        await cache.match(
            request
        );


    if (cached) {

        /*
         * Refresh the image silently.
         */

        fetch(
            new Request(
                request,
                {
                    cache:
                        "no-store"
                }
            )
        )
            .then(
                response => {

                    if (
                        response &&
                        response.ok
                    ) {

                        return cache.put(
                            request,
                            response.clone()
                        );

                    }

                }
            )
            .catch(
                () => {}
            );


        return cached;

    }


    try {

        const response =
            await fetch(
                request
            );


        if (
            response &&
            response.ok
        ) {

            await cache.put(
                request,
                response.clone()
            );

        }


        return response;

    }

    catch (error) {

        console.warn(
            "[IMOLE SW] Image unavailable:",
            request.url
        );


        return new Response(
            "",
            {
                status: 404,
                statusText:
                    "Image unavailable offline"
            }
        );

    }

}


/* ============================================================
   13. STALE-WHILE-REVALIDATE
   ============================================================ */

async function staleWhileRevalidate(
    request
) {

    const cache =
        await caches.open(
            STATIC_CACHE
        );


    const cachedResponse =
        await cache.match(
            request
        );


    const networkPromise =

        fetch(
            new Request(
                request,
                {
                    cache:
                        "no-store"
                }
            )
        )

            .then(
                async response => {

                    if (
                        response &&
                        response.ok
                    ) {

                        await cache.put(
                            request,
                            response.clone()
                        );

                    }


                    return response;

                }
            )

            .catch(
                () => null
            );


    /*
     * Cached version is immediately returned.
     */

    if (cachedResponse) {

        return cachedResponse;

    }


    /*
     * No cached version.
     * Wait for network.
     */

    const networkResponse =
        await networkPromise;


    if (networkResponse) {

        return networkResponse;

    }


    return new Response(
        "",
        {
            status: 503,
            statusText:
                "Resource unavailable offline"
        }
    );

}


/* ============================================================
   14. NETWORK-FIRST STATIC FILE
   ============================================================ */

async function networkFirstStatic(
    request
) {

    const cache =
        await caches.open(
            RUNTIME_CACHE
        );


    try {

        const response =
            await fetch(
                new Request(
                    request,
                    {
                        cache:
                            "no-store"
                    }
                )
            );


        if (
            response &&
            response.ok
        ) {

            await cache.put(
                request,
                response.clone()
            );

            return response;

        }


        throw new Error(
            `HTTP ${response.status}`
        );

    }

    catch (error) {

        const cached =
            await cache.match(
                request
            );


        if (cached) {

            return cached;

        }


        const staticCache =
            await caches.open(
                STATIC_CACHE
            );


        const staticCached =
            await staticCache.match(
                request
            );


        if (staticCached) {

            return staticCached;

        }


        return new Response(
            "",
            {
                status: 503,
                statusText:
                    "Resource unavailable offline"
            }
        );

    }

}


/* ============================================================
   15. OFFLINE FALLBACK
   ============================================================ */

function offlineResponse() {

    const html = `

<!DOCTYPE html>

<html lang="en">

<head>

<meta charset="UTF-8">

<meta name="viewport"
      content="width=device-width,
               initial-scale=1.0,
               viewport-fit=cover">

<meta name="theme-color"
      content="#063b2d">

<meta name="color-scheme"
      content="light">

<title>IMOLE 2027 — Offline</title>

<style>

* {
    box-sizing: border-box;
}

html,
body {
    margin: 0;
    padding: 0;
    min-height: 100%;
}

body {

    min-height: 100vh;

    display: flex;

    align-items: center;

    justify-content: center;

    padding:
        24px;

    font-family:
        Arial,
        Helvetica,
        sans-serif;

    background:
        linear-gradient(
            135deg,
            #063b2d,
            #0b5d45
        );

    color:
        #ffffff;

    text-align:
        center;

}

.card {

    width:
        100%;

    max-width:
        460px;

    padding:
        35px 25px;

    border-radius:
        24px;

    background:
        rgba(
            255,
            255,
            255,
            0.10
        );

    border:
        1px solid
        rgba(
            255,
            255,
            255,
            0.20
        );

    box-shadow:
        0 20px 60px
        rgba(
            0,
            0,
            0,
            0.25
        );

}

.logo {

    width:
        90px;

    height:
        90px;

    margin:
        0 auto 20px;

    border-radius:
        50%;

    display:
        flex;

    align-items:
        center;

    justify-content:
        center;

    background:
        #ffffff;

    color:
        #063b2d;

    font-size:
        42px;

    font-weight:
        900;

}

h1 {

    margin:
        0 0 10px;

    font-size:
        28px;

}

h2 {

    margin:
        0 0 15px;

    font-size:
        17px;

    opacity:
        0.95;

}

p {

    line-height:
        1.65;

    opacity:
        0.92;

}

button {

    margin-top:
        15px;

    padding:
        14px 24px;

    border:
        none;

    border-radius:
        50px;

    background:
        #ffffff;

    color:
        #063b2d;

    font-size:
        16px;

    font-weight:
        800;

    cursor:
        pointer;

}

button:active {

    transform:
        scale(
            0.97
        );

}

.small {

    margin-top:
        20px;

    font-size:
        13px;

    line-height:
        1.6;

    opacity:
        0.75;

}

</style>

</head>

<body>

<div class="card">

    <div class="logo">
        I
    </div>

    <h1>
        IMOLE 2027
    </h1>

    <h2>
        Service • Development • Accountability
    </h2>

    <p>
        You are currently offline.
    </p>

    <p>
        Some previously visited IMOLE 2027
        pages may still be available.
        Reconnect to the internet and try again
        for the latest campaign information.
    </p>

    <button
        onclick="location.reload()">
        Try Again
    </button>

    <div class="small">

        Hon. Nurudeen Abayomi Sadeeq<br>

        Lagos State House of Assembly<br>

        Ojo Constituency II<br>

        Nigeria Democratic Congress (NDC)

    </div>

</div>

</body>

</html>

`;


    return new Response(
        html,
        {
            status: 503,

            headers: {
                "Content-Type":
                    "text/html; charset=UTF-8",

                "Cache-Control":
                    "no-store"
            }

        }
    );

}


/* ============================================================
   16. GLOBAL ERROR PROTECTION
   ============================================================ */

self.addEventListener(
    "error",
    event => {

        console.error(
            "[IMOLE SW] Error:",
            event.error ||
            event.message
        );

    }
);


self.addEventListener(
    "unhandledrejection",
    event => {

        console.error(
            "[IMOLE SW] Unhandled rejection:",
            event.reason
        );

    }
);


/* ============================================================
   17. SERVICE WORKER READY
   ============================================================ */

console.log(
    `[IMOLE SW] IMOLE 2027 Service Worker ${SW_VERSION} loaded`
);
