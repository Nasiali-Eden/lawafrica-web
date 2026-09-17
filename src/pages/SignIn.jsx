import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../state/AuthContext.jsx';
import { caseList } from '../data/cases.js';
import Plate from '../components/Plate.jsx';

export default function SignIn() {
  const { signIn, pending } = useAuth();
  const [uname, setUname] = useState('');
  const [pw, setPw] = useState('');
  const gatedName = pending ? (caseList.find(c => c.id === pending) || {}).name : '';

  const submit = () => signIn(uname, pw);
  const onKey = e => { if (e.key === 'Enter') submit(); };

  return (
    <div className="page" style={{ maxWidth: 1000, margin: '0 auto', padding: '52px 24px 72px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,280px),1fr))', gap: 56, alignItems: 'start' }}>
        <div>
          <div style={{ fontSize: 'var(--t-base)', letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--color-accent-700)', marginBottom: 14 }}>Account</div>
          <h1 style={{ fontSize: 'calc(var(--t-base) + 23px*var(--tf,1)*var(--tz,1))', fontWeight: 400, lineHeight: 1.05, margin: '0 0 10px' }}>Sign in</h1>
          <p style={{ fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))', lineHeight: 1.65, color: 'var(--color-neutral-700)', margin: '0 0 22px' }}>Your orders, eBook library, standing orders and Law Reports access sit behind one account.</p>
          {pending && (
            <div style={{ borderLeft: '2px solid var(--color-accent)', background: 'var(--color-accent-100)', padding: '14px 16px', marginBottom: 22 }}>
              <div style={{ fontSize: 'var(--t-base)', letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--color-accent-700)', marginBottom: 5 }}>Subscriber content</div>
              <p style={{ fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', lineHeight: 1.65, margin: 0, color: 'var(--color-neutral-800)' }}>Sign in to read the full judgment in <em>{gatedName}</em>. We will take you straight to it.</p>
            </div>
          )}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', color: 'var(--color-neutral-700)' }}>Username or email
              <input className="input" value={uname} onChange={e => setUname(e.target.value)} onKeyDown={onKey} placeholder="a.mwangi or you@firm.co.ke" style={{ minHeight: 46, fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))' }} />
            </label>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', color: 'var(--color-neutral-700)' }}>Password
              <input className="input" type="password" value={pw} onChange={e => setPw(e.target.value)} onKeyDown={onKey} placeholder="••••••••" style={{ minHeight: 46, fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))' }} />
            </label>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', cursor: 'pointer' }}>
                <span style={{ width: 15, height: 15, border: '1px solid var(--color-neutral-400)', borderRadius: 3, flex: 'none', background: '#fff' }} />
                Keep me signed in
              </label>
              <a href="#" className="tap-inline" style={{ fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', textDecoration: 'none', borderBottom: '1px solid var(--color-accent-300)' }}>Forgotten password?</a>
            </div>
            <button className="btn btn-block" onClick={submit} style={{ background: 'var(--color-accent)', color: '#fff', minHeight: 48, fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))', marginTop: 4 }}>Sign in</button>
            <div style={{ fontSize: 'calc(var(--t-base) + 1px*var(--tf,1))', color: 'var(--color-neutral-600)' }}>Prototype: any username and password will sign you in.</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, margin: '26px 0 20px' }}>
            <span style={{ flex: 1, height: 1, background: 'var(--color-divider)' }} />
            <span style={{ fontSize: 'calc(var(--t-base) + 1px*var(--tf,1))', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--color-neutral-600)' }}>Or</span>
            <span style={{ flex: 1, height: 1, background: 'var(--color-divider)' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <button className="btn btn-secondary btn-block" style={{ minHeight: 44 }}>Institutional access · IP or library login</button>
            <Link className="btn btn-secondary btn-block" to="/signup" style={{ minHeight: 44, textDecoration: 'none' }}>Create an account instead</Link>
          </div>
        </div>

        <aside style={{ border: '1px solid var(--color-divider)', borderRadius: 4, padding: 28, background: 'var(--color-surface)' }}>
          <Plate src="/assets/plate-wide.jpg" aspectRatio="16/9" style={{ marginBottom: 20 }} />
          <h2 style={{ fontSize: 'calc(var(--t-base) + 10px*var(--tf,1)*var(--tz,1))', fontWeight: 400, margin: '0 0 14px' }}>What an account gives you</h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 13, fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', lineHeight: 1.65, color: 'var(--color-neutral-700)' }}>
            <li><strong style={{ fontWeight: 500, color: 'var(--color-text)' }}>Your eBook library</strong><br />Every digital title you have bought, readable on any device.</li>
            <li><strong style={{ fontWeight: 500, color: 'var(--color-text)' }}>Order and invoice history</strong><br />Re-download VAT invoices and track dispatch.</li>
            <li><strong style={{ fontWeight: 500, color: 'var(--color-text)' }}>Standing orders</strong><br />New editions sent automatically, cancellable at any time.</li>
            <li><strong style={{ fontWeight: 500, color: 'var(--color-text)' }}>Law Reports access</strong><br />Saved searches and citation trails across the archive.</li>
          </ul>
          <hr className="hr" />
          <div style={{ fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', color: 'var(--color-neutral-700)', lineHeight: 1.65 }}>Trouble signing in? Call +254 20 249 5067 or email <a href="mailto:accounts@lawafrica.com" style={{ textDecoration: 'none', borderBottom: '1px solid var(--color-accent-300)' }}>accounts@lawafrica.com</a>.</div>
        </aside>
      </div>
    </div>
  );
}
