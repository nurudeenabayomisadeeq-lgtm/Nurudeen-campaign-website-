/* ============================================================
   IMOLE 2027 — SERVICE WORKER
   Hon. Nurudeen Abayomi Sadeeq
   Ojo Constituency II, Lagos State
   Nigeria Democratic Congress (NDC)

   VERSION: 2026-10-15-02

   Features:
   - Network-first HTML navigation
   - Offline homepage fallback
   - Automatic cleanup of old IMOLE caches
   - Updated cache version
   - GitHub Pages subdirectory compatibility
   - Cache-first static assets with background updates
   - Audio and range-request compatibility
   ============================================================ */

"use strict";

/* 1. VERSION AND CACHE NAMES */

const SW_VERSION = "2026-10-15-02";
const CACHE_PREFIX = "imole-";

const STATIC_CACHE = `${CACHE_PREFIX}static-${SW_VERSION}`;
const PAGE_CACHE = `${CACHE_PREFIX}pages-${SW_VERSION}`;
const IMAGE_CACHE = `${CACHE_PREFIX}images-${SW_VERSION}`;
const DATA_CACHE = `${CACHE_PREFIX}data-${SW_VERSION}`;

/* 2. WEBSITE PATH */

const SW_SCOPE = self.registration.scope;
const BASE_URL = new URL("./", SW_SCOPE);
const BASE_PATH = BASE_URL.pathname;

/* 3. CORE FILES */

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

/* 4. OPTIONAL IMAGES */

const OPTIONAL_ASSETS = [
  "./assets/icon-192.png",
  "./assets/Hon Nurudeen Abayomi Sadeeq.jpg",
  "./assets/IMG-20260728-WA0032.jpg",
  "./assets/Hon Seyi Sowunmi.jpg",
  "./assets/Mr Peter Obi.jpg",
  "./assets/Funsho Doherty.jpg",
  "./assets/Hon Moshood Salvador.jpg"
];

/* 5. INSTALL */

self.addEventListener("install", event => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(STATIC_CACHE);

      await Promise.all(
        CORE_FILES.map(async file => {
          const url = new URL(file, SW_SCOPE).href;

          try {
            const response = await fetch(
              new Request(url, {
                cache: "no-store"
              })
            );

            if (response.ok && response.type !== "opaque") {
              await cache.put(url, response);
            }
          } catch (error) {
            console.warn(
              "[IMOLE SW] Could not precache page:",
              file
            );
          }
        })
      );

      await Promise.all(
        OPTIONAL_ASSETS.map(async file => {
          const url = new URL(file, SW_SCOPE).href;

          try {
            const response = await fetch(
              new Request(url, {
                cache: "no-store"
              })
            );

            if (response.ok && response.type !== "opaque") {
              await cache.put(url, response);
            }
          } catch (error) {
            console.warn(
              "[IMOLE SW] Optional asset unavailable:",
              file
            );
          }
        })
      );

      await self.skipWaiting();
    })()
  );
});

/* 6. ACTIVATE AND CLEAN OLD CACHES */

self.addEventListener("activate", event => {
  event.waitUntil(
    (async () => {
      const cacheNames = await caches.keys();

      await Promise.all(
        cacheNames.map(async name => {
          if (
            name.startsWith(CACHE_PREFIX) &&
            ![
              STATIC_CACHE,
              PAGE_CACHE,
              IMAGE_CACHE,
              DATA_CACHE
            ].includes(name)
          ) {
            await caches.delete(name);
          }
        })
      );

      await self.clients.claim();
    })()
  );
});

/* 7. UPDATE MESSAGE SUPPORT */

self.addEventListener("message", event => {
  const data = event.data;

  if (!data || !data.type) {
    return;
  }

  if (data.type === "SKIP_WAITING") {
    event.waitUntil(self.skipWaiting());
  }

  if (data.type === "CLEAR_IMOLE_CACHES") {
    event.waitUntil(
      (async () => {
        const cacheNames = await caches.keys();

        await Promise.all(
          cacheNames
            .filter(name => name.startsWith(CACHE_PREFIX))
            .map(name => caches.delete(name))
        );
      })()
    );
  }
});

/* 8. FETCH HANDLER */

