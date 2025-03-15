export default function handler(req, res) {
  const liveMetrics = {
    heartRate: Math.floor(Math.random() * (100 - 60 + 1)) + 60, // 60 - 100 bpm
    calories: Math.floor(Math.random() * (3000 - 1800 + 1)) + 1800, // 1800 - 3000 kcal
    healthScore: Math.floor(Math.random() * (100 - 70 + 1)) + 70, // 70 - 100%
    consultations: Math.floor(Math.random() * 10) + 1, // 1 - 10 consultations
  };

  res.status(200).json(liveMetrics);
}
