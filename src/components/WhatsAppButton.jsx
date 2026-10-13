import { whatsappLink, generalMessage } from '../lib/whatsapp.js';

// Floating WhatsApp chat button, bottom right on every page (it is mounted in
// Layout).
export default function WhatsAppButton() {
  const href = whatsappLink(generalMessage);
  return (
    <a
      className="wa-float"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with LawAfrica on WhatsApp"
      translate="no"
    >
      <svg viewBox="0 0 32 32" width="30" height="30" aria-hidden="true" fill="currentColor">
        <path d="M16.04 3C9.4 3 4 8.4 4 15.03c0 2.12.55 4.19 1.6 6.01L4 29l8.15-1.57a12.03 12.03 0 0 0 3.89.64h.01C22.7 28.07 28 22.67 28 16.04 28 9.4 22.68 3 16.04 3Zm0 22.05h-.01a9.97 9.97 0 0 1-5.08-1.39l-.36-.22-4.84.93.97-4.72-.24-.38a9.93 9.93 0 0 1-1.52-5.25c0-5.5 4.48-9.98 9.99-9.98 5.5 0 9.97 4.48 9.97 9.99 0 5.5-4.47 9.02-8.88 9.02Zm5.47-7.47c-.3-.15-1.77-.87-2.04-.97-.28-.1-.48-.15-.68.15-.2.3-.78.97-.95 1.17-.18.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.49-.9-.8-1.5-1.78-1.67-2.08-.18-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.68-1.64-.93-2.25-.24-.58-.49-.5-.68-.51h-.58c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Z" />
      </svg>
    </a>
  );
}
