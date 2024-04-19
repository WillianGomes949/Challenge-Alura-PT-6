document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");
    const nameInput = document.querySelector("input[name='fname']");
    const emailInput = document.querySelector("input[name='mail']");
    const messageInput = document.querySelector("textarea[name='msg']");

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        // Valide o nome (obrigatório)
        const nome = nameInput.value.trim();

        if (nome === "") {
            alert("Por favor, insira seu nome.");
            nameInput.focus();
            return;
        }

        if (nome.length > 50) {
            alert("O nome deve ter no máximo 50 caracteres.");
            nameInput.focus();
            return;
        }

        // Valide o e-mail (obrigatório e formato válido)
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (emailInput.value.trim() === "" || !emailRegex.test(emailInput.value)) {
            alert("Por favor, insira um endereço de e-mail válido.");
            emailInput.focus();
            return;
        }

        // Assunto é Opcional

        // Valide a mensagem (obrigatória)
        if (messageInput.value.trim() === "" || messageInput.value.trim() === "Mensagem") {
            alert("Por favor, insira sua mensagem.");
            messageInput.focus();
            return;
        }

        // O formulário é válido, mas não há redirecionamento
        alert("Formulário enviado com sucesso!");
    });
});
