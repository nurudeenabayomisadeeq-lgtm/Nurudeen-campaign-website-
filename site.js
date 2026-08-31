/* =========================================================
   IMOLE 2027 - SITE.JS
   GitHub Pages / Static Website Version
   Cache-safe navigation and service-worker cleanup
   ========================================================= */

(function () {
    "use strict";

    const CURRENT_VERSION = "imole-2027-v8";

    /* ---------------------------------------------------------
       1. Remove old cached website versions
       --------------------------------------------------------- */
    async function clearOldCaches() {
        if (!("caches" in window)) return;

        try {
            const cacheNames = await caches.keys();

            await Promise.all(
                cacheNames
                    .filter(name => name !== CURRENT_VERSION)
                    .map(name => caches.delete(name))
            );
        } catch (error) {
            console.warn("Cache cleanup failed:", error);
        }
    }


    /* ---------------------------------------------------------
       2. Remove old service workers
       --------------------------------------------------------- */
    async function removeOldServiceWorkers() {
        if (!("serviceWorker" in navigator)) return;

        try {
            const registrations =
                await navigator.serviceWorker.getRegistrations();

            for (const registration of registrations) {
                /*
                 * Do not immediately unregister the newly installed
                 * service worker if it belongs to the current version.
                 */
                const scriptURL =
                    registration.active?.scriptURL ||
                    registration.waiting?.scriptURL ||
                    registration.installing?.scriptURL ||
                    "";

                if (!scriptURL.includes("service-worker.js")) {
                    continue;
                }

                /*
                 * The new service worker will take control itself.
                 * Old registrations are removed if they are not
                 * the current controller.
                 */
                if (
                    navigator.serviceWorker.controller &&
                    navigator.serviceWorker.controller.scriptURL !== scriptURL
                ) {
                    await registration.unregister();
                }
            }
        } catch (error) {
            console.warn("Service worker cleanup failed:", error);
        }
    }


    /* ---------------------------------------------------------
       3. Register the CURRENT service worker
       --------------------------------------------------------- */
    async function registerCurrentServiceWorker() {
        if (!("serviceWorker" in navigator)) return;

        try {
            const registration =
                await navigator.serviceWorker.register(
                    "./service-worker.js?v=8",
                    {
                        scope: "./"
                    }
                );

            console.log(
                "IMOLE 2027 Service Worker registered:",
                registration.scope
            );

            /*
             * Ask an updated service worker to activate immediately.
             */
            if (registration.waiting) {
                registration.waiting.postMessage({
                    type: "SKIP_WAITING"
                });
            }

            registration.addEventListener("updatefound", function () {
                const newWorker = registration.installing;

                if (!newWorker) return;

                newWorker.addEventListener("statechange", function () {
                    if (
                        newWorker.state === "installed" &&
                        navigator.serviceWorker.controller
                    ) {
                        newWorker.postMessage({
                            type: "SKIP_WAITING"
                        });
                    }
                });
            });

        } catch (error) {
            console.warn(
                "Current service worker could not be registered:",
                error
            );
        }
    }


    /* ---------------------------------------------------------
       4. GitHub Pages-safe URL helper
       --------------------------------------------------------- */

    function getSiteBase() {
        /*
         * GitHub Pages can host either:
         *
         * https://username.github.io/
         *
         * OR
         *
         * https://username.github.io/repository-name/
         *
         * This detects the current base automatically.
         */

        const path = window.location.pathname;

        /*
         * If index.html is directly visible, remove it.
         */
        if (path.endsWith("/index.html")) {
            return path.substring(
                0,
                path.lastIndexOf("/") + 1
            );
        }

        /*
         * If another HTML file is being displayed,
         * use its directory.
         */
        if (path.endsWith(".html")) {
            return path.substring(
                0,
                path.lastIndexOf("/") + 1
            );
        }

        /*
         * Normal directory URL.
         */
        return path.endsWith("/")
            ? path
            : path + "/";
    }


    /* ---------------------------------------------------------
       5. Fix Home navigation
       --------------------------------------------------------- */

    function fixHomeLinks() {
        const links = document.querySelectorAll(
            'a[href="index.html"], ' +
            'a[href="./index.html"], ' +
            'a[href="/index.html"], ' +
            'a[href="/"], ' +
            'a[href="#home"], ' +
            'a[data-home]'
        );

        links.forEach(function (link) {

            /*
             * Remove old onclick handlers that may redirect
             * visitors to an obsolete page.
             */
            link.removeAttribute("onclick");

            link.addEventListener("click", function (event) {
                event.preventDefault();

                const base = getSiteBase();

                /*
                 * Always go directly to the CURRENT index.html.
                 */
                const homeURL =
                    window.location.origin +
                    base +
                    "index.html?v=" +
                    Date.now();

                window.location.replace(homeURL);
            });
        });
    }


    /* ---------------------------------------------------------
       6. Fix normal internal HTML links
       --------------------------------------------------------- */

    function fixInternalLinks() {

        const links = document.querySelectorAll(
            'a[href$=".html"], a[href^="./"], a[href^="/"]'
        );

        links.forEach(function (link) {

            const href = link.getAttribute("href");

            if (!href) return;

            /*
             * Ignore:
             * external URLs
             * WhatsApp
             * Facebook
             * telephone
             * mail
             * anchors
             */
            if (
                href.startsWith("http://") ||
                href.startsWith("https://") ||
                href.startsWith("mailto:") ||
                href.startsWith("tel:") ||
                href.startsWith("javascript:") ||
                href.startsWith("#")
            ) {
                return;
            }

            /*
             * Home is handled separately.
             */
            if (
                href === "index.html" ||
                href === "./index.html" ||
                href === "/index.html" ||
                href === "/"
            ) {
                return;
            }

            /*
             * Do not interfere with assets.
             */
            if (
                href.startsWith("assets/") ||
                href.startsWith("./assets/")
            ) {
                return;
            }

            /*
             * Keep GitHub Pages repository paths intact.
             */
            if (href.endsWith(".html")) {

                link.addEventListener("click", function () {

                    const base = getSiteBase();

                    const filename =
                        href
                            .replace("./", "")
                            .replace(/^\//, "");

                    /*
                     * Add cache-busting query.
                     */
                    const destination =
                        base +
                        filename +
                        "?v=" +
                        Date.now();

                    link.href = destination;
                });
            }
        });
    }


    /* ---------------------------------------------------------
       7. Prevent browser from restoring an old page
       --------------------------------------------------------- */

    window.addEventListener("pageshow", function () {

        /*
         * If the browser restored an old bfcache version,
         * force a fresh reload.
         */
        if (performance.getEntriesByType) {

            const navigation =
                performance.getEntriesByType("navigation")[0];

            if (
                navigation &&
                navigation.type === "back_forward"
            ) {
                /*
                 * Do not create an endless reload loop.
                 */
                if (!sessionStorage.getItem("imole_bfcache_fixed")) {

                    sessionStorage.setItem(
                        "imole_bfcache_fixed",
                        "yes"
                    );

                    window.location.reload();
                }
            }
        }
    });


    /* ---------------------------------------------------------
       8. Clear the temporary bfcache flag
       --------------------------------------------------------- */

    window.addEventListener("load", function () {

        setTimeout(function () {

            try {
                sessionStorage.removeItem(
                    "imole_bfcache_fixed"
                );
            } catch (error) {}

        }, 3000);
    });


    /* ---------------------------------------------------------
       9. Start everything
       --------------------------------------------------------- */

    document.addEventListener("DOMContentLoaded", function () {

        fixHomeLinks();
        fixInternalLinks();

        clearOldCaches();
        removeOldServiceWorkers();

        /*
         * Register the new service worker AFTER cleanup.
         */
        setTimeout(function () {
            registerCurrentServiceWorker();
        }, 500);
    });

})();
