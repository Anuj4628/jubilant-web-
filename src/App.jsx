import React, { useState, useEffect, useCallback, useMemo, Suspense, lazy } from 'react';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import ProductShowcaseSection from './components/Products/ProductShowcaseSection';
import MaterialsSection from './components/Materials/MaterialsSection';
import IndustriesSection from './components/Industries/IndustriesSection';
import WhyChooseUsSection from './components/WhyChooseUs/WhyChooseUsSection';
import ClientNetworkSection from './components/Clients/ClientNetworkSection';
import FloatingContactButtons from './components/UI/FloatingContactButtons';

// Lazy-loaded secondary routes so every navbar destination works cleanly
const AboutSection = lazy(() => import('./components/About/AboutSection'));
const CertificatePage = lazy(() => import('./components/Certificate/CertificatePage'));
const GetCodePage = lazy(() => import('./components/Contact/GetCodePage'));
const ContactPage = lazy(() => import('./components/Contact/ContactPage'));
const ProductsLandingView = lazy(() => import('./components/Products/pages/ProductsLandingView'));
const DivisionView = lazy(() => import('./components/Products/pages/DivisionView'));
const ProductFamilyView = lazy(() => import('./components/Products/pages/ProductFamilyView'));
const ProductDetailView = lazy(() => import('./components/Products/pages/ProductDetailView'));
const MaterialsLandingView = lazy(() => import('./components/Materials/pages/MaterialsLandingView'));
const MaterialDetailView = lazy(() => import('./components/Materials/pages/MaterialDetailView'));
import ExportToSection from './components/ExportTo/ExportToPage';
import Footer from './components/Footer/Footer';
import SEOHead from './components/SEO/SEOHead';
import { getStaticPageSeoData } from './utils/seoHelper';

import { preloadRoute } from './utils/preloadRoute';


import './App.css';

/**
 * Route parser for native history-based client routing
 */
function parseRoute(pathname = window.location.pathname) {
  const clean = (pathname || '').toLowerCase();

  if (clean.includes('about')) {
    return { page: 'about' };
  }

  if (clean.includes('certificate')) {
    return { page: 'certificate' };
  }

  if (clean.includes('get-code') || clean.includes('quote')) {
    return { page: 'get-code' };
  }

  if (clean.includes('contact')) {
    return { page: 'contact' };
  }

  if (clean.includes('export') || clean.includes('global-reach')) {
    return { page: 'export' };
  }

  if (clean.startsWith('/materials')) {
    const raw = pathname.replace(/^\/materials\/?/i, '');
    const parts = raw.split('/').filter(Boolean).map(p => p.toLowerCase());

    if (parts.length === 0) {
      return { page: 'materials', view: 'landing' };
    }

    return { page: 'materials', view: 'material', materialSlug: parts[0] };
  }

  if (clean.startsWith('/products')) {
    const raw = pathname.replace(/^\/products\/?/i, '');
    const parts = raw.split('/').filter(Boolean).map(p => p.toLowerCase());

    if (parts.length === 0) {
      return { page: 'products', view: 'landing' };
    }

    if (parts.length === 1) {
      const p0 = parts[0];
      if (p0 === 'manufacturer' || p0 === 'supplier') {
        return { page: 'products', view: 'division', divisionSlug: p0 };
      }
      return { page: 'products', view: 'family', groupSlug: p0 };
    }

    if (parts.length === 2) {
      const p0 = parts[0];
      if (p0 === 'manufacturer' || p0 === 'supplier') {
        return { page: 'products', view: 'family', divisionSlug: p0, groupSlug: parts[1] };
      }
      return { page: 'products', view: 'detail', groupSlug: parts[0], productSlug: parts[1] };
    }

    if (parts.length >= 3) {
      return {
        page: 'products',
        view: 'detail',
        divisionSlug: parts[0],
        groupSlug: parts[1],
        productSlug: parts[2]
      };
    }
  }

  return { page: 'home' };
}

/**
 * Jubilant Steels - Application Root
 */
