from fastapi import FastAPI
from routes.auth import router
from routes.complaints import router as complaint_router

app = FastAPI()

app.include_router(router)
app.include_router(complaint_router)

@app.get("/")
def home():
    return {"message": "GovConnect Backend Running"}