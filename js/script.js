
// O tema e o estado inicial do botão são restaurados durante a leitura do HTML.



// Executa todo o código apenas após o carregamento completo do DOM
document.addEventListener("DOMContentLoaded", function () {

  // === [1] CARROSSEL DE CERTIFICAÇÕES ===

  const carrossel = document.getElementById("carrossel");
  const container = document.querySelector(".carrossel-container");

  function mover(direcao) {
    const item = carrossel.querySelector(".item2");

    if (!item) return;
    const itemLargura = item.getBoundingClientRect().width +
      (parseFloat(getComputedStyle(carrossel).columnGap) || 0);

    container.scrollBy({
      left: direcao * itemLargura,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
    });
  }

  window.mover = mover;



  // === [2] SCRIPT DO MODAL DE PROJETOS ===

  const modal = document.getElementById("projectModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalImage = document.getElementById("modalImage");
  const modalDescription = document.getElementById("modalDescription");
  const modalTags = document.getElementById("modalTags");
  const closeBtn = document.getElementsByClassName("close")[0];

  // Novos elementos para vídeo
  const modalVideoContainer = document.getElementById("modalVideoContainer");
  const modalVideo = document.getElementById("modalVideo");

  const cards = document.querySelectorAll(".project-card");

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const title = card.getAttribute("data-title");
      const image = card.getAttribute("data-image");
      const description = card.getAttribute("data-description");
      const tagsAttr = card.getAttribute("data-tags");
      const video = card.getAttribute("data-video"); // Novo atributo

      if (!title || !description) {
        console.warn("O card está faltando informações essenciais.");
        return;
      }

      // Preenche o conteúdo
      modalTitle.innerText = title;
      modalDescription.innerText = description;

      // Exibe imagem se houver
      if (image) {
        modalImage.src = image;
        modalImage.style.display = "block";
      } else {
        modalImage.style.display = "none";
      }

      // Exibe vídeo se houver
      if (video) {
        modalVideoContainer.style.display = "block";
        modalVideo.querySelector("source").src = video;
        modalVideo.load();
      } else {
        modalVideoContainer.style.display = "none";
        modalVideo.pause();
      }

      // Limpa tags antigas
      modalTags.innerHTML = "";
      if (tagsAttr) {
        const tags = tagsAttr.split(",");
        tags.forEach((tag) => {
          const span = document.createElement("span");
          span.className = "tag-modal";
          span.innerText = tag.trim();
          modalTags.appendChild(span);
        });
      } else {
        modalTags.innerHTML = "<em>Nenhuma tecnologia especificada.</em>";
      }

      modal.style.display = "block";
    });
  });

  // Fecha o modal
  closeBtn.onclick = () => {
    modal.style.display = "none";
    modalVideo.pause();
  };

  // Fecha ao clicar fora
  window.onclick = (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
      modalVideo.pause();
    }
  };

  console.log("JavaScript carregado com sucesso!");
});


// === [3] SCRIPT DO CARROSSEL MOBILE (DOTS) ===

let slideAtual = 0;
const totalSlides = 4;
const carousel = document.getElementById("hardSkillsCarousel");
const dots = document.querySelectorAll(".carousel-indicators .dot");

// Faixa mobile derivada dos mesmos cards, mantendo as habilidades sincronizadas.
const skillsMobile = document.createElement('div');
skillsMobile.className = 'skills-mobile';
const skillsViewport = document.createElement('div');
skillsViewport.className = 'skills-mobile-viewport';
skillsViewport.tabIndex = 0;
skillsViewport.setAttribute('role', 'region');
skillsViewport.setAttribute('aria-label', 'Hard skills');
const skillsTrack = document.createElement('div');
skillsTrack.className = 'skills-mobile-track';
const skillsGroup = document.createElement('ul');
skillsGroup.className = 'skills-mobile-group';
carousel.querySelectorAll('.card').forEach(card => {
  const skill = document.createElement('li');
  skill.className = 'skill-mobile';
  const icon = card.querySelector('.icon').cloneNode(true);
  icon.setAttribute('aria-hidden', 'true');
  const name = document.createElement('span');
  name.textContent = card.querySelector('h3').textContent;
  skill.append(icon, name);
  skillsGroup.append(skill);
});
const skillsCopy = skillsGroup.cloneNode(true);
skillsCopy.setAttribute('aria-hidden', 'true');
skillsCopy.setAttribute('inert', '');
skillsTrack.append(skillsGroup, skillsCopy);
skillsViewport.append(skillsTrack);
skillsMobile.append(skillsViewport);
carousel.closest('.carousel-wrapper').after(skillsMobile);
carousel.closest('.sk').classList.add('has-mobile-skills');

function mudarSlide(index) {
  if (index === "anterior") {
    slideAtual = (slideAtual - 1 + totalSlides) % totalSlides;
  } else if (index === "proximo") {
    slideAtual = (slideAtual + 1) % totalSlides;
  } else {
    slideAtual = index;
  }

  const deslocamento = 100 / totalSlides;
  carousel.style.transform = `translateX(-${slideAtual * deslocamento}%)`;

  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === slideAtual);
  });
}


// === [4] SUPORTE A SWIPE (DESLIZE) EM DISPOSITIVOS MÓVEIS ===

let startX = 0;

carousel.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

carousel.addEventListener("touchend", (e) => {
  const endX = e.changedTouches[0].clientX;
  const diff = startX - endX;

  if (Math.abs(diff) > 50) {
    if (diff > 0) {
      mudarSlide("proximo");
    } else {
      mudarSlide("anterior");
    }
  }
});



// === [5] TROCA DE TEMA (EVENTO DO BOTÃO) ===
const toggle = document.getElementById('theme-toggle');

toggle.addEventListener('change', () => {
  if (toggle.checked) {
    document.body.classList.add('light-theme');
    localStorage.setItem('theme', 'light');
  } else {
    document.body.classList.remove('light-theme');
    localStorage.setItem('theme', 'dark');
  }
});


document.addEventListener("DOMContentLoaded", () => {

  const sections = [
    document.querySelector("#home"),
    document.querySelector("#certificacoes"),
    document.querySelector("#hardskills"),
    document.querySelector("#projetos")
  ];

  const navLinks = document.querySelectorAll(".navbar a");
  const headerOffset = 120; // altura do header

  function updateActiveLink() {
    let currentSection = sections[0];

    sections.forEach(section => {
      const rect = section.getBoundingClientRect();

      if (rect.top <= headerOffset) {
        currentSection = section;
      }
    });

    const id = currentSection.id;

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${id}`) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", updateActiveLink);
  updateActiveLink(); // ativa ao carregar
});
