
import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Palette, Type, Eye, Layout, BarChart3, Sparkles } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from '@/components/ui/sidebar';

const navigationItems = [
  { title: 'Gerador', value: 'generator', icon: Palette },
  { title: 'Tipografia', value: 'typography', icon: Type },
  { title: 'Widgets Pro', value: 'widgets', icon: Eye },
  { title: 'Relume Demo', value: 'relume', icon: Layout },
  { title: 'Dashboard', value: 'dashboard', icon: BarChart3 },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentHash = location.hash.replace('#', '') || 'generator';
  const collapsed = state === 'collapsed';

  const isActive = (value: string) => currentHash === value;

  return (
    <Sidebar className="border-r border-gray-200 bg-white">
      <SidebarHeader className="border-b border-gray-200 p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-brand-500 to-brand-600 rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <div>
              <h1 className="text-lg font-bold text-gray-800">Palette Generator</h1>
              <p className="text-xs text-gray-600">Gerador de Paletas + Widgets</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className={collapsed ? 'sr-only' : ''}>
            Navegação
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.value}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.value)}
                    className={`w-full justify-start ${
                      isActive(item.value) 
                        ? 'bg-brand-50 text-brand-700 border-r-2 border-brand-500' 
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <a href={`#${item.value}`} className="flex items-center gap-3 px-3 py-2">
                      <item.icon className="w-5 h-5" />
                      {!collapsed && <span>{item.title}</span>}
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
