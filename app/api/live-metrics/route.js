let metrics = {
    heartRate: Math.floor(Math.random() * 61) + 60, // 60-120 bpm
    calories: 100, // Initial value, will increment
    healthScore: Math.floor(Math.random() * 51) + 50, // 50-100%
    oxygenLevel: Math.floor(Math.random() * 11) + 90, // 90-100%
    waterIntake: 1.0, // Starts at 1L, updates rarely
    stepsCount: 1000, // Start with 1000 steps
    sleepHours: 7, // Fixed for a session, changes once per day
    stressLevel: Math.floor(Math.random() * 10) + 1, // 1-10
    bloodPressure: `${Math.floor(Math.random() * 51) + 90}/${Math.floor(Math.random() * 31) + 60}`, // 90-140 / 60-90 mmHg
    bodyTemperature: (Math.random() * 3 + 36).toFixed(1), // 36-39°C
    hydrationLevel: 80, // Starts at 80%, reduces slowly
    activeMinutes: 20, // Initial activity, increases
    respiratoryRate: Math.floor(Math.random() * 9) + 12, // 12-20 breaths/min
  };
  
  // Last update time tracking
  let lastWaterUpdate = Date.now();
  let lastSleepUpdate = Date.now();
  
  export async function GET() {
    const now = Date.now();
  
    // Increment steps every second
    metrics.stepsCount += 1;
  
    // Calories burned over time
    metrics.calories += Math.random() * 0.2; // Slow increase
  
    // Heart rate fluctuates slightly
    metrics.heartRate += Math.random() > 0.5 ? 1 : -1;
    if (metrics.heartRate < 60) metrics.heartRate = 60;
    if (metrics.heartRate > 120) metrics.heartRate = 120;
  
    // Stress level fluctuates slightly
    metrics.stressLevel += Math.random() > 0.7 ? 1 : -1;
    if (metrics.stressLevel < 1) metrics.stressLevel = 1;
    if (metrics.stressLevel > 10) metrics.stressLevel = 10;
  
    // Oxygen level fluctuates slightly
    metrics.oxygenLevel += Math.random() > 0.8 ? 1 : -1;
    if (metrics.oxygenLevel < 90) metrics.oxygenLevel = 90;
    if (metrics.oxygenLevel > 100) metrics.oxygenLevel = 100;
  
    // Hydration level slowly decreases
    if (now - lastWaterUpdate > 3600000) { // 1 hour
      metrics.hydrationLevel -= Math.random() * 5;
      if (metrics.hydrationLevel < 50) metrics.hydrationLevel = 50;
      lastWaterUpdate = now;
    }
  
    // Sleep hours update once per day
    if (now - lastSleepUpdate > 86400000) { // 24 hours
      metrics.sleepHours = Math.floor(Math.random() * 5) + 4; // 4-9 hrs
      lastSleepUpdate = now;
    }
  
    return Response.json(metrics, { status: 200 });
  }
  