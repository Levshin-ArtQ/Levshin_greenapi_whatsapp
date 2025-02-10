import PropTypes from 'prop-types';
import '../styles/Message.css';

const Message = ({ text, isOutgoing }) => {
  return (
    <div className={`message ${isOutgoing ? 'outgoing' : 'incoming'}`}>
      {text}
    </div>
  );
};

Message.propTypes = {
  text: PropTypes.string.isRequired,
  isOutgoing: PropTypes.bool.isRequired,
};

export default Message;
