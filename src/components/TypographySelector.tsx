
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Type, Eye, Download, Settings } from 'lucide-react';
import { fontCombinations, FontCombination, generateGoogleFontsUrl, generateTypographyCSS } from '@/lib/typographyUtils';

interface TypographySelectorProps {
  onFontSelected: (font: FontCombination) => void;
  selectedFont: FontCombination | null;
}

const TypographySelector = ({ onFontSelected, selectedFont }: TypographySelectorProps) => {
  const [previewFont, setPreviewFont] = useState<FontCombination | null>(null);

  const handleFontPreview = (font: FontCombination) => {
    setPreviewFont(font);
    
    // Carregar Google Fonts dinamicamente
    const existingLink = document.querySelector(`link[href*="${font.googleFonts[0]}"]`);
    if (!existingLink) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = generateGoogleFontsUrl(font.googleFonts);
      document.head.appendChild(link);
    }
  };

  const handleFontSelect = (font: FontCombination) => {
    onFontSelected(font);
    handleFontPreview(font);
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      modern: 'bg-blue-100 text-blue-800',
      elegant: 'bg-purple-100 text-purple-800',
      corporate: 'bg-gray-100 text-gray-800',
      creative: 'bg-green-100 text-green-800',
      minimal: 'bg-orange-100 text-orange-800',
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Type className="w-5 h-5" />
          Sugestões de Tipografia
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="combinations" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="combinations">Combinações</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>

          <TabsContent value="combinations" className="space-y-4">
            <div className="grid gap-4">
              {fontCombinations.map((font) => (
                <Card 
                  key={font.id} 
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedFont?.id === font.id ? 'ring-2 ring-brand-500' : ''
                  }`}
                  onClick={() => handleFontSelect(font)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-800">{font.name}</h3>
                        <Badge className={getCategoryColor(font.category)}>
                          {font.category}
                        </Badge>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleFontPreview(font);
                        }}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">Primária:</span> {font.primary}
                      </div>
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">Secundária:</span> {font.secondary}
                      </div>
                      
                      {/* Preview das fontes */}
                      <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                        <div 
                          className="text-lg font-bold mb-1"
                          style={{ fontFamily: `'${font.primary}', sans-serif` }}
                        >
                          Título Principal
                        </div>
                        <div 
                          className="text-sm text-gray-600"
                          style={{ fontFamily: `'${font.secondary}', sans-serif` }}
                        >
                          Este é um texto de exemplo para visualizar a combinação de fontes.
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="preview" className="space-y-4">
            {previewFont ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{previewFont.name}</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const css = generateTypographyCSS(previewFont);
                      const blob = new Blob([css], { type: 'text/css' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `${previewFont.name.replace(/\s+/g, '-').toLowerCase()}-typography.css`;
                      a.click();
                      URL.revokeObjectURL(url);
                    }}
                  >
                    <Download className="w-4 h-4 mr-1" />
                    Baixar CSS
                  </Button>
                </div>

                {/* Preview dos tamanhos */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Preview Responsivo</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4">
                      {/* Desktop */}
                      <div>
                        <h4 className="text-sm font-medium mb-3 text-gray-600">Desktop</h4>
                        <div className="space-y-2">
                          <div style={{ fontFamily: `'${previewFont.primary}', sans-serif`, fontSize: '3.5rem', lineHeight: '1.2' }}>
                            H1
                          </div>
                          <div style={{ fontFamily: `'${previewFont.primary}', sans-serif`, fontSize: '2.5rem', lineHeight: '1.3' }}>
                            H2
                          </div>
                          <div style={{ fontFamily: `'${previewFont.primary}', sans-serif`, fontSize: '2rem', lineHeight: '1.4' }}>
                            H3
                          </div>
                          <div style={{ fontFamily: `'${previewFont.secondary}', sans-serif`, fontSize: '1rem', lineHeight: '1.6' }}>
                            Body Text
                          </div>
                        </div>
                      </div>

                      {/* Tablet */}
                      <div>
                        <h4 className="text-sm font-medium mb-3 text-gray-600">Tablet</h4>
                        <div className="space-y-2">
                          <div style={{ fontFamily: `'${previewFont.primary}', sans-serif`, fontSize: '2.5rem', lineHeight: '1.2' }}>
                            H1
                          </div>
                          <div style={{ fontFamily: `'${previewFont.primary}', sans-serif`, fontSize: '2rem', lineHeight: '1.3' }}>
                            H2
                          </div>
                          <div style={{ fontFamily: `'${previewFont.primary}', sans-serif`, fontSize: '1.75rem', lineHeight: '1.4' }}>
                            H3
                          </div>
                          <div style={{ fontFamily: `'${previewFont.secondary}', sans-serif`, fontSize: '0.875rem', lineHeight: '1.6' }}>
                            Body Text
                          </div>
                        </div>
                      </div>

                      {/* Mobile */}
                      <div>
                        <h4 className="text-sm font-medium mb-3 text-gray-600">Mobile</h4>
                        <div className="space-y-2">
                          <div style={{ fontFamily: `'${previewFont.primary}', sans-serif`, fontSize: '2rem', lineHeight: '1.2' }}>
                            H1
                          </div>
                          <div style={{ fontFamily: `'${previewFont.primary}', sans-serif`, fontSize: '1.75rem', lineHeight: '1.3' }}>
                            H2
                          </div>
                          <div style={{ fontFamily: `'${previewFont.primary}', sans-serif`, fontSize: '1.5rem', lineHeight: '1.4' }}>
                            H3
                          </div>
                          <div style={{ fontFamily: `'${previewFont.secondary}', sans-serif`, fontSize: '0.875rem', lineHeight: '1.6' }}>
                            Body Text
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Especificações técnicas */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Especificações Técnicas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium mb-2">Google Fonts</h5>
                        <div className="text-sm text-gray-600 space-y-1">
                          {previewFont.googleFonts.map((font, index) => (
                            <div key={index} className="font-mono bg-gray-100 p-2 rounded">
                              {font}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h5 className="font-medium mb-2">CSS Classes</h5>
                        <div className="text-sm text-gray-600 space-y-1">
                          <div className="font-mono bg-gray-100 p-2 rounded">font-primary</div>
                          <div className="font-mono bg-gray-100 p-2 rounded">font-secondary</div>
                          <div className="font-mono bg-gray-100 p-2 rounded">h1, h2, h3, h4, h5, h6</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Settings className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p>Selecione uma combinação de fontes para visualizar o preview</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TypographySelector;
