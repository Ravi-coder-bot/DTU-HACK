export async function GET(req) {
    // Simulating user state (normally this would come from a database or wearable device)
    const userActivityLevel = Math.random() > 0.5 ? "active" : "resting"; // Randomly assign activity state
    const stressLevel = Math.floor(Math.random() * 5) + 1; // 1 to 5 scale
    const hoursSleptLastNight = Math.floor(Math.random() * (9 - 4 + 1)) + 4; // 4 to 9 hours
  
    // Heart Rate logic
    let heartRate;
    if (userActivityLevel === "active") {
      heartRate = Math.floor(Math.random() * (140 - 90 + 1)) + 90; // Active: 90-140 bpm
    } else {
      heartRate = Math.floor(Math.random() * (75 - 60 + 1)) + 60; // Resting: 60-75 bpm
    }
  
    // Steps count logic
    let stepsCount = userActivityLevel === "active" ? Math.floor(Math.random() * (15000 - 5000 + 1)) + 5000 : Math.floor(Math.random() * (3000 - 500 + 1)) + 500;
  
    // Calories burned formula (based on steps and heart rate)
    let calories = Math.floor((stepsCount / 20) + (heartRate * 0.3));
  
    // Oxygen level logic (based on stress & activity)
    let oxygenLevel = userActivityLevel === "active"
      ? Math.floor(Math.random() * (99 - 94 + 1)) + 94 // Active: 94% - 99%
      : Math.floor(Math.random() * (98 - 96 + 1)) + 96; // Resting: 96% - 98%
  
    // Water intake suggestion based on steps and activity level
    let waterIntake = (2 + (stepsCount / 5000) + (stressLevel * 0.1)).toFixed(1); // Base 2L + additional based on activity
  
    // Health Score (combination of all factors)
    let healthScore = Math.floor((100 - stressLevel * 5) - ((8 - hoursSleptLastNight) * 4) + (oxygenLevel - 95) * 2);
  
    // Simulating consultations (if health score < 70, assume 1 consultation needed)
    let consultations = healthScore < 70 ? Math.floor(Math.random() * 2) + 1 : 0;
  
    const liveMetrics = {
      heartRate,
      calories,
      healthScore,
      consultations,
      oxygenLevel,
      waterIntake,
      stepsCount,
      sleepHours: hoursSleptLastNight,
      stressLevel,
    };
  
    return Response.json(liveMetrics);
  }
  