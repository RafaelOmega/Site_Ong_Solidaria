// js/features/ui/toast.js
(function (global) {
  function showToast(title, message, type) {
    if (!type) type = "info";
    var container = document.getElementById("toastContainer");
    if (!container) return;

    var toast = document.createElement("div");
    toast.className = "toast toast-" + type;

    var icons = { success: "✓", error: "✕", warning: "⚠", info: "ℹ" };

    toast.innerHTML =
      '<span class="toast-icon">' +
      icon +
      "</span>" +
      '<div class="toast-content">' +
      '<div class="toast-title">' +
      title +
      "</div>" +
      '<div class="toast-message">' +
      message +
      "</div>" +
      "</div>" +
      '<button class="toast-close" aria-label="Fechar notificação">&times;</button>';

    toast.querySelector(".toast-close").addEventListener("click", function () {
      toast.remove();
    });

    container.appendChild(toast);

    setTimeout(function () {
      toast.style.opacity = "0";
      toast.style.transform = "translateX(100%)";
      setTimeout(function () {
        toast.remove();
      }, 300);
    }, 5000);
  }

  global.UIToast = { showToast: showToast };
})(window);
