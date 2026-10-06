export default function FeatureCard({ title, description, link }) {
  return (
    <div className='feature-card'>
      <h2 className='feature-title'>{title}</h2>
      <p className='feature-description'>
        {description}{' '}
        {link && (
          <>
            <a
              href={link.url}
              target='_blank'
              rel='noopener noreferrer'>
              {link.text}
            </a>
            <span>.</span>
          </>
        )}
      </p>
    </div>
  );
}
