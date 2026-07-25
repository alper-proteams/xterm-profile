(function () {
  "use strict";

  var config = {
    measurementId: "G-ZJ69ZQH601",
    consentStorageKey: "portfolio-analytics-consent",
    productionHosts: ["alpersemerci.com", "www.alpersemerci.com"]
  };

  var consentState = readConsent();
  var tagLoaded = false;

  function readConsent() {
    try {
      var savedConsent = window.localStorage.getItem(config.consentStorageKey);
      return savedConsent === "accepted" || savedConsent === "denied" ? savedConsent : "unknown";
    } catch (error) {
      return "unknown";
    }
  }

  function saveConsent(value) {
    try {
      window.localStorage.setItem(config.consentStorageKey, value);
    } catch (error) {
      // Storage may be unavailable in private or restricted browsing contexts.
    }
  }

  function isProductionHost() {
    return config.productionHosts.indexOf(window.location.hostname) !== -1;
  }

  function hasValidMeasurementId() {
    return /^G-[A-Z0-9]+$/i.test(config.measurementId);
  }

  function analyticsEnabled() {
    return consentState === "accepted" && tagLoaded && typeof window.gtag === "function";
  }

  function loadGoogleTag() {
    if (tagLoaded || consentState !== "accepted" || !isProductionHost() || !hasValidMeasurementId()) {
      return;
    }

    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () {
      window.dataLayer.push(arguments);
    };

    window.gtag("consent", "default", {
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: "granted",
      functionality_storage: "granted",
      personalization_storage: "denied",
      security_storage: "granted"
    });
    window.gtag("set", "allow_google_signals", false);
    window.gtag("set", "allow_ad_personalization_signals", false);
    window.gtag("js", new Date());
    window.gtag("config", config.measurementId, {
      page_location: window.location.origin + window.location.pathname,
      send_page_view: true,
      transport_type: "beacon"
    });

    var script = document.createElement("script");
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(config.measurementId);
    script.dataset.portfolioAnalytics = "true";
    document.head.appendChild(script);
    tagLoaded = true;
  }

  function deleteAnalyticsCookies() {
    var cookieNames = document.cookie
      .split(";")
      .map(function (cookie) {
        return cookie.split("=")[0].trim();
      })
      .filter(function (name) {
        return name.indexOf("_ga") === 0;
      });

    var hostname = window.location.hostname;
    var domains = [hostname, "." + hostname];

    if (hostname === "www.alpersemerci.com") {
      domains.push("alpersemerci.com", ".alpersemerci.com");
    }

    cookieNames.forEach(function (name) {
      document.cookie = name + "=; Max-Age=0; path=/; SameSite=Lax";
      domains.forEach(function (domain) {
        document.cookie = name + "=; Max-Age=0; path=/; domain=" + domain + "; SameSite=Lax";
      });
    });
  }

  function privacyUrl() {
    if (window.location.pathname.indexOf("/case-studies/") !== -1) {
      return "../../privacy/";
    }

    if (window.location.pathname.indexOf("/privacy/") !== -1) {
      return "./";
    }

    return "privacy/";
  }

  function createConsentBanner() {
    var panel = document.createElement("aside");
    panel.className = "analytics-consent";
    panel.id = "analytics-consent";
    panel.setAttribute("role", "region");
    panel.setAttribute("aria-label", "Analytics privacy settings");
    panel.hidden = true;
    panel.innerHTML =
      '<div class="analytics-consent__copy">' +
        '<strong>Privacy-first analytics</strong>' +
        '<p>I use Google Analytics only with your permission to understand which portfolio pages are useful. No advertising or personalization is enabled. <a href="' + privacyUrl() + '">Privacy details</a>.</p>' +
        '<p class="analytics-consent__status" aria-live="polite"></p>' +
      "</div>" +
      '<div class="analytics-consent__actions">' +
        '<button type="button" data-analytics-choice="accepted">Accept analytics</button>' +
        '<button type="button" data-analytics-choice="denied">Decline</button>' +
      "</div>";

    document.body.appendChild(panel);
    return panel;
  }

  var consentBanner;

  function updateConsentStatus() {
    if (!consentBanner) {
      return;
    }

    var status = consentBanner.querySelector(".analytics-consent__status");
    if (!status) {
      return;
    }

    if (consentState === "accepted") {
      status.textContent = "Analytics is currently enabled.";
    } else if (consentState === "denied") {
      status.textContent = "Analytics is currently disabled.";
    } else {
      status.textContent = "";
    }
  }

  function showConsentBanner() {
    if (!consentBanner) {
      consentBanner = createConsentBanner();
    }

    updateConsentStatus();
    consentBanner.hidden = false;
  }

  function hideConsentBanner() {
    if (consentBanner) {
      consentBanner.hidden = true;
    }
  }

  function setConsent(value) {
    var previousState = consentState;
    consentState = value;
    saveConsent(value);
    updateConsentStatus();
    hideConsentBanner();

    if (value === "accepted") {
      loadGoogleTag();
      return;
    }

    deleteAnalyticsCookies();

    if (previousState === "accepted" && isProductionHost()) {
      window.location.reload();
    }
  }

  function sendEvent(name, parameters) {
    if (!analyticsEnabled()) {
      return;
    }

    window.gtag("event", name, parameters || {});
  }

  function bindConsentControls() {
    document.addEventListener("click", function (event) {
      var choiceButton = event.target.closest("[data-analytics-choice]");
      if (choiceButton) {
        setConsent(choiceButton.getAttribute("data-analytics-choice"));
        return;
      }

      var settingsButton = event.target.closest("[data-analytics-settings]");
      if (settingsButton) {
        showConsentBanner();
      }
    });
  }

  function bindPortfolioEvents() {
    document.addEventListener("click", function (event) {
      var link = event.target.closest("a");
      if (!link) {
        return;
      }

      if (link.protocol === "mailto:") {
        sendEvent("contact_click", {
          contact_method: "email",
          link_url: "mailto:",
          page_path: window.location.pathname,
          transport_type: "beacon"
        });
      }

      var caseStudyId = link.getAttribute("data-analytics-case-study");
      if (caseStudyId) {
        sendEvent("select_content", {
          content_type: "case_study",
          item_id: caseStudyId,
          transport_type: "beacon"
        });
      }
    });

    var pdfButton = document.getElementById("pdf-download");
    if (pdfButton) {
      pdfButton.addEventListener("click", function () {
        sendEvent("pdf_print", {
          page_path: window.location.pathname,
          transport_type: "beacon"
        });
      });
    }
  }

  function initialize() {
    consentBanner = createConsentBanner();
    bindConsentControls();
    bindPortfolioEvents();

    if (consentState === "accepted") {
      loadGoogleTag();
    } else if (consentState === "unknown") {
      showConsentBanner();
    }
  }

  window.portfolioAnalytics = {
    getConsent: function () {
      return consentState;
    },
    openSettings: showConsentBanner
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize);
  } else {
    initialize();
  }
})();
