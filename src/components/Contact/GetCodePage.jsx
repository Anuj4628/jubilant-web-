import React, { useEffect } from 'react';
import ContactRFQ from './ContactRFQ';
import './Contact.css';

export default function GetCodePage({ onNavigate }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = "Get Quotation & Specification Code | Jubilant Steels";
  }, []);

  return (
    <div className="get-code-page" style={{ paddingTop: '80px', backgroundColor: '#F8FAFC', minHeight: '85vh' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '36px 40px 10px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#E23032', fontFamily: 'monospace', fontWeight: 700, fontSize: '0.82rem', letterSpacing: '0.15em', marginBottom: '8px' }}>
          <span style={{ width: '20px', height: '2.5px', background: '#E23032' }} />
          <span>INSTANT RFQ & CODE SPECIFICATION</span>
        </div>
        <h1 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '2.4rem', fontWeight: 800, color: '#0F172A', margin: '0 0 10px 0' }}>
          REQUEST QUOTATION & MATERIAL CODE
        </h1>
        <p style={{ color: '#475569', fontSize: '1.05rem', maxWidth: '720px', margin: 0, lineHeight: 1.6 }}>
          Submit your required dimensions, ASTM/ASME grades, pressure class, and quantity. Our export engineering desk will generate your reference code and provide official quotation within 2 business hours.
        </p>
      </div>

      <ContactRFQ />
    </div>
  );
}
