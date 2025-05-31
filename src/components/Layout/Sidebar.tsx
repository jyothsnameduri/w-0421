
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  TicketIcon, 
  PlusCircle, 
  MessageCircle, 
  BarChart3, 
  Users, 
  Settings, 
  Home,
  Inbox,
  Clock
} from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen = true, onClose }) => {
  const { profile } = useAuthStore();
  const location = useLocation();

  const employeeItems = [
    { icon: Home, label: 'Dashboard', href: '/dashboard' },
    { icon: PlusCircle, label: 'New Ticket', href: '/tickets/new' },
    { icon: TicketIcon, label: 'My Tickets', href: '/tickets' },
    { icon: MessageCircle, label: 'AI Assistant', href: '/ai-chat' },
  ];

  const agentItems = [
    { icon: Home, label: 'Dashboard', href: '/agent/dashboard' },
    { icon: Inbox, label: 'Ticket Queue', href: '/agent/tickets' },
    { icon: Clock, label: 'My Assigned', href: '/agent/assigned' },
    { icon: MessageCircle, label: 'AI Assistant', href: '/ai-chat' },
  ];

  const adminItems = [
    { icon: Home, label: 'Dashboard', href: '/admin/dashboard' },
    { icon: BarChart3, label: 'Analytics', href: '/admin/analytics' },
    { icon: Users, label: 'Users', href: '/admin/users' },
    { icon: Settings, label: 'Settings', href: '/admin/settings' },
  ];

  const getMenuItems = () => {
    switch (profile?.role) {
      case 'admin':
        return adminItems;
      case 'agent':
        return agentItems;
      default:
        return employeeItems;
    }
  };

  const menuItems = getMenuItems();

  return (
    <aside
      className={cn(
        "bg-gradient-to-b from-blue-900 to-blue-800 text-white w-64 min-h-screen transition-transform duration-300 ease-in-out lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-8">
          <div className="bg-white p-2 rounded-lg">
            <TicketIcon className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold">HelpDesk</h1>
            <p className="text-blue-200 text-sm">AI-Powered Support</p>
          </div>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            
            return (
              <NavLink
                key={item.href}
                to={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200",
                  isActive
                    ? "bg-white text-blue-900 shadow-md"
                    : "text-blue-100 hover:bg-blue-700 hover:text-white"
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="mt-8 pt-8 border-t border-blue-700">
          <div className="bg-blue-800 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-sm font-medium">AI Assistant Active</span>
            </div>
            <p className="text-xs text-blue-200">
              Ready to help with your queries
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
