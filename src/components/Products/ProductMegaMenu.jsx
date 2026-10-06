import React from 'react';
import { PRODUCT_GROUPS } from '../../data/productCatalogData';
import './ProductMegaMenu.css';

/**
 * JUBILANT STEELS — RED INDUSTRIAL PRODUCTS NAVIGATION PANEL
 * Clean 2-column rectangular panel with small thumbnails, horizontal row items, and subtle hover.
 */
const manufacturerGroups = PRODUCT_GROUPS.filter((g) => g.divisionSlug === 'manufacturer');
const supplierGroups = PRODUCT_GROUPS.filter((g) => g.divisionSlug === 'supplier');

function ProductMegaMenu({ isOpen, onSelect, onClose }) {
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
      className={`product-megamenu-panel ${isOpen ? 'is-open' : ''}`}
      role="region"
      aria-label="Products Navigation Menu"
    >
      {/* Top Header Strip */}
      <div className="megamenu-header-bar">
        <div className="megamenu-header-title-wrap">
          <span className="megamenu-header-dash" aria-hidden="true">—</span>
          <span className="megamenu-header-title">PRODUCT RANGE</span>
        </div>
        <span className="megamenu-header-tag">18 Industrial Categories</span>
      </div>

      {/* 2-Column Industrial Grid */}
      <div className="megamenu-columns-wrap">
        {/* Column 1: Manufacturer Division */}
        <div className="megamenu-col">
          <div className="col-header-box">
            <span className="col-title">MANUFACTURER</span>
            <span className="col-sub">In-house Precision Forged & Machined</span>
          </div>
          <div className="megamenu-rows-list">
            {manufacturerGroups.map((group) => (
              <a
                key={group.id}
                href={`/products/manufacturer/${group.slug}`}
                className="megamenu-row-item"
                onClick={(e) => handleItemClick(e, `/products/manufacturer/${group.slug}`)}
              >
                <div className="row-thumb-wrap">
                  <img
                    src={group.heroImage}
                    alt=""
                    className="row-thumb"
                    loading="lazy"
                    decoding="async"
                    aria-hidden="true"
                  />
                </div>
                <div className="row-info">
                  <span className="row-name">{group.name}</span>
                  <span className="row-desc">{group.tagline}</span>
                </div>
                <span className="row-arrow" aria-hidden="true">→</span>
              </a>
            ))}
          </div>
        </div>

        {/* Clean Center Column Divider */}
        <div className="megamenu-col-separator" aria-hidden="true" />

        {/* Column 2: Supplier Division */}
        <div className="megamenu-col">
          <div className="col-header-box">
            <span className="col-title">SUPPLIER</span>
            <span className="col-sub">Global Mill Stockholding & Distribution</span>
          </div>
          <div className="megamenu-rows-list">
            {supplierGroups.map((group) => (
              <a
                key={group.id}
                href={`/products/supplier/${group.slug}`}
                className="megamenu-row-item"
                onClick={(e) => handleItemClick(e, `/products/supplier/${group.slug}`)}
              >
                <div className="row-thumb-wrap">
                  <img
                    src={group.heroImage}
                    alt=""
                    className="row-thumb"
                    loading="lazy"
                    decoding="async"
                    aria-hidden="true"
                  />
                </div>
                <div className="row-info">
                  <span className="row-name">{group.name}</span>
                  <span className="row-desc">{group.tagline}</span>
                </div>
                <span className="row-arrow" aria-hidden="true">→</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Navigation Action */}
      <div className="megamenu-footer-bar">
        <a
          href="/products"
          className="megamenu-footer-link"
          onClick={(e) => handleItemClick(e, '/products')}
        >
          <span>View Complete Products Catalog</span>
          <span className="footer-arrow-icon" aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  );
}

export default React.memo(ProductMegaMenu);
