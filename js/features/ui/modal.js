// js/features/ui/modal.js
(function (global) {
  var projectDetails = {
    educacao: {
      title: "Projeto Sementes do Amanhã",
      content:
        '<p><strong>Objetivo:</strong> Reduzir a evasão escolar e melhorar o desempenho acadêmico.</p><ul style="padding-left:24px; margin-bottom:16px;"><li style="margin-bottom:8px;">Reforço escolar</li><li style="margin-bottom:8px;">Oficinas de leitura</li></ul>',
    },
    saude: {
      title: "Saúde na Comunidade",
      content:
        "<p><strong>Objetivo:</strong> Promover acesso à saúde básica com foco em prevenção.</p>",
    },
    "meio-ambiente": {
      title: "Verdejar o Futuro",
      content:
        "<p><strong>Objetivo:</strong> Consciência ambiental e ações práticas de preservação.</p>",
    },
    assistencia: {
      title: "Mesa Farta",
      content:
        "<p><strong>Objetivo:</strong> Combater a insegurança alimentar com distribuição de alimentos.</p>",
    },
  };

  function openContactModal() {
    var modal = document.getElementById("contactModal");
    if (!modal) {
      return;
    }

    modal.className = "modal active";
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    modal.innerHTML = [
      '<div class="modal-content" role="dialog" aria-modal="true" aria-labelledby="contactModalTitle">',
      '  <div class="modal-header">',
      '    <h3 class="modal-title" id="contactModalTitle">Envie sua Mensagem</h3>',
      '    <button class="modal-close" aria-label="Fechar">&times;</button>',
      "  </div>",
      '  <div class="modal-body">',
      '    <form id="contactForm">',
      '      <div class="form-group">',
      '        <label for="modalName">Nome:</label>',
      '        <input type="text" id="modalName" name="name" required />',
      "  </div>",
      '      <div class="form-group">',
      '        <label for="modalEmail">E-mail:</label>',
      '        <input type="email" id="modalEmail" name="email" required />',
      "      </div>",
      '      <div class="form-group">',
      '        <label for="modalMessage">Mensagem:</label>',
      '        <textarea id="modalMessage" name="message" rows="5" required></textarea>',
      "      </div>",
      "    </form>",
      "  </div>",
      '  <div class="modal-footer">',
      '    <button class="btn" data-close>Cancelar</button>',
      '    <button class="btn btn-primary" data-submit>Enviar</button>',
      "  </div>",
      "</div>",
    ].join("");

    var closeBtn = modal.querySelector(".modal-close");
    if (closeBtn) {
      closeBtn.addEventListener("click", closeContactModal);
    }

    var btnCancel = modal.querySelector("[data-close]");
    if (btnCancel) {
      btnCancel.addEventListener("click", closeContactModal);
    }

    var btnSubmit = modal.querySelector("[data-submit]");
    if (btnSubmit) {
      btnSubmit.addEventListener("click", submitContactForm);
    }

    modal.addEventListener("click", function (e) {
      if (e.target === modal) {
        closeContactModal();
      }
    });
  }

  function closeContactModal() {
    var modal = document.getElementById("contactModal");
    if (!modal) {
      return;
    }
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    modal.innerHTML = "";
  }

  function submitContactForm() {
    var nameEl = document.getElementById("modalName");
    var emailEl = document.getElementById("modalEmail");
    var msgEl = document.getElementById("modalMessage");

    var name = (nameEl && nameEl.value ? nameEl.value : "").trim();
    var email = (emailEl && emailEl.value ? emailEl.value : "").trim();
    var message = (msgEl && msgEl.value ? msgEl.value : "").trim();

    // CORREÇÃO: Adicionar a condição if que estava faltando
    if (!name || !email || !message) {
      UIToast.showToast(
        "Campos obrigatórios",
        "Por favor, preencha todos os campos.",
        "warning"
      );
      return;
    }

    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      UIToast.showToast(
        "E-mail inválido",
        "Por favor, insira um e-mail válido.",
        "error"
      );
      return;
    }

    UIToast.showToast(
      "Mensagem enviada!",
      "Obrigado pelo contato. Responderemos em breve.",
      "success"
    );
    closeContactModal();
  }

  function openProjectModal(projectId) {
    var details = projectDetails[projectId];
    if (!details) {
      return;
    }

    var modal = document.getElementById("projectModal");
    if (!modal) {
      return;
    }

    modal.className = "modal active";
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    modal.innerHTML = [
      '<div class="modal-content" role="dialog" aria-modal="true" aria-labelledby="projectModalTitle">',
      '  <div class="modal-header">',
      '    <h3 class="modal-title" id="projectModalTitle">' +
        details.title +
        "</h3>",
      '    <button class="modal-close" aria-label="Fechar">&times;</button>',
      "  </div>",
      '  <div class="modal-body" id="projectModalBody">' +
        details.content +
        "</div>",
      '  <div class="modal-footer">',
      '    <button class="btn" data-close>Fechar</button>',
      '    <a href="#/cadastro" class="btn btn-primary">Quero Participar</a>',
      "  </div>",
      "</div>",
    ].join("");

    var closeBtn = modal.querySelector(".modal-close");
    if (closeBtn) {
      closeBtn.addEventListener("click", closeProjectModal);
    }

    var btnClose = modal.querySelector("[data-close]");
    if (btnClose) {
      btnClose.addEventListener("click", closeProjectModal);
    }

    modal.addEventListener("click", function (e) {
      if (e.target === modal) {
        closeProjectModal();
      }
    });
  }

  function closeProjectModal() {
    var modal = document.getElementById("projectModal");
    if (!modal) {
      return;
    }
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    modal.innerHTML = "";
  }

  function bindGlobalModalTriggers(container) {
    if (!container) {
      return;
    }

    var btnContact = container.querySelector("[data-open-contact]");
    if (btnContact) {
      btnContact.addEventListener("click", openContactModal);
    }

    var projectBtns = container.querySelectorAll("[data-open-project]");
    for (var i = 0; i < projectBtns.length; i++) {
      projectBtns[i].addEventListener("click", function () {
        var id = this.getAttribute("data-open-project");
        openProjectModal(id);
      });
    }
  }

  global.Modal = {
    openContactModal: openContactModal,
    closeContactModal: closeContactModal,
    openProjectModal: openProjectModal,
    closeProjectModal: closeProjectModal,
    bindGlobalModalTriggers: bindGlobalModalTriggers,
  };
})(window);
