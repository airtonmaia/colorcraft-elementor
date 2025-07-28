
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Save, Download, Copy } from 'lucide-react';
import ColorPicker from '@/components/ColorPicker';
import ColorPaletteDisplay from '@/components/ColorPaletteDisplay';
import ContrastChecker from '@/components/ContrastChecker';
import ElementorWidgets from '@/components/ElementorWidgets';
import WebsiteDemo from '@/components/WebsiteDemo';
import Dashboard from '@/components/Dashboard';
import TypographySelector from '@/components/TypographySelector';
import { TailwindShades } from '@/lib/colorUtils';
import { FontCombination } from '@/lib/typographyUtils';
import { toast } from 'sonner';

const Index = () => {
  const [currentPalette, setCurrentPalette] = useState<{ [key: string]: TailwindShades } | null>(null);
  const [currentHarmonies, setCurrentHarmonies] = useState<string[]>([]);
  const [paletteName, setPaletteName] = useState('Palette 1');
  const [selectedFont, setSelectedFont] = useState<FontCombination | null>(null);
  const [activeTab, setActiveTab] = useState('generate');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Top navigation items
  const topNavItems = [
    { id: 'generate', label: 'Generate', active: true },
    { id: 'my-palettes', label: 'My palettes' },
    { id: 'tailwind-colors', label: 'Tailwind Colors' },
    { id: 'more', label: 'More' }
  ];

  // Bottom navigation items
  const bottomNavItems = [
    { id: 'contrast', label: 'Contrast grid' },
    { id: 'export', label: 'Export' },
    { id: 'edit', label: 'Edit' }
  ];

  // Dark mode initialization
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

  const handlePaletteGenerated = (palette: { [key: string]: TailwindShades }, harmonies: string[]) => {
    setCurrentPalette(palette);
    setCurrentHarmonies(harmonies);
  };

  const handleFontSelected = (font: FontCombination) => {
    setSelectedFont(font);
  };

  const handleSavePalette = () => {
    toast.success('Palette saved!');
  };

  const handleExportPalette = () => {
    if (currentPalette) {
      const exportData = {
        name: paletteName,
        palette: currentPalette,
        harmonies: currentHarmonies,
        font: selectedFont
      };
      
      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${paletteName.toLowerCase().replace(/\s+/g, '-')}.json`;
      a.click();
      URL.revokeObjectURL(url);
      
      toast.success('Palette exported!');
    }
  };

  const copyPaletteToClipboard = () => {
    if (currentPalette) {
      const primaryColors = currentPalette.primary;
      const colorString = Object.entries(primaryColors)
        .map(([shade, color]) => `${shade}: ${color}`)
        .join('\n');
      
      navigator.clipboard.writeText(colorString);
      toast.success('Colors copied to clipboard!');
    }
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

  const renderMainContent = () => {
    switch (activeTab) {
      case 'contrast':
        return currentPalette ? (
          <ContrastChecker palette={currentPalette} />
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">Generate a palette first to check contrasts</p>
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
          <div className="flex gap-8 h-full">
            {/* Left Column - Actions */}
            <div className="w-96 flex-shrink-0">
              <ColorPicker onPaletteGenerated={handlePaletteGenerated} />
            </div>
            
            {/* Right Column - Palette Display */}
            <div className="flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <h2 className="text-xl font-semibold dark:text-white">{paletteName}</h2>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={handleSavePalette}
                    className="h-8 w-8"
                  >
                    <Save className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex items-center gap-2">
                  {bottomNavItems.map((item) => (
                    <Button
                      key={item.id}
                      variant={activeTab === item.id ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => {
                        if (item.id === 'contrast') {
                          setActiveTab('contrast');
                        } else if (item.id === 'export') {
                          handleExportPalette();
                        } else if (item.id === 'edit') {
                          copyPaletteToClipboard();
                        }
                      }}
                      className="text-sm"
                    >
                      {item.label}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="flex-1">
                <ColorPaletteDisplay
                  palette={currentPalette}
                  harmonies={currentHarmonies}
                  paletteName={paletteName}
                  onSavePalette={handleSavePalette}
                />
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'dark bg-gray-900' : 'bg-white'
    }`}>
      {/* Top Navigation */}
      <header className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">UI</span>
                </div>
                <span className="font-semibold text-gray-900 dark:text-white">Colors</span>
              </div>
              
              <nav className="flex items-center gap-6">
                {topNavItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`text-sm font-medium transition-colors ${
                      activeTab === item.id 
                        ? 'text-purple-600 dark:text-purple-400' 
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
            
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="text-gray-600 dark:text-gray-400">
                Feedback
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleDarkMode}
                className="h-8 w-8"
              >
                {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
              
              <Button size="sm" className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100">
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          {renderMainContent()}
        </div>
      </main>
    </div>
  );
};

export default Index;
