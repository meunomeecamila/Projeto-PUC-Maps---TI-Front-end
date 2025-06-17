document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("avaliacoes-lista");

  fetch("http://localhost:3000/aval")
    .then(response => {
      if (!response.ok) throw new Error("Erro ao carregar as avaliações");
      return response.json();
    })
    .then(data => {
      const avaliacoes = data; // <- acessa corretamente o array

      if (!avaliacoes || avaliacoes.length === 0) {
        container.innerHTML = "<p>Nenhuma avaliação encontrada.</p>";
        return;
      }

      avaliacoes.forEach(avaliacao => {
        const item = document.createElement("div");
        item.className = "avaliacao-item";

        // Estrelas visuais com base na nota (0 a 10 → escala 5 estrelas)
        const nota5 = Math.round(avaliacao.nota / 2); // de 10 para 5 estrelas
        const estrelas = "★".repeat(nota5) + "☆".repeat(5 - nota5);

        item.innerHTML = `
          <p><strong>Nome:</strong> ${avaliacao.nome}</p>
          <p><strong>Curso:</strong> ${avaliacao.curso}</p>
          <p><strong>Período:</strong> ${avaliacao.periodo}</p>
          <p><strong>Nota:</strong> <span class="estrelas">${estrelas}</span> (${avaliacao.nota}/10)</p>
          <p><strong>Comentário:</strong> ${avaliacao.comentario}</p>
        `;

        container.appendChild(item);
      });
    })
    .catch(error => {
      console.error("Erro ao buscar avaliações:", error);
      container.innerHTML = "<p>Erro ao carregar avaliações. Tente novamente mais tarde.</p>";
    });
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
