document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('waitlistForm');
  const confirmation = document.getElementById('confirmation');
  const submitButton = form.querySelector('button[type="submit"]');
  const SERVER_URL = 'https://landing-page-d086.onrender.com'; // URL del server Render

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    submitButton.disabled = true;

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {

      const response = await fetch('https://landing-page-d086.onrender.com/waitlist', {
0413d84 (Aggiornamento file locali)
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        confirmation.textContent = "You’ve been added to the waitlist! 🎉";
        confirmation.classList.add('show');
        form.reset();

        setTimeout(() => {
          confirmation.classList.remove('show');
          submitButton.disabled = false;
        }, 5000);
      } else {
        throw new Error('Failed to submit');
      }
    } catch (error) {
      confirmation.textContent = "Oops! Something went wrong. 😅";
      confirmation.classList.add('show', 'error');

      setTimeout(() => {
        confirmation.classList.remove('show', 'error');
        submitButton.disabled = false;
      }, 5000);
    }
  });
});
