import emailjs from 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/+esm';

const SERVICE_ID = 'service_atri9fl';
const TEMPLATE_ID = 'template_w5eqcoc';
const PUBLIC_KEY = '5pnCIfakenfSnoZ8g';

emailjs.init({ publicKey: PUBLIC_KEY });

export function initContactForm() {
  document.addEventListener('submit', async (e) => {
    const form = e.target.closest('form[data-contact-form]');
    if (!form) return;
    e.preventDefault();

    const btn = form.querySelector('[data-submit-btn]');
    const btnLabel = btn?.querySelector('span');
    const msgEl = form.querySelector('[data-form-msg]');

    if (btn) btn.disabled = true;
    if (btnLabel) btnLabel.textContent = 'Wysyłam…';
    if (msgEl) msgEl.hidden = true;

    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form);
      form.reset();
      if (msgEl) {
        msgEl.textContent = '✓ Wiadomość wysłana! Odezwiemy się wkrótce.';
        msgEl.className = 'homeKontaktMsg homeKontaktMsg--success';
        msgEl.hidden = false;
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('EmailJS error:', err);
      if (msgEl) {
        msgEl.textContent =
          'Coś poszło nie tak. Napisz bezpośrednio na biuro.kolorowecentrum@gmail.com';
        msgEl.className = 'homeKontaktMsg homeKontaktMsg--error';
        msgEl.hidden = false;
      }
    } finally {
      if (btn) btn.disabled = false;
      if (btnLabel) btnLabel.textContent = 'Wyślij wiadomość';
    }
  });
}
