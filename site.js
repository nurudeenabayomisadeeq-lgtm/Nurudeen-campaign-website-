/* =========================================================
   IMOLE 2027 — UNIVERSAL WEBSITE SYSTEM
   GitHub Pages Edition
   Version: 2026.08.31
   ========================================================= */

(function () {
  "use strict";

  /* =======================================================
     SITE CONFIGURATION
     ======================================================= */

  const SITE_VERSION = "2026.08.31";

  /*
     IMPORTANT:
     This is the permanent GitHub Pages homepage.
  */
  const SITE_ROOT =
    "/Nurudeen-campaign-website-/";

  const HOME =
    SITE_ROOT;

  const PAGES = {
    home: HOME,
    about: SITE_ROOT + "about.html",
    manifesto: SITE_ROOT + "manifesto.html",
    polling: SITE_ROOT + "polling-units.html",
    results: SITE_ROOT + "results.html",
    news: SITE_ROOT + "news.html",
    events: SITE_ROOT + "events.html",
    gallery: SITE_ROOT + "gallery.html",
    media: SITE_ROOT + "media.html",
    contact: SITE_ROOT + "contact.html",
    join: SITE_ROOT + "join.html",
    support: SITE_ROOT + "support.html"
  };

  /*
     Your confirmed GitHub asset filenames.
  */
  const CANDIDATE_IMAGE =
    SITE_ROOT + "assets/IMG-20260710-WA0004.jpg";

  const NDC_LOGO =
    SITE_ROOT + "assets/IMG-20260728-WA0032.jpg";

  /*
     Campaign WhatsApp number.
  */
  const WHATSAPP_NUMBER =
    "2348033002235";

  const WHATSAPP_URL =
    "https://wa.me/" +
    WHATSAPP_NUMBER +
    "?text=" +
    encodeURIComponent(
      "Hello IMOLE 2027 Campaign Team. I would like to know more about the movement."
    );


  /* =======================================================
     UNIVERSAL NAVIGATION
     ======================================================= */

  const navigationHTML = `
    <div class="imo-topbar">
      <span>IMOLE 2027</span>
      <span>•</span>
      <span>SERVICE</span>
      <span>•</span>
      <span>DEVELOPMENT</span>
      <span>•</span>
      <span>ACCOUNTABILITY</span>
    </div>

    <header class="imo-header">

      <div class="imo-nav-container">

        <a
          href="${HOME}"
          class="imo-brand"
          data-home-link
          aria-label="IMOLE 2027 Home">

          <img
            class="imo-logo"
            data-logo
            src="${NDC_LOGO}"
            alt="Nigeria Democratic Congress Logo"
            loading="eager"
            decoding="async"
          >

          <span class="imo-brand-text">
            <strong>IMOLE 2027</strong>
            <small>NURUDEEN ABAYOMI SADEEQ</small>
          </span>

        </a>


        <nav
          class="imo-desktop-menu"
          aria-label="Main navigation">

          <a href="${HOME}" data-home-link>Home</a>
          <a href="${PAGES.about}">About</a>
          <a href="${PAGES.manifesto}">Manifesto</a>
          <a href="${PAGES.polling}">Polling Units</a>
          <a href="${PAGES.results}">Results</a>
          <a href="${PAGES.news}">News</a>
          <a href="${PAGES.events}">Events</a>
          <a href="${PAGES.gallery}">Gallery</a>
          <a href="${PAGES.media}">Media</a>
          <a href="${PAGES.contact}">Contact</a>

          <a
            href="${PAGES.join}"
            class="imo-nav-join">
            Join IMOLE
          </a>

        </nav>


        <button
          class="imo-menu-button"
          id="imoMenuButton"
          type="button"
          aria-label="Open menu"
          aria-expanded="false"
          aria-controls="imoMobileMenu">
          ☰
        </button>

      </div>


      <nav
        class="imo-mobile-menu"
        id="imoMobileMenu"
        aria-label="Mobile navigation">

        <a href="${HOME}" data-home-link>
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
          ❤️ Support / Donations
        </a>

      </nav>

    </header>
  `;


  /* =======================================================
     UNIVERSAL FOOTER
     ======================================================= */

  const footerHTML = `
    <footer class="imo-footer">

      <div class="imo-footer-container">

        <div class="imo-footer-column">

          <div class="imo-footer-brand">

            <img
              data-logo
              src="${NDC_LOGO}"
              alt="Nigeria Democratic Congress Logo"
              class="imo-footer-logo"
              loading="lazy"
            >

            <div>
              <strong>IMOLE 2027</strong>
              <small>
                NURUDEEN ABAYOMI SADEEQ
              </small>
            </div>

          </div>

          <p>
            Official campaign website of Hon. Nurudeen
            Abayomi Sadeeq for Lagos State House of Assembly,
            Ojo Constituency II.
          </p>

          <p class="imo-footer-motto">
            Service • Development • Accountability
          </p>

        </div>


        <div class="imo-footer-column">

          <h3>Campaign</h3>

          <a href="${HOME}" data-home-link>Home</a>
          <a href="${PAGES.about}">About</a>
          <a href="${PAGES.manifesto}">Manifesto</a>
          <a href="${PAGES.news}">News</a>
          <a href="${PAGES.events}">Events</a>
          <a href="${PAGES.gallery}">Gallery</a>

        </div>


        <div class="imo-footer-column">

          <h3>Connect</h3>

          <a href="${PAGES.polling}">Polling Units</a>
          <a href="${PAGES.results}">Results</a>
          <a href="${PAGES.media}">Media</a>
          <a href="${PAGES.contact}">Contact</a>
          <a href="${PAGES.join}">Join IMOLE</a>
          <a href="${PAGES.support}">Support / Donations</a>

        </div>

      </div>


      <div class="imo-copyright">

        © <span data-current-year></span>
        Hon. Nurudeen Abayomi Sadeeq Campaign.
        All Rights Reserved.

        <br>

        Nigeria Democratic Congress (NDC) |
        Ojo Constituency II

      </div>

    </footer>
  `;


  /* =======================================================
     INSTALL NAVIGATION
     ======================================================= */

  function installNavigation() {

    if (!document.body) return;

    /*
       Hide old navigation systems.
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
       Install only one universal header.
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


  /* =======================================================
     INSTALL FOOTER
     ======================================================= */

  function installFooter() {

    if (
      document.body &&
      !document.querySelector(".imo-footer")
    ) {

      document.body.insertAdjacentHTML(
        "beforeend",
        footerHTML
      );

    }

  }


  /* =======================================================
     MOBILE MENU
     ======================================================= */

  function setupMobileMenu() {

    const button =
      document.getElementById(
        "imoMenuButton"
      );

    const menu =
      document.getElementById(
        "imoMobileMenu"
      );

    if (!button || !menu) return;


    button.addEventListener(
      "click",
      function () {

        const open =
          menu.classList.toggle(
            "imo-open"
          );

        button.setAttribute(
          "aria-expanded",
          open ? "true" : "false"
        );

        button.setAttribute(
          "aria-label",
          open
            ? "Close menu"
            : "Open menu"
        );

        button.innerHTML =
          open ? "✕" : "☰";

      }
    );


    menu.querySelectorAll("a")
      .forEach(function (link) {

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

            button.innerHTML = "☰";

          }
        );

      });

  }


  /* =======================================================
     REPAIR ALL HOME LINKS
     ======================================================= */

  function repairHomeLinks() {

    /*
       Known old/broken Home patterns.
    */
    const selectors = [
      'a[data-home-link]',
      'a[href="#home"]',
      'a[href="home.html"]',
      'a[href="Home.html"]',
      'a[href="/"]',
      'a[href="../"]',
      'a[href="./"]'
    ];


    document.querySelectorAll(
      selectors.join(",")
    ).forEach(function (link) {

      link.setAttribute(
        "href",
        HOME
      );

    });


    /*
       Repair buttons and links whose visible
       text clearly says Home.
    */
    document.querySelectorAll(
      "a, button"
    ).forEach(function (element) {

      const text =
        element.textContent
          .trim()
          .toLowerCase();

      if (
        text === "home" ||
        text === "🏠 home" ||
        text === "home 🏠"
      ) {

        if (
          element.tagName
            .toLowerCase() === "a"
        ) {

          element.setAttribute(
            "href",
            HOME
          );

        }

      }

    });

  }


  /* =======================================================
     LOGO SYSTEM
     ======================================================= */

  function setupLogos() {

    document.querySelectorAll(
      "[data-logo]"
    ).forEach(function (image) {

      image.src = NDC_LOGO;

      image.onerror = function () {

        /*
           Hide broken image icon rather than
           displaying a broken image.
        */
        image.style.display = "none";

      };

    });

  }


  /* =======================================================
     CANDIDATE IMAGE SYSTEM
     ======================================================= */

  function setupCandidateImages() {

    const images =
      document.querySelectorAll(
        "[data-candidate-image]"
      );

    if (!images.length) return;


    images.forEach(function (image) {

      image.src =
        CANDIDATE_IMAGE;

      image.alt =
        image.alt ||
        "Hon. Nurudeen Abayomi Sadeeq";


      image.loading =
        image.loading ||
        "eager";


      image.decoding =
        "async";


      image.onerror =
        function () {

          /*
             Keep the layout clean if the image
             cannot be loaded.
          */
          image.classList.add(
            "imo-image-error"
          );

        };

    });

  }


  /* =======================================================
     COUNTDOWN SYSTEM
     ======================================================= */

  function setupCountdown() {

    /*
       Election date:
       6 February 2027
    */
    const electionDate =
      new Date(
        "2027-02-06T00:00:00+01:00"
      ).getTime();


    const selectors = [
      "[data-countdown]",
      "#countdown",
      ".countdown"
    ];


    let elements = [];


    selectors.forEach(function (selector) {

      document.querySelectorAll(
        selector
      ).forEach(function (element) {

        if (
          !elements.includes(element)
        ) {

          elements.push(element);

        }

      });

    });


    /*
       Also support individual counters.
    */
    const days =
      document.querySelector(
        "[data-days]"
      );

    const hours =
      document.querySelector(
        "[data-hours]"
      );

    const minutes =
      document.querySelector(
        "[data-minutes]"
      );

    const seconds =
      document.querySelector(
        "[data-seconds]"
      );


    function updateCountdown() {

      const now =
        new Date().getTime();

      const distance =
        electionDate - now;


      if (distance <= 0) {

        elements.forEach(
          function (element) {

            element.innerHTML =
              "ELECTION DAY";

          }
        );

        if (days) days.textContent = "0";
        if (hours) hours.textContent = "0";
        if (minutes) minutes.textContent = "0";
        if (seconds) seconds.textContent = "0";

        return;

      }


      const d =
        Math.floor(
          distance /
          (1000 * 60 * 60 * 24)
        );

      const h =
        Math.floor(
          (distance %
            (1000 * 60 * 60 * 24)) /
          (1000 * 60 * 60)
        );

      const m =
        Math.floor(
          (distance %
            (1000 * 60 * 60)) /
          (1000 * 60)
        );

      const s =
        Math.floor(
          (distance %
            (1000 * 60)) /
          1000
        );


      const formatted =
        `
          <span>${d}</span>
          <small>Days</small>

          <span>${String(h).padStart(2, "0")}</span>
          <small>Hours</small>

          <span>${String(m).padStart(2, "0")}</span>
          <small>Minutes</small>

          <span>${String(s).padStart(2, "0")}</span>
          <small>Seconds</small>
        `;


      elements.forEach(
        function (element) {

          element.innerHTML =
            formatted;

        }
      );


      if (days) days.textContent = d;
      if (hours) hours.textContent =
        String(h).padStart(2, "0");

      if (minutes) minutes.textContent =
        String(m).padStart(2, "0");

      if (seconds) seconds.textContent =
        String(s).padStart(2, "0");

    }


    if (
      elements.length ||
      days ||
      hours ||
      minutes ||
      seconds
    ) {

      updateCountdown();

      setInterval(
        updateCountdown,
        1000
      );

    }

  }


  /* =======================================================
     CURRENT YEAR
     ======================================================= */

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


  /* =======================================================
     ACTIVE PAGE
     ======================================================= */

  function setActivePage() {

    let current =
      location.pathname
        .split("/")
        .pop()
        .toLowerCase();


    if (
      current === ""
    ) {

      current =
        "index.html";

    }


    document.querySelectorAll(
      ".imo-desktop-menu a, " +
      ".imo-mobile-menu a"
    ).forEach(function (link) {

      const href =
        link.getAttribute("href");

      if (!href) return;


      const target =
        href
          .split("/")
          .pop()
          .split("?")[0]
          .split("#")[0]
          .toLowerCase();


      if (
        target === current ||
        (
          current === "index.html" &&
          target === ""
        )
      ) {

        link.classList.add(
          "imo-active"
        );

      }

    });

  }


  /* =======================================================
     SCROLL TOP BUTTON
     ======================================================= */

  function setupScrollButton() {

    if (
      document.querySelector(
        ".imo-scroll-top"
      )
    ) return;


    const button =
      document.createElement(
        "button"
      );


    button.className =
      "imo-scroll-top";


    button.innerHTML =
      "↑";


    button.setAttribute(
      "aria-label",
      "Back to top"
    );


    button.type =
      "button";


    document.body.appendChild(
      button
    );


    window.addEventListener(
      "scroll",
      function () {

        if (
          window.scrollY > 500
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
          behavior: "smooth"
        });

      }
    );

  }


  /* =======================================================
     WHATSAPP BUTTON
     ======================================================= */

  function setupWhatsAppButton() {

    if (
      document.querySelector(
        ".imo-whatsapp"
      )
    ) return;


    const button =
      document.createElement(
        "a"
      );


    button.className =
      "imo-whatsapp";


    button.href =
      WHATSAPP_URL;


    button.target =
      "_blank";


    button.rel =
      "noopener noreferrer";


    button.setAttribute(
      "aria-label",
      "Chat with IMOLE 2027 on WhatsApp"
    );


    button.innerHTML =
      "💬";


    document.body.appendChild(
      button
    );

  }


  /* =======================================================
     EXTERNAL LINK SAFETY
     ======================================================= */

  function secureExternalLinks() {

    document.querySelectorAll(
      'a[target="_blank"]'
    ).forEach(function (link) {

      if (
        !link.rel.includes("noopener")
      ) {

        link.rel =
          "noopener noreferrer";

      }

    });

  }


  /* =======================================================
     VERSION
     ======================================================= */

  function exposeVersion() {

    document.documentElement
      .setAttribute(
        "data-site-version",
        SITE_VERSION
      );


    console.log(
      "IMOLE 2027 Website:",
      SITE_VERSION
    );

  }


  /* =======================================================
     INITIALIZE
     ======================================================= */

  function initialize() {

    installNavigation();

    installFooter();

    setupMobileMenu();

    repairHomeLinks();

    setupLogos();

    setupCandidateImages();

    setupCountdown();

    setupYear();

    setActivePage();

    setupScrollButton();

    setupWhatsAppButton();

    secureExternalLinks();

    exposeVersion();

  }


  /* =======================================================
     START
     ======================================================= */

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
