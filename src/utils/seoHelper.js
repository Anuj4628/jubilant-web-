/**
 * JUBILANT STEELS — CENTRAL SEO CONFIGURATION & GENERATION ENGINE
 * Produces structured SEO URLs, titles, meta descriptions, keyword mappings,
 * structured data (JSON-LD), and canonical tags across the entire website.
 */

export const SITE_CONFIG = {
  brandName: "Jubilant Steels",
  legalName: "Jubilant Steels",
  domain: "https://jubilantsteel.com",
  logoUrl: "https://jubilantsteel.com/assets/jubilant-logo.png",
  city: "Mumbai",
  state: "Maharashtra",
  country: "India",
  postalCode: "400004",
  address: "Shop No. 04, Ground Floor, 20/28, Pavanputra Building, 2nd Carpenter Street, Nanubhai Desai Road, Mumbai – 400004, Maharashtra, India",
  phone: "+91 9820171740",
  telephone: "+91 22 66394511",
  email: "info@jubilantsteel.com",
  geo: {
    latitude: 18.9554,
    longitude: 72.8226
  },
  openingHours: "Mo-Sa 09:30-19:00",
  priceRange: "$$"
};

/**
 * Intelligent location intent alternation:
 * Deterministically alternates between "manufactured-in-mumbai" and "stockist-in-mumbai"
 * based on product group, division, and category characteristics.
 */
export function getLocationIntent(groupSlug, categorySlug, divisionSlug = 'manufacturer') {
  const g = String(groupSlug || '').toLowerCase();
  const c = String(categorySlug || '').toLowerCase();
  const d = String(divisionSlug || '').toLowerCase();

  // Pure manufactured items (forged, buttweld, flanges, ferrule, dairy pharma)
  const strictlyManufacturedGroups = [
    'butt-weld-fittings',
    'forged-fittings',
    'ferrule-fittings',
    'dairy-pharma-fittings',
    'hose-pipes',
    'wire-mesh',
    'perforated-sheets'
  ];

  if (strictlyManufacturedGroups.includes(g)) {
    return {
      slug: 'manufactured-in-mumbai',
      phrase: 'Manufactured in Mumbai',
      actionVerb: 'manufactured',
      role: 'Manufacturer'
    };
  }

  // Stockist / Supplier heavy items (plates, coils, bars, circles, patapatti, rings)
  const strictlyStockistGroups = [
    'sheet-and-plates',
    'coil',
    'flat',
    'circle',
    'ring',
    'patapatti',
    'wires'
  ];

  if (strictlyStockistGroups.includes(g)) {
    return {
      slug: 'stockist-in-mumbai',
      phrase: 'Stockist in Mumbai',
      actionVerb: 'stocked and supplied',
      role: 'Stockist & Supplier'
    };
  }

  // Dual capability categories (Pipes & Tubes, Flanges, Fasteners, Rods & Bars):
  // Intelligently alternate so search engines get balanced topical coverage
  const hash = (g + c).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

  if (d === 'supplier') {
    // 60% Stockist, 40% Supplier / Manufactured
    if (hash % 3 === 0 && (g === 'pipes-tubes' || g === 'rods-and-bars')) {
      return {
        slug: 'manufactured-in-mumbai',
        phrase: 'Manufactured in Mumbai',
        actionVerb: 'manufactured and supplied',
        role: 'Manufacturer & Stockist'
      };
    }
    return {
      slug: 'stockist-in-mumbai',
      phrase: 'Stockist in Mumbai',
      actionVerb: 'stocked and supplied',
      role: 'Stockist & Supplier'
    };
  }

  // Manufacturer division default
  if (hash % 2 === 0) {
    return {
      slug: 'manufactured-in-mumbai',
      phrase: 'Manufactured in Mumbai',
      actionVerb: 'manufactured',
      role: 'Manufacturer'
    };
  } else {
    return {
      slug: 'stockist-in-mumbai',
      phrase: 'Stockist in Mumbai',
      actionVerb: 'manufactured & stocked',
      role: 'Stockist & Manufacturer'
    };
  }
}

