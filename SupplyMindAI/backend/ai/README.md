# backend/ai/

**Python AI/ML Microservices** — reserved for future implementation.

This directory will house standalone Python services that expose REST or gRPC endpoints
consumed by the Node.js API layer (`src/services/ai.service.ts`).

---

## Planned Services

| Service | Description |
|---------|-------------|
| `demand-forecast/` | Time-series demand forecasting (Prophet / ARIMA / LSTM) |
| `supplier-risk/` | Supplier risk scoring using ML models |
| `anomaly-detection/` | Spend & inventory anomaly detection |
| `nlp-assistant/` | LLM-powered procurement assistant (LangChain / LlamaIndex) |
| `ocr-processor/` | Invoice / PO document OCR and field extraction |
| `price-intelligence/` | Market price benchmarking and recommendations |

---

## Planned Tech Stack

```
Python 3.11+
FastAPI           – REST API framework
Pydantic v2       – Data validation
LangChain         – LLM orchestration
scikit-learn      – Classical ML models
PyTorch / TF      – Deep learning (forecasting)
Celery + Redis    – Async task queue
Docker            – Containerisation
```

---

## Communication Pattern

```
Next.js Frontend
      │
      ▼
Node.js API (Express)   ──── REST ────►  Python AI Service (FastAPI)
src/services/ai.service.ts              backend/ai/<service>/main.py
```

Node.js acts as a gateway — it authenticates requests, enforces rate limits,
and proxies to the appropriate Python microservice.

---

## Getting Started (future)

```bash
cd backend/ai/demand-forecast
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```
