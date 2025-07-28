import { useState, useEffect } from 'react';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { AppSidebar } from '@/components/AppSidebar';
import ColorPicker from '@/components/ColorPicker';
import PalettePreview from '@/components/PalettePreview';
import ContrastChecker from '@/components/ContrastChecker';
import ElementorWidgets from '@/components/ElementorWidgets';
import WebsiteDemo from '@/components/WebsiteDemo';
import Dashboard from '@/components/Dashboard';
import TypographySelector from '@/components/TypographySelector';
import { TailwindShades } from '@/lib/colorUtils';
import { FontCombination } from '@/lib/typographyUtils';

const Index = () => {
  const [currentPalette, setCurrentPalette] = useState<{ [key: string]: TailwindShades } | null>(null);
  const [currentHarmonies, setCurrentHarmonies] = useState<string[]>([]);
  const [paletteName, setPaletteName] = useState('Paleta Personalizada');
  const [selectedFont, setSelectedFont] = useState<FontCombination | null>(null);
  const [activeTab, setActiveTab] = useState('generator');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Dark mode initialization and persistence
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const shouldUseDark = savedTheme === 'dark' || (savedTheme === null && systemPrefersDark);
    
    setIsDarkMode(shouldUseDark);
    
    if (shouldUseDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Hash navigation management
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

  const handlePaletteGenerated = (palette: { [key: string]: TailwindShades }, harmonies: string[]) => {
    setCurrentPalette(palette);
    setCurrentHarmonies(harmonies);
  };

  const handleFontSelected = (font: FontCombination) => {
    setSelectedFont(font);
  };

  const handleSavePalette = () => {
    console.log('Salvando paleta:', { currentPalette, currentHarmonies, paletteName, selectedFont });
  };

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
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
                palette={currentPalette}
                harmonies={currentHarmonies}
                paletteName={paletteName}
                onSavePalette={handleSavePalette}
              />
            </div>
          </div>
        );
      case 'contrast':
        return currentPalette ? (
          <ContrastChecker palette={currentPalette} />
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">Gere uma paleta primeiro para verificar contrastes</p>
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
            shades={currentPalette ? currentPalette.primary : null} 
            colorScheme={currentHarmonies} 
            selectedFont={selectedFont}
          />
        );
      case 'website':
        return (
          <WebsiteDemo 
            shades={currentPalette ? currentPalette.primary : null} 
            colorScheme={currentHarmonies} 
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
                palette={currentPalette}
                harmonies={currentHarmonies}
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
      <div className={`min-h-screen flex w-full transition-colors duration-300 ${
        isDarkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-gray-50 to-white'
      }`}>
        <AppSidebar />
        
        <SidebarInset className="flex-1">
          {/* Header */}
          <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
            <div className="flex items-center justify-between h-16 px-6">
              <div className="flex items-center gap-3">
                <SidebarTrigger className="h-8 w-8 dark:text-gray-300" />
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Bem-vindo, <span className="font-semibold">Usuário</span>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={toggleDarkMode}
                className="dark:border-gray-600 dark:text-gray-300"
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <main className="flex-1 p-6">
            {renderContent()}
          </main>

          {/* Footer */}
          <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-16">
            <div className="px-6 py-8">
              <div className="text-center text-gray-600 dark:text-gray-400">
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
