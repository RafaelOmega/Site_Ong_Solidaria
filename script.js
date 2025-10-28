// Variáveis globais
var observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
var observer = new IntersectionObserver(function (entries) {
  for (var i = 0; i < entries.length; i++) {
    if (entries[i].isIntersecting) {
      entries[i].target.style.opacity = "1";
      entries[i].target.style.transform = "translateY(0)";
    }
  }
}, observerOptions);

var isSubmitting = false;

var projectDetails = {
  educacao: {
    title: "Projeto Sementes do Amanhã",
    content:
      '<p><strong>Objetivo:</strong> Reduzir a evasão escolar e melhorar o desempenho acadêmico de crianças e adolescentes em situação de vulnerabilidade social.</p><p><strong>Atividades:</strong></p><ul style="padding-left: 24px; margin-bottom: 16px;"><li style="margin-bottom: 8px;">Aulas de reforço escolar em Português e Matemática</li><li style="margin-bottom: 8px;">Oficinas de leitura e produção de texto</li><li style="margin-bottom: 8px;">Atividades lúdicas e recreativas</li><li style="margin-bottom: 8px;">Acompanhamento pedagógico individualizado</li></ul><p><strong>Público-alvo:</strong> Crianças e adolescentes de 7 a 14 anos</p><p><strong>Local:</strong> Sede da ONG e escolas parceiras</p><p><strong>Horário:</strong> Segunda a sexta, das 14h às 17h</p>',
  },
  saude: {
    title: "Saúde na Comunidade",
    content:
      '<p><strong>Objetivo:</strong> Promover o acesso à saúde básica para comunidades carentes, com foco em prevenção e educação em saúde.</p><p><strong>Atividades:</strong></p><ul style="padding-left: 24px; margin-bottom: 16px;"><li style="margin-bottom: 8px;">Campanhas de vacinação</li><li style="margin-bottom: 8px;">Aferição de pressão arterial e glicemia</li><li style="margin-bottom: 8px;">Palestras sobre higiene e prevenção de doenças</li><li style="margin-bottom: 8px;">Distribuição de kits de higiene</li></ul><p><strong>Público-alvo:</strong> Famílias em situação de vulnerabilidade</p><p><strong>Local:</strong> Comunidades periféricas da cidade</p><p><strong>Frequência:</strong> Ações mensais aos sábados</p>',
  },
  "meio-ambiente": {
    title: "Verdejar o Futuro",
    content:
      '<p><strong>Objetivo:</strong> Promover a consciência ambiental e ações práticas de preservação do meio ambiente.</p><p><strong>Atividades:</strong></p><ul style="padding-left: 24px; margin-bottom: 16px;"><li style="margin-bottom: 8px;">Plantio de árvores nativas</li><li style="margin-bottom: 8px;">Mutirões de limpeza em praças e parques</li><li style="margin-bottom: 8px;">Oficinas de reciclagem e compostagem</li><li style="margin-bottom: 8px;">Palestras sobre sustentabilidade</li></ul><p><strong>Público-alvo:</strong> Comunidade em geral</p><p><strong>Local:</strong> Áreas verdes urbanas</p><p><strong>Frequência:</strong> Ações quinzenais aos domingos</p>',
  },
  assistencia: {
    title: "Mesa Farta",
    content:
      '<p><strong>Objetivo:</strong> Combater a insegurança alimentar através da distribuição de alimentos nutritivos para famílias em situação de vulnerabilidade.</p><p><strong>Atividades:</strong></p><ul style="padding-left: 24px; margin-bottom: 16px;"><li style="margin-bottom: 8px;">Arrecadação de alimentos não perecíveis</li><li style="margin-bottom: 8px;">Distribuição de cestas básicas</li><li style="margin-bottom: 8px;">Preparo e distribuição de refeições</li><li style="margin-bottom: 8px;">Orientação nutricional</li></ul><p><strong>Público-alvo:</strong> Famílias em insegurança alimentar</p><p><strong>Local:</strong> Sede da ONG</p><p><strong>Frequência:</strong> Distribuição semanal às quartas-feiras</p>',
  },
};

function handleFilterClick() {
  var filterTags = document.querySelectorAll(".tag[data-filter]");
  var projectCards = document.querySelectorAll(".project-card");
  var filter = this.getAttribute("data-filter");
  var j, k, card, category;

  for (j = 0; j < filterTags.length; j++) {
    filterTags[j].classList.remove("active");
  }
  this.classList.add("active");

  for (k = 0; k < projectCards.length; k++) {
    card = projectCards[k];
    category = card.getAttribute("data-category");

    if (filter === "all" || category === filter) {
      card.style.display = "flex";
      card.style.opacity = "1";
      card.style.transform = "scale(1)";
    } else {
      card.style.opacity = "0";
      card.style.transform = "scale(0.9)";
      setTimeout(
        (function (cardElement) {
          return function () {
            cardElement.style.display = "none";
          };
        })(card),
        300
      );
    }
  }
}

