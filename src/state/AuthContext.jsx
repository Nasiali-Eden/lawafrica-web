import { createContext, useContext, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [pending, setPending] = useState(null);
  const navigate = useNavigate();

  const value = useMemo(() => ({
    user,
    pending,
    signedIn: !!user,
    signedOut: !user,

    signIn(rawName, password) {
      const name = (rawName || '').trim();
      if (!name || !password) return;
      const pretty = name.indexOf('@') > -1 ? name.split('@')[0] : name;
      const nextUser = { name: pretty.replace(/[._-]+/g, ' ').replace(/\b\w/g, c => c.toUpperCase()), plan: 'Pro' };
      setUser(nextUser);
      const target = pending;
      setPending(null);
      navigate(target ? `/reports/${target}` : '/');
    },

    signOut() {
      setUser(null);
      navigate('/');
    },

    // Gate access to a case: signed in goes straight there, signed out is
    // parked on sign-in with a note on what it will drop them back into.
    openCase(id) {
      if (user) navigate(`/reports/${id}`);
      else { setPending(id); navigate('/signin'); }
    }
  }), [user, pending, navigate]);

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function useAuth() {
  return useContext(AuthCtx);
}
