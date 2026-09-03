/* ============================================================
   IMOLE 2027 — Progressive Web App Service Worker
   Candidate: Hon. Nurudeen Abayomi Sadeeq
   Party: Nigeria Democratic Congress (NDC)

   File: sw.js
   Version: 2026-09-03-03

   IMPORTANT:
   - This file must be named exactly: sw.js
   - Place it in the ROOT of the website repository.
   - index.html should register: ./sw.js
   ============================================================ */

"use strict";

/* ============================================================
   1. VERSIONING
   ============================================================ */

const SW_VERSION = "2026-09-03-03";

const STATIC_CACHE = `imole-static-${SW_VERSION}`;
const RUNTIME_CACHE = `imole-runtime-${SW_VERSION}`;
const IMAGE_CACHE = `imole-images-${SW_VERSION}`;


/* ============================================================
   2. BASE PATH
   Works on:
   - GitHub Pages
   - Netlify
   - Custom domains
   ============================================================ */

const BASE_PATH = new URL("./", self.registration.scope).pathname;


/* ============================================================
   3. IMPORTANT WEBSITE FILES
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
   4. INSTALL EVENT
   ============================================================ */

self.addEventListener("install", event => {

    console.log(
        `[IMOLE SW] Installing version ${SW_VERSION}`
    );

    event.waitUntil(

        caches.open(STATIC_CACHE)

            .then(cache => {

                console.log(
                    "[IMOLE SW] Pre-caching core website files..."
                );

                /*
                 * We intentionally do not fail the entire
                 * installation if one optional file is missing.
                 */

                return Promise.allSettled(

                    CORE_FILES.map(file => {

                        const url = new URL(
                            file,
                            self.registration.scope
                        ).href;

                        return fetch(
                            new Request(url, {
                                cache: "no-store"
                            })
                        )
                        .then(response => {

                            if (!response.ok) {
                                throw new Error(
                                    `HTTP ${response.status}: ${url}`
                                );
                            }

                            return cache.put(url, response);
                        })
                        .catch(error => {

                            console.warn(
                                "[IMOLE SW] Could not cache:",
                                file,
                                error
                            );

                        });

                    })

                );

            })

            .then(() => {

                /*
                 * Activate the new service worker immediately.
                 */

                return self.skipWaiting();

            })

    );

});


/* ============================================================
   5. ACTIVATE EVENT
   ============================================================ */

self.addEventListener("activate", event => {

    console.log(
        `[IMOLE SW] Activating version ${SW_VERSION}`
    );

    event.waitUntil(

        Promise.all([

            /*
             * Remove old caches.
             */

            caches.keys()
                .then(cacheNames => {

                    return Promise.all(

                        cacheNames.map(cacheName => {

                            if (

                                cacheName !== STATIC_CACHE &&
                                cacheName !== RUNTIME_CACHE &&
                                cacheName !== IMAGE_CACHE

                            ) {

                                console.log(
                                    "[IMOLE SW] Removing old cache:",
                                    cacheName
                                );

                                return caches.delete(cacheName);

                            }

                        })

                    );

                }),

            /*
             * Immediately control all open pages.
             */

            self.clients.claim()

        ])

    );

});


/* ============================================================
   6. MESSAGE HANDLER
   ============================================================ */

self.addEventListener("message", event => {

    if (!event.data) {
        return;
    }

    /*
     * Allows the webpage to tell the service worker
     * to activate immediately.
     */

    if (event.data.type === "SKIP_WAITING") {

        self.skipWaiting();

    }


    /*
     * Optional cache cleanup command.
     */

    if (event.data.type === "CLEAR_CACHE") {

        event.waitUntil(

            Promise.all([

                caches.delete(STATIC_CACHE),
                caches.delete(RUNTIME_CACHE),
                caches.delete(IMAGE_CACHE)

            ])

        );

    }

});


/* ============================================================
   7. FETCH EVENT
   ============================================================ */

