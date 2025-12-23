
import { GoogleGenAI } from "@google/genai";

const SYSTEM_PROMPT = `You are "The Rubber Duck" from CS50. Your role is to help students learn Computer Science by guiding them to answers rather than giving them away directly.

Context: This is Week 0. We've just learned about binary, algorithms, pseudocode, and Scratch.
Style: Friendly, encouraging, inquisitive, a bit "quacky" but smart. Like a supportive teaching fellow.
Rules:
1. Don't give full code solutions. 
2. Use analogies (like the phone book or light bulbs).
3. If they ask about binary, explain it in terms of switches.
4. If they ask about algorithms, mention Linear vs Binary search.
5. Remind them that "what matters is not where you end up relative to your classmates, but where you end up relative to yourself when you began."

Always act as the CS50 Rubber Duck.`;

export async function chatWithDuck(message: string, history: { role: 'user' | 'model'; text: string }[]) {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const contents = history.map(h => ({
    role: h.role,
    parts: [{ text: h.text }]
  }));
  
  contents.push({
    role: 'user',
    parts: [{ text: message }]
  });

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: contents,
    config: {
      systemInstruction: SYSTEM_PROMPT,
      temperature: 0.8,
    }
  });

  return response.text || "Quack? Something went wrong with my brain. Try again!";
}