/**
 * Clean slug sanitizer
 */
export function sanitizeSlug(str) {
  return String(str || '')
    .toLowerCase()
    .replace(/[–—]/g, '-')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Generate primary canonical SEO slug for any product category
 * Hierarchy: Material -> Grade/Spec -> Product -> Location
 * Example: stainless-steel-ss-316ti-pipes-tubes-manufactured-in-mumbai
 */
export function generateProductSeoSlug(groupSlug, category, divisionSlug = 'manufacturer') {
  if (!category) return '';

  const catSlug = category.slug || 'standard';
  const matName = category.materialName || 'Industrial Alloy';
  const grade = category.grade || '';
  const intent = getLocationIntent(groupSlug, catSlug, divisionSlug);

  // Normalize material prefix
  let matPrefix = 'steel';
  if (catSlug.includes('stainless')) {
    matPrefix = 'stainless-steel-ss';
  } else if (catSlug.includes('carbon')) {
    matPrefix = 'carbon-steel';
  } else if (catSlug.includes('alloy-steel')) {
    matPrefix = 'alloy-steel';
  } else if (catSlug.includes('super-duplex')) {
    matPrefix = 'super-duplex-steel';
  } else if (catSlug.includes('duplex')) {
    matPrefix = 'duplex-steel';
  } else if (catSlug.includes('nickel')) {
    matPrefix = 'nickel-alloy';
  } else if (catSlug.includes('titanium')) {
    matPrefix = 'titanium-alloy';
  } else if (catSlug.includes('high-alloy')) {
    matPrefix = 'high-alloy';
  } else if (catSlug.includes('exotic')) {
    matPrefix = 'exotic-superalloy';
  }

  // Extract representative grade/spec
  let gradePart = '';
  if (grade) {
    if (grade.includes('316') || grade.includes('316L')) {
      gradePart = '316l';
    } else if (grade.includes('304')) {
      gradePart = '304l';
    } else if (grade.includes('2205')) {
      gradePart = '2205';
    } else if (grade.includes('2507')) {
      gradePart = '2507';
    } else if (grade.includes('P11') || grade.includes('P22') || grade.includes('P91')) {
      gradePart = 'p11-p22-p91';
    } else if (grade.includes('A105') || grade.includes('WPB')) {
      gradePart = 'a105-wpb';
    } else if (grade.includes('Inconel') || grade.includes('Hastelloy') || grade.includes('Monel')) {
      gradePart = 'inconel-hastelloy';
    } else if (grade.includes('Grade 2') || grade.includes('Ti-6Al-4V')) {
      gradePart = 'grade-2-5';
    }
  }

  // Normalized product descriptor
  let productPart = sanitizeSlug(groupSlug);

  // Special refine for flanges (e.g. weld neck flanges)
  if (groupSlug === 'flanges' && matPrefix.includes('stainless')) {
    productPart = 'weld-neck-flanges';
  }

  // Combine pieces cleanly without repeating words
  const parts = [matPrefix, gradePart, productPart, intent.slug].filter(Boolean);
  const combined = parts.join('-');
  
  // Collapse duplicate words (e.g. 'steel-steel' or 'pipes-tubes-pipes-tubes')
  const deduped = combined
    .split('-')
    .filter((word, idx, arr) => word && (idx === 0 || word !== arr[idx - 1]))
    .join('-');

  return sanitizeSlug(deduped);
}

/**
 * Generate keyword strategy mapped specifically to a product page
 */
export function getProductKeywords(product, group) {
  const keywords = new Set();
  const gName = group.name;
  const matName = product.materialName || 'Steel';
  const grade = product.grade || '';

  // 1. Primary Product Keywords
  keywords.add(`${matName.toLowerCase()} ${gName.toLowerCase()}`);
  keywords.add(`industrial ${gName.toLowerCase()}`);

  if (matName.toLowerCase().includes('stainless')) {
    keywords.add(`stainless steel ${gName.toLowerCase()}`);
    keywords.add(`SS ${gName.toLowerCase()}`);
    keywords.add(`SS 304 ${gName.toLowerCase()}`);
    keywords.add(`SS 316 ${gName.toLowerCase()}`);
    keywords.add(`SS 316L ${gName.toLowerCase()}`);
    keywords.add(`SS 316Ti ${gName.toLowerCase()}`);
    keywords.add(`SS 310S ${gName.toLowerCase()}`);
    keywords.add(`SS 904L ${gName.toLowerCase()}`);
  } else if (matName.toLowerCase().includes('carbon')) {
    keywords.add(`carbon steel ${gName.toLowerCase()}`);
    keywords.add(`CS ${gName.toLowerCase()}`);
    keywords.add(`ASTM A105 ${gName.toLowerCase()}`);
    keywords.add(`ASTM A106 ${gName.toLowerCase()}`);
  } else if (matName.toLowerCase().includes('alloy steel')) {
    keywords.add(`alloy steel ${gName.toLowerCase()}`);
    keywords.add(`chrome moly ${gName.toLowerCase()}`);
    keywords.add(`P11 P22 P91 ${gName.toLowerCase()}`);
  } else if (matName.toLowerCase().includes('duplex')) {
    keywords.add(`duplex steel ${gName.toLowerCase()}`);
    keywords.add(`super duplex ${gName.toLowerCase()}`);
    keywords.add(`2205 duplex ${gName.toLowerCase()}`);
    keywords.add(`2507 super duplex ${gName.toLowerCase()}`);
  } else if (matName.toLowerCase().includes('nickel')) {
    keywords.add(`nickel alloy ${gName.toLowerCase()}`);
    keywords.add(`Inconel 625 ${gName.toLowerCase()}`);
    keywords.add(`Hastelloy C276 ${gName.toLowerCase()}`);
    keywords.add(`Monel 400 ${gName.toLowerCase()}`);
  }

  // 2. Location-Based Keywords
  keywords.add(`${matName.toLowerCase()} ${gName.toLowerCase()} manufacturer in Mumbai`);
  keywords.add(`${matName.toLowerCase()} ${gName.toLowerCase()} supplier in Mumbai`);
  keywords.add(`${matName.toLowerCase()} ${gName.toLowerCase()} stockist in Mumbai`);
  keywords.add(`industrial ${gName.toLowerCase()} Mumbai`);

  // 3. Long-tail Commercial Keywords
  if (gName.toLowerCase().includes('pipe') || gName.toLowerCase().includes('tube')) {
    keywords.add(`seamless pipes Mumbai`);
    keywords.add(`welded pipes Mumbai`);
    keywords.add(`stainless steel pipes manufacturer in Mumbai`);
    keywords.add(`SS 316Ti pipes stockist in Mumbai`);
  } else if (gName.toLowerCase().includes('flange')) {
    keywords.add(`forged flanges manufacturer in Mumbai`);
    keywords.add(`weld neck flanges supplier Mumbai`);
    keywords.add(`SS 310S flanges manufacturer in Mumbai`);
  } else if (gName.toLowerCase().includes('fitting')) {
    keywords.add(`butt weld fittings manufacturer in Mumbai`);
    keywords.add(`pipe fittings supplier Mumbai`);
  } else if (gName.toLowerCase().includes('fastener')) {
    keywords.add(`industrial fasteners supplier in Mumbai`);
    keywords.add(`high tensile bolts and nuts Mumbai`);
  } else if (gName.toLowerCase().includes('sheet') || gName.toLowerCase().includes('plate')) {
    keywords.add(`stainless steel sheets supplier in Mumbai`);
    keywords.add(`stainless steel plates stockist in Mumbai`);
  }

  return Array.from(keywords).slice(0, 16);
}

/**
 * Generate complete SEO Metadata for a Product Detail Page
 */
export function getProductSeoData(product, group, division) {
  if (!product || !group) return null;

  const intent = getLocationIntent(group.slug, product.slug, product.divisionSlug);
  const seoSlug = product.seoSlug || generateProductSeoSlug(group.slug, product, product.divisionSlug);
  const canonicalUrl = `${SITE_CONFIG.domain}/products/${group.slug}/${seoSlug}`;

  const gradeDisplay = product.grade ? product.grade.split('/')[0].trim() : '';
  const titleCore = `${product.name}${gradeDisplay ? ` (${gradeDisplay})` : ''}`;
  
  // SEO Title: [Product / Material / Grade / Type] | [Manufactured/Stockist] in Mumbai | Jubilant Steels
  const title = `${titleCore} | ${intent.phrase} | ${SITE_CONFIG.brandName}`;

  // SEO Meta Description (140-160 chars)
  const metaDescription = `Explore ${product.name} (Grade: ${product.grade || 'Standard'}) ${intent.actionVerb} in Mumbai by ${SITE_CONFIG.brandName}. Certified ASTM/ASME specifications, complete MTC EN 10204 3.1 & 3.2, custom sizes, ready ex-stock dispatch.`;

  // Single Page H1
  const h1 = `${product.name} ${intent.phrase}`;

  // Targeted Keywords
  const keywords = getProductKeywords(product, group);

  // Structured Data (JSON-LD)
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": product.name,
      "description": product.shortDesc || metaDescription,
      "image": product.image ? `${SITE_CONFIG.domain}${product.image}` : SITE_CONFIG.logoUrl,
      "brand": {
        "@type": "Brand",
        "name": SITE_CONFIG.brandName
      },
      "manufacturer": {
        "@type": "Organization",
        "name": SITE_CONFIG.legalName,
        "url": SITE_CONFIG.domain
      },
      "category": group.name,
      "material": product.materialName,
      "sku": product.id || seoSlug,
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "INR",
        "price": "1000",
        "lowPrice": "500",
        "highPrice": "50000",
        "offerCount": "1",
        "availability": "https://schema.org/InStock",
        "seller": {
          "@type": "Organization",
          "name": SITE_CONFIG.brandName
        }
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": `${SITE_CONFIG.domain}/`
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Products",
          "item": `${SITE_CONFIG.domain}/products`
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": group.name,
          "item": `${SITE_CONFIG.domain}/products/${group.slug}`
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": product.materialName,
          "item": `${SITE_CONFIG.domain}/materials/${product.slug}`
        },
        {
          "@type": "ListItem",
          "position": 5,
          "name": product.name,
          "item": canonicalUrl
        }
      ]
    }
  ];

  return {
    title,
    metaDescription,
    h1,
    canonicalUrl,
    keywords,
    structuredData,
    seoSlug,
    intent
  };
}

