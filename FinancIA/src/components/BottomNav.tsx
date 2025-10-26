import { Home, BarChart3, MessageSquare, User as UserIcon } from 'lucide-react';

interface BottomNavProps {
  activeScreen: string;
  onNavigate: (screen: 'dashboard-pf' | 'dashboard-pm' | 'priorizacion' | 'chat' | 'profile') => void;
  userProfile: 'pf' | 'pm';
}

export function BottomNav({ activeScreen, onNavigate, userProfile }: BottomNavProps) {
  const navItems = [
    { id: userProfile === 'pf' ? 'dashboard-pf' : 'dashboard-pm', icon: Home, label: 'Inicio' },
    { id: 'priorizacion', icon: BarChart3, label: 'Gastos' },
    { id: 'chat', icon: MessageSquare, label: 'Asistente' },
    { id: 'profile', icon: UserIcon, label: 'Perfil' },
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 pb-6">
      <div className="flex justify-around items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeScreen === item.id || 
            ((item.id === 'dashboard-pf' || item.id === 'dashboard-pm') && (activeScreen === 'control-gasto' || activeScreen === 'reporte' || activeScreen === 'cifras')) ||
            (item.id === 'profile' && activeScreen === 'cifras');
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id as any)}
              className="flex flex-col items-center gap-1 py-2 px-3 transition-colors"
            >
              <Icon 
                className={`w-6 h-6 ${isActive ? 'text-[#ED1C24]' : 'text-gray-400'}`}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span className={`text-xs ${isActive ? 'text-[#ED1C24]' : 'text-gray-500'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