export default function App() {
  const [route, setRoute] = useState(parseRoute);

  // Static route SEO metadata
  const staticSeo = useMemo(() => {
    if (route.page === 'about') return getStaticPageSeoData('about');
    if (route.page === 'certificate') return getStaticPageSeoData('certificate');
    if (route.page === 'get-code') return getStaticPageSeoData('get-code');
    if (route.page === 'contact') return getStaticPageSeoData('contact');
    if (route.page === 'export') return getStaticPageSeoData('export');
    if (route.page === 'materials' && (!route.view || route.view === 'landing')) return getStaticPageSeoData('materials');
    if (route.page === 'products' && (!route.view || route.view === 'landing')) return getStaticPageSeoData('products');
    if (route.page === 'home') return getStaticPageSeoData('home');
    return null;
  }, [route.page, route.view]);

  // Centralized page and section navigation handler
  const navigateTo = useCallback((target, param = null) => {
    if (typeof target === 'string' && target.startsWith('/')) {
      if (window.location.pathname !== target) {
        window.history.pushState({}, '', target);
      }
      setRoute(parseRoute(target));
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }

    if (target === 'about') {
      if (window.location.pathname !== '/about') {
        window.history.pushState({ page: 'about' }, '', '/about');
      }
      setRoute({ page: 'about' });
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }

    if (target === 'certificate') {
      if (window.location.pathname !== '/certificate') {
        window.history.pushState({ page: 'certificate' }, '', '/certificate');
      }
      setRoute({ page: 'certificate' });
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }

    if (target === 'get-code') {
      if (window.location.pathname !== '/get-code') {
        window.history.pushState({ page: 'get-code' }, '', '/get-code');
      }
      setRoute({ page: 'get-code' });
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }

    if (target === 'contact') {
      if (window.location.pathname !== '/contact') {
        window.history.pushState({ page: 'contact' }, '', '/contact');
      }
      setRoute({ page: 'contact' });
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }

    if (target === 'export' || target === 'export-to' || target === 'global-reach') {
      if (window.location.pathname !== '/export-to') {
        window.history.pushState({ page: 'export' }, '', '/export-to');
      }
      setRoute({ page: 'export' });
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }

    if (target === 'materials') {
      const dest = param ? (param.startsWith('/') ? param : `/materials/${param}`) : '/materials';
      if (window.location.pathname !== dest) {
        window.history.pushState({ page: 'materials' }, '', dest);
      }
      setRoute(parseRoute(dest));
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }

    if (target === 'products') {
      const dest = param ? (param.startsWith('/') ? param : `/products/${param}`) : '/products';
      if (window.location.pathname !== dest) {
        window.history.pushState({ page: 'products' }, '', dest);
      }
      setRoute(parseRoute(dest));
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }

    // Default: Home
    if (window.location.pathname !== '/') {
      window.history.pushState({ page: 'home' }, '', '/');
    }
    setRoute({ page: 'home' });
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Listen to browser Back and Forward navigation buttons
  useEffect(() => {
    const handlePopState = () => {
      const nextRoute = parseRoute(window.location.pathname);
      setRoute(nextRoute);
      window.scrollTo({ top: 0, behavior: 'instant' });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Idle preloading of secondary route bundles
  useEffect(() => {
    const idleCallback = window.requestIdleCallback || ((cb) => setTimeout(cb, 1200));
    const idleId = idleCallback(() => {
      preloadRoute('about');
      preloadRoute('certificate');
      preloadRoute('get-code');
      preloadRoute('contact');
      preloadRoute('products');
      preloadRoute('materials');
    });
    return () => {
      if (window.cancelIdleCallback && typeof idleId === 'number') {
        window.cancelIdleCallback(idleId);
      }
    };
  }, []);

  return (
    <div className="app-container">
      {staticSeo && <SEOHead {...staticSeo} />}
      {/* 1. Global Navbar with integrated page navigation */}
      <Navbar currentPage={route.page} onNavigate={navigateTo} />

      {/* 2. Page Switcher: Concentrating strictly on Hero + Navbar on Home */}
      {route.page === 'about' ? (
        <main id="main-content" className="about-page-main">
          <Suspense fallback={<div className="page-load-shell about-shell" aria-hidden="true" />}>
            <AboutSection onNavigate={navigateTo} />
          </Suspense>
        </main>
      ) : route.page === 'certificate' ? (
        <main id="main-content" className="certificate-page-main">
          <Suspense fallback={<div className="page-load-shell" aria-hidden="true" />}>
            <CertificatePage onNavigate={navigateTo} />
          </Suspense>
        </main>
      ) : route.page === 'get-code' ? (
        <main id="main-content" className="get-code-page-main">
          <Suspense fallback={<div className="page-load-shell" aria-hidden="true" />}>
            <GetCodePage onNavigate={navigateTo} />
          </Suspense>
        </main>
      ) : route.page === 'contact' ? (
        <main id="main-content" className="contact-page-main">
          <Suspense fallback={<div className="page-load-shell contact-shell" aria-hidden="true" />}>
            <ContactPage onNavigate={navigateTo} />
          </Suspense>
        </main>
      ) : route.page === 'export' ? (
        <main id="main-content" className="export-page-main">
          <ExportToSection onNavigate={navigateTo} />
        </main>
      ) : route.page === 'materials' ? (
        <main id="main-content" className="materials-page-main">
          <Suspense fallback={<div className="page-load-shell materials-shell" aria-hidden="true" />}>
            {route.view === 'material' ? (
              <MaterialDetailView
                materialSlug={route.materialSlug}
                onNavigate={navigateTo}
              />
            ) : (
              <MaterialsLandingView onNavigate={navigateTo} />
            )}
          </Suspense>
        </main>
      ) : route.page === 'products' ? (
        <main id="main-content" className="products-page-main">
          <Suspense fallback={<div className="page-load-shell products-shell" aria-hidden="true" />}>
            {route.view === 'division' ? (
              <DivisionView
                divisionSlug={route.divisionSlug}
                onNavigate={navigateTo}
              />
            ) : route.view === 'family' ? (
              <ProductFamilyView
                divisionSlug={route.divisionSlug}
                groupSlug={route.groupSlug}
                onNavigate={navigateTo}
              />
            ) : route.view === 'detail' ? (
              <ProductDetailView
                divisionSlug={route.divisionSlug}
                groupSlug={route.groupSlug}
                productSlug={route.productSlug}
                onNavigate={navigateTo}
              />
            ) : (
              <ProductsLandingView onNavigate={navigateTo} />
            )}
          </Suspense>
        </main>
      ) : (
        /* Home Page: Hero + Products + Materials + Industries + Why Choose Us + Trusted Companies */
        <main id="main-content" className="home-page-main">
          <Hero onNavigate={navigateTo} />
          <ProductShowcaseSection onNavigate={navigateTo} />
          <MaterialsSection onNavigate={navigateTo} />
          <IndustriesSection onNavigate={navigateTo} />
          <WhyChooseUsSection onNavigate={navigateTo} />
          <ClientNetworkSection onNavigate={navigateTo} />
          <ExportToSection onNavigate={navigateTo} />
        </main>
      )}

      {/* 3. Global Redesigned Premium Footer */}
      <Footer onNavigate={navigateTo} />

      {/* 4. Floating Direct Contact Buttons (WhatsApp & Phone) */}
      <FloatingContactButtons />
    </div>
  );
}
