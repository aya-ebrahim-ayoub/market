
import { GoogleGenAI, Type } from "@google/genai";

// Fix: Always use process.env.API_KEY directly for initialization as per guidelines.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateProductDescription = async (productName: string, category: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Write a compelling, professional 30-word marketing description for a product named "${productName}" in the "${category}" category.`,
      config: {
        temperature: 0.7,
        topP: 0.9,
      }
    });
    return response.text || "No description generated.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Failed to generate AI description.";
  }
};

export const getSmartSearchSuggestions = async (query: string): Promise<string[]> => {
  if (!query) return [];
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Based on the search query "${query}", provide 5 related product search terms for an e-commerce marketplace.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      }
    });
    return JSON.parse(response.text || '[]');
  } catch (error) {
    return [];
  }
};
