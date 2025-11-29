import { GoogleGenAI } from "@google/genai";
import { MonthlyData } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateQuarterlyInsights = async (quarter: string, data: MonthlyData[]) => {
  if (!apiKey) {
    return "API Key is missing. Unable to generate AI insights. Please configure process.env.API_KEY.";
  }

  const prompt = `
    Analyze the following marketing data for ${quarter}. 
    Provide a brief executive summary consisting of:
    1. Three key performance highlights (bullet points).
    2. One strategic recommendation for the next month based on the trends.
    
    Data:
    ${JSON.stringify(data.filter(m => m.traffic > 0 || m.activities.length > 0), null, 2)}
    
    Format the output as simple Markdown. Keep it concise and professional.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Unable to generate insights at this time.";
  }
};