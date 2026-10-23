import { useEffect } from 'react';
import { SITE_CONFIG, getGlobalSchemas } from '../../utils/seoHelper';

/**
 * Universal SEO Meta Tag & Structured Data Injector
 * Dynamically keeps the HTML <head> synchronized with current route context.
 */
export default function SEOHead({
  title,
  metaDescription,
  canonicalUrl,
  keywords = [],
  structuredData = null,
  ogImage = null,
  ogType = 'website'
}) {
  useEffect(() => {
    // 1. Page Title
    if (title) {
      document.title = title;
    }

    // Helper to set or update meta tag
    const setMetaTag = (attributeName, attributeValue, content) => {
      if (!content) return;
      let el = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attributeName, attributeValue);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // Helper to set or update link tag
    const setLinkTag = (rel, href) => {
      if (!href) return;
      let el = document.querySelector(`link[rel="${rel}"]`);
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        document.head.appendChild(el);
      }
      el.setAttribute('href', href);
    };

    // 2. Primary Meta Tags
    if (metaDescription) {
      setMetaTag('name', 'description', metaDescription);
    }

    if (keywords && keywords.length > 0) {
      const kwString = Array.isArray(keywords) ? keywords.join(', ') : keywords;
      setMetaTag('name', 'keywords', kwString);
    }

    // 3. Robots
    setMetaTag('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    setMetaTag('name', 'author', SITE_CONFIG.brandName);

    // 4. Canonical URL
    const canonical = canonicalUrl || `${SITE_CONFIG.domain}${window.location.pathname}`;
    setLinkTag('canonical', canonical);

    // 5. Open Graph Meta Tags
    setMetaTag('property', 'og:title', title || SITE_CONFIG.brandName);
    setMetaTag('property', 'og:description', metaDescription || '');
    setMetaTag('property', 'og:url', canonical);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:site_name', SITE_CONFIG.brandName);
    setMetaTag('property', 'og:locale', 'en_US');
    setMetaTag('property', 'og:image', ogImage || SITE_CONFIG.logoUrl);

    // 6. Twitter Card Meta Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', title || SITE_CONFIG.brandName);
    setMetaTag('name', 'twitter:description', metaDescription || '');
    setMetaTag('name', 'twitter:image', ogImage || SITE_CONFIG.logoUrl);

    // 7. Inject Structured Data (JSON-LD)
    const scriptId = 'jubilant-seo-schema';
    let scriptEl = document.getElementById(scriptId);
    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.id = scriptId;
      scriptEl.type = 'application/ld+json';
      document.head.appendChild(scriptEl);
    }

    const allSchemas = [
      ...getGlobalSchemas(),
      ...(Array.isArray(structuredData) ? structuredData : (structuredData ? [structuredData] : []))
    ];

    scriptEl.textContent = JSON.stringify(allSchemas);

  }, [title, metaDescription, canonicalUrl, keywords, structuredData, ogImage, ogType]);

  return null;
}
