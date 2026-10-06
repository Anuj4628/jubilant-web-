const fs = require('fs');
const path = require('path');

const targetPath = path.resolve('C:/Users/anujm/OneDrive/Desktop/Jubilant steel Web/src/data/productCatalogData.js');

// Helper to normalize material name and grade
function getMaterialInfo(filename) {
  const base = filename.replace(/\.[^/.]+$/, "").toLowerCase();
  
  if (base.includes('stainless')) {
    return {
      materialName: "Stainless Steel",
      slug: "stainless-steel",
      grade: "304 / 304L / 316 / 316L / 321 / 347 / 904L",
      shortDesc: "Premium austenitic stainless steel offering superior corrosion resistance, hygienic purity, and high structural strength."
    };
  }
  if (base.includes('super duplex') || base.includes('super_duplex')) {
    return {
      materialName: "Super Duplex Steel",
      slug: "super-duplex",
      grade: "UNS S32750 (2507) / UNS S32760 (Zeron 100)",
      shortDesc: "High PREN (>42) super duplex alloy designed for subsea risers, harsh chemical plants, and aggressive seawater environments."
    };
  }
  if (base.includes('duplex')) {
    return {
      materialName: "Duplex Steel",
      slug: "duplex",
      grade: "UNS S31803 / UNS S32205 (2205)",
      shortDesc: "Austenitic-ferritic balanced microstructure providing twice the mechanical yield strength of standard stainless steels."
    };
  }
  if (base.includes('titainium') || base.includes('titanium')) {
    return {
      materialName: "Titanium Alloys",
      slug: "titanium",
      grade: "Grade 1, Grade 2, Grade 5 (Ti-6Al-4V), Grade 7",
      shortDesc: "Exceptional strength-to-weight ratio with total immunity to sea-water pitting and chemical chloride attack."
    };
  }
  if (base.includes('nikle') || base.includes('nickel')) {
    return {
      materialName: "Nickel Alloys",
      slug: "nickel-alloys",
      grade: "Inconel 600/625, Monel 400, Hastelloy C276, Nickel 200/201",
      shortDesc: "Engineered for thermal stability and severe acid/caustic resistance under extreme temperature and pressure conditions."
    };
  }
  if (base.includes('high alloy') || base.includes('high alloys') || base.includes('high_alloy')) {
    return {
      materialName: "High Alloys",
      slug: "high-alloys",
      grade: "Sanicro 28, Alloy 20, Carpenter 20Cb-3, AL-6XN",
      shortDesc: "Specialty high-molybdenum and chromium superalloys engineered to withstand sulfuric and phosphoric acid media."
    };
  }
  if (base.includes('exotic') || base.includes('alloys')) {
    return {
      materialName: "Exotic Alloys",
      slug: "exotic-alloys",
      grade: "Tantalum, Zirconium 702, Incoloy 825, Nimonic 80A",
      shortDesc: "Rare refractory and specialty metals for nuclear reactors, aerospace defense, and advanced chemical synthesis."
    };
  }
  if (base.includes('carbon')) {
    return {
      materialName: "Carbon Steel",
      slug: "carbon-steel",
      grade: "ASTM A105, A106 Gr.B, A234 WPB, API 5L X42-X70",
      shortDesc: "Heavy-duty carbon steel with high impact toughness and structural reliability for oil, gas, and power lines."
    };
  }
  if (base.includes('alloy steel') || base.includes('alloy_steel') || base.includes('alloy stee')) {
    return {
      materialName: "Alloy Steel",
      slug: "alloy-steel",
      grade: "ASTM A335 / A234 P11, P22, P5, P9, P91, F11, F22",
      shortDesc: "Chrome-moly heat-resistant alloy steel formulated for supercritical steam systems, boilers, and refineries."
    };
  }

  // Default fallback
  const cleanName = base.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  return {
    materialName: cleanName,
    slug: base.replace(/[^a-z0-9]+/g, '-'),
    grade: "Custom Commercial Grades",
    shortDesc: `High-integrity ${cleanName} components manufactured to stringent international engineering standards.`
  };
}

