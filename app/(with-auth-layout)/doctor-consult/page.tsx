"use client";

import { useState } from "react";
import axios, { AxiosError } from "axios";

export default function DoctorConsultPage() {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<{ role: string; content: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setChatHistory((prev) => [...prev, { role: "user", content: message }]);
    setLoading(true);

    try {
      const response = await axios.post<{ response: string }>("/api/gemini", { message });
      const botResponse = response.data.response;
      setChatHistory((prev) => [...prev, { role: "bot", content: botResponse }]);
    } catch (error: AxiosError) {
      console.error("Full Axios error:", error);
      console.error("Axios error details:", error.response?.data || error.message);
      setChatHistory((prev) => [
        ...prev,
        { role: "bot", content: "Error: Unable to fetch response. Please try again." },
      ]);
    } finally {
      setLoading(false);
      setMessage("");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">MrDocto</h1>

      <div className="h-96 overflow-y-auto mb-4 p-4 bg-gray-800 rounded-lg">
        {chatHistory.map((entry, index) => (
          <div
            key={index}
            className={`mb-2 p-3 rounded-lg ${
              entry.role === "user" ? "bg-blue-600 text-right" : "bg-gray-700 text-left"
            }`}
          >
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
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-blue-300"
          disabled={loading}
        >
          Send
        </button>
      </form>
    </div>
  );
}