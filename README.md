
# Real-Time Anomaly Detection (Sentinel AI Dashboard + Backend)

[![React](https://img.shields.io/badge/React-18-blue)](https://react.dev/)
[![FastAPI](https://img.shields.io/badge/FastAPI-Backend-green)](https://fastapi.tiangolo.com/)
[![License](https://img.shields.io/badge/License-MIT-green)](https://opensource.org/licenses/MIT)

---

## 📌 Project Overview

This project is a **real-time anomaly detection system** with two parts:

1. **Anomaly-Frontend (Sentinel AI Dashboard)** → A React-based UI dashboard for visualizing anomalies, outages, monitor health, and system status.
2. **Anomaly-Backend** → A Python/FastAPI-powered backend that handles anomaly detection, stores results in a database, and provides APIs for the frontend.

Together, they form a **cybersecurity monitoring tool** to detect anomalies, outages, and irregular patterns in real time.

---

## ✨ Key Features

### Frontend (Sentinel AI Dashboard)

* 📊 Interactive dashboard for **monitor status & anomaly visualization**
* 🔍 **Search and filter** monitors by keyword or status
* ⚠️ Visual status categories: **Up, Down, Critical, Trouble, Maintenance, Errors**
* 🕒 Auto-refresh with **last update tracking (30s refresh)**
* 🖥️ Sidebar navigation for dashboards, outages, logs, anomaly insights
* 🎛️ Extensible UI for anomaly detection integration

### Backend (FastAPI Service)

* 🚀 **FastAPI REST APIs** for anomaly, monitor, and outage data
* 🗄️ **SQLite/Postgres/NeonDB support** for data persistence
* 🤖 **ML anomaly detection pipeline** (scikit-learn / PyTorch placeholder)
* 📡 **WebSocket support** for real-time push updates (future scope)
* 🔐 CORS-enabled API for frontend integration

---

## 🛠️ Tech Stack

**Frontend:**

* React 18
* Vite (or Next.js optional setup)
* TailwindCSS / CSS modules
* Axios (API calls)

**Backend:**

* Python 3.10+
* FastAPI
* SQLAlchemy + SQLite/Postgres
* Uvicorn (ASGI server)
* Pydantic (data validation)

---

## 📂 Project Structure

```
real-time-anomaly-detection/
│── anomaly-frontend/         # React-based Sentinel AI Dashboard
│   ├── public/               # Static assets
│   ├── src/ or app/          # React/Next.js source files
│   │   ├── components/       # Reusable UI components
│   │   ├── App.js/tsx        # Main app component
│   │   └── index.css         # Global styles
│   └── package.json          # Frontend dependencies
│
│── anomaly-backend/          # FastAPI backend
│   ├── main.py               # FastAPI entrypoint
│   ├── db.py                 # Database setup
│   ├── models.py             # SQLAlchemy models
│   ├── routes/               # API routes (monitors, anomalies, outages)
│   ├── services/             # Business logic / ML pipeline
│   ├── requirements.txt      # Backend dependencies
│
│── README.md                 # Project documentation (this file)
│── LICENSE                   # MIT license
```

---

## 🚀 Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/real-time-anomaly-detection.git
cd real-time-anomaly-detection
```

---

### 2️⃣ Frontend Setup

```bash
cd anomaly-frontend
npm install
npm run dev
```

The React app will run on:
👉 [http://localhost:5173](http://localhost:5173)

---

### 3️⃣ Backend Setup

```bash
cd anomaly-backend
python -m venv venv
source venv/bin/activate   # (Linux/macOS)
venv\Scripts\activate      # (Windows)

pip install -r requirements.txt
uvicorn main:app --reload
```

The FastAPI backend will run on:
👉 [http://localhost:8000/docs](http://localhost:8000/docs) (interactive Swagger UI)

---

## 📡 API Endpoints (Backend)

| Method | Endpoint         | Description                       |
| ------ | ---------------- | --------------------------------- |
| GET    | `/api/monitors`  | Fetch all monitors with status    |
| GET    | `/api/anomalies` | Fetch detected anomalies          |
| GET    | `/api/outages`   | Fetch ongoing outages             |
| POST   | `/api/analyze`   | Run anomaly detection on new data |

Example response (`/api/monitors`):

```json
[
  { "id": 1, "name": "Server A", "status": "up", "last_updated": "2025-09-21T23:59:00Z" },
  { "id": 2, "name": "Server B", "status": "down", "last_updated": "2025-09-21T23:58:00Z" }
]
```

---

## 📊 Example Frontend Usage

```jsx
useEffect(() => {
  fetch("http://localhost:8000/api/monitors")
    .then((res) => res.json())
    .then((data) => setMonitors(data))
}, [])
```

---

## 🔮 Roadmap

* [ ] Add **real anomaly detection ML pipeline**
* [ ] Enable **WebSocket live updates**
* [ ] Add **user authentication** (JWT)
* [ ] Deploy with **Docker + Kubernetes**
* [ ] Multi-tenant support for enterprise

---

## 🤝 Contributing

Contributions are welcome!

* Fork the repo
* Create a new branch (`feature-xyz`)
* Commit changes and open a PR

---

## 📜 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file.

