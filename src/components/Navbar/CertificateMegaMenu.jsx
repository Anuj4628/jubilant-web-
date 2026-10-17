import React from 'react';
import { ShieldCheck, Award, FileText, ExternalLink, ArrowRight } from 'lucide-react';
import './CertificateMegaMenu.css';

/**
 * JUBILANT STEELS — CERTIFICATE HOVER DROPDOWN MENU
 * Clean, executive red industrial dropdown presenting verified company certificates.
 */
function CertificateMegaMenu({ isOpen, onSelect, onClose }) {
  const certificates = [
    {
      id: 'iso-9001',
      title: 'ISO 9001:2015 Certification',
      subtitle: 'Quality Management System • Jubilant Metal & Alloys',
      badge: 'ISO 9001',
      icon: ShieldCheck,
      pdfUrl: '/certificates/ISO-9001-2015-Jubilant-Metal-And-Alloys.pdf'
    },
    {
      id: 'udyam',
      title: 'Udyam Registration Certificate',
      subtitle: 'Ministry of MSME • Government of India Registered',
      badge: 'MSME GOVT',
      icon: Award,
      pdfUrl: '/certificates/Udyam-Registration-Certificate-Jubilant.pdf'
    },
    {
      id: 'pan-tax',
      title: 'Tax & Business Registration',
      subtitle: 'Income Tax Dept, Govt. of India • PAN: ATUPD4241P',
      badge: 'TAX ID',
      icon: FileText,
      pdfUrl: '/certificates/Tax-Registration-Certificate-ATUPD4241P.pdf'
    }
  ];

  const handleCertClick = (e, pdfUrl) => {
    // Open PDF in a new tab
    if (onClose) onClose();
  };

  const handleViewAll = (e) => {
    e.preventDefault();
    if (onSelect) onSelect('certificate');
    if (onClose) onClose();
  };

  return (
    <div
      className={`cert-megamenu-panel ${isOpen ? 'is-open' : ''}`}
      role="region"
      aria-label="Certificates Navigation Menu"
    >
      {/* Header Bar */}
      <div className="cert-header-bar">
        <div className="cert-header-title-wrap">
          <span className="cert-header-dash" aria-hidden="true">—</span>
          <span className="cert-header-title">OFFICIAL COMPANY CERTIFICATES</span>
        </div>
        <span className="cert-header-tag">Verified Documents</span>
      </div>

      {/* Certificate List */}
      <div className="cert-items-list">
        {certificates.map((cert) => {
          const IconComponent = cert.icon;
          return (
            <a
              key={cert.id}
              href={cert.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cert-dropdown-item"
              onClick={(e) => handleCertClick(e, cert.pdfUrl)}
            >
              <div className="cert-drop-icon-box">
                <IconComponent size={20} className="cert-drop-icon" />
              </div>
              <div className="cert-drop-info">
                <div className="cert-drop-title-row">
                  <span className="cert-drop-title">{cert.title}</span>
                  <span className="cert-drop-badge">{cert.badge}</span>
                </div>
                <span className="cert-drop-subtitle">{cert.subtitle}</span>
              </div>
              <div className="cert-drop-action" title="Open PDF">
                <ExternalLink size={15} className="cert-drop-ext" />
              </div>
            </a>
          );
        })}
      </div>

      {/* Footer Bar */}
      <div className="cert-footer-bar">
        <a
          href="/certificate"
          className="cert-footer-link"
          onClick={handleViewAll}
        >
          <span>View All Certifications &amp; Quality Assurances</span>
          <ArrowRight size={15} className="cert-footer-arrow" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}

export default React.memo(CertificateMegaMenu);
