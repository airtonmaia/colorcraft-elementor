
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Palette, 
  Download, 
  Heart, 
  Trash2, 
  Edit, 
  Calendar,
  TrendingUp,
  Users,
  FileText 
} from 'lucide-react';

const Dashboard = () => {
  const [savedPalettes] = useState([
    {
      id: 1,
      name: 'Paleta Laranja Vibrante',
      baseColor: '#f97316',
      scheme: 'analogous',
      createdAt: '2024-01-15',
      downloads: 234,
      likes: 45,
    },
    {
      id: 2,
      name: 'Tons Azul Profissional',
      baseColor: '#3b82f6',
      scheme: 'complementary',
      createdAt: '2024-01-14',
      downloads: 189,
      likes: 32,
    },
    {
      id: 3,
      name: 'Verde Natureza',
      baseColor: '#22c55e',
      scheme: 'triadic',
      createdAt: '2024-01-13',
      downloads: 156,
      likes: 28,
    },
  ]);

  const stats = [
    { title: 'Paletas Criadas', value: '12', icon: Palette, color: 'text-brand-600' },
    { title: 'Downloads', value: '579', icon: Download, color: 'text-blue-600' },
    { title: 'Curtidas', value: '105', icon: Heart, color: 'text-red-600' },
    { title: 'Templates', value: '24', icon: FileText, color: 'text-green-600' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-600">Gerencie suas paletas e templates</p>
        </div>
        <Button className="bg-brand-500 hover:bg-brand-600">
          <Palette className="w-4 h-4 mr-2" />
          Nova Paleta
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="palettes" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="palettes">Paletas Salvas</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="palettes" className="space-y-4">
          <div className="grid gap-4">
            {savedPalettes.map((palette) => (
              <Card key={palette.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className="w-12 h-12 rounded-lg border-2 border-gray-200"
                        style={{ backgroundColor: palette.baseColor }}
                      />
                      <div>
                        <h3 className="font-semibold text-gray-800">{palette.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {palette.createdAt}
                          </span>
                          <Badge variant="secondary">{palette.scheme}</Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Download className="w-4 h-4" />
                          {palette.downloads}
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          {palette.likes}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="aspect-video bg-gradient-to-br from-brand-100 to-brand-200 rounded-lg mb-4 flex items-center justify-center">
                    <FileText className="w-8 h-8 text-brand-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Template {index + 1}</h3>
                  <p className="text-sm text-gray-600 mb-4">Template responsivo para Elementor</p>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </Button>
                    <Button variant="outline" size="sm">
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Estatísticas de Uso
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-4">Paletas Mais Populares</h4>
                  <div className="space-y-3">
                    {savedPalettes.map((palette) => (
                      <div key={palette.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-8 h-8 rounded border-2 border-gray-200"
                            style={{ backgroundColor: palette.baseColor }}
                          />
                          <span className="text-sm font-medium">{palette.name}</span>
                        </div>
                        <Badge variant="secondary">{palette.downloads} downloads</Badge>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-4">Crescimento Mensal</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <span className="text-sm">Novos usuários</span>
                      <span className="text-green-600 font-semibold">+23%</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <span className="text-sm">Paletas criadas</span>
                      <span className="text-blue-600 font-semibold">+45%</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                      <span className="text-sm">Downloads</span>
                      <span className="text-purple-600 font-semibold">+67%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
