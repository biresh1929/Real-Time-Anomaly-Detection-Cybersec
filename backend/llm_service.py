import httpx
import os
from dotenv import load_dotenv

load_dotenv()
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
GROQ_API_BASE = "https://api.groq.com/openai/v1"

async def explain_anomaly(text: str) -> str:
    headers = {"Authorization": f"Bearer {GROQ_API_KEY}"}
    payload = {
        "model": "llama3-8b-8192",
        "messages": [
            {"role": "system", "content": "You are an expert anomaly detection explainer."},
            {"role": "user", "content": f"Explain this anomaly: {text}"}
        ],
    }
    async with httpx.AsyncClient() as client:
        response = await client.post(f"{GROQ_API_BASE}/chat/completions", json=payload, headers=headers)
        data = response.json()
        return data["choices"][0]["message"]["content"]
