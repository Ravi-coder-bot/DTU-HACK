"use client"
import { useState } from "react";

export default function SupplementAdvice() {
  const [formData, setFormData] = useState({
    age: "",
    gender: "male",
    diet: "vegetarian",
    goal: "general health",
  });

  const [recommendations, setRecommendations] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateRecommendations = () => {
    const { age, gender, diet, goal } = formData;
    let advice = "Based on your input, we recommend: ";

    if (goal === "general health") {
      advice += " Multivitamins, Omega-3, and a balanced diet.";
      advice += " Ayurvedic Tip: Consider Ashwagandha and Triphala for overall well-being.";
    } else if (goal === "weight loss") {
      advice += " Green tea extract, fiber supplements, and high-protein foods.";
      advice += " Ayurvedic Tip: Try Methi (Fenugreek), Triphala, and Ginger tea to aid digestion.";
    } else if (goal === "muscle gain") {
      advice += " Whey protein, BCAAs, and creatine.";
      advice += " Ayurvedic Tip: Shatavari and Ashwagandha can help improve strength and endurance.";
    } else if (goal === "immunity boost") {
      advice += " Vitamin C, Zinc, and probiotics.";
      advice += " Ayurvedic Tip: Include Tulsi (Holy Basil), Amla (Indian Gooseberry), and Giloy in your diet.";
    }

    if (diet === "vegan") {
      advice += " Since you're vegan, consider B12 and plant-based protein.";
    } else if (diet === "vegetarian") {
      advice += " For vegetarians, ensure enough iron and protein sources.";
    }

    setRecommendations(advice);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-900 to-gray-800 text-white p-6">
      <div className="max-w-2xl w-full p-8 bg-gray-900 shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-400">
          Supplementation & Nutrition Advice
        </h2>

        {/* Form Inputs */}
        <div className="space-y-6">
          <input
            type="number"
            name="age"
            placeholder="Enter your age"
            value={formData.age}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded bg-gray-800 text-white placeholder-gray-400"
          />

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full p-3 border rounded bg-gray-800 text-white"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          <select
            name="diet"
            value={formData.diet}
            onChange={handleChange}
            className="w-full p-3 border rounded bg-gray-800 text-white"
          >
            <option value="vegetarian">Vegetarian</option>
            <option value="non-vegetarian">Non-Vegetarian</option>
            <option value="vegan">Vegan</option>
          </select>

          <select
            name="goal"
            value={formData.goal}
            onChange={handleChange}
            className="w-full p-3 border rounded bg-gray-800 text-white"
          >
            <option value="general health">General Health</option>
            <option value="weight loss">Weight Loss</option>
            <option value="muscle gain">Muscle Gain</option>
            <option value="immunity boost">Immunity Boost</option>
          </select>

          <button
            onClick={generateRecommendations}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold w-full shadow-md transition-all"
          >
            Get Recommendations
          </button>
        </div>

        {recommendations && (
          <div className="mt-6 p-4 border rounded bg-gray-800 text-white shadow-md">
            <h3 className="text-lg font-semibold text-blue-400">Your Recommendations</h3>
            <p>{recommendations}</p>
          </div>
        )}
      </div>
    </div>
  );
}