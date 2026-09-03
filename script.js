const lupa = document.getElementById("lupa");
const lupaConteudo = document.getElementById("lupa-conteudo");
const botaoLupa = document.getElementById("botaoLupa");

let lupaAtiva = false;

const ZOOM = 1.8;

function criarConteudoDaLupa() {
  lupaConteudo.innerHTML = "";

  const copia = document.body.cloneNode(true);

  // Remove a própria lupa da cópia
  copia.querySelector("#lupa")?.remove();

  copia.classList.add("lupa-pagina");

  copia.style.margin = "0";
  copia.style.padding = "0";
  copia.style.width = "100vw";
  copia.style.minHeight = "100vh";
  copia.style.background = "#ffffff";
  copia.style.color = "#222222";
  copia.style.fontFamily = "Arial, sans-serif";
  copia.style.lineHeight = "1.6";
  copia.style.cursor = "default";

  // Impede que os elementos da cópia sejam clicados
  copia.querySelectorAll(
    "button, a, input, select, textarea, video"
  ).forEach((elemento) => {
    elemento.setAttribute("tabindex", "-1");
    elemento.style.pointerEvents = "none";
  });

  lupaConteudo.appendChild(copia);
}

function atualizarLupa(evento) {
  if (!lupaAtiva) return;

  const x = evento.clientX;
  const y = evento.clientY;

  const raio = lupa.offsetWidth / 2;

  // Faz a lupa acompanhar o cursor
  lupa.style.left = `${x}px`;
  lupa.style.top = `${y}px`;

  // Considera o scroll da página
  const paginaX = x + window.scrollX;
  const paginaY = y + window.scrollY;

  // Mantém o ponto sob o cursor no centro da lupa
  const deslocamentoX =
    raio - paginaX * ZOOM;

  const deslocamentoY =
    raio - paginaY * ZOOM;

  lupaConteudo.style.transform =
    `translate(${deslocamentoX}px, ${deslocamentoY}px) scale(${ZOOM})`;
}

function ativarLupa() {
  lupaAtiva = true;

  criarConteudoDaLupa();

  lupa.style.display = "block";

  botaoLupa.textContent = "Desativar lupa";

  botaoLupa.setAttribute(
    "aria-pressed",
    "true"
  );

  document.body.classList.remove("cursor-normal");
}

function desativarLupa() {
  lupaAtiva = false;

  lupa.style.display = "none";

  botaoLupa.textContent = "Ativar lupa";

  botaoLupa.setAttribute(
    "aria-pressed",
    "false"
  );

  document.body.classList.add("cursor-normal");
}

botaoLupa.addEventListener("click", () => {
  if (lupaAtiva) {
    desativarLupa();
  } else {
    ativarLupa();
  }
});

document.addEventListener(
  "mousemove",
  atualizarLupa
);

// Atualiza a lupa quando a página é rolada
window.addEventListener("scroll", () => {
  if (!lupaAtiva) return;

  const x =
    parseFloat(lupa.style.left) || 0;

  const y =
    parseFloat(lupa.style.top) || 0;

  atualizarLupa({
    clientX: x,
    clientY: y
  });
});

// Tecla ESC desativa a lupa
document.addEventListener("keydown", (evento) => {
  if (
    evento.key === "Escape" &&
    lupaAtiva
  ) {
    desativarLupa();
  }
});
