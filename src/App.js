import React, { useState } from "react";

const qaPairs = [
  { question: "What type of loan are you interested in?", answer: "I can help you with personal loans, auto loans, mortgages, or business loans. Which one are you looking for?" },
  { question: "How much would you like to borrow?", answer: "Please provide an estimate of how much funding you need, and I can guide you through the eligibility." },
  { question: "What is your current employment status?", answer: "I’m currently employed full-time." },
  { question: "What is your estimated annual income?", answer: "My estimated annual income is $60,000." },
  { question: "What is your credit score range?", answer: "It is in the 700-750 range." },
  { question: "Do you currently have any outstanding loans or debts?", answer: "Yes, I have a student loan with a remaining balance of $10,000." },
  { question: "What is the purpose of the loan?", answer: "I'm looking to consolidate my credit card debt." },
  { question: "Are you a U.S. citizen or permanent resident?", answer: "Yes, I am a U.S. citizen." },
  { question: "Do you have any collateral to secure the loan?", answer: "I have a vehicle valued at $15,000." },
  { question: "Would you like to proceed with a loan application?", answer: "Yes, please help me start the process." },
];

function App() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");

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
  };

  return (
    <div style={styles.container}>
      <h2>💬 Loan Officer Chatbot</h2>
      <div style={styles.chatBox}>
        {messages.map((msg, idx) => (
          <div key={idx} style={msg.sender === "user" ? styles.userMsg : styles.botMsg}>
            <strong>{msg.sender === "user" ? "You" : "Bot"}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <div style={styles.inputBox}>
        <input style={styles.input} type='text' value={userInput} onChange={(e) => setUserInput(e.target.value)} placeholder='Type your question...' />
        <button onClick={handleSend} style={styles.button}>
          Send
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: { maxWidth: 600, margin: "40px auto", fontFamily: "Arial" },
  chatBox: { border: "1px solid #ccc", padding: 20, minHeight: 300, marginBottom: 10, borderRadius: 8, background: "#f9f9f9" },
  userMsg: { textAlign: "right", marginBottom: 10, color: "#333" },
  botMsg: { textAlign: "left", marginBottom: 10, color: "#0077cc" },
  inputBox: { display: "flex", gap: 10 },
  input: { flex: 1, padding: 10, borderRadius: 4, border: "1px solid #ccc" },
  button: { padding: "10px 20px", backgroundColor: "#0077cc", color: "#fff", border: "none", borderRadius: 4, cursor: "pointer" },
};

export default App;
