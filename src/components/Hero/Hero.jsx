import React, { useState, useEffect, useRef, useCallback } from 'react';
import { heroSlides } from '../../data/slidesData';
import HeroSlide from './HeroSlide';
import HeroProgress from './HeroProgress';
import HeroNavigation from './HeroNavigation';
import './Hero.css';

const SLIDE_DURATION_MS = 5500; // 5.5s autoplay per slide
const PROGRESS_INTERVAL_MS = 50;
const ANIMATION_LOCK_DURATION_MS = 820; // Prevents animation stacking on rapid clicks

export default function Hero({ onNavigate }) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [progressPercent, setProgressPercent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const totalSlides = heroSlides.length;

  const progressRef = useRef(0);
  const timerRef = useRef(null);
  const isAnimatingRef = useRef(false);
  const animLockTimeoutRef = useRef(null);

  // Transition to a specific slide with direction awareness and click protection
  const goToSlide = useCallback((newIndex, newDirection = 1) => {
    if (isAnimatingRef.current) return;
    if (newIndex === currentSlideIndex) return;

    isAnimatingRef.current = true;
    if (animLockTimeoutRef.current) clearTimeout(animLockTimeoutRef.current);
    animLockTimeoutRef.current = setTimeout(() => {
      isAnimatingRef.current = false;
    }, ANIMATION_LOCK_DURATION_MS);

    setDirection(newDirection);
    setCurrentSlideIndex(newIndex);
    progressRef.current = 0;
    setProgressPercent(0);
  }, [currentSlideIndex]);

  const handleNext = useCallback(() => {
    goToSlide((currentSlideIndex + 1) % totalSlides, 1);
  }, [currentSlideIndex, totalSlides, goToSlide]);

  const handlePrev = useCallback(() => {
    goToSlide((currentSlideIndex - 1 + totalSlides) % totalSlides, -1);
  }, [currentSlideIndex, totalSlides, goToSlide]);

  // Autoplay loop with smooth progress tracking and pause on hover
  useEffect(() => {
    if (isPaused) return;

    const step = PROGRESS_INTERVAL_MS;
    const increment = (step / SLIDE_DURATION_MS) * 100;

    timerRef.current = setInterval(() => {
      if (document.hidden) return;

      progressRef.current += increment;
      if (progressRef.current >= 100) {
        progressRef.current = 0;
        setProgressPercent(0);
        goToSlide((currentSlideIndex + 1) % totalSlides, 1);
      } else {
        setProgressPercent(progressRef.current);
      }
    }, step);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [totalSlides, isPaused, currentSlideIndex, goToSlide]);

  // Clean up lock timeout on unmount
  useEffect(() => {
    return () => {
      if (animLockTimeoutRef.current) clearTimeout(animLockTimeoutRef.current);
    };
  }, []);

  // Keyboard navigation support (Arrow keys)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        handleNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  return (
    <section
      id="home"
      className="hero-section"
      aria-label="Jubilant Steels Industrial Showcase"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* 4 Vertical Slides Viewport */}
      <div className="hero-slides-viewport">
        {heroSlides.map((slide, index) => (
          <HeroSlide
            key={slide.id}
            slide={slide}
            isActive={index === currentSlideIndex}
            direction={direction}
            onNavigate={onNavigate}
          />
        ))}
      </div>

      {/* Refined Industrial Slider Controls */}
      <div className="hero-bottom-bar">
        <div className="hero-bottom-container">
          <HeroProgress
            currentSlideIndex={currentSlideIndex}
            totalSlides={totalSlides}
            progressPercent={progressPercent}
            direction={direction}
            onSelectSlide={(idx) => {
              if (idx !== currentSlideIndex) {
                goToSlide(idx, idx > currentSlideIndex ? 1 : -1);
              }
            }}
          />

          <HeroNavigation
            onPrev={handlePrev}
            onNext={handleNext}
          />
        </div>
      </div>
    </section>
  );
}
