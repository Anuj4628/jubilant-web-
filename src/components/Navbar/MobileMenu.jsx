import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { navLinks, brandDetails } from '../../data/navigationData';
import { MATERIALS } from '../../data/materialsData';
import { PRODUCT_GROUPS } from '../../data/productCatalogData';
import Button from '../UI/Button';
import { Plus, Minus } from 'lucide-react';
import './MobileMenu.css';

const manufacturerGroups = PRODUCT_GROUPS.filter((g) => g.divisionSlug === 'manufacturer');
const supplierGroups = PRODUCT_GROUPS.filter((g) => g.divisionSlug === 'supplier');

export default function MobileMenu({ isOpen, onClose, activeLink, currentPage, onNavigate }) {
  const [productsExpanded, setProductsExpanded] = useState(false);
  const [materialsExpanded, setMaterialsExpanded] = useState(false);
  const menuRef = useRef(null);
  const linksContainerRef = useRef(null);
  const footerRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    const el = menuRef.current;
    if (!el) return;

    if (isOpen) {
      document.body.style.overflow = 'hidden';

      // Kill any running animations
      if (timelineRef.current) timelineRef.current.kill();

      const tl = gsap.timeline();
      timelineRef.current = tl;

      // Set initial state
      gsap.set(el, { display: 'flex', opacity: 0, y: -20 });
      gsap.set(linksContainerRef.current?.children || [], { opacity: 0, y: 25 });
      gsap.set(footerRef.current, { opacity: 0, y: 20 });

      // Animate in
      tl.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.35,
        ease: 'power3.out'
      })
      .to(linksContainerRef.current?.children || [], {
        opacity: 1,
        y: 0,
        stagger: 0.04,
        duration: 0.3,
        ease: 'power3.out'
      }, '-=0.18')
      .to(footerRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.25,
        ease: 'power2.out'
      }, '-=0.12');

    } else {
      document.body.style.overflow = '';

      if (timelineRef.current) timelineRef.current.kill();

      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(el, { display: 'none' });
        }
      });
      timelineRef.current = tl;

      tl.to(linksContainerRef.current?.children || [], {
        opacity: 0,
        y: -15,
        stagger: 0.02,
        duration: 0.18,
        ease: 'power2.in'
      })
      .to(el, {
        opacity: 0,
        y: -20,
        duration: 0.22,
        ease: 'power2.in'
      }, '-=0.1');
    }

    return () => {
      document.body.style.overflow = '';
      if (timelineRef.current) timelineRef.current.kill();
    };
  }, [isOpen]);

  const handleLinkClick = (e, id) => {
    e.preventDefault();
    if (id === 'materials') {
      setMaterialsExpanded(prev => !prev);
      return;
    }

    setMaterialsExpanded(false);
    onClose();
    if (onNavigate) {
      if (id === 'about') {
        onNavigate('about');
      } else if (id === 'certificate') {
        onNavigate('certificate');
      } else if (id === 'contact') {
        onNavigate('contact');
      } else if (id === 'home') {
        onNavigate('home');
      } else if (id === 'products') {
        onNavigate('/products');
      } else if (id === 'materials') {
        onNavigate('/materials');
      } else {
        onNavigate(id);
      }
    }
  };

  const handleSubProductClick = (e, url) => {
    e.preventDefault();
    setProductsExpanded(false);
    onClose();
    if (onNavigate) {
      onNavigate(url);
    }
  };

  const handleSubMaterialClick = (e, slug) => {
    e.preventDefault();
    setMaterialsExpanded(false);
    onClose();
    if (onNavigate) {
      if (slug === 'all') {
        onNavigate('/materials');
      } else {
        onNavigate(`/materials/${slug}`);
      }
    }
  };

  return (
    <div
      ref={menuRef}
      className={`mobile-menu-overlay ${isOpen ? 'is-open' : ''}`}
      aria-hidden={!isOpen}
      role="dialog"
      aria-modal="true"
    >
      <div className="mobile-menu-inner">
        {/* Navigation items */}
        <ul ref={linksContainerRef} className="mobile-nav-list">
          {navLinks.map((link, index) => {
            const isActive = activeLink === link.id;
            const isProducts = link.id === 'products';
            const isMaterials = link.id === 'materials';

            let targetHref = link.href;
            if (link.id === 'about') targetHref = '/about';
            else if (link.id === 'certificate') targetHref = '/certificate';
            else if (link.id === 'contact') targetHref = '/contact';
            else if (link.id === 'products') targetHref = '/products';
            else if (link.id === 'materials') targetHref = '/materials';

            return (
              <li
                key={link.id}
                className={`mobile-nav-item ${(isProducts || isMaterials) ? 'has-subnav' : ''}`}
              >
                <div className="mobile-nav-row">
                  <a
                    href={targetHref}
                    className={`mobile-nav-link ${isActive ? 'active' : ''}`}
                    onClick={(e) => {
                      if (isProducts) {
                        e.preventDefault();
                        setProductsExpanded((prev) => !prev);
                      } else if (isMaterials) {
                        e.preventDefault();
                        setMaterialsExpanded((prev) => !prev);
                      } else {
                        handleLinkClick(e, link.id);
                      }
                    }}
                  >
                    <span className="mobile-link-number">0{index + 1}</span>
                    <span className="mobile-link-title">{link.label}</span>
                    <span className="mobile-link-accent" />
                  </a>

                  {isProducts && (
                    <button
                      type="button"
                      className={`mobile-subnav-toggle ${productsExpanded ? 'expanded' : ''}`}
                      onClick={() => setProductsExpanded((prev) => !prev)}
                      aria-label={productsExpanded ? 'Collapse Products Menu' : 'Expand Products Menu'}
                      aria-expanded={productsExpanded}
                    >
                      {productsExpanded ? <Minus size={18} /> : <Plus size={18} />}
                    </button>
                  )}

                  {isMaterials && (
                    <button
                      type="button"
                      className={`mobile-subnav-toggle ${materialsExpanded ? 'expanded' : ''}`}
                      onClick={() => setMaterialsExpanded((prev) => !prev)}
                      aria-label={materialsExpanded ? 'Collapse Materials Menu' : 'Expand Materials Menu'}
                      aria-expanded={materialsExpanded}
                    >
                      {materialsExpanded ? <Minus size={18} /> : <Plus size={18} />}
                    </button>
                  )}
                </div>

                {/* Expandable Products Sub-menu */}
                {isProducts && productsExpanded && (
                  <div className="mobile-subnav-container">
                    <a
                      href="/products"
                      className="mobile-subnav-item mobile-subnav-overview"
                      onClick={(e) => handleSubProductClick(e, '/products')}
                    >
                      <span>Explore All Products (18 Families)</span>
                      <span className="mobile-subnav-badge">View All →</span>
                    </a>

                    <div className="mobile-subnav-section-title">MANUFACTURER DIVISION</div>
                    <div className="mobile-subnav-grid">
                      {manufacturerGroups.map((group) => (
                        <a
                          key={group.id}
                          href={`/products/manufacturer/${group.slug}`}
                          className="mobile-subnav-item"
                          onClick={(e) => handleSubProductClick(e, `/products/manufacturer/${group.slug}`)}
                        >
                          <span className="subnav-mat-name">{group.name}</span>
                          <span className="subnav-mat-tag">{group.tagline}</span>
                        </a>
                      ))}
                    </div>

                    <div className="mobile-subnav-section-title" style={{ marginTop: '12px' }}>
                      SUPPLIER DIVISION
                    </div>
                    <div className="mobile-subnav-grid">
                      {supplierGroups.map((group) => (
                        <a
                          key={group.id}
                          href={`/products/supplier/${group.slug}`}
                          className="mobile-subnav-item"
                          onClick={(e) => handleSubProductClick(e, `/products/supplier/${group.slug}`)}
                        >
                          <span className="subnav-mat-name">{group.name}</span>
                          <span className="subnav-mat-tag">{group.tagline}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Expandable Materials Sub-menu */}
                {isMaterials && materialsExpanded && (
                  <div className="mobile-subnav-container">
                    <a
                      href="/materials"
                      className="mobile-subnav-item mobile-subnav-overview"
                      onClick={(e) => handleSubMaterialClick(e, 'all')}
                    >
                      <span>Explore All 9 Metallurgical Grades</span>
                      <span className="mobile-subnav-badge">View All →</span>
                    </a>

                    <div className="mobile-subnav-grid">
                      {MATERIALS.map((mat) => (
                        <a
                          key={mat.id}
                          href={`/materials/${mat.slug}`}
                          className="mobile-subnav-item"
                          onClick={(e) => handleSubMaterialClick(e, mat.slug)}
                        >
                          <span className="subnav-mat-name">{mat.name}</span>
                          <span className="subnav-mat-tag">
                            {mat.grade.split(',')[0].split('/')[0].trim()}
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        {/* Footer info & Get Code primary CTA */}
        <div ref={footerRef} className="mobile-menu-footer">
          <Button
            href="/get-code"
            variant="primary"
            size="md"
            icon="arrow"
            onClick={(e) => {
              e.preventDefault();
              onClose();
              if (onNavigate) onNavigate('get-code');
            }}
            className="mobile-quote-btn"
          >
            Get Code
          </Button>

          <div className="mobile-brand-meta">
            <span className="mobile-brand-name">JUBILANT STEELS</span>
            <span className="mobile-brand-desc">{brandDetails.tagline}</span>
          </div>
        </div>

      </div>
    </div>
  );
}
