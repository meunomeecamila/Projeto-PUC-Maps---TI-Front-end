// Cria o mapa com os controles de zoom desativados
const map = L.map('map', {
  center: [-19.9227917, -43.9925170],
  zoom: 16,
  zoomControl: false
});

L.control.zoom({
  position: 'topleft'
}).addTo(map);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

const GrupoDeMarcadores = L.layerGroup().addTo(map);

// Carrega marcadores do JSON
fetch('../locais.json')
  .then(response => response.json())
  .then(locais => {
    locais.forEach(local => {
      L.marker(local.coords)
        .addTo(GrupoDeMarcadores)
        .bindPopup(local.nome);
    });
  })
  .catch(error => {
    console.error('Erro ao carregar os locais:', error);
  });

// Ícones mudam de cor ao clicar
document.querySelectorAll('.icons i').forEach(icon => {
  icon.addEventListener('click', () => {
    icon.classList.toggle('active');
  });
});

// Função para normalizar texto (retira acentos e caixa alta)
function normalizarTexto(texto) {
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

var filtro = '';

const botaoFiltro = document.getElementById("filtro");
const bot1 = document.getElementById("Predio");
const bot2 = document.getElementById("Alimentacao");
const bot3 = document.getElementById("entretenimento");
const bot4 = document.getElementById("ajuda");
const box = document.getElementById("box");

// 🔥 Transição suave na aba de filtros
botaoFiltro.addEventListener('click', () => {
  box.classList.toggle('show');
});

// Filtros dos botões
bot1.addEventListener("click", async function () {
  filtro = "Prédio";
  await buscarFiltro(filtro);
});
bot2.addEventListener("click", async function () {
  filtro = "Alimentação";
  await buscarFiltro(filtro);
});
bot3.addEventListener("click", async function () {
  filtro = "Entretenimento";
  await buscarFiltro(filtro);
});
bot4.addEventListener("click", async function () {
  filtro = "Ajuda";
  await buscarFiltro(filtro);
});

// Função para buscar pelo filtro
async function buscarFiltro(filtro) {
  const data = await fetch('../locais.json');
  const locais = await data.json();
  GrupoDeMarcadores.clearLayers();

  const filtroNormalizado = normalizarTexto(filtro);

  const locaisFiltrados = locais.filter(local =>
    normalizarTexto(local.filtro) === filtroNormalizado
  );

  locaisFiltrados.forEach(local => {
    L.marker(local.coords)
      .addTo(GrupoDeMarcadores)
      .bindPopup(local.nome);
  });

  // Fecha a aba de filtros após escolher
  box.classList.remove('show');
}

// 🔍 Pesquisa digitada
var digitado = '';

async function buscarLocal() {
  const data = await fetch('../locais.json');
  const locais = await data.json();

  const digitadoNormalizado = normalizarTexto(digitado);

  if (digitadoNormalizado === '') {
    GrupoDeMarcadores.clearLayers();
    locais.forEach(local => {
      L.marker(local.coords)
        .addTo(GrupoDeMarcadores)
        .bindPopup(local.nome);
    });
  } else {
    const localEncontrado = locais.find(local =>
      normalizarTexto(local.nome) === digitadoNormalizado
    );

    GrupoDeMarcadores.clearLayers();

    if (localEncontrado) {
      L.marker(localEncontrado.coords)
        .addTo(GrupoDeMarcadores)
        .bindPopup(localEncontrado.nome);
    } else {
      alert('Local inexistente');
    }
  }
}

// Eventos da barra de pesquisa
const searchbar = document.getElementById("searchbar");
const OKbutton = document.getElementById('ok');

OKbutton.addEventListener("click", async function () {
  await buscarLocal();
});

searchbar.addEventListener("input", async function (e) {
  digitado = e.target.value;
});
searchbar.addEventListener("keydown", async function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    await buscarLocal();
  }
});

// Sidebar
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


document.addEventListener('DOMContentLoaded', function() {
    const authLink = document.getElementById('authLink');
    const loggedInUser = localStorage.getItem('loggedInUser');

    if (loggedInUser) {
        authLink.innerHTML = `<i class="fas fa-sign-out-alt" title="Logout"></i>`;
        authLink.href = "#";
        authLink.addEventListener('click', function() {
            localStorage.removeItem('loggedInUser');
            alert('Logout realizado!');
            window.location.href = 'login.html';
        });
    } else {
        authLink.innerHTML = `<i class="fas fa-sign-in-alt" title="Login"></i>`;
        authLink.href = "login.html";
    }
});
