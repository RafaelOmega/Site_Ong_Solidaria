// js/features/navigation/menu.js
(function (global) {
  function initMenu() {
    var menuToggle = document.getElementById("menuToggle");
    var mobileMenu = document.getElementById("mobileMenu");
    var overlay = document.getElementById("overlay");

    if (menuToggle && mobileMenu && overlay) {
      menuToggle.addEventListener("click", function () {
        menuToggle.classList.toggle("active");
        mobileMenu.classList.toggle("active");
        overlay.classList.toggle("active");
        document.body.style.overflow = mobileMenu.classList.contains("active")
          ? "hidden"
          : "";
      });

      overlay.addEventListener("click", closeMobile);
      var links = mobileMenu.querySelectorAll("a");
      for (var i = 0; i < links.length; i++) {
        links[i].addEventListener("click", closeMobile);
      }

      function closeMobile() {
        menuToggle.classList.remove("active");
        mobileMenu.classList.remove("active");
        overlay.classList.remove("active");
        document.body.style.overflow = "";
      }
    }

    window.addEventListener("scroll", function () {
      var header = document.querySelector("header");
      if (!header) return;

      var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      header.style.boxShadow =
        scrollTop > 50
          ? "0 4px 12px rgba(0,0,0,0.15)"
          : "0 2px 5px rgba(0,0,0,0.2)";
    });
  }

  function initSmoothScroll(container) {
    var links = container.querySelectorAll('a[href^="#"]:not([href="#"])');
    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener("click", function (e) {
        var href = this.getAttribute("href");
        // Ignore SPA-style routes like "#/projetos" (not valid CSS selectors / not document anchors)
        if (href.indexOf("/") !== -1) return;
        var id = href.slice(1);
        if (!id) return;
        var target = document.getElementById(id);
        if (!target) return;
        e.preventDefault();
        var headerOffset = 80;
        var top =
          target.getBoundingClientRect().top +
          window.pageYOffset -
          headerOffset;
        window.scrollTo({ top: top, behavior: "smooth" });
      });
    }
  }

  function bindProjectFilters(container, onFilter) {
    var tags = container.querySelectorAll(".tag[data-filter]");
    for (var i = 0; i < tags.length; i++) {
      tags[i].addEventListener("click", function () {
        var filter = this.getAttribute("data-filter");
        var cards = container.querySelectorAll(".project-card");

        for (var j = 0; j < tags.length; j++) {
          tags[j].classList.remove("active");
        }
        this.classList.add("active");

        for (var k = 0; k < cards.length; k++) {
          var card = cards[k];
          var category = card.getAttribute("data-category");

          if (filter === "all" || category === filter) {
            card.style.display = "flex";
            card.style.opacity = "1";
            card.style.transform = "scale(1)";
          } else {
            card.style.opacity = "0";
            card.style.transform = "scale(0.9)";
            (function (cardEl) {
              setTimeout(function () {
                cardEl.style.display = "none";
              }, 300);
            })(card);
          }
        }

        if (onFilter) onFilter(filter);
      });
    }
  }

  global.Navigation = {
    initMenu: initMenu,
    initSmoothScroll: initSmoothScroll,
    bindProjectFilters: bindProjectFilters,
  };
})(window);
