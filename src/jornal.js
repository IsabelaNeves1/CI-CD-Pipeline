
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const noticias = document.querySelectorAll('.noticia-conteudo');

    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.dataset.target;

            // Esconde todas as notícias
            noticias.forEach(noticia => {
                noticia.style.display = 'none';
            });

            // Mostra a notícia clicada
            const targetNoticia = document.getElementById(targetId);
            if (targetNoticia) {
                targetNoticia.style.display = 'block';

                // Atualiza o contador da notícia mostrada
                const contadorElemento = document.getElementById(`contador-${targetId}`);
                let visualizacoes = parseInt(contadorElemento.textContent) || 0;
                visualizacoes++;
                contadorElemento.textContent = visualizacoes;
            }
        });
    });
});
