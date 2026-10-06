import { FEATURES } from '../data/features.js';
import FeatureCard from './FeatureCard';

export default function FeatureList() {
  return (
    <section
      className='feature-list'
      aria-label='Features'>
      {FEATURES.map(feature => (
        <FeatureCard
          key={feature.id}
          title={feature.title}
          description={feature.description}
          link={feature?.link}
        />
      ))}
    </section>
  );
}
