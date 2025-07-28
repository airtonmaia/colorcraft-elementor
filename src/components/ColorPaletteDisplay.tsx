
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TailwindShades } from '@/lib/colorUtils';
import { Copy, Download, Save, Eye } from 'lucide-react';
import { toast } from 'sonner';
import chroma from 'chroma-js';

interface ColorPaletteDisplayProps {
  palette: { [key: string]: TailwindShades } | null;
  harmonies: string[];
  paletteName: string;
  onSavePalette: () => void;
}

const ColorPaletteDisplay = ({ palette, harmonies, paletteName, onSavePalette }: ColorPaletteDisplayProps) => {
  const [hoveredColor, setHoveredColor] = useState<string | null>(null);

  const copyToClipboard = (color: string) => {
    navigator.clipboard.writeText(color);
    toast.success('Cor copiada!');
  };

  const exportPalette = () => {
    if (!palette) return;
    
    const paletteData = {
      name: paletteName,
      palette,
      harmonies,
      createdAt: new Date().toISOString(),
    };
    
    const blob = new Blob([JSON.stringify(paletteData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${paletteName.replace(/\s+/g, '-').toLowerCase()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    toast.success('Paleta exportada!');
  };

  // Function to determine text color based on background
  const getTextColor = (backgroundColor: string) => {
    try {
      const contrast = chroma.contrast(backgroundColor, '#ffffff');
      return contrast > 4.5 ? '#ffffff' : '#000000';
    } catch (error) {
      return '#000000';
    }
  };

  if (!palette || Object.keys(palette).length === 0) {
    return (
      <div className="bg-gray-50 dark:bg-gray-800 border-dashed border-2 border-gray-300 dark:border-gray-600 rounded-lg">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Eye className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-600 dark:text-gray-400">Adicione uma cor para gerar a paleta</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header da paleta */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{paletteName}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {Object.keys(palette).length} {Object.keys(palette).length === 1 ? 'cor' : 'cores'} da marca
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onSavePalette} className="flex items-center gap-2">
            <Save className="w-4 h-4" />
            Salvar
          </Button>
          <Button variant="outline" onClick={exportPalette} className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Paletas de cada cor */}
      {Object.entries(palette).map(([colorName, shades]) => (
        <div key={colorName} className="space-y-3">
          <div className="flex items-center gap-3">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: shades[500] }}
            />
            <h4 className="text-lg font-medium text-gray-900 dark:text-white capitalize">
              Cor {colorName}
            </h4>
            <span className="text-sm text-gray-500 dark:text-gray-400">(50-950)</span>
          </div>
          
          {/* Grid de cores sem bordas, seguindo o layout da referência */}
          <div className="flex gap-0 rounded-lg overflow-hidden">
            {Object.entries(shades).map(([shade, color]) => {
              const textColor = getTextColor(color);
              return (
                <div
                  key={shade}
                  className="flex-1 h-24 cursor-pointer hover:scale-105 transition-transform relative group"
                  style={{ backgroundColor: color }}
                  onClick={() => copyToClipboard(color)}
                  onMouseEnter={() => setHoveredColor(color)}
                  onMouseLeave={() => setHoveredColor(null)}
                >
                  <div className="absolute inset-0 flex flex-col justify-center items-center p-1">
                    <div 
                      className="text-xs font-medium mb-1"
                      style={{ color: textColor }}
                    >
                      {shade}
                    </div>
                    <div 
                      className="text-xs font-mono text-center leading-tight"
                      style={{ color: textColor }}
                    >
                      {color}
                    </div>
                  </div>
                  
                  {hoveredColor === color && (
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white px-2 py-1 rounded text-xs whitespace-nowrap z-10">
                      Clique para copiar
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {/* Harmonias de cores */}
      {harmonies.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-lg font-medium text-gray-900 dark:text-white">Harmonia de Cores</h4>
          <div className="grid grid-cols-3 gap-4">
            {harmonies.map((color, index) => {
              const textColor = getTextColor(color);
              return (
                <div
                  key={index}
                  className="aspect-square rounded-lg cursor-pointer hover:scale-105 transition-transform relative group"
                  style={{ backgroundColor: color }}
                  onClick={() => copyToClipboard(color)}
                  onMouseEnter={() => setHoveredColor(color)}
                  onMouseLeave={() => setHoveredColor(null)}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div 
                      className="text-sm font-mono text-center"
                      style={{ color: textColor }}
                    >
                      {color}
                    </div>
                  </div>
                  
                  {hoveredColor === color && (
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white px-2 py-1 rounded text-xs whitespace-nowrap z-10">
                      Clique para copiar
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorPaletteDisplay;
