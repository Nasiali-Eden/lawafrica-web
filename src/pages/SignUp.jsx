import { useState } from 'react';
import { Link } from 'react-router-dom';

const TABS = [
  { id: 'ind', label: 'Individual practitioner' },
  { id: 'stu', label: 'Student' },
  { id: 'org', label: 'Institution' }
];

export default function SignUp() {
  const [acct, setAcct] = useState('ind');

  return (
    <div className="page" style={{ maxWidth: 1000, margin: '0 auto', padding: '52px 24px 72px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,280px),1fr))', gap: 56, alignItems: 'start' }}>
        <div>
          <div style={{ fontSize: 'var(--t-base)', letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--color-accent-700)', marginBottom: 14 }}>Account</div>
          <h1 style={{ fontSize: 'calc(var(--t-base) + 23px*var(--tf,1)*var(--tz,1))', fontWeight: 400, lineHeight: 1.05, margin: '0 0 10px' }}>Create an account</h1>
          <p style={{ fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))', lineHeight: 1.65, color: 'var(--color-neutral-700)', margin: '0 0 24px' }}>Two minutes. We ask for your role so that pricing, editions and reading lists shown to you are the right ones.</p>

          <div style={{ fontSize: 'var(--t-base)', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--color-neutral-600)', marginBottom: 8 }}>I am registering as</div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 22 }}>
            {TABS.map(t => (
              <button key={t.id} onClick={() => setAcct(t.id)} style={{ flex: 1, padding: '11px 10px', borderRadius: 4, cursor: 'pointer', font: 'inherit', fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', lineHeight: 1.25, border: `1px solid ${acct === t.id ? 'var(--color-accent)' : 'var(--color-neutral-400)'}`, background: acct === t.id ? 'var(--color-accent)' : 'transparent', color: acct === t.id ? '#fff' : 'var(--color-text)' }}>{t.label}</button>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,280px),1fr))', gap: 14 }}>
              <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', color: 'var(--color-neutral-700)' }}>First name<input className="input" style={{ minHeight: 46, fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))' }} /></label>
              <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', color: 'var(--color-neutral-700)' }}>Surname<input className="input" style={{ minHeight: 46, fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))' }} /></label>
            </div>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', color: 'var(--color-neutral-700)' }}>Email address<input className="input" type="email" placeholder="you@firm.co.ke" style={{ minHeight: 46, fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))' }} /></label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,280px),1fr))', gap: 14 }}>
              <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', color: 'var(--color-neutral-700)' }}>Country
                <select className="input" style={{ minHeight: 46, fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))' }}><option>Kenya</option><option>Tanzania</option><option>Uganda</option><option>South Sudan</option><option>Rwanda</option><option>Other</option></select>
              </label>
              <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', color: 'var(--color-neutral-700)' }}>Mobile number<input className="input" placeholder="+254" style={{ minHeight: 46, fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))' }} /></label>
            </div>

            {acct === 'ind' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,280px),1fr))', gap: 14 }}>
                <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', color: 'var(--color-neutral-700)' }}>Firm or organisation<input className="input" style={{ minHeight: 46, fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))' }} /></label>
                <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', color: 'var(--color-neutral-700)' }}>Practising number <span style={{ color: 'var(--color-neutral-600)' }}>(optional)</span><input className="input" placeholder="LSK / roll number" style={{ minHeight: 46, fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))' }} /></label>
              </div>
            )}

            {acct === 'stu' && (
              <>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,280px),1fr))', gap: 14 }}>
                  <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', color: 'var(--color-neutral-700)' }}>University or college<input className="input" style={{ minHeight: 46, fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))' }} /></label>
                  <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', color: 'var(--color-neutral-700)' }}>Year of study
                    <select className="input" style={{ minHeight: 46, fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))' }}><option>Year 1</option><option>Year 2</option><option>Year 3</option><option>Year 4</option><option>KSL / postgraduate</option></select>
                  </label>
                </div>
                <div style={{ border: '1px solid var(--color-accent-200)', background: 'var(--color-accent-100)', borderRadius: 4, padding: '12px 14px', fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', lineHeight: 1.65, color: 'var(--color-neutral-800)' }}>Verify with a student email or ID and student pricing is applied automatically at checkout.</div>
              </>
            )}

            {acct === 'org' && (
              <>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,280px),1fr))', gap: 14 }}>
                  <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', color: 'var(--color-neutral-700)' }}>Institution name<input className="input" placeholder="Firm, court, ministry or library" style={{ minHeight: 46, fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))' }} /></label>
                  <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', color: 'var(--color-neutral-700)' }}>Institution type
                    <select className="input" style={{ minHeight: 46, fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))' }}><option>Law firm</option><option>Court or judiciary</option><option>Government or ministry</option><option>University library</option><option>Corporate legal department</option></select>
                  </label>
                </div>
                <div style={{ border: '1px solid var(--color-accent-200)', background: 'var(--color-accent-100)', borderRadius: 4, padding: '12px 14px', fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', lineHeight: 1.65, color: 'var(--color-neutral-800)' }}>Institutional accounts can be invoiced on account, hold standing orders and add colleagues as users. A named contact is assigned within one working day.</div>
              </>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,280px),1fr))', gap: 14 }}>
              <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', color: 'var(--color-neutral-700)' }}>Password<input className="input" type="password" style={{ minHeight: 46, fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))' }} /></label>
              <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', color: 'var(--color-neutral-700)' }}>Confirm password<input className="input" type="password" style={{ minHeight: 46, fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))' }} /></label>
            </div>
            <div style={{ fontSize: 'calc(var(--t-base) + 1px*var(--tf,1))', color: 'var(--color-neutral-600)' }}>At least ten characters, including one number.</div>

            <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', lineHeight: 1.5, cursor: 'pointer' }}>
              <span style={{ width: 15, height: 15, border: '1px solid var(--color-neutral-400)', borderRadius: 3, flex: 'none', background: '#fff', marginTop: 2 }} />
              <span>I agree to the <a href="#" style={{ textDecoration: 'none', borderBottom: '1px solid var(--color-accent-300)' }}>terms of sale</a> and <a href="#" style={{ textDecoration: 'none', borderBottom: '1px solid var(--color-accent-300)' }}>privacy notice</a>.</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', lineHeight: 1.5, cursor: 'pointer' }}>
              <span style={{ width: 15, height: 15, border: '1px solid var(--color-neutral-400)', borderRadius: 3, flex: 'none', background: '#fff', marginTop: 2 }} />
              <span>Send me the monthly digest — new editions, judgments and events.</span>
            </label>

            <button className="btn btn-block" style={{ background: 'var(--color-accent)', color: '#fff', minHeight: 48, fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))', marginTop: 4 }}>Create account</button>
            <div style={{ fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', color: 'var(--color-neutral-700)' }}>Already registered?
              <Link to="/signin" style={{ background: 'none', border: 0, padding: 0, cursor: 'pointer', font: 'inherit', color: 'var(--color-accent-700)', borderBottom: '1px solid var(--color-accent-300)', textDecoration: 'none', marginLeft: 4 }}>Sign in</Link>
            </div>
          </div>
        </div>

        <aside style={{ position: 'sticky', top: 96, border: '1px solid var(--color-divider)', borderRadius: 4, padding: 28, background: 'var(--color-surface)' }}>
          <h2 style={{ fontSize: 'calc(var(--t-base) + 10px*var(--tf,1)*var(--tz,1))', fontWeight: 400, margin: '0 0 14px' }}>Why register</h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 13, fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', lineHeight: 1.65, color: 'var(--color-neutral-700)' }}>
            <li><strong style={{ fontWeight: 500, color: 'var(--color-text)' }}>Right price, automatically</strong><br />Student, practitioner and institutional pricing applied at checkout.</li>
            <li><strong style={{ fontWeight: 500, color: 'var(--color-text)' }}>Edition alerts</strong><br />Told when a title you own is superseded — no accidental citing of an old edition.</li>
            <li><strong style={{ fontWeight: 500, color: 'var(--color-text)' }}>One basket, all formats</strong><br />Print, eBook and Law Reports on a single invoice.</li>
            <li><strong style={{ fontWeight: 500, color: 'var(--color-text)' }}>Saved research</strong><br />Keep Law Reports searches and citation lists between sessions.</li>
          </ul>
          <hr className="hr" />
          <div style={{ fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', lineHeight: 1.65, color: 'var(--color-neutral-700)' }}>Buying for an institution and want us to set it up for you? <Link to="/contact" style={{ background: 'none', border: 0, padding: 0, cursor: 'pointer', font: 'inherit', color: 'var(--color-accent-700)', borderBottom: '1px solid var(--color-accent-300)', textDecoration: 'none' }}>Talk to institutional sales</Link>.</div>
        </aside>
      </div>
    </div>
  );
}
