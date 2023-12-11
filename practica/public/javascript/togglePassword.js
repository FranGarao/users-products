const togglePasswordButton = document.getElementById("togglePassword");
const passwordField = document.getElementById("password");

togglePasswordButton.addEventListener("click", () => {
  togglePasswordVisibility();
});

function togglePasswordVisibility() {
  if (passwordField.type === "password") {
    passwordField.type = "text";
    togglePasswordButton.classList.remove("fa-eye");
    togglePasswordButton.classList.add("fa-eye-slash");
  } else {
    passwordField.type = "password";
    togglePasswordButton.classList.remove("fa-eye-slash");
    togglePasswordButton.classList.add("fa-eye");
  }
}
