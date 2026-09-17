import { createContext, useContext, useMemo, useRef, useState } from 'react';
import { money } from '../lib/format.js';

const BasketCtx = createContext(null);

export function BasketProvider({ children }) {
  const [basket, setBasket] = useState([]);
  const [added, setAdded] = useState('');
  const timer = useRef(null);

  const value = useMemo(() => {
    const addItem = item => {
      const key = item.code + '|' + item.fmt;
      setBasket(prev => {
        const found = prev.some(l => l.key === key);
        return found
          ? prev.map(l => (l.key === key ? { ...l, qty: l.qty + 1 } : l))
          : prev.concat([{ key, qty: 1, ...item }]);
      });
      setAdded(key);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setAdded(''), 1800);
    };

    const bump = (key, d) => setBasket(prev =>
      prev.map(l => (l.key === key ? { ...l, qty: l.qty + d } : l)).filter(l => l.qty > 0));

    const drop = key => setBasket(prev => prev.filter(l => l.key !== key));

    const count = basket.reduce((a, l) => a + l.qty, 0);
    const sub = basket.reduce((a, l) => a + l.unit * l.qty, 0);
    const hasPrint = basket.some(l => l.fmt === 'Print');
    const ship = hasPrint ? 450 : 0;

    return {
      basket, added, addItem, bump, drop, count, sub, ship,
      basketLabel: count ? 'Basket · ' + count : 'Basket · 0',
      basketCount: count === 1 ? '1 item' : String(count) + ' items',
      subTotal: money(sub), shipTotal: ship ? money(ship) : 'Free',
      grandTotal: money(sub + ship),
      shipNote: hasPrint ? 'Courier · Kenya, Tanzania, Uganda · 2–4 working days' : 'No delivery required — digital only',
      lines: basket.map(l => ({
        ...l,
        unitLabel: money(l.unit),
        qtyLabel: String(l.qty),
        lineTotal: money(l.unit * l.qty)
      }))
    };
  }, [basket, added]);

  return <BasketCtx.Provider value={value}>{children}</BasketCtx.Provider>;
}

export function useBasket() {
  return useContext(BasketCtx);
}
