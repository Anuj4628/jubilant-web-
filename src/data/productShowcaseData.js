/**
 * JUBILANT STEELS — PRODUCT SHOWCASE DATA
 * 8 Primary industrial product categories curated with verified, high-resolution imagery.
 */

import buttweldImg from '../assets/Product Images/Butt weld fit/alloy steel.jpg';
import seamlessPipesImg from '../assets/Product Images/Pipes and Tubes/carbon.png';
import flangesImg from '../assets/Product Images/Flanges/hastelloy.png';
import fastenersImg from '../assets/Product Images/Fasteners/Hastelloy.jpeg';
import pipesTubesImg from '../assets/Product Images/Pipes and Tubes/stainless steel.png';
import platesSheetsImg from '../assets/Product Images/Sheet and plates/Carbon.png';
import roundBarsImg from '../assets/Product Images/Rods and BArs/Alloy steel.png';
import specializedImg from '../assets/Product Section/Manufacturer division/Perforated sheet/stainless steel.png';

export const productShowcaseCards = [
  {
    id: '01',
    number: '01',
    title: 'Buttweld Fittings',
    description: 'Precision fittings engineered for reliable connections across demanding piping systems.',
    image: buttweldImg,
    alt: 'Industrial forged buttweld pipe elbows, tees, and reducers',
    route: '/products/manufacturer/butt-weld-fittings'
  },
  {
    id: '02',
    number: '02',
    title: 'Seamless & Welded Pipes',
    description: 'High-integrity seamless and welded pipe solutions built for high-pressure fluid conveyance.',
    image: seamlessPipesImg,
    alt: 'Heavy-duty industrial seamless steel pipes stacked in yard',
    route: '/products/supplier/pipes-tubes'
  },
  {
    id: '03',
    number: '03',
    title: 'Flanges',
    description: 'Precision-forged and machined industrial flanges manufactured to ASME, DIN and EN standards.',
    image: flangesImg,
    alt: 'Precision machined industrial weld-neck steel flange with bolt holes',
    route: '/products/manufacturer/flanges'
  },
  {
    id: '04',
    number: '04',
    title: 'Fasteners',
    description: 'High-tensile industrial bolts, nuts, studs and threaded fasteners for critical structural assemblies.',
    image: fastenersImg,
    alt: 'High-tensile industrial alloy steel fasteners, studs and hex bolts',
    route: '/products/manufacturer/fasteners'
  },
  {
    id: '05',
    number: '05',
    title: 'Pipes & Tubes',
    description: 'Corrosion-resistant stainless and alloy tubes engineered for process and heat exchanger systems.',
    image: pipesTubesImg,
    alt: 'Precision-drawn gleaming stainless steel and alloy tubing',
    route: '/products/supplier/pipes-tubes'
  },
  {
    id: '06',
    number: '06',
    title: 'Plates & Sheets',
    description: 'Heavy structural plates and cold-rolled sheets tailored for industrial fabrication and pressure vessels.',
    image: platesSheetsImg,
    alt: 'Heavy-gauge industrial rolled steel plates with mill finish',
    route: '/products/supplier/sheet-and-plates'
  },
  {
    id: '07',
    number: '07',
    title: 'Round Bars',
    description: 'High-yield alloy and stainless round bars optimized for precision machining and heavy forging.',
    image: roundBarsImg,
    alt: 'Stacked solid precision ground alloy and stainless steel round bars',
    route: '/products/supplier/rods-and-bars'
  },
  {
    id: '08',
    number: '08',
    title: 'Specialized Steel Products',
    description: 'Custom-engineered perforated sheets, wire meshes and specialized components for high-spec engineering.',
    image: specializedImg,
    alt: 'Precision laser-perforated stainless steel pattern sheets and engineered components',
    route: '/products'
  }
];