self.addEventListener("fetch", event => {

    const request = event.request;

    /*
     * Only handle GET requests.
     */

    if (request.method !== "GET") {
        return;
    }

    const url = new URL(request.url);

    /*
     * Do not interfere with external websites/services.
     *
     * This is important for:
     * - WhatsApp
     * - Google
     * - YouTube
     * - external APIs
     * - analytics
     */

    if (url.origin !== self.location.origin) {
        return;
    }


    /* --------------------------------------------------------
       NAVIGATION / HTML PAGES
       -------------------------------------------------------- */

    if (

        request.mode === "navigate" ||
        request.destination === "document" ||
        url.pathname.endsWith(".html") ||
        url.pathname === BASE_PATH

    ) {

        event.respondWith(

            networkFirstHTML(request)

        );

        return;
    }


    /* --------------------------------------------------------
       IMAGES
       -------------------------------------------------------- */

    if (

        request.destination === "image" ||
        /\.(png|jpg|jpeg|gif|webp|svg|ico)$/i.test(url.pathname)

    ) {

        event.respondWith(

            cacheFirstImage(request)

        );

        return;
    }


    /* --------------------------------------------------------
       CSS / JAVASCRIPT / FONTS / STATIC FILES
       -------------------------------------------------------- */

    if (

        request.destination === "script" ||
        request.destination === "style" ||
        request.destination === "font" ||
        /\.(css|js|json|woff|woff2|ttf|otf)$/i.test(url.pathname)

    ) {

        event.respondWith(

            staleWhileRevalidate(request)

        );

        return;
    }


    /* --------------------------------------------------------
       EVERYTHING ELSE
       -------------------------------------------------------- */

    event.respondWith(

        staleWhileRevalidate(request)

    );

});


/* ============================================================
   8. NETWORK-FIRST HTML STRATEGY
   ============================================================

   IMPORTANT:
   HTML is deliberately network-first.

   This means:
   - New index.html is fetched from GitHub/Netlify first.
   - Old cached HTML is not preferred.
   - If internet fails, cached HTML is used.
   ============================================================ */

async function networkFirstHTML(request) {

    const cache = await caches.open(RUNTIME_CACHE);

    try {

        const networkResponse = await fetch(

            new Request(request, {
                cache: "no-store"
            })

        );

        if (networkResponse && networkResponse.ok) {

            /*
             * Store the newest HTML response.
             */

            await cache.put(
                request,
                networkResponse.clone()
            );

            return networkResponse;

        }

        throw new Error(
            `Network response was not OK: ${networkResponse.status}`
        );

    }

    catch (error) {

        console.warn(
            "[IMOLE SW] Network unavailable. Using cached HTML.",
            error
        );


        /*
         * Try the exact requested page first.
         */

        const cachedPage = await cache.match(request);

        if (cachedPage) {
            return cachedPage;
        }


        /*
         * Try the static cache.
         */

        const staticCache = await caches.open(STATIC_CACHE);

        const staticPage = await staticCache.match(request);

        if (staticPage) {
            return staticPage;
        }


        /*
         * If the requested page does not exist in cache,
         * return index.html as the offline fallback.
         */

        const indexURL = new URL(
            "./index.html",
            self.registration.scope
        ).href;


        const cachedIndex =
            await cache.match(indexURL) ||
            await staticCache.match(indexURL);


        if (cachedIndex) {
            return cachedIndex;
        }


        /*
         * Last-resort offline page.
         */

        return offlineResponse();

    }

}


/* ============================================================
   9. IMAGE CACHE STRATEGY
   ============================================================ */

async function cacheFirstImage(request) {

    const cache = await caches.open(IMAGE_CACHE);

    /*
     * Look for an existing image first.
     */

    const cached = await cache.match(request);

    if (cached) {

        /*
         * Update the image quietly in the background.
         */

        fetch(request)
            .then(response => {

                if (response && response.ok) {

                    cache.put(
                        request,
                        response.clone()
                    );

                }

            })
            .catch(() => {});


        return cached;
    }


    /*
     * Image not cached — download it.
     */

    try {

        const response = await fetch(request);

        if (response && response.ok) {

            await cache.put(
                request,
                response.clone()
            );

        }

        return response;

    }

    catch (error) {

        console.warn(
            "[IMOLE SW] Image could not be loaded:",
            request.url
        );

        return new Response(
            "",
            {
                status: 404,
                statusText: "Image unavailable offline"
            }
        );

    }

}


