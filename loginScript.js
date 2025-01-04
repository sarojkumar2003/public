document.addEventListener("DOMContentLoaded", function () {
  const signUpButton = document.getElementById("signUpButton");
  const signInButton = document.getElementById("signInButton");
  const signUpForm = document.getElementById("signup");
  const signInForm = document.getElementById("signIn");

  // Switch to Sign Up form
  signUpButton.addEventListener("click", function () {
    signInForm.style.display = "none";
    signUpForm.style.display = "block";
  });

  // Switch to Sign In form
  signInButton.addEventListener("click", function () {
    signUpForm.style.display = "none";
    signInForm.style.display = "block";
  });
});
