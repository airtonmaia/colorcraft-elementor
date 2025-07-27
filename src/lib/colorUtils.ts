
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
}

export const generateTailwindShades = (baseColor: string): TailwindShades => {
  const base = chroma(baseColor);
  
  // Gerar tons mais claros (50-400)
  const lighter = chroma.scale([base.brighten(3), base]).mode('hsl').colors(5);
  
  // Gerar tons mais escuros (600-900)
  const darker = chroma.scale([base, base.darken(3)]).mode('hsl').colors(5);
  
  return {
    50: lighter[0],
    100: lighter[1],
    200: lighter[2],
    300: lighter[3],
    400: lighter[4],
    500: baseColor,
    600: darker[1],
    700: darker[2],
    800: darker[3],
    900: darker[4],
  };
};

export const generateColorScheme = (baseColor: string, scheme: 'analogous' | 'complementary' | 'triadic' | 'tetradic' | 'split-complementary'): string[] => {
  const base = chroma(baseColor);
  const hue = base.get('hsl.h');
  
  switch (scheme) {
    case 'analogous':
      return [
        base.set('hsl.h', hue - 30).hex(),
        baseColor,
        base.set('hsl.h', hue + 30).hex(),
      ];
    
    case 'complementary':
      return [
        baseColor,
        base.set('hsl.h', hue + 180).hex(),
      ];
    
    case 'triadic':
      return [
        baseColor,
        base.set('hsl.h', hue + 120).hex(),
        base.set('hsl.h', hue + 240).hex(),
      ];
    
    case 'tetradic':
      return [
        baseColor,
        base.set('hsl.h', hue + 90).hex(),
        base.set('hsl.h', hue + 180).hex(),
        base.set('hsl.h', hue + 270).hex(),
      ];
    
    case 'split-complementary':
      return [
        baseColor,
        base.set('hsl.h', hue + 150).hex(),
        base.set('hsl.h', hue + 210).hex(),
      ];
    
    default:
      return [baseColor];
  }
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
      
      // Amostragem de cores (a cada 100 pixels para performance)
      for (let i = 0; i < data.length; i += 400) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const a = data[i + 3];
        
        if (a > 128) { // Ignorar pixels transparentes
          const color = chroma([r, g, b]).hex();
          colorMap.set(color, (colorMap.get(color) || 0) + 1);
        }
      }
      
      // Ordenar por frequência e pegar as 5 cores mais comuns
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
