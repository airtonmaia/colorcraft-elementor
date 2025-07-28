
import { Home, Palette, Type, Grid3x3, Globe, BarChart3, Eye } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

const items = [
  {
    title: 'Gerador',
    url: '#generator',
    icon: Home,
  },
  {
    title: 'Tipografia',
    url: '#typography',
    icon: Type,
  },
  {
    title: 'Widgets Pro',
    url: '#widgets',
    icon: Grid3x3,
  },
  {
    title: 'Website Demo',
    url: '#website',
    icon: Globe,
  },
  {
    title: 'Contraste',
    url: '#contrast',
    icon: Eye,
  },
  {
    title: 'Dashboard',
    url: '#dashboard',
    icon: BarChart3,
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="dark:bg-gray-800 dark:border-gray-700">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-brand-600 dark:text-brand-400 font-semibold">
            <Palette className="w-4 h-4 mr-2" />
            Palette Generator
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a 
                      href={item.url}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
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
