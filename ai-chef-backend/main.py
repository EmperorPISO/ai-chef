import os
import re
from openai import OpenAI
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

load_dotenv()

# Set up the OpenAI client to use Groq
client = OpenAI(
    base_url="https://api.groq.com/openai/v1", api_key=os.getenv("GROQ_API_KEY")
)

app = FastAPI()

# Allow frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://ai-chef-piso.vercel.app",
        "http://localhost:5173",
    ],
    allow_methods=["*"],
    allow_headers=["*"],
)


class RequestMessage(BaseModel):
    role: str
    content: str


class RecipeRequest(BaseModel):
    messages: list[RequestMessage]


@app.post("/api/")
async def generate_recipe(request: RecipeRequest):
    try:
        response = client.chat.completions.create(
            model="llama3-8b-8192",
            messages=[
                {
                    "role": "system",
                    "content": (
                        "Start with the recipe name in bold on its own line (e.g. **Spicy Chicken Rice Bowl**)."
                        "Ensure the title appears larger than the rest."
                        "Organize the output into clear sections with bolded headings (e.g. Ingredients, Instructions, Notes, etc)."
                        "Return the full response at once."
                    ),
                },
                *[msg.dict() for msg in request.messages],  # type: ignore
            ],
            temperature=0.7,
            max_tokens=1024,
        )

        recipe_markdown = response.choices[0].message.content

        # Extract recipe name from the first bolded markdown line
        name_match = re.search(r"\*\*(.*?)\*\*", recipe_markdown)  # type: ignore
        recipe_name = name_match.group(1) if name_match else "Unknown Recipe"

        return {
            "success": True,
            "data": {"recipe": recipe_markdown, "recipeName": recipe_name},
            "error": None,
        }

    except Exception as e:
        return {"success": False, "data": None, "error": str(e)}
