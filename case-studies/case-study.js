(function () {
  var storageKey = "portfolio-theme";
  var root = document.documentElement;
  var toggle = document.getElementById("theme-toggle");

  var getSystemTheme = function () {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  };

  var getSavedTheme = function () {
    try {
      return localStorage.getItem(storageKey);
    } catch (error) {
      return null;
    }
  };

  var saveTheme = function (theme) {
    try {
      localStorage.setItem(storageKey, theme);
    } catch (error) {
      // Theme persistence is optional.
    }
  };

  var applyTheme = function (theme) {
    root.setAttribute("data-theme", theme);

    if (toggle) {
      var nextTheme = theme === "dark" ? "light" : "dark";
      toggle.textContent = nextTheme;
      toggle.setAttribute("aria-label", "Switch to " + nextTheme + " theme");
    }
  };

  applyTheme(getSavedTheme() || getSystemTheme());

  if (toggle) {
    toggle.addEventListener("click", function () {
      var currentTheme = root.getAttribute("data-theme") || "light";
      var nextTheme = currentTheme === "dark" ? "light" : "dark";
      applyTheme(nextTheme);
      saveTheme(nextTheme);
    });
  }
})();