// Product families metadata enriched from Supreme Catalogue
const manufacturerFamilies = [
  {
    folder: "Butt weld fit",
    slug: "butt-weld-fittings",
    name: "Butt Weld Fittings",
    tagline: "Seamless & Welded High-Integrity Pipe Fittings",
    desc: "Combining outstanding quality and value, offering a comprehensive range of Butt Weld fittings, Socket Weld fittings, and branch connection fittings. Our reputed engineering process precisely engineers these fittings in complete compliance with international quality standards (ANSI B16.9 / B16.28 / MSS SP-43).",
    types: "Elbow 90° (Long & Short Radius), 45° Elbow, 180° Return Bends, Equal Tee, Reducing Tee, Reducer (Concentric & Eccentric), Return Bends, Stub-Ends, Cap, Collar, Cross, Insert",
    specs: {
      size: "1/4\" NB TO 32\" NB (Seamless & Welded up to 48\" NB)",
      schedule: "Sch. 5S to Sch. XXS (Light, Standard, Heavy Wall)",
      standards: "ANSI B16.9, ANSI B16.28, MSS SP-43, DIN 2605, EN 10253",
      dimensions: "ANSI B-16.9 / B-16.28 Center-to-Face & Back-to-Face tolerances",
      testing: "100% Radiography (RT), Hydrostatic, Ultrasonic, Eddy Current, PMI",
      certification: "EN 10204 Type 3.1 & 3.2, IBR Test Certified",
      surfaceFinish: "Pickled & Annealed, Sand Blasted, Shot Blasted, Mirror Polished"
    },
    standardsList: ["ANSI B16.9", "ANSI B16.28", "MSS SP-43", "DIN 2605", "EN 10253", "IBR Approved", "NACE MR0175"]
  },
  {
    folder: "Dairy & Pharma Fittings",
    slug: "dairy-pharma-fittings",
    name: "Dairy & Pharma Fittings",
    tagline: "Sanitary Tube Fittings & Tri-Clover Connections",
    desc: "High-purity sanitary and aseptic fittings used for Dairy, Bio-Pharma & Food processing lines. Manufactured with welded ends and expanded ends, tri-clover ferrules, and hygienic clamps for rapid opening, clean-in-place (CIP), and sterile sealing.",
    types: "TC Bend, TC Tee, TC Reducer, TC Union, TC Clamps, TC Liner (Ferrules), Tri-Clover Standard Fittings, Valve Clamp with Ferrule, Clamp (Pipe Holding) with Coupling, Nipple & Base Plate",
    specs: {
      size: "1/2\" (15mm) OD to 12\" (300mm) OD",
      schedule: "Thickness: 16swg (1.65mm), 14swg (2.1mm), 12swg (2.6mm)",
      standards: "SMS, IDF, DIN 11850, ISO, 3A Sanitary, ASME BPE Standard",
      dimensions: "Hygienic Sanitary Tube Dimensions with Tri-Clover Clamping Profile",
      testing: "Boroscope Video Inspection, Surface Roughness Ra Verification (<0.4µm), Helium Leak Test, PMI",
      certification: "EN 10204 3.1, FDA Compliant Elastomer Gaskets (EPDM/PTFE/Silicone)",
      surfaceFinish: "Electro Polished / Mirror / Matt Finish (Internal Ra < 0.4µm)"
    },
    standardsList: ["ASME BPE", "DIN 11850", "SMS 1145", "IDF", "ISO 2852", "3A Sanitary", "FDA Approved"]
  },
  {
    folder: "Fasteners",
    slug: "fasteners",
    name: "Fasteners",
    tagline: "High-Tensile Stud Bolts, Hex Bolts, Nuts & Washers",
    desc: "ASTM specification bolting for high pressure, high temperature and cryogenic service. Complete line of full thread stud bolts, heavy hex head bolts, nuts, and precision socket screws in high tensile alloy steel, stainless steel, duplex, and exotic superalloys.",
    types: "Anchor Fasteners, Eye Bolts, Countersunk Bolts, Hex Head Bolts, Washers (Flat / Spring / Lock), Foundation Bolts, Socket Caps Screw, Stub Bolts, Refractory Anchor, Hex Nuts, Threaded Rods",
    specs: {
      size: "M6 to M100 | 1/4\" to 4\" Diameter | Lengths up to 6 Meters",
      schedule: "Metric Class 4.6, 8.8, 10.9, 12.9 | ASTM Grades B7, B7M, B16, B8, B8M, B8T, B8A, B8MA, B8TA, B6, B6X, L7; Nuts: 2H, 2HM, 4, 7, 7M, 8, 8M",
      standards: "ASTM A193 / A193M, ASTM A194 / A194M, ASTM A320, ASME B18.2.1, DIN 933/934",
      dimensions: "ANSI B18.2.1, ANSI B18.2.2 Heavy Hex Unified & Metric Series",
      testing: "Proof Load Test, Charpy V-Notch Impact, Tensile & Yield, Hardness (Brinell / Rockwell), PMI",
      certification: "EN 10204 Type 3.1 & 3.2, NACE MR0175 / ISO 15156",
      surfaceFinish: "Hot Dip Galvanized, Zinc Plated, PTFE/Xylan Fluoropolymer Coated, Cadmium Plated, Plain"
    },
    standardsList: ["ASTM A193", "ASTM A194", "ASTM A320", "ASME B18.2.1", "DIN 933/934", "NACE MR0175", "ISO 15156"]
  },
  {
    folder: "Ferrule Fitting",
    slug: "ferrule-fittings",
    name: "Ferrule Fittings",
    tagline: "Instrumentation Double & Single Ferrule Flareless Fittings",
    desc: "Hydraulic, pneumatic, ferrule & flare fittings designed for leak-proof impulse connections, instrumentation lines, sampling panels, and extreme pressure fluid circuits.",
    types: "Double Ferrule (Swagelok Type), Single Ferrule (Parker Type), DIN 2353 (Ermeto Type), Male/Female Connectors, Union Elbows, Tees, Bulkhead Unions, Crosses",
    specs: {
      size: "OD 2 mm to 50 mm (1/16\" to 2\"), NB 6mm to 40mm (1/4\" to 1 1/2\")",
      schedule: "Pressure ratings from vacuum up to 15,000 PSI (1034 Bar)",
      standards: "ASTM A276 / A479, DIN 2353, ISO 8434-1, ASME B31.3",
      dimensions: "Precision Swaged Double Ferrule Geometry with Burnished Sealing Surface",
      testing: "High-Pressure Hydraulic Proof Test, Helium Leak Test, Vibration & Impulse Test",
      certification: "EN 10204 3.1 Certified, Heat Code Traceability",
      surfaceFinish: "Silver-Plated Nut Threads, Passivated SS Finish"
    },
    standardsList: ["DIN 2353", "ISO 8434-1", "ASTM A276", "ASTM A479", "ASME B31.3", "NUPRO / Swagelok Compatible"]
  },
  {
    folder: "Flanges",
    slug: "flanges",
    name: "Flanges",
    tagline: "Forged High-Pressure Industrial Flanges",
    desc: "Complete range of forged steel flanges including Weldneck, Slip-On, Blind, Socket Weld, Lap Joint, Threaded, Reducing, Spectacle Blind, Ring Joint (RTJ), Orifice, Long Weldneck, and Deck Flanges manufactured to exact ANSI B16.5, B16.47, and British Standard BS 10.",
    types: "Weldneck, Slipon, Blind, Socket Weld, Lap Joint, Spectacles, Ring Joint (RTJ), Orifice, Long Weldneck, Deck Flange, Blank Flanges, Screwed / Threaded Flanges",
    specs: {
      size: "1/2\" NB TO 40\" NB (up to 64\" Large Diameter)",
      schedule: "Class: 150#, 300#, 400#, 600#, 900#, 1500# & 2500# | PN6 to PN400 | BS 10 Tables D, E, F, H",
      standards: "ASME B16.5, ASME B16.47 Series A & B, BS 10, EN 1092-1, DIN 2527 / 2633",
      dimensions: "ASME B16.5 Raised Face (RF 1.6mm / 6.35mm), Flat Face (FF), Ring Type Joint (RTJ)",
      testing: "100% Ultrasonic Testing (ASTM A388), Magnetic Particle, Dye Penetrant, Tensile, PMI",
      certification: "EN 10204 3.1 & 3.2 (Third-Party: TUV, DNV, Lloyd's, Bureau Veritas, RITES, IBR)",
      surfaceFinish: "Serrated Concentric or Spiral Finish (125-250 AARH), Smooth Finish"
    },
    standardsList: ["ASME B16.5", "ASME B16.47", "BS 10", "EN 1092-1", "DIN 2527", "DIN 2633", "IBR Approved", "NACE MR0175"]
  },
  {
    folder: "Forged Fittings",
    slug: "forged-fittings",
    name: "Forged Fittings",
    tagline: "High-Pressure Socket Weld & Screwed Pipe Fittings",
    desc: "Heavy industrial forged fittings manufactured per ASME B16.11 for extreme high pressure and high temperature applications. Complete range of elbows, tees, unions, couplings, and comprehensive branch outlet olets.",
    types: "Elbow 90°/45°, Tee, Union, Cross, Coupling, Half Coupling, Bushing, Plug, Swage Nipple, Welding Boss, Hexagon Nipple, Barrel Nipple, Weldolet, Elbolet, Sockolet, Thredolet, Nipolet, Letrolet",
    specs: {
      size: "1/4\" NB TO 4\" NB",
      schedule: "Pressure Rating: 2000#, 3000#, 6000#, 9000# Class",
      standards: "ASME B16.11, MSS SP-79, MSS SP-83, MSS SP-97, BS 3799",
      dimensions: "Socket Weld Bore & NPT/BSPT Threaded Dimensions per ASME B16.11",
      testing: "Hydrostatic, Pneumatic, Dye Penetrant (DP), Magnetic Particle (MPI), PMI 100%",
      certification: "EN 10204 3.1, NACE MR0175 / ISO 15156 Compliant",
      surfaceFinish: "Phosphated, Black Rust Proof Oiled, Electro-Galvanized, Pickled & Passivated"
    },
    standardsList: ["ASME B16.11", "MSS SP-79", "MSS SP-83", "MSS SP-97", "BS 3799", "NACE MR0175"]
  },
  {
    folder: "Hose Pipes",
    slug: "hose-pipes",
    name: "Hose Pipes",
    tagline: "Flexible Corrugated Metallic Braided Hoses",
    desc: "Industrial grade stainless steel and high-nickel alloy corrugated flexible hoses with single or double high-tensile wire over-braiding. Engineered to absorb pipeline thermal expansion, isolate severe equipment vibrations, and convey aggressive fluids under high pressure.",
    types: "Single Wire Braided, Double Wire Braided, Corrugated Annular Hose Assemblies with Flanged, Welded, Camlock, or Threaded End Terminations",
    specs: {
      size: "1/4\" ID to 12\" ID (6mm to 300mm Diameter)",
      schedule: "Working Pressure: Vacuum up to 250 Bar | Temperature: -200°C to +600°C",
      standards: "BS 6501 Part 1, ISO 10380 Type A, B & C",
      dimensions: "Close Pitch & Standard Pitch Corrugations with Precision Braiding Coverage",
      testing: "Proof Pressure Testing (1.5x WP), Helium Leak Detection, Burst Pressure Test",
      certification: "EN 10204 3.1 Inspection Certificate",
      surfaceFinish: "Clean Passivated SS304/SS316 Braid Finish"
    },
    standardsList: ["BS 6501", "ISO 10380", "ASME Section IX Welded", "EN 10204 3.1"]
  },
  {
    folder: "Perforated sheet",
    slug: "perforated-sheets",
    name: "Perforated Sheets",
    tagline: "Precision Punched & Slotted Industrial Screens",
    desc: "Heavy industrial perforated metallic sheets and plates in prime stainless steel, carbon steel, duplex, and exotic alloys. Formed with precision round, square, slotted, and hexagonal hole arrays for architectural, acoustic, sorting, and filtration screens.",
    types: "Round Hole (Staggered & Straight Pitch), Square Hole, Slotted Hole, Hexagonal Perforated Screens, Embossed Plates",
    specs: {
      size: "Thickness: 0.5mm to 12mm | Widths: 1000mm to 2000mm | Lengths up to 4000mm",
      schedule: "Hole Size: 0.5mm to 100mm | Open Area: 10% to 75%",
      standards: "DIN 24041, ISO 7806, ASTM E454",
      dimensions: "Uniform Pitch, Flatness Roller-Leveled, Burred/Deburred Edges",
      testing: "Hole Pitch & Diameter Laser Verification, Flatness Inspection, PMI",
      certification: "Mill Test Certificate EN 10204 3.1",
      surfaceFinish: "2B, No. 1 HRAP, Mirror Polish, Brushed / Satin Finish"
    },
    standardsList: ["DIN 24041", "ISO 7806", "ASTM E454", "EN 10204 3.1"]
  },
  {
    folder: "Wire Mesh",
    slug: "wire-mesh",
    name: "Wire Mesh",
    tagline: "Woven, Welded & Dutch Weave Filtration Cloth",
    desc: "High-precision woven wire mesh cloth in Stainless Steel, Inconel, Monel, Hastelloy, Titanium, and Duplex. Used across petrochemical refineries, pharmaceutical centrifuges, demister pads, catalyst support grids, and aerospace hydraulic filters.",
    types: "Plain Weave, Twill Weave, Plain Dutch Weave, Twill Dutch Weave, Reverse Dutch Weave, Welded Wire Mesh",
    specs: {
      size: "Mesh Count: 1 Mesh to 500 Mesh | Wire Dia: 0.025mm to 5mm",
      schedule: "Micron Rating: 2 Microns to 25mm Aperture",
      standards: "ASTM E2016, ISO 9044, DIN 1211",
      dimensions: "Roll Widths: 1m, 1.22m, 1.5m, 2m | Roll Lengths: 15m, 30m, 50m",
      testing: "Aperture Accuracy Optical Inspection, Tensile Testing, Alloy Verification",
      certification: "EN 10204 3.1 Compliance",
      surfaceFinish: "Bright Annealed, Clean Degreased Finish"
    },
    standardsList: ["ASTM E2016", "ISO 9044", "DIN 1211", "EN 10204 3.1"]
  }
];

