
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarHeader } from '@/components/ui/sidebar';
import { Palette, Type, Layers, Layout, BarChart3, Eye } from 'lucide-react';

const menuItems = [
  {
    title: 'Gerador',
    url: '#generator',
    icon: Palette,
    description: 'Criar paletas de cores'
  },
  {
    title: 'Verificar Contraste',
    url: '#contrast',
    icon: Eye,
    description: 'Grade de contraste de cores'
  },
  {
    title: 'Tipografia',
    url: '#typography',
    icon: Type,
    description: 'Selecionar fontes'
  },
  {
    title: 'Widgets Pro',
    url: '#widgets',
    icon: Layers,
    description: 'Componentes Elementor'
  },
  {
    title: 'Relume Demo',
    url: '#relume',
    icon: Layout,
    description: 'Layout demonstração'
  },
  {
    title: 'Dashboard',
    url: '#dashboard',
    icon: BarChart3,
    description: 'Painel de controle'
  }
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Palette className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-800">Palette Pro</h1>
            <p className="text-xs text-gray-600">Gerador de Paletas</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Ferramentas</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors">
                      <item.icon className="w-5 h-5" />
                      <div>
                        <div className="font-medium">{item.title}</div>
                        <div className="text-xs text-gray-600">{item.description}</div>
                      </div>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
