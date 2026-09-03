const lupa = document.getElementById("lupa");
const lupaConteudo = document.getElementById("lupa-conteudo");
const botaoLupa = document.getElementById("botaoLupa");

let lupaAtiva = false;
const zoom = 1.8;

// Cria o conteúdo que será mostrado dentro da lupa
function criarConteudoDaLupa() {
  const conteudoOriginal = document
    .getElementById("conteudo")
    .cloneNode(true);

  lupaConteudo.innerHTML = "";
  lupaConteudo.appendChild(conteudoOriginal);
}

// Atualiza a posição e o zoom da lupa
function atualizarLupa(evento) {
  if (!lupaAtiva) return;

  const x = evento.clientX;
  const y = evento.clientY;

  lupa.style.left = `${x}px`;
  lupa.style.top = `${y}px`;

  lupaConteudo.style.transform =
    `translate(${x / zoom - x}px, ${y / zoom - y}px) scale(${zoom})`;
}

// Ativa a lupa
function ativarLupa() {
  lupaAtiva = true;

  criarConteudoDaLupa();

  lupa.style.display = "block";

  document.body.classList.remove("cursor-normal");

  botaoLupa.textContent = "Desativar lupa";
  botaoLupa.setAttribute("aria-pressed", "true");
  botaoLupa.setAttribute("aria-label", "Desativar lupa");
}

// Desativa a lupa
function desativarLupa() {
  lupaAtiva = false;

  lupa.style.display = "none";

  document.body.classList.add("cursor-normal");

  botaoLupa.textContent = "Ativar lupa";
  botaoLupa.setAttribute("aria-pressed", "false");
  botaoLupa.setAttribute("aria-label", "Ativar lupa");
}

// Botão da lupa
botaoLupa.addEventListener("click", () => {
  if (lupaAtiva) {
    desativarLupa();
  } else {
    ativarLupa();
  }
});

// Acompanha o mouse
document.addEventListener("mousemove", atualizarLupa);

// Tecla ESC desativa a lupa
document.addEventListener("keydown", (evento) => {
  if (evento.key === "Escape" && lupaAtiva) {
    desativarLupa();
  }
});
