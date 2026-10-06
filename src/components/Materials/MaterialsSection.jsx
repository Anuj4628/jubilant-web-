import React from 'react';
import { MATERIALS } from '../../data/materialsData';
import './MaterialsSection.css';

/**
 * JUBILANT STEELS — "MATERIAL WE WORK WITH" SECTION
 * A continuous, seamless horizontal marquee moving Right → Left.
 * Displays the 9 Certified Alloys in a vibrant brand red banner.
 */
export default function MaterialsSection({ onNavigate }) {
  // Use ONLY the 9 Certified Materials from materialsData.js:
  // Alloy Steel, Carbon, Duplex, Exotic Alloy, High Alloy, Nickel Alloy, Stainless Steel, Super Duplex, Titanium
  const materialsList = MATERIALS;

  // Duplicate items 4 times to ensure an unbroken, perfectly seamless infinite marquee
  // across all ultra-wide and mobile screen resolutions
  const marqueeItems = [
    ...materialsList,
    ...materialsList,
    ...materialsList,
    ...materialsList
  ];

  return (
    <section id="materials" className="materials-section" aria-label="Material We Work With">
      {/* Background Ambience */}
      <div className="materials-bg-pattern" aria-hidden="true" />

      {/* Section Header */}
      <div className="materials-container">
        <header className="materials-header">
          <div className="materials-eyebrow">
            <span className="materials-eyebrow-dash" aria-hidden="true">—</span>
            <span className="materials-eyebrow-text">OUR MATERIAL RANGE</span>
          </div>

          <h2 className="materials-title">
            Material We Work With
          </h2>

          <p className="materials-subtitle">
            A comprehensive range of high-performance metals and alloys engineered to meet demanding industrial requirements.
          </p>
        </header>
      </div>

      {/* Continuous Seamless Horizontal Marquee (Moving Right → Left) */}
      <div className="materials-slider-band" aria-label="Scrolling list of materials">
        <div className="materials-slider-fade-left" aria-hidden="true" />
        <div className="materials-slider-fade-right" aria-hidden="true" />

        <div className="materials-marquee-wrapper">
          <div className="materials-marquee-track">
            {marqueeItems.map((mat, index) => (
              <React.Fragment key={`${mat.id}-${index}`}>
                <div
                  className="material-item"
                  tabIndex={0}
                  role="button"
                  onClick={() => onNavigate && onNavigate('materials')}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      if (onNavigate) onNavigate('materials');
                    }
                  }}
                  aria-label={mat.name}
                >
                  <span className="material-name">{mat.name}</span>
                  <span className="material-accent-line" aria-hidden="true" />
                </div>
                <span className="material-separator" aria-hidden="true">
                  <span className="separator-dot" />
                </span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
