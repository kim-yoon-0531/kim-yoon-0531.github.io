import { weddingData } from '../data/weddingData';
import './Contact.css';

const Contact = () => {
  const { couple } = weddingData;

  const handlePhoneClick = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  return (
    <section className="contact">
      <div className="contact-content">
        <h2 className="contact-title">연락처</h2>
        <div className="contact-cards">
          <div className="contact-card">
            <div className="contact-label">신랑측</div>
            {couple.groom.phone && (
              <button
                className="contact-phone"
                onClick={() => handlePhoneClick(couple.groom.phone!)}
              >
                {couple.groom.phone}
              </button>
            )}
          </div>
          <div className="contact-card">
            <div className="contact-label">신부측</div>
            {couple.bride.phone && (
              <button
                className="contact-phone"
                onClick={() => handlePhoneClick(couple.bride.phone!)}
              >
                {couple.bride.phone}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;


