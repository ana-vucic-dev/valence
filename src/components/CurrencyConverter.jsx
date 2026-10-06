import { useState } from 'react';
import { DEFAULT_CURRENCIES } from '../config/constants.js';
import useCurrencyData from '../hooks/useCurrencyData.js';
import useCurrencyConverter from '../hooks/useCurrencyConverter.js';
import Loader from './Loader';
import Error from './Error';
import CurrencySelect from './CurrencySelect';

export default function CurrencyConverter() {
  const [base, setBase] = useState(DEFAULT_CURRENCIES.baseCode);

  const [quote, setQuote] = useState(DEFAULT_CURRENCIES.quoteCode);

  const {
    data: currencies,
    isLoading: isLoadingCurrencies,
    error: currenciesError
  } = useCurrencyData();

  const { data: rateData, error: rateError } = useCurrencyData(base, quote);

  const rate = Number(rateData?.rate);

  const {
    baseInput,
    quoteInput,
    activeInput,
    convertedAmount,
    handleAmountChange
  } = useCurrencyConverter(base, quote, rate);

  if (isLoadingCurrencies) return <Loader />;

  if (currenciesError) {
    return (
      <Error
        type='currencies-error'
        message={`${currenciesError}`}
      />
    );
  }

  return (
    <section
      className='converter'
      aria-label='Currency converter'>
      <form onSubmit={e => e.preventDefault()}>
        <fieldset>
          <legend>CURRENCY CONVERTER</legend>

          <div className='input-group'>
            <div className='input-container amount'>
              <label
                htmlFor='base-amount'
                className='visually-hidden'>
                {base} amount
              </label>

              <input
                type='text'
                id='base-amount'
                value={activeInput === 'base' ? baseInput : convertedAmount}
                onChange={handleAmountChange('base')}
                autoFocus
              />
            </div>

            <div className='divider'></div>

            <CurrencySelect
              currencies={currencies}
              currency={base}
              base
              setCurrency={setBase}
            />
          </div>

          <div className='input-group'>
            <div className='input-container amount'>
              <label
                htmlFor='quote-amount'
                className='visually-hidden'>
                {quote} amount
              </label>

              <input
                type='text'
                id='quote-amount'
                value={activeInput === 'quote' ? quoteInput : convertedAmount}
                onChange={handleAmountChange('quote')}
              />
            </div>

            <div className='divider'></div>

            <CurrencySelect
              currencies={currencies}
              currency={quote}
              setCurrency={setQuote}
            />
          </div>
        </fieldset>
      </form>

      {convertedAmount && (
        <div
          className='visually-hidden'
          aria-live='polite'
          aria-atomic='true'>
          {activeInput === 'base'
            ? `${baseInput} ${base} equals ${convertedAmount} ${quote}`
            : `${quoteInput} ${quote} equals ${convertedAmount} ${base}`}
        </div>
      )}

      {rateError && (
        <Error
          type='rate-error'
          message='Conversion service unavailable. Please try again later.'
        />
      )}
    </section>
  );
}
