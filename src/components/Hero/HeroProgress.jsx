import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './HeroControls.css';

export default function HeroProgress({
  currentSlideIndex,
  totalSlides,
  progressPercent,
  direction = 1,
  onSelectSlide
}) {
  const currentFormatted = String(currentSlideIndex + 1).padStart(2, '0');
  const totalFormatted = String(totalSlides).padStart(2, '0');
  const numberRef = useRef(null);
  const isFirstMount = useRef(true);

  // Vertical rolling animation for current slide number matching slide direction
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }

    if (!numberRef.current) return;

    const isNext = direction > 0;
    const startY = isNext ? 18 : -18;

    gsap.fromTo(
      numberRef.current,
      { y: startY, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.45, ease: 'power2.out' }
    );
  }, [currentSlideIndex, direction]);

  return (
    <div className="hero-progress-wrapper" aria-label="Hero Slider Progress">
      {/* 1. Industrial Numeric Counter with Vertical Number Roll */}
      <div className="hero-counter" aria-live="polite">
        <div className="counter-current-window">
          <span ref={numberRef} className="counter-current">
            {currentFormatted}
          </span>
        </div>
        <span className="counter-divider" aria-hidden="true">/</span>
        <span className="counter-total">{totalFormatted}</span>
      </div>

      {/* 2. Interactive Segmented Progress Bars */}
      <div className="hero-progress-segments" role="tablist" aria-label="Slide Selector">
        {Array.from({ length: totalSlides }).map((_, idx) => {
          const isActive = idx === currentSlideIndex;
          const isPassed = idx < currentSlideIndex;
          const fillWidth = isActive ? `${progressPercent}%` : isPassed ? '100%' : '0%';

          return (
            <button
              key={idx}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={`Go to slide ${idx + 1}`}
              className={`progress-segment-btn ${isActive ? 'is-active' : ''}`}
              onClick={() => onSelectSlide(idx)}
            >
              <span className="progress-segment-track">
                <span
                  className="progress-segment-fill"
                  style={{ width: fillWidth }}
                  aria-hidden="true"
                />
              </span>
              <span className="progress-segment-number">0{idx + 1}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
