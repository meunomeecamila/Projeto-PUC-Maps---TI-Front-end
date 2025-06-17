const listaContainer = document.getElementById('lista-locais');
const inputPesquisa = document.getElementById('pesquisa'); 

// --- Funções de Favoritos ---
function obterFavoritos() {
    return JSON.parse(localStorage.getItem('favoritos')) || [];
}

function salvarFavoritos(favoritos) {
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
}
// --- Fim das Funções de Favoritos ---

// Função para criar um card de local
function criarCard(local) {
    const favoritos = obterFavoritos();
    const estaFavorito = favoritos.includes(local.nome);

    // Cria o link que envolverá toda a caixa do card
    const link = document.createElement('a');
    link.href = `detalhes.html?nome=${encodeURIComponent(local.nome)}`;
    link.classList.add('item-link');

    // Cria a estrutura da caixa do item 
    const item = document.createElement('div');
    item.className = 'item-local'; // Classe para o estilo do card
    
    const titulo = document.createElement('h3'); // Para o nome do local
    titulo.textContent = local.nome;

    const filtroTexto = document.createElement('p'); // Para o filtro/categoria
    filtroTexto.textContent = local.filtro;

    // Botão de favorito
    const favoritoBtn = document.createElement('button');
    favoritoBtn.innerHTML = `<i class="${estaFavorito ? 'fas' : 'far'} fa-star"></i>`;
    favoritoBtn.classList.add('btn-favorito');
    if (estaFavorito) favoritoBtn.classList.add('favorito');

    favoritoBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Impede que o clique no botão acione o link do card
        e.preventDefault(); // Impede o comportamento padrão do botão

        const icone = favoritoBtn.querySelector('i');
        favoritoBtn.classList.toggle('favorito');

        let currentFavoritos = obterFavoritos();

        if (favoritoBtn.classList.contains('favorito')) {
            icone.classList.replace('far', 'fas');
            if (!currentFavoritos.includes(local.nome)) {
                currentFavoritos.push(local.nome);
            }
        } else {
            icone.classList.replace('fas', 'far');
            const index = currentFavoritos.indexOf(local.nome);
            if (index !== -1) {
                currentFavoritos.splice(index, 1);
            }
        }
        salvarFavoritos(currentFavoritos);
    });

    item.appendChild(titulo);
    item.appendChild(filtroTexto);
    item.appendChild(favoritoBtn);

    link.appendChild(item); // O link envolve o item completo

    return link; // Retorna o link que contém o card
}

// Função para carregar e exibir os locais
async function carregarLocais() {
    try {
        const resposta = await fetch('../locais.json');
        const dados = await resposta.json();

        exibirLocais(dados);

        // Event listener para a pesquisa
        inputPesquisa.addEventListener('input', () => {
            const termo = inputPesquisa.value.toLowerCase();
            const filtrados = dados.filter(local =>
                local.nome.toLowerCase().includes(termo) ||
                local.filtro.toLowerCase().includes(termo) // Permite pesquisar por filtro também
            );
            exibirLocais(filtrados);
        });

    } catch (erro) {
        console.error('Erro ao carregar locais:', erro);
        listaContainer.innerHTML = '<p>Erro ao carregar os locais.</p>';
    }
}

// Função para exibir os locais no DOM
function exibirLocais(lista) {
    listaContainer.innerHTML = '';
    if (lista.length === 0) {
        listaContainer.innerHTML = '<p>Nenhum local encontrado.</p>';
        return;
    }

    lista.forEach(local => {
        const cardComLink = criarCard(local);
        listaContainer.appendChild(cardComLink);
    });
}

// Inicia o carregamento dos locais quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    carregarLocais(); // Move esta chamada para dentro do DOMContentLoaded

    // Lógica da Barra Lateral
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
});