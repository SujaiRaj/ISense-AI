/**
 * Curated Indian Standards Dataset (BIS Data Repository)
 * Contains 50 realistic, high-quality Indian Standards across 5 core procurement domains:
 * 1. Lighting / LED
 * 2. Electrical & Power Cables
 * 3. Safety / PPE
 * 4. Cement & Construction Materials
 * 5. Water Supply, Pipes & Plumbing
 */

export const MOCK_STANDARDS = [
  // ==========================================
  // 1. LIGHTING & LED (10 Standards)
  // ==========================================
  {
    id: "is-10322-p5-s3",
    isNumber: "IS 10322 (Part 5/Sec 3): 2024",
    title: "Luminaires - Particular Requirements - Luminaires for Road and Street Lighting",
    category: "Lighting",
    productCategory: "LED Street Light",
    publicationYear: 2024,
    status: "CURRENT",
    relevanceScore: 96,
    explanation: "Directly matches outdoor LED street light specifications. Defines photometric performance, IP66 ingress protection, thermal management, and surge protection (10kV) required for municipal roadway illumination.",
    scope: "Covers specific safety and performance requirements for luminaires intended for use on public roads, highways, and street illumination systems powered by electrical supplies up to 1000V.",
    keyRequirements: [
      "Minimum Luminaire Efficacy: 120 lm/W",
      "Ingress Protection Rating: IP66 minimum",
      "Surge Protection Capability: 10 kV minimum",
      "Operating Temperature Range: -10°C to +50°C",
      "Power Factor: ≥ 0.95 at rated load",
      "Total Harmonic Distortion (THD): < 10%"
    ],
    amendments: [
      { amendmentNo: "Amendment 1", date: "March 2024", description: "Mandate for integrated smart control interface (NEMA/Zhaga 7-pin socket)." }
    ],
    versionHistory: [
      { year: 2024, status: "CURRENT", notes: "Latest revision incorporating smart driver benchmarks." },
      { year: 2017, status: "SUPERSEDED", notes: "Replaced by 2024 edition." }
    ],
    relatedStandards: [
      { id: "is-16102-p1", isNumber: "IS 16102 (Part 1): 2023", title: "Self-Ballasted LED Lamps - Safety Requirements", relation: "Safety Standard" },
      { id: "is-15885-p2-s13", isNumber: "IS 15885 (Part 2/Sec 13): 2020", title: "Controlgear for LED Modules", relation: "Component Standard" }
    ],
    certification: {
      isMandatory: true,
      qcoApplicable: true,
      qcoName: "Solar & LED Lighting Quality Control Order, 2023",
      bisScheme: "Scheme-I (ISI Mark)",
      statusText: "Mandatory Certification Required under Ministry of Power Notification"
    }
  },
  {
    id: "is-16102-p1",
    isNumber: "IS 16102 (Part 1): 2023",
    title: "Self-Ballasted LED Lamps for General Lighting Services - Safety Requirements",
    category: "Lighting",
    productCategory: "LED Lighting",
    publicationYear: 2023,
    status: "CURRENT",
    relevanceScore: 89,
    explanation: "Applies to electrical safety, insulation resistance, fault condition testing, and fire hazard protection for LED lighting modules incorporated in procurement specifications.",
    scope: "Specifies the safety and interchangeability requirements, together with test methods for self-ballasted LED lamps for general lighting.",
    keyRequirements: [
      "Marking & Labelling compliance",
      "Insulation Resistance & Electric Strength",
      "Mechanical Strength & Cap Temperature Limit",
      "Resistance to Heat and Flame (Glow-wire test at 650°C)"
    ],
    versionHistory: [
      { year: 2023, status: "CURRENT", notes: "Second revision." },
      { year: 2012, status: "SUPERSEDED", notes: "First revision." }
    ],
    relatedStandards: [
      { id: "is-10322-p5-s3", isNumber: "IS 10322 (Part 5/Sec 3): 2024", title: "Luminaires for Road and Street Lighting", relation: "Parent System Standard" }
    ],
    certification: {
      isMandatory: true,
      qcoApplicable: true,
      qcoName: "Compulsory Registration Scheme (CRS) Phase-I",
      bisScheme: "CRS Registration",
      statusText: "CRS Certification Mandatory for Indian Manufacturers & Importers"
    }
  },
  {
    id: "is-16102-p2",
    isNumber: "IS 16102 (Part 2): 2023",
    title: "Self-Ballasted LED Lamps for General Lighting Services - Performance Requirements",
    category: "Lighting",
    productCategory: "LED Lighting",
    publicationYear: 2023,
    status: "CURRENT",
    relevanceScore: 85,
    explanation: "Specifies performance criteria including lumen maintenance, rated wattage tolerance, efficacy, and color rendering index for LED light sources.",
    scope: "Defines photometric performance, lumen maintenance at 6000 hours, and life testing protocols for indoor and outdoor LED lighting lamps.",
    keyRequirements: [
      "Lumen Maintenance: ≥ 90% at 2000 hours, ≥ 80% at 6000 hours",
      "Color Rendering Index (CRI): Ra ≥ 80",
      "Rated Wattage Tolerance: ± 10%",
      "Power Factor: ≥ 0.90 for > 5W rating"
    ],
    versionHistory: [
      { year: 2023, status: "CURRENT", notes: "Updated performance benchmarks." }
    ],
    relatedStandards: [
      { id: "is-16102-p1", isNumber: "IS 16102 (Part 1): 2023", title: "Self-Ballasted LED Lamps - Safety", relation: "Safety Companion" }
    ],
    certification: {
      isMandatory: true,
      qcoApplicable: true,
      qcoName: "BEE Star Labeling Scheme for LED Lamps",
      bisScheme: "BEE Star Rating",
      statusText: "BEE Mandatory Star Labeling (3 Star minimum for public tenders)"
    }
  },
  {
    id: "is-15885-p2-s13",
    isNumber: "IS 15885 (Part 2/Sec 13): 2020",
    title: "Lamp Controlgear - Particular Requirements for D.C. or A.C. Supplied Electronic Controlgear for LED Modules",
    category: "Lighting",
    productCategory: "LED Driver",
    publicationYear: 2020,
    status: "CURRENT",
    relevanceScore: 88,
    explanation: "Mandatory standard for LED drivers powering outdoor street lights, floodlights, and industrial luminaires.",
    scope: "Covers safety and performance requirements for electronic drivers supplying constant current or constant voltage to LED modules.",
    keyRequirements: [
      "Output Current Tolerance: ± 5%",
      "Over-voltage & Short Circuit Protection",
      "Thermal Shutdown Threshold: 85°C",
      "Surge Immunity: 4kV Differential Mode, 10kV Common Mode"
    ],
    versionHistory: [
      { year: 2020, status: "CURRENT", notes: "Aligned with IEC 61347-2-13." }
    ],
    relatedStandards: [
      { id: "is-10322-p5-s3", isNumber: "IS 10322 (Part 5/Sec 3): 2024", title: "Road & Street Lighting", relation: "System Component" }
    ],
    certification: {
      isMandatory: true,
      qcoApplicable: true,
      qcoName: "Electronics & IT Goods QCO Order, 2021",
      bisScheme: "CRS Registration",
      statusText: "Mandatory CRS Registration Required"
    }
  },
  {
    id: "is-16103-p1",
    isNumber: "IS 16103 (Part 1): 2022",
    title: "Led Modules for General Lighting - Safety Specifications",
    category: "Lighting",
    productCategory: "LED Modules",
    publicationYear: 2022,
    status: "CURRENT",
    relevanceScore: 82,
    explanation: "Defines safety standards for built-in or independent LED modules used inside street light fixtures.",
    scope: "Specifies safety requirements for LED modules operating under constant current or constant voltage supply.",
    keyRequirements: [
      "Creepage Distance & Clearance Limits",
      "Protection against accidental contact with live parts",
      "Heat & Fire Resistance of printed circuit board substrate"
    ],
    versionHistory: [{ year: 2022, status: "CURRENT", notes: "First edition." }],
    relatedStandards: [],
    certification: { isMandatory: true, qcoApplicable: true, qcoName: "CRS Registration", bisScheme: "CRS", statusText: "Mandatory BIS CRS Registration" }
  },
  {
    id: "is-16106",
    isNumber: "IS 16106: 2021",
    title: "Method of Electrical and Photometric Measurements of Solid-State Lighting Products",
    category: "Lighting",
    productCategory: "LED Testing",
    publicationYear: 2021,
    status: "CURRENT",
    relevanceScore: 80,
    explanation: "Provides standard test procedures for goniophotometer measurement of street light lux distribution curves.",
    scope: "Covers procedures for reproducible measurements of total luminous flux, electrical power, luminous efficacy, and chromaticity.",
    keyRequirements: [
      "Integrating Sphere & Goniophotometer Calibration",
      "Ambient Temperature Control at 25°C ± 1°C",
      "Pre-conditioning & Stabilization period (45 minutes minimum)"
    ],
    versionHistory: [{ year: 2021, status: "CURRENT", notes: "Updated method." }],
    relatedStandards: [],
    certification: { isMandatory: false, qcoApplicable: false, qcoName: "NABL Accredited Testing", bisScheme: "NABL Protocol", statusText: "Standard Test Method" }
  },
  {
    id: "is-16107-p2-s1",
    isNumber: "IS 16107 (Part 2/Sec 1): 2021",
    title: "Luminaires Performance - Particular Requirements - LED Luminaires",
    category: "Lighting",
    productCategory: "LED Street Light",
    publicationYear: 2021,
    status: "CURRENT",
    relevanceScore: 87,
    explanation: "Establishes long-term performance criteria for outdoor LED luminaires installed in municipal infrastructure.",
    scope: "Defines lumen output degradation benchmarks, operational life ratings (50,000 hours L70), and power driver efficiency.",
    keyRequirements: [
      "Rated Life L70: Minimum 50,000 burning hours",
      "Efficacy Class A+: ≥ 120 lm/W",
      "Color Consistency: Within 5-step MacAdam ellipse"
    ],
    versionHistory: [{ year: 2021, status: "CURRENT", notes: "Aligned with IEC 62722." }],
    relatedStandards: [{ id: "is-10322-p5-s3", isNumber: "IS 10322 (Part 5/Sec 3): 2024", title: "Street Lighting Safety", relation: "Companion Standard" }],
    certification: { isMandatory: true, qcoApplicable: true, qcoName: "Energy Conservation Building Code (ECBC)", bisScheme: "ISI Mark", statusText: "Mandatory Compliance" }
  },
  {
    id: "is-16108",
    isNumber: "IS 16108: 2021",
    title: "Photobiological Safety of Lamps and Lamp Systems",
    category: "Lighting",
    productCategory: "LED Safety",
    publicationYear: 2021,
    status: "CURRENT",
    relevanceScore: 78,
    explanation: "Evaluates blue light hazard and optical radiation safety for high-wattage street lights and floodlights.",
    scope: "Specifies exposure limits and test methods for photobiological hazards including blue light retinal harm.",
    keyRequirements: [
      "Risk Group 1 (Low Risk) or Exempt Group compliance",
      "Retinal Blue Light Hazard Exposure Limit (< 100 W/m²·sr)"
    ],
    versionHistory: [{ year: 2021, status: "CURRENT", notes: "First edition." }],
    relatedStandards: [],
    certification: { isMandatory: false, qcoApplicable: false, qcoName: "Safety Evaluation", bisScheme: "Test Method", statusText: "Mandatory Safety Test" }
  },
  {
    id: "is-2418",
    isNumber: "IS 2418: 2018",
    title: "Tubular Fluorescent Lamps for General Lighting Service",
    category: "Lighting",
    productCategory: "Conventional Lighting",
    publicationYear: 2018,
    status: "SUPERSEDED",
    relevanceScore: 60,
    explanation: "Legacy standard for fluorescent tube lights, now largely superseded by LED specifications in public tenders.",
    scope: "Covers dimensional and electrical characteristics of linear fluorescent lamps.",
    keyRequirements: ["Efficacy > 65 lm/W", "Cap G13 dimensions"],
    versionHistory: [{ year: 2018, status: "SUPERSEDED", notes: "Phase out underway in favor of LED." }],
    relatedStandards: [],
    certification: { isMandatory: false, qcoApplicable: false, qcoName: "Legacy Standard", bisScheme: "Scheme-I", statusText: "Phase-Out Status" }
  },
  {
    id: "is-9900",
    isNumber: "IS 9900: 2019",
    title: "High Pressure Sodium Vapour Lamps - Specification",
    category: "Lighting",
    productCategory: "HPSV Lamps",
    publicationYear: 2019,
    status: "SUPERSEDED",
    relevanceScore: 58,
    explanation: "Historical standard for sodium vapor street lamps; referenced only for replacement of legacy fixtures.",
    scope: "Covers high pressure sodium lamps operating on AC supply with ballasts.",
    keyRequirements: ["Rated wattage 70W, 150W, 250W, 400W", "Efficacy 80-110 lm/W"],
    versionHistory: [{ year: 2019, status: "SUPERSEDED", notes: "Superseded by LED street lighting mandates." }],
    relatedStandards: [],
    certification: { isMandatory: false, qcoApplicable: false, qcoName: "Legacy", bisScheme: "ISI", statusText: "Legacy Fixture Standard" }
  },

  // ==========================================
  // 2. ELECTRICAL & POWER CABLES (10 Standards)
  // ==========================================
  {
    id: "is-694",
    isNumber: "IS 694: 2022",
    title: "Polyvinyl Chloride (PVC) Insulated Cables for Working Voltages Up to and Including 1100 V",
    category: "Electrical",
    productCategory: "PVC Cable",
    publicationYear: 2022,
    status: "CURRENT",
    relevanceScore: 94,
    explanation: "Covers single-core and multi-core PVC insulated copper/aluminum electrical wires for internal wiring, street light pole distribution, and equipment power feeds.",
    scope: "Covers requirements for PVC insulated flexible & rigid conductor cables for electricity supply up to 1100V AC.",
    keyRequirements: [
      "Conductor Resistance: As per IS 8130 class 1, 2 or 5",
      "Insulation Resistance: Minimum 10 MΩ·km at 70°C",
      "High Voltage Test: 3.0 kV AC for 5 minutes",
      "Flame Retardance Test (Category FR / FRLSH)"
    ],
    versionHistory: [
      { year: 2022, status: "CURRENT", notes: "Includes FRLS-H specifications." },
      { year: 2010, status: "SUPERSEDED", notes: "Fourth revision." }
    ],
    relatedStandards: [
      { id: "is-7098-p1", isNumber: "IS 7098 (Part 1): 2022", title: "Crosslinked Polyethylene (XLPE) Insulated Cables", relation: "Heavy Duty Alternative" }
    ],
    certification: {
      isMandatory: true,
      qcoApplicable: true,
      qcoName: "Electrical Wires & Cables Quality Control Order, 2023",
      bisScheme: "Scheme-I (ISI Mark)",
      statusText: "Mandatory ISI Marking Required"
    }
  },
  {
    id: "is-1554-p1",
    isNumber: "IS 1554 (Part 1): 2021",
    title: "PVC Insulated (Heavy Duty) Electric Cables - Working Voltages Up to 1100 V",
    category: "Electrical",
    productCategory: "Power Cable",
    publicationYear: 2021,
    status: "CURRENT",
    relevanceScore: 92,
    explanation: "Governs armored and unarmored heavy-duty underground power distribution cables for municipal feeders and industrial substations.",
    scope: "Covers requirements of armoring, inner sheath, outer sheath, and conductor parameters for heavy duty low voltage power distribution.",
    keyRequirements: [
      "Galvanized Steel Wire / Strip Armoring",
      "Conductor Material: High Conductivity Aluminum / Copper",
      "Thermal Short Circuit Rating: 160°C maximum for PVC"
    ],
    versionHistory: [{ year: 2021, status: "CURRENT", notes: "Revised armoring specifications." }],
    relatedStandards: [{ id: "is-7098-p1", isNumber: "IS 7098 (Part 1): 2022", title: "XLPE Power Cables", relation: "Modern Upgrade" }],
    certification: { isMandatory: true, qcoApplicable: true, qcoName: "Cables Quality Control Order", bisScheme: "ISI Mark", statusText: "Mandatory ISI Mark" }
  },
  {
    id: "is-7098-p1",
    isNumber: "IS 7098 (Part 1): 2022",
    title: "Crosslinked Polyethylene (XLPE) Insulated PVC Sheathed Cables - Working Voltage Up to 1100 V",
    category: "Electrical",
    productCategory: "XLPE Cable",
    publicationYear: 2022,
    status: "CURRENT",
    relevanceScore: 95,
    explanation: "High-performance XLPE insulated underground cable standard offering higher current carrying capacity and thermal overload rating (90°C).",
    scope: "Covers specifications for armored XLPE power cables suitable for direct burial in soil or cable trenches.",
    keyRequirements: [
      "Continuous Conductor Operating Temp: 90°C",
      "Short Circuit Conductor Temp Limit: 250°C",
      "Water Absorption & Moisture Barrier Compliance"
    ],
    versionHistory: [{ year: 2022, status: "CURRENT", notes: "Revised testing standards." }],
    relatedStandards: [{ id: "is-1554-p1", isNumber: "IS 1554 (Part 1): 2021", title: "PVC Power Cables", relation: "Legacy Alternative" }],
    certification: { isMandatory: true, qcoApplicable: true, qcoName: "Cables QCO 2023", bisScheme: "ISI Mark", statusText: "Mandatory ISI Mark" }
  },
  {
    id: "is-7098-p2",
    isNumber: "IS 7098 (Part 2): 2021",
    title: "Crosslinked Polyethylene Insulated PVC Sheathed Cables - Working Voltage 3.3 kV Up to 33 kV",
    category: "Electrical",
    productCategory: "Medium Voltage Cable",
    publicationYear: 2021,
    status: "CURRENT",
    relevanceScore: 90,
    explanation: "Governs medium-voltage HT power distribution cables for city power grids and heavy industrial complexes.",
    scope: "Covers requirements for 11kV, 22kV, and 33kV XLPE insulated, semi-conducting screened cables.",
    keyRequirements: ["Partial Discharge Level: < 5 pC at 1.73 Uo", "Impulse Voltage Withstand Test (75kV for 11kV cable)"],
    versionHistory: [{ year: 2021, status: "CURRENT", notes: "Updated screening thickness." }],
    relatedStandards: [],
    certification: { isMandatory: true, qcoApplicable: true, qcoName: "Cables QCO", bisScheme: "ISI Mark", statusText: "Mandatory ISI Mark" }
  },
  {
    id: "is-398-p2",
    isNumber: "IS 398 (Part 2): 2019",
    title: "Aluminum Conductors for Overhead Transmission Purposes - Aluminum Conductors, Galvanized Steel-Reinforced (ACSR)",
    category: "Electrical",
    productCategory: "Overhead Conductor",
    publicationYear: 2019,
    status: "CURRENT",
    relevanceScore: 86,
    explanation: "Standard for ACSR conductors (Weasel, Rabbit, Dog, Panther) used in rural and urban overhead power lines.",
    scope: "Covers physical properties, breaking load, and DC resistance of stranded aluminum steel reinforced conductors.",
    keyRequirements: ["Zinc Coating Mass on Steel Core Wire", "Tensile Strength & Breaking Load Limit"],
    versionHistory: [{ year: 2019, status: "CURRENT", notes: "Fourth revision." }],
    relatedStandards: [],
    certification: { isMandatory: true, qcoApplicable: true, qcoName: "Electrical Conductors QCO", bisScheme: "ISI Mark", statusText: "Mandatory ISI Mark" }
  },
  {
    id: "is-1293",
    isNumber: "IS 1293: 2019",
    title: "Plugs and Socket-Outlets of Rated Voltage Up to and Including 250 Volts and Rated Current Up to 16 Amperes",
    category: "Electrical",
    productCategory: "Plugs & Sockets",
    publicationYear: 2019,
    status: "CURRENT",
    relevanceScore: 84,
    explanation: "Mandatory safety standard for 6A and 16A electrical plugs, sockets, and power distribution boards.",
    scope: "Specifies dimensions, shutter safety, temperature rise, and electrical endurance of plugs and sockets.",
    keyRequirements: ["Safety Shutter Mandate on 3-pin sockets", "Temperature Rise Limit: ≤ 45K"],
    versionHistory: [{ year: 2019, status: "CURRENT", notes: "Mandated safety shutters." }],
    relatedStandards: [],
    certification: { isMandatory: true, qcoApplicable: true, qcoName: "Plugs & Sockets QCO 2021", bisScheme: "ISI Mark", statusText: "Mandatory ISI Mark" }
  },
  {
    id: "is-8828",
    isNumber: "IS 8828: 2018",
    title: "Electrical Accessories - Circuit-Breakers for Overcurrent Protection for Household and Similar Installations (MCB)",
    category: "Electrical",
    productCategory: "Circuit Breaker",
    publicationYear: 2018,
    status: "CURRENT",
    relevanceScore: 91,
    explanation: "Governs Miniature Circuit Breakers (MCBs) installed in street lighting distribution boxes and building feeder panels.",
    scope: "Covers AC air-break circuit breakers rated up to 125A with short circuit capacity up to 10kA.",
    keyRequirements: ["Short Circuit Breaking Capacity: 10 kA minimum", "Tripping Characteristics B, C, D Curve"],
    versionHistory: [{ year: 2018, status: "CURRENT", notes: "Aligned with IEC 60898-1." }],
    relatedStandards: [],
    certification: { isMandatory: true, qcoApplicable: true, qcoName: "Low Voltage Switchgear QCO", bisScheme: "ISI Mark", statusText: "Mandatory ISI Mark" }
  },
  {
    id: "is-13947-p2",
    isNumber: "IS 13947 (Part 2): 2020",
    title: "Low-Voltage Switchgear and Controlgear - Part 2: Circuit Breakers (MCCB / ACB)",
    category: "Electrical",
    productCategory: "MCCB / ACB",
    publicationYear: 2020,
    status: "CURRENT",
    relevanceScore: 88,
    explanation: "Covers Molded Case Circuit Breakers (MCCB) and Air Circuit Breakers (ACB) for heavy municipal sub-distribution.",
    scope: "Specifies requirements for breakers intended for industrial circuit over-current and short-circuit protection.",
    keyRequirements: ["Rated Ultimate Short-Circuit Breaking Capacity (Icu)", "Dielectric Withstand Voltage"],
    versionHistory: [{ year: 2020, status: "CURRENT", notes: "Second revision." }],
    relatedStandards: [],
    certification: { isMandatory: true, qcoApplicable: true, qcoName: "Switchgear QCO", bisScheme: "ISI Mark", statusText: "Mandatory Certification" }
  },
  {
    id: "is-2026-p1",
    isNumber: "IS 2026 (Part 1): 2021",
    title: "Power Transformers - Part 1: General",
    category: "Electrical",
    productCategory: "Transformer",
    publicationYear: 2021,
    status: "CURRENT",
    relevanceScore: 87,
    explanation: "Standard for power and distribution transformers supplying electricity to municipal grids and infrastructure projects.",
    scope: "Covers rating definitions, temperature rise limits, insulation levels, and loss evaluation.",
    keyRequirements: ["Winding Temperature Rise Limit: 55°C", "No-load & Full-load Loss Limits"],
    versionHistory: [{ year: 2021, status: "CURRENT", notes: "Updated loss limits." }],
    relatedStandards: [{ id: "is-1180-p1", isNumber: "IS 1180 (Part 1): 2021", title: "Distribution Transformers", relation: "Sub-category Standard" }],
    certification: { isMandatory: true, qcoApplicable: true, qcoName: "Transformers QCO", bisScheme: "ISI Mark", statusText: "Mandatory ISI Mark" }
  },
  {
    id: "is-1180-p1",
    isNumber: "IS 1180 (Part 1): 2021",
    title: "Outdoor Type Oil Immersed Distribution Transformers Up to 2500 kVA, 33 kV - Specification",
    category: "Electrical",
    productCategory: "Distribution Transformer",
    publicationYear: 2021,
    status: "CURRENT",
    relevanceScore: 93,
    explanation: "Essential mandate for energy-efficient pole-mounted distribution transformers across state DISCOMs.",
    scope: "Specifies energy efficiency levels (Level 1, Level 2, Level 3 star ratings) and structural design of distribution transformers.",
    keyRequirements: ["BEE Energy Efficiency Star Rating Level 3", "Hermetically Sealed Tank option"],
    versionHistory: [{ year: 2021, status: "CURRENT", notes: "Third revision." }],
    relatedStandards: [],
    certification: { isMandatory: true, qcoApplicable: true, qcoName: "Distribution Transformers QCO 2021", bisScheme: "ISI Mark", statusText: "Mandatory ISI Mark" }
  },

  // ==========================================
  // 3. SAFETY & PPE (10 Standards)
  // ==========================================
  {
    id: "is-2925",
    isNumber: "IS 2925: 2023",
    title: "Specification for Industrial Safety Helmets",
    category: "Safety/PPE",
    productCategory: "Safety Helmet",
    publicationYear: 2023,
    status: "CURRENT",
    relevanceScore: 95,
    explanation: "Primary mandatory standard for personal protective equipment (PPE) safety helmets used in construction sites, heavy engineering, and municipal field works.",
    scope: "Covers physical and performance requirements, methods of test, and marking requirements for safety helmets designed to provide protection against falling objects.",
    keyRequirements: [
      "Shock Absorption Test (Force transmitted < 5.0 kN)",
      "Penetration Resistance Test (1 kg steel drop)",
      "Flammability & Heat Resistance",
      "Electrical Insulation (Withstand 1.2 kV AC)"
    ],
    versionHistory: [
      { year: 2023, status: "CURRENT", notes: "Updated harness retention system specs." },
      { year: 1984, status: "SUPERSEDED", notes: "Legacy version." }
    ],
    relatedStandards: [
      { id: "is-15298-p2", isNumber: "IS 15298 (Part 2): 2021", title: "Personal Protective Equipment - Safety Footwear", relation: "Complementary PPE Standard" }
    ],
    certification: {
      isMandatory: true,
      qcoApplicable: true,
      qcoName: "Personal Protective Equipment QCO, 2022",
      bisScheme: "Scheme-I (ISI Mark)",
      statusText: "Mandatory ISI Marking on all industrial safety helmets"
    }
  },
  {
    id: "is-15298-p2",
    isNumber: "IS 15298 (Part 2): 2021",
    title: "Personal Protective Equipment - Part 2: Safety Footwear Specifications",
    category: "Safety/PPE",
    productCategory: "Safety Shoes",
    publicationYear: 2021,
    status: "CURRENT",
    relevanceScore: 93,
    explanation: "Covers steel/composite toe cap safety shoes designed for industrial field personnel, civil workers, and electrical substation operators.",
    scope: "Specifies basic and optional requirements for safety footwear used for industrial applications, including impact protection up to 200 Joules.",
    keyRequirements: [
      "Toe Cap Impact Resistance: 200 Joules minimum",
      "Toe Cap Compression Resistance: 15 kN minimum",
      "Sole Slip Resistance: SRC compliance",
      "Outsole Oil & Chemical Resistance"
    ],
    versionHistory: [{ year: 2021, status: "CURRENT", notes: "Revised toe cap standards." }],
    relatedStandards: [{ id: "is-2925", isNumber: "IS 2925: 2023", title: "Industrial Safety Helmets", relation: "Complementary PPE" }],
    certification: { isMandatory: true, qcoApplicable: true, qcoName: "Footwear QCO 2023", bisScheme: "ISI Mark", statusText: "Mandatory ISI Mark" }
  },
  {
    id: "is-3521",
    isNumber: "IS 3521: 2021",
    title: "Industrial Safety Belts and Harnesses - Full Body Harness",
    category: "Safety/PPE",
    productCategory: "Safety Harness",
    publicationYear: 2021,
    status: "CURRENT",
    relevanceScore: 91,
    explanation: "Governs fall arrest equipment and full body harnesses required for elevated street light maintenance and high-rise construction.",
    scope: "Specifies requirements for materials, design, static strength, and dynamic performance of full body harnesses.",
    keyRequirements: [
      "Static Strength Test: Harness withstands 15 kN for 3 minutes",
      "Dynamic Drop Test: 100 kg torso drop from 4 meters",
      "Polyester / Polyamide Webbing Width: ≥ 40 mm"
    ],
    versionHistory: [{ year: 2021, status: "CURRENT", notes: "Third revision." }],
    relatedStandards: [],
    certification: { isMandatory: true, qcoApplicable: true, qcoName: "PPE Safety QCO 2022", bisScheme: "ISI Mark", statusText: "Mandatory ISI Mark" }
  },
  {
    id: "is-4770",
    isNumber: "IS 4770: 2019",
    title: "Rubber Gloves for Electrical Purposes - Specification",
    category: "Safety/PPE",
    productCategory: "Electrical Gloves",
    publicationYear: 2019,
    status: "CURRENT",
    relevanceScore: 89,
    explanation: "Insulating rubber gloves rated for high-voltage electrical line maintenance and substation switching operations.",
    scope: "Covers Class 00 (500V) to Class 4 (36,000V) dielectric proof testing of rubber gloves.",
    keyRequirements: ["Dielectric Proof Test: Up to 40kV AC", "Puncture & Mechanical Tear Resistance"],
    versionHistory: [{ year: 2019, status: "CURRENT", notes: "Aligned with IEC 60903." }],
    relatedStandards: [],
    certification: { isMandatory: true, qcoApplicable: true, qcoName: "Electrical PPE QCO", bisScheme: "ISI Mark", statusText: "Mandatory ISI Mark" }
  },
  {
    id: "is-9473",
    isNumber: "IS 9473: 2021",
    title: "Respiratory Protective Devices - Filtering Half Masks to Protect Against Particles (N95 / FFP2 Equivalent)",
    category: "Safety/PPE",
    productCategory: "Respiratory Mask",
    publicationYear: 2021,
    status: "CURRENT",
    relevanceScore: 86,
    explanation: "Standard for protective particulate masks used in municipal sanitation, road sweeping, and construction dust environment.",
    scope: "Specifies particle filtration efficiency (FFP1 ≥ 80%, FFP2 ≥ 94%, FFP3 ≥ 99%) and breathing resistance.",
    keyRequirements: ["Sodium Chloride Particulate Filtration Efficiency ≥ 94%", "Maximum Inhalation Resistance < 2.4 mbar"],
    versionHistory: [{ year: 2021, status: "CURRENT", notes: "Revised post-pandemic specs." }],
    relatedStandards: [],
    certification: { isMandatory: true, qcoApplicable: true, qcoName: "Medical & Respiratory PPE QCO", bisScheme: "ISI Mark", statusText: "Mandatory Certification" }
  },
  {
    id: "is-8521",
    isNumber: "IS 8521: 2020",
    title: "Industrial Safety Goggles and Eye Protectors",
    category: "Safety/PPE",
    productCategory: "Safety Goggles",
    publicationYear: 2020,
    status: "CURRENT",
    relevanceScore: 84,
    explanation: "Impact-resistant safety spectacles and chemical splash goggles for lab technicians, municipal workshop mechanics, and welders.",
    scope: "Covers optical clarity, high-speed particle impact resistance, and UV radiation shielding.",
    keyRequirements: ["High Speed Impact Test: 6 mm steel ball at 45 m/s", "Anti-fog & Anti-scratch coating"],
    versionHistory: [{ year: 2020, status: "CURRENT", notes: "Revised optical class definitions." }],
    relatedStandards: [],
    certification: { isMandatory: true, qcoApplicable: true, qcoName: "Eye Protection QCO", bisScheme: "ISI Mark", statusText: "Mandatory ISI Mark" }
  },
  {
    id: "is-6153",
    isNumber: "IS 6153: 2019",
    title: "Protective Leather Gloves for Welders",
    category: "Safety/PPE",
    productCategory: "Welding Gloves",
    publicationYear: 2019,
    status: "CURRENT",
    relevanceScore: 81,
    explanation: "Heat-resistant split leather gauntlet gloves for welding, cutting, and hot metal fabrication works.",
    scope: "Specifies thermal resistance against molten metal splashes and radiant heat.",
    keyRequirements: ["Contact Heat Resistance up to 250°C", "Split Cowhide Leather Thickness ≥ 1.2 mm"],
    versionHistory: [{ year: 2019, status: "CURRENT", notes: "Second revision." }],
    relatedStandards: [],
    certification: { isMandatory: false, qcoApplicable: false, qcoName: "PPE Guideline", bisScheme: "ISI Mark", statusText: "ISI Mark Optional" }
  },
  {
    id: "is-15809",
    isNumber: "IS 15809: 2022",
    title: "High Visibility Warning Clothing for Professional Use",
    category: "Safety/PPE",
    productCategory: "Reflective Jacket",
    publicationYear: 2022,
    status: "CURRENT",
    relevanceScore: 88,
    explanation: "Fluorescent retro-reflective safety jackets for traffic police, highway maintenance crews, and night road workers.",
    scope: "Specifies retro-reflective tape performance (Class 2 / Class 3) and background fluorescent fabric luminance.",
    keyRequirements: ["Retro-reflective Coefficient ≥ 330 cd/(lx·m²)", "Fluorescent Yellow/Orange Color Fastness"],
    versionHistory: [{ year: 2022, status: "CURRENT", notes: "Aligned with ISO 20471." }],
    relatedStandards: [],
    certification: { isMandatory: true, qcoApplicable: true, qcoName: "High Visibility Clothing Mandate", bisScheme: "ISI Mark", statusText: "Mandatory Procurement Standard" }
  },
  {
    id: "is-1179",
    isNumber: "IS 1179: 2020",
    title: "Equipment for Eye and Face Protection During Welding",
    category: "Safety/PPE",
    productCategory: "Welding Helmet",
    publicationYear: 2020,
    status: "CURRENT",
    relevanceScore: 82,
    explanation: "Auto-darkening welding helmets and hand shields protecting operators from intense UV/IR welding arc flash.",
    scope: "Covers optical filter shade numbers 8 to 14 and shell flame resistance.",
    keyRequirements: ["Auto-darkening Switching Speed < 0.1 ms", "IR Shade Protection DIN 16 rating"],
    versionHistory: [{ year: 2020, status: "CURRENT", notes: "Updated auto-darkening specs." }],
    relatedStandards: [],
    certification: { isMandatory: false, qcoApplicable: false, qcoName: "Safety Standard", bisScheme: "ISI Mark", statusText: "ISI Mark Recommended" }
  },
  {
    id: "is-12012",
    isNumber: "IS 12012: 2018",
    title: "Safety Code for Industrial Radiography - Radiation Protection Equipment",
    category: "Safety/PPE",
    productCategory: "Radiation Shielding",
    publicationYear: 2018,
    status: "CURRENT",
    relevanceScore: 79,
    explanation: "Lead apron and dosimeter protective standards for non-destructive testing (NDT) radiography personnel.",
    scope: "Specifies lead equivalence (0.25mm to 0.50mm Pb) and radiation leakage limits.",
    keyRequirements: ["Lead Equivalence: 0.50 mm Pb at 100 kVp", "AERB Compliance Certificate"],
    versionHistory: [{ year: 2018, status: "CURRENT", notes: "Aligned with AERB safety codes." }],
    relatedStandards: [],
    certification: { isMandatory: true, qcoApplicable: true, qcoName: "AERB Radiation Safety Mandate", bisScheme: "AERB Certified", statusText: "Mandatory AERB Clearance" }
  },

  // ==========================================
  // 4. CEMENT & CONSTRUCTION MATERIALS (10 Standards)
  // ==========================================
  {
    id: "is-12269",
    isNumber: "IS 12269: 2021",
    title: "Ordinary Portland Cement, 53 Grade - Specification",
    category: "Cement/materials",
    productCategory: "Portland Cement",
    publicationYear: 2021,
    status: "CURRENT",
    relevanceScore: 97,
    explanation: "High-strength cement standard mandated for heavy structural concrete, bridges, flyovers, prestressed concrete sleepers, and high-rise civic structures.",
    scope: "Specifies chemical composition, soundness, fineness, initial/final setting times, and 28-day compressive strength (minimum 53 MPa).",
    keyRequirements: [
      "Compressive Strength: 27 MPa (3 days), 37 MPa (7 days), 53 MPa (28 days)",
      "Initial Setting Time: ≥ 30 minutes",
      "Final Setting Time: ≤ 600 minutes",
      "Soundness (Le Chatelier): Max 10 mm",
      "Fineness (Blaine's Air Permeability): ≥ 225 m²/kg"
    ],
    versionHistory: [
      { year: 2021, status: "CURRENT", notes: "Revised chemical limit requirements." },
      { year: 2013, status: "SUPERSEDED", notes: "Previous revision." }
    ],
    relatedStandards: [
      { id: "is-1489-p1", isNumber: "IS 1489 (Part 1): 2021", title: "Portland Pozzolana Cement", relation: "Eco-Friendly Alternative" },
      { id: "is-456", isNumber: "IS 456: 2021", title: "Code of Practice for Plain and Reinforced Concrete", relation: "Design Code" }
    ],
    certification: {
      isMandatory: true,
      qcoApplicable: true,
      qcoName: "Cement Quality Control Order, 2020",
      bisScheme: "Scheme-I (ISI Mark)",
      statusText: "Strictly Mandatory ISI Mark. Illegal to supply non-certified cement in public tenders."
    }
  },
  {
    id: "is-1489-p1",
    isNumber: "IS 1489 (Part 1): 2021",
    title: "Portland Pozzolana Cement - Specification (Part 1: Flyash Based)",
    category: "Cement/materials",
    productCategory: "Portland Cement",
    publicationYear: 2021,
    status: "CURRENT",
    relevanceScore: 94,
    explanation: "Essential standard for structural building, municipal infra, and civil works defining flyash-blended cement properties.",
    scope: "Covers the manufacturing, physical properties, compressive strength requirements, and testing procedures for PPC cement.",
    keyRequirements: [
      "Compressive Strength: 16 MPa (3 days), 22 MPa (7 days), 33 MPa (28 days)",
      "Flyash Content: 15% to 35% by mass",
      "Fineness: ≥ 300 m²/kg"
    ],
    versionHistory: [{ year: 2021, status: "CURRENT", notes: "Updated flyash blending ratio limits." }],
    relatedStandards: [{ id: "is-12269", isNumber: "IS 12269: 2021", title: "53 Grade OPC", relation: "Higher Strength Variant" }],
    certification: { isMandatory: true, qcoApplicable: true, qcoName: "Cement QCO 2020", bisScheme: "ISI Mark", statusText: "Mandatory ISI Mark" }
  },
  {
    id: "is-8112",
    isNumber: "IS 8112: 2021",
    title: "Ordinary Portland Cement, 43 Grade - Specification",
    category: "Cement/materials",
    productCategory: "Portland Cement",
    publicationYear: 2021,
    status: "CURRENT",
    relevanceScore: 91,
    explanation: "Standard for 43 Grade OPC cement widely used in general reinforced concrete (RCC) building construction, plastering, and masonry.",
    scope: "Specifies 28-day minimum compressive strength of 43 MPa.",
    keyRequirements: ["Compressive Strength: 23 MPa (3 days), 33 MPa (7 days), 43 MPa (28 days)", "Initial Setting Time ≥ 30 min"],
    versionHistory: [{ year: 2021, status: "CURRENT", notes: "Revised edition." }],
    relatedStandards: [],
    certification: { isMandatory: true, qcoApplicable: true, qcoName: "Cement QCO", bisScheme: "ISI Mark", statusText: "Mandatory ISI Mark" }
  },
  {
    id: "is-456",
    isNumber: "IS 456: 2021",
    title: "Plain and Reinforced Concrete - Code of Practice",
    category: "Cement/materials",
    productCategory: "Concrete Code",
    publicationYear: 2021,
    status: "CURRENT",
    relevanceScore: 98,
    explanation: "The foundational civil engineering code of practice governing structural concrete design, water-cement ratio, cover, and durability across India.",
    scope: "Covers general structural design, materials, proportioning, batching, placing, curing, and structural safety criteria.",
    keyRequirements: [
      "Minimum Cement Content & Maximum Water-Cement Ratio for Durability",
      "Nominal Cover to Reinforcement (20mm to 50mm based on exposure)",
      "Standard Concrete Grades: M20 to M80"
    ],
    versionHistory: [{ year: 2021, status: "CURRENT", notes: "Reaffirmed with latest amendments." }],
    relatedStandards: [{ id: "is-1786", isNumber: "IS 1786: 2021", title: "TMT Rebars", relation: "Steel Reinforcement Code" }],
    certification: { isMandatory: true, qcoApplicable: true, qcoName: "National Building Code (NBC) 2016", bisScheme: "Code of Practice", statusText: "Mandatory Statutory Code" }
  },
  {
    id: "is-1786",
    isNumber: "IS 1786: 2021",
    title: "High Strength Deformed Steel Bars and Wires for Concrete Reinforcement (TMT Steel Bars)",
    category: "Cement/materials",
    productCategory: "TMT Rebars",
    publicationYear: 2021,
    status: "CURRENT",
    relevanceScore: 96,
    explanation: "Mandatory specification for thermo-mechanically treated (TMT) Fe 500, Fe 500D, Fe 550, and Fe 550D steel rebars used in civil RCC construction.",
    scope: "Covers chemical composition (Carbon < 0.25%, Sulfur/Phosphorus < 0.04%), yield stress, tensile strength, and bend test requirements.",
    keyRequirements: [
      "Yield Stress: 500 N/mm² (Fe 500) / 550 N/mm² (Fe 550)",
      "Elongation Percentage: ≥ 14.5% (D grade for seismic zones)",
      "Bend & Rebend Test Compliance without cracking"
    ],
    versionHistory: [{ year: 2021, status: "CURRENT", notes: "Mandated seismic ductility grade D." }],
    relatedStandards: [{ id: "is-456", isNumber: "IS 456: 2021", title: "Plain Concrete Code", relation: "Companion Structural Code" }],
    certification: { isMandatory: true, qcoApplicable: true, qcoName: "Steel & Steel Products QCO 2020", bisScheme: "ISI Mark", statusText: "Mandatory ISI Mark on Steel Rebars" }
  },
  {
    id: "is-383",
    isNumber: "IS 383: 2021",
    title: "Coarse and Fine Aggregates for Concrete - Specification",
    category: "Cement/materials",
    productCategory: "Aggregates",
    publicationYear: 2021,
    status: "CURRENT",
    relevanceScore: 89,
    explanation: "Governs crushed stone, gravel, and manufactured sand (M-Sand) grading zones used in concrete batching.",
    scope: "Defines particle size distribution, silt content limits, crushing value, and alkali-aggregate reactivity tests.",
    keyRequirements: ["M-Sand Fine Aggregate Grading Zone I to IV", "Aggregate Crushing Value < 30%", "Silt Content Limit < 3.0%"],
    versionHistory: [{ year: 2021, status: "CURRENT", notes: "Third revision including M-sand." }],
    relatedStandards: [{ id: "is-456", isNumber: "IS 456: 2021", title: "Concrete Code", relation: "Concrete Ingredient Code" }],
    certification: { isMandatory: true, qcoApplicable: false, qcoName: "IRC / MORTH Guidelines", bisScheme: "Test Specification", statusText: "Mandatory Tender Test Protocol" }
  },
  {
    id: "is-2062",
    isNumber: "IS 2062: 2021",
    title: "Hot Rolled Medium and High Tensile Structural Steel - Specification",
    category: "Cement/materials",
    productCategory: "Structural Steel",
    publicationYear: 2021,
    status: "CURRENT",
    relevanceScore: 92,
    explanation: "Standard for I-beams, channels, angles, plates, and hollow sections used in steel bridge girders and industrial sheds.",
    scope: "Specifies grades E250, E300, E350, E450 structural steel mechanical and chemical parameters.",
    keyRequirements: ["Yield Strength: ≥ 250 MPa (E250 Grade)", "Charpy V-notch Impact Energy at 0°C ≥ 27 J"],
    versionHistory: [{ year: 2021, status: "CURRENT", notes: "Updated high-tensile grades." }],
    relatedStandards: [],
    certification: { isMandatory: true, qcoApplicable: true, qcoName: "Steel Products QCO 2020", bisScheme: "ISI Mark", statusText: "Mandatory ISI Mark" }
  },
  {
    id: "is-10262",
    isNumber: "IS 10262: 2019",
    title: "Concrete Mix Proportioning - Guidelines",
    category: "Cement/materials",
    productCategory: "Concrete Mix Design",
    publicationYear: 2019,
    status: "CURRENT",
    relevanceScore: 87,
    explanation: "Provides standard mathematical and empirical guidelines for designing characteristic strength concrete mixes (M25 to M80).",
    scope: "Covers target mean strength calculations, flyash replacement factors, chemical admixture dosage, and water content selection.",
    keyRequirements: ["Target Strength Formula: f'ck = fck + 1.65 x s", "Air Entrainment Allowance"],
    versionHistory: [{ year: 2019, status: "CURRENT", notes: "Includes high-strength & self-compacting concrete guidelines." }],
    relatedStandards: [{ id: "is-456", isNumber: "IS 456: 2021", title: "Concrete Code", relation: "Parent Code" }],
    certification: { isMandatory: false, qcoApplicable: false, qcoName: "Design Guideline", bisScheme: "Guideline", statusText: "Standard Design Code" }
  },
  {
    id: "is-516",
    isNumber: "IS 516: 2021",
    title: "Hardened Concrete - Methods of Test - Compressive Strength of Concrete Cubes",
    category: "Cement/materials",
    productCategory: "Concrete Testing",
    publicationYear: 2021,
    status: "CURRENT",
    relevanceScore: 90,
    explanation: "Mandatory testing protocol for 150mm x 150mm concrete test cubes crushed at 7 days and 28 days to verify structural compliance.",
    scope: "Specifies cube casting, moist curing in water bath at 27°C ± 2°C, loading rate (14 N/mm²/min), and compressive strength calculation.",
    keyRequirements: ["Water Curing Temperature 27°C ± 2°C", "Testing Machine Load Pace Rate Control"],
    versionHistory: [{ year: 2021, status: "CURRENT", notes: "Revised into multi-part standard." }],
    relatedStandards: [{ id: "is-456", isNumber: "IS 456: 2021", title: "Concrete Code", relation: "Quality Assurance Standard" }],
    certification: { isMandatory: true, qcoApplicable: false, qcoName: "NABL Accreditation Protocol", bisScheme: "Test Method", statusText: "Mandatory Quality Audit Test" }
  },
  {
    id: "is-269",
    isNumber: "IS 269: 2021",
    title: "Ordinary Portland Cement - Specification",
    category: "Cement/materials",
    productCategory: "Portland Cement",
    publicationYear: 2021,
    status: "CURRENT",
    relevanceScore: 88,
    explanation: "Unified specification standard combining 33, 43, and 53 grades of Ordinary Portland Cement under a single framework.",
    scope: "Covers general chemical, physical, and strength criteria for unblended OPC cement.",
    keyRequirements: ["Insoluble Residue Limit < 5.0%", "Magnesia Limit < 6.0%"],
    versionHistory: [{ year: 2021, status: "CURRENT", notes: "Unified revision." }],
    relatedStandards: [{ id: "is-12269", isNumber: "IS 12269: 2021", title: "53 Grade OPC", relation: "Grade Specific Standard" }],
    certification: { isMandatory: true, qcoApplicable: true, qcoName: "Cement QCO", bisScheme: "ISI Mark", statusText: "Mandatory ISI Mark" }
  },

  // ==========================================
  // 5. WATER SUPPLY, PIPES & PLUMBING (10 Standards)
  // ==========================================
  {
    id: "is-4984",
    isNumber: "IS 4984: 2021",
    title: "High Density Polyethylene (HDPE) Pipes for Water Supply - Specification",
    category: "Construction",
    productCategory: "HDPE Pipe",
    publicationYear: 2021,
    status: "CURRENT",
    relevanceScore: 95,
    explanation: "Covers PE 80 and PE 100 grade HDPE pressure pipes used in municipal drinking water distribution, rural Jal Jeevan Mission pipelines, and sewerage mains.",
    scope: "Specifies material raw resin density, Melt Flow Index (MFI), Hydrostatic Strength Test, and Carbon Black Dispersion.",
    keyRequirements: [
      "Raw Material Resin Grade: PE 100 minimum",
      "Hydrostatic Test: 1000 hours at 80°C without burst",
      "Carbon Black Content: 2.0% to 2.5% by weight for UV stabilization",
      "Pressure Ratings: PN 6, PN 10, PN 12.5, PN 16 bar"
    ],
    versionHistory: [{ year: 2021, status: "CURRENT", notes: "Mandated PE 100 virgin resin." }],
    relatedStandards: [
      { id: "is-4985", isNumber: "IS 4985: 2021", title: "uPVC Pipes", relation: "Alternative Rigid Pipe" }
    ],
    certification: {
      isMandatory: true,
      qcoApplicable: true,
      qcoName: "Pipes & Fittings Quality Control Order, 2022",
      bisScheme: "Scheme-I (ISI Mark)",
      statusText: "Mandatory ISI Mark for Jal Jeevan Mission and Municipal Tenders"
    }
  },
  {
    id: "is-4985",
    isNumber: "IS 4985: 2021",
    title: "Unplasticized Polyvinyl Chloride (uPVC) Pipes for Potable Water Supplies - Specification",
    category: "Construction",
    productCategory: "uPVC Pipe",
    publicationYear: 2021,
    status: "CURRENT",
    relevanceScore: 92,
    explanation: "Standard for rigid uPVC pressure pipes widely used in domestic water supply lines, irrigation, and plumbing works.",
    scope: "Covers dimensions, wall thickness tolerances, Vicat softening temperature (≥ 80°C), and short-term hydrostatic pressure.",
    keyRequirements: ["Vicat Softening Temp ≥ 80°C", "Lead-free Stabilizer formulation requirement"],
    versionHistory: [{ year: 2021, status: "CURRENT", notes: "Phased out heavy metal lead stabilizers." }],
    relatedStandards: [{ id: "is-4984", isNumber: "IS 4984: 2021", title: "HDPE Pipes", relation: "Flexible Pipe Variant" }],
    certification: { isMandatory: true, qcoApplicable: true, qcoName: "Pipes QCO 2022", bisScheme: "ISI Mark", statusText: "Mandatory ISI Mark" }
  },
  {
    id: "is-8329",
    isNumber: "IS 8329: 2020",
    title: "Ductile Iron Pipes for Water, Gas and Sewage - Specification",
    category: "Construction",
    productCategory: "Ductile Iron Pipe",
    publicationYear: 2020,
    status: "CURRENT",
    relevanceScore: 94,
    explanation: "Heavy-duty underground DI pipes (Class K7, K9, C-Class) specified for major city trunk water mains and sewage pumping mains.",
    scope: "Covers centrifugal casting of DI pipes, internal Portland cement mortar lining, and external zinc coating with finishing layer.",
    keyRequirements: ["Tensile Strength ≥ 420 MPa", "Elongation ≥ 10%", "Internal Cement Mortar Lining Thickness"],
    versionHistory: [{ year: 2020, status: "CURRENT", notes: "Third revision." }],
    relatedStandards: [],
    certification: { isMandatory: true, qcoApplicable: true, qcoName: "Ductile Iron Products QCO", bisScheme: "ISI Mark", statusText: "Mandatory ISI Mark" }
  },
  {
    id: "is-1239-p1",
    isNumber: "IS 1239 (Part 1): 2021",
    title: "Steel Tubes, Tubulars and Other Wrought Steel Fittings - Part 1: Steel Tubes (MS Pipes)",
    category: "Construction",
    productCategory: "GI / MS Pipe",
    publicationYear: 2021,
    status: "CURRENT",
    relevanceScore: 90,
    explanation: "Mild steel (MS) and Galvanized Iron (GI) screwed & socketed pipes used in fire fighting hydrants and structural scaffolding.",
    scope: "Specifies Light, Medium, and Heavy class GI steel tubes and zinc galvanizing coating thickness (minimum 360 g/m²).",
    keyRequirements: ["Galvanizing Zinc Coating Mass ≥ 360 g/m²", "Hydrostatic Test at 5.0 MPa for 5 sec"],
    versionHistory: [{ year: 2021, status: "CURRENT", notes: "Fifth revision." }],
    relatedStandards: [],
    certification: { isMandatory: true, qcoApplicable: true, qcoName: "Steel Tubes QCO", bisScheme: "ISI Mark", statusText: "Mandatory ISI Mark" }
  },
  {
    id: "is-1536",
    isNumber: "IS 1536: 2020",
    title: "Centrifugally Cast (Spun) Iron Pressure Pipes for Water, Gas and Sewage",
    category: "Construction",
    productCategory: "Cast Iron Pipe",
    publicationYear: 2020,
    status: "CURRENT",
    relevanceScore: 85,
    explanation: "Cast iron spun pressure pipes for underground gravity drainage and storm water trunk sewers.",
    scope: "Covers Class LA, A, and B cast iron pressure pipes.",
    keyRequirements: ["Hydrostatic Pressure Withstand up to 3.5 MPa", "Ring Crushing Strength"],
    versionHistory: [{ year: 2020, status: "CURRENT", notes: "Reaffirmed edition." }],
    relatedStandards: [],
    certification: { isMandatory: true, qcoApplicable: true, qcoName: "Cast Iron QCO", bisScheme: "ISI Mark", statusText: "Mandatory ISI Mark" }
  },
  {
    id: "is-783",
    isNumber: "IS 783: 2021",
    title: "Code of Practice for Laying of Concrete Pipes",
    category: "Construction",
    productCategory: "Pipe Installation",
    publicationYear: 2021,
    status: "CURRENT",
    relevanceScore: 83,
    explanation: "Code of practice for trench excavation, pipe bedding, jointing, and backfilling of underground municipal drainage pipes.",
    scope: "Covers trench width criteria, concrete bedding classes A, B, C, and hydrostatic field pressure testing.",
    keyRequirements: ["Trench Bedding Class B compliance", "Field Joint Water Tightness Test"],
    versionHistory: [{ year: 2021, status: "CURRENT", notes: "Updated code." }],
    relatedStandards: [],
    certification: { isMandatory: false, qcoApplicable: false, qcoName: "CPHEEO Manual Alignment", bisScheme: "Code of Practice", statusText: "Mandatory CPWD Standard" }
  },
  {
    id: "is-1729",
    isNumber: "IS 1729: 2020",
    title: "Ductile Iron Fittings for Pressure Pipelines for Water, Gas and Sewage",
    category: "Construction",
    productCategory: "DI Fittings",
    publicationYear: 2020,
    status: "CURRENT",
    relevanceScore: 87,
    explanation: "Governs DI tees, bends, reducers, and flanged socket fittings used in pressurized water distribution networks.",
    scope: "Specifies wall thickness PN 10, PN 16, PN 25 flange drillings matching IS 1538.",
    keyRequirements: ["Hydrostatic Test of Fitting at 1.5 x Rated Pressure", "Epoxy Coating Thickness ≥ 250 microns"],
    versionHistory: [{ year: 2020, status: "CURRENT", notes: "Second revision." }],
    relatedStandards: [{ id: "is-8329", isNumber: "IS 8329: 2020", title: "DI Pipes", relation: "Companion Fitting Code" }],
    certification: { isMandatory: true, qcoApplicable: true, qcoName: "DI Fittings QCO", bisScheme: "ISI Mark", statusText: "Mandatory ISI Mark" }
  },
  {
    id: "is-778",
    isNumber: "IS 778: 2019",
    title: "Copper Alloy Gate, Globe and Check Valves for Water Works Purposes",
    category: "Construction",
    productCategory: "Brass Valves",
    publicationYear: 2019,
    status: "CURRENT",
    relevanceScore: 84,
    explanation: "Specification for brass and bronze isolating valves installed in municipal water supply meters and indoor plumbing.",
    scope: "Covers PN 1.0 and PN 1.6 rating copper alloy gunmetal gate valves.",
    keyRequirements: ["Body Test Pressure 2.4 MPa", "Dezincification Resistance Test"],
    versionHistory: [{ year: 2019, status: "CURRENT", notes: "Fourth revision." }],
    relatedStandards: [],
    certification: { isMandatory: true, qcoApplicable: true, qcoName: "Valves QCO", bisScheme: "ISI Mark", statusText: "Mandatory ISI Mark" }
  },
  {
    id: "is-14846",
    isNumber: "IS 14846: 2020",
    title: "Sluice Valves for Water Works Purposes (50 mm to 1200 mm Size) - Specification",
    category: "Construction",
    productCategory: "Sluice Valve",
    publicationYear: 2020,
    status: "CURRENT",
    relevanceScore: 91,
    explanation: "Cast iron and ductile iron resilient seated sluice gate valves for city water main isolation.",
    scope: "Covers PN 1.0 and PN 1.6 non-rising stem sluice valves.",
    keyRequirements: ["Stainless Steel Stem (AISI 410 / 304)", "Rubber Encapsulated Wedge Seat"],
    versionHistory: [{ year: 2020, status: "CURRENT", notes: "Aligned with ISO 5996." }],
    relatedStandards: [],
    certification: { isMandatory: true, qcoApplicable: true, qcoName: "Water Works Valves QCO", bisScheme: "ISI Mark", statusText: "Mandatory ISI Mark" }
  },
  {
    id: "is-2190",
    isNumber: "IS 2190: 2020",
    title: "Selection, Installation and Maintenance of First-Aid Fire Extinguishers - Code of Practice",
    category: "Safety/PPE",
    productCategory: "Fire Safety",
    publicationYear: 2020,
    status: "CURRENT",
    relevanceScore: 89,
    explanation: "Code of practice for selecting portable ABC dry powder and CO2 fire extinguishers in public buildings, substations, and warehouses.",
    scope: "Defines fire risk hazard classification (Light, Ordinary, High) and extinguisher distribution spacing.",
    keyRequirements: ["ABC Stored Pressure Extinguisher IS 15683 Compliance", "Annual Refill & Hydrostatic Pressure Test"],
    versionHistory: [{ year: 2020, status: "CURRENT", notes: "Revised NBC 2016 alignment." }],
    relatedStandards: [],
    certification: { isMandatory: true, qcoApplicable: true, qcoName: "Fire Equipment QCO 2021", bisScheme: "ISI Mark", statusText: "Mandatory Statutory Fire Audit" }
  }
];