/**
 * Generate complete SEO Metadata for a Product Group / Family Page
 */
export function getProductFamilySeoData(group) {
  if (!group) return null;

  const canonicalUrl = `${SITE_CONFIG.domain}/products/${group.slug}`;
  const isManufacturer = group.divisionSlug === 'manufacturer';
  const roleText = isManufacturer ? 'Manufacturer & Exporter in Mumbai' : 'Stockist & Supplier in Mumbai';
  
  const title = `${group.name} | ${roleText} | ${SITE_CONFIG.brandName}`;
  const metaDescription = `Leading ${group.name} ${isManufacturer ? 'manufacturer and exporter' : 'stockist and supplier'} in Mumbai. Extensive inventory across stainless steel, carbon steel, duplex & nickel alloys with full MTC certifications.`;
  const h1 = `${group.name} ${isManufacturer ? 'Manufactured & Exported' : 'Stocked & Supplied'} in Mumbai`;

  const keywords = [
    `${group.name.toLowerCase()}`,
    `${group.name.toLowerCase()} manufacturer in Mumbai`,
    `${group.name.toLowerCase()} supplier in Mumbai`,
    `${group.name.toLowerCase()} stockist in Mumbai`,
    `stainless steel ${group.name.toLowerCase()}`,
    `carbon steel ${group.name.toLowerCase()}`,
    `alloy steel ${group.name.toLowerCase()}`,
    `industrial ${group.name.toLowerCase()} Mumbai`,
    `ASME B16.9 ${group.name.toLowerCase()}`,
    `Jubilant Steels Mumbai`
  ];

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": title,
      "description": metaDescription,
      "url": canonicalUrl,
      "provider": {
        "@type": "Organization",
        "name": SITE_CONFIG.brandName,
        "url": SITE_CONFIG.domain
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": `${SITE_CONFIG.domain}/`
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Products",
          "item": `${SITE_CONFIG.domain}/products`
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": group.name,
          "item": canonicalUrl
        }
      ]
    }
  ];

  return {
    title,
    metaDescription,
    h1,
    canonicalUrl,
    keywords,
    structuredData
  };
}

