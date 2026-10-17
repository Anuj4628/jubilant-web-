import React, { useEffect } from 'react';
import { 
  ShieldCheck, 
  Award, 
  FileText, 
  FileCheck, 
  CheckCircle2, 
  ExternalLink, 
  Download,
  FileSpreadsheet
} from 'lucide-react';
import Button from '../UI/Button';
import './CertificatePage.css';

export default function CertificatePage({ onNavigate }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = "Official Certifications & Quality Compliance | Jubilant Steels";
  }, []);

  const certs = [
    {
      id: "iso-9001",
      code: "ISO 9001:2015",
      title: "Quality Management System Certification",
      authority: "Auditing & Certification Body • Jubilant Metal and Alloys",
      scope: "Certified quality management system for manufacturing, processing, stocking, and global export of Stainless Steel, Alloy Steel, Carbon Steel pipes, tubes, flanges, and pipe fittings.",
      features: [
        "Documented Heat Number & Mill Traceability",
        "Continuous Quality Control Audits",
        "International Metallurgical Standards Compliance"
      ],
      pdfUrl: "/certificates/ISO-9001-2015-Jubilant-Metal-And-Alloys.pdf",
      downloadName: "Jubilant-ISO-9001-2015-Certificate.pdf",
      badge: "ISO 9001 CERTIFIED",
      icon: ShieldCheck,
      isOfficialFile: true
    },
    {
      id: "udyam-msme",
      code: "UDYAM-MH-REG",
      title: "Government of India Udyam MSME Registration",
      authority: "Ministry of Micro, Small & Medium Enterprises, Govt. of India",
      scope: "Official Government of India enterprise registration certificate recognizing Jubilant Metal and Alloys for specialized industrial manufacturing, trading, and engineering steel supply.",
      features: [
        "Government Recognized Industrial Enterprise",
        "Verified National Enterprise Identification",
        "Direct Mill Supply & Custom Processing Network"
      ],
      pdfUrl: "/certificates/Udyam-Registration-Certificate-Jubilant.pdf",
      downloadName: "Jubilant-Udyam-Registration-Certificate.pdf",
      badge: "GOVT MSME REGISTERED",
      icon: Award,
      isOfficialFile: true
    },
    {
      id: "pan-tax",
      code: "PAN: ATUPD4241P",
      title: "Statutory Tax & Business Registration",
      authority: "Income Tax Department, Government of India",
      scope: "Official permanent account taxation and statutory business identity registration, establishing validated corporate governance and transparent commercial B2B invoicing.",
      features: [
        "Permanent Account Number (PAN) ATUPD4241P",
        "Statutory Compliance for Global & Domestic B2B",
        "Authenticated Corporate Legal Standing"
      ],
      pdfUrl: "/certificates/Tax-Registration-Certificate-ATUPD4241P.pdf",
      downloadName: "Jubilant-Tax-Registration-ATUPD4241P.pdf",
      badge: "TAX IDENTIFICATION",
      icon: FileText,
      isOfficialFile: true
    },
    {
      id: "en-10204",
      code: "EN 10204 3.1 & 3.2",
      title: "Material Test Certification (MTC)",
      authority: "Independent Third Party (TUV, DNV, Lloyd's, SGS, Bureau Veritas)",
      scope: "100% Heat-traceable chemical spectro analysis, tensile yield testing, Charpy V-notch impact, PMI inspection, and hydrostatic pressure testing proof for all dispatches.",
      features: [
        "100% Heat Number & Raw Material Correlation",
        "Direct Mill Origin Test Certification",
        "Third-Party Inspection (TPI) Agency Acceptance"
      ],
      pdfUrl: null,
      downloadName: null,
      badge: "STANDARD MTC",
      icon: FileSpreadsheet,
      isOfficialFile: false
    }
  ];

  return (
    <div className="certificate-page">
      {/* Header Banner */}
      <section className="cert-hero-section">
        <div className="cert-container">
          <div className="cert-eyebrow">
            <span className="cert-accent-bar" aria-hidden="true" />
            <span>QUALITY, COMPLIANCE &amp; ACCREDITATION</span>
          </div>
          <h1 className="cert-headline">OFFICIAL COMPANY CERTIFICATIONS</h1>
          <p className="cert-subhead">
            Every piping system, alloy tube, flange, and industrial component supplied by Jubilant Steels operates under verified quality management, government registration, and 100% heat-traceable documentation.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="cert-content-section">
        <div className="cert-container">
          <div className="cert-grid">
            {certs.map((c) => {
              const IconComp = c.icon;
              return (
                <div key={c.id} className="cert-card" id={`cert-card-${c.id}`}>
                  {/* Top Glowing Red Accent Bar (Reveals on Hover) */}
                  <div className="cert-card-top-accent" aria-hidden="true" />

                  <div className="cert-card-header">
                    <div className="cert-icon-wrap">
                      <IconComp size={26} className="cert-icon" />
                    </div>
                    <div className="cert-badge">{c.badge}</div>
                  </div>

                  <h3 className="cert-card-title">{c.title}</h3>
                  <p className="cert-authority">Authority: <strong>{c.authority}</strong></p>
                  <p className="cert-desc">{c.scope}</p>

                  <div className="cert-features-list">
                    {c.features.map((f, fi) => (
                      <div key={fi} className="cert-feature-item">
                        <CheckCircle2 size={16} className="feature-check" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>

                  {/* Interactive Action Bar (Hover Drop Actions) */}
                  <div className="cert-card-actions">
                    {c.isOfficialFile && c.pdfUrl ? (
                      <>
                        <a
                          href={c.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="cert-btn-view"
                          title="View PDF Certificate"
                        >
                          <ExternalLink size={15} />
                          <span>View Certificate</span>
                        </a>
                        <a
                          href={c.pdfUrl}
                          download={c.downloadName || "certificate.pdf"}
                          className="cert-btn-download"
                          title="Download PDF Certificate"
                        >
                          <Download size={15} />
                          <span>Download</span>
                        </a>
                      </>
                    ) : (
                      <button
                        type="button"
                        className="cert-btn-request"
                        onClick={() => onNavigate && onNavigate('/get-code')}
                      >
                        <span>Request Custom MTC</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Testing Standards Bar */}
          <div className="cert-testing-bar">
            <div className="testing-info">
              <FileCheck size={32} className="testing-icon" />
              <div>
                <h4 className="testing-title">Positive Material Identification (PMI) &amp; Laboratory Testing</h4>
                <p className="testing-desc">
                  Spectro-chemical analysis, Ultrasonic Testing (UT), Hydrostatic proof testing, Magnetic Particle Inspection (MPI), and Hardness checks are conducted prior to global dispatch.
                </p>
              </div>
            </div>
            <div className="testing-actions">
              <Button
                variant="primary"
                size="md"
                onClick={() => onNavigate && onNavigate('/get-code')}
              >
                Request Test Certificate
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
