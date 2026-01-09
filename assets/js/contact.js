document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const successToastEl = document.getElementById("successToast");
  const errorToastEl = document.getElementById("errorToast");

  const successToast = successToastEl
    ? new bootstrap.Toast(successToastEl)
    : null;

  const errorToast = errorToastEl
    ? new bootstrap.Toast(errorToastEl)
    : null;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: {
          "Accept": "application/json"
        }
      });

      if (response.ok) {
        form.reset();
        successToast?.show(); // ✅ SUCCESS
      } else {
        console.error("Formspree error", response.status);
        errorToast?.show(); // ❌ SERVER ERROR
      }

    } catch (err) {
      console.error("Network error", err);
      errorToast?.show(); // ❌ NETWORK ERROR
    }
  });
});