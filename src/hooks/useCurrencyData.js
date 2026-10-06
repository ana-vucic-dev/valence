import { useEffect, useState } from 'react';
import { BASE_URL } from '../config/constants.js';

export default function useCurrencyData(base = '', quote = '') {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      setIsLoading(true);
      setError('');

      try {
        const url =
          base && quote
            ? `${BASE_URL}/rate/${base}/${quote}`
            : `${BASE_URL}/currencies`;

        const response = await fetch(url, {
          signal: controller.signal
        });

        if (!response.ok) {
          throw new Error(
            `ERROR FETCHING CURRENCY DATA: ${response.statusText}`
          );
        }

        const data = await response.json();
        setData(data);
        setError('');
      } catch (error) {
        if (error.name !== 'AbortError') {
          setError(
            error.message || 'Something went wrong. Please try again later.'
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    fetchData();
    return () => controller.abort();
  }, [base, quote]);

  return {
    data,
    isLoading,
    error
  };
}
