
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
  const base = chroma(baseColor);
  
  // Melhor algoritmo para geração de tons
  const lightness = base.get('hsl.l');
  const saturation = base.get('hsl.s');
  const hue = base.get('hsl.h');
  
  // Gerar tons mais claros com melhor distribuição
  const generateLighterShades = () => {
    return {
      50: chroma.hsl(hue, Math.min(saturation * 0.3, 0.3), 0.97).hex(),
      100: chroma.hsl(hue, Math.min(saturation * 0.4, 0.4), 0.93).hex(),
      200: chroma.hsl(hue, Math.min(saturation * 0.5, 0.5), 0.86).hex(),
      300: chroma.hsl(hue, Math.min(saturation * 0.6, 0.6), 0.76).hex(),
      400: chroma.hsl(hue, Math.min(saturation * 0.8, 0.8), 0.64).hex(),
    };
  };
  
  // Gerar tons mais escuros com melhor distribuição
  const generateDarkerShades = () => {
    return {
      600: chroma.hsl(hue, Math.min(saturation * 1.1, 1), Math.max(lightness * 0.8, 0.35)).hex(),
      700: chroma.hsl(hue, Math.min(saturation * 1.2, 1), Math.max(lightness * 0.65, 0.28)).hex(),
      800: chroma.hsl(hue, Math.min(saturation * 1.3, 1), Math.max(lightness * 0.5, 0.22)).hex(),
      900: chroma.hsl(hue, Math.min(saturation * 1.4, 1), Math.max(lightness * 0.35, 0.15)).hex(),
      950: chroma.hsl(hue, Math.min(saturation * 1.5, 1), Math.max(lightness * 0.2, 0.08)).hex(),
    };
  };
  
  const lighter = generateLighterShades();
  const darker = generateDarkerShades();
  
  return {
    ...lighter,
    500: baseColor,
    ...darker,
  };
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
