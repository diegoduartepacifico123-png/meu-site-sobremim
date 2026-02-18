const btnVoltar = document.getElementById('btn-voltar');
const btnProjetos = document.getElementById('btn-projetos');

if (btnVoltar) btnVoltar.onclick = () => location.href = '../index.html';
if (btnProjetos) btnProjetos.onclick = () => location.href = '../projetos.html';

// ================= DADOS =================

const temas = [
  "Amor","Morte","Identidade","Destino","Sobrevivência",
  "Fantasia","Romance","Terror","Investigação","Tecnologia e IA",
  "Saúde Mental","Mudança Climática"
];

const TEMPO_MAXIMO = 10;

let tempo = TEMPO_MAXIMO;
let intervalo = null;
let textoAnterior = "";
let temaEscolhido = "";
let erros = 0;
let anguloAtual = 0;
let jogoAtivo = false;
let palavrasUltimoReset = 0;

// ================= ELEMENTOS =================

const iniciarBtn = document.getElementById("iniciarBtn");
const girarBtn = document.getElementById("girarBtn");
const temaSorteadoEl = document.getElementById("temaSorteado");
const errosEl = document.getElementById("erros");
const palavrasEl = document.getElementById("palavras");
const enviarBtn = document.getElementById("enviarBtn");
const roleta = document.getElementById("roleta");

const temaEl = document.getElementById("tema");
const tempoEl = document.getElementById("tempo");
const texto = document.getElementById("texto");
const jogo = document.getElementById("jogoEscrita");
const telaInicial = document.getElementById("telaInicial");
const derrota = document.getElementById("derrota");

iniciarBtn.disabled = true;

// ================= PERDER AO SAIR DA ABA =================

document.addEventListener("visibilitychange", () => {
  if (document.hidden && jogoAtivo) {
    perder();
  }
});

// ================= ROLETA =================

const total = temas.length;
const anguloSetor = 360 / total;

girarBtn.addEventListener("click", () => {
  if (jogoAtivo) return;

  iniciarBtn.disabled = true;

  const giro = Math.floor(Math.random() * 360) + 1080;
  anguloAtual = giro;

  roleta.style.transform = `rotate(${anguloAtual}deg)`;

  setTimeout(() => {
    const anguloFinal = anguloAtual % 360;
    const index = Math.floor((360 - anguloFinal) / anguloSetor) % total;

    temaEscolhido = temas[index];
    temaSorteadoEl.textContent = "🎯 Tema sorteado: " + temaEscolhido;

    iniciarBtn.disabled = false;
  }, 4000);
});

// ================= INICIAR =================

iniciarBtn.addEventListener("click", () => {
  if (!temaEscolhido) {
    alert("⚠️ Gire a roleta primeiro!");
    return;
  }
  iniciarDesafio();
});

function iniciarDesafio() {
  telaInicial.style.display = "none";
  derrota.style.display = "none";
  jogo.style.display = "block";

  tempo = TEMPO_MAXIMO;
  erros = 0;
  jogoAtivo = true;
  textoAnterior = "";
  palavrasUltimoReset = 0;

  texto.value = "";
  texto.disabled = false;
  texto.focus();

  temaEl.textContent = "Tema: " + temaEscolhido;
  errosEl.textContent = "Erros: 0";
  palavrasEl.textContent = "Palavras: 0";

  atualizarTempo();
  iniciarCronometro();
}

// ================= TEMPO =================

function iniciarCronometro() {
  clearInterval(intervalo);

  intervalo = setInterval(() => {
    if (!jogoAtivo) return;

    tempo--;
    atualizarTempo();

    if (tempo <= 0) {
      perder();
    }
  }, 1000);
}

function atualizarTempo() {
  const min = Math.floor(tempo / 60);
  const seg = tempo % 60;
  tempoEl.textContent = `${min}:${seg < 10 ? "0" + seg : seg}`;
}

// ================= TEXTO =================

texto.addEventListener("input", () => {
  if (!jogoAtivo) return;

  const atual = texto.value;

  if (atual.length - textoAnterior.length > 20) {
    texto.value = textoAnterior;
    return;
  }

  const totalPalavras = contarPalavras(atual);
  palavrasEl.textContent = "Palavras: " + totalPalavras;

  // 🔁 RESETAR TEMPO SEMPRE QUE ESCREVER UMA NOVA PALAVRA
  if (totalPalavras > palavrasUltimoReset) {
    tempo = TEMPO_MAXIMO;
    atualizarTempo();
    palavrasUltimoReset = totalPalavras;
  }

  textoAnterior = atual;
});

texto.addEventListener("paste", e => e.preventDefault());

texto.addEventListener("keydown", e => {
  if (!jogoAtivo) return;

  if (e.repeat) e.preventDefault();

  if (e.key === "Backspace" && texto.value.length > 0) {
    erros++;
    errosEl.textContent = "Erros: " + erros;
  }
});

// ================= FUNÇÕES =================

function contarPalavras(txt) {
  return txt.trim().split(/\s+/).filter(Boolean).length;
}

function perder() {
  if (!jogoAtivo) return;

  clearInterval(intervalo);
  jogoAtivo = false;

  texto.disabled = true;
  jogo.style.display = "none";
  derrota.style.display = "block";
}

// ================= ENVIAR =================

enviarBtn.addEventListener("click", enviarDados);

function enviarDados() {
  if (!texto.value.trim()) {
    alert("⚠️ Escreva algo antes de enviar!");
    return;
  }

  const formURL = "https://docs.google.com/forms/d/e/1FAIpQLSelCVpWPxJcRjyz1i6ZNqqHk0hdPIqHJo9VcJEmcIT_10KJAg/formResponse";

  const data = new FormData();
  data.append("entry.54467777", texto.value);
  data.append("entry.11111111", erros);
  data.append("entry.22222222", temaEscolhido);

  fetch(formURL, {
    method: "POST",
    mode: "no-cors",
    body: data
  });

  alert("✅ Texto enviado com sucesso!");
  texto.value = "";
}
