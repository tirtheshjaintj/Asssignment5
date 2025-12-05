const Groq = require('groq-sdk');
const groqApiKey = process.env.GROQ_API_KEY;
const groq = new Groq({ apiKey: groqApiKey });

if (!groqApiKey) {
    console.error('Error: Missing GROQ_API_KEY in .env file');
}

async function getGroqData(prompt) {
    try {
        const result = await groq.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: "llama-3.1-8b-instant",
        });
        return result.choices[0]?.message?.content || "";
    } catch (error) {
        console.error('Error calling Groq AI API:', error);
        throw error;
    }
}
async function getGeminiData(prompt) {
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash"  // or gemini-pro / gemini-1.5-flash depending on usage
        });

        const result = await model.generateContent(prompt);

        return result.response.text() || "";
    } catch (error) {
        console.error("Error calling Gemini API:", error?.message || error);
        throw error;
    }
}

module.exports = getGroqData;