function validateField(field) {
  var value = field.value.trim();
  var isValid = true;

  field.classList.remove("error", "success");

  if (field.hasAttribute("required") && !value) {
    isValid = false;
  }

  if (field.type === "email" && value) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      isValid = false;
    }
  }

  if (field.hasAttribute("pattern") && value) {
    var pattern = new RegExp(field.getAttribute("pattern"));
    if (!pattern.test(value)) {
      isValid = false;
    }
  }

  if (field.id === "cpf" && value) {
    var cpfClean = value.replace(/\D/g, "");
    if (!validarCPF(cpfClean)) {
      isValid = false;
    }
  }

  if (isValid && value) {
    field.classList.add("success");
  } else if (!isValid) {
    field.classList.add("error");
  }

  return isValid;
}

function validarCPF(cpf) {
  var i, soma, resto, digitoVerificador1, digitoVerificador2;
  cpf = cpf.replace(/\D/g, "");
  if (cpf.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(cpf)) return false;

  soma = 0;
  for (i = 0; i < 9; i++) {
    soma += parseInt(cpf.charAt(i)) * (10 - i);
  }
  resto = 11 - (soma % 11);
  digitoVerificador1 = resto >= 10 ? 0 : resto;
  if (digitoVerificador1 !== parseInt(cpf.charAt(9))) return false;

  soma = 0;
  for (i = 0; i < 10; i++) {
    soma += parseInt(cpf.charAt(i)) * (11 - i);
  }
  resto = 11 - (soma % 11);
  digitoVerificador2 = resto >= 10 ? 0 : resto;
  if (digitoVerificador2 !== parseInt(cpf.charAt(10))) return false;

  return true;
}

function showToast(title, message, type) {
  if (!type) type = "info";
  var toastContainer = document.getElementById("toastContainer");
  if (!toastContainer) return;

  var toast = document.createElement("div");
  toast.className = "toast toast-" + type;

  var icons = { success: "✓", error: "✕", warning: "⚠", info: "ℹ" };
  var icon = icons[type] || icons.info;

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
    '<button class="toast-close" onclick="this.parentElement.remove()">&times;</button>';

  toastContainer.appendChild(toast);

  setTimeout(function () {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(100%)";
    setTimeout(function () {
      toast.remove();
    }, 300);
  }, 5000);
}

function showContactModal() {
  var modal = document.getElementById("contactModal");
  if (modal) {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

function closeContactModal() {
  var modal = document.getElementById("contactModal");
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }
}

function submitContactForm() {
  var name = document.getElementById("modalName").value.trim();
  var email = document.getElementById("modalEmail").value.trim();
  var message = document.getElementById("modalMessage").value.trim();

  if (!name || !email || !message) {
    showToast(
      "Campos obrigatórios",
      "Por favor, preencha todos os campos.",
      "warning"
    );
    return;
  }

  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showToast(
      "E-mail inválido",
      "Por favor, insira um e-mail válido.",
      "error"
    );
    return;
  }

  console.log("Mensagem enviada:", {
    name: name,
    email: email,
    message: message,
  });
  showToast(
    "Mensagem enviada!",
    "Obrigado pelo contato. Responderemos em breve.",
    "success"
  );
  closeContactModal();
  document.getElementById("contactForm").reset();
}

