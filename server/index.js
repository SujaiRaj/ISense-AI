/**
 * ISense AI — Express Demo Backend
 * ─────────────────────────────────
 * Routes:
 *   GET  /health                  — liveness probe
 *   POST /api/recommendations     — keyword-match → primary IS recommendation
 *   POST /api/tender-analysis     — cement gap scenario (fixed demo)
 *
 * Design notes:
 *  - No real AI/ML. All matching is deterministic keyword scoring so the demo
 *    is 100% reproducible and latency-free (aside from the artificial delay).
 *  - Artificial delay is random 1100–1900 ms so it looks natural on camera.
 *  - CORS is limited to http://localhost:5173 (Vite dev server).
 *  - Every request is logged with method, path, status, and response time.
 */

'use strict';

const express = require('express');
const cors    = require('cors');
const path    = require('path');
const fs      = require('fs');

// ─── Data ────────────────────────────────────────────────────────────────────

const PRODUCTS   = require('./data/products.json');
const NO_MATCH   = require('./data/no_match.json');
const START_TIME = Date.now();
const VERSION    = '1.0.0';

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Return a random integer in [min, max] (inclusive). */
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/** Async sleep for a random 1100–1900 ms to simulate AI processing. */
function simulateDelay() {
  return new Promise((resolve) => setTimeout(resolve, randInt(1100, 1900)));
}

/**
 * Score a product against a query using case-insensitive substring matching
 * across its query_keywords array. Returns the number of keyword hits, NOT
 * just whether any keyword matched — so we pick the product with the MOST
 * relevant keyword overlap rather than whichever appears first in the array.
 *
 * @param {string} query - raw user query string
 * @param {string[]} keywords - product's query_keywords array
 * @returns {number} hit count (0 = no match)
 */
function scoreProduct(query, keywords) {
  const lowerQuery = query.toLowerCase();
  return keywords.reduce((hits, kw) => {
    return lowerQuery.includes(kw.toLowerCase()) ? hits + 1 : hits;
  }, 0);
}

/**
 * Find the best matching product for a query.
 * @returns {{ product: object, hits: number } | null}
 */
function matchProduct(query) {
  let best = null;
  let bestHits = 0;

  for (const product of PRODUCTS) {
    const hits = scoreProduct(query, product.query_keywords);
    if (hits > bestHits) {
      bestHits = hits;
      best = product;
    }
  }

  return best && bestHits > 0 ? { product: best, hits: bestHits } : null;
}

/**
 * Shape a matched product into the API response format documented in the
 * ISense AI README "API Service Replacement Guide".
 */
function buildRecommendationResponse(query, product) {
  const pri = product.primary_recommendation;

  // Build the primary recommendation object
  const primaryRec = {
    id:             pri.isNumber.replace(/[\s():\/]/g, '-').toLowerCase(),
    isNumber:       pri.isNumber,
    title:          pri.title,
    relevanceScore: pri.relevanceScore,
    status:         pri.status,
    explanation:    pri.explanation,
    matchedFactors: product.key_clauses.slice(0, 3).map(
      (c) => `${c.clauseNumber}: ${c.description}`
    ),
    category:       product.productCategory,
    certification:  {
      isMandatory:    pri.certification.isMandatory,
      scheme:         pri.certification.scheme,
      schemeFullName: pri.certification.schemeFullName,
      notificationRef:pri.certification.notificationRef,
      statusText:     `${pri.certification.scheme} Certification — ${pri.certification.isMandatory ? 'Mandatory' : 'Optional'}`
    },
    qcoEnforcement: product.qco_enforcement,
    keyClauses:     product.key_clauses,
    scope:          `Applies to ${product.productName} in the ${product.productCategory} domain.`,
    procurementNotes: product.procurement_notes
  };

  // Alternate recommendations (lower scores)
  const alternateRecs = (product.alternate_recommendations || []).map((alt, idx) => ({
    id:             alt.isNumber.replace(/[\s():\/]/g, '-').toLowerCase(),
    isNumber:       alt.isNumber,
    title:          alt.title,
    relevanceScore: alt.relevanceScore,
    status:         'CURRENT',
    explanation:    alt.explanation,
    matchedFactors: [`Alternate IS specification — relevance ${alt.relevanceScore}%`],
    category:       product.productCategory,
    certification:  { isMandatory: false, statusText: 'Verify applicability against tender scope' }
  }));

  // Extracted requirements shown in the left inspector rail
  const extractedRequirements = [
    { key: 'Product Identified', value: product.productName,       status: 'MATCHED' },
    { key: 'Category',           value: product.productCategory,   status: 'MATCHED' },
    { key: 'Primary IS Number',  value: pri.isNumber,             status: 'MATCHED' },
    { key: 'Certification Scheme', value: pri.certification.scheme, status: pri.certification.isMandatory ? 'MATCHED' : 'REVIEW' },
    { key: 'QCO Enforcement',    value: product.qco_enforcement.isActive ? 'Active' : 'Not Applicable', status: product.qco_enforcement.isActive ? 'MATCHED' : 'REVIEW' }
  ];

  return {
    query,
    categoryIdentified: product.productCategory,
    extractedRequirements,
    recommendations:    [primaryRec, ...alternateRecs],
    matchedProduct:     product.productName,
    keywordHits:        undefined // stripped before sending; set in handler
  };
}

