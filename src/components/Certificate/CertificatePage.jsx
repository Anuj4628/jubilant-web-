import { ShieldCheck, FileCheck, CheckCircle2 } from 'lucide-react';
import Button from '../UI/Button';
import './CertificatePage.css';

export default function CertificatePage({ onNavigate }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = "Certifications & Quality Standards | Jubilant Steels";
  }, []);

  const certs = [
    {
      code: "ISO 9001:2015",
      title: "Quality Management System Certification",
      authority: "TUV NORD / Bureau Veritas",
      scope: "Manufacturing, Processing, Stocking, and Global Export of Carbon, Alloy, Stainless Steel Pipes, Tubes, Flanges, and Heavy Plates.",
      features: ["Documented Traceability System", "Continuous Process Audits", "Batch Quality Consistency"]
    },
    {
      code: "EN 10204 Type 3.1 & 3.2",
      title: "Material Test Certification (MTC)",
      authority: "Independent Third Party (Lloyd's, DNV, TUV, SGS)",
      scope: "Chemical Composition Analysis, Mechanical Tensile & Yield Testing, Charpy V-Notch Impact, and Hydrostatic Proof Testing.",
      features: ["100% Heat Number Correlation", "Direct Mill Origin Verification", "Third-Party Inspector Endorsement"]
    },
    {
      code: "IBR Approval (Form IV & III-C)",
      title: "Indian Boiler Regulations Compliance",
      authority: "Central Boilers Board Directorate",
      scope: "Certified high-pressure piping, tubes, boiler plates, and alloy fittings engineered for severe thermal & pressure duty.",
      features: ["High Temperature Creep Resistance", "Pre-tested Hydraulic Integrity", "Statutory Plant Clearance"]
    },
    {
      code: "PED 2014/68/EU",
      title: "Pressure Equipment Directive",
      authority: "European Notified Body",
      scope: "Manufacture and supply of pressure-retaining components for European and multinational process industry applications.",
      features: ["CE Marked Compliance", "Impact Tested at Sub-Zero Temperatures", "Strict NDT / Ultrasonic Verification"]
    }
  ];

  return (
    <div className="certificate-page">
      {/* Header Banner */}
      <section className="cert-hero-section">
        <div className="cert-container">
          <div className="cert-eyebrow">
            <span className="cert-accent-bar" />
            <span>QUALITY & COMPLIANCE</span>
          </div>
          <h1 className="cert-headline">VERIFIED INDUSTRIAL CERTIFICATIONS</h1>
          <p className="cert-subhead">
            Every piping system, alloy tube, flange, and heavy plate supplied by Jubilant Steels is fully certified to international engineering standards with complete heat-traceable documentation.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="cert-content-section">
        <div className="cert-container">
          <div className="cert-grid">
            {certs.map((c, i) => (
              <div key={i} className="cert-card">
                <div className="cert-card-header">
                  <div className="cert-icon-wrap">
                    <ShieldCheck size={28} className="cert-icon" />
                  </div>
                  <div className="cert-badge">{c.code}</div>
                </div>
                <h3 className="cert-card-title">{c.title}</h3>
                <p className="cert-authority">Issued by: <strong>{c.authority}</strong></p>
                <p className="cert-desc">{c.scope}</p>
                <div className="cert-features-list">
                  {c.features.map((f, fi) => (
                    <div key={fi} className="cert-feature-item">
                      <CheckCircle2 size={16} className="feature-check" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Testing Standards Bar */}
          <div className="cert-testing-bar">
            <div className="testing-info">
              <FileCheck size={32} className="testing-icon" />
              <div>
                <h4 className="testing-title">Positive Material Identification (PMI) & Laboratory Testing</h4>
                <p className="testing-desc">
                  Spectro-analysis, Ultrasonic Testing (UT), Hydrostatic Testing, Magnetic Particle Inspection (MPI), and Hardness checks are conducted prior to dispatch.
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
