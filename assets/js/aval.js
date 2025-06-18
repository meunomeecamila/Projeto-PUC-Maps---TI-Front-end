document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('avaliacaoForm');
  const mensagem = document.getElementById('mensagem');

  // Função para obter as avaliações do Local Storage
  function getAvaliacoes() {
    return JSON.parse(localStorage.getItem('avaliacoes')) || [];
  }

  // Função para salvar as avaliações no Local Storage
  function setAvaliacoes(avals) {
    localStorage.setItem('avaliacoes', JSON.stringify(avals));
  }

  // Função para gerar um ID único
  function gerarId() {
    return Date.now();
  }

  // Função para listar avaliações na tabela
  function carregarAvaliacoes() {
    const avals = getAvaliacoes();
    const tbody = document.querySelector('tbody');
    if (!tbody) return;
    tbody.innerHTML = '';

    avals.forEach(aval => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${aval.nome}</td>
        <td>${aval.curso}</td>
        <td>${aval.periodo}</td>
        <td>${aval.nota}</td>
        <td>${aval.comentario}</td>
        <td>
          <button onclick="editarAval(${aval.id})">Editar</button>
          <button onclick="deletarAval(${aval.id})">Excluir</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  // Evento do formulário para enviar nova avaliação
  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      const novaAval = {
        id: gerarId(),
        nome: form.nome.value.trim(),
        curso: form.curso.value.trim(),
        periodo: form.periodo.value.trim(),
        nota: parseInt(form.nota.value),
        comentario: form.comentario.value.trim()
      };

      // Validação
      if (
        !novaAval.nome ||
        !novaAval.curso ||
        !novaAval.periodo ||
        isNaN(novaAval.nota) ||
        novaAval.nota < 0 ||
        novaAval.nota > 10
      ) {
        mensagem.textContent = "Preencha todos os campos corretamente.";
        mensagem.style.color = "red";
        return;
      }

      const avals = getAvaliacoes();
      avals.push(novaAval);
      setAvaliacoes(avals);

      mensagem.textContent = "Avaliação enviada com sucesso!";
      mensagem.style.color = "green";
      form.reset();
      carregarAvaliacoes();
    });
  }

  // Função global para editar avaliação
  window.editarAval = function (id) {
    const avals = getAvaliacoes();
    const index = avals.findIndex(a => a.id === id);
    if (index === -1) return;

    const nome = prompt("Novo nome:", avals[index].nome);
    const curso = prompt("Novo curso:", avals[index].curso);
    const periodo = prompt("Novo período:", avals[index].periodo);
    const nota = prompt("Nova nota (0 a 10):", avals[index].nota);
    const comentario = prompt("Novo comentário:", avals[index].comentario);

    if (
      nome && curso && periodo &&
      !isNaN(parseInt(nota)) && parseInt(nota) >= 0 && parseInt(nota) <= 10 &&
      comentario
    ) {
      avals[index] = {
        ...avals[index],
        nome,
        curso,
        periodo,
        nota: parseInt(nota),
        comentario
      };
      setAvaliacoes(avals);
      alert('Avaliação atualizada!');
      carregarAvaliacoes();
    } else {
      alert('Dados inválidos. Edição cancelada.');
    }
  };

  // Função global para deletar avaliação
  window.deletarAval = function (id) {
    if (confirm('Tem certeza que deseja excluir esta avaliação?')) {
      const avals = getAvaliacoes().filter(aval => aval.id !== id);
      setAvaliacoes(avals);
      alert('Avaliação excluída!');
      carregarAvaliacoes();
    }
  };

  // Carrega as avaliações ao abrir a página
  carregarAvaliacoes();
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
