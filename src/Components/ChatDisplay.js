
import Message from "./Message";

const ChatDisplay = ({ messages, isTyping }) => {
  return (
    <div className="chat-display">
<div className="message-bubble">
      {messages.map((message, index) => (
        <Message key={index} message={message} />
      ))}
      {isTyping && (
        <div className="typing-indicator">
          <span></span>
          <span></span>
          <span></span>
        </div>
      )}
    </div>
    </div>
  );
};

export default ChatDisplay;
