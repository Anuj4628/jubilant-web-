import React, { useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import Button from '../UI/Button';
import { productShowcaseCards } from '../../data/productShowcaseData';
import './ProductShowcaseSection.css';

/**
 * Single Tall + Narrow Product Card with Subtle 3D Mouse Tilt
 */
function ShowcaseCard({ card, onNavigate }) {
  const cardRef = useRef(null);
  const [imgLoaded, setImgLoaded] = useState(false);

  // Subtle mouse-based 3D tilt (2-3 degrees maximum)
  const handleMouseMove = (e) => {
    // Disable on touch / mobile devices
    if (window.matchMedia('(hover: none)').matches) return;
    const el = cardRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (((y - centerY) / centerY) * -2.8).toFixed(2);
    const rotateY = (((x - centerX) / centerX) * 2.8).toFixed(2);

    el.style.transform = `perspective(1000px) translateY(-6px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = 'perspective(1000px) translateY(0) rotateX(0deg) rotateY(0deg)';
  };

  const handleCardClick = (e) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(card.route || '/products');
    }
  };

  return (
    <article
      ref={cardRef}
      className="showcase-card"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
      tabIndex={0}
      role="link"
      aria-label={`${card.title} - View specifications and range`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleCardClick(e);
        }
      }}
    >
      {/* Top Editorial Numbering & Badge */}
      <div className="showcase-card-header">
        <span className="showcase-card-number">{card.number}</span>
        <span className="showcase-card-category-indicator" aria-hidden="true" />
      </div>

      {/* Primary Visual Element: Large Product Area with Clean Crop */}
      <div className="showcase-card-media">
        <img
          src={card.image}
          alt={card.alt}
          className={`showcase-card-img ${imgLoaded ? 'is-loaded' : ''}`}
          loading="lazy"
          decoding="async"
          onLoad={() => setImgLoaded(true)}
        />
        {/* Subtle gradient vignette to maintain contrast while keeping steel product fully visible */}
        <div className="showcase-card-scrim" aria-hidden="true" />
      </div>

      {/* Card Content: Title + 1-2 Line Industrial Description */}
      <div className="showcase-card-body">
        <div className="showcase-card-title-row">
          <h3 className="showcase-card-title">{card.title}</h3>
          <span className="showcase-card-action-icon" aria-hidden="true">
            <ArrowUpRight size={17} />
          </span>
        </div>
        <p className="showcase-card-desc">{card.description}</p>
      </div>

      {/* Subtle Jubilant Red hover accent line */}
      <div className="showcase-card-accent-bar" aria-hidden="true" />
    </article>
  );
}

/**
 * JUBILANT STEELS — PRODUCTS SHOWCASE SECTION
 * Homepage Second Section displaying 8 curated major product categories.
 */
export default function ProductShowcaseSection({ onNavigate }) {
  return (
    <section
      id="product-range"
      className="product-showcase-section"
      aria-labelledby="product-showcase-heading"
    >
      <div className="showcase-container">
        {/* Section Header: Eyebrow + Main Heading + 2-Line Description */}
        <header className="showcase-header">
          <div className="showcase-eyebrow">
            <span className="showcase-eyebrow-line" aria-hidden="true" />
            <span className="showcase-eyebrow-text">OUR PRODUCT RANGE</span>
            <span className="showcase-eyebrow-line" aria-hidden="true" />
          </div>

          <h2 id="product-showcase-heading" className="showcase-heading">
            Engineered Products for Demanding Industries
          </h2>

          <p className="showcase-description">
            Explore our range of precision-engineered steel products, fittings and industrial components designed for demanding applications across diverse industries.
          </p>
        </header>

        {/* 8 Product Cards Grid: 4 Desktop / 2 Tablet / 1 Mobile */}
        <div className="showcase-grid" role="region" aria-label="Product Categories">
          {productShowcaseCards.map((card) => (
            <ShowcaseCard
              key={card.id}
              card={card}
              onNavigate={onNavigate}
            />
          ))}
        </div>

        {/* View All Products CTA with Global Left-to-Right Wave Fill */}
        <footer className="showcase-footer">
          <Button
            variant="primary"
            size="lg"
            onClick={(e) => {
              e?.preventDefault?.();
              if (onNavigate) {
                onNavigate('/products');
              }
            }}
            aria-label="View complete product catalogue"
            className="showcase-all-products-btn"
          >
            View All Products
          </Button>
        </footer>
      </div>
    </section>
  );
}
