// ============================
// CÓDIGO QUE VOCÊ JÁ TEM (NÃO ALTERADO)
// ============================

// Navegação dos botões
document.getElementById('btn-voltar').addEventListener('click', () => {
  window.location.href = '../index.html'; // Volta para a página inicial
});

document.getElementById('btn-projetos').addEventListener('click', () => {
  window.location.href = '../projetos.html'; // Avança para conhecer outros projetos
});


// ============================
// DESAFIO DE ESCRITA (NOVO)
// ============================

const temas = [
  "Fantasia",
  "Terror",
  "Romance",
  "Mistério",
  "Ficção Científica",
  "Drama"
];

let tempo = 600;
let intervalo;
let ultimoMovimento = Date.now();
let ativo = false;

const iniciarBtn = document.getElementById("iniciarBtn");
const temaEl = document.getElementById("tema");
const tempoEl = document.getElementById("tempo");
const texto = document.getElementById("texto");
const jogo = document.getElementById("jogoEscrita"); // ID correto do HTML
const telaInicial = document.getElementById("telaInicial");
const derrota = document.getElementById("derrota");
const anuncioBtn = document.getElementById("anuncioBtn");

if (iniciarBtn) {

  iniciarBtn.addEventListener("click", iniciarDesafio);
  anuncioBtn.addEventListener("click", iniciarDesafio);

  function iniciarDesafio() {
    telaInicial.style.display = "none";
    derrota.style.display = "none";
    jogo.style.display = "block";

    tempo = 600;
    ativo = true;
    texto.value = "";

    temaEl.textContent = "Tema: " + sortearTema();
    ultimoMovimento = Date.now();

    iniciarCronometro();
  }

  function sortearTema() {
    return temas[Math.floor(Math.random() * temas.length)];
  }

  function iniciarCronometro() {
    clearInterval(intervalo);

    intervalo = setInterval(() => {
      tempo--;
      atualizarTempo();
      verificarInatividade();

      if (tempo <= 0) {
        perder();
      }
    }, 1000);
  }

  function atualizarTempo() {
    let min = Math.floor(tempo / 60);
    let seg = tempo % 60;
    tempoEl.textContent = `${min}:${seg < 10 ? "0" + seg : seg}`;
  }

  function verificarInatividade() {
    if (Date.now() - ultimoMovimento > 10000) {
      perder();
    }
  }

  function perder() {
    clearInterval(intervalo);
    ativo = false;
    jogo.style.display = "none";
    derrota.style.display = "block";
  }

  texto.addEventListener("input", () => {
    ultimoMovimento = Date.now();
  });

  document.addEventListener("mousemove", () => {
    ultimoMovimento = Date.now();
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden && ativo) {
      perder();
    }
  });
}
