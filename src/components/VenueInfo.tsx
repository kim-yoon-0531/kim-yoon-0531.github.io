import { weddingData } from '../data/weddingData';
import './VenueInfo.css';

const VenueInfo = () => {
  const { venue } = weddingData;

  const handleMapClick = () => {
    if (venue.mapUrl) {
      window.open(venue.mapUrl, '_blank');
    }
  };

  return (
    <section className="venue-info">
      <div className="venue-info-content">
        <h2 className="venue-title">오시는 길</h2>
        <div className="venue-details">
          <div className="venue-name">{venue.name}</div>
          <div className="venue-address">
            <p>{venue.address}</p>
            {venue.detailAddress && <p className="detail-address">{venue.detailAddress}</p>}
          </div>
          {venue.mapUrl && (
            <button className="map-button" onClick={handleMapClick}>
              지도 보기
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default VenueInfo;


