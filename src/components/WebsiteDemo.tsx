
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TailwindShades } from '@/lib/colorUtils';
import { FontCombination } from '@/lib/typographyUtils';
import { Globe, Star, Play, Calendar, MapPin, Clock, Award, Users, Target, Zap, ChevronRight, Quote, Menu, Search, ShoppingCart, Heart, Share2 } from 'lucide-react';

interface WebsiteDemoProps {
  shades: TailwindShades | null;
  colorScheme: string[];
  selectedFont: FontCombination | null;
}

const WebsiteDemo = ({ shades, colorScheme, selectedFont }: WebsiteDemoProps) => {
  if (!shades) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 dark:text-gray-400">Gere uma paleta primeiro para visualizar o website</p>
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
          Website Demo
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Visualize como um website completo ficaria com sua paleta
        </p>
      </div>

      {/* Website Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Website Completo
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="border rounded-lg overflow-hidden">
            {/* Header */}
            <header 
              className="p-4 border-b"
              style={{ backgroundColor: shades[50], borderColor: shades[200] }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold"
                    style={{ backgroundColor: shades[600] }}
                  >
                    L
                  </div>
                  <nav className="hidden md:flex items-center gap-6">
                    {['Home', 'Sobre', 'Serviços', 'Portfolio', 'Contato'].map((item) => (
                      <a 
                        key={item}
                        href="#"
                        className="text-sm font-medium hover:opacity-80"
                        style={{ color: shades[800], ...getFontStyle(false) }}
                      >
                        {item}
                      </a>
                    ))}
                  </nav>
                </div>
                <div className="flex items-center gap-2">
                  <Search className="w-5 h-5" style={{ color: shades[600] }} />
                  <ShoppingCart className="w-5 h-5" style={{ color: shades[600] }} />
                  <Menu className="w-5 h-5 md:hidden" style={{ color: shades[600] }} />
                </div>
              </div>
            </header>

            {/* Hero Section */}
            <section 
              className="p-12 text-center"
              style={{ backgroundColor: shades[100] }}
            >
              <h1 
                className="text-4xl font-bold mb-4"
                style={{ color: shades[950], ...getFontStyle(true) }}
              >
                Criamos Experiências Digitais Incríveis
              </h1>
              <p 
                className="text-xl mb-8 max-w-2xl mx-auto"
                style={{ color: shades[700], ...getFontStyle(false) }}
              >
                Transformamos suas ideias em realidade digital com design moderno e desenvolvimento de alta qualidade
              </p>
              <div className="flex justify-center gap-4">
                <Button 
                  className="px-8 py-3 rounded-lg font-semibold"
                  style={{ backgroundColor: shades[600], color: shades[50] }}
                >
                  Começar Projeto
                </Button>
                <Button 
                  variant="outline"
                  className="px-8 py-3 rounded-lg font-semibold border-2 flex items-center gap-2"
                  style={{ borderColor: shades[600], color: shades[600] }}
                >
                  <Play className="w-4 h-4" />
                  Ver Demo
                </Button>
              </div>
            </section>

            {/* Features Section */}
            <section className="p-12">
              <div className="text-center mb-12">
                <h2 
                  className="text-3xl font-bold mb-4"
                  style={{ color: shades[950], ...getFontStyle(true) }}
                >
                  Por que nos escolher?
                </h2>
                <p 
                  className="text-lg max-w-2xl mx-auto"
                  style={{ color: shades[700], ...getFontStyle(false) }}
                >
                  Oferecemos soluções completas para todas as suas necessidades digitais
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { icon: Target, title: "Design Estratégico", desc: "Criamos designs que geram resultados" },
                  { icon: Zap, title: "Performance", desc: "Sites rápidos e otimizados" },
                  { icon: Award, title: "Qualidade", desc: "Padrões internacionais de desenvolvimento" }
                ].map((feature, index) => (
                  <div key={index} className="text-center">
                    <div 
                      className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                      style={{ backgroundColor: shades[200] }}
                    >
                      <feature.icon 
                        className="w-8 h-8" 
                        style={{ color: shades[600] }} 
                      />
                    </div>
                    <h3 
                      className="text-xl font-semibold mb-2"
                      style={{ color: shades[950], ...getFontStyle(true) }}
                    >
                      {feature.title}
                    </h3>
                    <p 
                      style={{ color: shades[700], ...getFontStyle(false) }}
                    >
                      {feature.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Portfolio Section */}
            <section 
              className="p-12"
              style={{ backgroundColor: shades[50] }}
            >
              <div className="text-center mb-12">
                <h2 
                  className="text-3xl font-bold mb-4"
                  style={{ color: shades[950], ...getFontStyle(true) }}
                >
                  Nosso Portfolio
                </h2>
                <p 
                  className="text-lg"
                  style={{ color: shades[700], ...getFontStyle(false) }}
                >
                  Alguns dos nossos trabalhos mais recentes
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div 
                    key={item}
                    className="group relative overflow-hidden rounded-lg cursor-pointer"
                    style={{ backgroundColor: shades[200] }}
                  >
                    <div className="aspect-video p-8 flex items-center justify-center">
                      <div 
                        className="w-16 h-16 rounded-lg flex items-center justify-center text-white font-bold text-xl"
                        style={{ backgroundColor: shades[500] }}
                      >
                        {item}
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
                        <div 
                          className="w-10 h-10 rounded-full flex items-center justify-center text-white"
                          style={{ backgroundColor: shades[600] }}
                        >
                          <Heart className="w-5 h-5" />
                        </div>
                        <div 
                          className="w-10 h-10 rounded-full flex items-center justify-center text-white"
                          style={{ backgroundColor: shades[600] }}
                        >
                          <Share2 className="w-5 h-5" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Testimonials */}
            <section className="p-12">
              <div className="text-center mb-12">
                <h2 
                  className="text-3xl font-bold mb-4"
                  style={{ color: shades[950], ...getFontStyle(true) }}
                >
                  O que nossos clientes dizem
                </h2>
              </div>
              
              <div className="max-w-4xl mx-auto">
                <div 
                  className="p-8 rounded-lg text-center"
                  style={{ backgroundColor: shades[200] }}
                >
                  <Quote className="w-12 h-12 mx-auto mb-4" style={{ color: shades[500] }} />
                  <p 
                    className="text-xl italic mb-6"
                    style={{ color: shades[800], ...getFontStyle(false) }}
                  >
                    "Trabalhar com esta equipe foi uma experiência incrível. O resultado final superou todas as nossas expectativas e o atendimento foi excepcional do início ao fim."
                  </p>
                  <div className="flex items-center justify-center gap-4">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                      style={{ backgroundColor: shades[500] }}
                    >
                      CS
                    </div>
                    <div>
                      <p 
                        className="font-semibold"
                        style={{ color: shades[950], ...getFontStyle(true) }}
                      >
                        Carlos Silva
                      </p>
                      <p 
                        className="text-sm"
                        style={{ color: shades[600], ...getFontStyle(false) }}
                      >
                        CEO, InnovaTech
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Footer */}
            <footer 
              className="p-8 border-t"
              style={{ backgroundColor: shades[100], borderColor: shades[200] }}
            >
              <div className="grid md:grid-cols-4 gap-8">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div 
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold"
                      style={{ backgroundColor: shades[600] }}
                    >
                      L
                    </div>
                    <span 
                      className="font-bold text-lg"
                      style={{ color: shades[950], ...getFontStyle(true) }}
                    >
                      Logo
                    </span>
                  </div>
                  <p 
                    className="text-sm"
                    style={{ color: shades[600], ...getFontStyle(false) }}
                  >
                    Criando experiências digitais incríveis desde 2020
                  </p>
                </div>
                
                {[
                  { title: "Serviços", items: ["Web Design", "Desenvolvimento", "E-commerce", "SEO"] },
                  { title: "Empresa", items: ["Sobre", "Equipe", "Carreira", "Contato"] },
                  { title: "Recursos", items: ["Blog", "Ajuda", "Suporte", "Documentação"] }
                ].map((section, index) => (
                  <div key={index}>
                    <h4 
                      className="font-semibold mb-4"
                      style={{ color: shades[950], ...getFontStyle(true) }}
                    >
                      {section.title}
                    </h4>
                    <ul className="space-y-2">
                      {section.items.map((item, i) => (
                        <li key={i}>
                          <a 
                            href="#"
                            className="text-sm hover:opacity-80"
                            style={{ color: shades[600], ...getFontStyle(false) }}
                          >
                            {item}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              
              <div 
                className="border-t pt-8 mt-8 text-center text-sm"
                style={{ borderColor: shades[200], color: shades[600] }}
              >
                © 2024 Logo. Todos os direitos reservados.
              </div>
            </footer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WebsiteDemo;
