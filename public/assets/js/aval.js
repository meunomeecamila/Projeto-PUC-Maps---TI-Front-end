// aval.js
document.addEventListener('DOMContentLoaded', function () {
  const API_URL = 'http://localhost:3000/aval';
  const form = document.getElementById('avaliacaoForm');
  const mensagem = document.getElementById('mensagem');

  // Função para listar avaliações na tabela
  function carregarAvaliacoes() {
    fetch(API_URL)
      .then(res => res.json())
      .then(avals => {
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
      })
      .catch(err => {
        console.error('Erro ao carregar avaliações:', err);
        mensagem.textContent = "Erro ao carregar avaliações.";
        mensagem.style.color = 'red';
      });
  }

  // Evento do formulário para enviar nova avaliação (POST)
  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      const novaAval = {
        nome: form.nome.value.trim(),
        curso: form.curso.value.trim(),
        periodo: form.periodo.value.trim(),
        nota: parseInt(form.nota.value),
        comentario: form.comentario.value.trim()
      };

      // Validação simples
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

      fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novaAval)
      })
        .then(res => {
          if (!res.ok) throw new Error('Erro ao enviar avaliação.');
          return res.json();
        })
        .then(() => {
          mensagem.textContent = "Avaliação enviada com sucesso!";
          mensagem.style.color = "green";
          form.reset();
          carregarAvaliacoes();
        })
        .catch(err => {
          console.error(err);
          mensagem.textContent = "Erro ao enviar avaliação. Tente novamente.";
          mensagem.style.color = "red";
        });
    });
  }

  // Função global para editar avaliação (PATCH)
  window.editarAval = function (id) {
    const nome = prompt("Novo nome:");
    const curso = prompt("Novo curso:");
    const periodo = prompt("Novo período:");
    const nota = prompt("Nova nota (0 a 10):");
    const comentario = prompt("Novo comentário:");

    const dadosAtualizados = {
      nome,
      curso,
      periodo,
      nota: parseInt(nota),
      comentario
    };

    fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dadosAtualizados)
    })
      .then(() => {
        alert('Avaliação atualizada!');
        carregarAvaliacoes();
      })
      .catch(err => {
        console.error('Erro ao atualizar avaliação:', err);
        alert('Erro ao atualizar avaliação.');
      });
  };

  // Função global para deletar avaliação (DELETE)
  window.deletarAval = function (id) {
    if (confirm('Tem certeza que deseja excluir esta avaliação?')) {
      fetch(`${API_URL}/${id}`, { method: 'DELETE' })
        .then(() => {
          alert('Avaliação excluída!');
          carregarAvaliacoes();
        })
        .catch(err => {
          console.error('Erro ao excluir avaliação:', err);
          alert('Erro ao excluir avaliação.');
        });
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

