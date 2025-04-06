// const fs = require('fs');
// const { GoogleGenerativeAI } = require('@google/generative-ai');
// const pdf = require('pdf-parse');
// const PDFDocument = require('pdfkit');

// // Your API key
// const API_KEY = 'AIzaSyDXTMTc74QfEgF-aE_048l66f8VWvaeC4U';

// // Initialize the Google Generative AI client
// const genAI = new GoogleGenerativeAI(API_KEY);

// // Function to read PDF content
// async function readPDF(filePath) {
//   return new Promise((resolve, reject) => {
//     const dataBuffer = fs.readFileSync(filePath);
//     pdf(dataBuffer).then(data => {
//       resolve(data.text);
//     }).catch(err => {
//       reject(err);
//     });
//   });
// }

// // Function to call Gemini API
// async function callGeminiAPI(prompt) {
//   try {
//     const model = genAI.getGenerativeModel({ model: "gemini-pro" });
//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     return response.text();
//   } catch (error) {
//     console.error('Error calling Gemini API:', error);
//     return null;
//   }
// }

// // Function to save content as PDF
// function saveAsPDF(content, outputFilePath) {
//   return new Promise((resolve, reject) => {
//     const doc = new PDFDocument();
//     const stream = fs.createWriteStream(outputFilePath);
    
//     doc.pipe(stream);
//     doc.fontSize(12).text(content, 50, 50);
    
//     doc.end();
    
//     stream.on('finish', () => {
//       resolve();
//     });
    
//     stream.on('error', (err) => {
//       reject(err);
//     });
//   });
// }

// // Main function to process the report
// async function processReport(inputFilePath, outputFilePath) {
//   try {
//     // Read the input PDF
//     console.log("Reading PDF...");
//     const pdfContent = await readPDF(inputFilePath);

//     // Prepare the prompt for Gemini API
//     const prompt = `
//       Please modify the following report:
//       ${pdfContent}
      
//       Make the following changes:
//       1. Change the company name to "Scales Technology Solutions LTD"
//       2. Update the activities to focus on software development and coding
      
//       Please maintain the same format and structure as the original report.
//     `;

//     // Call Gemini API to generate the new report
//     console.log("Calling Gemini API...");
//     const newReportContent = await callGeminiAPI(prompt);

//     if (newReportContent) {
//       // Save the new report as a PDF
//       console.log("Saving new report...");
//       await saveAsPDF(newReportContent, outputFilePath);
//       console.log(`New report saved to ${outputFilePath}`);
//     } else {
//       console.log('Failed to generate new report');
//     }
//   } catch (error) {
//     console.error('Error processing report:', error);
//   }
// }

// // Usage
// const inputFile = './report.pdf';
// const outputFile = 'jerseyshop\output.pdf';
// processReport(inputFile, outputFile);