
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TailwindShades } from '@/lib/colorUtils';
import { FontCombination } from '@/lib/typographyUtils';
import { Star, Play, Calendar, MapPin, Clock, Award, Users, Target, Zap, ChevronRight, Quote, CheckCircle } from 'lucide-react';

interface ElementorWidgetsProps {
  shades: TailwindShades | null;
  colorScheme: string[];
  selectedFont: FontCombination | null;
}

const ElementorWidgets = ({ shades, colorScheme, selectedFont }: ElementorWidgetsProps) => {
  if (!shades) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 dark:text-gray-400">Gere uma paleta primeiro para visualizar os widgets</p>
      </div>
    );
  }

  const getFontStyle = (isPrimary: boolean = true) => ({
    fontFamily: selectedFont ? `'${isPrimary ? selectedFont.primary : selectedFont.secondary}', sans-serif` : 'inherit'
  });

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Elementor Pro Widgets
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Visualize como seus widgets ficarão com sua paleta personalizada
        </p>
      </div>

      <div className="grid gap-8">
        {/* Hero Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Hero Section
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div 
              className="p-12 rounded-lg relative overflow-hidden"
              style={{ backgroundColor: shades[200] }}
            >
              <div className="relative z-10">
                <h1 
                  className="text-4xl font-bold mb-4" 
                  style={{ color: shades[950], ...getFontStyle(true) }}
                >
                  Transforme Sua Visão em Realidade
                </h1>
                <p 
                  className="text-xl mb-6" 
                  style={{ color: shades[700], ...getFontStyle(false) }}
                >
                  Criamos experiências digitais incríveis que conectam sua marca ao seu público
                </p>
                <div className="flex gap-4">
                  <Button 
                    className="px-8 py-3 rounded-lg font-semibold"
                    style={{ backgroundColor: shades[600], color: shades[50] }}
                  >
                    Começar Agora
                  </Button>
                  <Button 
                    variant="outline"
                    className="px-8 py-3 rounded-lg font-semibold border-2"
                    style={{ borderColor: shades[600], color: shades[600] }}
                  >
                    Saiba Mais
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Testimonials Carousel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Quote className="w-5 h-5" />
              Carousel de Depoimentos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div 
              className="p-8 rounded-lg relative"
              style={{ backgroundColor: shades[200] }}
            >
              <div className="text-center">
                <Quote className="w-12 h-12 mx-auto mb-4" style={{ color: shades[500] }} />
                <p 
                  className="text-lg italic mb-6" 
                  style={{ color: shades[800], ...getFontStyle(false) }}
                >
                  "O trabalho da equipe superou todas as nossas expectativas. A atenção aos detalhes e a qualidade do design são excepcionais."
                </p>
                <div className="flex items-center justify-center gap-4">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                    style={{ backgroundColor: shades[500] }}
                  >
                    MR
                  </div>
                  <div className="text-left">
                    <p className="font-semibold" style={{ color: shades[950] }}>
                      Maria Rodriguez
                    </p>
                    <p className="text-sm" style={{ color: shades[600] }}>
                      CEO, TechCorp
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Services Grid */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Grade de Serviços
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Target, title: "Design Strategy", desc: "Criamos estratégias visuais que impactam" },
                { icon: Zap, title: "Desenvolvimento", desc: "Código limpo e performance otimizada" },
                { icon: Award, title: "Consultoria", desc: "Orientação especializada para seu projeto" }
              ].map((service, index) => (
                <div 
                  key={index}
                  className="p-6 rounded-lg text-center hover:shadow-lg transition-shadow"
                  style={{ backgroundColor: shades[200] }}
                >
                  <service.icon 
                    className="w-12 h-12 mx-auto mb-4" 
                    style={{ color: shades[600] }} 
                  />
                  <h3 
                    className="text-lg font-semibold mb-2"
                    style={{ color: shades[950], ...getFontStyle(true) }}
                  >
                    {service.title}
                  </h3>
                  <p 
                    className="text-sm"
                    style={{ color: shades[700], ...getFontStyle(false) }}
                  >
                    {service.desc}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pricing Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              Tabela de Preços
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: "Básico", price: "R$ 99", features: ["5 Páginas", "Design Responsivo", "Suporte Email"] },
                { name: "Pro", price: "R$ 199", features: ["10 Páginas", "SEO Otimizado", "Suporte Prioritário", "Analytics"], popular: true },
                { name: "Enterprise", price: "R$ 399", features: ["Páginas Ilimitadas", "Desenvolvimento Custom", "Suporte 24/7", "Treinamento"] }
              ].map((plan, index) => (
                <div 
                  key={index}
                  className={`p-6 rounded-lg border-2 relative ${plan.popular ? 'border-opacity-100' : 'border-opacity-20'}`}
                  style={{ 
                    backgroundColor: shades[200],
                    borderColor: plan.popular ? shades[500] : shades[300]
                  }}
                >
                  {plan.popular && (
                    <Badge 
                      className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-3 py-1"
                      style={{ backgroundColor: shades[500], color: shades[50] }}
                    >
                      Mais Popular
                    </Badge>
                  )}
                  <div className="text-center">
                    <h3 
                      className="text-xl font-bold mb-2"
                      style={{ color: shades[950], ...getFontStyle(true) }}
                    >
                      {plan.name}
                    </h3>
                    <p 
                      className="text-3xl font-bold mb-4"
                      style={{ color: shades[600] }}
                    >
                      {plan.price}
                    </p>
                    <ul className="space-y-2 mb-6">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4" style={{ color: shades[600] }} />
                          <span style={{ color: shades[800], ...getFontStyle(false) }}>
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      className="w-full py-2 rounded-lg font-semibold"
                      style={{ 
                        backgroundColor: plan.popular ? shades[600] : 'transparent',
                        color: plan.popular ? shades[50] : shades[600],
                        border: plan.popular ? 'none' : `2px solid ${shades[600]}`
                      }}
                    >
                      Escolher Plano
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Team Members */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Equipe
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { name: "Ana Silva", role: "Design Lead", initials: "AS" },
                { name: "João Santos", role: "Developer", initials: "JS" },
                { name: "Maria Costa", role: "Project Manager", initials: "MC" },
                { name: "Pedro Lima", role: "UX Designer", initials: "PL" }
              ].map((member, index) => (
                <div 
                  key={index}
                  className="text-center p-6 rounded-lg"
                  style={{ backgroundColor: shades[200] }}
                >
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4"
                    style={{ backgroundColor: shades[500] }}
                  >
                    {member.initials}
                  </div>
                  <h3 
                    className="font-semibold mb-1"
                    style={{ color: shades[950], ...getFontStyle(true) }}
                  >
                    {member.name}
                  </h3>
                  <p 
                    className="text-sm"
                    style={{ color: shades[600], ...getFontStyle(false) }}
                  >
                    {member.role}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Call to Action
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div 
              className="p-12 rounded-lg text-center"
              style={{ backgroundColor: shades[200] }}
            >
              <h2 
                className="text-3xl font-bold mb-4"
                style={{ color: shades[950], ...getFontStyle(true) }}
              >
                Pronto para Começar?
              </h2>
              <p 
                className="text-lg mb-8"
                style={{ color: shades[700], ...getFontStyle(false) }}
              >
                Entre em contato conosco e transforme sua ideia em realidade
              </p>
              <div className="flex justify-center gap-4">
                <Button 
                  className="px-8 py-3 rounded-lg font-semibold flex items-center gap-2"
                  style={{ backgroundColor: shades[600], color: shades[50] }}
                >
                  Falar Conosco
                  <ChevronRight className="w-4 h-4" />
                </Button>
                <Button 
                  variant="outline"
                  className="px-8 py-3 rounded-lg font-semibold border-2"
                  style={{ borderColor: shades[600], color: shades[600] }}
                >
                  Ver Portfolio
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ElementorWidgets;
