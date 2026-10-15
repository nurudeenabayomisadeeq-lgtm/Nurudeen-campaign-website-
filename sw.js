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

   VERSION:
   2026-10-15-01

   FEATURES:
   - Network-first HTML navigation
   - Offline page fallback
   - Versioned caches
   - Automatic cleanup of older IMOLE caches
   - Updated campaign images
   - Cache-first performance for static assets
   - Safe audio playback and range requests
   - GitHub Pages subdirectory compatibility
   - WhatsApp, Facebook and external links preserved
   ============================================================ */

"use strict";


/* ============================================================
   1. VERSION AND CACHE CONFIGURATION
   ============================================================ */

const SW_VERSION = "2026-10-15-01";

const CACHE_PREFIX = "imole-";

const STATIC_CACHE =
    `${CACHE_PREFIX}static-${SW_VERSION}`;

const PAGE_CACHE =
    `${CACHE_PREFIX}pages-${SW_VERSION}`;

const IMAGE_CACHE =
    `${CACHE_PREFIX}images-${SW_VERSION}`;

const DATA_CACHE =
    `${CACHE_PREFIX}data-${SW_VERSION}`;


/* ============================================================
   2. WEBSITE BASE PATH
   ============================================================ */

const SW_SCOPE = self.registration.scope;

const BASE_URL = new URL("./", SW_SCOPE);

const BASE_PATH = BASE_URL.pathname;


/* ============================================================
   3. CORE WEBSITE FILES
   ============================================================

   Keep the filenames consistent with the actual files
   available in the GitHub repository.

   Missing optional pages will not break installation.
   ============================================================ */

