"use client";

import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import doctor1 from "../../../public/assets/doctor1.jpg";
import doctor2 from "../../../public/assets/doctor2.jpg";
import doctor3 from "../../../public/assets/doctor3.jpg";
import doctor4 from "../../../public/assets/doctor4.jpg";
import doctor5 from "../../../public/assets/doctor5.jpg";
import doctor6 from "../../../public/assets/doctor6.jpg";
import doctor7 from "../../../public/assets/doctor7.jpg";
import doctor8 from "../../../public/assets/doctor8.jpg";
import doctor9 from "../../../public/assets/doctor9.jpg";
import doctor1f from "../../../public/assets/doctor1f.jpg";
import doctor2f from "../../../public/assets/doctor2f.jpg";
import doctor3f from "../../../public/assets/doctor3f.jpg";
import doctor4f from "../../../public/assets/doctor4f.jpg";
import doctor5f from "../../../public/assets/doctor5f.jpg";
import doctor6f from "../../../public/assets/doctor6f.jpg";
import doctor7f from "../../../public/assets/doctor7f.jpg";

export default function DoctorBookingPage() {
  // Doctor Booking State
  const [searchCategory, setSearchCategory] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [bookedAppointments, setBookedAppointments] = useState([]);
  const [showAppointments, setShowAppointments] = useState(false);

  // Chatbot State
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isChatVisible, setIsChatVisible] = useState(false);

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
    { id: 1, name: "Dr. Vikram Singh", specialty: "General Physician", description: "Expert in family medicine.", experience: 15, photo: doctor1 },
    { id: 2, name: "Dr. Manoj Thakur", specialty: "Psychiatrist", description: "Specializes in mental health disorders.", experience: 12, photo: doctor2 },
    { id: 3, name: "Dr. Anil Gupta", specialty: "Cardiologist", description: "Focuses on heart conditions.", experience: 18, photo: doctor3 },
    { id: 4, name: "Dr. Sanjay Patel", specialty: "Ayurvedic Doctor", description: "Traditional holistic healing expert.", experience: 10, photo: doctor4 },
    { id: 5, name: "Dr. Satyam Desai", specialty: "Dermatologist", description: "Skin care and cosmetic procedures.", experience: 8, photo: doctor5 },
    { id: 6, name: "Dr. Sanjay Kumar", specialty: "Neurologist", description: "Treats brain and nerve disorders.", experience: 20, photo: doctor6 },
    { id: 7, name: "Dr. Amit Mishra", specialty: "Pediatrician", description: "Caring for children’s health.", experience: 14, photo: doctor7 },
    { id: 8, name: "Dr. Rajesh Yadav", specialty: "Orthopedic Surgeon", description: "Bone and joint specialist.", experience: 16, photo: doctor8 },
    { id: 9, name: "Dr. Rohan Kapoor", specialty: "Gynecologist", description: "Women’s reproductive health expert.", experience: 11, photo: doctor9 },
    { id: 10, name: "Dr. Meena Joshi", specialty: "Dentist", description: "Dental care and surgery.", experience: 9, photo: doctor1f },
    { id: 11, name: "Dr. Kavita Nair", specialty: "Dermatologist", description: "Advanced skin treatments.", experience: 7, photo: doctor2f },
    { id: 12, name: "Dr. Anjali Verma", specialty: "General Physician", description: "Primary care specialist.", experience: 13, photo: doctor3f },
    { id: 13, name: "Dr. Pooja Saxena", specialty: "Ayurvedic Doctor", description: "Herbal medicine practitioner.", experience: 12, photo: doctor4f },
    { id: 14, name: "Dr. Rekha Bhatt", specialty: "Cardiologist", description: "Heart disease management.", experience: 17, photo: doctor5f },
    { id: 15, name: "Dr. Priya Sharma", specialty: "Neurologist", description: "Expert in neurological conditions.", experience: 19, photo: doctor6f },
    { id: 16, name: "Dr. Shalini Iyer", specialty: "Psychiatrist", description: "Mental wellness advocate.", experience: 10, photo: doctor7f },
    { id: 17, name: "Dr. Arjun Malhotra", specialty: "Orthopedic Surgeon", description: "Joint replacement specialist.", experience: 15, photo: doctor1 },
    { id: 18, name: "Dr. Sunil Chopra", specialty: "Pediatrician", description: "Pediatric care expert.", experience: 8, photo: doctor2 },
    { id: 19, name: "Dr. Deepak Rana", specialty: "Gynecologist", description: "Focuses on women’s health.", experience: 14, photo: doctor3 },
    { id: 20, name: "Dr. Naveen Reddy", specialty: "Dentist", description: "Cosmetic dentistry specialist.", experience: 11, photo: doctor4 },
  ];

  const filteredDoctors = searchCategory && searchCategory !== "All"
    ? doctors.filter((doc) => doc.specialty === searchCategory)
    : doctors;

  // Doctor Booking Submit Handler
  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDoctor || !date || !time) {
      alert("Please select a doctor and fill in all fields.");
      return;
    }

    // Validate time (between 10 AM and 10 PM)
    const selectedTime = new Date(`1970-01-01T${time}:00`);
    const minTime = new Date(`1970-01-01T10:00:00`);
    const maxTime = new Date(`1970-01-01T22:00:00`);
    if (selectedTime < minTime || selectedTime > maxTime) {
      alert("Please select a time between 10 AM and 10 PM.");
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
    } catch (error) {
      console.error("Booking error:", error);
      alert(error.response?.data?.details || "Failed to book appointment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Chatbot Submit Handler
  const handleChatSubmit = async (e) => {
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
      console.error("Axios Error:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
      setChatHistory((prev) => [
        ...prev,
        { role: "bot", content: `Error: ${errorMessage}` },
      ]);
    } finally {
      setLoading(false);
      setMessage("");
    }
  };

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
              <div className="w-full h-40 relative rounded-md mb-4">
                <Image
                  src={doc.photo}
                  alt={doc.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md"
                />
              </div>
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

              <div className="w-32 h-32 relative mx-auto mb-4">
                <Image
                  src={selectedDoctor.photo}
                  alt={selectedDoctor.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                />
              </div>
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
                    Appointment Time (10 AM - 10 PM)
                  </label>
                  <select
                    id="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    size="4" // Show only 4 options at a time
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-800 overflow-y-auto"
                    disabled={isSubmitting}
                  >
                    <option value="" disabled>Select a time</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="10:30">10:30 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="11:30">11:30 AM</option>
                    <option value="12:00">12:00 PM</option>
                    <option value="12:30">12:30 PM</option>
                    <option value="13:00">1:00 PM</option>
                    <option value="13:30">1:30 PM</option>
                    <option value="14:00">2:00 PM</option>
                    <option value="14:30">2:30 PM</option>
                    <option value="15:00">3:00 PM</option>
                    <option value="15:30">3:30 PM</option>
                    <option value="16:00">4:00 PM</option>
                    <option value="16:30">4:30 PM</option>
                    <option value="17:00">5:00 PM</option>
                    <option value="17:30">5:30 PM</option>
                    <option value="18:00">6:00 PM</option>
                    <option value="18:30">6:30 PM</option>
                    <option value="19:00">7:00 PM</option>
                    <option value="19:30">7:30 PM</option>
                    <option value="20:00">8:00 PM</option>
                    <option value="20:30">8:30 PM</option>
                    <option value="21:00">9:00 PM</option>
                    <option value="21:30">9:30 PM</option>
                    <option value="22:00">10:00 PM</option>
                  </select>
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