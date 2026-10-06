import React from 'react';
import { MATERIALS } from '../../data/materialsData';
import './MaterialsMegaMenu.css';

/**
 * JUBILANT STEELS — RED INDUSTRIAL MATERIALS NAVIGATION PANEL
 * Clean 3-column metallurgical grades panel matching the Products mega menu aesthetic.
 */
function MaterialsMegaMenu({ isOpen, onSelect, onClose }) {
  const handleItemClick = (e, url) => {
    e.preventDefault();
    if (onSelect) {
      onSelect(url);
    }
    if (onClose) {
      onClose();
    }
  };

  return (
    <div
      className={`materials-megamenu-panel ${isOpen ? 'is-open' : ''}`}
      role="region"
      aria-label="Materials Navigation Menu"
    >
      {/* Top Header Strip */}
      <div className="materials-header-bar">
        <div className="materials-header-title-wrap">
          <span className="materials-header-dash" aria-hidden="true">—</span>
          <span className="materials-header-title">METALLURGICAL GRADES</span>
        </div>
        <span className="materials-header-tag">9 Certified Alloys</span>
      </div>

      {/* 3-Column Industrial Grid */}
      <div className="materials-grid-wrap">
        {MATERIALS.map((mat) => (
          <a
            key={mat.id}
            href={`/materials/${mat.slug}`}
            className="materials-row-item"
            onClick={(e) => handleItemClick(e, `/materials/${mat.slug}`)}
          >
            <div className="mat-thumb-wrap">
              <img
                src={mat.image}
                alt=""
                className="mat-thumb"
                loading="lazy"
                decoding="async"
                aria-hidden="true"
              />
            </div>
            <div className="mat-info">
              <span className="mat-name">{mat.name}</span>
              <span className="mat-grade" title={mat.grade}>
                {mat.grade.split(',')[0]}
              </span>
            </div>
            <span className="mat-arrow" aria-hidden="true">→</span>
          </a>
        ))}
      </div>

      {/* Footer Navigation Action */}
      <div className="materials-footer-bar">
        <a
          href="/materials"
          className="materials-footer-link"
          onClick={(e) => handleItemClick(e, '/materials')}
        >
          <span>Explore All Materials</span>
          <span className="mat-footer-arrow" aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  );
}

export default React.memo(MaterialsMegaMenu);