/**
 * Generate SEO Metadata for Material Detail Page
 */
export function getMaterialSeoData(material) {
  if (!material) return null;

  const canonicalUrl = `${SITE_CONFIG.domain}/materials/${material.slug}`;
  const title = `${material.name} Products & Grades | Stockist & Supplier in Mumbai | ${SITE_CONFIG.brandName}`;
  const metaDescription = `Certified ${material.name} stockist and supplier in Mumbai. Complete inventory of pipes, tubes, fittings, flanges, sheets, and bars in standard and exotic grades with EN 10204 3.1 & 3.2 MTC.`;
  const h1 = `${material.name} Products Stocked & Supplied in Mumbai`;

  const keywords = [
    `${material.name.toLowerCase()} supplier in Mumbai`,
    `${material.name.toLowerCase()} stockist Mumbai`,
    `${material.name.toLowerCase()} manufacturer in Mumbai`,
    `${material.name.toLowerCase()} pipes and tubes`,
    `${material.name.toLowerCase()} fittings and flanges`,
    `${material.name.toLowerCase()} sheets and plates`,
    `${material.grade || ''}`,
    `metal products supplier in Mumbai`,
    `Jubilant Steels ${material.name}`
  ];

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "ItemPage",
      "name": title,
      "description": metaDescription,
      "url": canonicalUrl,
      "provider": {
        "@type": "Organization",
        "name": SITE_CONFIG.brandName
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": `${SITE_CONFIG.domain}/`
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Materials",
          "item": `${SITE_CONFIG.domain}/materials`
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": material.name,
          "item": canonicalUrl
        }
      ]
    }
  ];

  return {
    title,
    metaDescription,
    h1,
    canonicalUrl,
    keywords,
    structuredData
  };
}