const CORE_FILES = [
    "./",
    "./index.html",
    "./manifest.json",
    "./community.html",
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


/* ============================================================
   4. OPTIONAL ASSETS
   ============================================================ */

const OPTIONAL_ASSETS = [
    "./assets/icon-192.png",
    "./assets/Hon Nurudeen Abayomi Sadeeq.jpg",
    "./assets/IMG-20260728-WA0032.jpg",
    "./assets/Hon Seyi Sowunmi.jpg",
    "./assets/Mr Peter Obi.jpg"
];


/* ============================================================
   5. INSTALLATION
   ============================================================ */

self.addEventListener("install", event => {
    console.log(
        `[IMOLE SW] Installing version ${SW_VERSION}`
    );

    event.waitUntil(
        installCoreFiles()
            .then(() => self.skipWaiting())
            .catch(error => {
                console.error(
                    "[IMOLE SW] Installation error:",
                    error
                );

                return self.skipWaiting();
            })
    );
});


/* ============================================================
   6. PRECACHE CORE FILES
   ============================================================ */

async function installCoreFiles() {
    const cache = await caches.open(STATIC_CACHE);

    await Promise.all(
        CORE_FILES.map(async file => {
            const url = new URL(file, SW_SCOPE).href;

            try {
                const response = await fetch(url, {
                    cache: "no-store"
                });

                if (
                    response.ok &&
                    response.type !== "opaque"
                ) {
                    await cache.put(
                        url,
                        response.clone()
                    );

                    console.log(
                        "[IMOLE SW] Cached page:",
                        file
                    );
                }
            } catch (error) {
                console.warn(
                    "[IMOLE SW] Page not precached:",
                    file
                );
            }
        })
    );

    await Promise.all(
        OPTIONAL_ASSETS.map(async file => {
            const url = new URL(file, SW_SCOPE).href;

            try {
                const response = await fetch(url, {
                    cache: "no-store"
                });

                if (response.ok) {
                    await cache.put(
                        url,
                        response.clone()
                    );
                }
            } catch (error) {
                console.warn(
                    "[IMOLE SW] Optional asset unavailable:",
                    file
                );
            }
        })
    );
}


/* ============================================================
   7. ACTIVATE THE NEW VERSION
   ============================================================ */

self.addEventListener("activate", event => {
    console.log(
        `[IMOLE SW] Activating version ${SW_VERSION}`
    );

    event.waitUntil(
        Promise.all([
            deleteOldImoleCaches(),
            self.clients.claim()
        ])
    );
});


/* ============================================================
   8. CLEAN UP OLD IMOLE CACHES
   ============================================================ */

async function deleteOldImoleCaches() {
    const cacheNames = await caches.keys();

    const currentCaches = [
        STATIC_CACHE,
        PAGE_CACHE,
        IMAGE_CACHE,
        DATA_CACHE
    ];

    await Promise.all(
        cacheNames.map(async cacheName => {
            if (
                cacheName.startsWith(CACHE_PREFIX) &&
                !currentCaches.includes(cacheName)
            ) {
                console.log(
                    "[IMOLE SW] Removing old cache:",
                    cacheName
                );

                await caches.delete(cacheName);
            }
        })
    );
}


/* ============================================================
   9. OPTIONAL MESSAGE COMMANDS
   ============================================================ */

self.addEventListener("message", event => {
    const data = event.data;

    if (!data || !data.type) {
        return;
    }

    if (data.type === "SKIP_WAITING") {
        self.skipWaiting();
    }

    if (data.type === "CLEAR_IMOLE_CACHES") {
        event.waitUntil(
            caches.keys().then(cacheNames =>
                Promise.all(
                    cacheNames
                        .filter(name =>
                            name.startsWith(CACHE_PREFIX)
                        )
                        .map(name => caches.delete(name))
                )
            )
        );
    }
});


/* ============================================================
   10. FETCH HANDLER
   ============================================================ */

self.addEventListener("fetch", event => {
    const request = event.request;

    if (request.method !== "GET") {
        return;
    }

    const url = new URL(request.url);

    /*
     * Do not intercept external websites.
     */

    if (url.origin !== self.location.origin) {
        return;
    }

    /*
     * Never intercept the service worker itself.
     */

    if (url.pathname.endsWith("/sw.js")) {
        return;
    }

    /*
     * Ensure the request belongs to this website.
     */

    if (!url.pathname.startsWith(BASE_PATH)) {
        return;
    }

    /*
     * Let audio range requests pass directly to the browser.
     */

    if (request.headers.has("range")) {
        return;
    }

    /*
     * Audio files should not be cached automatically.
     */

    if (
        request.destination === "audio" ||
        /\.(mp3|wav|ogg|m4a|aac|flac)$/i.test(
            url.pathname
        )
    ) {
        event.respondWith(fetch(request));
        return;
    }

    /*
     * HTML navigation uses network-first.
     */

    if (
        request.mode === "navigate" ||
        request.destination === "document" ||
        /\.html$/i.test(url.pathname) ||
        url.pathname === BASE_PATH
    ) {
        event.respondWith(networkFirstPage(request));
        return;
    }

    /*
     * Images use stale-while-revalidate.
     */

    if (
        request.destination === "image" ||
        /\.(png|jpe?g|gif|webp|svg|ico|avif)$/i.test(
            url.pathname
        )
    ) {
        event.respondWith(
            staleWhileRevalidate(
                request,
                IMAGE_CACHE
            )
        );

        return;
    }

    /*
     * CSS, JavaScript and fonts use stale-while-revalidate.
     */

    if (
        request.destination === "script" ||
        request.destination === "style" ||
        request.destination === "font" ||
        /\.(css|js|woff2?|ttf|otf)$/i.test(
            url.pathname
        )
    ) {
        event.respondWith(
            staleWhileRevalidate(
                request,
                STATIC_CACHE
            )
        );

        return;
    }

    /*
     * JSON and manifest files use network-first.
     */

    if (
        /\.json$/i.test(url.pathname) ||
        url.pathname.endsWith("/manifest.json")
    ) {
        event.respondWith(networkFirstData(request));
        return;
    }

    /*
     * Other same-origin resources.
     */

    event.respondWith(
        staleWhileRevalidate(
            request,
            STATIC_CACHE
        )
    );
});


/* ============================================================
   11. NETWORK-FIRST PAGE HANDLING
   ============================================================

   ONLINE:
   Return the latest HTML from the server.

   OFFLINE:
   Return a previously cached version where available.
   ============================================================ */

async function networkFirstPage(request) {
    const cache = await caches.open(PAGE_CACHE);

    try {
        const response = await fetch(
            new Request(request, {
                cache: "no-store"
            })
        );

        if (response.ok) {
            await cache.put(
                request,
                response.clone()
            );

            /*
             * Keep the clean URL available for offline use.
             */

            const cleanURL = new URL(request.url);

            cleanURL.search = "";
            cleanURL.hash = "";

            await cache.put(
                cleanURL.href,
                response.clone()
            );

            return response;
        }

        throw new Error(
            `HTTP ${response.status}`
        );
    } catch (error) {
        console.warn(
            "[IMOLE SW] Network unavailable:",
            request.url
        );

        /*
         * First: exact URL.
         */

        const exactMatch = await cache.match(request);

        if (exactMatch) {
            return exactMatch;
        }

        /*
         * Second: URL without query parameters.
         */

        const cleanURL = new URL(request.url);

        cleanURL.search = "";
        cleanURL.hash = "";

        const cleanMatch = await cache.match(
            cleanURL.href
        );

        if (cleanMatch) {
            return cleanMatch;
        }

        /*
         * Third: previously precached page.
         */

        const staticCache = await caches.open(
            STATIC_CACHE
        );

        const staticMatch = await staticCache.match(
            cleanURL.href
        );

        if (staticMatch) {
            return staticMatch;
        }

        /*
         * Fourth: homepage fallback.
         */

        const indexURL = new URL(
            "./index.html",
            SW_SCOPE
        ).href;

        const homepage =
            await cache.match(indexURL) ||
            await staticCache.match(indexURL);

        if (homepage) {
            return homepage;
        }

        /*
         * Final fallback: offline information page.
         */

        return offlineResponse();
    }
}


/* ============================================================
   12. STALE-WHILE-REVALIDATE
   ============================================================ */

async function staleWhileRevalidate(
    request,
    cacheName
) {
    const cache = await caches.open(cacheName);

    const cachedResponse = await cache.match(request);

    const networkPromise = fetch(
        new Request(request, {
            cache: "no-store"
        })
    )
        .then(async response => {
            if (
                response &&
                response.ok &&
                response.type !== "opaque"
            ) {
                await cache.put(
                    request,
                    response.clone()
                );
            }

            return response;
        })
        .catch(() => null);

    /*
     * Return cached resources immediately for speed.
     * A successful network response refreshes the cache.
     */

    if (cachedResponse) {
        eventWaitUntilSafe(networkPromise);
        return cachedResponse;
    }

    const networkResponse = await networkPromise;

    if (networkResponse) {
        return networkResponse;
    }

    return new Response("", {
        status: 503,
        statusText: "Resource unavailable offline"
    });
}


/*
 * Safely allow background cache updates to complete.
 */

function eventWaitUntilSafe(promise) {
    promise.catch(error => {
        console.warn(
            "[IMOLE SW] Background update failed:",
            error
        );
    });
}


/* ============================================================
   13. NETWORK-FIRST DATA
   ============================================================ */

async function networkFirstData(request) {
    const cache = await caches.open(DATA_CACHE);

    try {
        const response = await fetch(
            new Request(request, {
                cache: "no-store"
            })
        );

        if (response.ok) {
            await cache.put(
                request,
                response.clone()
            );

            return response;
        }

        throw new Error(
            `HTTP ${response.status}`
        );
    } catch (error) {
        const cached = await cache.match(request);

        if (cached) {
            return cached;
        }

        const staticCache = await caches.open(
            STATIC_CACHE
        );

        const staticCached = await staticCache.match(
            request
        );

        if (staticCached) {
            return staticCached;
        }

        return new Response("", {
            status: 503,
            statusText: "Data unavailable offline"
        });
    }
}


/* ============================================================
   14. OFFLINE FALLBACK PAGE
   ============================================================ */

function offlineResponse() {
    const html = `<!DOCTYPE html>
<html lang="en-NG">
<head>
<meta charset="UTF-8">
<meta name="viewport"
      content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="#063b2d">
<meta name="color-scheme" content="light">
<title>IMOLE 2027 | Offline</title>
<style>
*{box-sizing:border-box}
body{
    margin:0;
    min-height:100vh;
    display:flex;
    align-items:center;
    justify-content:center;
    padding:24px;
    font-family:Arial,Helvetica,sans-serif;
    background:linear-gradient(135deg,#063b2d,#0b5d45);
    color:#fff;
    text-align:center
}
.card{
    width:100%;
    max-width:460px;
    padding:32px 24px;
    border-radius:24px;
    background:rgba(255,255,255,.10);
    border:1px solid rgba(255,255,255,.2)
}
.logo{
    width:82px;
    height:82px;
    margin:0 auto 20px;
    display:flex;
    align-items:center;
    justify-content:center;
    border-radius:50%;
    background:#fff;
    color:#063b2d;
    font-size:42px;
    font-weight:900
}
h1{margin:0 0 12px;font-size:28px}
p{line-height:1.7}
button{
    padding:14px 24px;
    border:0;
    border-radius:40px;
    background:#fff;
    color:#063b2d;
    font-weight:800;
    font-size:16px
}
.small{font-size:13px;opacity:.8}
</style>
</head>
<body>
<main class="card">
<div class="logo">I</div>
<h1>IMOLE 2027</h1>
<p><strong>Service • Development • Accountability</strong></p>
<p>You are currently offline.</p>
<p>Reconnect to the internet and try again to access the latest campaign information.</p>
<button onclick="location.reload()">Try Again</button>
<p class="small">
Hon. Nurudeen Abayomi Sadeeq<br>
Lagos State House of Assembly<br>
Ojo Constituency II<br>
Nigeria Democratic Congress (NDC)
</p>
</main>
</body>
</html>`;

    return new Response(html, {
        status: 503,
        headers: {
            "Content-Type": "text/html; charset=UTF-8",
            "Cache-Control": "no-store"
        }
    });
}


/* ============================================================
   15. DIAGNOSTIC LOG
   ============================================================ */

console.log(
    `[IMOLE SW] Version ${SW_VERSION} is running.`
);
