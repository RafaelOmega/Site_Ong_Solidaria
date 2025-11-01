// js/features/animations/observer.js
(function (global) {
  var observer;

  function initObserver(container) {
    if (!("IntersectionObserver" in window)) return;
    if (!observer) {
      observer = new IntersectionObserver(
        function (entries) {
          for (var i = 0; i < entries.length; i++) {
            if (entries[i].isIntersecting) {
              entries[i].target.style.opacity = "1";
              entries[i].target.style.transform = "translateY(0)";
            }
          }
        },
        { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
      );
    }
    var animated = container.querySelectorAll(
      ".project-card, .impact-item, .team-member"
    );
    for (var i = 0; i < animated.length; i++) {
      animated[i].style.opacity = "0";
      animated[i].style.transform = "translateY(30px)";
      animated[i].style.transition = "opacity 0.6s ease, transform 0.6s ease";
      observer.observe(animated[i]);
    }

    var cards = container.querySelectorAll(".project-card");
    for (var j = 0; j < cards.length; j++) {
      cards[j].style.transition = "opacity 0.3s ease, transform 0.3s ease";
    }
  }

  global.Animations = {
    initObserver: initObserver,
  };
})(window);
