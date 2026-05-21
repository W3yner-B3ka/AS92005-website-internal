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
        console.log("section intersecting:", entry.target.className);
        entry.target.classList.add("active"); // unblur when scrolled into view

        // retrigger the circle animation
        const circle = entry.target.querySelector(".circle::before");
        const circleEl = entry.target.querySelector(".circle");
        if (circleEl) {
          circleEl.classList.remove("circle-animate");
          void circleEl.offsetWidth; // force reflow to reset animation
          circleEl.classList.add("circle-animate");
        }
      } else {
        entry.target.classList.remove("active"); // re-blur when scrolled away
      }
    });
  },
  {
    threshold: 0.3, // adjust how strict the “focus zone” is
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

// run the typewritter animation only when it reaches the next section
const text = document.querySelector(".planet-content p");

if (text) {
  const typewritterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("typing");
          // allows to rerun
          void entry.target.offsetWidth;
          entry.target.classList.add("typing");
        }
      });
    },
    {
      threshold: 0.6,
    },
  );

  typewritterObserver.observe(text);
}
