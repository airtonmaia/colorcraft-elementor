
import { TailwindShades } from '@/lib/colorUtils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Play, Heart, ArrowRight } from 'lucide-react';

interface ElementorPreviewProps {
  shades: TailwindShades | null;
  colorScheme: string[];
}

const ElementorPreview = ({ shades, colorScheme }: ElementorPreviewProps) => {
  if (!shades) {
    return (
      <Card className="bg-gray-50 border-dashed border-2 border-gray-300">
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Play className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-600">Gere uma paleta para visualizar os templates</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const primaryColor = shades[500];
  const secondaryColor = colorScheme[1] || shades[700];
  const accentColor = shades[200];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-800">Preview Templates Elementor</h3>
        <Badge variant="secondary">20+ Templates</Badge>
      </div>

      <div className="grid gap-6">
        {/* Hero Section */}
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle className="text-sm">Hero Section</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div 
              className="p-8 text-white relative"
              style={{ 
                backgroundColor: primaryColor,
                background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`
              }}
            >
              <div className="relative z-10">
                <h1 className="text-4xl font-bold mb-4">Desbloqueie todos os mais de 20 exemplos de IU</h1>
                <p className="text-xl mb-6 opacity-90">
                  Crie e combine até 3 escalas de cores personalizadas e visualize-as instantaneamente
                </p>
                <div className="flex gap-4">
                  <Button 
                    className="text-white border-white border-2 hover:bg-white hover:text-black"
                    style={{ backgroundColor: 'transparent' }}
                  >
                    Entre para continuar
                  </Button>
                  <Button 
                    variant="outline" 
                    className="text-white border-white border-2 hover:bg-white hover:text-black"
                    style={{ backgroundColor: 'transparent' }}
                  >
                    Saiba mais
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cards de Serviço */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Cards de Serviço</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div 
                    className="w-12 h-12 rounded-lg mb-4 flex items-center justify-center"
                    style={{ backgroundColor: accentColor }}
                  >
                    <Heart className="w-6 h-6" style={{ color: primaryColor }} />
                  </div>
                  <h3 className="font-semibold mb-2">Acompanhe suas despesas</h3>
                  <p className="text-gray-600 text-sm">Monitore seus gastos com facilidade</p>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div 
                    className="w-12 h-12 rounded-lg mb-4 flex items-center justify-center"
                    style={{ backgroundColor: accentColor }}
                  >
                    <Star className="w-6 h-6" style={{ color: primaryColor }} />
                  </div>
                  <h3 className="font-semibold mb-2">Ganhe controle</h3>
                  <p className="text-gray-600 text-sm">Tenha total controle sobre suas finanças</p>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div 
                    className="w-12 h-12 rounded-lg mb-4 flex items-center justify-center"
                    style={{ backgroundColor: accentColor }}
                  >
                    <Play className="w-6 h-6" style={{ color: primaryColor }} />
                  </div>
                  <h3 className="font-semibold mb-2">Automatize tarefas</h3>
                  <p className="text-gray-600 text-sm">Configure processos automáticos</p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Botões */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Botões</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Button 
                style={{ backgroundColor: primaryColor }}
                className="hover:opacity-90"
              >
                Botão Primário
              </Button>
              <Button 
                variant="outline" 
                style={{ borderColor: primaryColor, color: primaryColor }}
                className="hover:bg-gray-50"
              >
                Botão Secundário
              </Button>
              <Button 
                style={{ backgroundColor: secondaryColor }}
                className="hover:opacity-90"
              >
                Botão Alternativo
              </Button>
              <Button 
                variant="ghost" 
                style={{ color: primaryColor }}
                className="hover:bg-gray-50"
              >
                Botão Fantasma
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Footer</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div 
              className="p-8 text-white"
              style={{ 
                backgroundColor: shades[800],
                background: `linear-gradient(135deg, ${shades[800]} 0%, ${shades[900]} 100%)`
              }}
            >
              <div className="grid md:grid-cols-4 gap-8">
                <div>
                  <h4 className="font-semibold mb-4">Produto</h4>
                  <ul className="space-y-2 text-sm opacity-90">
                    <li>Recursos</li>
                    <li>Preços</li>
                    <li>Documentação</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-4">Empresa</h4>
                  <ul className="space-y-2 text-sm opacity-90">
                    <li>Sobre</li>
                    <li>Blog</li>
                    <li>Carreiras</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-4">Suporte</h4>
                  <ul className="space-y-2 text-sm opacity-90">
                    <li>Ajuda</li>
                    <li>Contato</li>
                    <li>Status</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-4">Legal</h4>
                  <ul className="space-y-2 text-sm opacity-90">
                    <li>Privacidade</li>
                    <li>Termos</li>
                    <li>Cookies</li>
                  </ul>
                </div>
              </div>
              <div className="border-t border-white border-opacity-20 mt-8 pt-8 text-center text-sm opacity-75">
                © 2024 Palette Generator. Todos os direitos reservados.
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ElementorPreview;
