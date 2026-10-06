import { useState, useEffect } from 'react';
import formatDate from '../utils/formatDate.js';

export default function Header() {
  const [time, setTime] = useState(() => new Date());
  const formattedDate = formatDate(time);

  const formattedTime = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  }).format(time);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <header
      className='app-header'
      aria-labelledby='app-title'>
      <div className='app-title-wrapper'>
        <h1
          id='app-title'
          aria-describedby='app-description'>
          <span aria-hidden='true'>💱</span> Valence
        </h1>

        <p
          id='app-description'
          className='app-description'>
          Free online currency converter
        </p>
      </div>

      <p className='date-and-time'>
        <span className='date'>{formattedDate}</span>
        <span className='time'>
          <span className='visually-hidden'>Current time </span>
          {formattedTime}
        </span>
      </p>
    </header>
  );
}
