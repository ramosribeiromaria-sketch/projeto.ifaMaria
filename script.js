const lupa = document.getElementById("lupa");
const lupaConteudo = document.getElementById("lupa-conteudo");
const botaoLupa = document.getElementById("botaoLupa");

let lupaAtiva = false;


/*
 * Cria uma cópia do conteúdo da página.
 */

function criarConteudoDaLupa() {

  const conteudoOriginal =
    document.body.cloneNode(true);

  /*
   * Remove elementos que não precisam aparecer
   * dentro da lupa.
   */

  const elementosRemover =
    conteudoOriginal.querySelectorAll(
      "#lupa, #lupa-conteudo, .acessibilidade"
    );

  elementosRemover.forEach(elemento => {
    elemento.remove();
  });

  lupaConteudo.innerHTML = "";

  lupaConteudo.appendChild(conteudoOriginal);
}


/*
 * Ativa ou desativa a lupa.
 */

botaoLupa.addEventListener("click", () => {

  lupaAtiva = !lupaAtiva;

  if (lupaAtiva) {

    criarConteudoDaLupa();

    lupa.style.display = "block";

    document.body.classList.remove("cursor-normal");

    botaoLupa.textContent = "Desativar lupa";

    botaoLupa.setAttribute(
      "aria-pressed",
      "true"
    );

  } else {

    lupa.style.display = "none";

    document.body.classList.add("cursor-normal");

    botaoLupa.textContent = "Ativar lupa";

    botaoLupa.setAttribute(
      "aria-pressed",
      "false"
    );
  }

});


/*
 * Move a lupa conforme o movimento do mouse.
 */

document.addEventListener("mousemove", (evento) => {

  if (!lupaAtiva) {
    return;
  }

  const x = evento.clientX;
  const y = evento.clientY;

  lupa.style.left = x + "px";
  lupa.style.top = y + "px";


  /*
   * Nível de ampliação.
   */

  const zoom = 1.8;

  lupaConteudo.style.transform =
    `translate(
      ${-x * (zoom - 1)}px,
      ${-y * (zoom - 1)}px
    )
    scale(${zoom})`;

});


/*
 * Tecla ESC desativa a lupa.
 */

document.addEventListener("keydown", (evento) => {

  if (evento.key === "Escape" && lupaAtiva) {

    lupaAtiva = false;

    lupa.style.display = "none";

    document.body.classList.add("cursor-normal");

    botaoLupa.textContent = "Ativar lupa";

    botaoLupa.setAttribute(
      "aria-pressed",
      "false"
    );
  }

});
