// side bar funcional
  const sidebar = document.getElementById('sidebar');
    const menuIcon = document.getElementById('menu-icon'); // ID do botão de menu no HTML
    const closeBtn = document.getElementById('close-sidebar');

    if (menuIcon) {
        menuIcon.addEventListener('click', () => {
            sidebar.style.left = '0';
        });
    } else {
        console.warn("Elemento com ID 'menu-icon' não encontrado. O botão de menu pode não funcionar.");
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            sidebar.style.left = '-250px';
        });
    } else {
        console.warn("Elemento com ID 'close-sidebar' não encontrado.");
    }

function obterFavoritos() {
  return JSON.parse(localStorage.getItem('favoritos')) || [];
}

fetch('../locais.json')
  .then(response => response.json())
  .then(locais => {
    const lista = document.getElementById('favoritos-lista');
    const favoritos = obterFavoritos();

    const locaisFavoritos = locais.filter(local => favoritos.includes(local.nome));

    locaisFavoritos.forEach(local => {
      const item = document.createElement('li');
      item.classList.add('item-local');

      const titulo = document.createElement('strong');
      titulo.textContent = local.nome;

      const descricao = document.createElement('p');
      descricao.textContent = local.descricao || '';

      item.appendChild(titulo);
      item.appendChild(descricao);
      lista.appendChild(item);
    });
  })
  .catch(error => {
    console.error('Erro ao carregar os locais favoritos:', error);
  });