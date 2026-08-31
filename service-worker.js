/* =========================================================
   IMOLE 2027 - SERVICE WORKER
   GitHub Pages Safe Version
   Version: 8
   ========================================================= */

const CACHE_NAME = "imole-2027-v8";

/*
 * IMPORTANT:
 * Keep the list conservative.
 *
 * The service worker should NOT permanently cache index.html
 * or other HTML pages. This prevents the old Home page from
 * returning after you update GitHub.
 */

const STATIC_FILES = [
    "./",
    "./index.html",
    "./manifest.json"
];


/* ---------------------------------------------------------
   INSTALL
   --------------------------------------------------------- */

self.addEventListener("install", function (event) {

    console.log(
        "IMOLE 2027 Service Worker installing:",
        CACHE_NAME
    );

    /*
     * Activate the new version immediately.
     */
    self.skipWaiting();

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {

                /*
                 * Only cache files that actually exist.
                 */
                return Promise.all(
                    STATIC_FILES.map(function (file) {

                        return fetch(
                            file + "?sw=" + Date.now(),
                            {
                                cache: "no-store"
                            }
                        )
                            .then(function (response) {

                                if (!response.ok) {
                                    throw new Error(
                                        "Failed to cache: " + file
                                    );
                                }

                                return cache.put(
                                    file,
                                    response
                                );
                            })
                            .catch(function (error) {

                                console.warn(
                                    "Skipping cache:",
                                    file,
                                    error
                                );

                            });

                    })
                );

            })
    );
});


/* ---------------------------------------------------------
   ACTIVATE
   --------------------------------------------------------- */

self.addEventListener("activate", function (event) {

    console.log(
        "IMOLE 2027 Service Worker activated:",
        CACHE_NAME
    );

    event.waitUntil(

        Promise.all([

            /*
             * Delete every old cache.
             */
            caches.keys().then(function (cacheNames) {

                return Promise.all(

                    cacheNames
                        .filter(function (cacheName) {

                            return cacheName !== CACHE_NAME;

                        })
                        .map(function (cacheName) {

                            console.log(
                                "Deleting old cache:",
                                cacheName
                            );

                            return caches.delete(
                                cacheName
                            );

                        })
                );

            }),

            /*
             * Take control of currently open pages.
             */
            self.clients.claim()

        ])
    );
});


/* ---------------------------------------------------------
   MESSAGE
   --------------------------------------------------------- */

self.addEventListener("message", function (event) {

    if (!event.data) return;

    if (event.data.type === "SKIP_WAITING") {

        self.skipWaiting();

    }

    if (event.data.type === "CLEAR_CACHE") {

        event.waitUntil(

            caches.keys().then(function (cacheNames) {

                return Promise.all(
                    cacheNames.map(function (cacheName) {

                        return caches.delete(
                            cacheName
                        );

                    })
                );

            })
        );
    }

});


/* ---------------------------------------------------------
   FETCH
   --------------------------------------------------------- */

self.addEventListener("fetch", function (event) {

    const request = event.request;

    /*
     * Only handle GET requests.
     */
    if (request.method !== "GET") {
        return;
    }

    const url = new URL(request.url);

    /*
     * Only handle requests belonging to this website.
     */
    if (url.origin !== self.location.origin) {
        return;
    }


    /*
     * -------------------------------------------------------
     * HTML DOCUMENTS
     * -------------------------------------------------------
     *
     * ALWAYS go to the network first.
     *
     * This is the important fix.
     *
     * It prevents an old cached index.html from appearing
     * when the visitor clicks Home.
     */
    if (
        request.mode === "navigate" ||
        request.destination === "document"
    ) {

        event.respondWith(

            fetch(
                new Request(request.url, {
                    method: "GET",
                    headers: request.headers,
                    mode: "same-origin",
                    credentials: "same-origin",
                    redirect: "follow",
                    cache: "no-store"
                })
            )
                .then(function (response) {

                    /*
                     * Do NOT cache HTML pages.
                     */
                    return response;

                })
                .catch(function () {

                    /*
                     * If the network is unavailable,
                     * try the current cached index.
                     */
                    return caches.match(
                        "./index.html"
                    );

                })
        );

        return;
    }


    /*
     * -------------------------------------------------------
     * ASSETS
     * -------------------------------------------------------
     *
     * CSS, JS, images and fonts use:
     *
     * Network first
     * ↓
     * Cache fallback
     *
     * This allows updated files to appear immediately.
     */
    event.respondWith(

        fetch(
            new Request(request, {
                cache: "no-store"
            })
        )
            .then(function (response) {

                /*
                 * Save a fresh copy of successful assets.
                 */
                if (response.ok) {

                    const responseClone =
                        response.clone();

                    caches.open(CACHE_NAME)
                        .then(function (cache) {

                            cache.put(
                                request,
                                responseClone
                            );

                        });
                }

                return response;

            })
            .catch(function () {

                return caches.match(request);

            })
    );

});
