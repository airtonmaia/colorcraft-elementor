
import { TailwindShades } from '@/lib/colorUtils';
import { FontCombination } from '@/lib/typographyUtils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Star, 
  Check, 
  ChevronDown, 
  Quote,
  Shield,
  Zap,
  Heart,
  ArrowRight,
  Play,
  Award,
  Users,
  Calendar,
  MapPin
} from 'lucide-react';

interface ElementorWidgetsProps {
  shades: TailwindShades | null;
  colorScheme: string[];
  selectedFont?: FontCombination | null;
}

const ElementorWidgets = ({ shades, colorScheme, selectedFont }: ElementorWidgetsProps) => {
  if (!shades) {
    return (
      <Card className="bg-gray-50 border-dashed border-2 border-gray-300">
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Play className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-600">Gere uma paleta para visualizar os widgets</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const primaryColor = shades[500];
  const secondaryColor = colorScheme[1] || shades[700];
  const accentColor = shades[200];
  const darkColor = shades[800];

  const getFontStyles = (type: 'primary' | 'secondary' = 'primary') => {
    if (!selectedFont) return {};
    return {
      fontFamily: type === 'primary' 
        ? `'${selectedFont.primary}', sans-serif` 
        : `'${selectedFont.secondary}', sans-serif`
    };
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">Widgets Elementor Pro</h3>
          {selectedFont && (
            <p className="text-sm text-gray-600 mt-1">
              Usando: <span className="font-medium">{selectedFont.name}</span>
            </p>
          )}
        </div>
        <Badge variant="secondary">Pro Widgets</Badge>
      </div>

      <div className="grid gap-6">
        {/* Advanced Accordion */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <ChevronDown className="w-4 h-4" />
              Advanced Accordion
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div 
                className="border rounded-lg overflow-hidden"
                style={{ borderColor: primaryColor }}
              >
                <div 
                  className="p-4 flex items-center justify-between cursor-pointer"
                  style={{ backgroundColor: accentColor }}
                >
                  <h4 
                    className="font-semibold"
                    style={{ color: primaryColor, ...getFontStyles('primary') }}
                  >
                    Como funciona o processo de design?
                  </h4>
                  <ChevronDown className="w-5 h-5" style={{ color: primaryColor }} />
                </div>
                <div className="p-4 bg-white">
                  <p 
                    className="text-gray-700"
                    style={getFontStyles('secondary')}
                  >
                    Nosso processo é dividido em etapas claras: descoberta, wireframes, design visual e entrega final.
                  </p>
                </div>
              </div>
              
              <div className="border rounded-lg" style={{ borderColor: shades[300] }}>
                <div className="p-4 flex items-center justify-between cursor-pointer bg-white">
                  <h4 
                    className="font-semibold text-gray-800"
                    style={getFontStyles('primary')}
                  >
                    Qual é o prazo de entrega?
                  </h4>
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                </div>
              </div>
              
              <div className="border rounded-lg" style={{ borderColor: shades[300] }}>
                <div className="p-4 flex items-center justify-between cursor-pointer bg-white">
                  <h4 
                    className="font-semibold text-gray-800"
                    style={getFontStyles('primary')}
                  >
                    Oferecem suporte pós-entrega?
                  </h4>
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Price Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <Award className="w-4 h-4" />
              Price Table
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {/* Plano Básico */}
              <div className="border rounded-lg p-6 bg-white">
                <div className="text-center">
                  <h3 
                    className="text-lg font-semibold mb-2"
                    style={getFontStyles('primary')}
                  >
                    Básico
                  </h3>
                  <div className="mb-4">
                    <span 
                      className="text-3xl font-bold"
                      style={{ color: primaryColor, ...getFontStyles('primary') }}
                    >
                      R$99
                    </span>
                    <span 
                      className="text-gray-600"
                      style={getFontStyles('secondary')}
                    >
                      /mês
                    </span>
                  </div>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4" style={{ color: primaryColor }} />
                      <span 
                        className="text-sm"
                        style={getFontStyles('secondary')}
                      >
                        5 projetos
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4" style={{ color: primaryColor }} />
                      <span 
                        className="text-sm"
                        style={getFontStyles('secondary')}
                      >
                        Suporte por email
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4" style={{ color: primaryColor }} />
                      <span 
                        className="text-sm"
                        style={getFontStyles('secondary')}
                      >
                        Templates básicos
                      </span>
                    </li>
                  </ul>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    style={{ 
                      borderColor: primaryColor, 
                      color: primaryColor,
                      ...getFontStyles('secondary')
                    }}
                  >
                    Escolher Plano
                  </Button>
                </div>
              </div>

              {/* Plano Pro - Destacado */}
              <div 
                className="border-2 rounded-lg p-6 relative"
                style={{ 
                  borderColor: primaryColor,
                  backgroundColor: accentColor
                }}
              >
                <div 
                  className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full text-xs font-semibold text-white"
                  style={{ backgroundColor: primaryColor }}
                >
                  POPULAR
                </div>
                <div className="text-center">
                  <h3 
                    className="text-lg font-semibold mb-2"
                    style={getFontStyles('primary')}
                  >
                    Profissional
                  </h3>
                  <div className="mb-4">
                    <span 
                      className="text-3xl font-bold"
                      style={{ color: primaryColor, ...getFontStyles('primary') }}
                    >
                      R$199
                    </span>
                    <span 
                      className="text-gray-600"
                      style={getFontStyles('secondary')}
                    >
                      /mês
                    </span>
                  </div>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4" style={{ color: primaryColor }} />
                      <span 
                        className="text-sm"
                        style={getFontStyles('secondary')}
                      >
                        20 projetos
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4" style={{ color: primaryColor }} />
                      <span 
                        className="text-sm"
                        style={getFontStyles('secondary')}
                      >
                        Suporte prioritário
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4" style={{ color: primaryColor }} />
                      <span 
                        className="text-sm"
                        style={getFontStyles('secondary')}
                      >
                        Todos os templates
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4" style={{ color: primaryColor }} />
                      <span 
                        className="text-sm"
                        style={getFontStyles('secondary')}
                      >
                        Widgets Pro
                      </span>
                    </li>
                  </ul>
                  <Button 
                    className="w-full text-white"
                    style={{ 
                      backgroundColor: primaryColor,
                      ...getFontStyles('secondary')
                    }}
                  >
                    Escolher Plano
                  </Button>
                </div>
              </div>

              {/* Plano Enterprise */}
              <div className="border rounded-lg p-6 bg-white">
                <div className="text-center">
                  <h3 
                    className="text-lg font-semibold mb-2"
                    style={getFontStyles('primary')}
                  >
                    Enterprise
                  </h3>
                  <div className="mb-4">
                    <span 
                      className="text-3xl font-bold"
                      style={{ color: primaryColor, ...getFontStyles('primary') }}
                    >
                      R$399
                    </span>
                    <span 
                      className="text-gray-600"
                      style={getFontStyles('secondary')}
                    >
                      /mês
                    </span>
                  </div>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4" style={{ color: primaryColor }} />
                      <span 
                        className="text-sm"
                        style={getFontStyles('secondary')}
                      >
                        Projetos ilimitados
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4" style={{ color: primaryColor }} />
                      <span 
                        className="text-sm"
                        style={getFontStyles('secondary')}
                      >
                        Suporte 24/7
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4" style={{ color: primaryColor }} />
                      <span 
                        className="text-sm"
                        style={getFontStyles('secondary')}
                      >
                        White label
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4" style={{ color: primaryColor }} />
                      <span 
                        className="text-sm"
                        style={getFontStyles('secondary')}
                      >
                        API access
                      </span>
                    </li>
                  </ul>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    style={{ 
                      borderColor: primaryColor, 
                      color: primaryColor,
                      ...getFontStyles('secondary')
                    }}
                  >
                    Contatar Vendas
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Testimonial Carousel */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <Quote className="w-4 h-4" />
              Testimonial Carousel
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <div 
                className="p-8 rounded-lg text-center"
                style={{ backgroundColor: accentColor }}
              >
                <Quote 
                  className="w-12 h-12 mx-auto mb-4 opacity-50"
                  style={{ color: primaryColor }}
                />
                <blockquote 
                  className="text-lg mb-6 italic"
                  style={{ color: darkColor, ...getFontStyles('secondary') }}
                >
                  "O trabalho da equipe superou todas as nossas expectativas. A atenção aos detalhes e a qualidade do design são excepcionais."
                </blockquote>
                <div className="flex items-center justify-center gap-4">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold"
                    style={{ backgroundColor: primaryColor }}
                  >
                    MR
                  </div>
                  <div>
                    <h4 
                      className="font-semibold"
                      style={{ color: darkColor, ...getFontStyles('primary') }}
                    >
                      Maria Rodriguez
                    </h4>
                    <p 
                      className="text-sm text-gray-600"
                      style={getFontStyles('secondary')}
                    >
                      CEO, TechCorp
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Indicadores */}
              <div className="flex justify-center gap-2 mt-4">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: primaryColor }}
                />
                <div className="w-3 h-3 rounded-full bg-gray-300" />
                <div className="w-3 h-3 rounded-full bg-gray-300" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Posts Grid */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Posts Grid
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Post 1 */}
              <div className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow">
                <div 
                  className="h-40 flex items-center justify-center"
                  style={{ backgroundColor: accentColor }}
                >
                  <Calendar className="w-8 h-8" style={{ color: primaryColor }} />
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge 
                      variant="secondary"
                      style={{ backgroundColor: primaryColor, color: 'white' }}
                    >
                      Design
                    </Badge>
                    <span 
                      className="text-xs text-gray-500"
                      style={getFontStyles('secondary')}
                    >
                      15 Jan 2024
                    </span>
                  </div>
                  <h3 
                    className="font-semibold mb-2 line-clamp-2"
                    style={{ color: darkColor, ...getFontStyles('primary') }}
                  >
                    Como criar paletas de cores profissionais
                  </h3>
                  <p 
                    className="text-sm text-gray-600 mb-3 line-clamp-3"
                    style={getFontStyles('secondary')}
                  >
                    Descubra as técnicas e ferramentas usadas por designers profissionais para criar paletas harmoniosas.
                  </p>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="p-0 h-auto"
                    style={{ color: primaryColor, ...getFontStyles('secondary') }}
                  >
                    Ler mais <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>

              {/* Post 2 */}
              <div className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow">
                <div 
                  className="h-40 flex items-center justify-center"
                  style={{ backgroundColor: accentColor }}
                >
                  <Zap className="w-8 h-8" style={{ color: primaryColor }} />
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge 
                      variant="secondary"
                      style={{ backgroundColor: secondaryColor, color: 'white' }}
                    >
                      Tutorial
                    </Badge>
                    <span 
                      className="text-xs text-gray-500"
                      style={getFontStyles('secondary')}
                    >
                      12 Jan 2024
                    </span>
                  </div>
                  <h3 
                    className="font-semibold mb-2 line-clamp-2"
                    style={{ color: darkColor, ...getFontStyles('primary') }}
                  >
                    Elementor Pro: Widgets avançados
                  </h3>
                  <p 
                    className="text-sm text-gray-600 mb-3 line-clamp-3"
                    style={getFontStyles('secondary')}
                  >
                    Explore os widgets mais poderosos do Elementor Pro e como usá-los em seus projetos.
                  </p>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="p-0 h-auto"
                    style={{ color: primaryColor, ...getFontStyles('secondary') }}
                  >
                    Ler mais <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>

              {/* Post 3 */}
              <div className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow">
                <div 
                  className="h-40 flex items-center justify-center"
                  style={{ backgroundColor: accentColor }}
                >
                  <Users className="w-8 h-8" style={{ color: primaryColor }} />
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge 
                      variant="secondary"
                      style={{ backgroundColor: primaryColor, color: 'white' }}
                    >
                      Tendências
                    </Badge>
                    <span 
                      className="text-xs text-gray-500"
                      style={getFontStyles('secondary')}
                    >
                      10 Jan 2024
                    </span>
                  </div>
                  <h3 
                    className="font-semibold mb-2 line-clamp-2"
                    style={{ color: darkColor, ...getFontStyles('primary') }}
                  >
                    Tendências de UI/UX para 2024
                  </h3>
                  <p 
                    className="text-sm text-gray-600 mb-3 line-clamp-3"
                    style={getFontStyles('secondary')}
                  >
                    Conheça as principais tendências que irão dominar o design digital neste ano.
                  </p>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="p-0 h-auto"
                    style={{ color: primaryColor, ...getFontStyles('secondary') }}
                  >
                    Ler mais <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Team Members */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <Users className="w-4 h-4" />
              Team Members
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              {[
                { name: 'Ana Silva', role: 'Designer', initial: 'AS' },
                { name: 'João Santos', role: 'Developer', initial: 'JS' },
                { name: 'Maria Costa', role: 'Project Manager', initial: 'MC' },
                { name: 'Pedro Lima', role: 'UX Designer', initial: 'PL' }
              ].map((member, index) => (
                <div key={index} className="text-center">
                  <div 
                    className="w-20 h-20 rounded-full flex items-center justify-center text-white font-semibold text-xl mx-auto mb-3"
                    style={{ backgroundColor: index % 2 === 0 ? primaryColor : secondaryColor }}
                  >
                    {member.initial}
                  </div>
                  <h4 
                    className="font-semibold mb-1"
                    style={{ color: darkColor, ...getFontStyles('primary') }}
                  >
                    {member.name}
                  </h4>
                  <p 
                    className="text-sm text-gray-600"
                    style={getFontStyles('secondary')}
                  >
                    {member.role}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ElementorWidgets;
