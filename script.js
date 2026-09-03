```javascript
const botaoLupa = document.getElementById("botaoLupa");
const lupa = document.getElementById("lupa");
const lupaConteudo = document.getElementById("lupa-conteudo");
const conteudo = document.getElementById("conteudo");

let lupaAtiva = false;

const zoom = 2;


// ========================================
// CRIA O CONTEÚDO DA LUPA
// ========================================

function criarLupa() {

  // Remove conteúdo anterior
  lupaConteudo.innerHTML = "";

  // Faz uma cópia do conteúdo principal
  const copia = conteudo.cloneNode(true);

  // Remove o ID para evitar duplicação
  copia.removeAttribute("id");

  // Coloca a cópia dentro da lupa
  lupaConteudo.appendChild(copia);
}


// ========================================
// ATIVAR / DESATIVAR LUPA
// ========================================

botaoLupa.addEventListener("click", function () {

  lupaAtiva = !lupaAtiva;

  if (lupaAtiva) {

    criarLupa();

    lupa.style.display = "block";

    botaoLupa.textContent = "Desativar lupa";

    botaoLupa.setAttribute("aria-pressed", "true");

    lupa.setAttribute("aria-hidden", "false");

  } else {

    lupa.style.display = "none";

    botaoLupa.textContent = "Ativar lupa";

    botaoLupa.setAttribute("aria-pressed", "false");

    lupa.setAttribute("aria-hidden", "true");
  }

});


// ========================================
// MOVIMENTAR A LUPA
// ========================================

document.addEventListener("mousemove", function (evento) {

  if (!lupaAtiva) {
    return;
  }

  const x = evento.clientX;
  const y = evento.clientY;

  // Posiciona a lupa no cursor
  lupa.style.left = x + "px";
  lupa.style.top = y + "px";

  /*
   * Move o conteúdo dentro da lupa.
   * O valor negativo faz com que a região
   * abaixo do cursor apareça ampliada.
   */

  const movimentoX = -(x * (zoom - 1));
  const movimentoY = -(y * (zoom - 1));

  lupaConteudo.style.transform =
    `translate(${movimentoX}px, ${movimentoY}px) scale(${zoom})`;
});


// ========================================
// DESATIVAR COM ESC
// ========================================

document.addEventListener("keydown", function (evento) {

  if (evento.key === "Escape" && lupaAtiva) {

    lupaAtiva = false;

    lupa.style.display = "none";

    botaoLupa.textContent = "Ativar lupa";

    botaoLupa.setAttribute("aria-pressed", "false");

    lupa.setAttribute("aria-hidden", "true");
  }

});
```
