class Presentation {
  constructor() {
    this.currentSlide = 0;
    this.slides = document.querySelectorAll(".slide");
    this.totalSlides = this.slides.length;
    this.counter = document.querySelector(".slide-counter");

    this.initializeEventListeners();
    this.showSlide(0);
  }

  showSlide(index) {
    this.slides.forEach((slide) => slide.classList.remove("active"));
    this.slides[index].classList.add("active");
    this.counter.textContent = `${index + 1} / ${this.totalSlides}`;
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
    this.showSlide(this.currentSlide);
  }

  previousSlide() {
    this.currentSlide =
      (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
    this.showSlide(this.currentSlide);
  }

  toggleTheme() {
    const body = document.body;
    const button = document.querySelector(".theme-toggle");
    const currentTheme = body.getAttribute("data-theme");

    // Toggle theme
    if (currentTheme === "light") {
      body.setAttribute("data-theme", "dark");
      button.innerHTML = `
        <span style="font-size: 16px;">☀️</span>
        <span>Light</span>
      `;
      localStorage.setItem("theme", "dark");
    } else {
      body.setAttribute("data-theme", "light");
      button.innerHTML = `
        <span style="font-size: 16px;">🌙</span>
        <span>Dark</span>
      `;
      localStorage.setItem("theme", "light");
    }

    // Add transition
    body.style.transition = "background-color 0.3s ease, color 0.3s ease";

    // Remove transition after theme change
    setTimeout(() => {
      body.style.transition = "";
    }, 300);
  }

  initializeTheme() {
    const savedTheme = localStorage.getItem("theme") || "light";
    const body = document.body;
    const button = document.querySelector(".theme-toggle");

    // Set initial theme
    body.setAttribute("data-theme", savedTheme);

    // Set initial button state
    if (savedTheme === "dark") {
      button.innerHTML = `
        <span style="font-size: 16px;">☀️</span>
        <span>Light</span>
      `;
    } else {
      button.innerHTML = `
        <span style="font-size: 16px;">🌙</span>
        <span>Dark</span>
      `;
    }
  }

  initializeEventListeners() {
    // Navigation buttons
    document
      .querySelector('.control-btn[data-action="previous"]')
      ?.addEventListener("click", () => this.previousSlide());

    document
      .querySelector('.control-btn[data-action="next"]')
      ?.addEventListener("click", () => this.nextSlide());

    // Theme toggle
    const themeToggle = document.querySelector(".theme-toggle");
    if (themeToggle) {
      themeToggle.addEventListener("click", () => this.toggleTheme());
      // Initialize theme from localStorage
      this.initializeTheme();
    }

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        this.nextSlide();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        this.previousSlide();
      }
    });
  }
}

// Initialize presentation when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new Presentation();
});
