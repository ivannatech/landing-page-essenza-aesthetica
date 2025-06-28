// Variáveis globais
let currentSlide = 0;
let currentTestimonial = 0;
const slides = document.querySelectorAll(".slide");
const testimonials = document.querySelectorAll(".testimonial");

// Menu responsivo
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", function () {
      navMenu.classList.toggle("active");
      hamburger.classList.toggle("active");
    });

    // Fechar menu ao clicar em um link
    document.querySelectorAll(".nav-menu a").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        hamburger.classList.remove("active");
      });
    });
  }
});

// Slider de Antes/Depois
function changeSlide(direction) {
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".slider-controls .dot");

  if (slides.length === 0) return;

  // Remove active da slide atual
  slides[currentSlide].classList.remove("active");
  dots[currentSlide].classList.remove("active");

  // Calcula nova slide
  currentSlide += direction;

  if (currentSlide >= slides.length) {
    currentSlide = 0;
  } else if (currentSlide < 0) {
    currentSlide = slides.length - 1;
  }

  // Adiciona active na nova slide
  slides[currentSlide].classList.add("active");
  dots[currentSlide].classList.add("active");
}

function currentSlideFunc(n) {
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".slider-controls .dot");

  if (slides.length === 0) return;

  // Remove active da slide atual
  slides[currentSlide].classList.remove("active");
  dots[currentSlide].classList.remove("active");

  // Define nova slide
  currentSlide = n - 1;

  // Adiciona active na nova slide
  slides[currentSlide].classList.add("active");
  dots[currentSlide].classList.add("active");
}

// Slider automático de antes/depois (opcional)
setInterval(() => {
  if (document.querySelectorAll(".slide").length > 0) {
    changeSlide(1);
  }
}, 5000);

// Carrossel de Depoimentos
function showTestimonial(index) {
  const testimonials = document.querySelectorAll(".testimonial");
  const dots = document.querySelectorAll(".testimonials-dots .dot");

  if (testimonials.length === 0) return;

  // Remove active do depoimento atual
  testimonials[currentTestimonial].classList.remove("active");
  dots[currentTestimonial].classList.remove("active");

  // Define novo depoimento
  currentTestimonial = index;

  // Adiciona active no novo depoimento
  testimonials[currentTestimonial].classList.add("active");
  dots[currentTestimonial].classList.add("active");
}

// Auto-rotação dos depoimentos
setInterval(() => {
  const testimonials = document.querySelectorAll(".testimonial");
  if (testimonials.length > 0) {
    let nextTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(nextTestimonial);
  }
}, 4000);

// FAQ Accordion
function toggleFaq(element) {
  const faqAnswer = element.nextElementSibling;
  const faqIcon = element.querySelector(".faq-icon");
  const allAnswers = document.querySelectorAll(".faq-answer");
  const allIcons = document.querySelectorAll(".faq-icon");

  // Fechar todas as outras respostas
  allAnswers.forEach((answer, index) => {
    if (answer !== faqAnswer) {
      answer.classList.remove("active");
      allIcons[index].textContent = "+";
    }
  });

  // Toggle da resposta atual
  if (faqAnswer.classList.contains("active")) {
    faqAnswer.classList.remove("active");
    faqIcon.textContent = "+";
  } else {
    faqAnswer.classList.add("active");
    faqIcon.textContent = "−";
  }
}

// Formulário de Contato
document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Validação básica
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const treatment = document.getElementById("treatment").value;

      if (!name || !email || !phone || !treatment) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return;
      }

      // Validação de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("Por favor, insira um e-mail válido.");
        return;
      }

      // Validação de telefone (básica)
      const phoneRegex = /^[\d\s\(\)\-\+]+$/;
      if (!phoneRegex.test(phone)) {
        alert("Por favor, insira um telefone válido.");
        return;
      }

      // Simular envio do formulário
      const submitButton = contactForm.querySelector(".submit-button");
      const originalText = submitButton.textContent;

      submitButton.textContent = "Enviando...";
      submitButton.disabled = true;

      setTimeout(() => {
        alert(
          "Solicitação enviada com sucesso! Entraremos em contato em breve."
        );
        contactForm.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
      }, 2000);
    });
  }
});

// Scroll suave para seções
function scrollToContact() {
  const contactSection = document.getElementById("contato");
  if (contactSection) {
    contactSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

// Animação de entrada dos elementos
function observeElements() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in-up");
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  // Observar elementos que devem ser animados
  const elementsToObserve = document.querySelectorAll(
    ".treatment-card, .differential-item, .testimonial, .faq-item"
  );

  elementsToObserve.forEach((el) => {
    observer.observe(el);
  });
}

// Inicializar animações quando a página carregar
document.addEventListener("DOMContentLoaded", observeElements);

// Header transparente/opaco baseado no scroll
window.addEventListener("scroll", function () {
  const header = document.querySelector(".header");
  if (window.scrollY > 100) {
    header.style.background = "rgba(255, 255, 255, 0.98)";
  } else {
    header.style.background = "rgba(255, 255, 255, 0.95)";
  }
});

// Preloader (opcional)
window.addEventListener("load", function () {
  document.body.classList.add("loaded");
});

// Melhorar acessibilidade - navegação por teclado
document.addEventListener("keydown", function (e) {
  // ESC para fechar menu mobile
  if (e.key === "Escape") {
    const navMenu = document.querySelector(".nav-menu");
    const hamburger = document.querySelector(".hamburger");
    if (navMenu && navMenu.classList.contains("active")) {
      navMenu.classList.remove("active");
      hamburger.classList.remove("active");
    }
  }

  // Setas para navegar nos sliders
  if (e.key === "ArrowLeft") {
    changeSlide(-1);
  } else if (e.key === "ArrowRight") {
    changeSlide(1);
  }
});

// Analytics básico (simular eventos)
function trackEvent(eventName, data = {}) {
  console.log(`Evento: ${eventName}`, data);
  // Aqui você integraria com Google Analytics, Facebook Pixel, etc.
}

// Rastrear cliques importantes
document.addEventListener("click", function (e) {
  if (e.target.matches(".cta-button")) {
    trackEvent("CTA_Click", { button: "Agende sua Avaliacao" });
  }

  if (e.target.matches(".submit-button")) {
    trackEvent("Form_Submit", { form: "Contact Form" });
  }

  if (e.target.matches(".maps-link")) {
    trackEvent("Maps_Click", { action: "View Location" });
  }

  if (e.target.closest(".social-icons a")) {
    const socialNetwork = e.target.closest("a").getAttribute("aria-label");
    trackEvent("Social_Click", { network: socialNetwork });
  }
});

// Lazy loading para imagens (melhoria de performance)
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        img.classList.remove("lazy");
        imageObserver.unobserve(img);
      }
    });
  });

  document.querySelectorAll("img[data-src]").forEach((img) => {
    imageObserver.observe(img);
  });
}

// Função para detectar dispositivo móvel
function isMobile() {
  return window.innerWidth <= 768;
}

// Ajustar comportamentos para mobile
if (isMobile()) {
  // Reduzir intervalo dos sliders em mobile
  document.addEventListener("DOMContentLoaded", function () {
    // Implementar swipe gestures seria ideal aqui
    console.log("Dispositivo móvel detectado");
  });
}

// Console log para debug
console.log("Essenza - Scripts carregados com sucesso!");
console.log("Desenvolvido com ❤️ para realçar sua beleza natural.");
