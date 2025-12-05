const { GoogleGenerativeAI } = require("@google/generative-ai");


exports.getGeminiData = async (prompt) => {
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash"
        });

        const result = await model.generateContent(prompt);

        return result.response.text() || "";
    } catch (error) {
        console.error("Error calling Gemini API:", error?.message || error);
        throw error;
    }
}