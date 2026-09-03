```javascript
const botaoLupa = document.getElementById("botaoLupa");
const lupa = document.getElementById("lupa");
const lupaConteudo = document.getElementById("lupa-conteudo");
const conteudo = document.getElementById("conteudo");

let lupaAtiva = false;

const ZOOM = 2;


// ======================================
// CRIAR CONTEÚDO DA LUPA
// ======================================

function criarConteudo() {

    lupaConteudo.innerHTML = "";

    // Copia somente o conteúdo principal
    const copia = conteudo.cloneNode(true);

    // Remove o ID para não duplicar
    copia.removeAttribute("id");

    // Mantém o mesmo tamanho e aparência
    copia.style.margin = "0";
    copia.style.maxWidth = "none";
    copia.style.width = conteudo.offsetWidth + "px";

    lupaConteudo.appendChild(copia);
}


// ======================================
// ATUALIZAR A LUPA
// ======================================

function moverLupa(evento) {

    if (!lupaAtiva) {
        return;
    }

    const mouseX = evento.clientX;
    const mouseY = evento.clientY;

    // Posiciona a lupa no cursor
    lupa.style.left = mouseX + "px";
    lupa.style.top = mouseY + "px";


    // Posição do cursor dentro da página
    const paginaX = mouseX + window.scrollX;
    const paginaY = mouseY + window.scrollY;


    /*
       O conteúdo ampliado é deslocado para que
       exatamente a região que está sob o cursor
       fique no centro da lupa.
    */

    const lupaX = (lupa.offsetWidth / 2);
    const lupaY = (lupa.offsetHeight / 2);


    const deslocamentoX =
        lupaX - (paginaX * ZOOM);

    const deslocamentoY =
        lupaY - (paginaY * ZOOM);


    lupaConteudo.style.transform =
        `translate(${deslocamentoX}px, ${deslocamentoY}px) scale(${ZOOM})`;
}


// ======================================
// ATIVAR LUPA
// ======================================

function ativarLupa() {

    lupaAtiva = true;

    criarConteudo();

    lupa.style.display = "block";

    botaoLupa.textContent = "Desativar lupa";

    botaoLupa.setAttribute(
        "aria-pressed",
        "true"
    );

    lupa.setAttribute(
        "aria-hidden",
        "false"
    );
}


// ======================================
// DESATIVAR LUPA
// ======================================

function desativarLupa() {

    lupaAtiva = false;

    lupa.style.display = "none";

    botaoLupa.textContent = "Ativar lupa";

    botaoLupa.setAttribute(
        "aria-pressed",
        "false"
    );

    lupa.setAttribute(
        "aria-hidden",
        "true"
    );
}


// ======================================
// BOTÃO
// ======================================

botaoLupa.addEventListener("click", function() {

    if (lupaAtiva) {

        desativarLupa();

    } else {

        ativarLupa();

    }

});


// ======================================
// MOVIMENTO DO MOUSE
// ======================================

document.addEventListener(
    "mousemove",
    moverLupa
);


// ======================================
// DESATIVAR COM ESC
// ======================================

document.addEventListener(
    "keydown",
    function(evento) {

        if (
            evento.key === "Escape" &&
            lupaAtiva
        ) {

            desativarLupa();

        }

    }
);
```