const supplierFamilies = [
  {
    folder: "Circle",
    slug: "circle",
    name: "Circle",
    tagline: "Precision Cold-Sheared, Plasma & Laser-Cut Circles",
    desc: "Prime quality circular blanks and discs cut from prime hot rolled and cold rolled stainless steel, carbon steel, duplex, and nickel alloy plates. Sourced directly from major mills with complete EN 10204 3.1 certification for pressure vessel dish ends, flanges, and machinery parts.",
    types: "Cold Sheared Circles, CNC Plasma Cut, High-Precision Laser Cut, Waterjet Cut, Machined Edge Blanks",
    specs: {
      size: "Diameter: 50mm to 3000mm | Thickness: 0.5 mm to 200 mm",
      schedule: "Edge Finish: Laser Clean Edge, Waterjet Smooth, Sheared, Machine Beveled",
      standards: "ASTM A240, ASME SA240, DIN 17440, EN 10088-2",
      dimensions: "Diameter Tolerance: ±0.5mm to ±2mm depending on cutting method",
      testing: "100% Ultrasonic Testing (ASTM A578 Level II), Dimensional Check, PMI",
      certification: "Direct Mill Origin MTC EN 10204 3.1, NACE MR 01-75",
      surfaceFinish: "No. 1 HRAP, 2B, Mirror Finish, Shot Blasted"
    },
    standardsList: ["ASTM A240", "ASME SA240", "DIN 17440", "EN 10088-2", "NACE MR0175"]
  },
  {
    folder: "Coil",
    slug: "coil",
    name: "Coil",
    tagline: "Hot Rolled & Cold Rolled Prime Slit Coils",
    desc: "Direct mill sourced stainless steel, carbon steel, duplex, and high-nickel alloy coils. Available in mother coils or custom precision slitted widths with paper interleaving or PVC protective film.",
    types: "Hot Rolled (HR / No. 1) Coils, Cold Rolled (CR / 2B / BA) Coils, Precision Slit Coils, Baby Coils",
    specs: {
      size: "Thickness: 0.1mm to 12mm | Width: 10mm to 2000mm",
      schedule: "Edge: Slit Edge, Mill Edge, Deburred Round Edge",
      standards: "ASTM A240, ASTM A480, EN 10088-2, JIS G4305",
      dimensions: "Coil ID: 508mm / 610mm; Coil OD: up to 1800mm",
      testing: "Mechanical Tensile, Yield, Elongation, Surface Roughness, PMI",
      certification: "Direct Mill Origin MTC EN 10204 3.1",
      surfaceFinish: "2B, BA (Bright Annealed), No. 4 Hairline, Scotch Brite, No. 1 HRAP"
    },
    standardsList: ["ASTM A240", "ASTM A480", "EN 10088-2", "JIS G4305", "EN 10204 3.1"]
  },
  {
    folder: "flat",
    slug: "flat",
    name: "Flat Bars",
    tagline: "Hot Rolled Annealed & Cold Drawn Flat Bars",
    desc: "Commercial and structural flat bars manufactured by shearing from prime plate or hot-rolling followed by pickling and cold drawing for sharp corners, clean edges and tight dimensional tolerances.",
    types: "HRAP Flat Bars (Hot Rolled Annealed & Pickled), Cold Drawn Flats, Slit & Edge-Rolled Flats",
    specs: {
      size: "Width: 10mm to 300mm | Thickness: 3mm to 50mm | Length: 3m to 6m",
      schedule: "Sizes: 20mm to 150mm in Thk 3mm to 12mm; Channels: 20mm to 500mm, Thk 3mm to 50mm",
      standards: "ASTM A276, ASTM A479, DIN 1017, EN 10058, AISI",
      dimensions: "DIN 1017 Width/Thickness Tolerances, Sharp 90° Edge Profile",
      testing: "Straightness Verification, Hardness Test, Microstructure, Tensile, PMI",
      certification: "EN 10204 3.1 Certified",
      surfaceFinish: "Pickled & Annealed (HRAP), Cold Drawn Bright Polish"
    },
    standardsList: ["ASTM A276", "ASTM A479", "DIN 1017", "EN 10058", "EN 10204 3.1"]
  },
  {
    folder: "Patapatti",
    slug: "patapatti",
    name: "Patapatti / Strips",
    tagline: "Precision Narrow Slit Strips & Continuous Patti",
    desc: "Custom-slit narrow strips and patapatti with burr-free edges, uniform thickness, and consistent temper. Essential for cable trays, earthing strips, clamping brackets, gasket inner cores, and architectural trims.",
    types: "Cut-to-Length Patapatti, Continuous Roll Strips, Deburred Edge Patti, Annealed Soft Strips",
    specs: {
      size: "Width: 12mm to 150mm | Thickness: 0.8mm to 6mm | Length: 2m to 6m & Coils",
      schedule: "Slit & Deburred Edges with Smooth Radius",
      standards: "ASTM A240, ASTM A480, DIN 17440, EN 10088-2",
      dimensions: "Width Tolerance: ±0.1mm; Camber: max 1.5mm/meter",
      testing: "Edge Camber & Burr Check, Bend Test, Tensile, PMI",
      certification: "EN 10204 3.1 Mill Test Report",
      surfaceFinish: "2B, HRAP, Matt / Hairline Finished"
    },
    standardsList: ["ASTM A240", "ASTM A480", "DIN 17440", "EN 10088-2", "EN 10204 3.1"]
  },
  {
    folder: "Pipes and Tubes",
    slug: "pipes-tubes",
    name: "Pipes & Tubes",
    tagline: "Seamless, Welded & Heat Exchanger Tubing",
    desc: "Extensive inventory of heavy-wall seamless line pipes, heat exchanger tubes, boiler tubes, and large-diameter welded pipes. Conforming strictly to ASTM A312, A358, A335, A106, A790, A213, A269, and API 5L per ANSI B36.19 and ANSI B36.10 dimensions.",
    types: "Seamless Pipes, Welded (ERW / EFW / LSAW) Pipes, Heat Exchanger U-Tubes, Hydraulic Tubing, Capillary Tubes, IBR Boiler Tubes",
    specs: {
      size: "Pipes: 1/2\" to 36\" NB (up to 48\" EFW); Tubes: 6 mm OD to 355.60 mm OD",
      schedule: "Pipes: Sch. 5 to Sch. XXS (Light to Heavy Wall); Tubes: 0.6mm - 10mm (22 SWG/BWG to 10 SWG/BWG)",
      standards: "ASTM A312, ASTM A358, ASTM A335 (P5, P9, P11, P12, P22, P91), ASTM A106 Gr. B, ASTM A53, ASTM A790 (UNS S31803, S32750, S32760), API 5L (X42-X70), ASTM A213, ASTM A269",
      dimensions: "ANSI B36.19M (Stainless), ANSI B36.10M (Carbon & Alloy Steel)",
      testing: "100% Eddy Current, Hydrostatic up to 400 Bar, Ultrasonic, Flattening & Flaring, Charpy V-Notch Impact, PMI",
      certification: "EN 10204 3.1 & 3.2, IBR Approved with Form III-C",
      surfaceFinish: "Pickled & Passivated, Bright Annealed (BA), 320 Grit Mirror Polish, Black Varnished"
    },
    standardsList: ["ASTM A312", "ASTM A335", "ASTM A106", "ASTM A790", "API 5L", "ASTM A213", "ASTM A269", "ANSI B36.19", "ANSI B36.10", "IBR Approved", "NACE MR0175"]
  },
  {
    folder: "Ring",
    slug: "ring",
    name: "Ring",
    tagline: "Seamless Forged & Rolled Rings",
    desc: "Heavy seamless forged and rolled rings for pressure vessel nozzles, bearing races, wind turbine slew rings, and high-temperature rotary equipment. Sourced directly from Tier-1 certified forging mills with close-tolerance machining allowances.",
    types: "Seamless Rolled Rings, Forged Discs with ID Bore, Contoured Rolled Rings, Bearing Race Blanks",
    specs: {
      size: "Outer Diameter: 100mm to 4000mm | Height up to 800mm | Weight up to 10,000 Kg",
      schedule: "Proof Machined & Finished Machined Condition",
      standards: "ASTM A182, ASTM A105, DIN 17243, EN 10222, ASME Section VIII",
      dimensions: "Close Forging Tolerances with Minimal Machining Clean-Up Allowance",
      testing: "100% Ultrasonic Testing per ASTM A388, Liquid Penetrant, Tensile, Hardness, PMI",
      certification: "EN 10204 3.1 & 3.2 Certified",
      surfaceFinish: "Proof Machined, Shot Blasted, Smooth Turned"
    },
    standardsList: ["ASTM A182", "ASTM A105", "DIN 17243", "EN 10222", "ASME Section VIII", "EN 10204 3.1"]
  },
  {
    folder: "Rods and BArs",
    slug: "rods-and-bars",
    name: "Rods & Bars",
    tagline: "Round, Hexagonal & Square Solid Bars & Wire Ropes",
    desc: "Comprehensive stock of bright and black solid round bars, hex bars, and square bars. Available in peeled, smooth turned, centerless ground, and cold drawn conditions for precision machining, shafting, and structural components.",
    types: "Bright Round Bars (Cold Drawn & Ground), Black Bars (Hot Rolled / Forged), Hexagonal Bars, Square Bars, Wire Ropes (SS304/SS316)",
    specs: {
      size: "Bright Bars: 2mm to 350mm Dia; Black Bars: 16mm to 350mm Dia; Hex: 5mm to 150mm; Square: 5mm to 250mm | Wire Ropes: 1mm to 40mm",
      schedule: "Tolerances: h8, h9 (Din 671), h11 (ASTM A484), k12/k13 (Din 1013); Lengths: 3m to 6.5m (10ft to 22ft)",
      standards: "ASTM A276, ASTM A479, ASTM A484, ASTM A182, DIN 1013, EN 10088-3",
      dimensions: "Peeled Centerless Ground, Cold Drawn Polished, Forged Rough Turned",
      testing: "100% Ultrasonic Testing (ASTM A388 / SEP 1921), Tensile, Elongation, Hardness, PMI",
      certification: "EN 10204 3.1 MTC, IBR Certified",
      surfaceFinish: "Centerless Ground & Polished, Bright Drawn, Peeled & Pickled, Black Forged"
    },
    standardsList: ["ASTM A276", "ASTM A479", "ASTM A484", "ASTM A182", "DIN 1013", "EN 10088-3", "IBR Approved"]
  },
  {
    folder: "Sheet and plates",
    slug: "sheet-and-plates",
    name: "Sheets & Plates",
    tagline: "Hot Rolled Heavy Plates & Cold Rolled Sheets",
    desc: "Mill prime sheets and heavy engineering plates in thicknesses from 0.5 mm to 200 mm. Sourced from globally renowned steelmakers for pressure vessels, boilers, chemical storage tanks, cryogenic storage, and offshore fabrication.",
    types: "Hot Rolled Plates, Cold Rolled Sheets, Boiler Quality Plates, Chequered / Floor Plates, Shims",
    specs: {
      size: "Thickness: 0.5 mm to 200 mm | Widths: 1000 mm to 2500 mm | Lengths: 2500 mm to 12500 mm",
      schedule: "Standards: ASTM A240, ASTM A387 (Gr. 2, 5, 9, 11, 12, 22 Class 1 & 2), ASTM A204 (Gr. A & B), ASTM A516 (Gr. 60 & 70), ASTM A515 Gr. 70, IS 2062 / ASTM A36",
      standards: "ASTM A240, ASME SA240, ASTM A387, ASTM A516, IS 2062, DIN 17175 Gr. 15Mo3 & 16Mo3",
      dimensions: "Widths: 1000mm, 1250mm, 1500mm, 2000mm, 2500mm | Lengths up to 12.5m with NACE MR 01-75",
      testing: "100% Ultrasonic Test per ASTM A435 / A578 Level II, Charpy V-Notch Impact, Tensile, Bend, PMI",
      certification: "EN 10204 3.1 & 3.2 Mill Certificate, IBR Test Certificate with Form IV",
      surfaceFinish: "No. 1 HRAP, 2B Cold Rolled, No. 4 Satin, BA Mirror Finish"
    },
    standardsList: ["ASTM A240", "ASME SA240", "ASTM A387", "ASTM A516", "IS 2062", "DIN 17175", "IBR Approved", "NACE MR0175"]
  },
  {
    folder: "Wires",
    slug: "wires",
    name: "Wires",
    tagline: "Industrial Spring Wires, TIG/MIG Welding & Tie Wires",
    desc: "Prime quality industrial wire coils and welding filler wires in Stainless Steel, Inconel, Monel, Hastelloy, Titanium, and Duplex. Sourced for springs, wire ropes, braiding, mesh weaving, and high-strength fasteners.",
    types: "Spring Hard Wire, Annealed Soft Tie Wire, TIG Welding Rods, MIG Wire Spools, Cold Heading Wire",
    specs: {
      size: "Diameter: 0.1mm to 12.0mm | Welding Electrodes: 2.6mm to 4.0mm Dia",
      schedule: "Temper: Soft Annealed, 1/4 Hard, 1/2 Hard, Full Hard, Spring Hard",
      standards: "ASTM A313, ASTM A580, AWS A5.9, DIN 17224, EN 10270-3",
      dimensions: "Precision Drawn Wire with Uniform Cast and Helix Tolerance",
      testing: "Tensile Strength, Wrap Test, Torsion Test, Bend Test, Chemical Check, PMI",
      certification: "EN 10204 3.1 Compliance",
      surfaceFinish: "Bright Drawn, Matte Soap Coated, Electrolytic Bright"
    },
    standardsList: ["ASTM A313", "ASTM A580", "AWS A5.9", "DIN 17224", "EN 10270-3", "EN 10204 3.1"]
  }
];