function showProjectModal(projectId) {
  var modal = document.getElementById("projectModal");
  var title = document.getElementById("projectModalTitle");
  var body = document.getElementById("projectModalBody");

  if (modal && projectDetails[projectId]) {
    title.textContent = projectDetails[projectId].title;
    body.innerHTML = projectDetails[projectId].content;
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

function closeProjectModal() {
  var modal = document.getElementById("projectModal");
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }
}

function showDonateAlert() {
  showToast(
    "Obrigado pelo interesse!",
    "Em breve teremos a plataforma de doação online disponível. Por enquanto, use as opções de transferência bancária ou PIX.",
    "info"
  );
}

function closeAlert(alertId) {
  var alert = document.getElementById(alertId);
  if (alert) {
    alert.style.opacity = "0";
    alert.style.transform = "translateY(-20px)";
    setTimeout(function () {
      alert.style.display = "none";
    }, 300);
  }
}

function initSmoothScroll() {
  var allLinks = document.querySelectorAll('a[href^="#"]');
  var i;
  for (i = 0; i < allLinks.length; i++) {
    allLinks[i].addEventListener("click", function (e) {
      var href = this.getAttribute("href");
      if (href === "#") return;
      e.preventDefault();
      var target = document.querySelector(href);
      if (target) {
        var headerOffset = 80;
        var elementPosition = target.getBoundingClientRect().top;
        var offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", function () {
  var menuToggle = document.getElementById("menuToggle");
  var mobileMenu = document.getElementById("mobileMenu");
  var overlay = document.getElementById("overlay");
  var i, mobileLinks, cpfInput, phoneInput, cepInput;
  var registrationForm, inputs, filterTags, projectCards, animatedElements;

  if (menuToggle && mobileMenu && overlay) {
    menuToggle.addEventListener("click", function () {
      menuToggle.classList.toggle("active");
      mobileMenu.classList.toggle("active");
      overlay.classList.toggle("active");
      document.body.style.overflow = mobileMenu.classList.contains("active")
        ? "hidden"
        : "";
    });

    overlay.addEventListener("click", function () {
      menuToggle.classList.remove("active");
      mobileMenu.classList.remove("active");
      overlay.classList.remove("active");
      document.body.style.overflow = "";
    });

    mobileLinks = mobileMenu.querySelectorAll("a");
    for (i = 0; i < mobileLinks.length; i++) {
      mobileLinks[i].addEventListener("click", function () {
        menuToggle.classList.remove("active");
        mobileMenu.classList.remove("active");
        overlay.classList.remove("active");
        document.body.style.overflow = "";
      });
    }
  }

  cpfInput = document.getElementById("cpf");
  if (cpfInput) {
    cpfInput.addEventListener("input", function (e) {
      var value = e.target.value.replace(/\D/g, "");
      value = value.replace(/(\d{3})(\d)/, "$1.$2");
      value = value.replace(/(\d{3})(\d)/, "$1.$2");
      value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
      e.target.value = value;
    });
  }

  phoneInput = document.getElementById("phone");
  if (phoneInput) {
    phoneInput.addEventListener("input", function (e) {
      var value = e.target.value.replace(/\D/g, "");
      if (value.length > 11) value = value.substring(0, 11);
      value = value.replace(/^(\d\d)(\d)/g, "($1) $2");
      value = value.replace(/(\d{5})(\d)/, "$1-$2");
      e.target.value = value;
    });
  }

  cepInput = document.getElementById("cep");
  if (cepInput) {
    cepInput.addEventListener("input", function (e) {
      var value = e.target.value.replace(/\D/g, "");
      value = value.replace(/^(\d{5})(\d)/, "$1-$2");
      e.target.value = value;
    });
  }

  registrationForm = document.getElementById("registrationForm");
  if (registrationForm) {
    inputs = registrationForm.querySelectorAll("input, select");

    for (i = 0; i < inputs.length; i++) {
      inputs[i].addEventListener("blur", function () {
        validateField(this);
      });

      inputs[i].addEventListener("input", function () {
        if (this.classList.contains("error")) {
          validateField(this);
        }
      });
    }

    registrationForm.addEventListener("submit", function (event) {
      event.preventDefault();
      var isValid = true;
      var i2, formElements, element;

      for (i2 = 0; i2 < inputs.length; i2++) {
        if (!validateField(inputs[i2])) {
          isValid = false;
        }
      }

      if (isValid) {
        console.log("Dados do formulário:");
        formElements = registrationForm.elements;
        for (i2 = 0; i2 < formElements.length; i2++) {
          element = formElements[i2];
          if (element.name && element.value) {
            console.log(element.name + ": " + element.value);
          }
        }

        showToast(
          "Cadastro realizado com sucesso!",
          "Seus dados foram enviados. Entraremos em contato em breve.",
          "success"
        );

        setTimeout(function () {
          var i3;
          registrationForm.reset();
          for (i3 = 0; i3 < inputs.length; i3++) {
            inputs[i3].classList.remove("success", "error");
          }
        }, 2000);
      } else {
        showToast(
          "Erro no formulário",
          "Por favor, corrija os campos destacados em vermelho.",
          "error"
        );
      }
    });
  }

  filterTags = document.querySelectorAll(".tag[data-filter]");
  projectCards = document.querySelectorAll(".project-card");

  for (i = 0; i < filterTags.length; i++) {
    filterTags[i].addEventListener("click", handleFilterClick);
  }

  for (i = 0; i < projectCards.length; i++) {
    projectCards[i].style.transition = "opacity 0.3s ease, transform 0.3s ease";
  }

  animatedElements = document.querySelectorAll(
    ".project-card, .impact-item, .team-member"
  );
  for (i = 0; i < animatedElements.length; i++) {
    animatedElements[i].style.opacity = "0";
    animatedElements[i].style.transform = "translateY(30px)";
    animatedElements[i].style.transition =
      "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(animatedElements[i]);
  }

  initSmoothScroll();
});

window.addEventListener("click", function (e) {
  var modal = document.getElementById("contactModal");
  if (e.target === modal) closeContactModal();

  var projectModal = document.getElementById("projectModal");
  if (e.target === projectModal) closeProjectModal();
});

window.addEventListener("scroll", function () {
  var header = document.querySelector("header");
  if (header) {
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > 50) {
      header.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
    } else {
      header.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.2)";
    }
  }
});

document.addEventListener("submit", function (e) {
  if (isSubmitting) {
    e.preventDefault();
    return;
  }
  var form = e.target;
  if (form.tagName === "FORM") {
    isSubmitting = true;
    setTimeout(function () {
      isSubmitting = false;
    }, 3000);
  }
});

console.log(
  "%c🌟 ONG Solidária - Site Oficial",
  "color: #27ae60; font-size: 20px; font-weight: bold;"
);
console.log(
  "%cDesenvolvido com ❤️ para fazer a diferença!",
  "color: #2c3e50; font-size: 14px;"
);
