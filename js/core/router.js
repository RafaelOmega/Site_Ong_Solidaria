// js/core/router.js
(function (global) {
  var routes = {};
  var postRenderHooks = {};

  function render(route) {
    var app = document.getElementById("app");
    if (!app) {
      return;
    }

    var templateFn = routes[route];
    if (typeof templateFn !== "function") {
      return;
    }

    app.innerHTML = templateFn();

    if (postRenderHooks[route]) {
      postRenderHooks[route]();
    }
    if (postRenderHooks["*"]) {
      postRenderHooks["*"]();
    }

    setActiveNav(route);
  }

  function getRouteFromHash() {
    var raw =
      global.location && typeof global.location.hash === "string"
        ? global.location.hash
        : "";
    var cleaned = raw.replace(/^#/, "");
    if (!cleaned) {
      return "/";
    }
    var path = cleaned.split("?")[0].split("#")[0];
    return path.charAt(0) === "/" ? path : "/" + path;
  }

  function setActiveNav(route) {
    var links = document.querySelectorAll(
      'nav a[data-route], .mobile-menu a[href^="#/"]'
    );
    for (var i = 0; i < links.length; i++) {
      var href = links[i].getAttribute("href");
      var dataRoute = links[i].getAttribute("data-route");
      var normalized = href ? href.replace(/^#/, "") : "";

      if (dataRoute === route || normalized === route) {
        links[i].classList.add("active");
      } else {
        links[i].classList.remove("active");
      }
    }
  }

  function onHashChange() {
    render(getRouteFromHash());
  }

  function register(path, templateFn, hook) {
    routes[path] = templateFn;
    if (hook) {
      postRenderHooks[path] = hook;
    }
  }

  function afterEach(hook) {
    postRenderHooks["*"] = hook;
  }

  function init() {
    global.addEventListener("hashchange", onHashChange);
    render(getRouteFromHash());
  }

  global.Router = {
    register: register,
    afterEach: afterEach,
    init: init,
  };
})(window);
