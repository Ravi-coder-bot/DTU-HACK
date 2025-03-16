// "use client";
// import { useState } from "react";
// import dynamic from "next/dynamic";
// import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
// import { motion } from "framer-motion";

// // Dynamically import PDFDownloadLink without SSR
// const PDFDownloadLink = dynamic(
//   () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
//   { ssr: false }
// );

// const styles = StyleSheet.create({
//   page: { flexDirection: "column", padding: 20 },
//   section: { marginBottom: 10 },
//   title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
//   text: { fontSize: 14, marginBottom: 5 },
// });

// const HealthReportPDF = ({ reportData }) => (
//   <Document>
//     <Page size="A4" style={styles.page}>
//       <View style={styles.section}>
//         <Text style={styles.title}>Health Report</Text>
//         <Text style={styles.text}>Heart Rate: {reportData.heartRate}</Text>
//         <Text style={styles.text}>Calories Burned: {reportData.caloriesBurned}</Text>
//         <Text style={styles.text}>Health Score: {reportData.healthScore}</Text>
//         <Text style={styles.text}>Consultations: {reportData.consultations}</Text>
//       </View>
//     </Page>
//   </Document>
// );

// const HealthReport = () => {
//   const [reportData] = useState({
//     heartRate: "72 bpm",
//     caloriesBurned: "2,450 kcal",
//     healthScore: "92%",
//     consultations: "5 this week",
//   });

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.8 }}
//       className="min-h-screen w-full bg-[#0A1F44] p-8 text-white"
//     >
//       <h1 className="text-4xl font-bold text-center mb-8">Health Report</h1>
//       <div className="flex justify-center">
//         {PDFDownloadLink && (
//           <PDFDownloadLink
//             document={<HealthReportPDF reportData={reportData} />}
//             fileName="Health_Report.pdf"
//             className="bg-gradient-to-r from-[#4F46E5] to-[#F43F5E] px-6 py-3 rounded-lg text-lg font-semibold"
//           >
//             {({ loading }) => (loading ? "Generating PDF..." : "Download Report")}
//           </PDFDownloadLink>
//         )}
//       </div>
//     </motion.div>
//   );
// };

// export default HealthReport;



import React from 'react'

const HealthReortpdf = () => {
  return (
    <div>HealthReortpdf</div>
  )
}

export default HealthReortpdf




















