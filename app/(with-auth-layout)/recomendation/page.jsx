"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Checkbox } from "../../../components/ui/checkbox";
import { generateHealthInsights } from "../../../lib/health-analysis";

export default function HealthAssessment() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    height: "",
    weight: "",
    age: "",
    gender: "",
    exerciseFrequency: "never",
    medicalConditions: [],
    sleepHours: "7",
    diet: "mixed",
    healthGoal: "general",
  });
  const [submitted, setSubmitted] = useState(false);

  const medicalConditionsOptions = [
    "Diabetes",
    "Hypertension",
    "Asthma",
    "Heart Disease",
    "Arthritis",
    "None",
  ];

  const sleepHoursOptions = Array.from({ length: 9 }, (_, i) => i + 4); // 4 to 12
  const dietOptions = [
    { value: "vegetarian", label: "Vegetarian" },
    { value: "vegan", label: "Vegan" },
    { value: "mixed", label: "Mixed" },
    { value: "low-carb", label: "Low-Carb" },
    { value: "high-protein", label: "High-Protein" },
  ];
  const healthGoalOptions = [
    { value: "general", label: "General Wellness" },
    { value: "weight-loss", label: "Weight Loss" },
    { value: "muscle-gain", label: "Muscle Gain" },
    { value: "stress-reduction", label: "Stress Reduction" },
    { value: "better-sleep", label: "Better Sleep" },
  ];
  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];
  const exerciseFrequencyOptions = [
    { value: "never", label: "Never" },
    { value: "rarely", label: "Rarely" },
    { value: "sometimes", label: "Sometimes" },
    { value: "often", label: "Often" },
    { value: "daily", label: "Daily" },
  ];

  const handleCheckboxChange = (condition) => (checked) => {
    console.log(`Checkbox ${condition} clicked, checked: ${checked}`);
    setFormData((prev) => {
      const newConditions = checked
        ? [...prev.medicalConditions, condition]
        : prev.medicalConditions.filter((c) => c !== condition);

      if (condition === "None" && checked) {
        console.log("Resetting to 'None'");
        return { ...prev, medicalConditions: ["None"] };
      } else if (condition !== "None" && checked && prev.medicalConditions.includes("None")) {
        console.log("Removing 'None', adding", condition);
        return { ...prev, medicalConditions: newConditions.filter((c) => c !== "None") };
      }
      console.log("New conditions:", newConditions);
      return { ...prev, medicalConditions: newConditions };
    });
  };

  const handleDropdownChange = (field) => (e) => {
    console.log(`Dropdown ${field} changed to: ${e.target.value}`);
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.height || !formData.weight || !formData.age || !formData.gender) {
      alert("Please fill in height, weight, age, and gender.");
      return;
    }
    console.log("Submitting formData:", formData);
    const healthInsights = generateHealthInsights(formData);
    localStorage.setItem("healthData", JSON.stringify(formData));
    localStorage.setItem("healthInsights", JSON.stringify(healthInsights));
    setSubmitted(true);
    router.push("/health-insights");
  };

  return (
    <div className="flex justify-center">
      <div className="min-h-screen bg-gradient-to-br from-[#0A1F44] to-[#1E3A8A] flex flex-col">
        <main className="flex-1 container py-6">
          <Card className="bg-gray-800 text-white">
            <CardHeader>
              <CardTitle>Health Assessment</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="height" className="text-gray-300">
                      Height (cm)
                    </Label>
                    <Input
                      id="height"
                      type="number"
                      value={formData.height}
                      onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                      placeholder="e.g., 170"
                      className="bg-gray-700 border-gray-600 text-white"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="weight" className="text-gray-300">
                      Weight (kg)
                    </Label>
                    <Input
                      id="weight"
                      type="number"
                      value={formData.weight}
                      onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                      placeholder="e.g., 70"
                      className="bg-gray-700 border-gray-600 text-white"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="age" className="text-gray-300">
                      Age
                    </Label>
                    <Input
                      id="age"
                      type="number"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      placeholder="e.g., 30"
                      className="bg-gray-700 border-gray-600 text-white"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="gender" className="text-gray-300">Gender</Label>
                    <select
                      id="gender"
                      value={formData.gender}
                      onChange={handleDropdownChange("gender")}
                      className="w-full bg-gray-700 border-gray-600 text-white rounded-md p-2 shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors"
                    >
                      <option value="" disabled>Select gender</option>
                      {genderOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="exerciseFrequency" className="text-gray-300">Exercise Frequency</Label>
                  <select
                    id="exerciseFrequency"
                    value={formData.exerciseFrequency}
                    onChange={handleDropdownChange("exerciseFrequency")}
                    className="w-full bg-gray-700 border-gray-600 text-white rounded-md p-2 shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors"
                  >
                    <option value="" disabled>Select frequency</option>
                    {exerciseFrequencyOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label className="text-gray-300">Medical Conditions</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {medicalConditionsOptions.map((condition) => (
                      <div key={condition} className="flex items-center space-x-2">
                        <Checkbox
                          id={condition}
                          checked={formData.medicalConditions.includes(condition)}
                          onCheckedChange={handleCheckboxChange(condition)}
                          className="border-gray-600"
                        />
                        <Label htmlFor={condition} className="text-gray-300">
                          {condition}
                        </Label>
                      </div>
                    ))}
                  </div>
                  <div className="text-gray-300 mt-2">
                    Selected: {formData.medicalConditions.join(", ") || "None"}
                  </div>
                </div>

                <div>
                  <Label htmlFor="sleepHours" className="text-gray-300">Sleep Hours Per Night</Label>
                  <select
                    id="sleepHours"
                    value={formData.sleepHours}
                    onChange={handleDropdownChange("sleepHours")}
                    className="w-full bg-gray-700 border-gray-600 text-white rounded-md p-2 shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors"
                  >
                    <option value="" disabled>Select sleep hours</option>
                    {sleepHoursOptions.map((hour) => (
                      <option key={hour} value={hour.toString()}>
                        {hour} hours
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label htmlFor="diet" className="text-gray-300">Diet Preference</Label>
                  <select
                    id="diet"
                    value={formData.diet}
                    onChange={handleDropdownChange("diet")}
                    className="w-full bg-gray-700 border-gray-600 text-white rounded-md p-2 shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors"
                  >
                    <option value="" disabled>Select diet</option>
                    {dietOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label htmlFor="healthGoal" className="text-gray-300">Primary Health Goal</Label>
                  <select
                    id="healthGoal"
                    value={formData.healthGoal}
                    onChange={handleDropdownChange("healthGoal")}
                    className="w-full bg-gray-700 border-gray-600 text-white rounded-md p-2 shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors"
                  >
                    <option value="" disabled>Select health goal</option>
                    {healthGoalOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-blue-400 hover:to-cyan-400"
                >
                  Submit Assessment
                </Button>
              </form>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}