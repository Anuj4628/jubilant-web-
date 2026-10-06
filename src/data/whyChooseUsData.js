/**
 * JUBILANT STEELS — WHY CHOOSE US / VALUE PROPOSITION DATA
 * Dedicated Single Source of Truth for the Value Proposition Section.
 * Completely isolated from existing website data structures.
 */

import precisionImg from '../assets/Serving Global Mission-Critical Sectors/precision industrial piping.png';
import qualityImg from '../assets/images/from-steel-to-supply.jpg';
import logisticsImg from '../assets/images/slide-5.jpg';
import metallurgyImg from '../assets/Serving Global Mission-Critical Sectors/petrochemical.png';
import customImg from '../assets/Serving Global Mission-Critical Sectors/heavt engineering.png';
import partnershipImg from '../assets/images/contact-hero.png';

export const whyChooseUsData = {
  sectionHeader: {
    eyebrow: "THE JUBILANT BENCHMARK",
    title: "Engineered To Be Trusted.",
    subtitle: "Precision-engineered industrial metals with verified traceability, rapid global dispatch, and unwavering technical reliability."
  },

  valuePropositions: [
    {
      id: "precision",
      number: "01",
      badge: "TOLERANCE & FIT",
      title: "Precision That Performs",
      description: "CNC-machined within ±0.02mm tolerance for zero-rework weld fit-up on site.",
      specs: ["< ±0.02mm Tolerance", "100% Optical CMM", "Weld-Ready Bevels"],
      image: precisionImg,
      alt: "Precision industrial piping with optical inspection",
      hudBadge: "TOLERANCE < ±0.02mm",
      isoStandard: "ASME B16.9 / ASTM"
    },
    {
      id: "quality",
      number: "02",
      badge: "TRACEABILITY & LAB",
      title: "Certified Metallurgical Integrity",
      description: "100% heat traceability with EN 10204 3.1 & 3.2 mill test certifications on all dispatches.",
      specs: ["EN 10204 3.1 & 3.2 MTC", "100% Spectro PMI", "Hydrostatic Tested"],
      image: qualityImg,
      alt: "Metallurgical quality laboratory testing and verification",
      hudBadge: "100% HEAT TRACEABLE // MTC 3.1",
      isoStandard: "EN 10204 / NACE"
    },
    {
      id: "logistics",
      number: "03",
      badge: "GLOBAL SUPPLY",
      title: "Ready Stock & Swift Logistics",
      description: "Multi-ton ready stock staged for rapid domestic supply and export to 45+ countries.",
      specs: ["Ready Mill Inventory", "ISPM-15 Crating", "45+ Destination Ports"],
      image: logisticsImg,
      alt: "Global industrial steel warehouse and distribution hub",
      hudBadge: "EXPORT READY // 45+ COUNTRIES",
      isoStandard: "IBR / ISPM-15"
    },
    {
      id: "metallurgy",
      number: "04",
      badge: "ALLOY SPECTRUM",
      title: "Exotic Alloys & Severe Grades",
      description: "Comprehensive supply across 25+ grades: Inconel, Hastelloy, Monel, Titanium & Duplex.",
      specs: ["25+ Certified Grades", "-196°C to +1150°C", "Severe Acid Service"],
      image: metallurgyImg,
      alt: "Refinery and petrochemical severe service alloy installation",
      hudBadge: "25+ ALLOY GRADES // SEVERE SERVICE",
      isoStandard: "ASTM / ASME SB"
    },
    {
      id: "custom",
      number: "05",
      badge: "FABRICATION",
      title: "Bespoke Dimensions & Forgings",
      description: "Heavy forged rings, custom flanges, and non-standard wall thicknesses to exact drawings.",
      specs: ["Up to 72\" Custom NB", "High-Pressure 9000#", "Custom Drawing Specs"],
      image: customImg,
      alt: "Heavy forging press shaping custom industrial alloy component",
      hudBadge: "CUSTOM DRAWING FABRICATION",
      isoStandard: "ASME SEC VIII"
    },
    {
      id: "partnership",
      number: "06",
      badge: "TECHNICAL DESK",
      title: "Dedicated Project Engineering",
      description: "Direct collaboration with senior metallurgists, 24h RFQ turnaround, and transparent supply.",
      specs: ["24-Hour RFQ SLA", "Senior Metallurgists", "ISO 9001:2015"],
      image: partnershipImg,
      alt: "Engineers reviewing technical pipeline specifications",
      hudBadge: "DEDICATED PROJECT DESK // 24H SLA",
      isoStandard: "ISO 9001:2015"
    }
  ],

  trustMetrics: [
    {
      id: "mtc",
      value: "100%",
      label: "MTC 3.1 Traceability",
      description: "Complete Mill Test Certificates with Spectro Chemical & Mechanical Proof"
    },
    {
      id: "alloys",
      value: "25+",
      label: "Metallurgical Grades",
      description: "Carbon, Stainless, Duplex, Inconel, Hastelloy, Monel & Titanium"
    },
    {
      id: "tolerance",
      value: "< ±0.02mm",
      label: "Precision Tolerancing",
      description: "CNC Beveling & Dimensional Inspection for Zero-Rework Site Fit-Up"
    },
    {
      id: "exports",
      value: "45+",
      label: "Export Destinations",
      description: "Trusted by Energy, Marine, Nuclear & Petrochemical Contractors Globally"
    }
  ]
};
