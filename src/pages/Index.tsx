
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ColorPicker from '@/components/ColorPicker';
import PalettePreview from '@/components/PalettePreview';
import ElementorPreview from '@/components/ElementorPreview';
import Dashboard from '@/components/Dashboard';
import TypographySelector from '@/components/TypographySelector';
import { TailwindShades } from '@/lib/colorUtils';
import { FontCombination } from '@/lib/typographyUtils';
import { Palette, Eye, BarChart3, Sparkles, Type } from 'lucide-react';

const Index = () => {
  const [currentShades, setCurrentShades] = useState<TailwindShades | null>(null);
  const [currentScheme, setCurrentScheme] = useState<string[]>([]);
  const [paletteName, setPaletteName] = useState('Paleta Personalizada');
  const [selectedFont, setSelectedFont] = useState<FontCombination | null>(null);

  const handlePaletteGenerated = (shades: TailwindShades, scheme: string[]) => {
    setCurrentShades(shades);
    setCurrentScheme(scheme);
  };

  const handleFontSelected = (font: FontCombination) => {
    setSelectedFont(font);
  };

  const handleSavePalette = () => {
    // Implementar lógica de salvar paleta
    console.log('Salvando paleta:', { currentShades, currentScheme, paletteName, selectedFont });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-brand-500 to-brand-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Palette Generator</h1>
                <p className="text-xs text-gray-600">Gerador de Paletas + Templates Elementor</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600">
                Bem-vindo, <span className="font-semibold">Usuário</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="generator" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 bg-white shadow-sm border border-gray-200">
            <TabsTrigger value="generator" className="flex items-center gap-2">
              <Palette className="w-4 h-4" />
              Gerador
            </TabsTrigger>
            <TabsTrigger value="typography" className="flex items-center gap-2">
              <Type className="w-4 h-4" />
              Tipografia
            </TabsTrigger>
            <TabsTrigger value="preview" className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Preview
            </TabsTrigger>
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Dashboard
            </TabsTrigger>
          </TabsList>

          <TabsContent value="generator" className="space-y-8">
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <ColorPicker onPaletteGenerated={handlePaletteGenerated} />
              </div>
              <div className="space-y-6">
                <PalettePreview
                  shades={currentShades}
                  colorScheme={currentScheme}
                  paletteName={paletteName}
                  onSavePalette={handleSavePalette}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="typography" className="space-y-8">
            <TypographySelector
              onFontSelected={handleFontSelected}
              selectedFont={selectedFont}
            />
          </TabsContent>

          <TabsContent value="preview" className="space-y-8">
            <ElementorPreview 
              shades={currentShades} 
              colorScheme={currentScheme} 
              selectedFont={selectedFont}
            />
          </TabsContent>

          <TabsContent value="dashboard" className="space-y-8">
            <Dashboard />
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p className="text-sm">
              © 2024 Palette Generator. Transforme suas ideias em paletas profissionais.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
