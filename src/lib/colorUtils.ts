
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

export const generateTailwindShades = (baseColor: string): TailwindShades => {
  try {
    // Validate and parse the base color
    const base = chroma(baseColor);
    const hsl = base.hsl();
    
    // Handle NaN values that can occur with grayscale colors
    const h = isNaN(hsl[0]) ? 0 : hsl[0];
    const s = isNaN(hsl[1]) ? 0 : hsl[1];
    const l = isNaN(hsl[2]) ? 0.5 : hsl[2]; // Default to 50% lightness if NaN
    
    // Function to generate colors following Tailwind pattern
    const generateShade = (targetLightness: number, saturationMultiplier: number = 1): string => {
      try {
        // Ensure values are within valid ranges
        const clampedLightness = Math.max(0, Math.min(1, targetLightness));
        const adjustedSaturation = Math.max(0, Math.min(1, s * saturationMultiplier));
        
        return chroma.hsl(h, adjustedSaturation, clampedLightness).hex();
      } catch (error) {
        console.error('Error generating shade:', error);
        return '#000000'; // Fallback color
      }
    };
    
    // Generate shades following Tailwind CSS scale with proper lightness distribution
    const shades: TailwindShades = {
      50: generateShade(0.98, 0.1),
      100: generateShade(0.95, 0.2),
      200: generateShade(0.90, 0.3),
      300: generateShade(0.83, 0.4),
      400: generateShade(0.73, 0.6),
      500: baseColor, // Base color
      600: generateShade(Math.max(l * 0.85, 0.45), 1.1),
      700: generateShade(Math.max(l * 0.70, 0.38), 1.2),
      800: generateShade(Math.max(l * 0.55, 0.25), 1.3),
      900: generateShade(Math.max(l * 0.35, 0.15), 1.4),
      950: generateShade(Math.max(l * 0.20, 0.08), 1.5),
    };
    
    return shades;
  } catch (error) {
    console.error('Error generating Tailwind shades:', error);
    // Return a fallback palette based on gray colors
    return {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
      950: '#030712',
    };
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
  const hue = base.get('hsl.h');
  const saturation = base.get('hsl.s');
  const lightness = base.get('hsl.l');
  
  switch (type) {
    case 'complementary':
      return [
        baseColor,
        chroma.hsl(hue + 180, saturation, lightness).hex(),
      ];
    
    case 'analogous':
      return [
        chroma.hsl(hue - 30, saturation, lightness).hex(),
        baseColor,
        chroma.hsl(hue + 30, saturation, lightness).hex(),
      ];
    
    case 'triadic':
      return [
        baseColor,
        chroma.hsl(hue + 120, saturation, lightness).hex(),
        chroma.hsl(hue + 240, saturation, lightness).hex(),
      ];
    
    case 'tetradic':
      return [
        baseColor,
        chroma.hsl(hue + 90, saturation, lightness).hex(),
        chroma.hsl(hue + 180, saturation, lightness).hex(),
        chroma.hsl(hue + 270, saturation, lightness).hex(),
      ];
    
    case 'split-complementary':
      return [
        baseColor,
        chroma.hsl(hue + 150, saturation, lightness).hex(),
        chroma.hsl(hue + 210, saturation, lightness).hex(),
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
    readable = false; // Apenas para textos grandes
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
