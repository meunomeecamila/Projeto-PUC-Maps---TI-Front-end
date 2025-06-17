document.addEventListener('DOMContentLoaded', () => {
  const noticia = JSON.parse(localStorage.getItem('selectedNews'));
  
  if (!noticia) {
    window.location.href = '../html/noticias.html';
    return;
  }

  const main = document.querySelector('main') || document.createElement('main');
  main.innerHTML = `
    <div class="noticia-detalhada">
      <div class="imagem-container">
        <img src="${noticia.imagem}" alt="${noticia.titulo}" class="noticia-img">
      </div>
      <h2>${noticia.titulo}</h2>
      <p class="data">${noticia.data}</p>
      <p class="descricao">${noticia['descricao-completa']}</p>
    </div>
  `;

  if (!document.querySelector('main')) {
    document.body.appendChild(main);
  }
});