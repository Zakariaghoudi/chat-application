import React from 'react';

const NewChat = ({ onNewChat }) => {
  return (
    <button className="new-chat-button" onClick={onNewChat}>
      New Chat
    </button>
  );
};

export default NewChat;
