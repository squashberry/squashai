const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const menuButton = document.getElementById("menuButton");
const mobileNav = document.getElementById("mobileNav");

const savedTheme = localStorage.getItem("squashai-theme");
if (savedTheme === "light") root.dataset.theme = "light";

function updateThemeIcon() {
  themeToggle.textContent = root.dataset.theme === "light" ? "☀" : "◐";
}
updateThemeIcon();

themeToggle?.addEventListener("click", () => {
  if (root.dataset.theme === "light") {
    delete root.dataset.theme;
    localStorage.setItem("squashai-theme", "dark");
  } else {
    root.dataset.theme = "light";
    localStorage.setItem("squashai-theme", "light");
  }
  updateThemeIcon();
});

menuButton?.addEventListener("click", () => {
  mobileNav.classList.toggle("open");
  menuButton.textContent = mobileNav.classList.contains("open") ? "×" : "☰";
});

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", () => {
    mobileNav.classList.remove("open");
    if (menuButton) menuButton.textContent = "☰";
  });
});

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

const sections = [...document.querySelectorAll("section[id]")];
const navLinks = [...document.querySelectorAll('.desktop-nav a')];

const sectionObserver = new IntersectionObserver(
  entries => {
    const visible = entries
      .filter(entry => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;
    navLinks.forEach(link => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === "#" + visible.target.id
      );
    });
  },
  { rootMargin: "-25% 0px -60% 0px", threshold: [0.1, 0.3, 0.6] }
);

sections.forEach(section => sectionObserver.observe(section));

const cards = [...document.querySelectorAll(".model-card")];
cards.forEach(card => {
  card.addEventListener("click", () => {
    cards.forEach(item => item.classList.remove("focus"));
    card.classList.add("focus");
  });
});

window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});