// Let's generate the code string
const mBaseDir = 'C:/Users/anujm/OneDrive/Desktop/Jubilant steel Web/src/assets/Product Section/Manufacturer division';
const sBaseDir = 'C:/Users/anujm/OneDrive/Desktop/Jubilant steel Web/src/assets/Product Section/Supplier division';

let importStatements = [];
let varCounter = 0;

function buildDivisionData(divisionName, divisionSlug, families, baseDir) {
  const resultFamilies = [];

  for (const fam of families) {
    const famPath = path.join(baseDir, fam.folder);
    const files = fs.readdirSync(famPath).filter(f => !fs.statSync(path.join(famPath, f)).isDirectory());
    
    // Choose hero / collage image: prefer file with 'collage' or 'stainless' or first file
    let heroFile = files.find(f => f.toLowerCase().includes('collage')) ||
                   files.find(f => f.toLowerCase().includes('stainless')) ||
                   files[0];
    
    const heroVar = `img_${divisionSlug}_${fam.slug.replace(/-/g, '_')}_hero`;
    const relHeroPath = `../assets/Product Section/${divisionName}/${fam.folder}/${heroFile}`;
    importStatements.push(`import ${heroVar} from ${JSON.stringify(relHeroPath)};`);

    const categories = [];

    for (const file of files) {
      if (file.toLowerCase().includes('collage') && files.length > 1) {
        continue; // Keep collage as group hero, not an individual material
      }

      const matInfo = getMaterialInfo(file);
      const imgVar = `img_${divisionSlug}_${fam.slug.replace(/-/g, '_')}_${matInfo.slug.replace(/-/g, '_')}_${varCounter++}`;
      const relImgPath = `../assets/Product Section/${divisionName}/${fam.folder}/${file}`;
      importStatements.push(`import ${imgVar} from ${JSON.stringify(relImgPath)};`);

      categories.push({
        id: `${fam.slug}-${matInfo.slug}`,
        slug: matInfo.slug,
        name: `${matInfo.materialName} ${fam.name}`,
        materialName: matInfo.materialName,
        grade: matInfo.grade,
        imageVar: imgVar,
        shortDesc: matInfo.shortDesc,
        specs: fam.specs,
        standards: [
          "ASTM", "ASME", "DIN", "ISO", "EN", "IBR Certified"
        ]
      });
    }

    resultFamilies.push({
      id: `${divisionSlug}-${fam.slug}`,
      slug: fam.slug,
      name: fam.name,
      division: divisionSlug === 'manufacturer' ? 'Manufacturer Division' : 'Supplier Division',
      divisionSlug: divisionSlug,
      tagline: fam.tagline,
      shortDesc: fam.desc,
      heroImageVar: heroVar,
      specs: fam.specs,
      categoriesCount: categories.length,
      categories: categories
    });
  }

  return resultFamilies;
}

