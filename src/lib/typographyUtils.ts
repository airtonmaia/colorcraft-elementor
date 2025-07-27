
export interface FontCombination {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  category: 'modern' | 'elegant' | 'corporate' | 'creative' | 'minimal';
  googleFonts: string[];
}

export interface ResponsiveSize {
  desktop: string;
  tablet: string;
  mobile: string;
}

export interface TypographyScale {
  h1: ResponsiveSize;
  h2: ResponsiveSize;
  h3: ResponsiveSize;
  h4: ResponsiveSize;
  h5: ResponsiveSize;
  h6: ResponsiveSize;
  body: ResponsiveSize;
  small: ResponsiveSize;
  caption: ResponsiveSize;
}

export const fontCombinations: FontCombination[] = [
  {
    id: 'modern-1',
    name: 'Moderno & Limpo',
    primary: 'Inter',
    secondary: 'Inter',
    category: 'modern',
    googleFonts: ['Inter:wght@300;400;500;600;700'],
  },
  {
    id: 'elegant-1',
    name: 'Elegante & Sofisticado',
    primary: 'Playfair Display',
    secondary: 'Source Sans Pro',
    category: 'elegant',
    googleFonts: ['Playfair Display:wght@400;500;600;700', 'Source Sans Pro:wght@300;400;500;600'],
  },
  {
    id: 'corporate-1',
    name: 'Corporativo & Profissional',
    primary: 'Roboto',
    secondary: 'Open Sans',
    category: 'corporate',
    googleFonts: ['Roboto:wght@300;400;500;700', 'Open Sans:wght@300;400;500;600'],
  },
  {
    id: 'creative-1',
    name: 'Criativo & Dinâmico',
    primary: 'Poppins',
    secondary: 'Nunito',
    category: 'creative',
    googleFonts: ['Poppins:wght@300;400;500;600;700', 'Nunito:wght@300;400;500;600'],
  },
  {
    id: 'minimal-1',
    name: 'Minimalista & Moderno',
    primary: 'Montserrat',
    secondary: 'Lato',
    category: 'minimal',
    googleFonts: ['Montserrat:wght@300;400;500;600;700', 'Lato:wght@300;400;500;600'],
  },
  {
    id: 'tech-1',
    name: 'Tecnológico & Futurista',
    primary: 'Space Grotesk',
    secondary: 'DM Sans',
    category: 'modern',
    googleFonts: ['Space Grotesk:wght@300;400;500;600;700', 'DM Sans:wght@300;400;500;600'],
  },
];

export const defaultTypographyScale: TypographyScale = {
  h1: {
    desktop: '3.5rem', // 56px
    tablet: '2.5rem',  // 40px
    mobile: '2rem',    // 32px
  },
  h2: {
    desktop: '2.5rem', // 40px
    tablet: '2rem',    // 32px
    mobile: '1.75rem', // 28px
  },
  h3: {
    desktop: '2rem',   // 32px
    tablet: '1.75rem', // 28px
    mobile: '1.5rem',  // 24px
  },
  h4: {
    desktop: '1.5rem', // 24px
    tablet: '1.25rem', // 20px
    mobile: '1.25rem', // 20px
  },
  h5: {
    desktop: '1.25rem', // 20px
    tablet: '1.125rem', // 18px
    mobile: '1.125rem', // 18px
  },
  h6: {
    desktop: '1.125rem', // 18px
    tablet: '1rem',      // 16px
    mobile: '1rem',      // 16px
  },
  body: {
    desktop: '1rem',     // 16px
    tablet: '0.875rem',  // 14px
    mobile: '0.875rem',  // 14px
  },
  small: {
    desktop: '0.875rem', // 14px
    tablet: '0.75rem',   // 12px
    mobile: '0.75rem',   // 12px
  },
  caption: {
    desktop: '0.75rem',  // 12px
    tablet: '0.625rem',  // 10px
    mobile: '0.625rem',  // 10px
  },
};

export const generateGoogleFontsUrl = (fonts: string[]): string => {
  const fontsParam = fonts.join('&family=');
  return `https://fonts.googleapis.com/css2?family=${fontsParam}&display=swap`;
};

export const generateTypographyCSS = (
  combination: FontCombination,
  scale: TypographyScale = defaultTypographyScale
): string => {
  return `
/* Typography Styles */
:root {
  --font-primary: '${combination.primary}', sans-serif;
  --font-secondary: '${combination.secondary}', sans-serif;
}

/* Headings */
h1, .h1 {
  font-family: var(--font-primary);
  font-size: ${scale.h1.desktop};
  font-weight: 700;
  line-height: 1.2;
}

h2, .h2 {
  font-family: var(--font-primary);
  font-size: ${scale.h2.desktop};
  font-weight: 600;
  line-height: 1.3;
}

h3, .h3 {
  font-family: var(--font-primary);
  font-size: ${scale.h3.desktop};
  font-weight: 600;
  line-height: 1.4;
}

h4, .h4 {
  font-family: var(--font-primary);
  font-size: ${scale.h4.desktop};
  font-weight: 500;
  line-height: 1.5;
}

h5, .h5 {
  font-family: var(--font-primary);
  font-size: ${scale.h5.desktop};
  font-weight: 500;
  line-height: 1.5;
}

h6, .h6 {
  font-family: var(--font-primary);
  font-size: ${scale.h6.desktop};
  font-weight: 500;
  line-height: 1.6;
}

/* Body Text */
body, p, .body {
  font-family: var(--font-secondary);
  font-size: ${scale.body.desktop};
  font-weight: 400;
  line-height: 1.6;
}

/* Small Text */
small, .small {
  font-family: var(--font-secondary);
  font-size: ${scale.small.desktop};
  font-weight: 400;
  line-height: 1.5;
}

/* Caption */
.caption {
  font-family: var(--font-secondary);
  font-size: ${scale.caption.desktop};
  font-weight: 400;
  line-height: 1.4;
}

/* Tablet Styles */
@media (max-width: 768px) {
  h1, .h1 { font-size: ${scale.h1.tablet}; }
  h2, .h2 { font-size: ${scale.h2.tablet}; }
  h3, .h3 { font-size: ${scale.h3.tablet}; }
  h4, .h4 { font-size: ${scale.h4.tablet}; }
  h5, .h5 { font-size: ${scale.h5.tablet}; }
  h6, .h6 { font-size: ${scale.h6.tablet}; }
  body, p, .body { font-size: ${scale.body.tablet}; }
  small, .small { font-size: ${scale.small.tablet}; }
  .caption { font-size: ${scale.caption.tablet}; }
}

/* Mobile Styles */
@media (max-width: 480px) {
  h1, .h1 { font-size: ${scale.h1.mobile}; }
  h2, .h2 { font-size: ${scale.h2.mobile}; }
  h3, .h3 { font-size: ${scale.h3.mobile}; }
  h4, .h4 { font-size: ${scale.h4.mobile}; }
  h5, .h5 { font-size: ${scale.h5.mobile}; }
  h6, .h6 { font-size: ${scale.h6.mobile}; }
  body, p, .body { font-size: ${scale.body.mobile}; }
  small, .small { font-size: ${scale.small.mobile}; }
  .caption { font-size: ${scale.caption.mobile}; }
}
`;
};
