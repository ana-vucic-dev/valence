import Header from './components/Header';
import CurrencyConverter from './components/CurrencyConverter';
import FeatureList from './components/FeatureList';
import Footer from './components/Footer';
import './index.css';

export default function App() {
  return (
    <div className='app'>
      <>
        <Header />
        <CurrencyConverter />
        <FeatureList />
        <Footer />
      </>
    </div>
  );
}
