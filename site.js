/* =========================================================
   IMOLE 2027 — UNIVERSAL WEBSITE SYSTEM
   Version: 2026.08.29
   GitHub Pages compatible
   ========================================================= */

(function () {
  "use strict";

  const SITE_VERSION = "2026.08.29";

  /*
   IMPORTANT:
   This is the ONLY homepage destination used by the
   universal navigation system.
  */
  const HOME = "./index.html";

  const PAGES = {
    home: HOME,
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

  /* ======================================================
     UNIVERSAL NAVIGATION
     ====================================================== */

  const navigationHTML = `
    <div class="imo-topbar">
      IMOLE 2027 • SERVICE • DEVELOPMENT • ACCOUNTABILITY
    </div>

    <header class="imo-header">

      <div class="imo-nav-container">

        <a href="${PAGES.home}"
           class="imo-brand"
           data-home-link
           aria-label="IMOLE 2027 Home">

          <img
            class="imo-logo"
            data-logo
            alt="NDC Logo"
          >

          <span class="imo-brand-text">
            <strong>IMOLE 2027</strong>
            <small>NURUDEEN ABAYOMI SADEEQ</small>
          </span>

        </a>


        <nav class="imo-desktop-menu">

          <a href="${PAGES.home}" data-home-link>Home</a>
          <a href="${PAGES.about}">About</a>
          <a href="${PAGES.manifesto}">Manifesto</a>
          <a href="${PAGES.polling}">Polling Units</a>
          <a href="${PAGES.results}">Results</a>
          <a href="${PAGES.news}">News</a>
          <a href="${PAGES.events}">Events</a>
          <a href="${PAGES.gallery}">Gallery</a>
          <a href="${PAGES.media}">Media</a>
          <a href="${PAGES.contact}">Contact</a>
          <a href="${PAGES.join}" class="imo-nav-join">Join Us</a>

        </nav>


        <button
          class="imo-menu-button"
          id="imoMenuButton"
          aria-label="Open menu"
          aria-expanded="false">
          ☰
        </button>

      </div>


      <nav
        class="imo-mobile-menu"
        id="imoMobileMenu">

        <a href="${PAGES.home}" data-home-link>🏠 Home</a>
        <a href="${PAGES.about}">👤 About</a>
        <a href="${PAGES.manifesto}">📜 Manifesto</a>
        <a href="${PAGES.polling}">📍 Polling Units</a>
        <a href="${PAGES.results}">📊 Results</a>
        <a href="${PAGES.news}">📰 News</a>
        <a href="${PAGES.events}">📅 Events</a>
        <a href="${PAGES.gallery}">📸 Gallery</a>
        <a href="${PAGES.media}">🎵 Media</a>
        <a href="${PAGES.contact}">📞 Contact</a>
        <a href="${PAGES.join}">🤝 Join Us</a>
        <a href="${PAGES.support}">❤️ Support</a>

      </nav>

    </header>
  `;


  /* ======================================================
     UNIVERSAL FOOTER
     ====================================================== */

  const footerHTML = `
    <footer class="imo-footer">

      <div class="imo-footer-container">

        <div class="imo-footer-column">

          <div class="imo-footer-brand">

            <img
              data-logo
              alt="NDC Logo"
              class="imo-footer-logo"
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

          <a href="${PAGES.home}" data-home-link>Home</a>
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
          <a href="${PAGES.join}">Join Us</a>
          <a href="${PAGES.support}">Support</a>

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


  /* ======================================================
     INSERT NAVIGATION
     ====================================================== */

  function installNavigation() {

    /*
      If a page already contains an old header/navigation,
      we hide it instead of allowing two menus to appear.
    */

    document.querySelectorAll(
      "body > header:not(.imo-header), " +
      "body > nav:not(.imo-mobile-menu), " +
      ".old-navigation, .old-header, .site-header"
    ).forEach(function (element) {

      element.classList.add("imo-legacy-hidden");

    });


    /*
      Prevent duplicate universal headers.
    */

    if (!document.querySelector(".imo-header")) {

      document.body.insertAdjacentHTML(
        "afterbegin",
        navigationHTML
      );

    }

  }


  /* ======================================================
     INSERT FOOTER
     ====================================================== */

  function installFooter() {

    if (
      !document.querySelector(".imo-footer") &&
      document.body
    ) {

      document.body.insertAdjacentHTML(
        "beforeend",
        footerHTML
      );

    }

  }


  /* ======================================================
     MOBILE MENU
     ====================================================== */

  function setupMobileMenu() {

    const button =
      document.getElementById("imoMenuButton");

    const menu =
      document.getElementById("imoMobileMenu");

    if (!button || !menu) return;

    button.addEventListener("click", function () {

      const open =
        menu.classList.toggle("imo-open");

      button.setAttribute(
        "aria-expanded",
        open ? "true" : "false"
      );

      button.innerHTML =
        open ? "✕" : "☰";

    });


    menu.querySelectorAll("a").forEach(function (link) {

      link.addEventListener("click", function () {

        menu.classList.remove("imo-open");

        button.setAttribute(
          "aria-expanded",
          "false"
        );

        button.innerHTML = "☰";

      });

    });

  }


  /* ======================================================
     FORCE HOME LINKS
     ====================================================== */

  function repairHomeLinks() {

    document.querySelectorAll(
      'a[data-home-link], ' +
      'a[href="#home"], ' +
      'a[href="home.html"], ' +
      'a[href="Home.html"], ' +
      'a[href="/"], ' +
      'a[href="../"]'
    ).forEach(function (link) {

      link.setAttribute("href", HOME);

    });


    /*
      Catch old campaign-site URLs that may have survived
      in older navigation code.
    */

    document.querySelectorAll("a").forEach(function (link) {

      const href =
        link.getAttribute("href");

      if (!href) return;

      const lower = href.toLowerCase();

      if (
        lower.includes("nurudeen-campaign-website") &&
        !lower.endsWith("index.html")
      ) {

        /*
          Only repair links labelled Home.
        */

        const text =
          link.textContent.trim().toLowerCase();

        if (text === "home" || text.includes("home")) {

          link.setAttribute(
            "href",
            HOME
          );

        }

      }

    });

  }


  /* ======================================================
     LOGO FALLBACK
     ====================================================== */

  function setupLogos() {

    const logoPaths = [

      "assets/ndc-logo.png",
      "assets/ndc-logo.jpg",
      "assets/ndc-logo.jpeg",

      "assets/NDC-logo.png",
      "assets/NDC-logo.jpg",
      "assets/NDC-logo.jpeg",

      "assets/ndc.png",
      "assets/ndc.jpg",
      "assets/ndc.jpeg",

      "assets/NDC.png",
      "assets/NDC.jpg",
      "assets/NDC.jpeg",

      "ndc-logo.png",
      "ndc-logo.jpg",
      "ndc-logo.jpeg",

      "ndc.png",
      "ndc.jpg",
      "ndc.jpeg"

    ];


    const images =
      document.querySelectorAll("[data-logo]");

    if (!images.length) return;


    let current = 0;


    function findLogo() {

      if (current >= logoPaths.length) return;

      const test =
        new Image();

      test.onload = function () {

        images.forEach(function (img) {

          img.src = logoPaths[current];

        });

      };


      test.onerror = function () {

        current++;

        findLogo();

      };


      test.src =
        logoPaths[current];

    }


    findLogo();

  }


  /* ======================================================
     CANDIDATE IMAGE FALLBACK
     ====================================================== */

  function setupCandidateImages() {

    const images =
      document.querySelectorAll(
        "[data-candidate-image]"
      );

    if (!images.length) return;


    const paths = [

      "assets/nurudeen-abayomi-sadeeq.jpg",
      "assets/nurudeen-abayomi-sadeeq.jpeg",
      "assets/nurudeen-abayomi-sadeeq.png",

      "assets/Nurudeen-Abayomi-Sadeeq.jpg",
      "assets/Nurudeen-Abayomi-Sadeeq.jpeg",
      "assets/Nurudeen-Abayomi-Sadeeq.png",

      "assets/nurudeen.jpg",
      "assets/nurudeen.jpeg",
      "assets/nurudeen.png",

      "assets/candidate.jpg",
      "assets/candidate.jpeg",
      "assets/candidate.png",

      "assets/candidate-photo.jpg",
      "assets/candidate-photo.jpeg",
      "assets/candidate-photo.png",

      "nurudeen.jpg",
      "nurudeen.jpeg",
      "nurudeen.png"

    ];


    let index = 0;


    function findCandidateImage() {

      if (index >= paths.length) return;


      const test =
        new Image();


      test.onload = function () {

        images.forEach(function (image) {

          image.src = paths[index];

        });

      };


      test.onerror = function () {

        index++;

        findCandidateImage();

      };


      test.src = paths[index];

    }


    findCandidateImage();

  }


  /* ======================================================
     CURRENT YEAR
     ====================================================== */

  function setupYear() {

    const year =
      new Date().getFullYear();

    document.querySelectorAll(
      "[data-current-year]"
    ).forEach(function (element) {

      element.textContent = year;

    });

  }


  /* ======================================================
     ACTIVE PAGE
     ====================================================== */

  function setActivePage() {

    const current =
      location.pathname
        .split("/")
        .pop()
        .toLowerCase();


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
          .toLowerCase();


      if (
        target === current ||
        (
          current === "" &&
          target === "index.html"
        )
      ) {

        link.classList.add(
          "imo-active"
        );

      }

    });

  }


  /* ======================================================
     SCROLL TOP BUTTON
     ====================================================== */

  function setupScrollButton() {

    const button =
      document.createElement("button");

    button.className =
      "imo-scroll-top";

    button.innerHTML = "↑";

    button.setAttribute(
      "aria-label",
      "Back to top"
    );

    document.body.appendChild(button);


    window.addEventListener(
      "scroll",
      function () {

        if (window.scrollY > 500) {

          button.classList.add(
            "imo-show"
          );

        } else {

          button.classList.remove(
            "imo-show"
          );

        }

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


  /* ======================================================
     WHATSAPP BUTTON
     ====================================================== */

  function setupWhatsAppButton() {

    if (
      document.querySelector(
        ".imo-whatsapp"
      )
    ) return;


    const button =
      document.createElement("a");

    button.className =
      "imo-whatsapp";

    /*
      Add your official campaign WhatsApp number
      later in one place.
    */

    button.href =
      "https://wa.me/";

    button.target = "_blank";

    button.rel =
      "noopener noreferrer";

    button.setAttribute(
      "aria-label",
      "WhatsApp"
    );

    button.innerHTML = "☎";

    document.body.appendChild(
      button
    );

  }


  /* ======================================================
     CACHE VERSION
     ====================================================== */

  function exposeVersion() {

    document.documentElement
      .setAttribute(
        "data-site-version",
        SITE_VERSION
      );

    console.log(
      "IMOLE 2027 Website Version:",
      SITE_VERSION
    );

  }


  /* ======================================================
     INITIALIZE EVERYTHING
     ====================================================== */

  function initialize() {

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

    exposeVersion();

  }


  if (
    document.readyState === "loading"
  ) {

    document.addEventListener(
      "DOMContentLoaded",
      initialize
    );

  } else {

    initialize();

  }

})();
