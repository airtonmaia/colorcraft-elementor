
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { calculateContrast, generateContrastGrid, TailwindShades } from '@/lib/colorUtils';
import { Eye, Copy, Check, X } from 'lucide-react';
import { toast } from 'sonner';

interface ContrastCheckerProps {
  palette: { [key: string]: TailwindShades };
}

const ContrastChecker = ({ palette }: ContrastCheckerProps) => {
  const [selectedForeground, setSelectedForeground] = useState('#000000');
  const [selectedBackground, setSelectedBackground] = useState('#FFFFFF');
  const [showGrid, setShowGrid] = useState(false);

  // Extrair todas as cores da paleta
  const getAllColors = () => {
    const colors: { name: string; color: string }[] = [];
    
    Object.entries(palette).forEach(([paletteName, shades]) => {
      Object.entries(shades).forEach(([shade, color]) => {
        colors.push({
          name: `${paletteName}-${shade}`,
          color: color
        });
      });
    });
    
    return colors;
  };

  const allColors = getAllColors();
  const contrastResult = calculateContrast(selectedForeground, selectedBackground);

  const getContrastBadge = (level: string, ratio: number) => {
    const badges = {
      'AAA': <Badge className="bg-green-500">AAA ({ratio}:1)</Badge>,
      'AA': <Badge className="bg-yellow-500">AA ({ratio}:1)</Badge>,
      'fail': <Badge variant="destructive">Falha ({ratio}:1)</Badge>,
    };
    return badges[level as keyof typeof badges] || badges.fail;
  };

  const generateGridData = () => {
    const gridColors = allColors.slice(0, 10).map(c => c.color); // Limitar para performance
    return generateContrastGrid(gridColors);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copiado!');
  };

  return (
    <div className="space-y-6">
      {/* Verificador Individual */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Verificador de Contraste
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Cor do Texto (Foreground)</Label>
              <div className="flex gap-2">
                <div
                  className="w-12 h-12 rounded-lg border-2 border-gray-200 cursor-pointer"
                  style={{ backgroundColor: selectedForeground }}
                  onClick={() => document.getElementById('fg-color')?.click()}
                />
                <Input
                  id="fg-color"
                  type="color"
                  value={selectedForeground}
                  onChange={(e) => setSelectedForeground(e.target.value)}
                  className="sr-only"
                />
                <Input
                  value={selectedForeground}
                  onChange={(e) => setSelectedForeground(e.target.value)}
                  className="flex-1 font-mono"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Cor de Fundo (Background)</Label>
              <div className="flex gap-2">
                <div
                  className="w-12 h-12 rounded-lg border-2 border-gray-200 cursor-pointer"
                  style={{ backgroundColor: selectedBackground }}
                  onClick={() => document.getElementById('bg-color')?.click()}
                />
                <Input
                  id="bg-color"
                  type="color"
                  value={selectedBackground}
                  onChange={(e) => setSelectedBackground(e.target.value)}
                  className="sr-only"
                />
                <Input
                  value={selectedBackground}
                  onChange={(e) => setSelectedBackground(e.target.value)}
                  className="flex-1 font-mono"
                />
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="space-y-4">
            <div
              className="p-6 rounded-lg border-2"
              style={{ 
                backgroundColor: selectedBackground,
                color: selectedForeground,
                borderColor: selectedForeground
              }}
            >
              <h3 className="text-2xl font-bold mb-2">Exemplo de Texto</h3>
              <p className="text-base mb-2">
                Este é um exemplo de como o texto aparecerá com essas cores.
              </p>
              <p className="text-sm">
                Texto menor para testar legibilidade em diferentes tamanhos.
              </p>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">Resultado:</span>
                {getContrastBadge(contrastResult.level, contrastResult.ratio)}
              </div>
              <div className="flex items-center gap-2">
                {contrastResult.readable ? (
                  <Check className="w-5 h-5 text-green-500" />
                ) : (
                  <X className="w-5 h-5 text-red-500" />
                )}
                <span className="text-sm">
                  {contrastResult.readable ? 'Legível' : 'Não legível'}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Seleção Rápida da Paleta */}
      {allColors.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Seleção Rápida da Paleta</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium mb-2 block">
                  Clique para usar como texto:
                </Label>
                <div className="flex flex-wrap gap-2">
                  {allColors.map((colorInfo, index) => (
                    <div
                      key={index}
                      className="w-8 h-8 rounded cursor-pointer hover:scale-110 transition-transform border-2 border-gray-200"
                      style={{ backgroundColor: colorInfo.color }}
                      onClick={() => setSelectedForeground(colorInfo.color)}
                      title={`${colorInfo.name}: ${colorInfo.color}`}
                    />
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">
                  Clique para usar como fundo:
                </Label>
                <div className="flex flex-wrap gap-2">
                  {allColors.map((colorInfo, index) => (
                    <div
                      key={index}
                      className="w-8 h-8 rounded cursor-pointer hover:scale-110 transition-transform border-2 border-gray-200"
                      style={{ backgroundColor: colorInfo.color }}
                      onClick={() => setSelectedBackground(colorInfo.color)}
                      title={`${colorInfo.name}: ${colorInfo.color}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Grade de Contraste */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Grade de Contraste</span>
            <Button
              variant="outline"
              onClick={() => setShowGrid(!showGrid)}
              size="sm"
            >
              {showGrid ? 'Ocultar' : 'Mostrar'} Grade
            </Button>
          </CardTitle>
        </CardHeader>
        {showGrid && (
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="p-2 border border-gray-200"></th>
                    {allColors.slice(0, 8).map((colorInfo, index) => (
                      <th
                        key={index}
                        className="p-2 border border-gray-200 w-12"
                        style={{ backgroundColor: colorInfo.color }}
                        title={colorInfo.name}
                      >
                        <div className="w-6 h-6 rounded mx-auto"></div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {allColors.slice(0, 8).map((rowColor, rowIndex) => (
                    <tr key={rowIndex}>
                      <td
                        className="p-2 border border-gray-200"
                        style={{ backgroundColor: rowColor.color }}
                        title={rowColor.name}
                      >
                        <div className="w-6 h-6 rounded"></div>
                      </td>
                      {allColors.slice(0, 8).map((colColor, colIndex) => {
                        const contrast = calculateContrast(rowColor.color, colColor.color);
                        return (
                          <td
                            key={colIndex}
                            className={`p-2 border border-gray-200 text-center text-xs cursor-pointer hover:bg-gray-50 ${
                              contrast.level === 'AAA' ? 'bg-green-100' :
                              contrast.level === 'AA' ? 'bg-yellow-100' :
                              'bg-red-100'
                            }`}
                            onClick={() => copyToClipboard(contrast.ratio.toString())}
                            title={`Contraste: ${contrast.ratio}:1 (${contrast.level})`}
                          >
                            {contrast.ratio}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-100 rounded"></div>
                <span>AAA (≥7:1)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-100 rounded"></div>
                <span>AA (≥4.5:1)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-100 rounded"></div>
                <span>Falha (&lt;4.5:1)</span>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default ContrastChecker;
