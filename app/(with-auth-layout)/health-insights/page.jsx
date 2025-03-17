"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";

export default function HealthInsights() {
  const [healthInsights, setHealthInsights] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const insights = localStorage.getItem("healthInsights");
    if (insights) {
      setHealthInsights(JSON.parse(insights));
    } else {
      router.push("/recomendation");
    }
  }, [router]);

  const handleBackToDashboard = () => {
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1F44] to-[#1E3A8A] text-white">
      <main className="flex-1 container py-6">
        <Card className="bg-gray-800">
          <CardHeader>
            <CardTitle>Your Health Insights</CardTitle>
          </CardHeader>
          <CardContent>
            {healthInsights ? (
              <div className="space-y-6">
                {/* General Insights */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Health Overview</h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-300">
                    <li><strong>BMI:</strong> {healthInsights.bmi} ({healthInsights.bmiCategory})</li>
                    <li><strong>Sleep:</strong> {healthInsights.sleepStatus}</li>
                    <li><strong>Diet:</strong> {healthInsights.dietFeedback}</li>
                    <li><strong>Health Goal:</strong> {healthInsights.goalFeedback}</li>
                  </ul>
                </div>

                {/* Ayurvedic Remedies */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Ayurvedic Remedies</h3>
                  {healthInsights.ayurvedicRemedies.length > 0 ? (
                    <ul className="list-disc pl-5 space-y-2 text-gray-300">
                      {healthInsights.ayurvedicRemedies.map((remedy, index) => (
                        <li key={index}>
                          <strong>{remedy.issue}:</strong> {remedy.remedy}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-400">No specific Ayurvedic remedies suggested.</p>
                  )}
                </div>

                {/* Back Button */}
                <Button
                  onClick={handleBackToDashboard}
                  className="mt-6 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-blue-400 hover:to-cyan-400"
                >
                  Back to Dashboard
                </Button>
              </div>
            ) : (
              <p className="text-gray-400">
                No insights available. Please complete the Health Assessment.
              </p>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}