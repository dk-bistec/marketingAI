from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import subprocess
 
app = FastAPI()
 
class ContentRequest(BaseModel):
    parameter1: str
    parameter2: str
 
@app.post("/generate-content/")
async def generate_content(request: ContentRequest):
    try:
        # Call the Python script with the parameters
        result = subprocess.run(
            ["python", "content_generator.py", request.parameter1],
            capture_output=True,
            text=True,
            check=True
        )
        return {"content": result.stdout}
    except subprocess.CalledProcessError as e:
        raise HTTPException(status_code=500, detail=f"Script error: {e.stderr}")
 
# Run the FastAPI application
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

    # uvicorn main:app --reload