"use client";
import { useState } from "react";

/** @typedef {{ id: number, name: string, description: string, image: string }} DietPlan */
/** @typedef {{ id: number, name: string, description: string, image: string }} Exercise */

/** @type {DietPlan[]} */
const diets = [
  {
    id: 1,
    name: "Keto Diet",
    description: "The keto diet is a high-fat, low-carb diet that shifts the body's energy source from carbs to fats, leading to ketosis. It helps in rapid weight loss, stabilizes blood sugar, and improves mental focus. Foods include meats, eggs, dairy, avocados, nuts, and oils while avoiding sugar, grains, and high-carb fruits. Hydration and electrolyte balance are key to avoiding the 'keto flu.'",
    image: "https://www.livofy.com/health/wp-content/uploads/2020/07/med-keto-1024x753.jpg"
  },
  {
    id: 2,
    name: "Mediterranean Diet",
    description: "Inspired by traditional Mediterranean eating habits, this diet focuses on whole grains, fresh vegetables, lean proteins, and healthy fats. Olive oil is the main fat source, and it encourages moderate wine consumption. It reduces heart disease risk, promotes longevity, and helps maintain a healthy weight. Processed foods and refined sugars are avoided.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuVXmKDIR5Ah_pv0-6ASiRUhmaGhXKsYGKYg&s"
  },
  {
    id: 3,
    name: "Paleo Diet",
    description: "The Paleo diet emphasizes whole, unprocessed foods similar to what our ancestors ate. It includes lean meats, fish, vegetables, fruits, nuts, and seeds while avoiding dairy, grains, and processed foods. The diet improves digestion, reduces inflammation, and promotes sustainable weight loss. Avoid legumes and refined sugar to stay on track.",
    image: "https://www.eatingwell.com/thmb/jOZiEZxp5NGAQoL9CtoMDJ26tik=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/the-complete-paleo-diet-food-list-what-to-eat-and-what-to-avoid-0fb5d9b8293e4d6681094083d412bc96.jpg"
  },
  {
    id: 4,
    name: "Vegan Diet",
    description: "A plant-based diet that excludes all animal products, including meat, dairy, and eggs. It focuses on whole foods like legumes, fruits, vegetables, nuts, and seeds, which improve heart health, reduce cancer risk, and aid in weight loss. Vitamin B12 supplementation is recommended as it is primarily found in animal products.",
    image: "https://images.theconversation.com/files/352720/original/file-20200813-22-u6p0qo.jpg?ixlib=rb-4.1.0&rect=0%2C0%2C6576%2C4288&q=45&auto=format&w=926&fit=clip"
  },
  {
    id: 5,
    name: "Intermittent Fasting",
    description: "A structured eating pattern where individuals cycle between fasting and eating periods. Common methods include the 16/8 method (16 hours fasting, 8 hours eating window) and the 5:2 method (eating normally for 5 days, fasting for 2). It boosts metabolism, promotes fat burning, and enhances insulin sensitivity. Staying hydrated and eating nutrient-dense foods during eating windows is crucial.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPLf_oHh4wO0y6ahoocA2T_Xvuk8E2uvEFOg&s"
  }
];

/** @type {Exercise[]} */
const exercises = [
  {
    id: 1,
    name: "Cardio Workouts",
    description: "Cardio exercises, such as running, cycling, or jumping rope, improve heart health, increase endurance, and burn calories. Perform at moderate intensity for at least 30 minutes daily. Warm-up with stretching, maintain a steady pace, and cool down properly. Suitable for fat loss and heart health.",
    image: "https://i.pinimg.com/736x/fe/8f/98/fe8f98d4b42bb7c8a071c3170a1adecd.jpg"
  },
  {
    id: 2,
    name: "Strength Training",
    description: "Strength training includes weight lifting and resistance exercises that build muscle and increase metabolism. Perform compound movements like squats, deadlifts, bench presses, and pull-ups. Focus on proper form, gradually increase weight, and allow recovery time. Train at least 3-4 times a week for best results.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVXiGv79XUP_ZCcJIwh6qBnxSEh1KlobS7jg&s"
  },
  {
    id: 3,
    name: "Yoga & Meditation",
    description: "Yoga combines flexibility, balance, and mental relaxation. It improves posture, reduces stress, and enhances mobility. Perform poses like downward dog, warrior pose, and tree pose for flexibility. Deep breathing exercises enhance focus and relaxation. Best when done in the morning for an energy boost.",
    image: "https://static.vecteezy.com/system/resources/thumbnails/026/735/315/small/women-meditate-yoga-psychic-women-considers-mind-and-heart-spirituality-esotericism-with-bokeh-defocused-lights-universe-generative-ai-illustration-free-photo.jpg"
  },
  {
    id: 4,
    name: "HIIT Workouts",
    description: "High-Intensity Interval Training (HIIT) involves short bursts of intense exercises followed by rest periods. A typical session includes 30 seconds of jumping jacks, push-ups, and squats with 10-second rests in between. It burns fat quickly, improves stamina, and requires only 20-30 minutes per session.",
    image: "https://i.pinimg.com/736x/18/27/84/18278484f7b62eea4fbb44b4329d8f5e.jpg"
  },
  {
    id: 5,
    name: "Pilates",
    description: "Pilates focuses on core strength, flexibility, and posture. It involves low-impact movements like leg raises, planks, and controlled breathing techniques. Perform in slow, controlled movements to engage deep muscles. It enhances body awareness, reduces back pain, and improves balance.",
    image: "https://images.pilatesanytime.com/graphics/responsive/marketing/hub/beginner/reformer---ilaria.jpg"
  }
];

export default function Home() {
  const [selectedDiet, setSelectedDiet] = useState(diets[0]);
  const [selectedExercise, setSelectedExercise] = useState(exercises[0]);
  const [activeTab, setActiveTab] = useState("diet");

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold">Trending Diet Plans & Exercises</h1>

      <div className="flex justify-center gap-6 mt-6">
        <button
          onClick={() => setActiveTab("diet")}
          className={`px-4 py-2 rounded transition ${
            activeTab === "diet" ? "bg-blue-500 text-white" : "bg-gray-700 hover:bg-gray-600"
          }`}
        >
          Diets
        </button>
        <button
          onClick={() => setActiveTab("exercise")}
          className={`px-4 py-2 rounded transition ${
            activeTab === "exercise" ? "bg-green-500 text-white" : "bg-gray-700 hover:bg-gray-600"
          }`}
        >
          Exercises
        </button>
      </div>

      {activeTab === "diet" ? (
        <>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            {diets.map((diet) => (
              <button key={diet.id} onClick={() => setSelectedDiet(diet)} className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded">
                {diet.name}
              </button>
            ))}
          </div>
          <div className="mt-8 text-center max-w-lg">
            <h2 className="text-2xl font-semibold">{selectedDiet.name}</h2>
            <p className="mt-2 text-gray-400">{selectedDiet.description}</p>
            <img src={selectedDiet.image} className="mt-4 w-80 h-52 object-cover mx-auto rounded-lg shadow-md" />
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            {exercises.map((exercise) => (
              <button key={exercise.id} onClick={() => setSelectedExercise(exercise)} className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded">
                {exercise.name}
              </button>
            ))}
          </div>
          <div className="mt-8 text-center max-w-lg">
            <h2 className="text-2xl font-semibold">{selectedExercise.name}</h2>
            <p className="mt-2 text-gray-400">{selectedExercise.description}</p>
            <img src={selectedExercise.image} className="mt-4 w-80 h-52 object-cover mx-auto rounded-lg shadow-md" />
          </div>
        </>
      )}
    </div>
  );
}
