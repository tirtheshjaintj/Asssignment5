const getGroqData = require("../helpers/groq.helper");
const { getGeminiData } = require("../helpers/gemini.helper");

exports.summarize = async (req, res) => {
    try {
        const { prompt } = req.body;

        if (!prompt || prompt.trim() === "") {
            return res.status(400).json({ message: "No input text provided to summarize." });
        }

        const wrappedPrompt = `
Your response format MUST strictly follow this:

- First line: "Title: <relevant topic of the input>"
- Next lines: Bullet-point summary using hyphens (-)
- No intro or outro messages
- No markdown
- No asterisks (*)
- The title must reflect the topic clearly
- Only output title + formatted summary

Input content:
${prompt}

Return output now:
`;

        let summaryResponse = null;

        try {
            summaryResponse = await getGroqData(wrappedPrompt);
        } catch (groqError) {
            console.error("⚠️ Groq failed, switching to Gemini...");
            summaryResponse = null;
        }

        if (!summaryResponse || summaryResponse.trim() === "") {
            try {
                summaryResponse = await getGeminiData(wrappedPrompt);
            } catch (geminiError) {
                console.error("❌ Gemini also failed:", geminiError);
                return res.status(500).json({
                    status: false,
                    message: "Both Groq and Gemini failed. Try again later."
                });
            }
        }

        const raw = summaryResponse?.trim();

        const titleMatch = raw.match(/^\s*([^\n\r]+)\s*[\n\r]/);
        const title = titleMatch ? titleMatch[1].trim() : null;

        const summaryMatch = raw.match(/^[^\n\r]+\s*[\n\r]+([\s\S]+)/);
        const summary = summaryMatch ? summaryMatch[1].trim() : null;

        if (!title || !summary) {
            return res.status(500).json({
                status: false,
                message: "Failed to extract title or summary from AI output."
            });
        }

        return res.status(200).json({
            status: true,
            title,
            summary,
            message: "Summary generated successfully"
        });

    } catch (error) {
        console.error("Error in summarize:", error);
        return res.status(500).json({ message: "Unexpected server error." });
    }
};