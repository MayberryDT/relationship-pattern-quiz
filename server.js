import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });


const GENERATION_CONFIG = {
    temperature: 0.7,
    topK: 40,
    topP: 0.95,
    maxOutputTokens: 8192,
};

app.post('/api/generate-report', async (req, res) => {
    try {
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({ error: "Prompt is required" });
        }

        const result = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            generationConfig: GENERATION_CONFIG
        });

        const response = await result.response;
        const text = response.text();

        // Clean markdown if present
        const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();

        try {
            const parsedData = JSON.parse(jsonStr);
            res.json(parsedData);
        } catch (e) {
            // If strictly JSON wasn't returned, try to return text but warn
            console.warn("Could not parse JSON, returning raw text text");
            res.json({ raw_text: text });
        }

    } catch (error) {
        console.error("Gemini Generation Error:", error);
        res.status(500).json({ error: "Report Generation Failed", details: error.message });
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Gemini Proxy Server running on http://localhost:${PORT}`));
