import React from 'react';
import { ArrowUpRight, ChevronRight } from 'lucide-react';
import './Button.css';

/**
 * JUBILANT STEELS — UNIVERSAL BUTTON COMPONENT
 * Clean, neutral/outlined default state with Left-to-Right organic red wave fill.
 */
export default function Button({
  children,
  href,
  variant = 'primary',
  size = 'md',
  icon = 'arrow',
  className = '',
  onClick,
  ...props
}) {
  const Component = href ? 'a' : 'button';
  
  return (
    <Component
      href={href}
      className={`btn btn-${variant} btn-${size} ${className}`}
      onClick={onClick}
      {...props}
    >
      {/* 1. Left-to-Right Organic Red Wave Fill Layer */}
      <span className="btn-fill-bg" aria-hidden="true" />

      {/* 2. Base Content (Default Neutral State) */}
      <span className="btn-content btn-content-base">
        <span className="btn-text">{children}</span>
        {icon === 'arrow' && (
          <span className="btn-icon-wrap" aria-hidden="true">
            <ArrowUpRight className="btn-icon" size={15} />
          </span>
        )}
        {icon === 'chevron' && (
          <span className="btn-icon-wrap" aria-hidden="true">
            <ChevronRight className="btn-icon" size={15} />
          </span>
        )}
      </span>

      {/* 3. Contrasting White Hover Content (Synchronized with Wave via clip-path) */}
      <span className="btn-content btn-content-hover" aria-hidden="true">
        <span className="btn-text">{children}</span>
        {icon === 'arrow' && (
          <span className="btn-icon-wrap" aria-hidden="true">
            <ArrowUpRight className="btn-icon" size={15} />
          </span>
        )}
        {icon === 'chevron' && (
          <span className="btn-icon-wrap" aria-hidden="true">
            <ChevronRight className="btn-icon" size={15} />
          </span>
        )}
      </span>
    </Component>
  );
}
