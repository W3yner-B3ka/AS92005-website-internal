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
const observer = new IntersectionObserver((entries) => {
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
hiddenElements.forEach((el) => observer.observe(el));