/**
 * Global Static Page SEO Data
 */
export function getStaticPageSeoData(pageKey) {
  switch (pageKey) {
    case 'about':
      return {
        title: `About Jubilant Steels | Industrial Steel Manufacturer & Exporter Mumbai`,
        metaDescription: `Learn about Jubilant Steels — premier manufacturer, exporter, and stockist of precision industrial steel pipes, fittings, flanges, and high-nickel alloys based in Mumbai, India.`,
        h1: `About Jubilant Steels — Engineering Excellence in Mumbai`,
        canonicalUrl: `${SITE_CONFIG.domain}/about`,
        keywords: [
          `about Jubilant Steels`,
          `steel manufacturer Mumbai`,
          `metal products manufacturer Mumbai`,
          `pipe fittings exporter India`,
          `ISO certified steel supplier Mumbai`
        ]
      };

    case 'certificate':
      return {
        title: `Quality Testing & Mill Test Certifications (MTC) | Jubilant Steels Mumbai`,
        metaDescription: `Quality assurance, PMI alloy verification, hydrostatic testing, and EN 10204 Type 3.1 & 3.2 Mill Test Certificates for all Jubilant Steels products in Mumbai.`,
        h1: `Quality Standards & Mill Test Certifications`,
        canonicalUrl: `${SITE_CONFIG.domain}/certificate`,
        keywords: [
          `steel quality certification Mumbai`,
          `EN 10204 3.1 MTC`,
          `PMI testing steel Mumbai`,
          `IBR certified steel supplier`,
          `third party inspection steel India`
        ]
      };

    case 'contact':
      return {
        title: `Contact Jubilant Steels | Industrial Steel Supplier & Stockyard Mumbai`,
        metaDescription: `Get in touch with Jubilant Steels in Mumbai. Commercial RFQ desk, WhatsApp inquiry (+91 9820171740), stockyard visits, and global export sales support.`,
        h1: `Contact Jubilant Steels in Mumbai`,
        canonicalUrl: `${SITE_CONFIG.domain}/contact`,
        keywords: [
          `contact Jubilant Steels`,
          `steel supplier contact Mumbai`,
          `metal products supplier Mumbai address`,
          `steel pipes RFQ Mumbai`,
          `Carpenter Street steel market Mumbai`
        ]
      };

    case 'get-code':
      return {
        title: `Request Instant Steel Quotation (RFQ) | Jubilant Steels Mumbai`,
        metaDescription: `Request a fast, competitive quotation for industrial steel pipes, fittings, flanges, and plates from Jubilant Steels. 2-hour response time with comprehensive MTC.`,
        h1: `Request an Instant Quotation (RFQ)`,
        canonicalUrl: `${SITE_CONFIG.domain}/get-code`,
        keywords: [
          `steel quotation Mumbai`,
          `request quote pipes flanges`,
          `steel price inquiry India`,
          `industrial steel RFQ desk`
        ]
      };

    case 'export':
      return {
        title: `Global Steel Export Destinations & Logistics | Jubilant Steels Mumbai`,
        metaDescription: `Exporting certified industrial piping, fittings, flanges, and alloys from Mumbai port to over 45 nations across the Middle East, Europe, Americas, and Asia.`,
        h1: `Global Steel Export Operations from Mumbai`,
        canonicalUrl: `${SITE_CONFIG.domain}/export-to`,
        keywords: [
          `steel exporter Mumbai`,
          `industrial steel exports India`,
          `pipes and fittings exporter Middle East`,
          `global steel supply Mumbai port`
        ]
      };

    case 'products':
      return {
        title: `Industrial Steel Products Catalog | Manufacturer & Stockist in Mumbai | Jubilant Steels`,
        metaDescription: `Explore our complete product catalog: Butt Weld Fittings, Flanges, Fasteners, Pipes & Tubes, Sheets, and Bars manufactured and stocked in Mumbai by Jubilant Steels.`,
        h1: `Industrial Steel Products Manufactured & Stocked in Mumbai`,
        canonicalUrl: `${SITE_CONFIG.domain}/products`,
        keywords: [
          `industrial steel products Mumbai`,
          `steel pipes and fittings manufacturer Mumbai`,
          `flanges stockist Mumbai`,
          `fasteners supplier Mumbai`,
          `Jubilant Steels product catalog`
        ]
      };

    case 'materials':
      return {
        title: `Industrial Metallurgy & Material Grades | Jubilant Steels Mumbai`,
        metaDescription: `Discover 9 industrial steel and alloy material categories: Stainless Steel, Carbon Steel, Alloy Steel, Duplex, Nickel Alloys, and Titanium stocked in Mumbai.`,
        h1: `Industrial Steel Metallurgy & Material Grades`,
        canonicalUrl: `${SITE_CONFIG.domain}/materials`,
        keywords: [
          `steel materials Mumbai`,
          `stainless steel grades India`,
          `duplex 2205 stockist Mumbai`,
          `nickel alloys supplier Mumbai`
        ]
      };

    default: // Home
      return {
        title: `Jubilant Steels | Global Steel Manufacturer, Exporter & Stockist in Mumbai`,
        metaDescription: `Jubilant Steels is a premier industrial steel manufacturer, exporter, and stockist in Mumbai, India. Supplying ASME/ASTM certified pipes, fittings, flanges, sheets, and bars worldwide.`,
        h1: `Premier Industrial Steel Manufacturer, Exporter & Stockist in Mumbai`,
        canonicalUrl: `${SITE_CONFIG.domain}/`,
        keywords: [
          `stainless steel pipes manufacturer in Mumbai`,
          `stainless steel flanges manufacturer in Mumbai`,
          `butt weld fittings manufacturer in Mumbai`,
          `industrial steel supplier Mumbai`,
          `steel stockist in Mumbai`,
          `metal products manufacturer Mumbai`,
          `Jubilant Steels`
        ]
      };
  }
}

