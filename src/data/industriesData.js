/**
 * JUBILANT STEELS — INDUSTRIES DATA
 * Dedicated data structure for the Industries Section.
 * Completely separated from the UI component.
 */

import aerospaceImg from '../assets/Serving Global Mission-Critical Sectors/aerospace and defence.png';
import heavyEngineeringImg from '../assets/Serving Global Mission-Critical Sectors/heavt engineering.png';
import marineImg from '../assets/Serving Global Mission-Critical Sectors/marine.png';
import nuclearPowerImg from '../assets/Serving Global Mission-Critical Sectors/nuclear and thermal power.png';
import petrochemicalImg from '../assets/Serving Global Mission-Critical Sectors/petrochemical.png';
import precisionPipingImg from '../assets/Serving Global Mission-Critical Sectors/precision industrial piping.png';

export const industriesHeader = {
  eyebrow: "MISSION-CRITICAL APPLICATIONS",
  title: "Engineering Materials For Critical Industries",
  description: "Supplying certified high-performance alloys and precision-machined steel components to global infrastructure and engineering sectors where material reliability is paramount."
};

export const industriesList = [
  {
    id: "petrochemical-refineries",
    name: "Petrochemical & Refineries",
    description: "Severe-service alloys engineered for extreme temperature and aggressive corrosive media.",
    image: petrochemicalImg,
    alt: "Industrial distillation columns and severe-service petrochemical refinery piping"
  },
  {
    id: "nuclear-thermal-power",
    name: "Nuclear & Thermal Power",
    description: "Ultra-pure reactor-grade alloys and high-pressure superheater tubes with 100% heat traceability.",
    image: nuclearPowerImg,
    alt: "Nuclear and thermal power plant piping and high-pressure alloy heat exchanger systems"
  },
  {
    id: "marine-offshore",
    name: "Marine & Offshore",
    description: "Duplex, super duplex, and copper-nickel piping built to resist seawater corrosion and subsea pressures.",
    image: marineImg,
    alt: "Offshore oil platform and marine subsea piping fabrication"
  },
  {
    id: "aerospace-defense",
    name: "Aerospace & Defense",
    description: "Certified superalloys and titanium components for mission-critical propulsion and defense infrastructure.",
    image: aerospaceImg,
    alt: "High-temperature titanium and superalloy aerospace manufacturing and propulsion systems"
  },
  {
    id: "heavy-engineering",
    name: "Heavy Engineering",
    description: "High-yield structural steels, boiler plates, and forged shafts for massive industrial machinery.",
    image: heavyEngineeringImg,
    alt: "Heavy engineering hydraulic press and high-tonnage forged steel components"
  },
  {
    id: "precision-industrial-piping",
    name: "Precision Industrial Piping",
    description: "Tight-tolerance instrumentation tubing and double-ferrule connections for critical chemical lines.",
    image: precisionPipingImg,
    alt: "Precision industrial piping system with optical dimensional calibration"
  }
];
