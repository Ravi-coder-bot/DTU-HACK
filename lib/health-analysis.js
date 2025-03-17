export function generateHealthInsights(formData) {
  const { height, weight, age, gender, exerciseFrequency, medicalConditions, sleepHours, diet, healthGoal } = formData;

  // Convert height (cm) to meters for BMI calculation
  const heightInMeters = parseFloat(height) / 100;
  const weightInKg = parseFloat(weight);
  const bmi = weightInKg / (heightInMeters * heightInMeters);
  const sleepHoursNum = parseInt(sleepHours);

  // Base insights
  let insights = {
    bmi: bmi.toFixed(1),
    bmiCategory: "",
    sleepStatus: "",
    dietFeedback: "",
    goalFeedback: "",
    ayurvedicRemedies: [],
  };

  // BMI Category
  if (bmi < 18.5) {
    insights.bmiCategory = "Underweight";
    insights.ayurvedicRemedies.push({
      issue: "Underweight",
      remedy: "Incorporate ashwagandha (1 tsp powder with warm milk daily) to boost strength and nourishment. Favor warm, oily foods like ghee and nuts to balance Vata.",
    });
  } else if (bmi >= 18.5 && bmi < 25) {
    insights.bmiCategory = "Normal";
    insights.ayurvedicRemedies.push({
      issue: "Maintain Balance",
      remedy: "Continue a balanced diet with tulsi tea (1 cup daily) to support immunity and overall wellness.",
    });
  } else if (bmi >= 25 && bmi < 30) {
    insights.bmiCategory = "Overweight";
    insights.ayurvedicRemedies.push({
      issue: "Overweight",
      remedy: "Take triphala (1 tsp with warm water at night) to aid digestion and weight management. Include bitter foods like turmeric and fenugreek to reduce Kapha.",
    });
  } else {
    insights.bmiCategory = "Obese";
    insights.ayurvedicRemedies.push({
      issue: "Obesity",
      remedy: "Use guggulu (500 mg daily, consult practitioner) to support fat metabolism. Practice daily pranayama (breathing exercises) to balance Kapha.",
    });
  }

  // Sleep Hours Analysis
  if (sleepHoursNum < 6) {
    insights.sleepStatus = "Insufficient sleep";
    insights.ayurvedicRemedies.push({
      issue: "Poor Sleep",
      remedy: "Drink warm milk with a pinch of nutmeg before bed to calm Vata and promote restful sleep. Practice 10 minutes of meditation.",
    });
  } else if (sleepHoursNum >= 6 && sleepHoursNum <= 8) {
    insights.sleepStatus = "Adequate sleep";
    insights.ayurvedicRemedies.push({
      issue: "Maintain Sleep",
      remedy: "Sip chamomile or brahmi tea (1 cup in the evening) to sustain healthy sleep patterns.",
    });
  } else {
    insights.sleepStatus = "Excessive sleep";
    insights.ayurvedicRemedies.push({
      issue: "Excess Sleep",
      remedy: "Start the day with ginger tea (1 tsp grated ginger in hot water) to energize and reduce Kapha sluggishness.",
    });
  }

  // Diet Feedback
  switch (diet) {
    case "vegetarian":
      insights.dietFeedback = "Good for balancing Pitta and Kapha.";
      insights.ayurvedicRemedies.push({
        issue: "Diet Support",
        remedy: "Add cumin and coriander to meals to enhance digestion and maintain balance.",
      });
      break;
    case "vegan":
      insights.dietFeedback = "Supports lightness but monitor Vata.";
      insights.ayurvedicRemedies.push({
        issue: "Diet Support",
        remedy: "Incorporate sesame oil (1 tsp daily) to ground Vata and prevent dryness.",
      });
      break;
    case "mixed":
      insights.dietFeedback = "Balanced but watch for excess Pitta.";
      insights.ayurvedicRemedies.push({
        issue: "Diet Support",
        remedy: "Use cooling spices like fennel and avoid excessive spicy foods to pacify Pitta.",
      });
      break;
    case "low-carb":
      insights.dietFeedback = "May increase Vata if too dry.";
      insights.ayurvedicRemedies.push({
        issue: "Diet Support",
        remedy: "Add ghee (1 tsp daily) to meals to lubricate and balance Vata.",
      });
      break;
    case "high-protein":
      insights.dietFeedback = "May aggravate Pitta if overdone.";
      insights.ayurvedicRemedies.push({
        issue: "Diet Support",
        remedy: "Drink aloe vera juice (1 tbsp daily) to cool Pitta and support digestion.",
      });
      break;
  }

  // Health Goal Feedback
  switch (healthGoal) {
    case "general":
      insights.goalFeedback = "Focus on overall balance.";
      insights.ayurvedicRemedies.push({
        issue: "General Wellness",
        remedy: "Take amla (Indian gooseberry, 1 tsp juice daily) for its antioxidant properties and overall vitality.",
      });
      break;
    case "weight-loss":
      insights.goalFeedback = "Prioritize digestion and metabolism.";
      insights.ayurvedicRemedies.push({
        issue: "Weight Loss",
        remedy: "Drink warm water with lemon and honey each morning to boost metabolism and reduce Kapha.",
      });
      break;
    case "muscle-gain":
      insights.goalFeedback = "Build strength and stamina.";
      insights.ayurvedicRemedies.push({
        issue: "Muscle Gain",
        remedy: "Use shatavari (1 tsp powder with milk) to nourish tissues and support muscle growth.",
      });
      break;
    case "stress-reduction":
      insights.goalFeedback = "Calm the mind and nervous system.";
      insights.ayurvedicRemedies.push({
        issue: "Stress Reduction",
        remedy: "Practice abhyanga (self-massage with sesame oil) weekly to soothe Vata and reduce stress.",
      });
      break;
    case "better-sleep":
      insights.goalFeedback = "Enhance sleep quality.";
      insights.ayurvedicRemedies.push({
        issue: "Better Sleep",
        remedy: "Massage feet with warm sesame oil before bed to ground Vata and improve sleep.",
      });
      break;
  }

  // Medical Conditions (if any)
  if (medicalConditions.length > 0 && !medicalConditions.includes("None")) {
    medicalConditions.forEach((condition) => {
      if (condition === "Diabetes") {
        insights.ayurvedicRemedies.push({
          issue: "Diabetes",
          remedy: "Consume bitter melon (karela) juice (1 tbsp daily) to help regulate blood sugar levels.",
        });
      } else if (condition === "Hypertension") {
        insights.ayurvedicRemedies.push({
          issue: "Hypertension",
          remedy: "Drink hibiscus tea (1 cup daily) to support blood pressure regulation and calm Pitta.",
        });
      } else if (condition === "Asthma") {
        insights.ayurvedicRemedies.push({
          issue: "Asthma",
          remedy: "Take licorice root tea (1 tsp steeped in hot water) to soothe respiratory passages, avoiding if hypertensive.",
        });
      } else if (condition === "Heart Disease") {
        insights.ayurvedicRemedies.push({
          issue: "Heart Disease",
          remedy: "Use arjuna bark powder (1 tsp with water daily) to support heart health, consult practitioner.",
        });
      } else if (condition === "Arthritis") {
        insights.ayurvedicRemedies.push({
          issue: "Arthritis",
          remedy: "Apply warm castor oil to joints and consume turmeric (1 tsp in warm milk) to reduce inflammation.",
        });
      }
    });
  }

  return insights;
}