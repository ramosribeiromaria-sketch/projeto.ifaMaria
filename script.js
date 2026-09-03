```javascript
const botaoLupa = document.getElementById("botaoLupa");
const lupa = document.getElementById("lupa");
const lupaConteudo = document.getElementById("lupa-conteudo");

let lupaAtiva = false;
const ZOOM = 2;


// ========================================
// CRIA A CÓPIA DA PÁGINA DENTRO DA LUPA
// ========================================

function criarConteudoDaLupa() {

  lupaConteudo.innerHTML = "";

  // Copia a página inteira
  const copia = document.body.cloneNode(true);

  // Remove elementos que não precisam aparecer
  // dentro da lupa
  copia.querySelectorAll(
    "#lupa, .acessibilidade, script"
  ).forEach(elemento => {
    elemento.remove();
  });

  // Mantém o mesmo tamanho da página original
  copia.style.margin = "0";
  copia.style.width =
    document.documentElement.scrollWidth + "px";

  copia.style.minHeight =
    document.documentElement.scrollHeight + "px";

  copia.style.cursor = "default";

  lupaConteudo.appendChild(copia);
}


// ========================================
// ATUALIZA A POSIÇÃO DA LUPA
// ========================================

function atualizarLupa(evento) {

  if (!lupaAtiva) return;

  const x = evento.clientX;
  const y = evento.clientY;

  const scrollX = window.scrollX;
  const scrollY = window.scrollY;

  // A lupa acompanha o cursor
  lupa.style.left = `${x}px`;
  lupa.style.top = `${y}px`;

  // Descobre a posição real do cursor na página
  const pontoX = x + scrollX;
  const pontoY = y + scrollY;

  /*
   * Faz com que o mesmo ponto que está
   * embaixo do cursor apareça ampliado
   * dentro da lupa.
   */

  const deslocamentoX =
    x - pontoX * ZOOM;

  const deslocamentoY =
    y - pontoY * ZOOM;

  lupaConteudo.style.transform =
    `translate(${deslocamentoX}px, ${deslocamentoY}px)
     scale(${ZOOM})`;
}


// ========================================
// ATIVAR LUPA
// ========================================

function ativarLupa() {

  lupaAtiva = true;

  criarConteudoDaLupa();

  lupa.style.display = "block";

  lupa.setAttribute(
    "aria-hidden",
    "false"
  );

  botaoLupa.textContent =
    "Desativar lupa";

  botaoLupa.setAttribute(
    "aria-pressed",
    "true"
  );
}


// ========================================
// DESATIVAR LUPA
// ========================================

function desativarLupa() {

  lupaAtiva = false;

  lupa.style.display = "none";

  lupa.setAttribute(
    "aria-hidden",
    "true"
  );

  botaoLupa.textContent =
    "Ativar lupa";

  botaoLupa.setAttribute(
    "aria-pressed",
    "false"
  );
}


// ========================================
// BOTÃO DA LUPA
// ========================================

botaoLupa.addEventListener(
  "click",
  () => {

    if (lupaAtiva) {
      desativarLupa();
    } else {
      ativarLupa();
    }

  }
);


// ========================================
// MOUSE
// ========================================

document.addEventListener(
  "mousemove",
  atualizarLupa
);


// ========================================
// SCROLL
// ========================================

window.addEventListener(
  "scroll",
  () => {

    if (lupaAtiva) {

      atualizarLupa({

        clientX:
          parseFloat(lupa.style.left) ||
          window.innerWidth / 2,

        clientY:
          parseFloat(lupa.style.top) ||
          window.innerHeight / 2

      });

    }

  }
);


// ========================================
// ESC DESATIVA A LUPA
// ========================================

document.addEventListener(
  "keydown",
  evento => {

    if (
      evento.key === "Escape" &&
      lupaAtiva
    ) {

      desativarLupa();

    }

  }
);
```
