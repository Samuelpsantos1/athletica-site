document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("year").textContent = new Date().getFullYear();

  const form = document.getElementById("contact-form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const preferencia = document.getElementById("preferencia").value.trim();

    if (!name || !email || !preferencia) {
      alert("Preencha todos os campos.");
      return;
    }

    const scriptURL = "https://script.google.com/macros/s/YOUR_DEPLOYED_SCRIPT_ID/exec";

    try {
      const response = await fetch(scriptURL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ name, email, preferencia }),
      });

      if (response.ok) {
        form.reset();
        mostrarPopup("Mensagem enviada com sucesso!");
      } else {
        mostrarPopup("Erro ao enviar. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro:", error);
      mostrarPopup("Erro de conexão. Verifique sua internet.");
    }
  });

  function mostrarPopup(mensagem) {
    const popup = document.createElement("div");
    popup.className = "popup-message";
    popup.textContent = mensagem;
    form.appendChild(popup);
    setTimeout(() => popup.remove(), 4000);
  }

  // Chatbot
  document.getElementById("chatbot-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const input = document.getElementById("chatbot-input");
    const message = input.value.trim();
    if (!message) return;

    addMessage("user", message);
    input.value = "";

    const lower = message.toLowerCase();
    let reply = "Desculpe, ainda estou aprendendo. Pode tentar reformular?";

    if (lower.includes("endereço") || lower.includes("onde fica")) {
      reply = "Nosso endereço é: Rua 32 de Novembro, nº 660.";
    } else if (lower.includes("telefone") || lower.includes("contato")) {
      reply = "Você pode nos ligar pelo telefone: (23) 5744-0000.";
    } else if (lower.includes("olá") || lower.includes("oi")) {
      reply = "Olá! Como posso ajudar?";
    } else if (lower.includes("horário")) {
      reply = "Atendemos de segunda a sábado, das 6h às 22h.";
    } else if (lower.includes("avaliação")) {
      reply = "Sim! A primeira avaliação é gratuita.";
    } else if (lower.includes("preço") || lower.includes("valor")) {
      reply = "Os planos começam a partir de R$99/mês.";
    }

    setTimeout(() => addMessage("bot", reply), 500);
  });

  function addMessage(sender, text) {
    const chat = document.getElementById("chatbot-messages");
    const message = document.createElement("div");
    message.className = `chat-message ${sender}`;
    message.textContent = text;
    chat.appendChild(message);
    chat.scrollTop = chat.scrollHeight;
  }
});
