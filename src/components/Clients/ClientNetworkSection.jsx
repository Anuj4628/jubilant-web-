import React from 'react';
import { clientsHeader, clientsList } from '../../data/clientsData';
import './ClientNetworkSection.css';

/**
 * JUBILANT STEELS — "TRUSTED BY INDUSTRY LEADERS"
 * Unified corporate client & partner wall.
 * Clean, static responsive grid with NO slider.
 */
export default function ClientNetworkSection() {
  const { eyebrow, title, description } = clientsHeader;

  return (
    <section
      id="clients"
      className="clients-section"
      aria-labelledby="clients-heading"
    >
      {/* Background Architectural Dot Matrix */}
      <div className="clients-bg-grid" aria-hidden="true" />

      <div className="clients-container">
        {/* Section Header */}
        <header className="clients-header">
          <div className="clients-eyebrow">
            <span className="eyebrow-red-dash" aria-hidden="true">—</span>
            <span className="eyebrow-text">{eyebrow}</span>
          </div>

          <h2 id="clients-heading" className="clients-title">
            {title}
          </h2>

          <p className="clients-subtitle">
            {description}
          </p>
        </header>

        {/* ONE Unified Premium Client Grid Container */}
        <div className="clients-unified-panel" role="region" aria-label="Corporate Client and Partner Organizations">
          {/* Subtle Technical Corner Accents */}
          <span className="panel-corner corner-tl" aria-hidden="true" />
          <span className="panel-corner corner-tr" aria-hidden="true" />
          <span className="panel-corner corner-bl" aria-hidden="true" />
          <span className="panel-corner corner-br" aria-hidden="true" />

          {/* Clean Responsive Company Grid */}
          <div className="clients-grid">
            {clientsList.map((company) => (
              <div
                key={company.id}
                className="client-grid-cell"
                tabIndex={0}
                role="group"
                aria-label={company.name}
              >
                <div className="client-logo-wrapper">
                  <img
                    src={company.logo}
                    alt={`${company.name} logo`}
                    className="client-logo-image"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <span className="client-company-label">{company.name}</span>
                <span className="client-cell-accent" aria-hidden="true" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
