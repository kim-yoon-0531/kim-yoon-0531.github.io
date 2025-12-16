import { weddingData } from '../data/weddingData';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-title">
          <h1>Wedding Invitation</h1>
          <div className="couple-names">
            <span className="groom-name">{weddingData.couple.groom.name}</span>
            <span className="and">&</span>
            <span className="bride-name">{weddingData.couple.bride.name}</span>
          </div>
          <p className="hero-subtitle">결혼합니다</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;




