// js/features/forms/validation.js
(function (global) {
  var isSubmitting = false;

  function validarCPF(cpf) {
    if (cpf.length !== 11) return false;
    if (/^(\d)\1{10}$/.test(cpf)) return false;

    var i, soma, resto, dig1, dig2;
    soma = 0;
    for (i = 0; i < 9; i++) soma += parseInt(cpf.charAt(i), 10) * (10 - i);
    resto = 11 - (soma % 11);
    dig1 = resto >= 10 ? 0 : resto;
    if (dig1 !== parseInt(cpf.charAt(9), 10)) return false;

    soma = 0;
    for (i = 0; i < 10; i++) soma += parseInt(cpf.charAt(i), 10) * (11 - i);
    resto = 11 - (soma % 11);
    dig2 = resto >= 10 ? 0 : resto;
    if (dig2 !== parseInt(cpf.charAt(10), 10)) return false;

    return true;
  }

  function validateField(field) {
    var isValid = true;
    var value =
      field && typeof field.value === "string" ? field.value.trim() : "";

    field.classList.remove("error", "success");

    if (field.hasAttribute("required") && !value) isValid = false;

    if (field.type === "email" && value) {
      var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) isValid = false;
    }

    if (field.hasAttribute("pattern") && value) {
      var pattern = new RegExp(field.getAttribute("pattern"));
      if (!pattern.test(value)) isValid = false;
    }

    if (field.id === "cpf" && value) {
      var cpfClean = value.replace(/\D/g, "");
      if (!validarCPF(cpfClean)) isValid = false;
    }

    if (isValid && value) {
      field.classList.add("success");
    } else if (!isValid) {
      field.classList.add("error");
    }

    return isValid;
  }

  function maskers(container) {
    var cpfInput = container.querySelector("#cpf");
    if (cpfInput) {
      cpfInput.addEventListener("input", function (e) {
        var v = e.target.value.replace(/\D/g, "");
        v = v.replace(/(\d{3})(\d)/, "$1.$2");
        v = v.replace(/(\d{3})(\d)/, "$1.$2");
        v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
        e.target.value = v;
      });
    }
    var phoneInput = container.querySelector("#phone");
    if (phoneInput) {
      phoneInput.addEventListener("input", function (e) {
        var v = e.target.value.replace(/\D/g, "");
        if (v.length > 11) v = v.substring(0, 11);
        v = v.replace(/^(\d\d)(\d)/g, "($1) $2");
        v = v.replace(/(\d{5})(\d)/, "$1-$2");
        e.target.value = v;
      });
    }
    var cepInput = container.querySelector("#cep");
    if (cepInput) {
      cepInput.addEventListener("input", function (e) {
        var v = e.target.value.replace(/\D/g, "");
        v = v.replace(/^(\d{5})(\d)/, "$1-$2");
        e.target.value = v;
      });
    }
  }

  function saveDraft(form) {
    var data = {};
    var elements = form.querySelectorAll("input, select, textarea");
    for (var i = 0; i < elements.length; i++) {
      var el = elements[i];
      if (el.name) data[el.name] = el.value;
    }
    try {
      localStorage.setItem("registrationDraft", JSON.stringify(data));
    } catch (e) {}
  }

  function restoreDraft(form) {
    try {
      var raw = localStorage.getItem("registrationDraft");
      if (!raw) return;
      var data = JSON.parse(raw);
      var elements = form.querySelectorAll("input, select, textarea");
      for (var i = 0; i < elements.length; i++) {
        var el = elements[i];
        if (el.name && data[el.name] != null) el.value = data[el.name];
      }
    } catch (e) {}
  }

  function clearDraft() {
    try {
      localStorage.removeItem("registrationDraft");
    } catch (e) {}
  }

  function bindFormValidation(container) {
    var form = container.querySelector("#registrationForm");
    if (!form) return;

    var inputs = form.querySelectorAll("input, select, textarea");
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].addEventListener("blur", function () {
        validateField(this);
      });
      inputs[i].addEventListener("input", function () {
        if (this.classList.contains("error")) validateField(this);
        saveDraft(form);
      });
    }

    restoreDraft(form);
    maskers(container);

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (isSubmitting) return;

      var valid = true;
      for (var i = 0; i < inputs.length; i++) {
        if (!validateField(inputs[i])) valid = false;
      }

      if (!valid) {
        UIToast.showToast(
          "Erro no formulário",
          "Por favor, corrija os campos destacados em vermelho.",
          "error"
        );
        return;
      }

      isSubmitting = true;
      UIToast.showToast(
        "Cadastro realizado com sucesso!",
        "Seus dados foram enviados. Entraremos em contato em breve.",
        "success"
      );

      setTimeout(function () {
        isSubmitting = false;
        clearDraft();
        form.reset();
        for (var j = 0; j < inputs.length; j++) {
          inputs[j].classList.remove("success", "error");
        }
      }, 1500);
    });

    var alertClose = container.querySelector("[data-close-alert]");
    if (alertClose) {
      alertClose.addEventListener("click", function () {
        var alert = container.querySelector("#infoAlert");
        if (!alert) return;
        alert.style.opacity = "0";
        alert.style.transform = "translateY(-20px)";
        setTimeout(function () {
          alert.style.display = "none";
        }, 300);
      });
    }
  }

  global.FormValidation = {
    bindFormValidation: bindFormValidation,
  };
})(window);
