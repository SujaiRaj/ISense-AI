# ISense AI — Express Demo Server

A lightweight Express.js backend serving deterministic AI demo responses for the ISense AI frontend.
No real AI/ML. All matching is keyword-based and reproducible — purpose-built for video demo recording.

---

## Quick Start

```bash
cd server
npm install       # first time only
npm start         # production start
# or
npm run dev       # hot-reload via node --watch (Node 22+)
```

The server starts on **port 3001**.
The frontend (Vite) runs on port 5173.
CORS is enabled exclusively for `http://localhost:5173`.

---

## Endpoints

### `GET /health`
Returns server liveness status, version, and uptime in seconds.

```bash
curl http://localhost:3001/health
```

```json
{ "status": "ok", "version": "1.0.0", "uptime": 42 }
```

---

### `POST /api/recommendations`
**Body:** `{ "query": "<natural language product description>" }`

Scores every product by keyword overlap (multi-keyword scoring — the product with the MOST hits wins,
not the first match). Returns the primary IS recommendation + alternates in the README API shape.

**Response (matched):** HTTP 200 with full recommendation payload.
**Response (no match):** HTTP 200 with `{ "noMatch": true, "recommendations": [], "message": "..." }`.
**Response (missing query):** HTTP 400 with `{ "error": "MISSING_QUERY", "message": "..." }`.

Includes a random **1100–1900 ms** artificial delay to simulate AI processing.

---

### `POST /api/tender-analysis`
**Body:** `{ "fileName": "..." }` or `{ "text": "..." }` (either field accepted; content is ignored)

Always returns the Portland Cement gap scenario — 4 specification gaps with HIGH/MEDIUM/LOW severity,
a 4-step `progressLog` array for frontend animation, and the recommended IS standards list.

Includes the same random **1100–1900 ms** artificial delay.

---

## Guaranteed Match Queries (copy these exactly during recording)

These strings are sourced directly from `data/products.json` → `query_keywords` and are
**guaranteed to score ≥ 1 hit** and return a full recommendation response:

| # | Query String | Matched Product | Primary IS Number |
|---|---|---|---|
| 1 | `led street light` | LED Street Light | IS 10322 (Part 5/Sec 3): 2012 |
| 2 | `safety helmet` | Safety Helmet | IS 2925: 1984 (Reaffirmed 2020) |
| 3 | `portland cement` | Portland Cement | IS 8112: 2013 (Reaffirmed 2019) |
| 4 | `PVC cable` | PVC Cable | IS 694: 2010 (Reaffirmed 2019) |
| 5 | `safety shoes` | Safety Shoes | IS 15298 (Part 2): 2016 (Reaffirmed 2022) |

You can also use longer forms — scoring is best-match, not exact:

- `"90W outdoor LED street light for municipal roads"` → LED Street Light
- `"Industrial safety helmet for construction workers"` → Safety Helmet
- `"53 Grade OPC cement for bridge RCC concrete"` → Portland Cement
- `"PVC insulated electrical cable for building wiring"` → PVC Cable
- `"IS 15298 safety footwear for site workers"` → Safety Shoes

### Deliberate No-Match Queries
These return HTTP 200 with `"noMatch": true` (frontend renders graceful empty state):
- `"fire extinguisher"`
- `"railway sleeper"`
- `"drinking water pump"`

---

## Request Logging
Every request is logged to stdout:
```
[2026-09-23T15:30:01.234Z] POST /api/recommendations → 200 (1437ms)
[2026-09-23T15:30:05.891Z] GET /health → 200 (1ms)
```

---

## Data File
`data/products.json` — copy of `../backend/data/products.json`. The single source of truth for all
keyword matching, IS numbers, clause references, QCO gazette notifications, and certification details.
To update product data, edit `../backend/data/products.json` and re-copy.