/* ============================================================
   10. STALE-WHILE-REVALIDATE
   ============================================================

   Used for:
   - JavaScript
   - CSS
   - fonts
   - JSON
   - other static files

   Existing cached version loads quickly while the newest
   version is downloaded in the background.
   ============================================================ */

async function staleWhileRevalidate(request) {

    const cache = await caches.open(STATIC_CACHE);

    const cachedResponse = await cache.match(request);


    const networkPromise = fetch(

        new Request(request, {
            cache: "no-store"
        })

    )
    .then(response => {

        if (response && response.ok) {

            cache.put(
                request,
                response.clone()
            );

        }

        return response;

    })
    .catch(() => null);


    /*
     * If cached version exists, use it immediately.
     */

    if (cachedResponse) {

        return cachedResponse;

    }


    /*
     * Otherwise wait for network.
     */

    const networkResponse = await networkPromise;

    if (networkResponse) {

        return networkResponse;

    }


    /*
     * Nothing available.
     */

    return new Response(
        "",
        {
            status: 503,
            statusText: "Resource unavailable offline"
        }
    );

}


/* ============================================================
   11. OFFLINE FALLBACK PAGE
   ============================================================ */

function offlineResponse() {

    const html = `

<!DOCTYPE html>

<html lang="en">

<head>

<meta charset="UTF-8">

<meta name="viewport"
      content="width=device-width,
               initial-scale=1.0">

<meta name="theme-color"
      content="#063b2d">

<title>IMOLE 2027 — Offline</title>

<style>

* {
    box-sizing: border-box;
}

body {

    margin: 0;

    min-height: 100vh;

    display: flex;

    align-items: center;

    justify-content: center;

    padding: 24px;

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

    color: white;

    text-align: center;

}

.card {

    width: 100%;

    max-width: 460px;

    padding: 35px 25px;

    border-radius: 22px;

    background:
        rgba(255,255,255,0.10);

    border:
        1px solid
        rgba(255,255,255,0.20);

    box-shadow:
        0 20px 60px
        rgba(0,0,0,0.25);

}

.logo {

    width: 90px;

    height: 90px;

    margin:
        0 auto 20px;

    border-radius: 50%;

    display: flex;

    align-items: center;

    justify-content: center;

    background: white;

    color: #063b2d;

    font-size: 42px;

    font-weight: bold;

}

h1 {

    margin:
        0 0 10px;

    font-size: 28px;

}

p {

    line-height: 1.6;

    opacity: 0.92;

}

button {

    margin-top: 15px;

    padding:
        14px 22px;

    border: none;

    border-radius: 50px;

    background: white;

    color: #063b2d;

    font-size: 16px;

    font-weight: bold;

    cursor: pointer;

}

.small {

    margin-top: 20px;

    font-size: 13px;

    opacity: 0.75;

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

    <p>
        You are currently offline.
    </p>

    <p>
        Some previously visited campaign
        pages may still be available.
        Please reconnect to the internet
        and try again.
    </p>

    <button onclick="location.reload()">
        Try Again
    </button>

    <div class="small">
        Hon. Nurudeen Abayomi Sadeeq<br>
        Lagos State House of Assembly<br>
        Ojo Constituency II
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
   12. SERVICE WORKER ERROR PROTECTION
   ============================================================ */

self.addEventListener(
    "error",
    event => {

        console.error(
            "[IMOLE SW] Error:",
            event.error || event.message
        );

    }
);


self.addEventListener(
    "unhandledrejection",
    event => {

        console.error(
            "[IMOLE SW] Unhandled promise rejection:",
            event.reason
        );

    }
);


/* ============================================================
   13. READY
   ============================================================ */

console.log(
    `%cIMOLE 2027 Service Worker ${SW_VERSION} loaded`,
    "font-weight:bold;"
);
