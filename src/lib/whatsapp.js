// One place for the WhatsApp number and the messages sent to it. Orders are
// not taken through a checkout for now: a basket, or a single book, becomes a
// WhatsApp inquiry to this number. 0721 261 682 in international form.
export const WHATSAPP_NUMBER = '254721261682';

export const whatsappLink = text =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

export const generalMessage = 'Hello LawAfrica, I would like some help.';

// An inquiry about one title.
export const bookInquiry = ({ title, price }) =>
  `Hello LawAfrica, I would like to enquire about this book:\n\n${title}${price ? ` (${price})` : ''}\n\nIs it available, and how can I order it?`;

// An inquiry about everything in the basket. `lines` are the basket's lines
// (title, fmt, qty, lineTotal); `total` is the display total.
export function basketInquiry(lines, total) {
  const items = lines.map((l, i) =>
    `${i + 1}. ${l.title} (${l.fmt}) x ${l.qty} - ${l.lineTotal}`).join('\n');
  return `Hello LawAfrica, I would like to enquire about these books:\n\n${items}\n\nTotal: ${total}\n\nPlease confirm availability, delivery and how to pay.`;
}
