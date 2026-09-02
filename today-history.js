/* =========================================================
   IMOLE 2027
   TODAY IN HISTORY + ON THIS DAY IN NIGERIA
   Automatic Wikimedia/Wikipedia History System
   ========================================================= */

(function () {
    "use strict";

    /* -------------------------------------------------------
       CONFIGURATION
    ------------------------------------------------------- */

    const WIKIMEDIA_BASE =
        "https://en.wikipedia.org/api/rest_v1/feed/onthisday";

    const CACHE_PREFIX = "imole_history_";

    const CACHE_TIME = 6 * 60 * 60 * 1000; // 6 hours

    const LIMITS = {
        worldEvents: 9,
        worldBirths: 6,
        worldDeaths: 6,
        nigeria: 9
    };

    /* -------------------------------------------------------
       DATE
    ------------------------------------------------------- */

    function getToday() {
        const now = new Date();

        return {
            month: String(now.getMonth() + 1).padStart(2, "0"),
            day: String(now.getDate()).padStart(2, "0"),
            year: now.getFullYear()
        };
    }

    function getFormattedDate() {
        const now = new Date();

        return new Intl.DateTimeFormat("en-NG", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        }).format(now);
    }

    /* -------------------------------------------------------
       SAFE HTML
    ------------------------------------------------------- */

    function escapeHTML(value) {
        if (value === null || value === undefined) {
            return "";
        }

        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    /* -------------------------------------------------------
       WIKIPEDIA PAGE DATA
    ------------------------------------------------------- */

    function getPage(item) {
        try {
            if (!item || !item.pages || !item.pages.length) {
                return null;
            }

            const page = item.pages[0];

            let url = "";

            if (page.content_urls &&
                page.content_urls.desktop &&
                page.content_urls.desktop.page) {

                url = page.content_urls.desktop.page;

            } else if (page.content_urls &&
                       page.content_urls.mobile &&
                       page.content_urls.mobile.page) {

                url = page.content_urls.mobile.page;
            }

            let image = "";

            if (page.thumbnail &&
                page.thumbnail.source) {

                image = page.thumbnail.source;

            } else if (page.originalimage &&
                       page.originalimage.source) {

                image = page.originalimage.source;
            }

            return {
                title: page.normalizedtitle ||
                       page.title ||
                       "Wikipedia Article",

                description:
                    page.description ||
                    page.extract ||
                    "",

                url: url,

                image: image
            };

        } catch (error) {
            console.warn("Wikipedia page parsing error:", error);
            return null;
        }
    }

    /* -------------------------------------------------------
       CREATE HISTORY CARD
    ------------------------------------------------------- */

    function createCard(item, type) {

        const page = getPage(item);

        const year =
            item.year ||
            "";

        const text =
            item.text ||
            item.description ||
            "";

        const description =
            item.pages &&
            item.pages[0] &&
            (item.pages[0].description ||
             item.pages[0].extract) ||
            "";

        const safeYear = escapeHTML(year);
        const safeText = escapeHTML(text);
        const safeDescription = escapeHTML(description);

        let imageHTML = "";

        if (page && page.image) {

            imageHTML = `
                <div class="history-image-wrap">
                    <img
                        src="${escapeHTML(page.image)}"
                        alt="${escapeHTML(page.title)}"
                        class="history-image"
                        loading="lazy"
                        onerror="this.parentElement.style.display='none';"
                    >
                </div>
            `;
        }

        let icon = "📜";

        if (type === "birth") {
            icon = "🎂";
        }

        if (type === "death") {
            icon = "🕊️";
        }

        if (type === "nigeria") {
            icon = "🇳🇬";
        }

        return `
            <article class="history-card">

                ${imageHTML}

                <div class="history-content">

                    <div class="history-year">
                        <span>${icon}</span>
                        ${safeYear}
                    </div>

                    <h3>
                        ${safeText}
                    </h3>

                    ${
                        safeDescription
                            ? `<p>${safeDescription}</p>`
                            : ""
                    }

                    ${
                        page && page.url
                            ? `
                                <a
                                    href="${escapeHTML(page.url)}"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="history-link"
                                >
                                    Read More →
                                </a>
                              `
                            : ""
                    }

                </div>

            </article>
        `;
    }

    /* -------------------------------------------------------
       RENDER CARDS
    ------------------------------------------------------- */

    function renderCards(
        containerId,
        statusId,
        items,
        type,
        limit
    ) {

        const container =
            document.getElementById(containerId);

        const status =
            document.getElementById(statusId);

        if (!container) {
            return;
        }

        if (!items || !Array.isArray(items) || !items.length) {

            container.innerHTML = `
                <div class="history-empty">
                    <span>📚</span>
                    <p>
                        No notable entries were found for this
                        category today.
                    </p>
                </div>
            `;

            if (status) {
                status.textContent = "";
            }

            return;
        }

        const selected =
            items.slice(0, limit);

        container.innerHTML =
            selected
                .map(item => createCard(item, type))
                .join("");

        if (status) {
            status.textContent =
                `${selected.length} historical entries`;
        }
    }

    /* -------------------------------------------------------
       NIGERIA DETECTION
    ------------------------------------------------------- */

    const NIGERIA_KEYWORDS = [

        "nigeria",
        "nigerian",
        "lagos",
        "abuja",
        "ibadan",
        "kano",
        "kaduna",
        "enugu",
        "benin city",
        "benin",
        "calabar",
        "port harcourt",
        "port harcourt",
        "jos",
        "ilorin",
        "abeokuta",
        "akure",
        "ondo",
        "osogbo",
        "oyo",
        "ogun",
        "kwara",
        "rivers state",
        "bayelsa",
        "delta state",
        "edo state",
        "anambra",
        "imo state",
        "abia",
        "cross river",
        "akwa ibom",
        "ekiti",
        "osun",
        "kogi",
        "nasarawa",
        "plateau state",
        "borno",
        "sokoto",
        "zamfara",
        "katsina",
        "jigawa",
        "yobe",
        "adamawa",
        "gombe",
        "bauchi",
        "taraba",
        "benue",
        "niger state",
        "federal republic of nigeria",
        "republic of biafra",
        "biafra",
        "first republic of nigeria",
        "second republic of nigeria",
        "third republic of nigeria",
        "fourth republic of nigeria",
        "colonial nigeria",
        "british nigeria",
        "nigerian civil war",
        "lagos colony",
        "northern nigeria",
        "southern nigeria",
        "western nigeria",
        "eastern nigeria",
        "sokoto caliphate",
        "oyo empire",
        "benin empire",
        "kanem bornu",
        "nupe",
        "hausa",
        "yoruba",
        "igbo",
        "fulani",
        "ijaw",
        "efik",
        "edo people",
        "urhobo",
        "isoko"
    ];

    function isNigeriaRelated(item) {

        try {

            const page =
                item &&
                item.pages &&
                item.pages[0]
                    ? item.pages[0]
                    : {};

            const combined = [

                item && item.text,
                item && item.description,
                page.title,
                page.normalizedtitle,
                page.description,
                page.extract

            ]
                .filter(Boolean)
                .join(" ")
                .toLowerCase();

            return NIGERIA_KEYWORDS.some(keyword =>
                combined.includes(keyword)
            );

        } catch (error) {

            return false;
        }
    }

    /* -------------------------------------------------------
       SORT NIGERIAN ITEMS
    ------------------------------------------------------- */

    function getNigeriaHistory(data) {

        let results = [];

        const categories = [
            data.events || [],
            data.births || [],
            data.deaths || []
        ];

        categories.forEach(category => {

            category.forEach(item => {

                if (isNigeriaRelated(item)) {

                    results.push(item);
                }
            });
        });

        /* Remove duplicate titles/text */

        const seen = new Set();

        results = results.filter(item => {

            const key =
                `${item.year || ""}-${item.text || ""}`;

            if (seen.has(key)) {
                return false;
            }

            seen.add(key);

            return true;
        });

        /* Sort newest historical years first */

        results.sort((a, b) => {

            const yearA =
                Number(a.year) || 0;

            const yearB =
                Number(b.year) || 0;

            return yearB - yearA;
        });

        return results;
    }

    /* -------------------------------------------------------
       CACHE
    ------------------------------------------------------- */

    function getCache(key) {

        try {

            const raw =
                sessionStorage.getItem(
                    CACHE_PREFIX + key
                );

            if (!raw) {
                return null;
            }

            const parsed =
                JSON.parse(raw);

            if (!parsed.timestamp ||
                !parsed.data) {

                return null;
            }

            const age =
                Date.now() - parsed.timestamp;

            if (age > CACHE_TIME) {

                sessionStorage.removeItem(
                    CACHE_PREFIX + key
                );

                return null;
            }

            return parsed.data;

        } catch (error) {

            return null;
        }
    }

    function saveCache(key, data) {

        try {

            sessionStorage.setItem(
                CACHE_PREFIX + key,
                JSON.stringify({
                    timestamp: Date.now(),
                    data: data
                })
            );

        } catch (error) {

            console.warn(
                "History cache unavailable."
            );
        }
    }

    /* -------------------------------------------------------
       FETCH WIKIMEDIA
    ------------------------------------------------------- */

    async function fetchHistory() {

        const today =
            getToday();

        const cacheKey =
            `${today.year}_${today.month}_${today.day}`;

        const cached =
            getCache(cacheKey);

        if (cached) {

            console.log(
                "IMOLE History: using cached data."
            );

            return cached;
        }

        const url =
            `${WIKIMEDIA_BASE}/all/${today.month}/${today.day}`;

        try {

            const response =
                await fetch(url, {
                    method: "GET",
                    headers: {
                        "Accept":
                            "application/json"
                    }
                });

            if (!response.ok) {

                throw new Error(
                    `HTTP ${response.status}`
                );
            }

            const data =
                await response.json();

            saveCache(
                cacheKey,
                data
            );

            return data;

        } catch (error) {

            console.error(
                "Wikimedia history request failed:",
                error
            );

            throw error;
        }
    }

    /* -------------------------------------------------------
       UPDATE DATE
    ------------------------------------------------------- */

    function updateDate() {

        const dateElements = [
            "today-history-date",
            "today-history-date-main",
            "nigeria-history-date"
        ];

        dateElements.forEach(id => {

            const element =
                document.getElementById(id);

            if (element) {

                element.textContent =
                    getFormattedDate();
            }
        });
    }

    /* -------------------------------------------------------
       LOADING
    ------------------------------------------------------- */

    function showLoading() {

        const loadingIds = [
            "world-events",
            "world-births",
            "world-deaths",
            "nigeria-history"
        ];

        loadingIds.forEach(id => {

            const container =
                document.getElementById(id);

            if (!container) {
                return;
            }

            container.innerHTML = `
                <div class="history-loading">
                    <div class="history-spinner"></div>
                    <p>
                        Loading today's history...
                    </p>
                </div>
            `;
        });
    }

    /* -------------------------------------------------------
       ERROR
    ------------------------------------------------------- */

    function showError() {

        const containers = [
            "world-events",
            "world-births",
            "world-deaths",
            "nigeria-history"
        ];

        containers.forEach(id => {

            const container =
                document.getElementById(id);

            if (!container) {
                return;
            }

            container.innerHTML = `
                <div class="history-error">

                    <div class="history-error-icon">
                        ⚠️
                    </div>

                    <h3>
                        History temporarily unavailable
                    </h3>

                    <p>
                        We couldn't load today's
                        historical information.
                        Please try again.
                    </p>

                    <button
                        type="button"
                        onclick="window.IMOLEReloadHistory()"
                        class="history-retry"
                    >
                        🔄 Try Again
                    </button>

                </div>
            `;
        });
    }

    /* -------------------------------------------------------
       HOMEPAGE PREVIEW
    ------------------------------------------------------- */

    function renderHomepagePreview(data) {

        const homepage =
            document.getElementById(
                "today-history-preview"
            );

        if (!homepage) {
            return;
        }

        const events =
            data.events || [];

        const selected =
            events.slice(0, 3);

        if (!selected.length) {

            homepage.innerHTML = `
                <div class="history-empty">
                    No historical events available today.
                </div>
            `;

            return;
        }

        homepage.innerHTML =
            selected
                .map(item =>
                    createCard(
                        item,
                        "event"
                    )
                )
                .join("");
    }

    /* -------------------------------------------------------
       MAIN RENDER
    ------------------------------------------------------- */

    function renderAll(data) {

        updateDate();

        /* WORLD EVENTS */

        renderCards(
            "world-events",
            "world-events-status",
            data.events || [],
            "event",
            LIMITS.worldEvents
        );

        /* BIRTHS */

        renderCards(
            "world-births",
            "world-births-status",
            data.births || [],
            "birth",
            LIMITS.worldBirths
        );

        /* DEATHS */

        renderCards(
            "world-deaths",
            "world-deaths-status",
            data.deaths || [],
            "death",
            LIMITS.worldDeaths
        );

        /* NIGERIA */

        const nigeria =
            getNigeriaHistory(data);

        renderCards(
            "nigeria-history",
            "nigeria-history-status",
            nigeria,
            "nigeria",
            LIMITS.nigeria
        );

        /* HOMEPAGE */

        renderHomepagePreview(data);

        /* NUMBER */

        const nigeriaCount =
            document.getElementById(
                "nigeria-history-count"
            );

        if (nigeriaCount) {

            nigeriaCount.textContent =
                nigeria.length;
        }

        const worldCount =
            document.getElementById(
                "world-history-count"
            );

        if (worldCount) {

            worldCount.textContent =
                (data.events || []).length;
        }
    }

    /* -------------------------------------------------------
       MIDNIGHT REFRESH
    ------------------------------------------------------- */

    function scheduleMidnightRefresh() {

        const now =
            new Date();

        const tomorrow =
            new Date(now);

        tomorrow.setDate(
            now.getDate() + 1
        );

        tomorrow.setHours(
            0,
            0,
            2,
            0
        );

        const delay =
            tomorrow.getTime() -
            now.getTime();

        setTimeout(() => {

            try {

                sessionStorage.clear();

            } catch (error) {}

            window.location.reload();

        }, delay);
    }

    /* -------------------------------------------------------
       PUBLIC RETRY
    ------------------------------------------------------- */

    window.IMOLEReloadHistory =
        async function () {

            showLoading();

            try {

                const today =
                    getToday();

                const key =
                    `${today.year}_${today.month}_${today.day}`;

                try {

                    sessionStorage.removeItem(
                        CACHE_PREFIX + key
                    );

                } catch (error) {}

                const data =
                    await fetchHistory();

                renderAll(data);

            } catch (error) {

                showError();
            }
        };

    /* -------------------------------------------------------
       INITIALIZE
    ------------------------------------------------------- */

    async function init() {

        updateDate();

        scheduleMidnightRefresh();

        const hasHistoryUI =
            document.getElementById(
                "world-events"
            ) ||
            document.getElementById(
                "nigeria-history"
            ) ||
            document.getElementById(
                "today-history-preview"
            );

        if (!hasHistoryUI) {
            return;
        }

        showLoading();

        try {

            const data =
                await fetchHistory();

            renderAll(data);

        } catch (error) {

            showError();
        }
    }

    /* -------------------------------------------------------
       START
    ------------------------------------------------------- */

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            init
        );

    } else {

        init();
    }

})();
