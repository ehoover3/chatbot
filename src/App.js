import React, { useState } from "react";
import "./App.css";

function App() {
  const qaPairs = [
    {
      question: "The applicant doesn't know their credit score. What should I do?",
      answer: "You can proceed by estimating the range based on their credit history discussion or pull a soft credit check if allowed by policy.",
    },
    {
      question: "The income verification documents are missing. How should I handle it?",
      answer: "Request recent pay stubs, tax returns, or a W-2. Note in the system that income verification is pending and follow up within 48 hours.",
    },
    {
      question: "I can't access the loan origination system. What steps should I take?",
      answer: "Ensure you're connected to the secure VPN, then restart your system. If issues persist, contact IT support and log a ticket.",
    },
    {
      question: "The applicant’s debt-to-income ratio is too high. What are my options?",
      answer: "You can suggest a co-signer, offer a smaller loan amount, or recommend debt consolidation to improve their ratio.",
    },
    {
      question: "What should I do if an applicant submits expired identification?",
      answer: "Politely request a current, government-issued photo ID. Loans cannot be processed without valid ID verification.",
    },
    {
      question: "How do I know if collateral is sufficient?",
      answer: "Refer to the collateral value guide in the internal knowledge base or request a third-party appraisal if required.",
    },
    {
      question: "I entered incorrect information in the application. Can I fix it?",
      answer: "Yes, navigate to the application edit screen, correct the details, and ensure all changes are saved and revalidated.",
    },
    {
      question: "The applicant wants to change loan types mid-process. What now?",
      answer: "Close the current application and begin a new one with the desired loan type. Note the reason for the change in their file.",
    },
    {
      question: "The system flagged the application for manual review. What does that mean?",
      answer: "This usually indicates a mismatch or risk factor. Review the flagged sections and escalate to underwriting if needed.",
    },
    {
      question: "Where can I find the latest loan policy updates?",
      answer: "Check the internal policy portal under 'Loan Officer Resources' or refer to your manager for recent changes.",
    },
  ];

  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleSend = () => {
    if (!userInput.trim()) return;

    const userMessage = { sender: "user", text: userInput };
    const found = qaPairs.find((pair) => userInput.toLowerCase().includes(pair.question.toLowerCase().slice(0, 10)));

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

    const scores = qaPairs.map((pair) => ({
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

      <div className='suggestions-box'>
        {suggestions.map((s, idx) => (
          <div key={idx} className='suggestion-item'>
            🔍 {s}
          </div>
        ))}
      </div>

      <div className='input-box'>
        <input className='chat-input' type='text' value={userInput} onChange={handleInputChange} placeholder='Type your question...' />
        <button className='send-button' onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
}

export default App;
