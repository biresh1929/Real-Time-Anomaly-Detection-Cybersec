import pathway as pw
from datetime import datetime
from main import push_alert
from llm_service import explain_anomaly
import asyncio

class MetricEvent(pw.Schema):
    metric: str
    value: float
    timestamp: float  # epoch seconds

# Minimal CSV simulation; replace with Kafka for real data
metrics = pw.io.csv.read("backend/data/metrics.csv", schema=MetricEvent)

thresholds = {"CPU": 90, "Memory": 80}

def is_anomaly(row):
    return row.value > thresholds.get(row.metric, 100)

alerts_stream = metrics.filter(is_anomaly).select("metric", "value", "timestamp")

async def send_alert(row):
    explanation = await explain_anomaly(f"Metric={row.metric}, Value={row.value}")
    alert = {
        "metric": row.metric,
        "value": row.value,
        "timestamp": str(datetime.fromtimestamp(row.timestamp)),
        "explanation": explanation
    }
    await push_alert(alert)

alerts_stream.foreach(send_alert)

if __name__ == "__main__":
    pw.run()
