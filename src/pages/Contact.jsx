import { useState } from 'react';
import { contacts } from '../data/footer.js';

export default function Contact() {
  const [mood, setMood] = useState(null);

  return (
    <div className="page" style={{ maxWidth: 1180, margin: '0 auto', padding: '34px 24px 64px' }}>
      <h1 style={{ fontSize: 'calc(var(--t-base) + 33px*var(--tf,1)*var(--tz,1))', fontWeight: 400, margin: '0 0 10px' }}>Talk to us</h1>
      <p style={{ fontSize: 'calc(var(--t-base) + 6px*var(--tf,1))', color: 'var(--color-neutral-700)', maxWidth: 640, marginBottom: 30 }}>Every route below is checked monthly and owned by a named team. Choose the one that matches your enquiry and you will reach a person, not a queue.</p>
      <div className="stack" style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 52, alignItems: 'start' }}>
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,260px),1fr))', gap: 18, marginBottom: 34 }}>
            {contacts.map(c => (
              <div key={c.title} className="card" style={{ padding: 20, gap: 7 }}>
                <div className="card-kicker">{c.kicker}</div>
                <div className="card-title">{c.title}</div>
                <p className="card-body" style={{ fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))' }}>{c.body}</p>
                <div style={{ fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))' }}><a href={`mailto:${c.email}`}>{c.email}</a></div>
                <div style={{ fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', color: 'var(--color-neutral-700)' }}>{c.phone}</div>
              </div>
            ))}
          </div>
          <h2 style={{ fontSize: 'calc(var(--t-base) + 16px*var(--tf,1)*var(--tz,1))', fontWeight: 400, margin: '0 0 8px' }}>Our offices</h2>
          <hr className="hr" style={{ margin: '10px 0 18px' }} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,280px),1fr))', gap: 26 }}>
            <div>
              <h4 style={{ fontSize: 'calc(var(--t-base) + 6px*var(--tf,1))', fontWeight: 400, margin: '0 0 6px' }}>Nairobi — head office</h4>
              <p style={{ fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))', lineHeight: 1.65, color: 'var(--color-neutral-700)', margin: 0 }}>Funzi Road, off Enterprise Road<br />Industrial Area, Nairobi, Kenya<br />PO Box 4260–00100 GPO, Nairobi<br />info@lawafrica.com</p>
            </div>
            <div>
              <h4 style={{ fontSize: 'calc(var(--t-base) + 6px*var(--tf,1))', fontWeight: 400, margin: '0 0 6px' }}>Opening hours</h4>
              <p style={{ fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))', lineHeight: 1.65, color: 'var(--color-neutral-700)', margin: 0 }}>Monday to Friday, 08:30–17:00 EAT<br />Closed on Kenyan public holidays<br />Email replies within one working day</p>
            </div>
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
        <div style={{ border: '1px solid var(--color-divider)', borderRadius: 4, padding: 26, background: 'var(--color-surface)' }}>
          <h2 style={{ fontSize: 'calc(var(--t-base) + 16px*var(--tf,1)*var(--tz,1))', fontWeight: 400, margin: '0 0 6px' }}>Send an enquiry</h2>
          <p style={{ fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', color: 'var(--color-neutral-700)', marginBottom: 20 }}>We ask only for what we need to reply. Fields marked optional can be left blank.</p>
          <div className="field" style={{ marginBottom: 14 }}><label>Your name</label><input className="input" /></div>
          <div className="field" style={{ marginBottom: 14 }}><label>Email address</label><input className="input" type="email" /></div>
          <div className="field" style={{ marginBottom: 14 }}><label>Organisation <span style={{ color: 'var(--color-neutral-700)' }}>(optional)</span></label><input className="input" /></div>
          <div className="field" style={{ marginBottom: 14 }}><label>What is your enquiry about?</label>
            <select className="input"><option>Buying a book</option><option>Institutional quotation</option><option>Law Reports subscription</option><option>eBook access problem</option><option>Publishing with LawAfrica</option><option>Something else</option></select>
          </div>
          <div className="field" style={{ marginBottom: 18 }}><label>How can we help?</label><textarea className="input" /></div>
          <div style={{ fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', color: 'var(--color-neutral-700)', lineHeight: 1.65, marginBottom: 16, padding: 12, borderLeft: '2px solid var(--color-accent)', background: 'var(--color-accent-100)' }}>What happens next: you will receive an automatic acknowledgement, and a named member of the relevant team will reply within one working day.</div>
          <button className="btn btn-block" style={{ background: 'var(--color-accent)', color: '#fff', minHeight: 44, fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))', marginTop: 0 }}>Send enquiry</button>
        </div>
      </div>
    </div>
  );
}
