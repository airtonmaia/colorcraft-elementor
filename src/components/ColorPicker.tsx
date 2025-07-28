
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, Palette, Plus, X } from 'lucide-react';
import { generateTailwindShades, generateMultiColorPalette, generateHarmoniousColors, BrandColors, TailwindShades } from '@/lib/colorUtils';
import { toast } from 'sonner';

interface ColorPickerProps {
  onPaletteGenerated: (palette: { [key: string]: TailwindShades }, harmonies: string[]) => void;
}

const ColorPicker = ({ onPaletteGenerated }: ColorPickerProps) => {
  const [brandColors, setBrandColors] = useState<BrandColors>({
    primary: '#CD9C55',
    secondary: '',
    tertiary: ''
  });
  
  const [harmonyType, setHarmonyType] = useState<'complementary' | 'analogous' | 'triadic' | 'tetradic' | 'split-complementary' | 'monochromatic'>('analogous');
  const [extractedColors, setExtractedColors] = useState<string[]>([]);

  const harmonyTypes = [
    { value: 'complementary', label: 'Complementar', description: 'Cores opostas para máximo contraste' },
    { value: 'analogous', label: 'Análogo', description: 'Cores próximas, harmonia natural' },
    { value: 'triadic', label: 'Triádico', description: 'Três cores equilibradas' },
    { value: 'tetradic', label: 'Tetrádico', description: 'Quatro cores balanceadas' },
    { value: 'split-complementary', label: 'Complementar Dividido', description: 'Contraste suave' },
    { value: 'monochromatic', label: 'Monocromático', description: 'Variações de uma cor' },
  ];

  // Generate palette in real time with error handling
  useEffect(() => {
    if (brandColors.primary) {
      try {
        console.log('Generating palette for colors:', brandColors);
        const palette = generateMultiColorPalette(brandColors);
        const harmonies = generateHarmoniousColors(brandColors.primary, harmonyType);
        onPaletteGenerated(palette, harmonies);
      } catch (error) {
        console.error('Error generating palette:', error);
        toast.error('Erro ao gerar paleta. Verifique se a cor é válida.');
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
        secondary: '#6B7280'
      }));
    }
  };

  const addTertiaryColor = () => {
    if (!brandColors.tertiary) {
      setBrandColors(prev => ({
        ...prev,
        tertiary: '#10B981'
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
        toast.success(`${colors.length} cores extraídas!`);
      }
    } catch (error) {
      toast.error('Erro ao extrair cores da imagem');
    }
  };

  const copyToClipboard = (color: string) => {
    navigator.clipboard.writeText(color);
    toast.success('Cor copiada!');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="w-5 h-5" />
            Cores da Marca
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Cor Primária */}
          <div className="space-y-2">
            <Label>Cor Primária *</Label>
            <div className="flex gap-2">
              <div
                className="w-12 h-12 rounded-lg border-2 border-gray-200 cursor-pointer"
                style={{ backgroundColor: brandColors.primary }}
                onClick={() => document.getElementById('primary-color')?.click()}
              />
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
                placeholder="#CD9C55"
                className="flex-1 font-mono"
              />
            </div>
          </div>

          {/* Cor Secundária */}
          {brandColors.secondary ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Cor Secundária</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeColor('secondary')}
                  className="h-6 w-6 p-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex gap-2">
                <div
                  className="w-12 h-12 rounded-lg border-2 border-gray-200 cursor-pointer"
                  style={{ backgroundColor: brandColors.secondary }}
                  onClick={() => document.getElementById('secondary-color')?.click()}
                />
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
                  placeholder="#6B7280"
                  className="flex-1 font-mono"
                />
              </div>
            </div>
          ) : (
            <Button
              variant="outline"
              onClick={addSecondaryColor}
              className="w-full flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Adicionar Cor Secundária
            </Button>
          )}

          {/* Cor Terciária */}
          {brandColors.tertiary ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Cor Terciária</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeColor('tertiary')}
                  className="h-6 w-6 p-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex gap-2">
                <div
                  className="w-12 h-12 rounded-lg border-2 border-gray-200 cursor-pointer"
                  style={{ backgroundColor: brandColors.tertiary }}
                  onClick={() => document.getElementById('tertiary-color')?.click()}
                />
                <Input
                  id="tertiary-color"
                  type="color"
                  value={brandColors.tertiary}
                  onChange={(e) => handleColorChange('tertiary', e.target.value)}
                  className="sr-only"
                />
                <Input
                  value={brandColors.tertiary}
                  onChange={(e) => handleColorChange('tertiary', e.target.value)}
                  placeholder="#10B981"
                  className="flex-1 font-mono"
                />
              </div>
            </div>
          ) : brandColors.secondary && (
            <Button
              variant="outline"
              onClick={addTertiaryColor}
              className="w-full flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Adicionar Cor Terciária
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Upload de Imagem */}
      <Card>
        <CardHeader>
          <CardTitle>Extrair Cores de Imagem</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
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
                className="flex items-center gap-2"
              >
                <Upload className="w-4 h-4" />
                Upload Imagem
              </Button>
            </div>

            {extractedColors.length > 0 && (
              <div className="space-y-2">
                <Label>Cores Extraídas</Label>
                <div className="flex gap-2">
                  {extractedColors.map((color, index) => (
                    <div
                      key={index}
                      className="w-12 h-12 rounded-lg border-2 border-gray-200 cursor-pointer hover:scale-105 transition-transform"
                      style={{ backgroundColor: color }}
                      onClick={() => handleColorChange('primary', color)}
                      title={`${color} - Clique para usar como primária`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Teoria das Cores */}
      <Card>
        <CardHeader>
          <CardTitle>Harmonia de Cores</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {harmonyTypes.map((type) => (
              <div
                key={type.value}
                className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                  harmonyType === type.value
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setHarmonyType(type.value as any)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-800">{type.label}</div>
                    <div className="text-sm text-gray-600">{type.description}</div>
                  </div>
                  <div className="w-4 h-4 rounded-full border-2 border-gray-300">
                    {harmonyType === type.value && (
                      <div className="w-full h-full rounded-full bg-blue-500"></div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ColorPicker;
