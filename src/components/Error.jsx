export default function Error({ type, message }) {
  return <p className={`${type}`}>{message}</p>;
}
