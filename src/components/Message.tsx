import { weddingData } from '../data/weddingData';
import './Message.css';

const Message = () => {
  const { message } = weddingData;

  if (!message) return null;

  return (
    <section className="message">
      <div className="message-content">
        <div className="message-text">
          {message.split('\n').map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Message;


