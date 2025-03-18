"use client";

import React, { useState } from "react";
import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";

const NoiseConnect = () => {
  const [buttonText, setButtonText] = useState("Connect");
  const [data, setData] = useState({
    heartPts: "None",
    steps: "None",
    moveMin: "None",
    calories: "None",
    heartRate: "None",
    distance: "None",
    sleep: "None",
    battery: "None",
    activeMinutes: "None",
  });
  const [diagnosis, setDiagnosis] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);

  // Check if Web Bluetooth API is available
  const isBluetoothAvailable = "bluetooth" in navigator;

  // Function to analyze the data and provide a diagnosis
  const generateDiagnosis = (heartRate, sleep, activeMinutes) => {
    let diagnosisText = "";

    if (heartRate > 90) {
      diagnosisText += "🚨 High Heart Rate: May indicate stress, dehydration, or lack of rest. Try deep breathing, hydration, and relaxation.\n\n";
    } else {
      diagnosisText += "✅ Heart Rate Normal: Your cardiovascular health looks stable.\n\n";
    }

    if (sleep < 6) {
      diagnosisText += "😴Low Sleep (4 Hours):You need at least 6-8 hours for optimal recovery. Reduce screen time before bed.\n\n";
    } else {
      diagnosisText += "✅ Good Sleep:Your sleep duration is within a healthy range.\n\n";
    }

    if (activeMinutes < 40) {
      diagnosisText += "🏃 Low Activity: Try to increase movement throughout the day. Walking and light exercises help maintain metabolism.\n\n";
    } else {
      diagnosisText += "✅ Active Lifestyle: Keep up the movement for a healthy body.\n\n";
    }

    if (heartRate > 90 && sleep < 6) {
      diagnosisText += "💡 Ayurvedic Suggestion: Your Pitta (heat) & Vata (air) may be imbalanced. Focus on cooling foods (coconut water, ghee, fruits) and grounding practices (yoga, meditation).\n\n";
    }

    return diagnosisText;
  };

  // Simulated connect action (sets real-time values)
  const handleButtonClick = () => {
    if (buttonText === "Connect") {
      setIsConnecting(true);
      setButtonText("Connecting...");

      setTimeout(() => {
        const newData = {
          heartPts: 735,
          steps: "1.52 km",
          moveMin: 30,
          calories: "2,430 Cal",
          heartRate: 95, // Increased heart rate
          distance: "1.52 km",
          sleep: 4, // Reduced sleep
          battery: "90%",
          activeMinutes: 45,
        };

        setData(newData);
        setDiagnosis(generateDiagnosis(newData.heartRate, newData.sleep, newData.activeMinutes));
        setButtonText("Disconnect");
        setIsConnecting(false);
      }, 1000);
    } else {
      // Reset Data on Disconnect
      setData({
        heartPts: "None",
        steps: "None",
        moveMin: "None",
        calories: "None",
        heartRate: "None",
        distance: "None",
        sleep: "None",
        battery: "None",
        activeMinutes: "None",
      });
      setDiagnosis("");
      setButtonText("Connect");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0A1F44] to-[#1E3A8A] p-4">
      <Card className="w-full max-w-lg bg-card text-card-foreground shadow-lg">
        <CardHeader className="border-b pb-4">
          <CardTitle className="text-2xl font-semibold text-primary">
            NoiseFit Metrics & Diagnosis
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4">
            <Button
              onClick={handleButtonClick}
              disabled={isConnecting || !isBluetoothAvailable}
              variant={buttonText === "Disconnect" ? "destructive" : "default"}
              className="w-full"
            >
              {isConnecting ? "Connecting..." : buttonText}
            </Button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="flex justify-between p-2 rounded-md bg-muted">
                <span className="font-medium">Heart Points:</span>
                <span>{data.heartPts}</span>
              </div>
              <div className="flex justify-between p-2 rounded-md bg-muted">
                <span className="font-medium">Steps:</span>
                <span>{data.steps}</span>
              </div>
              <div className="flex justify-between p-2 rounded-md bg-muted">
                <span className="font-medium">Move Minutes:</span>
                <span>{data.moveMin} min</span>
              </div>
              <div className="flex justify-between p-2 rounded-md bg-muted">
                <span className="font-medium">Calories:</span>
                <span>{data.calories}</span>
              </div>
              <div className="flex justify-between p-2 rounded-md bg-muted">
                <span className="font-medium">Heart Rate:</span>
                <span className={data.heartRate > 90 ? "text-red-500" : "text-green-500"}>
                  {data.heartRate} bpm
                </span>
              </div>
              <div className="flex justify-between p-2 rounded-md bg-muted">
                <span className="font-medium">Sleep:</span>
                <span className={data.sleep < 6 ? "text-yellow-500" : "text-green-500"}>
                  {data.sleep} hours
                </span>
              </div>
              <div className="flex justify-between p-2 rounded-md bg-muted">
                <span className="font-medium">Battery:</span>
                <span>{data.battery}</span>
              </div>
              <div className="flex justify-between p-2 rounded-md bg-muted">
                <span className="font-medium">Active Minutes:</span>
                <span>{data.activeMinutes} min</span>
              </div>
            </div>

            {/* Diagnosis Section */}
            {diagnosis && (
              <div className="mt-4 p-4 bg-yellow-100 text-yellow-800 rounded-lg">
                <h3 className="text-lg font-semibold">📊 Health Diagnosis:</h3>
                <p className="text-sm whitespace-pre-line">{diagnosis}</p>
              </div>
            )}

            {!isBluetoothAvailable && (
              <p className="text-yellow-500 text-sm mt-4">
                Web Bluetooth is not supported in this browser. Use Chrome on
                Android or desktop.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NoiseConnect;
