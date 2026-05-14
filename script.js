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
