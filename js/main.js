// ---------------------------
// main.js - funcionalidades da página
// ---------------------------

// ========= 1) Animação de digitação no título =========
function typeWriter(element, text, speed = 100) {
  let i = 0;
  function typing() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(typing, speed);
    }
  }
  typing();
}

document.addEventListener("DOMContentLoaded", () => {
  // Animar título
  const title = document.querySelector("h1");
  if (title) {
    const text = title.textContent;
    title.textContent = ""; // limpa para animar
    typeWriter(title, text, 80);
  }

  // ========= 6) Botão para abrir Code Runner =========
  const btnJogo = document.getElementById('btn-jogo');
  if (btnJogo) {
    btnJogo.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = 'game/index.html';
    });
  }
});

// ========= 2) Scroll suave + menu ativo =========
const links = document.querySelectorAll("a[href^='#']");
links.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 50,
        behavior: "smooth"
      });
    }
  });
});

window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section");
  const scrollY = window.pageYOffset;

  sections.forEach(sec => {
    const top = sec.offsetTop - 60;
    const height = sec.offsetHeight;
    const id = sec.getAttribute("id");

    if (scrollY >= top && scrollY < top + height) {
      document.querySelectorAll("nav a").forEach(a => a.classList.remove("active"));
      const activeLink = document.querySelector(`nav a[href="#${id}"]`);
      if (activeLink) activeLink.classList.add("active");
    }
  });
});

// ========= 3) Botão voltar ao topo =========
const backToTop = document.createElement("button");
backToTop.innerText = "⬆";
backToTop.classList.add("back-to-top");
document.body.appendChild(backToTop);

window.addEventListener("scroll", () => {
  backToTop.style.display = window.scrollY > 300 ? "block" : "none";
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ========= 4) Copiar link para área de transferência =========
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    showToast("Link copiado! 🚀");
  });
}

// ========= 5) Toast de aviso =========
function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add("show"), 100);
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 500);
  }, 3000);
}