const mFamiliesData = buildDivisionData('Manufacturer division', 'manufacturer', manufacturerFamilies, mBaseDir);
const sFamiliesData = buildDivisionData('Supplier division', 'supplier', supplierFamilies, sBaseDir);

console.log(`Generated ${importStatements.length} image imports.`);

// Now let's construct the final file content
let output = `// ======================================================================
// JUBILANT STEELS — CENTRAL PRODUCT CATALOG DATABASE
// Dedicated Single Source of Truth for Manufacturer & Supplier Divisions
// ======================================================================

${importStatements.join('\n')}

export const DIVISIONS = {
  manufacturer: {
    id: "manufacturer",
    slug: "manufacturer",
    name: "Manufacturer Division",
    badge: "MANUFACTURER",
    tagline: "In-House Precision Forged & Engineered Piping Solutions",
    description: "Manufactured products engineered in-house to satisfy extreme industrial pressures, corrosive chemistry, and strict global engineering codes (ASME, ASTM, DIN, ISO, EN).",
    features: [
      "Precision In-House Forging, Cold Forming & Pressing",
      "100% PMI, Ultrasonic & Hydrostatic Non-Destructive Testing",
      "Full Material Heat Traceability with EN 10204 3.1 & 3.2 MTC",
      "Custom High-Pressure & Exotic Superalloy Production"
    ]
  },
  supplier: {
    id: "supplier",
    slug: "supplier",
    name: "Supplier Division",
    badge: "SUPPLIER",
    tagline: "Global Stockist & Direct Mill Sourcing Network",
    description: "A comprehensive range of high-performance industrial steel, exotic alloys, heavy engineering plates, precision tubing, coils, and bars sourced directly from Tier-1 certified international mills.",
    features: [
      "Immediate Stock Availability for Rapid Global Dispatch",
      "Direct Mill Sourcing with Complete Origin Documentation",
      "Cut-to-Size & Custom Processing Services Available",
      "Worldwide Export Logistics to Over 45 Industrial Nations"
    ]
  }
};

export const PRODUCT_GROUPS = [
`;

