export default function convertAmount(
  amount,
  rate,
  activeInput,
  isSameCurrency
) {
  if (isSameCurrency) return amount;
  if (!rate) return '';

  return activeInput === 'base'
    ? (amount * rate).toFixed(2)
    : (amount / rate).toFixed(2);
}
