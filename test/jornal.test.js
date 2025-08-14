const { JSDOM } = require('jsdom');
const path = require('path');

const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Jornal de Matão</title>
</head>
<body>
    <div class="card">
        <p>Noticia 1</p>
        <section id="noticia1" class="noticia-conteudo">
            <p>Esta notícia já foi visualizada <span id="contador-noticia1">0</span> vezes.</p>
        </section>
    </div>
    <div class="card">
        <p>Noticia 2</p>
        <section id="noticia2" class="noticia-conteudo">
            <p>Esta notícia já foi visualizada <span id="contador-noticia2">0</span> vezes.</p>
        </section>
    </div>
</body>
</html>`;

describe('Jornal Counter Logic', () => {
    // Configura o ambiente de teste antes de cada teste
    let dom;
    let document;
    let updateCounter;

    beforeEach(() => {
        dom = new JSDOM(html, { runScripts: 'dangerously' });
        document = dom.window.document;
        // Importa a função após o DOM ser criado
        const scriptContent = `
            function updateCounter(targetId) {
                const contadorElemento = document.getElementById("contador-" + targetId);
                if (contadorElemento) {
                    let visualizacoes = parseInt(contadorElemento.textContent) || 0;
                    visualizacoes++;
                    contadorElemento.textContent = visualizacoes;
                }
            }
            // Adicione a função ao objeto global para que possamos acessá-la
            dom.window.updateCounter = updateCounter;
        `;
        const scriptElement = document.createElement('script');
        scriptElement.textContent = scriptContent;
        document.head.appendChild(scriptElement);

        updateCounter = dom.window.updateCounter;
    });

    test('should increment the counter for noticia1', () => {
        const contadorElemento = document.getElementById('contador-noticia1');
        expect(contadorElemento.textContent).toBe('0');
        
        updateCounter('noticia1');
        
        expect(contadorElemento.textContent).toBe('1');
    });

    test('should increment the counter for noticia2', () => {
        const contadorElemento = document.getElementById('contador-noticia2');
        expect(contadorElemento.textContent).toBe('0');
        
        updateCounter('noticia2');
        
        expect(contadorElemento.textContent).toBe('1');
    });
});