/**
 * Mock Indian Standards (BIS Data Repository)
 * Contains 20 realistic Indian Standards across Electrical, Construction, Safety, Electronics, and Mechanical.
 * Designed for SIH Demo & future RAG vector database synchronization.
 */

export const MOCK_STANDARDS = [
  {
    id: "is-10322-p5-s3",
    isNumber: "IS 10322 (Part 5/Sec 3): 2024",
    title: "Luminaires - Particular Requirements - Luminaires for Road and Street Lighting",
    category: "Electrical",
    productCategory: "LED Street Light",
    publicationYear: 2024,
    status: "CURRENT",
    relevanceScore: 96,
    explanation: "Directly matches 90W outdoor LED street light specifications. Defines photometric performance, IP66 ingress protection, thermal management, and surge protection (10kV) required for municipal roadway illumination.",
    scope: "This standard covers specific safety and performance requirements for luminaires intended for use on public roads, highways, and street illumination systems powered by electrical supplies up to 1000V. It includes requirements for mechanical strength, weather resistance, and optical efficacy.",
    keyRequirements: [
      "Minimum Luminaire Efficacy: 120 lm/W",
      "Ingress Protection Rating: IP66 minimum",
      "Surge Protection Capability: 10 kV minimum",
      "Operating Temperature Range: -10°C to +50°C",
      "Power Factor: ≥ 0.95 at rated load",
      "Total Harmonic Distortion (THD): < 10%",
      "CCT: 4000K / 5700K / 6500K with CRI > 70",
      "Dielectric Voltage Withstand Test: 1.5 kV AC for 1 minute"
    ],
    amendments: [
      {
        amendmentNo: "Amendment 1",
        date: "March 2024",
        description: "Mandate for integrated smart control interface (NEMA/Zhaga 7-pin socket compatibility) for IoT municipal dimming systems."
      },
      {
        amendmentNo: "Amendment 2",
        date: "July 2024",
        description: "Updated testing protocols for saline atmospheric corrosion resistance (salt spray test 500 hours)."
      }
    ],
    versionHistory: [
      { year: 2024, status: "CURRENT", notes: "Incorporated latest high-efficiency LED chip benchmarks and smart driver standards." },
      { year: 2017, status: "SUPERSEDED", notes: "Replaced by 2024 edition to align with National Efficient Lighting Programme (NELP)." },
      { year: 2012, status: "SUPERSEDED", notes: "Legacy standard covering traditional sodium vapor & MH street fixtures." }
    ],
    relatedStandards: [
      { id: "is-16102-p1", isNumber: "IS 16102 (Part 1): 2023", title: "Self-Ballasted LED Lamps for General Lighting Services - Safety Requirements", relation: "Safety Standard" },
      { id: "is-15885-p2-s13", isNumber: "IS 15885 (Part 2/Sec 13): 2020", title: "Lamp Controlgear: Particular Requirements for d.c. or a.c. Supplied Electronic Controlgear for LED Modules", relation: "Component Standard" },
      { id: "is-16103-p1", isNumber: "IS 16103 (Part 1): 2022", title: "Led Modules for General Lighting - Safety Specifications", relation: "Component Standard" }
    ],
    certification: {
      isMandatory: true,
      qcoApplicable: true,
      qcoName: "Solar & LED Lighting Quality Control Order, 2023",
      qcoDate: "2023-09-01",
      bisScheme: "Scheme-I (ISI Mark)",
      statusText: "Mandatory Certification Required under Ministry of Power Notification"
    },
    source: {
      portal: "BIS Standards Portal (Manakonline)",
      url: "https://www.services.bis.gov.in/php/BIS_2.0/bisportal/",
      lastVerified: "2026-08-15"
    }
  },
  {
    id: "is-16102-p1",
    isNumber: "IS 16102 (Part 1): 2023",
    title: "Self-Ballasted LED Lamps for General Lighting Services - Safety Requirements",
    category: "Electrical",
    productCategory: "LED Lighting",
    publicationYear: 2023,
    status: "CURRENT",
    relevanceScore: 89,
    explanation: "Applies to electrical safety, insulation resistance, fault condition testing, and fire hazard protection for LED lighting modules incorporated in procurement specifications.",
    scope: "Specifies the safety and interchangeability requirements, together with the test methods and conditions required to show compliance of self-ballasted LED lamps for general lighting services.",
    keyRequirements: [
      "Marking & Labelling compliance",
      "Insulation Resistance & Electric Strength",
      "Mechanical Strength & Cap Temperature Limit",
      "Resistance to Heat and Flame (Glow-wire test at 650°C)"
    ],
    amendments: [
      { amendmentNo: "Amendment 1", date: "Jan 2024", description: "Refined fault testing under over-voltage transients." }
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
    },
    source: {
      portal: "BIS Standards Portal",
      url: "https://www.services.bis.gov.in/",
      lastVerified: "2026-08-10"
    }
  },
  {
    id: "is-2925",
    isNumber: "IS 2925: 2023",
    title: "Specification for Industrial Safety Helmets",
    category: "Safety",
    productCategory: "Safety Helmet",
    publicationYear: 2023,
    status: "CURRENT",
    relevanceScore: 95,
    explanation: "Primary mandatory standard for personal protective equipment (PPE) safety helmets used in construction sites, heavy engineering, and municipal field works.",
    scope: "Covers physical and performance requirements, methods of test, and marking requirements for safety helmets designed to provide protection to wearer against falling objects and mechanical impact.",
    keyRequirements: [
      "Shock Absorption Test (Force transmitted < 5.0 kN)",
      "Penetration Resistance Test (1 kg steel drop)",
      "Flammability & Heat Resistance",
      "Electrical Insulation (Withstand 1.2 kV AC for electrical hazard helmets)",
      "Chinstrap Anchorage Strength (> 150 N, < 250 N release)"
    ],
    amendments: [
      { amendmentNo: "Amendment 1", date: "Nov 2023", description: "Mandatory UV stabilization performance test for high-altitude outdoor construction." }
    ],
    versionHistory: [
      { year: 2023, status: "CURRENT", notes: "Updated ergonomics and harness retention system specs." },
      { year: 1984, status: "SUPERSEDED", notes: "Legacy version." }
    ],
    relatedStandards: [
      { id: "is-15298-p2", isNumber: "IS 15298 (Part 2): 2021", title: "Personal Protective Equipment - Safety Footwear", relation: "Complementary PPE Standard" }
    ],
    certification: {
      isMandatory: true,
      qcoApplicable: true,
      qcoName: "Personal Protective Equipment (Quality Control) Order, 2022",
      qcoDate: "2022-12-15",
      bisScheme: "Scheme-I (ISI Mark)",
      statusText: "Mandatory ISI Marking on all industrial safety helmets sold or procured in India."
    },
    source: {
      portal: "BIS Standards Portal",
      url: "https://www.services.bis.gov.in/",
      lastVerified: "2026-08-20"
    }
  },
  {
    id: "is-1489-p1",
    isNumber: "IS 1489 (Part 1): 2021",
    title: "Portland Pozzolana Cement - Specification (Part 1: Flyash Based)",
    category: "Construction",
    productCategory: "Portland Cement",
    publicationYear: 2021,
    status: "CURRENT",
    relevanceScore: 94,
    explanation: "Essential standard for structural building, municipal infra, and civil works. Defines chemical composition, compressive strength, fineness, and setting time limits.",
    scope: "Covers the manufacturing, chemical composition, physical properties, compressive strength requirements, and testing procedures for flyash-based Portland Pozzolana Cement (PPC).",
    keyRequirements: [
      "Compressive Strength: 33 MPa (3 days), 43 MPa (7 days), 53 MPa (28 days)",
      "Initial Setting Time: ≥ 30 minutes",
      "Final Setting Time: ≤ 600 minutes",
      "Fineness (Blaine's Air Permeability): ≥ 300 m²/kg",
      "Insoluble Residue: Max 4.0%",
      "Flyash Addition Percentage: 15% to 35% by mass"
    ],
    amendments: [
      { amendmentNo: "Amendment 2", date: "Feb 2023", description: "Mandated QR Code printing on cement bags for digital traceability." }
    ],
    versionHistory: [
      { year: 2021, status: "CURRENT", notes: "Revised compressive strength limits and eco-labeling provisions." },
      { year: 2015, status: "SUPERSEDED", notes: "Previous revision." }
    ],
    relatedStandards: [
      { id: "is-269", isNumber: "IS 269: 2021", title: "Ordinary Portland Cement - Specification", relation: "Alternative Standard" },
      { id: "is-4031", isNumber: "IS 4031: 2019", title: "Methods of Physical Tests for Hydraulic Cement", relation: "Testing Standard" }
    ],
    certification: {
      isMandatory: true,
      qcoApplicable: true,
      qcoName: "Cement Quality Control Order, 2020",
      bisScheme: "Scheme-I (ISI Mark)",
      statusText: "Strictly Mandatory ISI Mark. Non-certified cement illegal for public tender procurement."
    },
    source: {
      portal: "BIS Standards Portal",
      url: "https://www.services.bis.gov.in/",
      lastVerified: "2026-07-30"
    }
  },
  {
    id: "is-694",
    isNumber: "IS 694: 2022",
    title: "Polyvinyl Chloride (PVC) Insulated Cables for Working Voltages Up to and Including 1100 V",
    category: "Electrical",
    productCategory: "PVC Cable",
    publicationYear: 2022,
    status: "CURRENT",
    relevanceScore: 92,
    explanation: "Covers single-core and multi-core PVC insulated copper/aluminum electrical wires for internal wiring, street light pole distribution, and equipment power feeds.",
    scope: "Covers requirements for PVC insulated flexible & rigid conductor cables for electricity supply up to 1100V AC.",
    keyRequirements: [
      "Conductor Resistance: As per IS 8130 class 1, 2 or 5",
      "Insulation Resistance: Minimum 10 MΩ·km at 70°C",
      "High Voltage Test: 3.0 kV AC for 5 minutes",
      "Flame Retardance Test (Category FR / FRLSH)",
      "Smoke Density & Acid Gas Generation Limits"
    ],
    amendments: [
      { amendmentNo: "Amendment 1", date: "Aug 2023", description: "Updated halogen gas release limits for halogen-free eco-variants." }
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
      statusText: "Mandatory Certification Required."
    },
    source: {
      portal: "BIS Standards Portal",
      url: "https://www.services.bis.gov.in/",
      lastVerified: "2026-08-01"
    }
  },
  {
    id: "is-15298-p2",
    isNumber: "IS 15298 (Part 2): 2021",
    title: "Personal Protective Equipment - Part 2: Safety Footwear Specifications",
    category: "Safety",
    productCategory: "Safety Shoes",
    publicationYear: 2021,
    status: "CURRENT",
    relevanceScore: 93,
    explanation: "Covers steel/composite toe cap safety shoes designed for industrial field personnel, civil workers, and electrical substation operators.",
    scope: "Specifies basic and additional (optional) requirements for safety footwear used for general industrial applications. Includes impact protection up to 200 Joules and compression resistance up to 15 kN.",
    keyRequirements: [
      "Toe Cap Impact Resistance: 200 Joules minimum",
      "Toe Cap Compression Resistance: 15 kN minimum",
      "Sole Slip Resistance: SRA / SRB / SRC compliance",
      "Upper Leather Tear & Tensile Strength",
      "Outsole Oil & Chemical Resistance"
    ],
    amendments: [
      { amendmentNo: "Amendment 1", date: "May 2023", description: "Inclusion of non-metallic composite toe cap specifications." }
    ],
    versionHistory: [
      { year: 2021, status: "CURRENT", notes: "Harmonized with ISO 20345 standards." }
    ],
    relatedStandards: [
      { id: "is-2925", isNumber: "IS 2925: 2023", title: "Industrial Safety Helmets", relation: "Complementary PPE Standard" }
    ],
    certification: {
      isMandatory: true,
      qcoApplicable: true,
      qcoName: "Footwear (Quality Control) Order, 2023",
      bisScheme: "Scheme-I (ISI Mark)",
      statusText: "Mandatory QCO Enforced by Department for Promotion of Industry and Internal Trade (DPIIT)."
    },
    source: {
      portal: "BIS Standards Portal",
      url: "https://www.services.bis.gov.in/",
      lastVerified: "2026-08-12"
    }
  },
  {
    id: "is-15885-p2-s13",
    isNumber: "IS 15885 (Part 2/Sec 13): 2020",
    title: "Lamp Controlgear - Particular Requirements for Electronic Controlgear for LED Modules",
    category: "Electronics",
    productCategory: "LED Driver",
    publicationYear: 2020,
    status: "CURRENT",
    relevanceScore: 88,
    explanation: "Critical standard for LED drivers used in street lights and outdoor luminaires. Ensures power factor correction, voltage surge protection, and low ripple current.",
    scope: "Specifies particular safety requirements for electronic controlgear for use on d.c. supplies up to 250V or a.c. supplies up to 1000V at 50Hz/60Hz.",
    keyRequirements: [
      "Output Current Regulation: ± 5%",
      "Short Circuit & Open Circuit Self-Protection",
      "Over Temperature Auto-cutout",
      "Harmonic Current Emissions: IEC 61000-3-2 Class C"
    ],
    amendments: [
      { amendmentNo: "Amendment 1", date: "Jan 2022", description: "Mandatory 440V AC phase-to-phase withstand testing for 4 hours." }
    ],
    versionHistory: [
      { year: 2020, status: "CURRENT", notes: "Revised surge testing requirements." }
    ],
    relatedStandards: [
      { id: "is-10322-p5-s3", isNumber: "IS 10322 (Part 5/Sec 3): 2024", title: "Luminaires for Road and Street Lighting", relation: "Parent System Standard" }
    ],
    certification: {
      isMandatory: true,
      qcoApplicable: true,
      qcoName: "Electronics and Information Technology Goods Order (CRS)",
      bisScheme: "CRS Registration",
      statusText: "Mandatory Registration under MeitY Compulsory Registration Scheme."
    },
    source: {
      portal: "BIS Standards Portal",
      url: "https://www.services.bis.gov.in/",
      lastVerified: "2026-08-05"
    }
  },
  {
    id: "is-4984",
    isNumber: "IS 4984: 2023",
    title: "High Density Polyethylene (HDPE) Pipes for Water Supply - Specification",
    category: "Construction",
    productCategory: "HDPE Pipe",
    publicationYear: 2023,
    status: "CURRENT",
    relevanceScore: 91,
    explanation: "Governs HDPE piping specified in municipal potable water supply tenders, sewage lines, and underground cable conduits.",
    scope: "Covers requirement for raw material, dimensions, performance requirements and testing of HDPE pipes for water supply and drainage.",
    keyRequirements: [
      "Material Grade: PE 80 and PE 100",
      "Hydrostatic Strength Test (100 hours at 80°C)",
      "Carbon Black Content: 2.0% to 2.5%",
      "Melt Flow Rate (MFR) variation < 20%"
    ],
    amendments: [],
    versionHistory: [
      { year: 2023, status: "CURRENT", notes: "Sixth revision." }
    ],
    relatedStandards: [
      { id: "is-1239-p1", isNumber: "IS 1239 (Part 1): 2021", title: "Steel Tubes and Tubulars for Water & Gas", relation: "Alternative Piping Standard" }
    ],
    certification: {
      isMandatory: true,
      qcoApplicable: true,
      qcoName: "Pipes and Fittings Quality Control Order",
      bisScheme: "Scheme-I (ISI Mark)",
      statusText: "Mandatory ISI Mark required for public works execution."
    },
    source: {
      portal: "BIS Standards Portal",
      url: "https://www.services.bis.gov.in/",
      lastVerified: "2026-07-22"
    }
  },
  {
    id: "is-2062",
    isNumber: "IS 2062: 2021",
    title: "Hot Rolled Medium and High Tensile Structural Steel - Specification",
    category: "Mechanical",
    productCategory: "Structural Steel",
    publicationYear: 2021,
    status: "CURRENT",
    relevanceScore: 95,
    explanation: "Foundational structural steel standard for high-mast lighting poles, sub-station structures, bridge construction, and warehouse framing.",
    scope: "Covers requirements for structural steel sections, plates, flats, and bars used in welded, bolted, or riveted structural applications.",
    keyRequirements: [
      "Yield Strength Grades: E250, E300, E350, E410, E450",
      "Charpy Impact Test: Tested at 0°C / -20°C for sub-zero grades",
      "Weldability: Carbon Equivalent (CE) ≤ 0.42%",
      "Elongation Percentage: ≥ 23%"
    ],
    amendments: [
      { amendmentNo: "Amendment 1", date: "Dec 2022", description: "Inclusion of corrosion-resistant weather-proofing alloy additions (Corten equivalent)." }
    ],
    versionHistory: [
      { year: 2021, status: "CURRENT", notes: "Seventh revision." }
    ],
    relatedStandards: [
      { id: "is-1367-p1", isNumber: "IS 1367 (Part 1): 2022", title: "Technical Supply Conditions for Threaded Fasteners", relation: "Fastener Standard" }
    ],
    certification: {
      isMandatory: true,
      qcoApplicable: true,
      qcoName: "Steel and Steel Products Quality Control Order, 2020",
      bisScheme: "Scheme-I (ISI Mark)",
      statusText: "Mandatory ISI Mark under Ministry of Steel Order."
    },
    source: {
      portal: "BIS Standards Portal",
      url: "https://www.services.bis.gov.in/",
      lastVerified: "2026-08-18"
    }
  },
  {
    id: "is-7098-p1",
    isNumber: "IS 7098 (Part 1): 2022",
    title: "Crosslinked Polyethylene Insulated PVC Sheathed Cables - Part 1: For Working Voltages Up to and Including 1100 V",
    category: "Electrical",
    productCategory: "XLPE Cable",
    publicationYear: 2022,
    status: "CURRENT",
    relevanceScore: 90,
    explanation: "Heavy-duty underground armored power cables used for feeder pillars, smart city power grids, and municipal substation interconnects.",
    scope: "Covers requirements for armored and unarmored XLPE insulated cables for electricity supply.",
    keyRequirements: [
      "Maximum Conductor Temperature under normal operation: 90°C",
      "Short-circuit Conductor Temperature: 250°C",
      "Galvanized Steel Wire / Strip Armoring Coverage > 90%",
      "Water Immersion & Thermal Aging Test"
    ],
    amendments: [],
    versionHistory: [
      { year: 2022, status: "CURRENT", notes: "Revised armoring tolerances." }
    ],
    relatedStandards: [
      { id: "is-694", isNumber: "IS 694: 2022", title: "PVC Insulated Cables up to 1100V", relation: "Light Duty Alternative" }
    ],
    certification: {
      isMandatory: true,
      qcoApplicable: true,
      qcoName: "Electrical Wires & Cables QCO 2023",
      bisScheme: "Scheme-I (ISI Mark)",
      statusText: "Mandatory ISI Mark."
    },
    source: {
      portal: "BIS Standards Portal",
      url: "https://www.services.bis.gov.in/",
      lastVerified: "2026-08-02"
    }
  },
  {
    id: "is-15683",
    isNumber: "IS 15683: 2022",
    title: "Portable Fire Extinguishers - Performance and Construction - Specification",
    category: "Safety",
    productCategory: "Fire Extinguisher",
    publicationYear: 2022,
    status: "CURRENT",
    relevanceScore: 89,
    explanation: "Mandatory safety appliance for public buildings, municipal sub-stations, warehouses, and government office complexes.",
    scope: "Covers performance requirements, constructional features, and test procedures for portable fire extinguishers of water, foam, powder, and CO2 types.",
    keyRequirements: [
      "Burst Pressure Test: ≥ 4 times maximum operating pressure",
      "Fire Rating Tests: Class A, B, C rating verification",
      "Corrosion Resistance (Internal & External)",
      "Discharge Duration & Throw Distance minimum benchmarks"
    ],
    amendments: [
      { amendmentNo: "Amendment 1", date: "Oct 2023", description: "Mandatory inclusion of pressure gauge safety lock pin tamper seals." }
    ],
    versionHistory: [
      { year: 2022, status: "CURRENT", notes: "Harmonized with ISO 7165." }
    ],
    relatedStandards: [],
    certification: {
      isMandatory: true,
      qcoApplicable: true,
      qcoName: "Fire Fighting Equipment Quality Control Order",
      bisScheme: "Scheme-I (ISI Mark)",
      statusText: "Mandatory ISI Mark."
    },
    source: {
      portal: "BIS Standards Portal",
      url: "https://www.services.bis.gov.in/",
      lastVerified: "2026-07-28"
    }
  },
  {
    id: "is-269",
    isNumber: "IS 269: 2021",
    title: "Ordinary Portland Cement - Specification (33 Grade, 43 Grade & 53 Grade)",
    category: "Construction",
    productCategory: "Portland Cement",
    publicationYear: 2021,
    status: "CURRENT",
    relevanceScore: 88,
    explanation: "Covers 33, 43, and 53 Grade Ordinary Portland Cement (OPC) used in heavy structural reinforced concrete, flyovers, and precast infrastructure elements.",
    scope: "Specifies requirements for manufacture, chemical properties, physical tests, and packaging of OPC.",
    keyRequirements: [
      "Chemical Ratio: Lime Saturation Factor (LSF) 0.66 to 1.02",
      "Compressive Strength: 53 MPa minimum for 53 Grade at 28 days",
      "Soundness Test (Le Chatelier): Max 10 mm"
    ],
    amendments: [],
    versionHistory: [
      { year: 2021, status: "CURRENT", notes: "Unified 33, 43, 53 grades into single revised standard." }
    ],
    relatedStandards: [
      { id: "is-1489-p1", isNumber: "IS 1489 (Part 1): 2021", title: "Portland Pozzolana Cement - Flyash Based", relation: "Blended Cement Variant" }
    ],
    certification: {
      isMandatory: true,
      qcoApplicable: true,
      qcoName: "Cement Quality Control Order",
      bisScheme: "Scheme-I (ISI Mark)",
      statusText: "Mandatory Certification Required."
    },
    source: {
      portal: "BIS Standards Portal",
      url: "https://www.services.bis.gov.in/",
      lastVerified: "2026-07-14"
    }
  },
  {
    id: "is-1367-p1",
    isNumber: "IS 1367 (Part 1): 2022",
    title: "Technical Supply Conditions for Threaded Fasteners - Part 1: General Requirements",
    category: "Mechanical",
    productCategory: "Fasteners",
    publicationYear: 2022,
    status: "CURRENT",
    relevanceScore: 84,
    explanation: "Defines material quality, thread tolerances, surface finishes, and anti-corrosion galvanizing for bolts, nuts, and anchor studs in structural & pole installations.",
    scope: "Applies to bolts, screws, studs and nuts for mechanical assembly across public works.",
    keyRequirements: [
      "Property Class: 8.8, 10.9, 12.9 for high tensile bolts",
      "Hot Dip Galvanizing Coating Thickness: Minimum 45 microns",
      "Proof Load & Tensile Strength Testing"
    ],
    amendments: [],
    versionHistory: [
      { year: 2022, status: "CURRENT", notes: "Revised thread tolerance tables." }
    ],
    relatedStandards: [
      { id: "is-2062", isNumber: "IS 2062: 2021", title: "Structural Steel - Specification", relation: "Matching Structural Base" }
    ],
    certification: {
      isMandatory: false,
      qcoApplicable: false,
      bisScheme: "Scheme-I (Optional / Self-Declaration)",
      statusText: "Standard Specification (Recommended for structural tenders)"
    },
    source: {
      portal: "BIS Standards Portal",
      url: "https://www.services.bis.gov.in/",
      lastVerified: "2026-06-19"
    }
  },
  {
    id: "is-9000-p1",
    isNumber: "IS 9000 (Part 1): 2020",
    title: "Basic Environmental Testing Procedures for Electronic and Electrical Items",
    category: "Electronics",
    productCategory: "Environmental Testing",
    publicationYear: 2020,
    status: "CURRENT",
    relevanceScore: 86,
    explanation: "General environmental test framework for outdoor electronics, outdoor LED drivers, smart meters, and outdoor control panels.",
    scope: "Defines standardized environmental test procedures including cold, dry heat, damp heat, vibration, salt mist, and solar radiation testing.",
    keyRequirements: [
      "Dry Heat Test: +70°C for 16 hours",
      "Cold Test: -20°C for 16 hours",
      "Damp Heat Cyclic Test: 95% RH at 40°C",
      "Vibration (Sinusoidal): 10Hz to 55Hz, 0.75mm amplitude"
    ],
    amendments: [],
    versionHistory: [
      { year: 2020, status: "CURRENT", notes: "Re-affirmed edition." }
    ],
    relatedStandards: [
      { id: "is-10322-p5-s3", isNumber: "IS 10322 (Part 5/Sec 3): 2024", title: "Luminaires for Road and Street Lighting", relation: "Applicable Test Methodology" }
    ],
    certification: {
      isMandatory: false,
      qcoApplicable: false,
      bisScheme: "NABL Accredited Laboratory Testing Standard",
      statusText: "Reference Testing Protocol"
    },
    source: {
      portal: "BIS Standards Portal",
      url: "https://www.services.bis.gov.in/",
      lastVerified: "2026-05-11"
    }
  },
  {
    id: "is-1239-p1",
    isNumber: "IS 1239 (Part 1): 2021",
    title: "Steel Tubes, Tubulars and Other Wrought Steel Fittings - Part 1: Steel Tubes",
    category: "Mechanical",
    productCategory: "Steel Pipes",
    publicationYear: 2021,
    status: "CURRENT",
    relevanceScore: 87,
    explanation: "Covers ERW and seamless mild steel pipes for water, gas, air distribution, and lighting pole fabrications.",
    scope: "Covers requirements for screwed and socketed steel tubes and plain end steel tubes.",
    keyRequirements: [
      "Classes: Light, Medium, Heavy",
      "Hydrostatic Test Pressure: 5 MPa (50 bar)",
      "Galvanizing Zinc Coating Mass: Minimum 400 g/m²"
    ],
    amendments: [],
    versionHistory: [
      { year: 2021, status: "CURRENT", notes: "Updated tube thickness tolerances." }
    ],
    relatedStandards: [],
    certification: {
      isMandatory: true,
      qcoApplicable: true,
      qcoName: "Steel Pipes and Tubes Quality Control Order",
      bisScheme: "Scheme-I (ISI Mark)",
      statusText: "Mandatory ISI Mark."
    },
    source: {
      portal: "BIS Standards Portal",
      url: "https://www.services.bis.gov.in/",
      lastVerified: "2026-06-30"
    }
  }
];
