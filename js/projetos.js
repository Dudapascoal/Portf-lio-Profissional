// === [1] APLICA O TEMA ESCOLHIDO NA INDEX ===
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
  document.body.classList.add("light-theme"); // Tema claro
} else {
  document.body.classList.remove("light-theme"); // Tema escuro padrão
}

// === [2] SCRIPT DO MODAL DE PROJETOS ===
document.addEventListener("DOMContentLoaded", () => {
  // Seleção de elementos do modal
  const modal = document.getElementById("projectModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalImage = document.getElementById("modalImage");
  const modalDescription = document.getElementById("modalDescription");
  const modalTags = document.getElementById("modalTags");
  const closeBtn = document.querySelector(".close");

  // Elementos adicionais para vídeo
  const modalVideoContainer = document.getElementById("modalVideoContainer");
  const modalVideo = document.getElementById("modalVideo");

  const cards = document.querySelectorAll(".project-card");

  // Verifica se os elementos essenciais existem
  if (
    !modal ||
    !modalTitle ||
    !modalImage ||
    !modalDescription ||
    !modalTags ||
    !closeBtn
  ) {
    console.error("Erro: Elementos do modal não encontrados no DOM.");
    return;
  }

  // Adiciona evento de clique a cada card de projeto
  cards.forEach((card, index) => {
    card.addEventListener("click", () => {
      const title = card.getAttribute("data-title");
      const image = card.getAttribute("data-image");
      const description = card.getAttribute("data-description");
      const tagsAttr = card.getAttribute("data-tags");
      const video = card.getAttribute("data-video"); // Novo atributo para vídeos

      // Verifica se os dados essenciais estão presentes
      if (!title || !description) {
        console.warn(`Card ${index + 1} incompleto.`, { title, description });
        return;
      }

      // Preenche conteúdo do modal
      modalTitle.textContent = title;
      modalDescription.textContent = description;

      // === IMAGEM ===
      if (image) {
        modalImage.src = image;
        modalImage.alt = title;
        modalImage.style.display = "block";
      } else {
        modalImage.style.display = "none";
      }

      // === VÍDEO ===
      if (video) {
        modalVideoContainer.style.display = "block";
        modalVideo.querySelector("source").src = video;
        modalVideo.load();
      } else {
        modalVideoContainer.style.display = "none";
        modalVideo.pause();
      }

      // === TAGS ===
      modalTags.innerHTML = "";
      if (tagsAttr) {
        const tags = tagsAttr
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag);
        if (tags.length > 0) {
          tags.forEach((tag) => {
            const span = document.createElement("span");
            span.className = "tag-modal";
            span.textContent = tag;
            modalTags.appendChild(span);
          });
        } else {
          modalTags.innerHTML = "<em>Nenhuma tecnologia especificada.</em>";
        }
      } else {
        modalTags.innerHTML = "<em>Nenhuma tecnologia especificada.</em>";
      }

      // Exibe o modal
      modal.style.display = "block";
    });
  });

  // === FECHAR MODAL ===
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
    modalVideo.pause();
  });

  // Fecha ao clicar fora da área do modal
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
      modalVideo.pause();
    }
  });

  console.log("Modal de projetos inicializado com sucesso!");
});
