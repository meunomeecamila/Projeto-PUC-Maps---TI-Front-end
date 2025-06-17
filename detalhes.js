const params = new URLSearchParams(window.location.search);
const nomeLocal = params.get('nome');

fetch('../locais.json')
  .then(response => response.json())
  .then(locais => {
    const local = locais.find(l => l.nome === nomeLocal);
    const container = document.getElementById('detalhes-local');

    if (local) {
      container.innerHTML = `
        <h2>${local.nome}</h2>
        <p><strong>Descrição:</strong> ${local.descricao}</p>
      `;
    } else {
      container.textContent = 'Local não encontrado.';
    }
  })
  .catch(error => {
    console.error('Erro ao carregar os detalhes:', error);
    document.getElementById('detalhes-local').textContent = 'Erro ao carregar os dados.';
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
