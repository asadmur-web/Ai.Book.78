import { GoogleGenAI, Part, Type as GeminiType } from '@google/genai';
import { Difficulty, ExamType } from '../types';

// Utility to convert a File object to a base64 encoded string
const fileToGenerativePart = async (file: File): Promise<Part> => {
  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result.split(',')[1]);
      } else {
        // Handle ArrayBuffer case if necessary, though it's less common for this flow
        resolve('');
      }
    };
    reader.readAsDataURL(file);
  });
  const data = await base64EncodedDataPromise;
  return {
    inlineData: {
      mimeType: file.type,
      data,
    },
  };
};

// Fix: Add a helper function to read text files
const textFileToString = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
          if (event.target && typeof event.target.result === 'string') {
              resolve(event.target.result);
          } else {
              reject(new Error("Failed to read file as text"));
          }
      };
      reader.onerror = (error) => reject(error);
      reader.readAsText(file);
  });
};

// Main service class for Gemini API interactions
class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    // IMPORTANT: The API key is sourced from an environment variable.
    // Do not expose this key in the client-side code in a real application.
    // This setup assumes the build environment (like Vite or Create React App)
    // replaces `process.env.API_KEY` with the actual key at build time.
    if (!process.env.API_KEY) {
      throw new Error("API_KEY is not defined in environment variables.");
    }
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  
  // Generic function to generate content from text and/or files
  async generateContent(prompt: string, file?: File): Promise<string> {
    const model = 'gemini-2.5-pro'; // Using a powerful model for complex tasks
    const parts: Part[] = [];
    let combinedPrompt = prompt;

    if (file) {
      // Fix: Add support for text files
      if (file.type.startsWith('image/')) {
        const filePart = await fileToGenerativePart(file);
        parts.push(filePart);
      } else if (file.type === 'text/plain') {
        const textContent = await textFileToString(file);
        combinedPrompt += `\n\nUse the following content from the uploaded file as context:\n---\n${textContent}\n---`;
      } else {
        // A simple alert for unsupported file types in this client-only version.
        alert("لملفات PDF/Word، يرجى نسخ ولصق النص في منطقة النص. المعالجة المباشرة لهذه الملفات غير مدعومة في هذا العرض التوضيحي.");
        return "";
      }
    }
    
    parts.unshift({ text: combinedPrompt });
    
    try {
      const response = await this.ai.models.generateContent({
        model,
        contents: { parts },
      });
      return response.text;
    } catch (error) {
      console.error("Error generating content:", error);
      return "حدث خطأ أثناء إنشاء المحتوى. يرجى التحقق من الكونسول للحصول على التفاصيل.";
    }
  }

  async generateJsonExam(prompt: string, file?: File, difficulty?: Difficulty, examType?: ExamType) {
    const model = 'gemini-2.5-pro';
    const parts: Part[] = [];
    let combinedPrompt = prompt;
    
    if (file) {
      // Fix: Add support for text files, similar to generateContent
      if (file.type.startsWith('image/')) {
          const filePart = await fileToGenerativePart(file);
          parts.push(filePart);
      } else if (file.type === 'text/plain') {
        const textContent = await textFileToString(file);
        combinedPrompt += `\n\nUse the following content from the uploaded file as context:\n---\n${textContent}\n---`;
      }
    }
    
    parts.unshift({ text: combinedPrompt });
    
    const schema = {
        type: GeminiType.ARRAY,
        items: {
            type: GeminiType.OBJECT,
            properties: {
                question: { type: GeminiType.STRING },
                type: { type: GeminiType.STRING, enum: ['multiple-choice', 'fill-in-the-blank', 'true-false']},
                options: { type: GeminiType.ARRAY, items: {type: GeminiType.STRING}, nullable: true },
                answer: { type: GeminiType.STRING }
            },
            required: ['question', 'type', 'answer']
        }
    };

    try {
        const response = await this.ai.models.generateContent({
            model,
            contents: { parts },
            config: {
                responseMimeType: "application/json",
                responseSchema: schema,
            },
        });

        // The response text should be a JSON string, but we trim to be safe.
        return response.text.trim();
    } catch (error) {
        console.error("Error generating JSON exam:", error);
        return "[]"; // Return empty JSON array on error
    }
  }
}

// Export a singleton instance of the service
export const geminiService = new GeminiService();