// ─── App ─────────────────────────────────────────────────────────────────────

const app = express();

// CORS — allow only the Vite dev server origin
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Accept']
}));

app.use(express.json({ limit: '2mb' }));

// ─── Request logger middleware ────────────────────────────────────────────────
app.use((req, _res, next) => {
  req._startAt = Date.now();
  next();
});

app.use((req, res, next) => {
  const originalEnd = res.end.bind(res);
  res.end = function (...args) {
    const elapsed = Date.now() - (req._startAt || Date.now());
    const qs = Object.keys(req.query).length
      ? '?' + new URLSearchParams(req.query).toString()
      : '';
    console.log(
      `[${new Date().toISOString()}] ${req.method} ${req.path}${qs} → ${res.statusCode} (${elapsed}ms)`
    );
    return originalEnd(...args);
  };
  next();
});

// ─── Routes ──────────────────────────────────────────────────────────────────

/**
 * GET /health
 * Liveness probe. Returns server status, version, and uptime in seconds.
 */
app.get('/health', (_req, res) => {
  res.json({
    status:  'ok',
    version: VERSION,
    uptime:  Math.floor((Date.now() - START_TIME) / 1000)
  });
});

/**
 * POST /api/recommendations
 * Body: { query: string }
 *
 * Scores every product by keyword-hit count and returns the best match.
 * Falls back to no_match.json (HTTP 200) when nothing scores > 0.
 * Returns 400 for missing/empty query.
 */
app.post('/api/recommendations', async (req, res) => {
  const { query } = req.body || {};

  // Input validation — fail fast, never silently
  if (!query || typeof query !== 'string' || query.trim().length === 0) {
    return res.status(400).json({
      error:   'MISSING_QUERY',
      message: 'Request body must include a non-empty "query" string. Example: { "query": "LED street light" }'
    });
  }

  const trimmedQuery = query.trim();

  // Artificial delay (1100–1900 ms) — random so it never looks fixed on camera
  await simulateDelay();

  const result = matchProduct(trimmedQuery);

  if (!result) {
    // No match → graceful empty state, NOT an error
    return res.status(200).json({
      ...NO_MATCH,
      query: trimmedQuery
    });
  }

  const { product, hits } = result;
  const payload = buildRecommendationResponse(trimmedQuery, product);

  // Attach debug metadata (stripped in production, visible in curl output)
  payload._debug = {
    matchedProductId: product.productId,
    matchedProductName: product.productName,
    keywordHitsCount: hits
  };

  return res.status(200).json(payload);
});

/**
 * POST /api/tender-analysis
 * Body: { fileName?: string, text?: string }  (either field accepted)
 *
 * Always returns the cement gap scenario (richest demo data) with a
 * 4-step progress log and realistic artificial delay.
 */
