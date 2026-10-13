import { useState } from 'react';
import ContactRoutes from '../components/ContactRoutes.jsx';

export default function Contact() {
  const [mood, setMood] = useState(null);

  return (
    <div className="page">
      {/* Header band: the page opens on what a visitor most wants to know
           before choosing a desk — can I ring, when, and how fast is a reply. */}
      <section className="talk-hero">
        <div className="wrap">
          <h1 className="sr-only">Talk to us</h1>
          <dl className="talk-facts">
            <div><dt>Contact</dt><dd><a href="tel:+254202495067">+254 20 249 5067</a></dd></div>
            <div><dt>Hours</dt><dd>Mon–Fri, 08:30–17:00 EAT</dd></div>
            <div><dt>Reply time</dt><dd>Within one working day</dd></div>
          </dl>
        </div>
      </section>

      <div className="wrap talk-body">
        <div className="talk-head">
          <h2>Choose the right desk</h2>
          <p>Four teams, each with its own address and line.</p>
        </div>
        <ContactRoutes />

        <div className="talk-split">
          <div className="talk-form">
            <h2>Send an enquiry</h2>
            <p className="talk-form-note">We ask only for what we need to reply. Fields marked optional can be left blank.</p>
            <div className="talk-form-grid">
              <div className="field"><label htmlFor="eq-name">Your name</label><input id="eq-name" className="input" /></div>
              <div className="field"><label htmlFor="eq-mail">Email address</label><input id="eq-mail" className="input" type="email" /></div>
              <div className="field"><label htmlFor="eq-org">Organisation <span className="opt">(optional)</span></label><input id="eq-org" className="input" /></div>
              <div className="field"><label htmlFor="eq-topic">What is your enquiry about?</label>
                <select id="eq-topic" className="input"><option>Buying a book</option><option>Institutional quotation</option><option>Law Reports subscription</option><option>eBook access problem</option><option>Publishing with LawAfrica</option><option>Something else</option></select>
              </div>
              <div className="field talk-wide"><label htmlFor="eq-msg">How can we help?</label><textarea id="eq-msg" className="input" rows={5} /></div>
            </div>
            <div className="talk-next">What happens next: you will receive an automatic acknowledgement, and a named member of the relevant team will reply within one working day.</div>
            <button className="btn" style={{ background: 'var(--color-accent)', color: '#fff', minHeight: 46 }}>Send enquiry</button>
          </div>

          <aside className="talk-offices">
            <h2>Our offices</h2>
            <div>
              <h3>Nairobi — head office</h3>
              <p>Funzi Road, off Enterprise Road<br />Industrial Area, Nairobi, Kenya<br />PO Box 4260–00100 GPO, Nairobi<br /><a href="mailto:info@lawafrica.com">info@lawafrica.com</a></p>
            </div>
            <div>
              <h3>Opening hours</h3>
              <p>Monday to Friday, 08:30–17:00 EAT<br />Closed on Kenyan public holidays<br />Email replies within one working day</p>
            </div>
          </aside>
        </div>

      {/* Site feedback. This used to be a section on the home page, which is
          not where someone goes when something is wrong with the site; it
          lives here with the other ways of reaching us, and the footer
          links straight to it. */}
      <section id="feedback" className="feedback-block">
        <h2>Tell us what to fix</h2>
        <p>
          Wrong price, a broken link, an edition we have not listed, or
          something that simply would not work &mdash; it reaches the people who
          can change it.
        </p>

        <fieldset className="feedback-mood">
          <legend>How is the site working for you?</legend>
          {['Great', 'Okay', 'Not great'].map(f => (
            <button
              key={f}
              type="button"
              aria-pressed={mood === f}
              onClick={() => setMood(m => (m === f ? null : f))}
              className={'tag ' + (mood === f ? 'tag-accent' : 'tag-outline')}
            >
              {f}
            </button>
          ))}
        </fieldset>

        <div className="field">
          <label htmlFor="fb-note">What should we know?</label>
          <textarea id="fb-note" className="input" />
        </div>
        <div className="feedback-send">
          <div className="field">
            <label htmlFor="fb-mail">Email <span style={{ color: 'var(--color-neutral-700)' }}>(optional)</span></label>
            <input id="fb-mail" className="input" type="email" />
          </div>
          <button className="btn" style={{ background: 'var(--color-accent)', color: '#fff' }}>Send feedback</button>
        </div>
      </section>
      </div>
    </div>
  );
}
