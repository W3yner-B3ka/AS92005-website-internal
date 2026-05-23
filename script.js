// Section observer — adds .active to unblur sections on scroll
const sections = document.querySelectorAll(".sections");
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      } else {
        entry.target.classList.remove("active");
      }
    });
  },
  { threshold: 0.3 },
);
sections.forEach((section, index) => {
  if (index !== 0) sectionObserver.observe(section);
});

// Scale + fade the title as the user scrolls past section 1
const scaleSection = document.querySelector(".section-1");
const scaleTitle = document.querySelector(".section-1 h1");
window.addEventListener("scroll", () => {
  const progress = Math.min(window.scrollY / scaleSection.offsetHeight, 1);
  scaleTitle.style.transform = `scale(${1 + progress * 7})`;
  scaleTitle.style.opacity = Math.max(1 - progress * 1.5, 0);
});

// Apply planet theme from body data attribute
const planet = document.body.dataset.planet;
if (planet) document.documentElement.classList.add(`theme-${planet}`);
