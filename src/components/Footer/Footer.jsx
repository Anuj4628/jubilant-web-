import React from 'react';
import jubilantLogo from '../../assets/images/jubilant-logo.png';
import { CONTACT_CONFIG } from '../../config/contactConfig';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowUp,
  ShieldCheck,
  Award,
  Globe,
  ArrowRight,
  MessageSquare
} from 'lucide-react';
import './Footer.css';

/**
 * JUBILANT STEELS — REDESIGNED PREMIUM INDUSTRIAL FOOTER
 * 
 * Clean, Authentic, Industrial, Professional & Fully Responsive.
 * Built for international steel manufacturing, export, and supply.
 */
export default function Footer({ onNavigate }) {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNav = (e, target, sectionId = null) => {
    if (!onNavigate) return;
    e.preventDefault();

    if (sectionId) {
      if (window.location.pathname !== '/') {
        onNavigate('/');
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    if (typeof target === 'string') {
      onNavigate(target);
    }
  };

  return (
    <footer className="site-footer" role="contentinfo" aria-label="Jubilant Steels Corporate Footer">
      
      {/* 1. Pre-Footer Call-To-Action Strip */}
      <div className="footer-cta-strip">
        <div className="footer-container">
          <div className="footer-cta-inner">
            <div className="footer-cta-text">
              <span className="footer-cta-badge">GLOBAL SUPPLY DESK</span>
              <h3 className="footer-cta-heading">
                Ready to source high-integrity steel & alloy materials?
              </h3>
              <p className="footer-cta-sub">
                Connect with our Mumbai engineering and export desk for instant technical specifications, mill test certifications, and expedited global dispatch.
              </p>
            </div>
            <div className="footer-cta-actions">
              <a
                href="/get-code"
                className="footer-btn-primary"
                onClick={(e) => handleNav(e, 'get-code')}
              >
                <span>Request A Quote</span>
                <ArrowRight size={16} />
              </a>
              <a
                href={`tel:${CONTACT_CONFIG.PHONE_NUMBER}`}
                className="footer-btn-secondary"
              >
                <Phone size={15} />
                <span>Call Export Desk</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main 4-Column Directory */}
      <div className="footer-main-area">
        <div className="footer-container">
          <div className="footer-columns-grid">
            
            {/* COLUMN 1: Company Profile & Accreditations */}
            <div className="footer-col footer-col-company">
              <a
                href="/"
                className="footer-logo-anchor"
                onClick={(e) => handleNav(e, '/')}
                aria-label="Jubilant Steels Homepage"
              >
                <div className="footer-logo-badge">
                  <img
                    src={jubilantLogo}
                    alt="Jubilant Steels"
                    className="footer-brand-logo"
                  />
                </div>
              </a>

              <p className="footer-company-desc">
                Premier manufacturer, exporter, and stockholder of industrial steel pipes, butt-weld fittings, forged flanges, and high nickel alloys engineered for critical energy, chemical, and heavy engineering applications.
              </p>

              {/* Verified Quality & Trust Badges */}
              <div className="footer-trust-badges">
                <div className="trust-badge-item">
                  <ShieldCheck size={16} className="trust-badge-icon" />
                  <div className="trust-badge-text">
                    <span className="trust-badge-title">ISO 9001:2015</span>
                    <span className="trust-badge-sub">Quality Management Certified</span>
                  </div>
                </div>

                <div className="trust-badge-item">
                  <Award size={16} className="trust-badge-icon" />
                  <div className="trust-badge-text">
                    <span className="trust-badge-title">ASME BPVC Compliant</span>
                    <span className="trust-badge-sub">Boiler & Pressure Vessel Code</span>
                  </div>
                </div>

                <div className="trust-badge-item">
                  <Globe size={16} className="trust-badge-icon" />
                  <div className="trust-badge-text">
                    <span className="trust-badge-title">Govt. Recognized Export House</span>
                    <span className="trust-badge-sub">Serving 50+ Countries Worldwide</span>
                  </div>
                </div>
              </div>

              {/* Direct Communication Channels */}
              <div className="footer-direct-channels">
                <a
                  href={`https://wa.me/${CONTACT_CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(CONTACT_CONFIG.WHATSAPP_DEFAULT_MESSAGE)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="direct-channel-btn whatsapp"
                  aria-label="Chat on WhatsApp"
                >
                  <MessageSquare size={16} />
                  <span>WhatsApp Chat</span>
                </a>
                <a
                  href={`mailto:${CONTACT_CONFIG.EMAIL}`}
                  className="direct-channel-btn email"
                  aria-label="Send Email"
                >
                  <Mail size={16} />
                  <span>Email Support</span>
                </a>
              </div>
            </div>

            {/* COLUMN 2: Quick Links */}
            <div className="footer-col">
              <h4 className="footer-col-heading">
                <span>Quick Links</span>
                <span className="col-heading-line" aria-hidden="true" />
              </h4>
              <ul className="footer-nav-list">
                <li>
                  <a href="/" className="footer-nav-link" onClick={(e) => handleNav(e, '/')}>
                    Home
                  </a>
                </li>
                <li>
                  <a href="/about" className="footer-nav-link" onClick={(e) => handleNav(e, 'about')}>
                    About Jubilant Steels
                  </a>
                </li>
                <li>
                  <a href="/products" className="footer-nav-link" onClick={(e) => handleNav(e, '/products')}>
                    Products Catalog
                  </a>
                </li>
                <li>
                  <a href="/#materials" className="footer-nav-link" onClick={(e) => handleNav(e, '/', 'materials')}>
                    Materials We Work With
                  </a>
                </li>
                <li>
                  <a href="/#industries" className="footer-nav-link" onClick={(e) => handleNav(e, '/', 'industries')}>
                    Industries We Serve
                  </a>
                </li>
                <li>
                  <a href="/#why-choose-us" className="footer-nav-link" onClick={(e) => handleNav(e, '/', 'why-choose-us')}>
                    Why Choose Us
                  </a>
                </li>
                <li>
                  <a href="/#clients" className="footer-nav-link" onClick={(e) => handleNav(e, '/', 'clients')}>
                    Client Network
                  </a>
                </li>
                <li>
                  <a href="/export-to" className="footer-nav-link" onClick={(e) => handleNav(e, 'export')}>
                    Global Reach / Export To
                  </a>
                </li>
                <li>
                  <a href="/certificate" className="footer-nav-link" onClick={(e) => handleNav(e, 'certificate')}>
                    Mill Test Certifications
                  </a>
                </li>
                <li>
                  <a href="/contact" className="footer-nav-link" onClick={(e) => handleNav(e, 'contact')}>
                    Contact & Inquiries
                  </a>
                </li>
              </ul>
            </div>

            {/* COLUMN 3: Products & Materials Directory */}
            <div className="footer-col">
              <h4 className="footer-col-heading">
                <span>Products & Alloys</span>
                <span className="col-heading-line" aria-hidden="true" />
              </h4>
              <ul className="footer-nav-list">
                <li>
                  <a href="/products/supplier/pipes-tubes" className="footer-nav-link" onClick={(e) => handleNav(e, '/products/supplier/pipes-tubes')}>
                    Seamless Pipes & Tubes
                  </a>
                </li>
                <li>
                  <a href="/products/manufacturer/butt-weld-fittings" className="footer-nav-link" onClick={(e) => handleNav(e, '/products/manufacturer/butt-weld-fittings')}>
                    Butt Weld Pipe Fittings
                  </a>
                </li>
                <li>
                  <a href="/products/manufacturer/flanges" className="footer-nav-link" onClick={(e) => handleNav(e, '/products/manufacturer/flanges')}>
                    Industrial Forged Flanges
                  </a>
                </li>
                <li>
                  <a href="/products/manufacturer/forged-fittings" className="footer-nav-link" onClick={(e) => handleNav(e, '/products/manufacturer/forged-fittings')}>
                    High Pressure Forged Fittings
                  </a>
                </li>
                <li>
                  <a href="/materials/stainless-steel" className="footer-nav-link" onClick={(e) => handleNav(e, '/materials/stainless-steel')}>
                    Stainless Steel (304 / 316 / 321)
                  </a>
                </li>
                <li>
                  <a href="/materials/nickel-alloys" className="footer-nav-link" onClick={(e) => handleNav(e, '/materials/nickel-alloys')}>
                    Nickel Alloys & Inconel
                  </a>
                </li>
                <li>
                  <a href="/materials/duplex-steel" className="footer-nav-link" onClick={(e) => handleNav(e, '/materials/duplex-steel')}>
                    Duplex & Super Duplex Steel
                  </a>
                </li>
                <li>
                  <a href="/materials/titanium" className="footer-nav-link" onClick={(e) => handleNav(e, '/materials/titanium')}>
                    Titanium & High Alloys
                  </a>
                </li>
                <li>
                  <a href="/materials/carbon-steel" className="footer-nav-link" onClick={(e) => handleNav(e, '/materials/carbon-steel')}>
                    Carbon Steel & Alloy Steel
                  </a>
                </li>
              </ul>
            </div>

            {/* COLUMN 4: Contact & Global Operations */}
            <div className="footer-col footer-col-contact">
              <h4 className="footer-col-heading">
                <span>Headquarters</span>
                <span className="col-heading-line" aria-hidden="true" />
              </h4>
              
              <div className="footer-contact-items">
                
                {/* Physical Address */}
                <div className="footer-contact-item">
                  <div className="contact-item-icon-box">
                    <MapPin size={18} />
                  </div>
                  <div className="contact-item-content">
                    <span className="contact-item-label">Registered Office & Stockyard</span>
                    <address className="contact-item-address">
                      {CONTACT_CONFIG.ADDRESS}
                    </address>
                  </div>
                </div>

                {/* Direct Phone Numbers */}
                <div className="footer-contact-item">
                  <div className="contact-item-icon-box">
                    <Phone size={18} />
                  </div>
                  <div className="contact-item-content">
                    <span className="contact-item-label">Direct & Export Desk</span>
                    <a
                      href={`tel:${CONTACT_CONFIG.PHONE_NUMBER}`}
                      className="contact-item-link"
                    >
                      {CONTACT_CONFIG.PHONE_DISPLAY}
                    </a>
                    <span className="contact-item-label contact-item-label-sub">Office Line</span>
                    <a
                      href={`tel:${CONTACT_CONFIG.PHONE_OFFICE}`}
                      className="contact-item-link"
                    >
                      {CONTACT_CONFIG.PHONE_OFFICE_DISPLAY}
                    </a>
                  </div>
                </div>

                {/* Email Address */}
                <div className="footer-contact-item">
                  <div className="contact-item-icon-box">
                    <Mail size={18} />
                  </div>
                  <div className="contact-item-content">
                    <span className="contact-item-label">Commercial & RFQ Desk</span>
                    <a
                      href={`mailto:${CONTACT_CONFIG.EMAIL}`}
                      className="contact-item-link"
                    >
                      {CONTACT_CONFIG.EMAIL}
                    </a>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="footer-contact-item">
                  <div className="contact-item-icon-box">
                    <Clock size={18} />
                  </div>
                  <div className="contact-item-content">
                    <span className="contact-item-label">Operational Hours</span>
                    <span className="contact-item-text">
                      Monday – Saturday: 9:30 AM – 7:00 PM IST
                    </span>
                    <span className="contact-item-text-sub">
                      24/7 Global Urgent Dispatch Response
                    </span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 3. Bottom Legal & Copyright Bar */}
      <div className="footer-bottom-bar">
        <div className="footer-container">
          <div className="footer-bottom-inner">
            
            <div className="footer-copyright">
              <span>&copy; {currentYear} Jubilant Steels. All rights reserved.</span>
              <span className="copyright-sep" aria-hidden="true">•</span>
              <span className="copyright-tagline">Global Steel Manufacturing • Export • Supply</span>
              <span className="copyright-sep" aria-hidden="true">•</span>
              <span className="footer-agency-credit">
                <span className="credit-lead">Design and SEO by</span>{' '}
                <a
                  href="https://www.sunmargindia.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="credit-agency-link"
                  title="Sunmarg India — Official Website"
                >
                  Sunmarg India
                </a>
              </span>
            </div>

            <div className="footer-legal-links">
              <a
                href="/about"
                className="footer-legal-link"
                onClick={(e) => handleNav(e, 'about')}
              >
                Quality Assurance
              </a>
              <span className="legal-sep" aria-hidden="true">|</span>
              <a
                href="/certificate"
                className="footer-legal-link"
                onClick={(e) => handleNav(e, 'certificate')}
              >
                Compliance & Testing
              </a>
              <span className="legal-sep" aria-hidden="true">|</span>
              <a
                href="/contact"
                className="footer-legal-link"
                onClick={(e) => handleNav(e, 'contact')}
              >
                Privacy & Terms
              </a>
            </div>

            <button
              type="button"
              className="footer-back-to-top"
              onClick={scrollToTop}
              aria-label="Scroll back to top of page"
            >
              <span>Back to Top</span>
              <ArrowUp size={15} />
            </button>

          </div>
        </div>
      </div>

    </footer>
  );
}
