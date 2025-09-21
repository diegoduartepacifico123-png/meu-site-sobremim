/* ------------------------
   JS - PAGINA DE CÓDIGO
   Interatividade e efeitos
------------------------- */

document.addEventListener('DOMContentLoaded', function () {

  // ===============================
  // 1) Cartão de código interativo
  // ===============================
  const cards = document.querySelectorAll('.card-codigo');

  cards.forEach(card => {
    const btn = card.querySelector('.btn-toggle');
    const content = card.querySelector('.card-content');

    btn.addEventListener('click', () => {
      card.classList.toggle('show');

      // Animação leve
      if(card.classList.contains('show')) {
        content.style.maxHeight = content.scrollHeight + "px";
        btn.textContent = "Esconder Código ✨";
      } else {
        content.style.maxHeight = 0;
        btn.textContent = "Mostrar Código ✨";
      }
    });
  });

  // ===============================
  // 2) Efeito de brilho neon nas linhas de código
  // ===============================
  const linhasCodigo = document.querySelectorAll('.card-content pre, .card-content code');

  linhasCodigo.forEach(linha => {
    linha.addEventListener('mouseenter', () => {
      linha.style.textShadow = '0 0 8px #00ff88, 0 0 12px #00b8ff';
      linha.style.color = '#00ff88';
    });
    linha.addEventListener('mouseleave', () => {
      linha.style.textShadow = 'none';
      linha.style.color = '#f5f5f5';
    });
  });

  // ===============================
  // 3) Mensagem divertida de aviso para novidades
  // ===============================
  const novidades = document.querySelector('.novidades');

  if(novidades) {
    novidades.addEventListener('click', () => {
      alert('🚀 Novos ensinamentos serão adicionados em breve! Fique atento!');
    });
  }

  // ===============================
  // 4) Animação suave de digitação para títulos
  // ===============================
  const titulo = document.querySelector('h1');

  if(titulo) {
    const text = titulo.textContent;
    titulo.textContent = '';
    let i = 0;

    function typeWriter() {
      if(i < text.length) {
        titulo.innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, 80);
      }
    }
    typeWriter();
  }

});