import chroma from 'chroma-js';

export interface ColorPalette {
  name: string;
  colors: {
    [key: string]: string;
  };
}

export interface TailwindShades {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
}

export interface BrandColors {
  primary: string;
  secondary?: string;
  tertiary?: string;
}

export interface ContrastResult {
  ratio: number;
  level: 'AA' | 'AAA' | 'fail';
  readable: boolean;
}

// Improved Tailwind shade generation with vibrant colors
export const generateTailwindShades = (baseColor: string): TailwindShades => {
  try {
    const base = chroma(baseColor);
    const hsl = base.hsl();
    
    // Handle edge cases and ensure valid values
    const h = isNaN(hsl[0]) ? 0 : hsl[0];
    const s = isNaN(hsl[1]) ? 0 : Math.min(Math.max(hsl[1], 0.3), 1); // Ensure minimum saturation for vibrancy
    const l = isNaN(hsl[2]) ? 0.5 : hsl[2];
    
    // Enhanced shade generation for more vibrant colors
    const generateShade = (targetLightness: number, saturationMultiplier: number = 1): string => {
      try {
        const clampedLightness = Math.max(0.05, Math.min(0.95, targetLightness));
        
        // Enhanced saturation calculation for better vibrancy
        let adjustedSaturation = s * saturationMultiplier;
        
        // Boost saturation for lighter shades to maintain vibrancy
        if (targetLightness > 0.7) {
          adjustedSaturation = Math.min(adjustedSaturation * 1.2, 1);
        }
        
        // Ensure minimum saturation for vibrant colors
        adjustedSaturation = Math.max(adjustedSaturation, 0.2);
        adjustedSaturation = Math.min(adjustedSaturation, 1);
        
        const color = chroma.hsl(h, adjustedSaturation, clampedLightness);
        return color.hex();
      } catch (error) {
        console.error('Error generating shade:', error);
        return chroma.hsl(h, 0.5, targetLightness).hex();
      }
    };
    
    // More accurate Tailwind CSS scale with enhanced vibrancy
    const shades: TailwindShades = {
      50: generateShade(0.97, 0.15),   // Very light, low saturation
      100: generateShade(0.94, 0.25),  // Light, slight saturation
      200: generateShade(0.87, 0.35),  // Light, more saturation
      300: generateShade(0.78, 0.50),  // Medium light
      400: generateShade(0.65, 0.75),  // Medium, good saturation
      500: base.hex(),                 // Base color (unchanged)
      600: generateShade(Math.max(l * 0.82, 0.42), 1.05), // Slightly darker
      700: generateShade(Math.max(l * 0.68, 0.32), 1.10), // Medium dark
      800: generateShade(Math.max(l * 0.52, 0.22), 1.15), // Dark
      900: generateShade(Math.max(l * 0.35, 0.13), 1.20), // Very dark
      950: generateShade(Math.max(l * 0.22, 0.08), 1.25), // Extremely dark
    };
    
    return shades;
  } catch (error) {
    console.error('Error generating Tailwind shades:', error);
    // Return a vibrant fallback palette
    return {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
      950: '#020617',
    };
  }
};

// Enhanced color name detection based on Tailwind colors
export const detectTailwindColorName = (hexColor: string): string => {
  const tailwindColors = {
    // Enhanced color mapping with better detection
    '#ef4444': 'red',
    '#f97316': 'orange', 
    '#f59e0b': 'amber',
    '#eab308': 'yellow',
    '#84cc16': 'lime',
    '#22c55e': 'green',
    '#10b981': 'emerald',
    '#14b8a6': 'teal',
    '#06b6d4': 'cyan',
    '#0ea5e9': 'sky',
    '#3b82f6': 'blue',
    '#6366f1': 'indigo',
    '#8b5cf6': 'violet',
    '#a855f7': 'purple',
    '#d946ef': 'fuchsia',
    '#ec4899': 'pink',
    '#f43f5e': 'rose',
    '#6b7280': 'gray',
    '#71717a': 'zinc',
    '#737373': 'neutral',
    '#78716c': 'stone',
  };
  
  try {
    const inputColor = chroma(hexColor);
    let closestColor = 'custom';
    let smallestDistance = Infinity;
    
    Object.entries(tailwindColors).forEach(([hex, name]) => {
      const distance = chroma.distance(inputColor, chroma(hex));
      if (distance < smallestDistance) {
        smallestDistance = distance;
        closestColor = name;
      }
    });
    
    // Return the closest color name if distance is reasonable
    return smallestDistance < 50 ? closestColor : 'custom';
  } catch (error) {
    console.error('Error detecting color name:', error);
    return 'custom';
  }
};

