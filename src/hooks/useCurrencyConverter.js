import { useState } from 'react';
import { DEFAULT_CURRENCIES } from '../config/constants.js';
import parseLocaleNumber from '../utils/parseLocaleNumber.js';
import convertAmount from '../utils/convertAmount.js';

export default function useCurrencyConverter(base, quote, rate) {
  const [baseInput, setBaseInput] = useState(DEFAULT_CURRENCIES.baseAmount);
  const [quoteInput, setQuoteInput] = useState(DEFAULT_CURRENCIES.quoteAmount);
  const [activeInput, setActiveInput] = useState('base');

  function handleAmountChange(type) {
    return e => {
      const value = e.target.value;

      if (!/^\d*[.,]?\d*$/.test(value)) return;

      setActiveInput(type);

      if (type === 'base') {
        setBaseInput(value);
      } else {
        setQuoteInput(value);
      }
    };
  }

  const baseAmount = parseLocaleNumber(baseInput);
  const quoteAmount = parseLocaleNumber(quoteInput);

  const convertedAmount = convertAmount(
    activeInput === 'base' ? baseAmount : quoteAmount,
    rate,
    activeInput,
    base === quote
  );

  return {
    baseInput,
    quoteInput,
    activeInput,
    convertedAmount,
    handleAmountChange
  };
}