self.addEventListener("fetch", event => {
  const request = event.request;

  if (request.method !== "GET") {
    return;
  }

  const url = new URL(request.url);

  // Leave external websites untouched.
  if (url.origin !== self.location.origin) {
    return;
  }

  // Do not intercept service-worker requests.
  if (url.pathname.endsWith("/sw.js")) {
    return;
  }

  // Do not intercept requests outside this GitHub Pages site.
  if (!url.pathname.startsWith(BASE_PATH)) {
    return;
  }

  // Let media range requests pass through normally.
  if (request.headers.has("range")) {
    return;
  }

  // Do not cache campaign audio files.
  if (
    request.destination === "audio" ||
    /\.(mp3|wav|ogg|m4a|aac|flac)$/i.test(url.pathname)
  ) {
    event.respondWith(fetch(request));
    return;
  }

  // HTML navigation: always try the network first.
  if (
    request.mode === "navigate" ||
    request.destination === "document" ||
    /\.html$/i.test(url.pathname) ||
    url.pathname === BASE_PATH
  ) {
    event.respondWith(networkFirstPage(request));
    return;
  }

  // Images: use cached images immediately and refresh in background.
  if (
    request.destination === "image" ||
    /\.(png|jpe?g|gif|webp|svg|ico|avif)$/i.test(url.pathname)
  ) {
    event.respondWith(
      staleWhileRevalidate(request, IMAGE_CACHE, event)
    );
    return;
  }

  // CSS, JavaScript and fonts.
  if (
    request.destination === "script" ||
    request.destination === "style" ||
    request.destination === "font" ||
    /\.(css|js|woff2?|ttf|otf)$/i.test(url.pathname)
  ) {
    event.respondWith(
      staleWhileRevalidate(request, STATIC_CACHE, event)
    );
    return;
  }

  // JSON and manifest files.
  if (
    /\.json$/i.test(url.pathname) ||
    url.pathname.endsWith("/manifest.json")
  ) {
    event.respondWith(networkFirstData(request));
    return;
  }

  event.respondWith(
    staleWhileRevalidate(request, STATIC_CACHE, event)
  );
});

/* 9. NETWORK-FIRST HTML */

async function networkFirstPage(request) {
  const cache = await caches.open(PAGE_CACHE);

  try {
    const response = await fetch(
      new Request(request, {
        cache: "no-store"
      })
    );

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    // Cache only successful HTML responses.
    await cache.put(request, response.clone());

    const cleanURL = new URL(request.url);
    cleanURL.search = "";
    cleanURL.hash = "";

    await cache.put(cleanURL.href, response.clone());

    return response;
  } catch (error) {
    const exactMatch = await cache.match(request);

    if (exactMatch) {
      return exactMatch;
    }

    const cleanURL = new URL(request.url);
    cleanURL.search = "";
    cleanURL.hash = "";

    const cleanMatch = await cache.match(cleanURL.href);

    if (cleanMatch) {
      return cleanMatch;
    }

    const staticCache = await caches.open(STATIC_CACHE);

    const staticMatch = await staticCache.match(cleanURL.href);

    if (staticMatch) {
      return staticMatch;
    }

    const indexURL = new URL("./index.html", SW_SCOPE).href;

    const homepage =
      await cache.match(indexURL) ||
      await staticCache.match(indexURL);

    if (homepage) {
      return homepage;
    }

    return offlineResponse();
  }
}

/* 10. STALE-WHILE-REVALIDATE */

async function staleWhileRevalidate(
  request,
  cacheName,
  event
) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);

  const networkPromise = fetch(
    new Request(request, {
      cache: "no-store"
    })
  )
    .then(async response => {
      if (response.ok && response.type !== "opaque") {
        await cache.put(request, response.clone());
      }

      return response;
    })
    .catch(() => null);

  if (cachedResponse) {
    event.waitUntil(networkPromise.catch(() => {}));
    return cachedResponse;
  }

  const networkResponse = await networkPromise;

  if (networkResponse) {
    return networkResponse;
  }

  return new Response("Resource unavailable offline.", {
    status: 503,
    headers: {
      "Content-Type": "text/plain; charset=UTF-8"
    }
  });
}

/* 11. NETWORK-FIRST DATA */

async function networkFirstData(request) {
  const cache = await caches.open(DATA_CACHE);

  try {
    const response = await fetch(
      new Request(request, {
        cache: "no-store"
      })
    );

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    await cache.put(request, response.clone());

    return response;
  } catch (error) {
    const cached = await cache.match(request);

    if (cached) {
      return cached;
    }

    const staticCache = await caches.open(STATIC_CACHE);
    const staticCached = await staticCache.match(request);

    if (staticCached) {
      return staticCached;
    }

    return new Response("Information unavailable offline.", {
      status: 503,
      headers: {
        "Content-Type": "text/plain; charset=UTF-8"
      }
    });
  }
}

/* 12. OFFLINE FALLBACK */

function offlineResponse() {
  const html = `<!DOCTYPE html>
<html lang="en-NG">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="theme-color" content="#063b2d">
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
  width:76px;
  height:76px;
  margin:0 auto 20px;
  display:grid;
  place-items:center;
  border-radius:50%;
  background:#fff;
  color:#063b2d;
  font-size:40px;
  font-weight:900
}
h1{margin:0 0 12px}
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
.small{font-size:13px;opacity:.85}
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

/* 13. DIAGNOSTIC MESSAGE */

console.log(
  `[IMOLE SW] Service worker version ${SW_VERSION} is running.`
);
