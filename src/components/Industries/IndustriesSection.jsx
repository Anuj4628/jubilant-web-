import React, { useState, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { industriesHeader, industriesList } from '../../data/industriesData';
import './IndustriesSection.css';

/**
 * JUBILANT STEELS — DIRECTIONAL TILT INDUSTRY CARD
 * Calculates cursor offset from center and tilts 3-5 degrees smoothly in 3D space.
 */
function IndustryTiltCard({ industry, index, onNavigate }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, isHovered: false });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Normalized coordinates from -1 (left/top) to +1 (right/bottom)
    const normX = Math.max(-1, Math.min(1, (x / rect.width) * 2 - 1));
    const normY = Math.max(-1, Math.min(1, (y / rect.height) * 2 - 1));

    // Maximum 4.5 degrees subtle tilt
    const MAX_TILT = 4.5;

    // Cursor on Right -> positive rotateY (tilts right)
    // Cursor on Left -> negative rotateY (tilts left)
    // Cursor near Top -> positive rotateX (tilts top)
    // Cursor near Bottom -> negative rotateX (tilts bottom)
    const rotateY = normX * MAX_TILT;
    const rotateX = -normY * MAX_TILT;

    setTilt({ x: rotateX, y: rotateY, isHovered: true });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0, isHovered: false });
  };

  return (
    <div
      ref={cardRef}
      className={`industry-card-wrap ${tilt.isHovered ? 'is-hovered' : ''}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onNavigate && onNavigate('contact')}
      tabIndex={0}
      role="group"
      aria-label={`${industry.name}: ${industry.description}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (onNavigate) onNavigate('contact');
        }
      }}
    >
      <div
        className="industry-card-inner"
        style={{
          transform: tilt.isHovered
            ? `perspective(1000px) rotateX(${tilt.x.toFixed(2)}deg) rotateY(${tilt.y.toFixed(2)}deg) translateY(-8px) scale3d(1.02, 1.02, 1.02)`
            : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale3d(1, 1, 1)'
        }}
      >
        {/* Full Bleed Authentic Industrial Image */}
        <div className="industry-media-box">
          <img
            src={industry.image}
            alt={industry.alt || industry.name}
            className="industry-image"
            loading="lazy"
            decoding="async"
          />
          <div className="industry-image-overlay" aria-hidden="true" />
        </div>

        {/* Top Technical Sector Index Tag */}
        <div className="industry-top-tag">
          <span className="industry-index-number">0{((index % industriesList.length) + 1)}</span>
          <span className="industry-tag-divider" aria-hidden="true">/</span>
          <span className="industry-tag-label">SECTOR SPEC</span>
        </div>

        {/* Foreground Content: Title & Short Description */}
        <div className="industry-card-content">
          <div className="industry-title-row">
            <h3 className="industry-name">{industry.name}</h3>
            <span className="industry-arrow-badge" aria-hidden="true">
              <ArrowUpRight size={17} />
            </span>
          </div>

          <p className="industry-desc">{industry.description}</p>

          {/* Understated Red Accent Line */}
          <div className="industry-accent-line" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}

/**
 * JUBILANT STEELS — INDUSTRIES SECTION
 * Continuous horizontal Right → Left slider with pause-on-hover & directional 3D tilt.
 */
export default function IndustriesSection({ onNavigate }) {
  // Duplicate 4 times for a seamless, unbroken continuous infinite marquee
  const repeatedIndustries = [
    ...industriesList,
    ...industriesList,
    ...industriesList,
    ...industriesList
  ];

  return (
    <section
      id="industries"
      className="industries-section"
      aria-labelledby="industries-heading"
    >
      {/* Background Architectural Grid Pattern */}
      <div className="industries-bg-grid" aria-hidden="true" />

      {/* Section Header */}
      <div className="industries-container">
        <header className="industries-header">
          <div className="industries-eyebrow">
            <span className="eyebrow-red-dash" aria-hidden="true">—</span>
            <span className="eyebrow-text">{industriesHeader.eyebrow}</span>
          </div>

          <h2 id="industries-heading" className="industries-title">
            {industriesHeader.title}
          </h2>

          <p className="industries-subtitle">
            {industriesHeader.description}
          </p>
        </header>
      </div>

      {/* Seamless Continuous Horizontal Slider (Right → Left) */}
      <div
        className="industries-slider-viewport"
        aria-label="Continuous showcase of mission-critical industries. Hover over any card to pause and inspect."
      >
        <div className="industries-slider-track">
          {repeatedIndustries.map((industry, idx) => (
            <IndustryTiltCard
              key={`${industry.id}-${idx}`}
              industry={industry}
              index={idx}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
