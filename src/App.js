import { useState, useEffect } from "react";
import ChatDisplay from "./Components/ChatDisplay";
import InputForm from "./Components/InputForm";
import NewChat from "./Components/NewChat";
import { SendMessageToAPI } from "./ChatAi";
import "./App.css";

function App() {
  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem("chatMessages");
    return savedMessages ? JSON.parse(savedMessages) : [];
  });

  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async () => {
    if (input.trim() === "") return;
    setLoading(true);
    setIsTyping(true);
    const userMessage = {
      role: "user",
      text: input,
      timestamp: new Date(),
    };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");

    try {
      const aiResponse = await SendMessageToAPI(updatedMessages);

      setMessages((prevMessages) => [...prevMessages, { ...aiResponse, timestamp: new Date() }]);
    } catch (error) {
      //console.error("Failed to send message ", error);
      const errorMessage = {
        role: "model",
        text: "Sorry, something went wrong. Please try again later.",
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setLoading(false);
      setIsTyping(false);
    }
  };

  const handleNewChat = () => {
    setMessages([]);
  };

  return (
    <div className="App">
      <div className="header">
        <h1 className="title"> Zaki - ذكي</h1>
        <NewChat onNewChat={handleNewChat} />
      </div>
      <div className="chat-window">
        <ChatDisplay messages={messages} isTyping={isTyping} />
      </div>
      <InputForm
        input={input}
        setInput={setInput}
        onSendMessage={handleSendMessage}
        loading={loading}
      />
    </div>
  );
}

export default App;