function serializeGroup(g) {
  return `  {
    id: ${JSON.stringify(g.id)},
    slug: ${JSON.stringify(g.slug)},
    name: ${JSON.stringify(g.name)},
    division: ${JSON.stringify(g.division)},
    divisionSlug: ${JSON.stringify(g.divisionSlug)},
    tagline: ${JSON.stringify(g.tagline)},
    shortDesc: ${JSON.stringify(g.shortDesc)},
    heroImage: ${g.heroImageVar},
    specs: ${JSON.stringify(g.specs, null, 6)},
    categoriesCount: ${g.categories.length},
    categories: [
${g.categories.map(c => `      {
        id: ${JSON.stringify(c.id)},
        slug: ${JSON.stringify(c.slug)},
        name: ${JSON.stringify(c.name)},
        materialName: ${JSON.stringify(c.materialName)},
        grade: ${JSON.stringify(c.grade)},
        image: ${c.imageVar},
        shortDesc: ${JSON.stringify(c.shortDesc)},
        specs: ${JSON.stringify(c.specs)},
        standards: ${JSON.stringify(c.standards)}
      }`).join(',\n')}
    ]
  }`;
}

const allSerialized = [...mFamiliesData, ...sFamiliesData].map(serializeGroup).join(',\n');
output += allSerialized + '\n];\n\n';

