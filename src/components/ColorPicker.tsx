
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, Palette, Plus, X, Settings } from 'lucide-react';
import { generateTailwindShades, generateMultiColorPalette, generateHarmoniousColors, BrandColors, TailwindShades, detectTailwindColorName } from '@/lib/colorUtils';
import { toast } from 'sonner';

interface ColorPickerProps {
  onPaletteGenerated: (palette: { [key: string]: TailwindShades }, harmonies: string[]) => void;
}

const ColorPicker = ({ onPaletteGenerated }: ColorPickerProps) => {
  const [brandColors, setBrandColors] = useState<BrandColors>({
    primary: '#7F4EFB',
    secondary: '',
    tertiary: ''
  });
  
  const [harmonyType, setHarmonyType] = useState<'complementary' | 'analogous' | 'triadic' | 'tetradic' | 'split-complementary' | 'monochromatic'>('analogous');
  const [extractedColors, setExtractedColors] = useState<string[]>([]);
  const [colorName, setColorName] = useState('Custom');

  // Generate palette in real time with enhanced error handling
  useEffect(() => {
    if (brandColors.primary) {
      try {
        console.log('Generating palette for colors:', brandColors);
        const palette = generateMultiColorPalette(brandColors);
        const harmonies = generateHarmoniousColors(brandColors.primary, harmonyType);
        
        // Detect color name
        const detectedName = detectTailwindColorName(brandColors.primary);
        setColorName(detectedName);
        
        onPaletteGenerated(palette, harmonies);
      } catch (error) {
        console.error('Error generating palette:', error);
        toast.error('Error generating palette. Please check if the color is valid.');
      }
    }
  }, [brandColors, harmonyType, onPaletteGenerated]);

  const handleColorChange = (type: 'primary' | 'secondary' | 'tertiary', color: string) => {
    console.log('Color change:', type, color);
    
    // Validate hex color format
    const hexRegex = /^#[0-9A-F]{6}$/i;
    if (!hexRegex.test(color)) {
      console.warn('Invalid hex color format:', color);
      return;
    }
    
    setBrandColors(prev => ({
      ...prev,
      [type]: color
    }));
  };

  const addSecondaryColor = () => {
    if (!brandColors.secondary) {
      setBrandColors(prev => ({
        ...prev,
        secondary: '#6366f1'
      }));
    }
  };

  const removeColor = (type: 'secondary' | 'tertiary') => {
    setBrandColors(prev => ({
      ...prev,
      [type]: ''
    }));
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const { extractColorsFromImage } = await import('@/lib/colorUtils');
      const colors = await extractColorsFromImage(file);
      setExtractedColors(colors);
      if (colors.length > 0) {
        handleColorChange('primary', colors[0]);
        toast.success(`${colors.length} colors extracted!`);
      }
    } catch (error) {
      toast.error('Error extracting colors from image');
    }
  };

  return (
    <div className="space-y-6">
      {/* Main Title */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Tailwind CSS Color Generator
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Instantly create stunning color scales by entering a base color or hitting the spacebar.
        </p>
      </div>

      {/* Primary Color Input */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>Primary</span>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
              <Settings className="w-4 h-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-3">
            <div
              className="w-12 h-12 rounded-lg border-2 border-gray-200 dark:border-gray-700 cursor-pointer shadow-sm hover:shadow-md transition-shadow"
              style={{ backgroundColor: brandColors.primary }}
              onClick={() => document.getElementById('primary-color')?.click()}
            />
            <div className="flex-1">
              <Input
                id="primary-color"
                type="color"
                value={brandColors.primary}
                onChange={(e) => handleColorChange('primary', e.target.value)}
                className="sr-only"
              />
              <Input
                value={brandColors.primary}
                onChange={(e) => handleColorChange('primary', e.target.value)}
                placeholder="#7F4EFB"
                className="font-mono text-sm"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                HEX • {colorName}
              </p>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            className="w-full"
            onClick={addSecondaryColor}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add secondary color scale
          </Button>
        </CardContent>
      </Card>

      {/* Secondary Color */}
      {brandColors.secondary && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Secondary</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeColor('secondary')}
                className="h-6 w-6 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3">
              <div
                className="w-12 h-12 rounded-lg border-2 border-gray-200 dark:border-gray-700 cursor-pointer shadow-sm hover:shadow-md transition-shadow"
                style={{ backgroundColor: brandColors.secondary }}
                onClick={() => document.getElementById('secondary-color')?.click()}
              />
              <div className="flex-1">
                <Input
                  id="secondary-color"
                  type="color"
                  value={brandColors.secondary}
                  onChange={(e) => handleColorChange('secondary', e.target.value)}
                  className="sr-only"
                />
                <Input
                  value={brandColors.secondary}
                  onChange={(e) => handleColorChange('secondary', e.target.value)}
                  placeholder="#6366f1"
                  className="font-mono text-sm"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">HEX</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Color Combination Scheme */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-3">
            <Label className="text-sm font-medium">Color combination scheme • {harmonyType}</Label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { value: 'analogous', label: 'Analogous' },
                { value: 'complementary', label: 'Complementary' },
                { value: 'triadic', label: 'Triadic' },
                { value: 'tetradic', label: 'Tetradic' },
                { value: 'monochromatic', label: 'Monochromatic' },
                { value: 'split-complementary', label: 'Split Complementary' }
              ].map((scheme) => (
                <Button
                  key={scheme.value}
                  variant={harmonyType === scheme.value ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setHarmonyType(scheme.value as typeof harmonyType)}
                  className="text-xs"
                >
                  {scheme.label}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Image Upload */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <Input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <Button
              variant="outline"
              onClick={() => document.getElementById('image-upload')?.click()}
              className="w-full flex items-center gap-2"
            >
              <Upload className="w-4 h-4" />
              Extract colors from image
            </Button>

            {extractedColors.length > 0 && (
              <div className="space-y-2">
                <Label className="text-sm">Extracted Colors</Label>
                <div className="flex gap-2">
                  {extractedColors.map((color, index) => (
                    <div
                      key={index}
                      className="w-8 h-8 rounded-md border border-gray-200 dark:border-gray-700 cursor-pointer hover:scale-110 transition-transform"
                      style={{ backgroundColor: color }}
                      onClick={() => handleColorChange('primary', color)}
                      title={`${color} - Click to use as primary`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ColorPicker;
