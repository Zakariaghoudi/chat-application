import ReactMarkDown from 'react-markdown';
import Avatar from './Avatar';

const Message = ({ message }) => {
  const isUser = message.role === 'user';
  const className = `message-container ${isUser ? 'user' : 'ai'}`;

  const userAvatar = 'https://img.freepik.com/premium-vector/anonymous-user-circle-icon-vector-illustration-flat-style-with-long-shadow_520826-1931.jpg?w=2000';
  const aiAvatar = 'https://mir-s3-cdn-cf.behance.net/project_modules/1400/bcdeaf163021985.63df4524e42bb.jpg';

  return (
    <div className={className}>
      <Avatar src={isUser ? userAvatar : aiAvatar} alt={`${isUser ? 'User' : 'AI'} Avatar`} />
      <div className="messge-bubble">
        {isUser ? (
          <p>{message.text}</p>
        ) : (
          <ReactMarkDown>{message.text}</ReactMarkDown>
        )}
        <div className="timestamp">{new Date(message.timestamp).toLocaleTimeString()}</div>
      </div>
    </div>
  );
};

export default Message;
