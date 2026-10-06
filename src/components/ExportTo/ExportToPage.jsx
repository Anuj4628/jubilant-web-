import React, { useState, useMemo, useEffect } from 'react';
import { exportPageHeader, exportRegionsList, exportCountriesData } from '../../data/exportCountriesData';
import './ExportToPage.css';

/**
 * JUBILANT STEELS — "EXPORT TO" / GLOBAL REACH PAGE
 * 
 * Minimal, premium, and lightweight global export directory.
 * Visual-first presentation displaying ONLY official country flags.
 * Country names are accessible via ARIA / alt text, strictly NOT rendered visually.
 */
export default function ExportToPage({ onNavigate }) {
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // SEO Page Title management (for standalone route)
  useEffect(() => {
    if (window.location.pathname.includes('export') || window.location.pathname.includes('global-reach')) {
      const originalTitle = document.title;
      document.title = 'Global Reach & Export Destinations | Jubilant Steels';
      window.scrollTo({ top: 0, behavior: 'instant' });
      return () => {
        document.title = originalTitle;
      };
    }
  }, []);

  // Filter countries by region and search query (matches against underlying country name)
  const filteredCountries = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return exportCountriesData.filter((country) => {
      const matchesRegion =
        selectedRegion === 'all' || country.region === selectedRegion;

      const matchesSearch =
        !q || country.name.toLowerCase().includes(q) || country.code.toLowerCase().includes(q);

      return matchesRegion && matchesSearch;
    });
  }, [selectedRegion, searchQuery]);

  const handleResetFilters = () => {
    setSelectedRegion('all');
    setSearchQuery('');
  };

  return (
    <section id="export" className="export-page-container" aria-labelledby="export-heading">
      {/* Background Architectural Grid Pattern */}
      <div className="export-bg-pattern" aria-hidden="true" />

      {/* Main Section Content */}
      <div className="export-content-wrapper">
        
        {/* 1. Header / Hero Area */}
        <header className="export-hero-header">
          <div className="export-eyebrow">
            <span className="export-eyebrow-dash" aria-hidden="true">—</span>
            <span className="export-eyebrow-text">{exportPageHeader.eyebrow}</span>
          </div>

          <h2 id="export-heading" className="export-main-title">
            {exportPageHeader.title}
          </h2>

          <p className="export-main-description">
            {exportPageHeader.description}
          </p>
        </header>

        {/* 2. Interactive Control Bar: Search + Region Filters */}
        <div className="export-controls-panel">
          
          {/* Search Input Field */}
          <div className="export-search-box">
            <label htmlFor="export-country-search" className="sr-only">
              Search countries
            </label>
            <span className="export-search-icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </span>
            <input
              id="export-country-search"
              type="text"
              className="export-search-input"
              placeholder="Search countries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoComplete="off"
              spellCheck="false"
            />
            {searchQuery && (
              <button
                type="button"
                className="export-search-clear-btn"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search query"
              >
                ×
              </button>
            )}
          </div>

          {/* Region Tabs */}
          <div className="export-regions-bar" role="tablist" aria-label="Filter countries by geographic region">
            {exportRegionsList.map((region) => {
              const isActive = selectedRegion === region.id;
              return (
                <button
                  key={region.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`export-region-btn ${isActive ? 'active' : ''}`}
                  onClick={() => setSelectedRegion(region.id)}
                >
                  {region.label}
                </button>
              );
            })}
          </div>

          {/* Dynamic Result Count */}
          <div className="export-status-bar" aria-live="polite">
            <span className="export-count-badge">
              <strong>{filteredCountries.length}</strong> {filteredCountries.length === 1 ? 'destination' : 'destinations'}
            </span>
            {(selectedRegion !== 'all' || searchQuery) && (
              <button
                type="button"
                className="export-reset-link"
                onClick={handleResetFilters}
              >
                Reset filters
              </button>
            )}
          </div>
        </div>

        {/* 3. Pure Flag Country Grid (Strictly NO Country Names inside cards) */}
        {filteredCountries.length > 0 ? (
          <div
            className="export-flags-grid"
            role="region"
            aria-label="Export Destination Countries"
          >
            {filteredCountries.map((country) => (
              <div
                key={country.id}
                className="export-flag-card"
                role="article"
                aria-label={country.name}
                tabIndex={0}
              >
                <div className="export-flag-frame">
                  <img
                    src={country.flag}
                    alt={country.name}
                    className="export-flag-img"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Clean Empty State */
          <div className="export-empty-state" role="status">
            <div className="export-empty-icon" aria-hidden="true">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="8" y1="12" x2="16" y2="12" />
              </svg>
            </div>
            <h3 className="export-empty-title">No matching destinations found.</h3>
            <p className="export-empty-text">
              Try adjusting your search query or selecting "All" regions.
            </p>
            <button
              type="button"
              className="export-empty-reset-btn"
              onClick={handleResetFilters}
            >
              Show All Destinations
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
