
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TailwindShades } from '@/lib/colorUtils';
import { FontCombination } from '@/lib/typographyUtils';
import { 
  Play, 
  Star, 
  ArrowRight, 
  CheckCircle, 
  Users, 
  Zap, 
  Shield,
  MessageSquare,
  Heart,
  Globe,
  Download,
  Palette
} from 'lucide-react';

interface RelumeDemoProps {
  shades: TailwindShades | null;
  colorScheme: string[];
  selectedFont?: FontCombination | null;
}

const RelumeDemo = ({ shades, colorScheme, selectedFont }: RelumeDemoProps) => {
  const [activeTab, setActiveTab] = useState('home');

  if (!shades) {
    return (
      <Card className="bg-gray-50 border-dashed border-2 border-gray-300">
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Palette className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-600">Gere uma paleta para visualizar o layout Relume</p>
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
    <div className="space-y-0 bg-white rounded-lg overflow-hidden border border-gray-200">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div 
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold"
              style={{ backgroundColor: primaryColor }}
            >
              R
            </div>
            <span 
              className="text-xl font-bold text-gray-800"
              style={getFontStyles('primary')}
            >
              Relume
            </span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a href="#" className="text-gray-600 hover:text-gray-900" style={getFontStyles('secondary')}>Home</a>
            <a href="#" className="text-gray-600 hover:text-gray-900" style={getFontStyles('secondary')}>About</a>
            <a href="#" className="text-gray-600 hover:text-gray-900" style={getFontStyles('secondary')}>Services</a>
            <a href="#" className="text-gray-600 hover:text-gray-900" style={getFontStyles('secondary')}>Contact</a>
          </div>
          <Button 
            style={{ backgroundColor: primaryColor, ...getFontStyles('secondary') }}
            className="text-white hover:opacity-90"
          >
            Get Started
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <Badge 
            className="mb-4"
            style={{ 
              backgroundColor: accentColor, 
              color: primaryColor,
              ...getFontStyles('secondary')
            }}
          >
            ✨ Novo: AI-Powered Design
          </Badge>
          <h1 
            className="text-4xl md:text-6xl font-bold mb-6 text-gray-900"
            style={getFontStyles('primary')}
          >
            Crie designs
            <span style={{ color: primaryColor }}> incríveis</span>
            <br />
            em minutos
          </h1>
          <p 
            className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
            style={getFontStyles('secondary')}
          >
            Transforme suas ideias em realidade com nossa plataforma de design intuitiva. 
            Perfeita para designers, desenvolvedores e criadores.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              style={{ backgroundColor: primaryColor, ...getFontStyles('secondary') }}
              className="text-white hover:opacity-90"
            >
              <Play className="w-5 h-5 mr-2" />
              Começar Agora
            </Button>
            <Button 
              size="lg"
              variant="outline"
              style={{ borderColor: primaryColor, color: primaryColor, ...getFontStyles('secondary') }}
              className="hover:bg-gray-50"
            >
              Ver Demo
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 
              className="text-3xl md:text-4xl font-bold mb-4 text-gray-900"
              style={getFontStyles('primary')}
            >
              Funcionalidades Poderosas
            </h2>
            <p 
              className="text-lg text-gray-600 max-w-2xl mx-auto"
              style={getFontStyles('secondary')}
            >
              Tudo que você precisa para criar designs profissionais de forma rápida e eficiente.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "Super Rápido",
                description: "Crie designs em segundos com nossa IA avançada"
              },
              {
                icon: Shield,
                title: "Seguro & Confiável",
                description: "Seus dados estão protegidos com criptografia de ponta"
              },
              {
                icon: Users,
                title: "Colaboração em Equipe",
                description: "Trabalhe em conjunto com sua equipe em tempo real"
              }
            ].map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div 
                    className="w-12 h-12 rounded-lg mb-4 flex items-center justify-center"
                    style={{ backgroundColor: accentColor }}
                  >
                    <feature.icon className="w-6 h-6" style={{ color: primaryColor }} />
                  </div>
                  <h3 
                    className="text-xl font-semibold mb-2 text-gray-900"
                    style={getFontStyles('primary')}
                  >
                    {feature.title}
                  </h3>
                  <p 
                    className="text-gray-600"
                    style={getFontStyles('secondary')}
                  >
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section 
        className="px-6 py-16 text-white"
        style={{ 
          backgroundColor: primaryColor,
          background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`
        }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: "50K+", label: "Usuários Ativos" },
              { number: "1M+", label: "Designs Criados" },
              { number: "99.9%", label: "Uptime" },
              { number: "24/7", label: "Suporte" }
            ].map((stat, index) => (
              <div key={index}>
                <div 
                  className="text-3xl md:text-4xl font-bold mb-2"
                  style={getFontStyles('primary')}
                >
                  {stat.number}
                </div>
                <div 
                  className="text-white/90"
                  style={getFontStyles('secondary')}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 
              className="text-3xl md:text-4xl font-bold mb-4 text-gray-900"
              style={getFontStyles('primary')}
            >
              O que nossos clientes dizem
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Maria Silva",
                role: "Designer UX",
                content: "Revolucionou meu fluxo de trabalho. Consigo criar protótipos incríveis em minutos!",
                rating: 5
              },
              {
                name: "João Santos",
                role: "Desenvolvedor",
                content: "A melhor ferramenta para criar interfaces. Recomendo para toda equipe.",
                rating: 5
              },
              {
                name: "Ana Costa",
                role: "Product Manager",
                content: "Economizamos horas de trabalho e o resultado é sempre profissional.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <Card key={index} className="bg-white border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p 
                    className="text-gray-600 mb-4"
                    style={getFontStyles('secondary')}
                  >
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold mr-3"
                      style={{ backgroundColor: primaryColor }}
                    >
                      {testimonial.name[0]}
                    </div>
                    <div>
                      <div 
                        className="font-semibold text-gray-900"
                        style={getFontStyles('primary')}
                      >
                        {testimonial.name}
                      </div>
                      <div 
                        className="text-sm text-gray-500"
                        style={getFontStyles('secondary')}
                      >
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-16 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 
            className="text-3xl md:text-4xl font-bold mb-4 text-gray-900"
            style={getFontStyles('primary')}
          >
            Pronto para começar?
          </h2>
          <p 
            className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto"
            style={getFontStyles('secondary')}
          >
            Junte-se a milhares de profissionais que já transformaram seu trabalho com nossa plataforma.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              style={{ backgroundColor: primaryColor, ...getFontStyles('secondary') }}
              className="text-white hover:opacity-90"
            >
              <Download className="w-5 h-5 mr-2" />
              Começar Grátis
            </Button>
            <Button 
              size="lg"
              variant="outline"
              style={{ borderColor: primaryColor, color: primaryColor, ...getFontStyles('secondary') }}
              className="hover:bg-gray-50"
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              Falar com Vendas
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer 
        className="px-6 py-12 text-white"
        style={{ 
          backgroundColor: darkColor,
          background: `linear-gradient(135deg, ${darkColor} 0%, ${shades[900]} 100%)`
        }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div 
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold"
                  style={{ backgroundColor: primaryColor }}
                >
                  R
                </div>
                <span 
                  className="text-xl font-bold"
                  style={getFontStyles('primary')}
                >
                  Relume
                </span>
              </div>
              <p 
                className="text-white/80 mb-4"
                style={getFontStyles('secondary')}
              >
                Criando o futuro do design digital com tecnologia de ponta.
              </p>
              <div className="flex gap-4">
                <Globe className="w-5 h-5 text-white/60 hover:text-white cursor-pointer" />
                <Heart className="w-5 h-5 text-white/60 hover:text-white cursor-pointer" />
                <MessageSquare className="w-5 h-5 text-white/60 hover:text-white cursor-pointer" />
              </div>
            </div>

            {[
              {
                title: "Produto",
                links: ["Recursos", "Preços", "Integrações", "API"]
              },
              {
                title: "Empresa",
                links: ["Sobre", "Blog", "Carreiras", "Contato"]
              },
              {
                title: "Suporte",
                links: ["Ajuda", "Documentação", "Status", "Comunidade"]
              }
            ].map((section, index) => (
              <div key={index}>
                <h4 
                  className="font-semibold mb-4"
                  style={getFontStyles('primary')}
                >
                  {section.title}
                </h4>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a 
                        href="#" 
                        className="text-white/80 hover:text-white transition-colors"
                        style={getFontStyles('secondary')}
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div 
            className="border-t border-white/20 pt-8 text-center text-white/60"
            style={getFontStyles('secondary')}
          >
            © 2024 Relume Demo. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RelumeDemo;
