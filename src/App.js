import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import Footer from "./components/Footer";
import { frequentlyAskedQuestions } from "./frequentlyAskedQuestions.js";

function App() {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);

  const handleSend = () => {
    if (!userInput.trim()) return;

    const userMessage = { sender: "user", text: userInput };
    const found = frequentlyAskedQuestions.find((pair) => userInput.toLowerCase().includes(pair.question.toLowerCase().slice(0, 10)));

    const botMessage = {
      sender: "bot",
      text: found ? found.answer : "I'm sorry, I don't have an answer for that. Please try another loan-related question.",
    };

    setMessages((prev) => [...prev, userMessage, botMessage]);
    setUserInput("");
    setSuggestions([]);
  };

  const getTopSuggestions = (input) => {
    if (!input) return [];
    const scores = frequentlyAskedQuestions.map((pair) => ({
      question: pair.question,
      score: similarityScore(pair.question.toLowerCase(), input.toLowerCase()),
    }));
    return scores
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map((item) => item.question);
  };

  const similarityScore = (text, input) => {
    const inputWords = input.split(" ");
    return inputWords.reduce((acc, word) => (text.includes(word) ? acc + 1 : acc), 0);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setUserInput(value);
    setSuggestions(getTopSuggestions(value));
    setSelectedSuggestionIndex(-1); // Reset selection
  };

  return (
    <div className='app-container'>
      <h2>💬 Loan Officer Chatbot</h2>

      <div className='chat-box'>
        {messages.map((msg, idx) => (
          <div key={idx} className={msg.sender === "user" ? "msg user-msg" : "msg bot-msg"}>
            <strong>{msg.sender === "user" ? "You" : "Bot"}:</strong> {msg.text}
          </div>
        ))}
      </div>
      {userInput && suggestions.length > 0 && (
        <div className='suggestions-box'>
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className={`suggestion-item ${index === selectedSuggestionIndex ? "highlighted" : ""}`}
              onClick={() => {
                setUserInput(suggestion);
                setSuggestions([]);
                setSelectedSuggestionIndex(-1);
                inputRef.current?.focus();
              }}>
              🔍 {suggestion}
            </div>
          ))}
        </div>
      )}
      <div className='input-box'>
        <input
          ref={inputRef}
          className='chat-input'
          type='text'
          value={userInput}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (selectedSuggestionIndex >= 0 && suggestions[selectedSuggestionIndex]) {
                setUserInput(suggestions[selectedSuggestionIndex]);
                setSuggestions([]);
                setSelectedSuggestionIndex(-1);
              } else {
                handleSend();
              }
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setSelectedSuggestionIndex((prev) => Math.max(prev - 1, 0));
            } else if (e.key === "ArrowDown") {
              e.preventDefault();
              setSelectedSuggestionIndex((prev) => Math.min(prev + 1, suggestions.length - 1));
            }
          }}
          placeholder='Type your question...'
        />
        <button className='send-button' onClick={handleSend}>
          Send
        </button>
      </div>
      <Footer />
      {/* <footer className='footer'>
        <a href='https://erichoover.org' target='_blank' rel='noopener noreferrer'>
          Return to erichoover.org
        </a>
      </footer> */}
    </div>
  );
}

export default App;
