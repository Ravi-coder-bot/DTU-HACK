"use client";

import React, { useState } from "react";
import axios from "axios";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { FileUpload } from "../../../components/ui/FileUpload";

export default function MedicalHistory() {
  const [files, setFiles] = useState([]);
  const [reportTitle, setReportTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [insights, setInsights] = useState([]);
  const [healthRisks, setHealthRisks] = useState([]);
  const [lifestyleMods, setLifestyleMods] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState(null);

  // Handle file uploads
  const handleFileUploads = (uploadedFiles) => {
    setFiles(uploadedFiles);
    setError(null);
  };

  // Analyze the uploaded report
  const analyzeReport = async () => {
    if (files.length === 0) {
      setError("Please upload a report to analyze.");
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      const formData = new FormData();
      files.forEach((file) => formData.append("files", file));

      const response = await axios.post("/api/analyze-report", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const { analysis, insights, healthRisks, lifestyleMods } = response.data;
      setAnalysis(analysis);
      setInsights(insights);
      setHealthRisks(healthRisks);
      setLifestyleMods(lifestyleMods);
    } catch (err) {
      setError("Failed to analyze the report. Please try again.");
      console.error("Analysis error:", err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Delete report and reset to original setup
  const deleteReport = () => {
    setFiles([]);           // Clear uploaded files
    setReportTitle("");     // Clear report title
    setNotes("");           // Clear notes
    setAnalysis(null);      // Clear analysis results
    setInsights([]);        // Clear insights
    setHealthRisks([]);     // Clear health risks
    setLifestyleMods([]);   // Clear lifestyle modifications
    setIsAnalyzing(false);  // Reset analyzing state
    setError(null);         // Clear any error messages
    alert("Report deleted successfully!");
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6">Medical History</h1>
      <p className="text-gray-400 mb-4">Upload your medical reports and get AI-powered analysis with detailed insights and recommendations.</p>

      {/* File Upload Section */}
      <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg mb-6">
        <FileUpload onChange={handleFileUploads} />
      </div>
      <p className="text-gray-400 mb-4">Supported formats: PDF, JPG, PNG (Max file size: 25 MB)</p>

      {/* Report Details */}
      <div className="w-full max-w-lg bg-gray-800 p-6 rounded-lg">
        <Input
          type="text"
          placeholder="Report Title"
          value={reportTitle}
          onChange={(e) => setReportTitle(e.target.value)}
          className="mb-4"
        />
        <Textarea
          placeholder="Add any notes (optional)..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="mb-4"
        />
        <div className="flex justify-between gap-4">
          <Button
            variant="default"
            size="default"
            onClick={analyzeReport}
            disabled={isAnalyzing || files.length === 0}
            className="bg-blue-800 hover:bg-blue-900"
          >
            {isAnalyzing ? "Analyzing..." : "Analyze Report"}
          </Button>
          <Button
            variant="destructive"
            size="default"
            onClick={deleteReport}
            disabled={files.length === 0}
            className="bg-red-800 hover:bg-red-900"
          >
            Delete Report
          </Button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <p className="text-red-400 mt-4">{error}</p>
      )}

      {/* Results Section: 2x2 Grid */}
      {(analysis || insights.length > 0 || healthRisks.length > 0 || lifestyleMods.length > 0) && (
        <div className="w-full max-w-4xl mt-6 flex flex-col gap-6">
          {/* Row 1: Analysis and Insights */}
          <div className="flex flex-row gap-6">
            {/* AI Analysis */}
            {analysis && (
              <div className="flex-1 bg-gray-800 p-6 rounded-lg">
                <h2 className="text-xl font-semibold text-blue-400 mb-2">AI Analysis</h2>
                <p className="text-gray-300 whitespace-pre-line">{analysis}</p>
              </div>
            )}
            {/* Personalized Insights */}
            {insights.length > 0 && (
              <div className="flex-1 bg-gray-800 p-6 rounded-lg">
                <h2 className="text-xl font-semibold text-green-400 mb-2">Personalized Insights</h2>
                <ul className="list-disc pl-5 text-gray-300">
                  {insights.map((insight, index) => (
                    <li key={index}>{insight}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Row 2: Health Risks and Lifestyle Modifications */}
          <div className="flex flex-row gap-6">
            {/* Possible Health Risks */}
            {healthRisks.length > 0 && (
              <div className="flex-1 bg-gray-800 p-6 rounded-lg">
                <h2 className="text-xl font-semibold text-red-400 mb-2">Possible Health Risks</h2>
                <ul className="list-disc pl-5 text-gray-300">
                  {healthRisks.map((risk, index) => (
                    <li key={index}>{risk}</li>
                  ))}
                </ul>
              </div>
            )}
            {/* Lifestyle Modification Suggestions */}
            {lifestyleMods.length > 0 && (
              <div className="flex-1 bg-gray-800 p-6 rounded-lg">
                <h2 className="text-xl font-semibold text-yellow-400 mb-2">Lifestyle Modification Suggestions</h2>
                <ul className="list-disc pl-5 text-gray-300">
                  {lifestyleMods.map((mod, index) => (
                    <li key={index}>{mod}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}