# Implement Gemini API (Secure Proxy Pattern)

This skill guides you through adding Google Gemini API capabilities using a **Secure Backend Proxy**.
This prevents exposing your API key to the client browser.

## 🔑 AI Key Configuration

1.  **Create a `.env` file** in your project root.
2.  **Add your key** (do not commit this file):
    ```env
    GEMINI_API_KEY=AIzaSyBv6qil_nQekAEed0Eb3JWTx8MO2Bwk9iE
    ```

## 📦 Dependencies

Install the required backend packages:

```bash
npm install express cors dotenv @google/generative-ai
```

## 🛡️ Implementation Pattern (Node.js Proxy)

Create a `server.js` to handle API requests securely.

### `server.js`

```javascript
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static('.')); // Modify to serve your static files

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

app.post('/api/analyze', async (req, res) => {
    try {
        const { prompt, image, data } = req.body;
        let parts = [prompt];

        if (image) {
            // Expecting base64 string from client
            parts.push({ inlineData: { data: image, mimeType: "image/png" } });
        }

        const result = await model.generateContent(parts);
        const response = await result.response;
        const text = response.text();
        
        // Clean markdown if present
        const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
        res.json(JSON.parse(jsonStr));

    } catch (error) {
        console.error("Gemini Error:", error);
        res.status(500).json({ error: "Analysis Failed" });
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
```

### 🌐 Client-Side Usage

In your `index.html` or client script:

```javascript
async function callAI(prompt, imageBase64) {
    const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, image: imageBase64 })
    });
    return await response.json();
}
```
