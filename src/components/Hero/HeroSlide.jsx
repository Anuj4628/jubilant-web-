import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Button from '../UI/Button';
import './HeroSlide.css';

/**
 * Renders headline with clean line-break handling
 */
function renderHeadline(headline) {
  if (!headline) return null;
  return headline.split('\n').map((line, idx) => (
    <React.Fragment key={idx}>
      {line}
      {idx < headline.split('\n').length - 1 && <br className="hero-headline-br" />}
    </React.Fragment>
  ));
}

function HeroSlide({ slide, isActive, direction = 1, onNavigate }) {
  const slideRef = useRef(null);
  const bgImageRef = useRef(null);
  const contentWrapRef = useRef(null);
  const revealLineRef = useRef(null);
  const eyebrowRef = useRef(null);
  const headlineMaskRef = useRef(null);
  const headlineRef = useRef(null);
  const descRef = useRef(null);
  const ctaGroupRef = useRef(null);
  const specTagRef = useRef(null);
  const timelineRef = useRef(null);
  const wasActiveRef = useRef(isActive);

  useEffect(() => {
    if (!slideRef.current) return;

    if (isActive) {
      if (timelineRef.current) timelineRef.current.kill();

      const tl = gsap.timeline();
      timelineRef.current = tl;

      // Bring active slide to top layer
      gsap.set(slideRef.current, {
        zIndex: 2,
        visibility: 'visible',
        opacity: 1
      });

      // ==========================================
      // DIRECTION-AWARE VERTICAL ENTRANCE
      // Next (direction > 0): from BOTTOM -> TOP
      // Prev (direction < 0): from TOP -> BOTTOM
      // ==========================================
      const isNext = direction > 0;
      const bgStartPercent = isNext ? 8 : -8;
      const contentStartPercent = isNext ? 22 : -22;
      const textOffset = isNext ? 35 : -35;
      const minorOffset = isNext ? 15 : -15;

      // Initial state: Layered offsets
      gsap.set(bgImageRef.current, {
        yPercent: bgStartPercent,
        scale: 1.03,
        opacity: 0
      });

      gsap.set(contentWrapRef.current, {
        yPercent: contentStartPercent,
        opacity: 0
      });

      if (revealLineRef.current) {
        gsap.set(revealLineRef.current, {
          scaleY: 0,
          transformOrigin: isNext ? 'bottom center' : 'top center',
          opacity: 0.85
        });
      }

      gsap.set(eyebrowRef.current, { y: minorOffset, opacity: 0 });
      gsap.set(headlineRef.current, { y: textOffset, opacity: 0 });
      gsap.set(descRef.current, { y: minorOffset, opacity: 0 });
      gsap.set(ctaGroupRef.current?.children || [], { y: minorOffset, opacity: 0 });
      if (specTagRef.current) {
        gsap.set(specTagRef.current, { y: minorOffset, opacity: 0 });
      }

      // 1. Layered Background Reveal (Smooth power3.out, subtle scale settle)
      tl.to(bgImageRef.current, {
        yPercent: 0,
        scale: 1.0,
        opacity: 1,
        duration: 0.95,
        ease: 'power3.out'
      }, 0)

      // 2. Entire Content Block Moves Vertically with Layered Easing
      .to(contentWrapRef.current, {
        yPercent: 0,
        opacity: 1,
        duration: 0.85,
        ease: 'power3.out'
      }, 0.08)

      // 3. Subtle Industrial Reveal Line Draws In
      .to(revealLineRef.current, {
        scaleY: 1,
        duration: 0.55,
        ease: 'power2.out'
      }, 0.15)

      // 4. Content Stagger: Eyebrow (0.18s)
      .to(eyebrowRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.45,
        ease: 'power2.out'
      }, 0.18)

      // 5. Masked Editorial Headline Line-Level Reveal (0.26s)
      .to(headlineRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.65,
        ease: 'power3.out'
      }, 0.26)

      // 6. Supporting Description Follows (0.38s)
      .to(descRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.48,
        ease: 'power2.out'
      }, 0.38)

      // 7. CTA Buttons Enter (0.48s)
      .to(ctaGroupRef.current?.children || [], {
        y: 0,
        opacity: 1,
        stagger: 0.08,
        duration: 0.42,
        ease: 'power2.out'
      }, 0.48)

      // 8. Spec Tag
      .to(specTagRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out'
      }, 0.58);

      wasActiveRef.current = true;

    } else {
      // ==========================================
      // DIRECTION-AWARE VERTICAL EXIT
      // Only animate exit if the slide was previously active
      // Next (direction > 0): exits UPWARD
      // Prev (direction < 0): exits DOWNWARD
      // ==========================================
      if (timelineRef.current) timelineRef.current.kill();

      if (wasActiveRef.current) {
        const isNext = direction > 0;
        const bgExitPercent = isNext ? -8 : 8;
        const contentExitPercent = isNext ? -20 : 20;

        const tl = gsap.timeline({
          onComplete: () => {
            if (slideRef.current) {
              gsap.set(slideRef.current, {
                zIndex: 1,
                visibility: 'hidden',
                opacity: 0
              });
            }
          }
        });
        timelineRef.current = tl;

        tl.to(bgImageRef.current, {
          yPercent: bgExitPercent,
          opacity: 0,
          duration: 0.72,
          ease: 'power2.inOut'
        }, 0)
        .to(contentWrapRef.current, {
          yPercent: contentExitPercent,
          opacity: 0,
          duration: 0.6,
          ease: 'power2.in'
        }, 0)
        .to(revealLineRef.current, {
          scaleY: 0,
          opacity: 0,
          duration: 0.35,
          ease: 'power2.in'
        }, 0)
        .to(slideRef.current, {
          opacity: 0,
          duration: 0.72,
          ease: 'power2.inOut'
        }, 0);

        wasActiveRef.current = false;
      } else {
        // Was never active: ensure hidden immediately
        gsap.set(slideRef.current, {
          zIndex: 1,
          visibility: 'hidden',
          opacity: 0
        });
      }
    }

    return () => {
      if (timelineRef.current) timelineRef.current.kill();
    };
  }, [isActive, direction]);

  return (
    <div
      ref={slideRef}
      className={`hero-slide ${isActive ? 'is-active' : ''}`}
      aria-hidden={!isActive}
    >
      {/* Background Image Layer - High clarity, authentic industrial steel view */}
      <div className="hero-slide-bg">
        <img
          ref={bgImageRef}
          src={slide.image}
          alt={slide.alt}
          className="hero-slide-image"
          loading={slide.id === 1 ? 'eager' : 'lazy'}
          fetchPriority={slide.id === 1 ? 'high' : 'auto'}
          decoding={slide.id === 1 ? 'sync' : 'async'}
        />
        {/* Subtle localized horizontal gradient behind text to guarantee contrast */}
        <div className="hero-slide-localized-mask" aria-hidden="true" />
      </div>

      {/* Content Container - Natural typography directly over image */}
      <div className="hero-slide-content-wrap">
        <div className="hero-slide-container">
          <div ref={contentWrapRef} className="hero-text-block">
            {/* Subtle Industrial Reveal Line */}
            <div ref={revealLineRef} className="hero-reveal-line" aria-hidden="true" />

            <div className="hero-text-inner">
              {/* 1. Small Eyebrow with Brand Red Indicator */}
              <div ref={eyebrowRef} className="hero-eyebrow">
                <span className="eyebrow-accent-bar" aria-hidden="true" />
                <span className="eyebrow-text">{slide.eyebrow}</span>
              </div>

              {/* 2. Masked Headline Container for Line-Level Vertical Reveal */}
              <div ref={headlineMaskRef} className="hero-headline-mask">
                <h1 ref={headlineRef} className="hero-headline">
                  {renderHeadline(slide.headline)}
                </h1>
              </div>

              {/* 3. Short Supporting Paragraph */}
              <p ref={descRef} className="hero-description">
                {slide.description}
              </p>

              {/* 4. Dual CTA Buttons */}
              <div ref={ctaGroupRef} className="hero-cta-group">
                <Button
                  href={slide.primaryCta.href}
                  variant="primary"
                  size="lg"
                  icon="arrow"
                  onClick={(e) => {
                    if (onNavigate && slide.primaryCta.href) {
                      e.preventDefault();
                      onNavigate(slide.primaryCta.href);
                    }
                  }}
                >
                  {slide.primaryCta.label}
                </Button>

                {slide.secondaryCta && (
                  <Button
                    href={slide.secondaryCta.href}
                    variant="secondary"
                    size="lg"
                    icon="chevron"
                    onClick={(e) => {
                      if (onNavigate && slide.secondaryCta.href) {
                        e.preventDefault();
                        onNavigate(slide.secondaryCta.href);
                      }
                    }}
                  >
                    {slide.secondaryCta.label}
                  </Button>
                )}
              </div>

              {/* 5. Clean Engineering Specification Tag */}
              {slide.specTag && (
                <div ref={specTagRef} className="hero-spec-tag">
                  <span className="spec-indicator" aria-hidden="true" />
                  <span className="spec-text">{slide.specTag}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(HeroSlide);
