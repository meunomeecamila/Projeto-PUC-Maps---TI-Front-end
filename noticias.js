document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.card-grid');

  // Buscar JSON fixo
  fetch('../noticias.json')
    .then(response => response.json())
    .then(dadosJson => {
      // Buscar do LocalStorage
      const noticiasLocal = JSON.parse(localStorage.getItem('noticias')) || [];

      // Junta as duas fontes
      const todasNoticias = [...dadosJson.noticias, ...noticiasLocal];

      if (todasNoticias.length === 0) {
        container.innerHTML = '<p class="text-center">Nenhuma notícia cadastrada.</p>';
        return;
      }

      todasNoticias.forEach(noticia => {
        const card = document.createElement('div');
        card.classList.add('card');

        card.innerHTML = `
          <img src="${noticia.imagem}" alt="${noticia.titulo}" class="card-img">
          <div class="card-body">
            <h5 class="card-title">${noticia.titulo}</h5>
            <p class="card-meta">${noticia.data}</p>
            <p class="card-text">${noticia.descricao}</p>
            <button class="btn btn-danger btn-sm excluir-btn">Excluir</button>
          </div>
        `;

        card.addEventListener('click', (e) => {
          if (e.target.classList.contains('excluir-btn')) return;

          localStorage.setItem('selectedNews', JSON.stringify(noticia));
          window.location.href = '../detalhes-noticia.html';
        });

        // Excluir notícia do LocalStorage
        card.querySelector('.excluir-btn').addEventListener('click', () => {
          if (confirm('Tem certeza que deseja excluir esta notícia?')) {
            let noticiasSalvas = JSON.parse(localStorage.getItem('noticias')) || [];

            // Excluir só se a notícia existir no LocalStorage
            if (noticiasSalvas.some(n => n.id === noticia.id)) {
              let atualizadas = noticiasSalvas.filter(n => n.id !== noticia.id);
              localStorage.setItem('noticias', JSON.stringify(atualizadas));
              location.reload();
            } else {
              alert('Essa notícia não pode ser excluída porque é do JSON fixo.');
            }
          }
        });

        container.appendChild(card);
      });
    })
    .catch(error => console.error('Erro ao carregar notícias:', error));
});

// Barra Lateral
document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.getElementById('sidebar');
  const menuIcon = document.getElementById('menu-icon');
  const closeBtn = document.getElementById('close-sidebar');

  menuIcon.addEventListener('click', () => {
    sidebar.style.left = '0';
  });

  closeBtn.addEventListener('click', () => {
    sidebar.style.left = '-250px';
  });
});
