
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, Palette, Copy } from 'lucide-react';
import { generateTailwindShades, generateColorScheme, extractColorsFromImage, TailwindShades } from '@/lib/colorUtils';
import { toast } from 'sonner';

interface ColorPickerProps {
  onPaletteGenerated: (shades: TailwindShades, scheme: string[]) => void;
}

const ColorPicker = ({ onPaletteGenerated }: ColorPickerProps) => {
  const [baseColor, setBaseColor] = useState('#f97316');
  const [selectedScheme, setSelectedScheme] = useState<'analogous' | 'complementary' | 'triadic' | 'tetradic' | 'split-complementary'>('analogous');
  const [isGenerating, setIsGenerating] = useState(false);
  const [extractedColors, setExtractedColors] = useState<string[]>([]);

  const schemes = [
    { value: 'analogous', label: 'Análogo', description: 'Cores próximas no círculo cromático' },
    { value: 'complementary', label: 'Complementar', description: 'Cores opostas para criar contraste' },
    { value: 'triadic', label: 'Triádico', description: 'Três cores uniformemente espaçadas' },
    { value: 'tetradic', label: 'Tetrádico', description: 'Quatro cores uniformemente espaçadas' },
    { value: 'split-complementary', label: 'Complementar Dividido', description: 'Uma cor base e duas vizinhas de seu oposto' },
  ];

  const handleGeneratePalette = async () => {
    setIsGenerating(true);
    
    try {
      const shades = generateTailwindShades(baseColor);
      const scheme = generateColorScheme(baseColor, selectedScheme);
      
      onPaletteGenerated(shades, scheme);
      toast.success('Paleta gerada com sucesso!');
    } catch (error) {
      toast.error('Erro ao gerar paleta');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsGenerating(true);
    
    try {
      const colors = await extractColorsFromImage(file);
      setExtractedColors(colors);
      if (colors.length > 0) {
        setBaseColor(colors[0]);
        toast.success(`${colors.length} cores extraídas da imagem!`);
      }
    } catch (error) {
      toast.error('Erro ao extrair cores da imagem');
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (color: string) => {
    navigator.clipboard.writeText(color);
    toast.success('Cor copiada para a área de transferência!');
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-xl shadow-lg border border-gray-100">
      <div className="flex items-center gap-2 mb-4">
        <Palette className="w-5 h-5 text-brand-500" />
        <h2 className="text-xl font-semibold text-gray-800">Gerador de Paleta</h2>
      </div>

      {/* Input de cor base */}
      <div className="space-y-2">
        <Label htmlFor="base-color">Cor Base</Label>
        <div className="flex gap-2">
          <div className="relative">
            <Input
              id="base-color"
              type="color"
              value={baseColor}
              onChange={(e) => setBaseColor(e.target.value)}
              className="w-12 h-12 border-2 border-gray-200 rounded-lg cursor-pointer"
            />
          </div>
          <Input
            type="text"
            value={baseColor}
            onChange={(e) => setBaseColor(e.target.value)}
            placeholder="#f97316"
            className="flex-1"
          />
        </div>
      </div>

      {/* Upload de imagem */}
      <div className="space-y-2">
        <Label htmlFor="image-upload">Extrair Cores de Imagem</Label>
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
      </div>

      {/* Cores extraídas */}
      {extractedColors.length > 0 && (
        <div className="space-y-2">
          <Label>Cores Extraídas</Label>
          <div className="flex gap-2">
            {extractedColors.map((color, index) => (
              <div
                key={index}
                className="w-12 h-12 rounded-lg border-2 border-gray-200 cursor-pointer hover:scale-105 transition-transform"
                style={{ backgroundColor: color }}
                onClick={() => setBaseColor(color)}
                title={color}
              />
            ))}
          </div>
        </div>
      )}

      {/* Esquema de cores */}
      <div className="space-y-3">
        <Label>Esquema de Combinação</Label>
        <div className="space-y-2">
          {schemes.map((scheme) => (
            <div
              key={scheme.value}
              className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                selectedScheme === scheme.value
                  ? 'border-brand-500 bg-brand-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedScheme(scheme.value as any)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-800">{scheme.label}</div>
                  <div className="text-sm text-gray-600">{scheme.description}</div>
                </div>
                <div className="w-4 h-4 rounded-full border-2 border-gray-300">
                  {selectedScheme === scheme.value && (
                    <div className="w-full h-full rounded-full bg-brand-500"></div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Botão gerar */}
      <Button
        onClick={handleGeneratePalette}
        disabled={isGenerating}
        className="w-full bg-brand-500 hover:bg-brand-600 text-white"
      >
        {isGenerating ? 'Gerando...' : 'Gerar Paleta'}
      </Button>
    </div>
  );
};

export default ColorPicker;
