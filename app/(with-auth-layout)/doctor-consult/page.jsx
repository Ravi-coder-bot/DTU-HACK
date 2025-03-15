"use client";

import { useState } from "react";
import axios from "axios";

export default function DoctorBookingPage() {
  // Doctor Booking State
  const [searchCategory, setSearchCategory] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [bookedAppointments, setBookedAppointments] = useState<any[]>([]);
  const [showAppointments, setShowAppointments] = useState(false);

  // Chatbot State
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isChatVisible, setIsChatVisible] = useState(false);

<<<<<<< HEAD:app/(with-auth-layout)/doctor-consult/page.tsx
  const categories = [
    "All",
    "Dermatologist",
    "General Physician",
    "Ayurvedic Doctor",
    "Cardiologist",
    "Psychiatrist",
    "Neurologist",
    "Pediatrician",
    "Orthopedic Surgeon",
    "Gynecologist",
    "Dentist",
  ];

  const doctors = [
    { id: 1, name: "Dr. Vikram Singh", specialty: "General Physician", description: "Expert in family medicine.", experience: 15, photo: "https://via.placeholder.com/150" },
    { id: 2, name: "Dr. Priya Sharma", specialty: "Psychiatrist", description: "Specializes in mental health disorders.", experience: 12, photo: "https://via.placeholder.com/150" },
    { id: 3, name: "Dr. Anil Gupta", specialty: "Cardiologist", description: "Focuses on heart conditions.", experience: 18, photo: "https://via.placeholder.com/150" },
    { id: 4, name: "Dr. Neha Patel", specialty: "Ayurvedic Doctor", description: "Traditional holistic healing expert.", experience: 10, photo: "https://via.placeholder.com/150" },
    { id: 5, name: "Dr. Ritu Desai", specialty: "Dermatologist", description: "Skin care and cosmetic procedures.", experience: 8, photo: "https://via.placeholder.com/150" },
    { id: 6, name: "Dr. Sanjay Kumar", specialty: "Neurologist", description: "Treats brain and nerve disorders.", experience: 20, photo: "https://via.placeholder.com/150" },
    { id: 7, name: "Dr. Meena Joshi", specialty: "Pediatrician", description: "Caring for children’s health.", experience: 14, photo: "https://via.placeholder.com/150" },
    { id: 8, name: "Dr. Rajesh Yadav", specialty: "Orthopedic Surgeon", description: "Bone and joint specialist.", experience: 16, photo: "https://via.placeholder.com/150" },
    { id: 9, name: "Dr. Anjali Verma", specialty: "Gynecologist", description: "Women’s reproductive health expert.", experience: 11, photo: "https://via.placeholder.com/150" },
    { id: 10, name: "Dr. Amit Mishra", specialty: "Dentist", description: "Dental care and surgery.", experience: 9, photo: "https://via.placeholder.com/150" },
    { id: 11, name: "Dr. Kavita Nair", specialty: "Dermatologist", description: "Advanced skin treatments.", experience: 7, photo: "https://via.placeholder.com/150" },
    { id: 12, name: "Dr. Rohan Kapoor", specialty: "General Physician", description: "Primary care specialist.", experience: 13, photo: "https://via.placeholder.com/150" },
    { id: 13, name: "Dr. Sunil Chopra", specialty: "Ayurvedic Doctor", description: "Herbal medicine practitioner.", experience: 12, photo: "https://via.placeholder.com/150" },
    { id: 14, name: "Dr. Deepak Rana", specialty: "Cardiologist", description: "Heart disease management.", experience: 17, photo: "https://via.placeholder.com/150" },
    { id: 15, name: "Dr. Manoj Thakur", specialty: "Neurologist", description: "Expert in neurological conditions.", experience: 19, photo: "https://via.placeholder.com/150" },
    { id: 16, name: "Dr. Shalini Iyer", specialty: "Psychiatrist", description: "Mental wellness advocate.", experience: 10, photo: "https://via.placeholder.com/150" },
    { id: 17, name: "Dr. Arjun Malhotra", specialty: "Orthopedic Surgeon", description: "Joint replacement specialist.", experience: 15, photo: "https://via.placeholder.com/150" },
    { id: 18, name: "Dr. Pooja Saxena", specialty: "Pediatrician", description: "Pediatric care expert.", experience: 8, photo: "https://via.placeholder.com/150" },
    { id: 19, name: "Dr. Rekha Bhatt", specialty: "Gynecologist", description: "Focuses on women’s health.", experience: 14, photo: "https://via.placeholder.com/150" },
    { id: 20, name: "Dr. Naveen Reddy", specialty: "Dentist", description: "Cosmetic dentistry specialist.", experience: 11, photo: "https://via.placeholder.com/150" },
  ];

  const filteredDoctors = searchCategory && searchCategory !== "All"
    ? doctors.filter((doc) => doc.specialty === searchCategory)
    : doctors;

  // Doctor Booking Submit Handler
  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDoctor || !date || !time) {
      alert("Please select a doctor and fill in all fields.");
      return;
    }

    setIsSubmitting(true);
    setSuccessMessage("");

    try {
      const response = await axios.post("/api/book-appointment", {
        doctor: selectedDoctor.name,
        date,
        time,
      });
      setSuccessMessage("Appointment booked");
      setBookedAppointments((prev) => [
        ...prev,
        { doctor: selectedDoctor.name, date, time, bookedAt: new Date().toISOString() },
      ]);
      setDate("");
      setTime("");
      setTimeout(() => setSelectedDoctor(null), 2000);
    } catch (error: any) {
      console.error("Booking error:", error);
      alert(error.response?.data?.details || "Failed to book appointment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Chatbot Submit Handler
  const handleChatSubmit = async (e: React.FormEvent) => {
=======
  const handleSubmit = async (e) => {
>>>>>>> 76917364886be09a3df46abe392db56d782f1b4f:app/(with-auth-layout)/doctor-consult/page.jsx
    e.preventDefault();
    if (!message.trim()) return;

    setChatHistory((prev) => [...prev, { role: "user", content: message }]);
    setLoading(true);

    try {
      const response = await axios.post("/api/gemini", { message });
      const botResponse = response.data.response;
      setChatHistory((prev) => [...prev, { role: "bot", content: botResponse }]);
<<<<<<< HEAD:app/(with-auth-layout)/doctor-consult/page.tsx
    } catch (error: AxiosError<{ error: string; details?: string }>) {
      const errorMessage =
        error.response?.data?.details ||
        error.response?.data?.error ||
        error.message ||
        "Unknown error occurred";
      console.error("Axios Error:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
=======
    } catch (error) {
      console.error("Error:", error);
>>>>>>> 76917364886be09a3df46abe392db56d782f1b4f:app/(with-auth-layout)/doctor-consult/page.jsx
      setChatHistory((prev) => [
        ...prev,
        { role: "bot", content: `Error: ${errorMessage}` },
      ]);
    } finally {
      setLoading(false);
      setMessage("");
    }
  };

<<<<<<< HEAD:app/(with-auth-layout)/doctor-consult/page.tsx
  // Toggle Chat Visibility
  const toggleChat = () => {
    setIsChatVisible((prev) => !prev);
  };

  return (
    <div className="relative min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Book a Doctor Appointment
        </h1>

        <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center items-center">
          <select
            value={searchCategory}
            onChange={(e) => setSearchCategory(e.target.value)}
            className="w-full sm:w-64 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
=======
  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">MrDocto</h1>
      
      <div className="h-96 overflow-y-auto mb-4 p-4 bg-gray-800 rounded-lg">
        {chatHistory.map((entry, index) => (
          <div
            key={index}
            className={`mb-2 p-3 rounded-lg ${entry.role === "user" ? "bg-blue-600 text-right" : "bg-gray-700 text-left"}`}
>>>>>>> 76917364886be09a3df46abe392db56d782f1b4f:app/(with-auth-layout)/doctor-consult/page.jsx
          >
            <option value="">-- Select Specialty --</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <button
            onClick={() => setSearchCategory(searchCategory)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Search
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredDoctors.map((doc) => (
            <div
              key={doc.id}
              onClick={() => setSelectedDoctor(doc)}
              className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow"
            >
              <img
                src={doc.photo}
                alt={doc.name}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h2 className="text-lg font-semibold text-gray-800">{doc.name}</h2>
              <p className="text-sm text-gray-600">{doc.specialty}</p>
            </div>
          ))}
        </div>

        {/* Booking Modal */}
        {selectedDoctor && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">{selectedDoctor.name}</h2>
                <button
                  onClick={() => setSelectedDoctor(null)}
                  className="text-gray-600 hover:text-gray-800"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <img
                src={selectedDoctor.photo}
                alt={selectedDoctor.name}
                className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
              />
              <p className="text-gray-700 mb-2"><strong>Specialty:</strong> {selectedDoctor.specialty}</p>
              <p className="text-gray-700 mb-2"><strong>Description:</strong> {selectedDoctor.description}</p>
              <p className="text-gray-700 mb-4"><strong>Experience:</strong> {selectedDoctor.experience} years</p>

              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                    Appointment Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                    Appointment Time
                  </label>
                  <input
                    type="time"
                    id="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                    disabled={isSubmitting}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300 transition-colors"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Booking..." : "Book Appointment"}
                </button>
              </form>

              {successMessage && (
                <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-lg text-center">
                  {successMessage}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Appointments Modal */}
        {showAppointments && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-black">Booked Appointments</h2>
                <button
                  onClick={() => setShowAppointments(false)}
                  className="text-gray-600 hover:text-gray-800"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {bookedAppointments.length === 0 ? (
                <p className="text-black text-center">No appointments booked yet.</p>
              ) : (
                <ul className="space-y-4">
                  {bookedAppointments.map((appt, index) => (
                    <li key={index} className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-black"><strong>Doctor:</strong> {appt.doctor}</p>
                      <p className="text-black"><strong>Date:</strong> {appt.date}</p>
                      <p className="text-black"><strong>Time:</strong> {appt.time}</p>
                      <p className="text-black"><strong>Booked At:</strong> {new Date(appt.bookedAt).toLocaleString()}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Floating Chatbot Button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors z-50"
        aria-label="Toggle Chatbot"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 10h8M8 14h4m4-8H5a2 2 0 00-2 2v10a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-1m-4 0V4m0 2h-4"
          />
        </svg>
      </button>

      {/* Floating Appointments Button */}
      <button
        onClick={() => setShowAppointments(true)}
        className="fixed bottom-6 right-24 w-14 h-14 bg-green-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-green-700 transition-colors z-50"
        aria-label="Show Booked Appointments"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>

      {/* Chatbot UI */}
      {isChatVisible && (
        <div className="fixed bottom-20 right-6 max-w-2xl w-full sm:w-96 p-6 bg-gray-900 text-white rounded-lg shadow-lg z-40">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-bold">MindCare</h1>
            <button
              onClick={toggleChat}
              className="text-gray-400 hover:text-white"
              aria-label="Close Chatbot"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="h-64 overflow-y-auto mb-4 p-4 bg-gray-800 rounded-lg">
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

          <form onSubmit={handleChatSubmit} className="flex gap-2">
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
      )}
    </div>
  );
}
