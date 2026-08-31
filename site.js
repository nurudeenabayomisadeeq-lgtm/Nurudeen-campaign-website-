/* =========================================================
   IMOLE 2027 — UNIVERSAL WEBSITE SYSTEM
   Version: 2026.08.31
   GitHub Pages Edition
   ========================================================= */

(function () {

  "use strict";

  /* =======================================================
     WEBSITE CONFIGURATION
     ======================================================= */

  const SITE_VERSION = "2026.08.31";

  /*
    IMPORTANT:
    Your GitHub repository is:

    nurudeenabayomisadeeq-lgtm/Nurudeen-campaign-website-

    Therefore the permanent homepage is:

    /Nurudeen-campaign-website-/
  */

  const SITE_ROOT = "/Nurudeen-campaign-website/";

  const HOME = SITE_ROOT;

  const ASSETS = SITE_ROOT + "assets/";

  /* =======================================================
     EXACT VERIFIED IMAGE FILES
     ======================================================= */

  const CANDIDATE_IMAGE =
    ASSETS + "IMG-20260710-WA0004.jpg";

  const NDC_LOGO =
    ASSETS + "IMG-20260728-WA0032.jpg";


  /* =======================================================
     WHATSAPP
     ======================================================= */

  const WHATSAPP_NUMBER =
    "2348033002235";

  const WHATSAPP_MESSAGE =
    "Hello IMOLE 2027 Campaign Team. I would like to know more about the movement.";

  const WHATSAPP_URL =
    "https://wa.me/" +
    WHATSAPP_NUMBER +
    "?text=" +
    encodeURIComponent(WHATSAPP_MESSAGE);


  /* =======================================================
     WEBSITE PAGES
     ======================================================= */

  const PAGES = {

    home:
      SITE_ROOT,

    about:
      SITE_ROOT + "about.html",

    manifesto:
      SITE_ROOT + "manifesto.html",

    polling:
      SITE_ROOT + "polling-units.html",

    results:
      SITE_ROOT + "results.html",

    election:
      SITE_ROOT + "election.html",

    news:
      SITE_ROOT + "news.html",

    events:
      SITE_ROOT + "events.html",

    gallery:
      SITE_ROOT + "gallery.html",

    media:
      SITE_ROOT + "media.html",

    contact:
      SITE_ROOT + "contact.html",

    join:
      SITE_ROOT + "join.html",

    support:
      SITE_ROOT + "donations.html"

  };


  /* =======================================================
     GLOBAL CSS
     ======================================================= */

  function installStyles() {

    if (
      document.getElementById(
        "imoleUniversalStyles"
      )
    ) {
      return;
    }

    const style =
      document.createElement("style");

    style.id =
      "imoleUniversalStyles";

    style.textContent = `

      .imo-legacy-hidden{
        display:none !important;
      }

      .imo-header{
        position:sticky;
        top:0;
        z-index:9999;
        background:#ffffff;
        border-bottom:1px solid #e5e7eb;
        box-shadow:0 4px 20px rgba(0,0,0,.06);
      }

      .imo-topbar{
        background:#043b1c;
        color:#ffffff;
        text-align:center;
        padding:7px 12px;
        font-size:11px;
        font-weight:800;
        letter-spacing:.4px;
      }

      .imo-nav-container{
        width:100%;
        max-width:1280px;
        margin:auto;
        min-height:70px;
        padding:8px 4%;
        display:flex;
        align-items:center;
        justify-content:space-between;
        gap:18px;
      }

      .imo-brand{
        display:flex;
        align-items:center;
        gap:10px;
        text-decoration:none;
        min-width:0;
      }

      .imo-logo{
        width:50px;
        height:50px;
        border-radius:50%;
        object-fit:cover;
        border:3px solid #f4c542;
        background:#ffffff;
        flex-shrink:0;
      }

      .imo-brand-text{
        line-height:1.15;
      }

      .imo-brand-text strong{
        display:block;
        color:#075b2a;
        font-size:18px;
        font-weight:950;
      }

      .imo-brand-text small{
        display:block;
        color:#667085;
        font-size:9px;
        font-weight:800;
        margin-top:3px;
      }

      .imo-desktop-menu{
        display:flex;
        align-items:center;
        gap:3px;
      }

      .imo-desktop-menu a{
        color:#173522;
        text-decoration:none;
        padding:9px 9px;
        border-radius:9px;
        font-size:11px;
        font-weight:800;
        transition:.2s ease;
      }

      .imo-desktop-menu a:hover{
        background:#edf7f0;
        color:#075b2a;
      }

      .imo-desktop-menu a.imo-active{
        background:#075b2a;
        color:#ffffff;
      }

      .imo-desktop-menu .imo-nav-join{
        background:#075b2a;
        color:#ffffff;
        padding-left:13px;
        padding-right:13px;
      }

      .imo-desktop-menu .imo-nav-support{
        background:#f4c542;
        color:#111111;
      }

      .imo-menu-button{
        display:none;
        width:44px;
        height:44px;
        border:0;
        border-radius:10px;
        background:#075b2a;
        color:#ffffff;
        font-size:23px;
        cursor:pointer;
      }

      .imo-mobile-menu{
        display:none;
        background:#ffffff;
        border-top:1px solid #e5e7eb;
        box-shadow:0 15px 35px rgba(0,0,0,.10);
      }

      .imo-mobile-menu.imo-open{
        display:block;
      }

      .imo-mobile-menu a{
        display:block;
        padding:14px 20px;
        border-bottom:1px solid #edf0ee;
        text-decoration:none;
        color:#043b1c;
        font-size:14px;
        font-weight:800;
      }

      .imo-mobile-menu a:hover{
        background:#f1f8f3;
      }

      .imo-mobile-menu a.imo-active{
        background:#075b2a;
        color:#ffffff;
      }

      .imo-footer{
        background:#021f0f;
        color:#ffffff;
        padding:45px 5% 20px;
        margin-top:40px;
      }

      .imo-footer-container{
        width:100%;
        max-width:1150px;
        margin:auto;
        display:grid;
        grid-template-columns:1.5fr 1fr 1fr;
        gap:35px;
      }

      .imo-footer-column{
        display:flex;
        flex-direction:column;
      }

      .imo-footer-column h3{
        color:#f4c542;
        margin:0 0 12px;
        font-size:16px;
      }

      .imo-footer-column p{
        color:rgba(255,255,255,.68);
        font-size:13px;
        line-height:1.7;
      }

      .imo-footer-column a{
        color:rgba(255,255,255,.68);
        text-decoration:none;
        font-size:13px;
        margin-bottom:8px;
      }

      .imo-footer-column a:hover{
        color:#f4c542;
      }

      .imo-footer-brand{
        display:flex;
        align-items:center;
        gap:10px;
        margin-bottom:15px;
      }

      .imo-footer-logo{
        width:48px;
        height:48px;
        object-fit:cover;
        border-radius:50%;
        border:2px solid #f4c542;
      }

      .imo-footer-brand strong{
        display:block;
        color:#ffffff;
      }

      .imo-footer-brand small{
        display:block;
        color:rgba(255,255,255,.6);
        font-size:9px;
        margin-top:3px;
      }

      .imo-footer-motto{
        color:#f4c542 !important;
        font-weight:900;
        margin-top:10px;
      }

      .imo-copyright{
        width:100%;
        max-width:1150px;
        margin:30px auto 0;
        padding-top:18px;
        border-top:1px solid rgba(255,255,255,.10);
        text-align:center;
        color:rgba(255,255,255,.45);
        font-size:10px;
        line-height:1.8;
      }

      .imo-whatsapp{
        position:fixed;
        right:18px;
        bottom:18px;
        width:54px;
        height:54px;
        border-radius:50%;
        display:grid;
        place-items:center;
        background:#20c463;
        color:#ffffff;
        text-decoration:none;
        font-size:25px;
        box-shadow:0 10px 30px rgba(0,0,0,.22);
        z-index:10000;
      }

      .imo-whatsapp:hover{
        transform:scale(1.06);
      }

      .imo-scroll-top{
        position:fixed;
        right:20px;
        bottom:82px;
        width:42px;
        height:42px;
        border:0;
        border-radius:50%;
        background:#f4c542;
        color:#111111;
        font-size:20px;
        font-weight:900;
        cursor:pointer;
        display:none;
        z-index:9999;
        box-shadow:0 8px 20px rgba(0,0,0,.15);
      }

      .imo-scroll-top.imo-show{
        display:block;
      }

      @media(max-width:1100px){

        .imo-desktop-menu{
          display:none;
        }

        .imo-menu-button{
          display:grid;
          place-items:center;
        }

      }

      @media(max-width:700px){

        .imo-nav-container{
          min-height:64px;
          padding:7px 4%;
        }

        .imo-logo{
          width:45px;
          height:45px;
        }

        .imo-brand-text strong{
          font-size:15px;
        }

        .imo-brand-text small{
          font-size:7px;
        }

        .imo-footer-container{
          grid-template-columns:1fr;
          gap:25px;
        }

        .imo-whatsapp{
          right:15px;
          bottom:15px;
        }

        .imo-scroll-top{
          right:17px;
          bottom:78px;
        }

      }

    `;

    document.head.appendChild(style);

  }


  /* =======================================================
     HIDE OLD NAVIGATION
     ======================================================= */

  function hideLegacyNavigation() {

    const selectors = [

      "body > header:not(.imo-header)",

      "body > nav:not(.imo-mobile-menu)",

      ".old-navigation",

      ".old-header",

      ".site-header",

      ".navbar",

      ".navigation"

    ];

    selectors.forEach(
      function(selector){

        document
          .querySelectorAll(selector)
          .forEach(
            function(element){

              element.classList.add(
                "imo-legacy-hidden"
              );

            }
          );

      }
    );

  }


  /* =======================================================
     UNIVERSAL NAVIGATION
     ======================================================= */

  function buildNavigation(){

    if(
      document.querySelector(
        ".imo-header"
      )
    ){
      return;
    }


    const header =
      document.createElement("header");

    header.className =
      "imo-header";


    header.innerHTML = `

      <div class="imo-topbar">

        IMOLE 2027
        &nbsp;•&nbsp;
        SERVICE
        &nbsp;•&nbsp;
        DEVELOPMENT
        &nbsp;•&nbsp;
        ACCOUNTABILITY

      </div>


      <div class="imo-nav-container">


        <a
          class="imo-brand"
          href="${PAGES.home}"
          data-home-link
          aria-label="IMOLE 2027 Home">

          <img
            class="imo-logo"
            data-logo
            src="${NDC_LOGO}"
            alt="Nigeria Democratic Congress logo">

          <span class="imo-brand-text">

            <strong>
              IMOLE 2027
            </strong>

            <small>
              NURUDEEN ABAYOMI SADEEQ
            </small>

          </span>

        </a>


        <nav
          class="imo-desktop-menu"
          aria-label="Main navigation">

          <a
            href="${PAGES.home}"
            data-home-link>
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
            class="imo-nav-join">

            Join IMOLE

          </a>

          <a
            href="${PAGES.support}"
            class="imo-nav-support">

            ❤️ Support

          </a>

        </nav>


        <button
          type="button"
          class="imo-menu-button"
          id="imoMenuButton"
          aria-label="Open menu"
          aria-expanded="false">

          ☰

        </button>

      </div>


      <nav
        class="imo-mobile-menu"
        id="imoMobileMenu"
        aria-label="Mobile navigation">

        <a
          href="${PAGES.home}"
          data-home-link>
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

        <a href="${PAGES.election}">
          🗳️ Election Centre
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

    `;


    document.body.insertBefore(
      header,
      document.body.firstChild
    );

  }


  /* =======================================================
     UNIVERSAL FOOTER
     ======================================================= */

  function buildFooter(){

    if(
      document.querySelector(
        ".imo-footer"
      )
    ){
      return;
    }


    const footer =
      document.createElement("footer");

    footer.className =
      "imo-footer";


    footer.innerHTML = `

      <div class="imo-footer-container">


        <div class="imo-footer-column">

          <div class="imo-footer-brand">

            <img
              class="imo-footer-logo"
              data-logo
              src="${NDC_LOGO}"
              alt="NDC logo">

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
            Hon. Nurudeen Abayomi Sadeeq
            for Lagos State House of Assembly,
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
            data-home-link>
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
            Connect
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
            Support / Donations
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

    `;


    document.body.appendChild(
      footer
    );

  }


  /* =======================================================
     MOBILE MENU
     ======================================================= */

  function setupMobileMenu(){

    const button =
      document.getElementById(
        "imoMenuButton"
      );

    const menu =
      document.getElementById(
        "imoMobileMenu"
      );


    if(
      !button ||
      !menu
    ){
      return;
    }


    button.addEventListener(
      "click",
      function(){

        const open =
          menu.classList.toggle(
            "imo-open"
          );


        button.setAttribute(
          "aria-expanded",
          open
            ? "true"
            : "false"
        );


        button.innerHTML =
          open
            ? "✕"
            : "☰";

      }
    );


    menu
      .querySelectorAll("a")
      .forEach(
        function(link){

          link.addEventListener(
            "click",
            function(){

              menu.classList.remove(
                "imo-open"
              );

              button.setAttribute(
                "aria-expanded",
                "false"
              );

              button.innerHTML =
                "☰";

            }
          );

        }
      );

  }


  /* =======================================================
     REPAIR OLD HOME LINKS
     ======================================================= */

  function repairHomeLinks(){

    document
      .querySelectorAll("a")
      .forEach(
        function(link){

          const text =
            (
              link.textContent ||
              ""
            )
            .trim()
            .toLowerCase();


          const href =
            link.getAttribute(
              "href"
            );


          /*
            Any obvious Home link is redirected
            to the permanent GitHub Pages homepage.
          */

          if(
            text === "home" ||
            text === "🏠 home" ||
            text === "home page" ||
            text.includes("back home")
          ){

            link.setAttribute(
              "href",
              HOME
            );

            link.setAttribute(
              "data-home-link",
              "true"
            );

          }


          /*
            Repair common broken home paths.
          */

          if(
            href === "/" ||
            href === "../" ||
            href === "./" ||
            href === "home.html" ||
            href === "Home.html" ||
            href === "#home"
          ){

            if(
              text.includes("home") ||
              link.hasAttribute(
                "data-home-link"
              )
            ){

              link.setAttribute(
                "href",
                HOME
              );

            }

          }

        }
      );

  }


  /* =======================================================
     CANDIDATE IMAGE SYSTEM
     ======================================================= */

  function setupCandidateImages(){

    const images =
      document.querySelectorAll(
        "[data-candidate-image]"
      );


    if(
      !images.length
    ){
      return;
    }


    images.forEach(
      function(image){

        image.src =
          CANDIDATE_IMAGE;

        image.alt =
          image.alt ||
          "Hon. Nurudeen Abayomi Sadeeq";

        image.loading =
          image.loading ||
          "lazy";

      }
    );

  }


  /* =======================================================
     LOGO SYSTEM
     ======================================================= */

  function setupLogos(){

    const images =
      document.querySelectorAll(
        "[data-logo]"
      );


    images.forEach(
      function(image){

        image.src =
          NDC_LOGO;

        image.alt =
          image.alt ||
          "Nigeria Democratic Congress logo";

      }
    );

  }


  /* =======================================================
     YEAR
     ======================================================= */

  function setupYear(){

    const year =
      new Date()
        .getFullYear();


    document
      .querySelectorAll(
        "[data-current-year]"
      )
      .forEach(
        function(element){

          element.textContent =
            year;

        }
      );

  }


  /* =======================================================
     ACTIVE PAGE
     ======================================================= */

  function setActivePage(){

    let current =
      location.pathname
        .split("/")
        .pop()
        .toLowerCase();


    /*
      GitHub Pages root:
      pathname may end with "/"
    */

    if(
      !current ||
      current === ""
    ){

      current =
        "index.html";

    }


    document
      .querySelectorAll(
        ".imo-desktop-menu a, .imo-mobile-menu a"
      )
      .forEach(
        function(link){

          const href =
            link.getAttribute(
              "href"
            );


          if(!href){
            return;
          }


          const clean =
            href
              .split("?")[0]
              .split("#")[0];


          const target =
            clean
              .split("/")
              .filter(Boolean)
              .pop()
              ?.toLowerCase();


          if(
            target === current ||
            (
              current === "index.html" &&
              (
                target ===
                "nurudeen-campaign-website-" ||
                target ===
                "index.html"
              )
            )
          ){

            link.classList.add(
              "imo-active"
            );

          }

        }
      );

  }


  /* =======================================================
     WHATSAPP BUTTON
     ======================================================= */

  function setupWhatsApp(){

    if(
      document.querySelector(
        ".imo-whatsapp"
      )
    ){
      return;
    }


    const button =
      document.createElement("a");

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

    button.title =
      "Chat with IMOLE 2027";

    button.innerHTML =
      "💬";


    document.body.appendChild(
      button
    );

  }


  /* =======================================================
     BACK TO TOP
     ======================================================= */

  function setupBackToTop(){

    if(
      document.querySelector(
        ".imo-scroll-top"
      )
    ){
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
      function(){

        if(
          window.scrollY >
          450
        ){

          button.classList.add(
            "imo-show"
          );

        }else{

          button.classList.remove(
            "imo-show"
          );

        }

      },
      {
        passive:true
      }
    );


    button.addEventListener(
      "click",
      function(){

        window.scrollTo({
          top:0,
          behavior:"smooth"
        });

      }
    );

  }


  /* =======================================================
     ELECTION DATE
     ======================================================= */

  function exposeElectionDate(){

    /*
      Election date:
      6 February 2027
    */

    const date =
      "6 February 2027";


    document
      .querySelectorAll(
        "[data-election-date]"
      )
      .forEach(
        function(element){

          element.textContent =
            date;

        }
      );


    document.documentElement
      .setAttribute(
        "data-election-date",
        date
      );

  }


  /* =======================================================
     SITE VERSION
     ======================================================= */

  function exposeVersion(){

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


  /* =======================================================
     SERVICE WORKER / CACHE PROTECTION
     ======================================================= */

  function handleOldServiceWorker(){

    /*
      The new homepage already unregisters old service
      workers. We also remove old registrations here
      when possible.

      This prevents an old cached campaign website from
      taking control of the new GitHub Pages version.
    */

    if(
      "serviceWorker" in navigator
    ){

      navigator.serviceWorker
        .getRegistrations()
        .then(
          function(registrations){

            registrations.forEach(
              function(registration){

                registration.unregister()
                  .catch(
                    function(){}
                  );

              }
            );

          }
        )
        .catch(
          function(){}
        );

    }

  }


  /* =======================================================
     IMAGE ERROR HANDLING
     ======================================================= */

  function setupImageProtection(){

    document
      .querySelectorAll("img")
      .forEach(
        function(image){

          image.addEventListener(
            "error",
            function(){

              /*
                Candidate image fallback.
              */

              if(
                image.hasAttribute(
                  "data-candidate-image"
                )
              ){

                image.src =
                  CANDIDATE_IMAGE;

                return;

              }


              /*
                Logo fallback.
              */

              if(
                image.hasAttribute(
                  "data-logo"
                )
              ){

                image.src =
                  NDC_LOGO;

              }

            }
          );

        }
      );

  }


  /* =======================================================
     SMOOTH INTERNAL NAVIGATION
     ======================================================= */

  function setupNavigationProtection(){

    document
      .querySelectorAll("a")
      .forEach(
        function(link){

          link.addEventListener(
            "click",
            function(){

              const href =
                link.getAttribute(
                  "href"
                );


              if(!href){
                return;
              }


              /*
                Never interfere with:
                - external links
                - WhatsApp
                - mailto
                - telephone
                - anchors
              */

              if(
                href.startsWith(
                  "http://"
                ) ||
                href.startsWith(
                  "https://"
                ) ||
                href.startsWith(
                  "mailto:"
                ) ||
                href.startsWith(
                  "tel:"
                ) ||
                href.startsWith(
                  "#"
                )
              ){

                return;

              }


              /*
                Make sure internal page links remain
                inside this GitHub Pages project.
              */

              if(
                href.startsWith(
                  "/"
                ) &&
                !href.startsWith(
                  SITE_ROOT
                )
              ){

                const filename =
                  href
                    .split("/")
                    .pop();


                if(
                  filename &&
                  filename.includes(".")
                ){

                  link.href =
                    SITE_ROOT +
                    filename;

                }

              }

            }
          );

        }
      );

  }


  /* =======================================================
     INITIALIZE
     ======================================================= */

  function initialize(){

    installStyles();

    hideLegacyNavigation();

    buildNavigation();

    buildFooter();

    setupMobileMenu();

    repairHomeLinks();

    setupCandidateImages();

    setupLogos();

    setupYear();

    setActivePage();

    setupWhatsApp();

    setupBackToTop();

    exposeElectionDate();

    exposeVersion();

    setupImageProtection();

    setupNavigationProtection();

    handleOldServiceWorker();

  }


  /* =======================================================
     START
     ======================================================= */

  if(
    document.readyState ===
    "loading"
  ){

    document.addEventListener(
      "DOMContentLoaded",
      initialize
    );

  }else{

    initialize();

  }


})();