output += `// ----------------------------------------------------------------------
// Query Helpers
// ----------------------------------------------------------------------

export function getDivisionData(divisionSlug) {
  const clean = String(divisionSlug || '').toLowerCase().trim();
  const division = DIVISIONS[clean];
  if (!division) return null;
  const groups = PRODUCT_GROUPS.filter(g => g.divisionSlug === clean);
  return { division, groups };
}

export function getAllProductGroups(divisionSlug = null) {
  if (!divisionSlug) return PRODUCT_GROUPS;
  const clean = String(divisionSlug).toLowerCase().trim();
  return PRODUCT_GROUPS.filter(g => g.divisionSlug === clean);
}

export function getProductGroup(arg1, arg2) {
  if (!arg1) return null;
  if (!arg2) {
    const cleanGroup = String(arg1).toLowerCase().trim();
    return PRODUCT_GROUPS.find(g => g.slug === cleanGroup) || null;
  }
  const cleanDiv = String(arg1).toLowerCase().trim();
  const cleanGroup = String(arg2).toLowerCase().trim();
  return (
    PRODUCT_GROUPS.find(
      g => g.divisionSlug === cleanDiv && g.slug === cleanGroup
    ) || PRODUCT_GROUPS.find(g => g.slug === cleanGroup) || null
  );
}

export function getProductCategory(arg1, arg2, arg3) {
  let group, catSlug;
  if (!arg3) {
    group = getProductGroup(arg1);
    catSlug = arg2;
  } else {
    group = getProductGroup(arg1, arg2);
    catSlug = arg3;
  }
  if (!group) return null;
  const cleanCat = String(catSlug).toLowerCase().trim();
  const category = (group.categories || []).find(c => c.slug === cleanCat);
  if (!category) return null;

  return {
    group,
    category,
    ...category,
    groupName: group.name,
    groupSlug: group.slug,
    division: group.division,
    divisionSlug: group.divisionSlug
  };
}

export function getRelatedProducts(arg1, arg2, limit = 4) {
  let groupSlug, categorySlug;
  if (typeof arg1 === 'object' && arg1 !== null) {
    groupSlug = arg1.groupSlug;
    categorySlug = arg1.slug;
    limit = typeof arg2 === 'number' ? arg2 : 4;
  } else {
    groupSlug = arg1;
    categorySlug = arg2;
  }

  const cleanGroup = String(groupSlug || '').toLowerCase().trim();
  const cleanCat = String(categorySlug || '').toLowerCase().trim();

  const sameGroup = [];
  const otherGroups = [];

  for (const group of PRODUCT_GROUPS) {
    for (const cat of group.categories || []) {
      if (group.slug === cleanGroup && cat.slug === cleanCat) {
        continue;
      }
      const item = {
        ...cat,
        groupName: group.name,
        groupSlug: group.slug,
        division: group.division,
        divisionSlug: group.divisionSlug
      };
      if (group.slug === cleanGroup) {
        sameGroup.push(item);
      } else {
        otherGroups.push(item);
      }
    }
  }

  return [...sameGroup, ...otherGroups].slice(0, limit);
}

export function searchCatalog(query = "") {
  const q = String(query).toLowerCase().trim();
  if (!q) return [];

  const results = [];
  for (const group of PRODUCT_GROUPS) {
    if (group.name.toLowerCase().includes(q) || group.shortDesc.toLowerCase().includes(q)) {
      results.push({
        type: "group",
        title: group.name,
        subtitle: group.tagline,
        url: \`/products/\${group.divisionSlug}/\${group.slug}\`,
        division: group.division,
        image: group.heroImage
      });
    }

    for (const cat of group.categories || []) {
      if (
        cat.name.toLowerCase().includes(q) ||
        cat.materialName.toLowerCase().includes(q) ||
        cat.grade.toLowerCase().includes(q) ||
        cat.shortDesc.toLowerCase().includes(q)
      ) {
        results.push({
          type: "product",
          title: cat.name,
          subtitle: \`\${group.name} • \${cat.grade}\`,
          url: \`/products/\${group.divisionSlug}/\${group.slug}/\${cat.slug}\`,
          division: group.division,
          image: cat.image
        });
      }
    }
  }

  return results.slice(0, 12);
}
`;

fs.writeFileSync(targetPath, output, 'utf8');
console.log('Successfully written productCatalogData.js! Size:', fs.statSync(targetPath).size);
