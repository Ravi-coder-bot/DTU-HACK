"use client";

import { useState } from "react";
import axios from "axios";

export default function DoctorConsultPage() {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isChatVisible, setIsChatVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setChatHistory((prev) => [...prev, { role: "user", content: message }]);
    setLoading(true);

    try {
      const response = await axios.post("/api/gemini", { message });
      const botResponse = response.data.response;
      setChatHistory((prev) => [...prev, { role: "bot", content: botResponse }]);
    } catch (error) {
      const errorMessage =
        error.response?.data?.details ||
        error.response?.data?.error ||
        error.message ||
        "Unknown error occurred";
      console.error("Axios Error:", error);
      setChatHistory((prev) => [...prev, { role: "bot", content: `Error: ${errorMessage}` }]);
    } finally {
      setLoading(false);
      setMessage("");
    }
  };

  const toggleChat = () => {
    setIsChatVisible((prev) => !prev);
  };

  return (
    <div className="relative min-h-screen">
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors z-50"
        aria-label="Toggle Chatbot"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h8M8 14h4m4-8H5a2 2 0 00-2 2v10a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-1m-4 0V4m0 2h-4" />
        </svg>
      </button>

      {isChatVisible && (
        <div className="fixed bottom-20 right-6 max-w-2xl w-full sm:w-96 p-6 bg-gray-900 text-white rounded-lg shadow-lg z-40">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-bold">MindCare</h1>
            <button onClick={toggleChat} className="text-gray-400 hover:text-white" aria-label="Close Chatbot">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="h-64 overflow-y-auto mb-4 p-4 bg-gray-800 rounded-lg">
            {chatHistory.map((entry, index) => (
              <div key={index} className={`mb-2 p-3 rounded-lg ${entry.role === "user" ? "bg-blue-600 text-right" : "bg-gray-700 text-left"}`}>
                <p>{entry.content}</p>
              </div>
            ))}
            {loading && <div className="text-center text-gray-400">Generating Response...</div>}
          </div>

          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask about symptoms, mental health, or anything else..."
              className="flex-1 p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-blue-300" disabled={loading}>
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
