
import { GoogleGenAI } from "@google/genai";
import { MonthlyData } from "../types";

// Always use the process.env.API_KEY directly as per guidelines.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const generateQuarterlyInsights = async (quarter: string, data: MonthlyData[]) => {
  const prompt = `
    Analyze the following marketing data for ${quarter}. 
    Provide a brief executive summary consisting of:
    1. Three key performance highlights (bullet points).
    2. One strategic recommendation for the next month based on the trends.
    
    Data:
    ${JSON.stringify(data.filter(m => m.traffic >= 0 || m.activities.length > 0), null, 2)}
    
    Format the output as simple Markdown. Keep it concise and professional.
  `;

  try {
    // Correct usage: call generateContent directly on the models object.
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    // Access the text property directly (not a method).
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Unable to generate insights at this time.";
  }
};