/**
 * SEO Metadata for Division Landing Pages (/products/manufacturer, /products/supplier)
 */
export function getDivisionSeoData(divisionSlug) {
  const isMfr = divisionSlug === 'manufacturer';
  const name = isMfr ? 'Manufacturer Division' : 'Supplier Division';
  const canonicalUrl = `${SITE_CONFIG.domain}/products/${divisionSlug}`;
  const title = `${name} — ${isMfr ? 'In-House Forged & Engineered Piping Solutions' : 'Global Stockist & Mill Sourcing'} | Mumbai | ${SITE_CONFIG.brandName}`;
  const metaDescription = isMfr
    ? `Precision manufactured industrial steel pipe fittings, forged flanges, and high-tensile fasteners manufactured in Mumbai by Jubilant Steels.`
    : `Leading industrial steel stockist in Mumbai: heavy plates, coils, seamless pipes, and bars directly stocked and supplied by Jubilant Steels.`;
  const h1 = isMfr
    ? `Industrial Steel Manufacturer Division in Mumbai`
    : `Industrial Steel Supplier & Stockist Division in Mumbai`;

  return {
    title,
    metaDescription,
    h1,
    canonicalUrl,
    keywords: [
      `${name.toLowerCase()} Mumbai`,
      `${isMfr ? 'steel manufacturer Mumbai' : 'steel stockist Mumbai'}`,
      `ASME ASTM industrial steel Mumbai`,
      `Jubilant Steels ${divisionSlug}`
    ],
    structuredData: [
      {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": title,
        "description": metaDescription,
        "url": canonicalUrl,
        "provider": {
          "@type": "Organization",
          "name": SITE_CONFIG.brandName,
          "url": SITE_CONFIG.domain
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": `${SITE_CONFIG.domain}/`
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Products",
            "item": `${SITE_CONFIG.domain}/products`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": name,
            "item": canonicalUrl
          }
        ]
      }
    ]
  };
}

