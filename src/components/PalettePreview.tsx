
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TailwindShades } from '@/lib/colorUtils';
import { Copy, Download, Heart, Save } from 'lucide-react';
import { toast } from 'sonner';

interface PalettePreviewProps {
  shades: TailwindShades | null;
  colorScheme: string[];
  paletteName: string;
  onSavePalette: () => void;
}

const PalettePreview = ({ shades, colorScheme, paletteName, onSavePalette }: PalettePreviewProps) => {
  const [hoveredColor, setHoveredColor] = useState<string | null>(null);

  const copyToClipboard = (color: string) => {
    navigator.clipboard.writeText(color);
    toast.success('Cor copiada!');
  };

  const exportPalette = () => {
    if (!shades) return;
    
    const paletteData = {
      name: paletteName,
      shades,
      colorScheme,
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

  if (!shades) {
    return (
      <Card className="bg-gray-50 border-dashed border-2 border-gray-300">
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Copy className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-600">Gere uma paleta para visualizar os tons</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header da paleta */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">{paletteName}</h3>
          <p className="text-sm text-gray-600">Esquema de cores gerado</p>
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

      {/* Tons Tailwind */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>Tons Tailwind</span>
            <span className="text-sm font-normal text-gray-600">(50-900)</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
            {Object.entries(shades).map(([shade, color]) => (
              <div
                key={shade}
                className="group relative"
                onMouseEnter={() => setHoveredColor(color)}
                onMouseLeave={() => setHoveredColor(null)}
              >
                <div
                  className="aspect-square rounded-lg border-2 border-gray-200 cursor-pointer hover:scale-105 transition-transform"
                  style={{ backgroundColor: color }}
                  onClick={() => copyToClipboard(color)}
                  title={`${shade}: ${color}`}
                />
                <div className="text-center mt-1">
                  <div className="text-xs font-medium text-gray-700">{shade}</div>
                  <div className="text-xs text-gray-500 font-mono">{color}</div>
                </div>
                {hoveredColor === color && (
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                    Clique para copiar
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Esquema de cores */}
      <Card>
        <CardHeader>
          <CardTitle>Esquema de Cores</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            {colorScheme.map((color, index) => (
              <div
                key={index}
                className="group relative flex-1"
                onMouseEnter={() => setHoveredColor(color)}
                onMouseLeave={() => setHoveredColor(null)}
              >
                <div
                  className="aspect-square rounded-lg border-2 border-gray-200 cursor-pointer hover:scale-105 transition-transform"
                  style={{ backgroundColor: color }}
                  onClick={() => copyToClipboard(color)}
                  title={color}
                />
                <div className="text-center mt-2">
                  <div className="text-sm font-mono text-gray-700">{color}</div>
                </div>
                {hoveredColor === color && (
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                    Clique para copiar
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PalettePreview;
