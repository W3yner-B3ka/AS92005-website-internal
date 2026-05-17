// Change theme of the website
const themeToggle = document.getElementById("theme-toggle");

// Toggle between light and dark themes when the button is clicked
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");

  //   Save the user's theme preference in local storage
  if (document.body.classList.contains("light-theme")) {
    localStorage.setItem("theme", "light");
  } else {
    localStorage.setItem("theme", "dark");
  }
});

// Load the user's theme preference from local storage when the page loads
window.addEventListener("load", () => {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "light") {
    document.body.classList.add("light-theme");
  }
});

// Scroll animation
//For each element with the class "hidden",
// observe when it enters the viewport
// and add the "animate" class to trigger the animation.
//  Remove the "animate" class when it leaves the viewport.
const animationObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    console.log(entry);
    if (entry.isIntersecting) {
      entry.target.classList.add("animate");
    } else {
      entry.target.classList.remove("animate");
    }
  });
});

const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((el) => animationObserver.observe(el));

// Section observer
const sections = document.querySelectorAll(".sections");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active"); // unblur when scrolled into view
      } else {
        entry.target.classList.remove("active"); // re-blur when scrolled away
      }
    });
  },
  {
    threshold: 0.6, // adjust how strict the “focus zone” is
  },
);

sections.forEach((section, index) => {
  if (index !== 0) sectionObserver.observe(section);
});

// scale animation
const scaleSection = document.querySelector(".section-1");
const scaleTitle = document.querySelector(".section-1 h1");

window.addEventListener("scroll", () => {
  // progress: how far through the section we've scrolled (0 = top, 1 = bottom)
  // Math.min clamps it to 1 so it never exceeds 100%
  const progress = Math.min(window.scrollY / scaleSection.offsetHeight, 1);

  // scale grows from 1 (normal) to 8 (huge) as progress goes 0 → 1
  scaleTitle.style.transform = `scale(${1 + progress * 7})`;

  // opacity drops from 1 (visible) to 0 (invisible), clamped so it never goes negative
  scaleTitle.style.opacity = Math.max(1 - progress * 1.5, 0);
});
