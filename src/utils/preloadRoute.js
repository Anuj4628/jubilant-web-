/**
 * Preload route chunks on hover or idle
 */
export const preloadRoute = (target) => {
  if (target === 'about' || target?.startsWith('/about')) {
    import('../components/About/AboutSection');
  } else if (target === 'certificate' || target?.startsWith('/certificate')) {
    import('../components/Certificate/CertificatePage');
  } else if (target === 'get-code' || target?.startsWith('/get-code')) {
    import('../components/Contact/GetCodePage');
  } else if (target === 'contact' || target?.startsWith('/contact')) {
    import('../components/Contact/ContactPage');
  } else if (target === 'products' || target?.startsWith('/products')) {
    import('../components/Products/pages/ProductsLandingView');
    import('../components/Products/pages/DivisionView');
  } else if (target === 'materials' || target?.startsWith('/materials')) {
    import('../components/Materials/pages/MaterialsLandingView');
  }
};
