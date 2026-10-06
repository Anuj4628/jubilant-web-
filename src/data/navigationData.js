import jubilantLogo from '../assets/images/jubilant-logo.png';
import { CONTACT_CONFIG } from '../config/contactConfig';

export const navLinks = [
  { id: "home", label: "Home", href: "/" },
  { id: "about", label: "About", href: "/about" },
  { id: "products", label: "Products", href: "/products" },
  { id: "materials", label: "Materials", href: "/materials" },
  { id: "certificate", label: "Certificate", href: "/certificate" },
  { id: "contact", label: "Contact", href: "/contact" }
];

export const brandDetails = {
  name: "JUBILANT STEELS",
  tagline: "Global Steel Manufacturing • Export • Supply",
  logoUrl: jubilantLogo,
  quoteCta: {
    label: "Get Code",
    href: "/get-code"
  },
  contact: {
    email: CONTACT_CONFIG.EMAIL,
    phone1: CONTACT_CONFIG.PHONE_DISPLAY,
    phone1Raw: CONTACT_CONFIG.PHONE_NUMBER,
    phone2: CONTACT_CONFIG.PHONE_OFFICE_DISPLAY,
    phone2Raw: CONTACT_CONFIG.PHONE_OFFICE,
    address: CONTACT_CONFIG.ADDRESS,
    whatsApp: CONTACT_CONFIG.PHONE_DISPLAY,
    whatsAppUrl: `https://wa.me/${CONTACT_CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(CONTACT_CONFIG.WHATSAPP_DEFAULT_MESSAGE)}`
  }
};
