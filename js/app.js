// js/app.js
(function () {
  function homeHook() {
    var container = document.getElementById("app");
    Modal.bindGlobalModalTriggers(container);
    Navigation.initSmoothScroll(container);
    Animations.initObserver(container);
  }

  function getSecondaryAnchorFromHash() {
    // Exemplos suportados:
    // "#/projetos#educacao", "#/projetos#saude", "#/projetos"
    var h =
      window.location && typeof window.location.hash === "string"
        ? window.location.hash
        : "";
    if (!h) {
      return null;
    }
    // Caso padrão "#/projetos#<ancora>"
    if (h.indexOf("#/projetos#") === 0) {
      var parts = h.split("#/projetos#");
      return parts[1] ? parts[1] : null;
    }
    // Caso genérico: existe uma segunda # após "#/projetos"
    var idxRoute = h.indexOf("#/projetos");
    if (idxRoute > -1) {
      var idxSecond = h.indexOf("#", idxRoute + 1);
      if (idxSecond > -1) {
        var anchor = h.substring(idxSecond + 1);
      }
    }
    return null;
  }

  function projetosHook() {
    var container = document.getElementById("app");
    Modal.bindGlobalModalTriggers(container);
    Navigation.bindProjectFilters(container);
    Animations.initObserver(container);

    var anchor = getSecondaryAnchorFromHash();
    if (anchor) {
      var el = document.getElementById(anchor);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }

  function cadastroHook() {
    var container = document.getElementById("app");
    FormValidation.bindFormValidation(container);
    Animations.initObserver(container);
    var infoAlert = container.querySelector("#infoAlert");
    if (infoAlert) {
      infoAlert.style.display = "flex";
    }
  }

  // Registro das rotas (garanta que AppTemplates.* existem)
  Router.register("/", AppTemplates.home, homeHook);
  Router.register("/projetos", AppTemplates.projetos, projetosHook);
  Router.register("/cadastro", AppTemplates.cadastro, cadastroHook);

  Router.afterEach(function () {
    // pós-render global (se necessário)
  });

  document.addEventListener("DOMContentLoaded", function () {
    Navigation.initMenu();
    Router.init();
  });
})();
