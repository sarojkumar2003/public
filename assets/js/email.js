const btn = document.getElementById("button");
const form = document.getElementById("contact-form");

form.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevents default form submission

  btn.textContent = "Sending...";

  const serviceID = "default_service";
  const templateID = "template_i2d1nov";

  emailjs.sendForm(serviceID, templateID, form).then(
    () => {
      btn.textContent = "Send Message Now";
      alert("Message sent successfully!");
    },
    (err) => {
      btn.textContent = "Send Message Now";
      alert("Failed to send message: " + JSON.stringify(err));
    }
  );
});
