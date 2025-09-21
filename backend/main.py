from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from db import SessionLocal, anomalies
from llm_service import explain_anomaly
from datetime import datetime
import json

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

clients = []

@app.post("/ingest")
async def ingest(metric: str, value: float):
    explanation = await explain_anomaly(f"Metric={metric}, Value={value}")
    db = SessionLocal()
    db.execute(
        anomalies.insert().values(
            timestamp=str(datetime.now()),
            metric=metric,
            value=value,
            explanation=explanation
        )
    )
    db.commit()

    alert = {
        "metric": metric,
        "value": value,
        "timestamp": str(datetime.now()),
        "explanation": explanation
    }

    await push_alert(alert)
    return {"status": "stored", "explanation": explanation}

@app.get("/anomalies")
def get_anomalies():
    db = SessionLocal()
    result = db.execute(anomalies.select()).fetchall()
    return [dict(row._mapping) for row in result]

@app.websocket("/ws/alerts")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    clients.append(websocket)
    try:
        while True:
            await websocket.receive_text()
    except WebSocketDisconnect:
        clients.remove(websocket)

async def push_alert(alert: dict):
    dead_clients = []
    for client in clients:
        try:
            await client.send_text(json.dumps(alert))
        except:
            dead_clients.append(client)
    for dc in dead_clients:
        clients.remove(dc)
