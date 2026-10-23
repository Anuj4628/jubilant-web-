import React, { useState, useMemo, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Send,
  CheckCircle,
  AlertCircle,
  Clock,
  ShieldCheck,
  RotateCcw,
  Copy,
  Check,
  MessageSquare,
  Mail,
  ExternalLink,
  X
} from 'lucide-react';
import { getAllProductGroups } from '../../data/productCatalogData';
import { brandDetails } from '../../data/navigationData';
import { CONTACT_CONFIG } from '../../config/contactConfig';

gsap.registerPlugin(ScrollTrigger);

export default function ContactRFQ() {
  const sectionRef = useRef(null);

  // Dynamically compile product list from central catalog
  const productOptions = useMemo(() => {
    try {
      const groups = getAllProductGroups();
      if (!groups || !Array.isArray(groups)) return [];

      const manufacturerItems = [];
      const supplierItems = [];

      groups.forEach((group) => {
        const div = (group.divisionSlug || '').toLowerCase();
        const groupLabel = group.name;

        const catNames = (group.categories || []).map((c) => c.name);

        const groupEntry = {
          groupId: group.id || group.slug,
          groupName: groupLabel,
          division: group.division,
          categories: catNames
        };

        if (div === 'manufacturer') {
          manufacturerItems.push(groupEntry);
        } else {
          supplierItems.push(groupEntry);
        }
      });

      return { manufacturerItems, supplierItems };
    } catch (err) {
      console.error('Failed to load dynamic product groups:', err);
      return { manufacturerItems: [], supplierItems: [] };
    }
  }, []);

  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    product: '',
    specsAndQuantity: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [ticketNumber, setTicketNumber] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [channelModalOpen, setChannelModalOpen] = useState(false);
  const [submissionPayload, setSubmissionPayload] = useState(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.rfq-master-card',
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Validation logic
  const validateField = (name, value) => {
    switch (name) {
      case 'fullName':
        if (!value.trim()) return 'Full Name is required';
        if (value.trim().length < 2) return 'Please enter at least 2 characters';
        return '';
      case 'companyName':
        if (!value.trim()) return 'Company Name is required';
        return '';
      case 'email':
        if (!value.trim()) return 'Corporate Email Address is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
          return 'Please enter a valid corporate email address';
        }
        return '';
      case 'phone':
        if (!value.trim()) return 'Mobile / Phone Number is required';
        if (!/^[+0-9\s\-()]{7,20}$/.test(value.trim())) {
          return 'Please enter a valid phone number with country code';
        }
        return '';
      case 'product':
        if (!value.trim()) return 'Please select a required product from the catalog';
        return '';
      default:
        return '';
    }
  };

  const validateAll = () => {
    const newErrors = {};
    const keys = ['fullName', 'companyName', 'email', 'phone', 'product'];
    keys.forEach((key) => {
      const err = validateField(key, formData[key]);
      if (err) newErrors[key] = err;
    });
    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSubmitError('');

    // Clear error inline as user types
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prevent duplicate submissions
    if (isSubmitting) return;

    const validationErrors = validateAll();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Focus the first invalid input
      const firstInvalidField = Object.keys(validationErrors)[0];
      const el = document.getElementById(firstInvalidField);
      if (el) el.focus();
      return;
    }

    setSubmitError('');

    const submissionTime = new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'full',
      timeStyle: 'medium'
    });

    const generatedTicket = `JS-RFQ-${Math.floor(100000 + Math.random() * 900000)}`;
    const targetEmail = CONTACT_CONFIG?.EMAIL || brandDetails?.contact?.email || 'info@jubilantsteel.com';
    const waPhone = CONTACT_CONFIG?.WHATSAPP_NUMBER || '919820171740';

    // WhatsApp cleanly formatted markdown message
    const formattedWaText = [
      `*🔔 NEW RFQ INQUIRY — JUBILANT STEELS*`,
      `*Ticket Reference:* #${generatedTicket}`,
      ``,
      `*Client Information:*`,
      `• *Full Name:* ${formData.fullName.trim()}`,
      `• *Company Name:* ${formData.companyName.trim()}`,
      `• *Corporate Email:* ${formData.email.trim()}`,
      `• *Mobile / Phone:* ${formData.phone.trim()}`,
      ``,
      `*Product & Specification Requirements:*`,
      `• *Product Category:* ${formData.product}`,
      `• *Specifications & Quantities:*`,
      `${formData.specsAndQuantity.trim() || 'Standard catalogue requirements'}`,
      ``,
      `*Submission Date:* ${submissionTime} (IST)`,
      `*Transmitted To:* ${targetEmail}`,
      ``,
      `Please provide formal commercial pricing, EN 10204 3.1 MTC compliance, and delivery schedule.`
    ].join('\n');

    // Gmail email subject & formatted body
    const emailSubject = `Official RFQ Inquiry: ${formData.product} [${generatedTicket}]`;

    const formattedEmailBody = [
      `Dear Jubilant Steels Commercial & Technical Estimation Team,`,
      ``,
      `Please review our formal Request For Quotation (RFQ) inquiry details below:`,
      ``,
      `=======================================================`,
      `OFFICIAL RFQ INQUIRY DETAILS — JUBILANT STEELS`,
      `=======================================================`,
      `Ticket Reference : #${generatedTicket}`,
      `Submission Date  : ${submissionTime} (IST)`,
      ``,
      `CUSTOMER & COMPANY INFORMATION:`,
      `• Full Name        : ${formData.fullName.trim()}`,
      `• Company Name     : ${formData.companyName.trim()}`,
      `• Corporate Email  : ${formData.email.trim()}`,
      `• Mobile / Phone   : ${formData.phone.trim()}`,
      ``,
      `PRODUCT & SPECIFICATION REQUIREMENTS:`,
      `• Product Category : ${formData.product}`,
      `• Specifications & Quantities:`,
      `${formData.specsAndQuantity.trim() || 'Standard catalogue specification (Please verify dimensional availability and MTC compliance)'}`,
      ``,
      `=======================================================`,
      `Please provide your formal commercial quotation including:`,
      `1. Unit rate & total project pricing (CIF / FOB / Ex-Works Mumbai)`,
      `2. Material Test Certificate (MTC) as per EN 10204 3.1 compliance`,
      `3. Mill origin, heat batch lot, and dispatch schedule`,
      ``,
      `Thank you,`,
      `${formData.fullName.trim()}`,
      `${formData.companyName.trim()}`,
      `Mobile: ${formData.phone.trim()}`,
      `Email: ${formData.email.trim()}`
    ].join('\n');

    const waUrl = `https://wa.me/${waPhone}?text=${encodeURIComponent(formattedWaText)}`;
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(targetEmail)}&su=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(formattedEmailBody)}`;
    const mailtoUrl = `mailto:${targetEmail}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(formattedEmailBody)}`;

    const payload = {
      ticketNumber: generatedTicket,
      submissionTime,
      targetEmail,
      waPhone,
      formattedWaText,
      formattedEmailBody,
      emailSubject,
      waUrl,
      gmailUrl,
      mailtoUrl
    };

    setTicketNumber(generatedTicket);
    setSubmissionPayload(payload);
    setFormData((prev) => ({
      ...prev,
      _formattedEmail: formattedEmailBody,
      _mailtoUrl: mailtoUrl,
      _waUrl: waUrl,
      _gmailUrl: gmailUrl
    }));

    // Instantly prompt user with the two options: WhatsApp and Gmail
    setChannelModalOpen(true);
  };

  const handleOpenChannel = (channel) => {
    if (!submissionPayload) return;

    if (channel === 'whatsapp') {
      window.open(submissionPayload.waUrl, '_blank', 'noopener,noreferrer');
    } else if (channel === 'gmail') {
      window.open(submissionPayload.gmailUrl, '_blank', 'noopener,noreferrer');
    } else if (channel === 'mailto') {
      window.location.href = submissionPayload.mailtoUrl;
    }

    setChannelModalOpen(false);
    setSubmitSuccess(true);
  };

  const handleResetForm = () => {
    setFormData({
      fullName: '',
      companyName: '',
      email: '',
      phone: '',
      product: '',
      specsAndQuantity: ''
    });
    setErrors({});
    setSubmitSuccess(false);
    setSubmitError('');
    setTicketNumber('');
    setChannelModalOpen(false);
    setSubmissionPayload(null);
  };

  const handleCopyInquiry = () => {
    const textToCopy = submissionPayload?.formattedEmailBody || formData._formattedEmail;
    if (textToCopy) {
      navigator.clipboard.writeText(textToCopy).then(() => {
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2500);
      });
    }
  };

  return (
    <section
      id="rfq-section"
      ref={sectionRef}
      className="contact-rfq-section"
      aria-label="Request For Quotation RFQ Form"
    >
      <div className="section-container">
        <div className="rfq-master-card">
          {/* Top Industrial Red Accent Bar */}
          <div className="rfq-top-glow" aria-hidden="true" />

          {/* Header Block */}
          <div className="rfq-header-block">
            <div className="rfq-eyebrow-row">
              <span className="rfq-official-badge">OFFICIAL PROCUREMENT PORTAL</span>
              <span className="rfq-speed-badge">
                <Clock size={13} aria-hidden="true" />
                <span>Formal Quotation Within 4 Business Hours</span>
              </span>
            </div>

            <h2 className="rfq-title">
              REQUEST FOR QUOTE <span className="text-red">(RFQ)</span>
            </h2>

            <p className="rfq-subtitle">
              Submit your required material grades, outer diameters, dimensional schedules, and project volumes. Our commercial estimation team reviews project codes and provides formal CIF, FOB, or Ex-Works quotation packages.
            </p>
          </div>

          {/* Success State Confirmation Box */}
          {submitSuccess ? (
            <div className="rfq-success-container" role="status" aria-live="polite">
              <div className="success-icon-badge">
                <CheckCircle size={38} className="success-icon" aria-hidden="true" />
              </div>

              <h3 className="success-heading">RFQ Inquiry Successfully Transmitted</h3>

              <p className="success-primary-msg">
                Thank you, <strong>{formData.fullName}</strong>. Your RFQ inquiry for <strong>{formData.product}</strong> has been registered under ticket reference <strong>#{ticketNumber}</strong>.
              </p>

              <div className="success-summary-box">
                <div className="summary-data-row">
                  <span className="data-lbl">Assigned Receiving Desk:</span>
                  <strong className="data-val">{brandDetails.contact.email}</strong>
                </div>
                <div className="summary-data-row">
                  <span className="data-lbl">Company / Entity:</span>
                  <span className="data-val">{formData.companyName}</span>
                </div>
                <div className="summary-data-row">
                  <span className="data-lbl">Product Requirement:</span>
                  <span className="data-val font-semibold">{formData.product}</span>
                </div>
                <div className="summary-data-row">
                  <span className="data-lbl">Specifications & Quantities:</span>
                  <span className="data-val">{formData.specsAndQuantity || 'Standard catalogue specification'}</span>
                </div>
              </div>

              <p className="success-reassurance">
                Our metallurgical commercial desk will transmit your technical pricing and EN 10204 MTC compliance pack to <strong>{formData.email}</strong> shortly.
              </p>

              <div className="success-channels-box">
                <p className="success-channels-title">Direct Transmission & Follow-up Options:</p>
                <div className="success-actions-row">
                  <a
                    href={submissionPayload?.waUrl || formData._waUrl || `https://wa.me/919820171740?text=${encodeURIComponent(formData._formattedEmail || '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-success-action btn-wa-followup"
                  >
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true" style={{ verticalAlign: 'middle' }}>
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.457h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    <span>Open in WhatsApp</span>
                  </a>

                  <a
                    href={submissionPayload?.gmailUrl || formData._gmailUrl || `https://mail.google.com/mail/?view=cm&fs=1&to=info@jubilantsteel.com&su=${encodeURIComponent(`Official RFQ Inquiry — ${formData.product}`)}&body=${encodeURIComponent(formData._formattedEmail || '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-success-action btn-gmail-followup"
                  >
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true" style={{ verticalAlign: 'middle' }}>
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                    <span>Open in Gmail</span>
                  </a>

                  {(formData._formattedEmail || submissionPayload?.formattedEmailBody) && (
                    <button
                      type="button"
                      className="btn-success-action btn-copy-inquiry"
                      onClick={handleCopyInquiry}
                    >
                      {copiedEmail ? <Check size={15} /> : <Copy size={15} />}
                      <span>{copiedEmail ? 'Copied to Clipboard' : 'Copy Inquiry Summary'}</span>
                    </button>
                  )}

                  <button
                    type="button"
                    className="btn-success-action btn-submit-another"
                    onClick={handleResetForm}
                  >
                    <RotateCcw size={15} aria-hidden="true" />
                    <span>Submit Another RFQ</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* ========================================================= */
            /* INTERACTIVE RFQ FORM */
            /* ========================================================= */
            <form className="rfq-form" onSubmit={handleSubmit} noValidate>
              {submitError && (
                <div className="rfq-global-error" role="alert">
                  <AlertCircle size={18} className="error-icon" aria-hidden="true" />
                  <span>{submitError}</span>
                </div>
              )}

              <div className="rfq-fields-grid">
                {/* 1. Full Name (Required) */}
                <div className={`form-group ${errors.fullName ? 'has-error' : ''}`}>
                  <label htmlFor="fullName" className="form-label">
                    Full Name <span className="req-star">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    autoComplete="name"
                    placeholder="e.g. Vikram Singhania"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="form-input"
                    aria-invalid={!!errors.fullName}
                    aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                    disabled={isSubmitting}
                  />
                  {errors.fullName && (
                    <span id="fullName-error" className="field-error-text" role="alert">
                      {errors.fullName}
                    </span>
                  )}
                </div>

                {/* 2. Company Name (Required) */}
                <div className={`form-group ${errors.companyName ? 'has-error' : ''}`}>
                  <label htmlFor="companyName" className="form-label">
                    Company Name <span className="req-star">*</span>
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    autoComplete="organization"
                    placeholder="e.g. PetroTech Engineering Ltd."
                    value={formData.companyName}
                    onChange={handleInputChange}
                    className="form-input"
                    aria-invalid={!!errors.companyName}
                    aria-describedby={errors.companyName ? 'companyName-error' : undefined}
                    disabled={isSubmitting}
                  />
                  {errors.companyName && (
                    <span id="companyName-error" className="field-error-text" role="alert">
                      {errors.companyName}
                    </span>
                  )}
                </div>

                {/* 3. Corporate Email Address (Required) */}
                <div className={`form-group ${errors.email ? 'has-error' : ''}`}>
                  <label htmlFor="email" className="form-label">
                    Corporate Email Address <span className="req-star">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    autoComplete="email"
                    placeholder="e.g. procurement@company.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-input"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    disabled={isSubmitting}
                  />
                  {errors.email && (
                    <span id="email-error" className="field-error-text" role="alert">
                      {errors.email}
                    </span>
                  )}
                </div>

                {/* 4. Mobile / Phone Number (Required) */}
                <div className={`form-group ${errors.phone ? 'has-error' : ''}`}>
                  <label htmlFor="phone" className="form-label">
                    Mobile / Phone Number <span className="req-star">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    autoComplete="tel"
                    placeholder="e.g. +91 98200 XXXXX"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="form-input"
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? 'phone-error' : undefined}
                    disabled={isSubmitting}
                  />
                  {errors.phone && (
                    <span id="phone-error" className="field-error-text" role="alert">
                      {errors.phone}
                    </span>
                  )}
                </div>

                {/* 5. Product Requirements (Required - Dynamically populated from catalog) */}
                <div className={`form-group full-span ${errors.product ? 'has-error' : ''}`}>
                  <label htmlFor="product" className="form-label">
                    Product Requirements <span className="req-star">*</span>
                  </label>
                  <div className="select-wrapper">
                    <select
                      id="product"
                      name="product"
                      value={formData.product}
                      onChange={handleInputChange}
                      className="form-select"
                      aria-invalid={!!errors.product}
                      aria-describedby={errors.product ? 'product-error' : undefined}
                      disabled={isSubmitting}
                    >
                      <option value="">-- Select Required Product From Active Catalog --</option>

                      {/* Manufacturer Division Products */}
                      {productOptions.manufacturerItems && productOptions.manufacturerItems.length > 0 && (
                        <optgroup label="── MANUFACTURER DIVISION ──">
                          {productOptions.manufacturerItems.map((group) => (
                            <React.Fragment key={group.groupId}>
                              <option value={`Manufacturer: ${group.groupName} (All Grades)`}>
                                {group.groupName} (Full Family)
                              </option>
                              {group.categories.map((catName, cIdx) => (
                                <option
                                  key={`${group.groupId}-${cIdx}`}
                                  value={`Manufacturer: ${catName}`}
                                >
                                  &nbsp;&nbsp;&nbsp;&nbsp;• {catName}
                                </option>
                              ))}
                            </React.Fragment>
                          ))}
                        </optgroup>
                      )}

                      {/* Supplier Division Products */}
                      {productOptions.supplierItems && productOptions.supplierItems.length > 0 && (
                        <optgroup label="── SUPPLIER DIVISION ──">
                          {productOptions.supplierItems.map((group) => (
                            <React.Fragment key={group.groupId}>
                              <option value={`Supplier: ${group.groupName} (All Grades)`}>
                                {group.groupName} (Full Family)
                              </option>
                              {group.categories.map((catName, cIdx) => (
                                <option
                                  key={`${group.groupId}-${cIdx}`}
                                  value={`Supplier: ${catName}`}
                                >
                                  &nbsp;&nbsp;&nbsp;&nbsp;• {catName}
                                </option>
                              ))}
                            </React.Fragment>
                          ))}
                        </optgroup>
                      )}

                      {/* General / Other Alloys */}
                      <optgroup label="── CUSTOM / SPECIALIZED LOTS ──">
                        <option value="Specialized Exotic Nickel Alloy Package (Inconel / Monel / Hastelloy)">
                          Specialized Exotic Nickel Alloy Package
                        </option>
                        <option value="Custom Project Piping Package (Pipes + Fittings + Flanges)">
                          Custom Project Piping Package
                        </option>
                        <option value="Comprehensive Mill Order / Bulk Project Supply">
                          Comprehensive Mill Order / Bulk Project Supply
                        </option>
                      </optgroup>
                    </select>
                  </div>
                  {errors.product && (
                    <span id="product-error" className="field-error-text" role="alert">
                      {errors.product}
                    </span>
                  )}
                </div>

                {/* 6. Specifications & Quantities (Explicitly OPTIONAL) */}
                <div className="form-group full-span">
                  <div className="form-label-row">
                    <label htmlFor="specsAndQuantity" className="form-label">
                      Specifications & Quantities
                    </label>
                    <span className="optional-badge">Optional</span>
                  </div>
                  <textarea
                    id="specsAndQuantity"
                    name="specsAndQuantity"
                    rows="4"
                    placeholder="Describe required specification, grade (e.g. SS 316L, UNS S32750, ASTM A106 Gr B), size, schedule/wall thickness, quantity (Pieces / MT / Meters), application, delivery requirement, or port of discharge..."
                    value={formData.specsAndQuantity}
                    onChange={handleInputChange}
                    className="form-textarea"
                    disabled={isSubmitting}
                  />
                  <span className="field-hint">
                    You can submit this RFQ without filling this field. Our technical sales team will contact you to verify exact dimensional drawings and mill heat lot requirements.
                  </span>
                </div>
              </div>

              {/* Submit Button Row */}
              <div className="rfq-submit-row">
                <button
                  type="submit"
                  className="btn-submit-rfq"
                  disabled={isSubmitting}
                >
                  <span className="btn-submit-bg" aria-hidden="true" />
                  <span className="btn-submit-content">
                    {isSubmitting ? (
                      <>
                        <span className="rfq-spinner" aria-hidden="true" />
                        <span>Transmitting RFQ to Commercial Desk...</span>
                      </>
                    ) : (
                      <>
                        <Send size={16} className="btn-send-icon" aria-hidden="true" />
                        <span>SUBMIT FORMAL RFQ INQUIRY</span>
                      </>
                    )}
                  </span>
                </button>

                <div className="rfq-assurance-row">
                  <div className="rfq-assurance-pill">
                    <ShieldCheck size={14} className="pill-icon" aria-hidden="true" />
                    <span>Transmitted to: {brandDetails.contact.email}</span>
                  </div>
                  <div className="rfq-assurance-pill">
                    <Clock size={14} className="pill-icon" aria-hidden="true" />
                    <span>Guaranteed Response within 4 Hours</span>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Modal: Submission Platform Choice Dialog */}
      {channelModalOpen && submissionPayload && (
        <div
          className="rfq-modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="rfq-choice-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setChannelModalOpen(false);
              setSubmitSuccess(true);
            }
          }}
        >
          <div className="rfq-modal-dialog">
            <button
              type="button"
              className="rfq-modal-close"
              onClick={() => {
                setChannelModalOpen(false);
                setSubmitSuccess(true);
              }}
              aria-label="Close option modal"
            >
              <X size={20} />
            </button>

            <div className="rfq-modal-head">
              <h3 id="rfq-choice-title" className="rfq-modal-title">
                Send Your Enquiry
              </h3>
              <p className="rfq-modal-subtitle">
                Your quotation enquiry for <strong>{formData.product}</strong> (#{submissionPayload.ticketNumber}) has been prepared. Choose how you would like to send it:
              </p>
            </div>

            <div className="rfq-channels-grid">
              {/* Option 1: WhatsApp */}
              <button
                type="button"
                className="rfq-channel-card channel-whatsapp"
                onClick={() => handleOpenChannel('whatsapp')}
              >
                <div className="channel-icon-wrap channel-icon-wa">
                  <MessageSquare size={22} aria-hidden="true" />
                </div>
                <div className="channel-info">
                  <h4 className="channel-title">Send via WhatsApp</h4>
                  <p className="channel-desc">
                    Connect directly with our sales desk on WhatsApp with pre-filled enquiry details.
                  </p>
                </div>
                <span className="channel-cta btn-wa-cta">
                  <span>Open WhatsApp</span>
                  <ExternalLink size={13} />
                </span>
              </button>

              {/* Option 2: Gmail */}
              <button
                type="button"
                className="rfq-channel-card channel-gmail"
                onClick={() => handleOpenChannel('gmail')}
              >
                <div className="channel-icon-wrap channel-icon-gmail">
                  <Mail size={22} aria-hidden="true" />
                </div>
                <div className="channel-info">
                  <h4 className="channel-title">Send via Gmail</h4>
                  <p className="channel-desc">
                    Open a pre-filled quotation email draft addressed to info@jubilantsteel.com.
                  </p>
                </div>
                <span className="channel-cta btn-gmail-cta">
                  <span>Open Gmail</span>
                  <ExternalLink size={13} />
                </span>
              </button>
            </div>

            <div className="rfq-modal-footer">
              <button
                type="button"
                className="btn-modal-subtle"
                onClick={() => handleOpenChannel('mailto')}
              >
                <Mail size={13} />
                <span>Use Default Mail App</span>
              </button>

              <button
                type="button"
                className="btn-modal-subtle"
                onClick={handleCopyInquiry}
              >
                {copiedEmail ? <Check size={13} /> : <Copy size={13} />}
                <span>{copiedEmail ? 'Copied' : 'Copy Formatted Text'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
