/* ------------------------
   JS - SERVIÇOS
   Interatividade da página comercial
------------------------- */

// Espera carregar todo o conteúdo da página
document.addEventListener("DOMContentLoaded", () => {
  console.log("Página de serviços carregada!");

  // Seleciona todos os botões "Saiba mais"
  const botoes = document.querySelectorAll(".servico-card .btn");

  botoes.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();

      // Exibe um alerta temporário (exemplo) – você pode substituir por modal ou redirect
      alert("Obrigado pelo interesse! Entre em contato para mais detalhes.");
    });
  });

  // Animação suave nos cards ao rolar a página
  const cards = document.querySelectorAll(".servico-card");

  const aparecer = () => {
    const triggerBottom = window.innerHeight * 0.85;

    cards.forEach((card) => {
      const cardTop = card.getBoundingClientRect().top;

      if (cardTop < triggerBottom) {
        card.classList.add("show");
      } else {
        card.classList.remove("show");
      }
    });
  };

  // Dispara a função ao carregar e ao rolar
  window.addEventListener("scroll", aparecer);
  aparecer();
});
