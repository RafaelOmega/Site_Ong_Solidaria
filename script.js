// script.js

document.addEventListener("DOMContentLoaded", () => {
  // Máscara para CPF
  const cpfInput = document.getElementById("cpf");
  if (cpfInput) {
    cpfInput.addEventListener("input", (e) => {
      let value = e.target.value.replace(/\D/g, ""); // Remove tudo que não é dígito
      value = value.replace(/(\d{3})(\d)/, "$1.$2"); // Adiciona ponto após 3 dígitos
      value = value.replace(/(\d{3})(\d)/, "$1.$2"); // Adiciona outro ponto
      value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2"); // Adiciona hífen após os últimos 2 dígitos
      e.target.value = value;
    });
  }

  // Máscara para Telefone (com ou sem 9º dígito)
  const phoneInput = document.getElementById("phone");
  if (phoneInput) {
    phoneInput.addEventListener("input", (e) => {
      let value = e.target.value.replace(/\D/g, ""); // Remove tudo que não é dígito
      if (value.length > 11) {
        value = value.substring(0, 11); // Limita a 11 dígitos
      }
      value = value.replace(/^(\d\d)(\d)/g, "($1) $2"); // Adiciona parênteses e espaço
      value = value.replace(/(\d{5})(\d)/, "$1-$2"); // Adiciona hífen após 5 dígitos
      e.target.value = value;
    });
  }

  // Máscara para CEP
  const cepInput = document.getElementById("cep");
  if (cepInput) {
    cepInput.addEventListener("input", (e) => {
      let value = e.target.value.replace(/\D/g, ""); // Remove tudo que não é dígito
      value = value.replace(/^(\d{5})(\d)/, "$1-$2"); // Adiciona hífen após 5 dígitos
      e.target.value = value;
    });
  }

  // Exemplo de validação extra para o formulário (além do HTML5 nativo)
  const registrationForm = document.querySelector(".registration-form form");
  if (registrationForm) {
    registrationForm.addEventListener("submit", (event) => {
      // Verifica se os campos obrigatórios estão preenchidos (HTML5 já faz isso)
      // Esta é uma camada adicional de validação ou para validações mais complexas
      let isValid = true;
      const requiredInputs = registrationForm.querySelectorAll("[required]");

      requiredInputs.forEach((input) => {
        if (!input.value.trim()) {
          isValid = false;
          // Opcional: Adicionar classe de erro ou mensagem de feedback
          // input.classList.add('error');
        } else {
          // input.classList.remove('error');
        }
      });

      if (!isValid) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        event.preventDefault(); // Impede o envio do formulário
      } else {
        // Exemplo de como processar os dados (simulado)
        console.log("Formulário enviado com sucesso!");
        const formData = new FormData(registrationForm);
        for (let [key, value] of formData.entries()) {
          console.log(`${key}: ${value}`);
        }
        // event.preventDefault(); // Descomentar para impedir envio real em ambiente de teste
        // alert('Cadastro realizado com sucesso! (Funcionalidade de envio desabilitada para demonstração)');
      }
    });
  }
});
