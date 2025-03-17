import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("files");

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: "No files uploaded" },
        { status: 400 }
      );
    }

    // Hardcoded analysis in bullet points (as a single string with newlines)
    const analysis = `
      - Vital Signs: Blood Pressure (120/80 mmHg), Heart Rate (72 bpm), and Oxygen Saturation (98%) are within normal ranges.
      - Glucose Levels: Fasting glucose at 110 mg/dL (normal: 70-99 mg/dL) and HbA1c at 6.0% (normal: <5.7%) indicate prediabetes.
      - Cholesterol: Total cholesterol at 190 mg/dL (normal: <200 mg/dL) and LDL at 130 mg/dL (normal: <100 mg/dL) suggest mild hyperlipidemia.
      - BMI: 25.5 indicates the patient is slightly overweight (normal: 18.5-24.9).
    `.trim();

    // Hardcoded personalized insights (recommendations only)
    const insights = [
      "Reduce sugar and refined carbohydrate intake; increase fiber-rich foods (e.g., vegetables, whole grains) to manage prediabetes.",
      "Engage in moderate exercise (e.g., brisk walking, swimming) for 30 minutes, 5 days a week, to improve glucose and cholesterol levels.",
      "Schedule a follow-up with an endocrinologist within 3 months to monitor prediabetes progression and discuss potential medication (e.g., metformin).",
    ];

    // Hardcoded possible health risks
    const healthRisks = [
      "Increased risk of developing Type 2 Diabetes if prediabetes is not managed effectively.",
      "Elevated LDL cholesterol may contribute to atherosclerosis, increasing cardiovascular disease risk over time.",
      "Overweight status (BMI 25.5) heightens the risk of hypertension and joint issues if weight gain continues.",
    ];

    // Hardcoded lifestyle modification suggestions
    const lifestyleMods = [
      "Limit alcohol consumption to 1-2 drinks per week to support cholesterol and glucose control.",
      "Incorporate stress-reduction techniques (e.g., meditation, yoga) to prevent cortisol-related glucose spikes.",
      "Aim for 7-8 hours of quality sleep nightly to improve metabolic health and weight management.",
    ];

    // Return the hardcoded response with separate fields
    return NextResponse.json(
      { analysis, insights, healthRisks, lifestyleMods },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error in /api/analyze-report:", {
      message: error.message,
      stack: error.stack,
    });
    return NextResponse.json(
      {
        error: "Failed to analyze report",
        details: error.message || "An unexpected error occurred",
      },
      { status: 500 }
    );
  }
}