// Efeito máquina de escrever
function typeWriter(elementId, text, delay = 50, callback = null) {
  const el = document.getElementById(elementId);
  let i = 0;
  function type() {
    if (i < text.length) {
      el.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, delay);
    } else if (callback) {
      callback();
    }
  }
  type();
}

window.addEventListener("DOMContentLoaded", () => {
  typeWriter("titulo", "Templo Asteca", 80, () => {
    typeWriter("subtitulo", "Civilização Asteca • Século XIV-XVI", 40);
  });
});

// Acessibilidade - Fonte
let tamanhoFonte = 100;

function alterarFonte(acao) {
  if (acao === '+') {
    tamanhoFonte += 10;
  } else if (acao === '-' && tamanhoFonte > 60) {
    tamanhoFonte -= 10;
  }
  document.body.style.fontSize = tamanhoFonte + '%';
}

// Acessibilidade - Contraste
function alternarContraste() {
  document.body.classList.toggle("contraste-alto");
}

// Leitura em voz alta usando Speech Synthesis API
function lerTexto() {
  pararLeitura(); // para se já estiver lendo

  const texto = `
    Templo Asteca.
    Civilização Asteca, Século catorze ao dezesseis.
    Sobre o modelo: Este templo asteca foi uma estrutura típica utilizada para rituais religiosos e cerimônias dedicadas aos deuses. 
    Elevado sobre plataformas com escadarias, o templo simboliza a profunda relação entre espiritualidade e poder na cultura asteca.
    Origem: Mesoamérica – atual México.
    Data histórica: entre os séculos catorze e dezesseis.
    Curiosidades:
    Um – Servia para sacrifícios humanos como oferenda aos deuses.
    Dois – O mais famoso é o Templo Mayor, localizado em Tenochtitlán.
    Três – A arquitetura piramidal influenciou outras civilizações americanas.
  `;

  const utterance = new SpeechSynthesisUtterance(texto);
  utterance.lang = 'pt-BR';
  utterance.rate = 1;
  utterance.pitch = 1;
  speechSynthesis.speak(utterance);
}

function pararLeitura() {
  if (speechSynthesis.speaking) {
    speechSynthesis.cancel();
  }
}

// Atalhos de teclado
window.addEventListener("keydown", (e) => {
  if (e.altKey) {
    const k = e.key.toLowerCase();
    if (k === 'a') alterarFonte('+');
    if (k === 'd') alterarFonte('-');
    if (k === 'c') alternarContraste();
    if (k === 'l') lerTexto();
    if (k === 'p') pararLeitura();
  }
});
