# ISense AI Server — Test Script
# Tests all 5 products, 1 no-match, and the tender endpoint
# Run from project root: powershell -File server/test_server.ps1

$BASE = "http://localhost:3001"
$HEADERS = @{ "Content-Type" = "application/json" }

function Test-Endpoint($label, $method, $url, $body) {
  Write-Host "`n===== $label =====" -ForegroundColor Cyan
  $start = Get-Date
  try {
    if ($method -eq "GET") {
      $r = Invoke-WebRequest -Uri $url -Method GET -UseBasicParsing
    } else {
      $bodyJson = $body | ConvertTo-Json
      $r = Invoke-WebRequest -Uri $url -Method POST -Body $bodyJson -ContentType "application/json" -UseBasicParsing
    }
    $elapsed = [int]((Get-Date) - $start).TotalMilliseconds
    $json = $r.Content | ConvertFrom-Json
    Write-Host "HTTP $($r.StatusCode) in ${elapsed}ms" -ForegroundColor Green

    if ($json.status) { Write-Host "  status:  $($json.status)" }
    if ($json.uptime -ne $null) { Write-Host "  uptime:  $($json.uptime)s" }
    if ($json.matchedProduct) { Write-Host "  matched: $($json.matchedProduct)" }
    if ($json.noMatch) { Write-Host "  noMatch: true -> $($json.message)" -ForegroundColor Yellow }
    if ($json.recommendations) {
      $top = $json.recommendations[0]
      Write-Host "  top rec: $($top.isNumber) [$($top.relevanceScore)%]"
      Write-Host "  cert:    $($top.certification.scheme) / $($top.certification.statusText)"
    }
    if ($json._debug) {
      Write-Host "  debug:   productId=$($json._debug.matchedProductId) hits=$($json._debug.keywordHitsCount)"
    }
    if ($json.data -and $json.data.gapSummary) {
      $g = $json.data.gapSummary
      Write-Host "  gaps:    total=$($g.total) high=$($g.high) medium=$($g.medium) low=$($g.low)"
      Write-Host "  progress: $($json.data.progressLog -join ' -> ')"
    }
  } catch {
    $elapsed = [int]((Get-Date) - $start).TotalMilliseconds
    Write-Host "HTTP $($_.Exception.Response.StatusCode.value__) in ${elapsed}ms" -ForegroundColor Red
    Write-Host "  ERROR: $($_.Exception.Message)"
    # Try to read body
    try {
      $stream = $_.Exception.Response.GetResponseStream()
      $reader = New-Object System.IO.StreamReader($stream)
      $errBody = $reader.ReadToEnd() | ConvertFrom-Json
      Write-Host "  body:  $($errBody.error) — $($errBody.message)" -ForegroundColor Yellow
    } catch {}
  }
}

# 1. Health
Test-Endpoint "GET /health" "GET" "$BASE/health" $null

# 2. LED Street Light
Test-Endpoint "POST /api/recommendations — LED Street Light" "POST" "$BASE/api/recommendations" @{ query = "led street light" }

# 3. Safety Helmet
Test-Endpoint "POST /api/recommendations — Safety Helmet" "POST" "$BASE/api/recommendations" @{ query = "safety helmet" }

# 4. Portland Cement
Test-Endpoint "POST /api/recommendations — Portland Cement" "POST" "$BASE/api/recommendations" @{ query = "portland cement" }

# 5. PVC Cable
Test-Endpoint "POST /api/recommendations — PVC Cable" "POST" "$BASE/api/recommendations" @{ query = "PVC cable" }

# 6. Safety Shoes
Test-Endpoint "POST /api/recommendations — Safety Shoes" "POST" "$BASE/api/recommendations" @{ query = "safety shoes" }

# 7. Deliberate no-match
Test-Endpoint "POST /api/recommendations — NO MATCH (fire extinguisher)" "POST" "$BASE/api/recommendations" @{ query = "fire extinguisher" }

# 8. Validation error — empty query
Test-Endpoint "POST /api/recommendations — VALIDATION ERROR (empty query)" "POST" "$BASE/api/recommendations" @{ query = "" }

# 9. Tender analysis
Test-Endpoint "POST /api/tender-analysis" "POST" "$BASE/api/tender-analysis" @{ fileName = "Cement_Procurement_Spec_2026.pdf" }

Write-Host "`n===== DONE =====" -ForegroundColor Green