export const generateMultiColorPalette = (brandColors: BrandColors): { [key: string]: TailwindShades } => {
  const palette: { [key: string]: TailwindShades } = {};
  
  if (brandColors.primary) {
    palette.primary = generateTailwindShades(brandColors.primary);
  }
  
  if (brandColors.secondary) {
    palette.secondary = generateTailwindShades(brandColors.secondary);
  }
  
  if (brandColors.tertiary) {
    palette.tertiary = generateTailwindShades(brandColors.tertiary);
  }
  
  return palette;
};

export const generateHarmoniousColors = (baseColor: string, type: 'complementary' | 'analogous' | 'triadic' | 'tetradic' | 'split-complementary' | 'monochromatic'): string[] => {
  const base = chroma(baseColor);
  const hue = base.get('hsl.h') || 0;
  const saturation = Math.max(base.get('hsl.s') || 0, 0.3); // Ensure minimum saturation
  const lightness = base.get('hsl.l') || 0.5;
  
  switch (type) {
    case 'complementary':
      return [
        baseColor,
        chroma.hsl((hue + 180) % 360, saturation, lightness).hex(),
      ];
    
    case 'analogous':
      return [
        chroma.hsl((hue - 30 + 360) % 360, saturation, lightness).hex(),
        baseColor,
        chroma.hsl((hue + 30) % 360, saturation, lightness).hex(),
      ];
    
    case 'triadic':
      return [
        baseColor,
        chroma.hsl((hue + 120) % 360, saturation, lightness).hex(),
        chroma.hsl((hue + 240) % 360, saturation, lightness).hex(),
      ];
    
    case 'tetradic':
      return [
        baseColor,
        chroma.hsl((hue + 90) % 360, saturation, lightness).hex(),
        chroma.hsl((hue + 180) % 360, saturation, lightness).hex(),
        chroma.hsl((hue + 270) % 360, saturation, lightness).hex(),
      ];
    
    case 'split-complementary':
      return [
        baseColor,
        chroma.hsl((hue + 150) % 360, saturation, lightness).hex(),
        chroma.hsl((hue + 210) % 360, saturation, lightness).hex(),
      ];
    
    case 'monochromatic':
      return [
        chroma.hsl(hue, saturation, Math.min(lightness * 1.3, 0.9)).hex(),
        baseColor,
        chroma.hsl(hue, saturation, Math.max(lightness * 0.7, 0.1)).hex(),
      ];
    
    default:
      return [baseColor];
  }
};

export const calculateContrast = (foreground: string, background: string): ContrastResult => {
  const contrast = chroma.contrast(foreground, background);
  
  let level: 'AA' | 'AAA' | 'fail' = 'fail';
  let readable = false;
  
  if (contrast >= 7) {
    level = 'AAA';
    readable = true;
  } else if (contrast >= 4.5) {
    level = 'AA';
    readable = true;
  } else if (contrast >= 3) {
    level = 'AA';
    readable = false;
  }
  
  return {
    ratio: Math.round(contrast * 100) / 100,
    level,
    readable,
  };
};

export const generateContrastGrid = (colors: string[]): { [key: string]: { [key: string]: ContrastResult } } => {
  const grid: { [key: string]: { [key: string]: ContrastResult } } = {};
  
  colors.forEach(colorA => {
    grid[colorA] = {};
    colors.forEach(colorB => {
      grid[colorA][colorB] = calculateContrast(colorA, colorB);
    });
  });
  
  return grid;
};

export const extractColorsFromImage = async (imageFile: File): Promise<string[]> => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      
      const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData?.data;
      
      if (!data) {
        resolve([]);
        return;
      }
      
      const colors: string[] = [];
      const colorMap = new Map<string, number>();
      
      for (let i = 0; i < data.length; i += 400) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const a = data[i + 3];
        
        if (a > 128) {
          const color = chroma([r, g, b]).hex();
          colorMap.set(color, (colorMap.get(color) || 0) + 1);
        }
      }
      
      const sortedColors = Array.from(colorMap.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([color]) => color);
      
      resolve(sortedColors);
    };
    
    img.src = URL.createObjectURL(imageFile);
  });
};

export const generateElementorJSON = (palette: ColorPalette) => {
  const elementorSettings = {
    system_colors: palette.colors,
    custom_colors: Object.entries(palette.colors).map(([name, color], index) => ({
      _id: `color_${index + 1}`,
      title: name,
      color: color,
    })),
    default_generic_fonts: 'Sans-serif',
    default_typography: {
      primary_font: 'Roboto',
      secondary_font: 'Roboto Slab',
    },
  };
  
  return JSON.stringify(elementorSettings, null, 2);
};
