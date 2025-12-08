import { weddingData } from '../data/weddingData';
import './CoupleInfo.css';

const CoupleInfo = () => {
  const { couple } = weddingData;

  return (
    <section className="couple-info">
      <div className="couple-info-content">
        <div className="couple-section">
          <div className="person-card groom-card">
            <div className="person-label">신랑</div>
            <div className="person-name">{couple.groom.name}</div>
            {couple.groom.nameEn && (
              <div className="person-name-en">{couple.groom.nameEn}</div>
            )}
            {couple.groom.parents && (
              <div className="person-parents">{couple.groom.parents}</div>
            )}
          </div>
          <div className="person-card bride-card">
            <div className="person-label">신부</div>
            <div className="person-name">{couple.bride.name}</div>
            {couple.bride.nameEn && (
              <div className="person-name-en">{couple.bride.nameEn}</div>
            )}
            {couple.bride.parents && (
              <div className="person-parents">{couple.bride.parents}</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoupleInfo;


