import React, { useState } from 'react';
import { ArrowUpRight, ChevronDown, ShieldCheck, Crosshair } from 'lucide-react';
import { whyChooseUsData } from '../../data/whyChooseUsData';
import './WhyChooseUsSection.css';

/**
 * JUBILANT STEELS — WHY CHOOSE US / VALUE PROPOSITION SECTION
 * "Engineered To Be Trusted."
 * An interactive Industrial Blueprint & Telemetry Console.
 */
export default function WhyChooseUsSection() {
  const { sectionHeader, valuePropositions } = whyChooseUsData;
  const [activeId, setActiveId] = useState(valuePropositions[0].id);

  const activeProp = valuePropositions.find((p) => p.id === activeId) || valuePropositions[0];

  const handleSelect = (id) => {
    setActiveId(id);
  };

  return (
    <section
      id="value-proposition"
      className="why-choose-section"
      aria-labelledby="why-choose-heading"
    >
      {/* Background Architectural Grid Pattern */}
      <div className="why-choose-bg-grid" aria-hidden="true" />

      <div className="why-choose-container">
        {/* 1. Editorial Section Header */}
        <header className="why-choose-header">
          <div className="why-choose-eyebrow">
            <span className="eyebrow-red-dash" aria-hidden="true">—</span>
            <span className="eyebrow-text">{sectionHeader.eyebrow}</span>
          </div>

          <h2 id="why-choose-heading" className="why-choose-title">
            {sectionHeader.title}
          </h2>

          <p className="why-choose-subtitle">
            {sectionHeader.subtitle}
          </p>
        </header>

        {/* 2. Interactive Industrial Console: Left Stage + Right Dossier */}
        <div className="why-choose-console">
          {/* ZONE A: The Technical Inspection Stage (Left) */}
          <div className="console-stage-col">
            <div className="console-stage-frame">
              {/* Corner Precision Crosshairs */}
              <span className="crosshair crosshair-tl" aria-hidden="true"><Crosshair size={12} /></span>
              <span className="crosshair crosshair-tr" aria-hidden="true"><Crosshair size={12} /></span>
              <span className="crosshair crosshair-bl" aria-hidden="true"><Crosshair size={12} /></span>
              <span className="crosshair crosshair-br" aria-hidden="true"><Crosshair size={12} /></span>

              {/* Stage Top Bar: Real-time Telemetry Status */}
              <div className="stage-top-bar">
                <div className="stage-status-indicator">
                  <span className="status-pulse-dot" />
                  <span className="status-label">ACTIVE TELEMETRY</span>
                </div>
                <span className="stage-standard-stamp">{activeProp.isoStandard}</span>
              </div>

              {/* Dynamic Visual Stage */}
              <div className="stage-media-wrap">
                <img
                  key={activeProp.id}
                  src={activeProp.image}
                  alt={activeProp.alt}
                  className="stage-media-img"
                  loading="lazy"
                  decoding="async"
                />
                <div className="stage-vignette" aria-hidden="true" />

                {/* Floating HUD Badge */}
                <div className="stage-floating-hud">
                  <ShieldCheck size={14} className="hud-icon" />
                  <span className="hud-text">{activeProp.hudBadge}</span>
                </div>
              </div>

              {/* Stage Bottom Telemetry Console Strip */}
              <div className="stage-telemetry-footer">
                <div className="telemetry-item">
                  <span className="telemetry-lbl">CATEGORY</span>
                  <span className="telemetry-val">{activeProp.badge}</span>
                </div>
                <div className="telemetry-divider" />
                <div className="telemetry-item">
                  <span className="telemetry-lbl">INSPECTION</span>
                  <span className="telemetry-val">100% VERIFIED</span>
                </div>
                <div className="telemetry-divider" />
                <div className="telemetry-item">
                  <span className="telemetry-lbl">CODE</span>
                  <span className="telemetry-val">EN 10204 // 3.1</span>
                </div>
              </div>
            </div>
          </div>

          {/* ZONE B: The Interactive Engineering Dossier (Right) */}
          <div className="console-dossier-col" role="tablist" aria-label="Jubilant Value Propositions">
            {valuePropositions.map((prop) => {
              const isActive = prop.id === activeId;

              return (
                <div
                  key={prop.id}
                  id={`prop-tab-${prop.id}`}
                  className={`dossier-item ${isActive ? 'is-active' : ''}`}
                  onMouseEnter={() => handleSelect(prop.id)}
                  onClick={() => handleSelect(prop.id)}
                  tabIndex={0}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`prop-panel-${prop.id}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleSelect(prop.id);
                    }
                  }}
                >
                  {/* Item Header Row */}
                  <div className="dossier-header-row">
                    <span className="dossier-number">{prop.number}</span>
                    <div className="dossier-title-wrap">
                      <div className="dossier-badge-row">
                        <span className="dossier-badge">{prop.badge}</span>
                      </div>
                      <h3 className="dossier-title">{prop.title}</h3>
                    </div>
                    <span className="dossier-toggle-icon" aria-hidden="true">
                      {isActive ? <ArrowUpRight size={17} /> : <ChevronDown size={17} />}
                    </span>
                  </div>

                  {/* Concise Description */}
                  <p className="dossier-tagline">{prop.description}</p>

                  {/* Concise Specs Pill Row */}
                  {isActive && prop.specs && (
                    <div
                      id={`prop-panel-${prop.id}`}
                      className="dossier-specs-row"
                      role="tabpanel"
                      aria-labelledby={`prop-tab-${prop.id}`}
                    >
                      {prop.specs.map((spec, sIdx) => (
                        <span key={sIdx} className="spec-pill-tag">
                          {spec}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Red Active Indicator Line */}
                  <div className="dossier-accent-line" aria-hidden="true" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
