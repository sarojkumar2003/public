document.addEventListener("DOMContentLoaded", function () {
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");
  const hamburgerIcon = document.getElementById("hamburger-icon");
  const closeIcon = document.getElementById("close-icon");

  // Add event listener to the mobile menu button
  mobileMenuButton.addEventListener("click", function () {
    // Toggle the mobile menu visibility
    mobileMenu.classList.toggle("hidden");

    // Toggle the visibility of the hamburger and close icons
    hamburgerIcon.classList.toggle("hidden");
    closeIcon.classList.toggle("hidden");
  });
});

