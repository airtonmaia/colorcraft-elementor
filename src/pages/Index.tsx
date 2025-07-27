
import { useState, useEffect } from 'react';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import ColorPicker from '@/components/ColorPicker';
import PalettePreview from '@/components/PalettePreview';
import ElementorWidgets from '@/components/ElementorWidgets';
import RelumeDemo from '@/components/RelumeDemo';
import Dashboard from '@/components/Dashboard';
import TypographySelector from '@/components/TypographySelector';
import { TailwindShades } from '@/lib/colorUtils';
import { FontCombination } from '@/lib/typographyUtils';

const Index = () => {
  const [currentShades, setCurrentShades] = useState<TailwindShades | null>(null);
  const [currentScheme, setCurrentScheme] = useState<string[]>([]);
  const [paletteName, setPaletteName] = useState('Paleta Personalizada');
  const [selectedFont, setSelectedFont] = useState<FontCombination | null>(null);
  const [activeTab, setActiveTab] = useState('generator');

  // Gerenciar navegação via hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        setActiveTab(hash);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handlePaletteGenerated = (shades: TailwindShades, scheme: string[]) => {
    setCurrentShades(shades);
    setCurrentScheme(scheme);
  };

  const handleFontSelected = (font: FontCombination) => {
    setSelectedFont(font);
  };

  const handleSavePalette = () => {
    console.log('Salvando paleta:', { currentShades, currentScheme, paletteName, selectedFont });
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'generator':
        return (
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
        );
      case 'typography':
        return (
          <TypographySelector
            onFontSelected={handleFontSelected}
            selectedFont={selectedFont}
          />
        );
      case 'widgets':
        return (
          <ElementorWidgets 
            shades={currentShades} 
            colorScheme={currentScheme} 
            selectedFont={selectedFont}
          />
        );
      case 'relume':
        return (
          <RelumeDemo 
            shades={currentShades} 
            colorScheme={currentScheme} 
            selectedFont={selectedFont}
          />
        );
      case 'dashboard':
        return <Dashboard />;
      default:
        return (
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
        );
    }
  };

  return (
    <SidebarProvider defaultOpen>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-gray-50 to-white">
        <AppSidebar />
        
        <SidebarInset className="flex-1">
          {/* Header */}
          <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
            <div className="flex items-center justify-between h-16 px-6">
              <div className="flex items-center gap-3">
                <SidebarTrigger className="h-8 w-8" />
                <div className="text-sm text-gray-600">
                  Bem-vindo, <span className="font-semibold">Usuário</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <main className="flex-1 p-6">
            {renderContent()}
          </main>

          {/* Footer */}
          <div className="bg-white border-t border-gray-200 mt-16">
            <div className="px-6 py-8">
              <div className="text-center text-gray-600">
                <p className="text-sm">
                  © 2024 Palette Generator. Transforme suas ideias em paletas profissionais.
                </p>
              </div>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Index;