app.post('/api/tender-analysis', async (req, res) => {
  const { fileName, text } = req.body || {};
  const docName = fileName || (text ? 'Pasted_Specification.txt' : 'Demo_Cement_Tender_2026.pdf');

  // Artificial delay
  await simulateDelay();

  // Fixed demo product — Portland Cement (richest gap scenario)
  const cement = PRODUCTS.find((p) => p.productId === 'P003');
  const pri    = cement.primary_recommendation;

  const progressLog = [
    'Extracting specifications from document',
    'Cross-referencing BIS database (1,250+ standards)',
    'Checking QCO mandates and gazette notifications',
    'Compiling gap report and amendment status'
  ];

  const specificationGaps = [
    {
      id:             'gap-1',
      type:           'WARNING',
      severity:       'HIGH',
      title:          'Primary IS Number Reference Missing',
      description:    `Tender clause 3.1 specifies cement grade but omits the mandatory IS number. Applicable standard: ${pri.isNumber} — ${pri.title}. Without this reference, non-compliant grades (e.g., IS 269: 33-grade) remain eligible.`,
      recommendation: `Insert in Clause 3.1: "Ordinary Portland Cement shall conform to ${pri.isNumber} (OPC 43-grade, minimum 28-day compressive strength: 43 N/mm²)."`
    },
    {
      id:             'gap-2',
      type:           'WARNING',
      severity:       'HIGH',
      title:          'QCO Compliance Statement Absent',
      description:    `The Cement (Quality Control) Order, 2003 (${cement.qco_enforcement.orderRef}) mandates ISI marking on all cement. Tender does not include a mandatory ISI licence verification clause, creating procurement risk.`,
      recommendation: 'Add to Clause 5 (Vendor Eligibility): "Vendor must furnish a valid BIS ISI Licence Number (Scheme-I) printed on bags/delivery challans. Licence validity to be verified on www.bis.gov.in prior to issue of LOA."'
    },
    {
      id:             'gap-3',
      type:           'WARNING',
      severity:       'MEDIUM',
      title:          'Shelf-Life and Batch Testing Clause Missing',
      description:    'Tender accepts cement delivery without specifying maximum age from packing date. Industry best practice (and CPWD specifications) reject cement older than 90 days from pack date.',
      recommendation: 'Insert in Clause 6 (Acceptance Criteria): "Cement shall not be older than 90 days from date of manufacture/packing on date of delivery. Minimum 1 sample per 200 MT to be submitted to NABL-accredited third-party laboratory."'
    },
    {
      id:             'gap-4',
      type:           'INFO',
      severity:       'LOW',
      title:          'Setting Time Verification Test Not Specified',
      description:    `IS 8112 Cl. 5.3 requires initial setting time ≥ 30 min and final ≤ 600 min. Tender specifies only compressive strength; omission of setting-time test allows potentially unusable cement to pass incoming inspection.`,
      recommendation: 'Append to Clause 6.2 (Lab Tests): "Setting time shall be verified per IS 4031 (Part 5). Initial ≥ 30 min; Final ≤ 600 min."'
    }
  ];

  const extractedRequirements = [
    { label: 'Material Type',       value: 'Ordinary Portland Cement',  present: true  },
    { label: 'Grade Specified',     value: '43-Grade (partial)',         present: true  },
    { label: 'IS Number Cited',     value: 'None',                      present: false },
    { label: 'ISI Mark Clause',     value: 'Not Present',               present: false },
    { label: 'Shelf-Life Clause',   value: 'Not Present',               present: false },
    { label: 'Compressive Strength',value: '43 N/mm² (28-day)',         present: true  }
  ];

  return res.status(200).json({
    success: true,
    data: {
      documentName: docName,
      documentSize: '1.8 MB',
      pageCount:    12,
      processedDate: new Date().toISOString(),
      progressLog,
      extractedProduct:       'Ordinary Portland Cement (OPC 43-Grade)',
      primaryStandard:        pri.isNumber,
      primaryStandardTitle:   pri.title,
      detectedRequirements:   extractedRequirements,
      specificationGaps,
      gapSummary: {
        total:    specificationGaps.length,
        high:     specificationGaps.filter(g => g.severity === 'HIGH').length,
        medium:   specificationGaps.filter(g => g.severity === 'MEDIUM').length,
        low:      specificationGaps.filter(g => g.severity === 'LOW').length
      },
      recommendedStandards: [
        { isNumber: pri.isNumber, title: pri.title, relevanceScore: pri.relevanceScore, status: 'CURRENT' },
        ...cement.alternate_recommendations.map(a => ({
          isNumber: a.isNumber, title: a.title, relevanceScore: a.relevanceScore, status: 'CURRENT'
        }))
      ]
    }
  });
});

// ─── 404 catch-all ───────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    error:   'NOT_FOUND',
    message: `No route found for ${req.method} ${req.path}`
  });
});

// ─── Global error handler ────────────────────────────────────────────────────
app.use((err, _req, res, _next) => {
  console.error('[ISense Server Error]', err);
  res.status(500).json({
    error:   'INTERNAL_ERROR',
    message: 'An unexpected server error occurred. Check server logs.'
  });
});

// ─── Start ────────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`\n┌──────────────────────────────────────────────────┐`);
  console.log(`│  ISense AI Express Server v${VERSION}                │`);
  console.log(`│  Listening on  http://localhost:${PORT}              │`);
  console.log(`│  CORS allowed: http://localhost:5173             │`);
  console.log(`│  Products loaded: ${PRODUCTS.length} demo products              │`);
  console.log(`└──────────────────────────────────────────────────┘\n`);
});