/**
 * Global Organization and LocalBusiness Schemas
 */
export function getGlobalSchemas() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": SITE_CONFIG.legalName,
      "alternateName": SITE_CONFIG.brandName,
      "url": SITE_CONFIG.domain,
      "logo": SITE_CONFIG.logoUrl,
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": SITE_CONFIG.phone,
          "contactType": "sales",
          "areaServed": "Global",
          "availableLanguage": ["English", "Hindi", "Gujarati"]
        },
        {
          "@type": "ContactPoint",
          "telephone": SITE_CONFIG.telephone,
          "contactType": "customer service",
          "areaServed": "India",
          "availableLanguage": ["English", "Hindi"]
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": SITE_CONFIG.legalName,
      "image": SITE_CONFIG.logoUrl,
      "url": SITE_CONFIG.domain,
      "telephone": SITE_CONFIG.telephone,
      "email": SITE_CONFIG.email,
      "priceRange": SITE_CONFIG.priceRange,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Shop No. 04, Ground Floor, 20/28, Pavanputra Building, 2nd Carpenter Street, Nanubhai Desai Road",
        "addressLocality": "Mumbai",
        "addressRegion": "Maharashtra",
        "postalCode": "400004",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": SITE_CONFIG.geo.latitude,
        "longitude": SITE_CONFIG.geo.longitude
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ],
        "opens": "09:30",
        "closes": "19:00"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": SITE_CONFIG.brandName,
      "url": SITE_CONFIG.domain,
      "potentialAction": {
        "@type": "SearchAction",
        "target": `${SITE_CONFIG.domain}/products?q={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    }
  ];
}
