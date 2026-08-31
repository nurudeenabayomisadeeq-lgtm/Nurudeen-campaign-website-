/* =========================================================
   IMOLE 2027 — UNIVERSAL WEBSITE SYSTEM
   Version: 2026.08.31
   GitHub Pages compatible
   ========================================================= */

(function () {
    "use strict";

    const SITE_VERSION = "2026.08.31";

    /* =====================================================
       GITHUB PAGES SAFE PATH SYSTEM
       ===================================================== */

    /*
       IMPORTANT:
       Your website is hosted inside this repository:

       /Nurudeen-campaign-website-/

       We therefore use RELATIVE paths.

       Do NOT use:
       /
       ../
       Netlify URLs
       old campaign URLs

       The homepage is always:
       ./index.html
    */

    const PAGES = {
        home: "./index.html",
        about: "./about.html",
        manifesto: "./manifesto.html",
        polling: "./polling-units.html",
        results: "./results.html",
        news: "./news.html",
        events: "./events.html",
        gallery: "./gallery.html",
        media: "./media.html",
        contact: "./contact.html",
        join: "./join.html",
        support: "./support.html"
    };


    /* =====================================================
       EXACT ASSET PATHS
       ===================================================== */

    const ASSETS = {

        logo:
            "./assets/IMG-20260728-WA0032.jpg",

        candidate:
            "./assets/IMG-20260710-WA0004.jpg"

    };


    /* =====================================================
       CAMPAIGN INFORMATION
       ===================================================== */

    const CAMPAIGN = {

        candidate:
            "Hon. Nurudeen Abayomi Sadeeq",

        party:
            "Nigeria Democratic Congress (NDC)",

        constituency:
            "Lagos State House of Assembly — Ojo Constituency II",

        electionDate:
            "February 6, 2027",

        whatsapp:
            "2348033002235",

        wards: [
            "Ilogbo Ward",
            "Irewe Ward",
            "Ijanikin Ward",
            "Etegbin Ward",
            "Idolowu Ward",
            "Tafi Ward"
        ]

    };


    /* =====================================================
       UNIVERSAL HEADER
       ===================================================== */

    const navigationHTML = `

        <div class="imo-topbar">
            IMOLE 2027
            •
            SERVICE
            •
            DEVELOPMENT
            •
            ACCOUNTABILITY
        </div>


        <header class="imo-header">

            <div class="imo-nav-container">

                <a
                    href="${PAGES.home}"
                    class="imo-brand"
                    data-home-link
                    aria-label="IMOLE 2027 Home"
                >

                    <img
                        class="imo-logo"
                        data-logo
                        src="${ASSETS.logo}"
                        alt="Nigeria Democratic Congress Logo"
                    >

                    <span class="imo-brand-text">

                        <strong>
                            IMOLE 2027
                        </strong>

                        <small>
                            NURUDEEN ABAYOMI SADEEQ
                        </small>

                    </span>

                </a>


                <nav class="imo-desktop-menu">

                    <a
                        href="${PAGES.home}"
                        data-home-link
                    >
                        Home
                    </a>

                    <a href="${PAGES.about}">
                        About
                    </a>

                    <a href="${PAGES.manifesto}">
                        Manifesto
                    </a>

                    <a href="${PAGES.polling}">
                        Polling Units
                    </a>

                    <a href="${PAGES.results}">
                        Results
                    </a>

                    <a href="${PAGES.news}">
                        News
                    </a>

                    <a href="${PAGES.events}">
                        Events
                    </a>

                    <a href="${PAGES.gallery}">
                        Gallery
                    </a>

                    <a href="${PAGES.media}">
                        Media
                    </a>

                    <a href="${PAGES.contact}">
                        Contact
                    </a>

                    <a
                        href="${PAGES.join}"
                        class="imo-nav-join"
                    >
                        Join Us
                    </a>

                    <a
                        href="${PAGES.support}"
                        class="imo-nav-support"
                    >
                        Support
                    </a>

                </nav>


                <button
                    class="imo-menu-button"
                    id="imoMenuButton"
                    type="button"
                    aria-label="Open menu"
                    aria-expanded="false"
                >
                    ☰
                </button>

            </div>


            <nav
                class="imo-mobile-menu"
                id="imoMobileMenu"
                aria-label="Mobile navigation"
            >

                <a
                    href="${PAGES.home}"
                    data-home-link
                >
                    🏠 Home
                </a>

                <a href="${PAGES.about}">
                    👤 About
                </a>

                <a href="${PAGES.manifesto}">
                    📜 Manifesto
                </a>

                <a href="${PAGES.polling}">
                    📍 Polling Units
                </a>

                <a href="${PAGES.results}">
                    📊 Results
                </a>

                <a href="${PAGES.news}">
                    📰 News
                </a>

                <a href="${PAGES.events}">
                    📅 Events
                </a>

                <a href="${PAGES.gallery}">
                    📸 Gallery
                </a>

                <a href="${PAGES.media}">
                    🎵 Media
                </a>

                <a href="${PAGES.contact}">
                    📞 Contact
                </a>

                <a href="${PAGES.join}">
                    🤝 Join IMOLE
                </a>

                <a href="${PAGES.support}">
                    ❤️ Support
                </a>

            </nav>

        </header>
    `;


    /* =====================================================
       UNIVERSAL FOOTER
       ===================================================== */

    const footerHTML = `

        <footer class="imo-footer">

            <div class="imo-footer-container">


                <div class="imo-footer-column">

                    <div class="imo-footer-brand">

                        <img
                            data-logo
                            src="${ASSETS.logo}"
                            alt="Nigeria Democratic Congress Logo"
                            class="imo-footer-logo"
                        >

                        <div>

                            <strong>
                                IMOLE 2027
                            </strong>

                            <small>
                                NURUDEEN ABAYOMI SADEEQ
                            </small>

                        </div>

                    </div>


                    <p>
                        Official campaign website of
                        Hon. Nurudeen Abayomi Sadeeq for
                        Lagos State House of Assembly,
                        Ojo Constituency II.
                    </p>


                    <p class="imo-footer-motto">
                        Service • Development • Accountability
                    </p>

                </div>


                <div class="imo-footer-column">

                    <h3>
                        Campaign
                    </h3>

                    <a
                        href="${PAGES.home}"
                        data-home-link
                    >
                        Home
                    </a>

                    <a href="${PAGES.about}">
                        About
                    </a>

                    <a href="${PAGES.manifesto}">
                        Manifesto
                    </a>

                    <a href="${PAGES.news}">
                        News
                    </a>

                    <a href="${PAGES.events}">
                        Events
                    </a>

                    <a href="${PAGES.gallery}">
                        Gallery
                    </a>

                </div>


                <div class="imo-footer-column">

                    <h3>
                        Information
                    </h3>

                    <a href="${PAGES.polling}">
                        Polling Units
                    </a>

                    <a href="${PAGES.results}">
                        Results
                    </a>

                    <a href="${PAGES.media}">
                        Media
                    </a>

                    <a href="${PAGES.contact}">
                        Contact
                    </a>

                    <a href="${PAGES.join}">
                        Join IMOLE
                    </a>

                    <a href="${PAGES.support}">
                        Support
                    </a>

                </div>


            </div>


            <div class="imo-copyright">

                ©
                <span data-current-year></span>
                Hon. Nurudeen Abayomi Sadeeq Campaign.
                All Rights Reserved.

                <br>

                Nigeria Democratic Congress (NDC)
                |
                Ojo Constituency II

            </div>

        </footer>
    `;


    /* =====================================================
       INSTALL HEADER
       ===================================================== */

    function installNavigation() {

        if (!document.body) {
            return;
        }


        /*
           Remove/hide old navigation systems.

           This prevents an older header from appearing
           above the new universal header.
        */

        document.querySelectorAll(
            "body > header:not(.imo-header), " +
            "body > nav:not(.imo-mobile-menu), " +
            ".old-navigation, " +
            ".old-header, " +
            ".site-header"
        ).forEach(function (element) {

            element.classList.add(
                "imo-legacy-hidden"
            );

        });


        /*
           Do not install twice.
        */

        if (
            !document.querySelector(
                ".imo-header"
            )
        ) {

            document.body.insertAdjacentHTML(
                "afterbegin",
                navigationHTML
            );

        }

    }


    /* =====================================================
       INSTALL FOOTER
       ===================================================== */

    function installFooter() {

        if (!document.body) {
            return;
        }


        if (
            !document.querySelector(
                ".imo-footer"
            )
        ) {

            document.body.insertAdjacentHTML(
                "beforeend",
                footerHTML
            );

        }

    }


    /* =====================================================
       MOBILE MENU
       ===================================================== */

    function setupMobileMenu() {

        const button =
            document.getElementById(
                "imoMenuButton"
            );

        const menu =
            document.getElementById(
                "imoMobileMenu"
            );


        if (!button || !menu) {
            return;
        }


        button.addEventListener(
            "click",
            function () {

                const isOpen =
                    menu.classList.toggle(
                        "imo-open"
                    );


                button.setAttribute(
                    "aria-expanded",
                    isOpen
                        ? "true"
                        : "false"
                );


                button.setAttribute(
                    "aria-label",
                    isOpen
                        ? "Close menu"
                        : "Open menu"
                );


                button.innerHTML =
                    isOpen
                        ? "✕"
                        : "☰";

            }
        );


        menu.querySelectorAll(
            "a"
        ).forEach(function (link) {

            link.addEventListener(
                "click",
                function () {

                    menu.classList.remove(
                        "imo-open"
                    );


                    button.setAttribute(
                        "aria-expanded",
                        "false"
                    );


                    button.setAttribute(
                        "aria-label",
                        "Open menu"
                    );


                    button.innerHTML =
                        "☰";

                }
            );

        });

    }


    /* =====================================================
       ROBUST HOME LINK REPAIR
       ===================================================== */

    function repairHomeLinks() {

        /*
           The ONLY valid homepage path is:

           ./index.html
        */

        document.querySelectorAll(
            "a[data-home-link]"
        ).forEach(function (link) {

            link.setAttribute(
                "href",
                PAGES.home
            );

        });


        /*
           Repair common old homepage links.
        */

        document.querySelectorAll(
            "a"
        ).forEach(function (link) {

            const href =
                link.getAttribute("href");

            if (!href) {
                return;
            }


            const text =
                (
                    link.textContent || ""
                )
                .trim()
                .toLowerCase();


            const normalized =
                href
                    .trim()
                    .toLowerCase();


            /*
               Only change obvious HOME links.

               We deliberately do NOT rewrite every
               repository URL because that could break
               legitimate links.
            */

            const isHomeText =
                text === "home" ||
                text === "🏠 home" ||
                text.includes("back home");


            const isBadHome =
                normalized === "/" ||
                normalized === "../" ||
                normalized === "./" ||
                normalized === "home.html" ||
                normalized === "home" ||
                normalized.includes(
                    "netlify.app"
                );


            if (
                isHomeText &&
                isBadHome
            ) {

                link.setAttribute(
                    "href",
                    PAGES.home
                );

            }

        });

    }


    /* =====================================================
       EXACT LOGO
       ===================================================== */

    function setupLogos() {

        document.querySelectorAll(
            "[data-logo]"
        ).forEach(function (image) {

            image.src =
                ASSETS.logo;


            image.alt =
                "Nigeria Democratic Congress Logo";


            image.addEventListener(
                "error",
                function () {

                    console.warn(
                        "NDC logo could not be loaded:",
                        ASSETS.logo
                    );

                }
            );

        });

    }


    /* =====================================================
       EXACT CANDIDATE PHOTO
       ===================================================== */

    function setupCandidateImages() {

        document.querySelectorAll(
            "[data-candidate-image]"
        ).forEach(function (image) {

            image.src =
                ASSETS.candidate;


            image.alt =
                CAMPAIGN.candidate;


            image.addEventListener(
                "error",
                function () {

                    console.warn(
                        "Candidate photo could not be loaded:",
                        ASSETS.candidate
                    );

                }
            );

        });

    }


    /* =====================================================
       CURRENT YEAR
       ===================================================== */

    function setupYear() {

        const year =
            new Date().getFullYear();


        document.querySelectorAll(
            "[data-current-year]"
        ).forEach(function (element) {

            element.textContent =
                year;

        });

    }


    /* =====================================================
       ACTIVE PAGE
       ===================================================== */

    function setActivePage() {

        let current =
            location.pathname
                .split("/")
                .pop()
                .toLowerCase();


        /*
           GitHub Pages can sometimes show the
           directory itself as the homepage.

           Treat empty pathname as index.html.
        */

        if (
            !current ||
            current === "/"
        ) {

            current =
                "index.html";

        }


        document.querySelectorAll(
            ".imo-desktop-menu a, " +
            ".imo-mobile-menu a"
        ).forEach(function (link) {

            const href =
                link.getAttribute(
                    "href"
                );


            if (!href) {
                return;
            }


            const target =
                href
                    .split("/")
                    .pop()
                    .split("?")[0]
                    .split("#")[0]
                    .toLowerCase();


            if (
                target === current
            ) {

                link.classList.add(
                    "imo-active"
                );

            } else {

                link.classList.remove(
                    "imo-active"
                );

            }

        });

    }


    /* =====================================================
       SCROLL TO TOP
       ===================================================== */

    function setupScrollButton() {

        if (
            document.querySelector(
                ".imo-scroll-top"
            )
        ) {
            return;
        }


        const button =
            document.createElement(
                "button"
            );


        button.className =
            "imo-scroll-top";


        button.type =
            "button";


        button.innerHTML =
            "↑";


        button.setAttribute(
            "aria-label",
            "Back to top"
        );


        document.body.appendChild(
            button
        );


        window.addEventListener(
            "scroll",
            function () {

                if (
                    window.scrollY > 450
                ) {

                    button.classList.add(
                        "imo-show"
                    );

                } else {

                    button.classList.remove(
                        "imo-show"
                    );

                }

            },
            {
                passive: true
            }
        );


        button.addEventListener(
            "click",
            function () {

                window.scrollTo({

                    top: 0,

                    behavior:
                        "smooth"

                });

            }
        );

    }


    /* =====================================================
       WHATSAPP BUTTON
       ===================================================== */

    function setupWhatsAppButton() {

        if (
            document.querySelector(
                ".imo-whatsapp"
            )
        ) {
            return;
        }


        const button =
            document.createElement(
                "a"
            );


        button.className =
            "imo-whatsapp";


        button.href =
            "https://wa.me/" +
            CAMPAIGN.whatsapp;


        button.target =
            "_blank";


        button.rel =
            "noopener noreferrer";


        button.setAttribute(
            "aria-label",
            "Contact IMOLE 2027 on WhatsApp"
        );


        button.title =
            "WhatsApp IMOLE 2027";


        button.innerHTML =
            "☎";


        document.body.appendChild(
            button
        );

    }


    /* =====================================================
       CAMPAIGN DATA AVAILABLE TO OTHER PAGES
       ===================================================== */

    function exposeCampaignData() {

        window.IMOLE2027 = {

            version:
                SITE_VERSION,

            pages:
                PAGES,

            assets:
                ASSETS,

            campaign:
                CAMPAIGN

        };

    }


    /* =====================================================
       PAGE LINKS SAFETY CHECK
       ===================================================== */

    function protectNavigation() {

        document.querySelectorAll(
            "a"
        ).forEach(function (link) {

            link.addEventListener(
                "click",
                function () {

                    const href =
                        link.getAttribute(
                            "href"
                        );


                    if (!href) {
                        return;
                    }


                    /*
                       Never allow javascript:
                       URLs from old page code.
                    */

                    if (
                        href
                            .trim()
                            .toLowerCase()
                            .startsWith(
                                "javascript:"
                            )
                    ) {

                        link.removeAttribute(
                            "href"
                        );

                    }

                }
            );

        });

    }


    /* =====================================================
       PREVENT HASH HOME PROBLEM
       ===================================================== */

    function repairHashHome() {

        if (
            location.hash === "#home"
        ) {

            /*
               If an old page sends visitors to
               #home, move them to the real homepage.
            */

            location.replace(
                PAGES.home
            );

        }

    }


    /* =====================================================
       GITHUB PAGES CACHE HELPER
       ===================================================== */

    function exposeCacheVersion() {

        document.documentElement
            .setAttribute(
                "data-site-version",
                SITE_VERSION
            );


        console.log(
            "===================================="
        );


        console.log(
            "IMOLE 2027 WEBSITE"
        );


        console.log(
            "Version:",
            SITE_VERSION
        );


        console.log(
            "Candidate:",
            CAMPAIGN.candidate
        );


        console.log(
            "Election:",
            CAMPAIGN.electionDate
        );


        console.log(
            "Wards:",
            CAMPAIGN.wards.length
        );


        console.log(
            "Homepage:",
            PAGES.home
        );


        console.log(
            "===================================="
        );

    }


    /* =====================================================
       INITIALIZE
       ===================================================== */

    function initialize() {

        repairHashHome();

        installNavigation();

        installFooter();

        setupMobileMenu();

        repairHomeLinks();

        setupLogos();

        setupCandidateImages();

        setupYear();

        setActivePage();

        setupScrollButton();

        setupWhatsAppButton();

        exposeCampaignData();

        protectNavigation();

        exposeCacheVersion();

    }


    /* =====================================================
       START
       ===================================================== */

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initialize
        );

    } else {

        initialize();

    }


})();
