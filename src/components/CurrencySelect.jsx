import useWindowWidth from '../hooks/useWindowWidth.js';

export default function CurrencySelect({
  currencies,
  currency,
  base = false,
  setCurrency
}) {
  const width = useWindowWidth();

  const device = width < 576 ? 'mobile' : 'desktop';
  const symbol = {
    mobile: 'iso_code',
    desktop: 'name'
  };

  return (
    <div className='input-container currency'>
      <label
        htmlFor={currency}
        className='visually-hidden'>
        Select the {base ? 'source' : 'target'} currency
      </label>

      <select
        id={currency}
        value={currency}
        onChange={e => setCurrency(e.target.value)}>
        {currencies?.map(c => (
          <option
            key={c.iso_code}
            value={c.iso_code}>
            {c[symbol[device]]}
          </option>
        ))}
      </select>
    </div>
  );
}
