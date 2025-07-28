
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TailwindShades } from '@/lib/colorUtils';
import { Copy, Download, Save, Eye } from 'lucide-react';
import { toast } from 'sonner';

interface PalettePreviewProps {
  palette: { [key: string]: TailwindShades } | null;
  harmonies: string[];
  paletteName: string;
  onSavePalette: () => void;
}

const PalettePreview = ({ palette, harmonies, paletteName, onSavePalette }: PalettePreviewProps) => {
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

  if (!palette || Object.keys(palette).length === 0) {
    return (
      <Card className="bg-gray-50 border-dashed border-2 border-gray-300">
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Eye className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-600">Adicione uma cor para gerar a paleta</p>
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
          <p className="text-sm text-gray-600">
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
        <Card key={colorName}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 capitalize">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: shades[500] }}
              />
              Cor {colorName}
              <span className="text-sm font-normal text-gray-600">(50-950)</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-6 md:grid-cols-11 gap-2">
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
                    title={`${colorName}-${shade}: ${color}`}
                  />
                  <div className="text-center mt-1">
                    <div className="text-xs font-medium text-gray-700">{shade}</div>
                    <div className="text-xs text-gray-500 font-mono">{color}</div>
                  </div>
                  {hoveredColor === color && (
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white px-2 py-1 rounded text-xs whitespace-nowrap z-10">
                      Clique para copiar
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Harmonias de cores */}
      {harmonies.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Harmonia de Cores</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {harmonies.map((color, index) => (
                <div
                  key={index}
                  className="group relative"
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
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white px-2 py-1 rounded text-xs whitespace-nowrap z-10">
                      Clique para copiar
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PalettePreview;
