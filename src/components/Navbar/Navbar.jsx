import React, { useState, useEffect, useRef, useCallback } from 'react';
import { navLinks, brandDetails } from '../../data/navigationData';
import Button from '../UI/Button';
import MobileMenu from './MobileMenu';
import TopContactBar from './TopContactBar';
import ProductMegaMenu from '../Products/ProductMegaMenu';
import MaterialsMegaMenu from './MaterialsMegaMenu';
import { Menu, X } from 'lucide-react';
import { preloadRoute } from '../../utils/preloadRoute';
import './Navbar.css';


export default function Navbar({ currentPage = 'home', onNavigate }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [materialsMenuOpen, setMaterialsMenuOpen] = useState(false);
  const megaMenuTimeoutRef = useRef(null);
  const materialsMenuTimeoutRef = useRef(null);

  const activeLink = currentPage;
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleMouseEnterProducts = useCallback(() => {
    if (megaMenuTimeoutRef.current) {
      clearTimeout(megaMenuTimeoutRef.current);
    }
    setMaterialsMenuOpen(false);
    setMegaMenuOpen(true);
    preloadRoute('products');
  }, []);

  const handleMouseLeaveProducts = useCallback(() => {
    megaMenuTimeoutRef.current = setTimeout(() => {
      setMegaMenuOpen(false);
    }, 180);
  }, []);

  const handleMouseEnterMaterials = useCallback(() => {
    if (materialsMenuTimeoutRef.current) {
      clearTimeout(materialsMenuTimeoutRef.current);
    }
    setMegaMenuOpen(false);
    setMaterialsMenuOpen(true);
    preloadRoute('materials');
  }, []);

  const handleMouseLeaveMaterials = useCallback(() => {
    materialsMenuTimeoutRef.current = setTimeout(() => {
      setMaterialsMenuOpen(false);
    }, 180);
  }, []);

  const handleMegaMenuSelect = useCallback((url) => {
    setMegaMenuOpen(false);
    if (onNavigate) onNavigate(url);
  }, [onNavigate]);

  const handleMaterialsMenuSelect = useCallback((url) => {
    setMaterialsMenuOpen(false);
    if (onNavigate) onNavigate(url);
  }, [onNavigate]);

  const handleMegaMenuClose = useCallback(() => {
    setMegaMenuOpen(false);
  }, []);

  const handleMaterialsMenuClose = useCallback(() => {
    setMaterialsMenuOpen(false);
  }, []);

  const handleLinkClick = (e, link) => {
    e.preventDefault();
    setMegaMenuOpen(false);
    setMaterialsMenuOpen(false);
    if (onNavigate) {
      if (link.id === 'about') {
        onNavigate('about');
      } else if (link.id === 'certificate') {
        onNavigate('certificate');
      } else if (link.id === 'contact') {
        onNavigate('contact');
      } else if (link.id === 'home') {
        onNavigate('home');
      } else if (link.id === 'products') {
        onNavigate('/products');
      } else if (link.id === 'materials') {
        onNavigate('/materials');
      } else {
        onNavigate(link.href || '/');
      }
    }
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    setMegaMenuOpen(false);
    setMaterialsMenuOpen(false);
    if (onNavigate) {
      onNavigate('home');
    }
  };

  const handleGetCodeClick = (e) => {
    e.preventDefault();
    setMegaMenuOpen(false);
    setMaterialsMenuOpen(false);
    if (onNavigate) {
      onNavigate('get-code');
    }
  };

  return (
    <>
      <header
        ref={navRef}
        className={`navbar-wrapper ${isScrolled ? 'is-scrolled' : 'at-top'}`}
        id="main-navbar"
      >
        {/* Top Quick Contact Strip */}
        <TopContactBar />

        <div className="navbar-container">
          {/* 1. Logo Area */}
          <a
            href="/"
            className="navbar-logo-link"
            aria-label="Jubilant Steels Home"
            onClick={handleLogoClick}
          >
            <div className="navbar-logo-wrap">
              <img
                src={brandDetails.logoUrl}
                alt="Jubilant Steels"
                className="navbar-brand-logo"
              />
            </div>
          </a>

          {/* 2. Desktop Navigation: Logo | Home | About | Products | Materials | Certificate | Contact */}
          <nav className="navbar-nav-desktop" aria-label="Main Navigation">
            <ul className="navbar-links-list">
              {navLinks.map((link) => {
                const isActive = activeLink === link.id;
                const isProducts = link.id === 'products';
                const isMaterials = link.id === 'materials';

                let mouseEnterHandler = undefined;
                if (isProducts) mouseEnterHandler = handleMouseEnterProducts;
                else if (isMaterials) mouseEnterHandler = handleMouseEnterMaterials;
                else if (link.id === 'about') mouseEnterHandler = () => preloadRoute('about');
                else if (link.id === 'certificate') mouseEnterHandler = () => preloadRoute('certificate');
                else if (link.id === 'contact') mouseEnterHandler = () => preloadRoute('contact');

                let mouseLeaveHandler = undefined;
                if (isProducts) mouseLeaveHandler = handleMouseLeaveProducts;
                else if (isMaterials) mouseLeaveHandler = handleMouseLeaveMaterials;

                let linkHref = link.href;
                if (link.id === 'home') linkHref = '/';
                else if (link.id === 'about') linkHref = '/about';
                else if (link.id === 'certificate') linkHref = '/certificate';
                else if (link.id === 'contact') linkHref = '/contact';
                else if (isProducts) linkHref = '/products';
                else if (isMaterials) linkHref = '/materials';

                const isDropdownOpen = (isProducts && megaMenuOpen) || (isMaterials && materialsMenuOpen);

                return (
                  <li
                    key={link.id}
                    className={`navbar-item ${isProducts ? 'products-item' : ''} ${isMaterials ? 'materials-item' : ''}`}
                    onMouseEnter={mouseEnterHandler}
                    onMouseLeave={mouseLeaveHandler}
                  >
                    <a
                      href={linkHref}
                      className={`navbar-link ${isActive ? 'active' : ''} ${isDropdownOpen ? 'dropdown-active' : ''}`}
                      onClick={(e) => handleLinkClick(e, link)}
                    >
                      <span className="navbar-link-text">
                        {link.label}
                        {(isProducts || isMaterials) && (
                          <svg
                            className={`nav-dropdown-chevron ${(isProducts ? megaMenuOpen : materialsMenuOpen) ? 'rotated' : ''}`}
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            style={{
                              marginLeft: '4px',
                              display: 'inline-block',
                              verticalAlign: 'middle',
                              transition: 'transform 0.2s ease',
                              transform: (isProducts ? megaMenuOpen : materialsMenuOpen) ? 'rotate(180deg)' : 'rotate(0deg)'
                            }}
                          >
                            <polyline points="6 9 12 15 18 9"></polyline>
                          </svg>
                        )}
                      </span>
                      <span className="navbar-link-indicator" aria-hidden="true" />
                    </a>

                    {isProducts && (
                      <ProductMegaMenu
                        isOpen={megaMenuOpen}
                        onSelect={handleMegaMenuSelect}
                        onClose={handleMegaMenuClose}
                      />
                    )}

                    {isMaterials && (
                      <MaterialsMegaMenu
                        isOpen={materialsMenuOpen}
                        onSelect={handleMaterialsMenuSelect}
                        onClose={handleMaterialsMenuClose}
                      />
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* 3. Get Code Primary CTA (Visually Highlighted) */}
          <div className="navbar-actions-desktop">
            <Button
              href="/get-code"
              variant="nav-quote"
              size="sm"
              icon="arrow"
              onClick={handleGetCodeClick}
            >
              Get Code
            </Button>
          </div>

          {/* 4. Mobile Hamburger Toggle */}
          <button
            type="button"
            className={`navbar-mobile-toggle ${mobileMenuOpen ? 'open' : ''}`}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={mobileMenuOpen}
          >
            <span className="hamburger-box">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </span>
          </button>
        </div>
      </header>

      {/* Fullscreen Mobile Menu Drawer */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        activeLink={activeLink}
        currentPage={currentPage}
        onNavigate={onNavigate}
      />
    </>
  );
}
