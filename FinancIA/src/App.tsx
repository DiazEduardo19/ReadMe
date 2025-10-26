import { useState } from 'react';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Profile } from './components/Profile';
import { DashboardPF } from './components/DashboardPF';
import { ControlGasto } from './components/ControlGasto';
import { DashboardPM } from './components/DashboardPM';
import { ReporteContador } from './components/ReporteContador';
import { PriorizacionGastos } from './components/PriorizacionGastos';
import { ChatAsistente } from './components/ChatAsistente';
import { CifrasClave } from './components/CifrasClave';
import { BottomNav } from './components/BottomNav';

interface UserData {
  name: string;
  email: string;
  profile: 'pf' | 'pm';
}

export default function App() {
  const [authScreen, setAuthScreen] = useState<'login' | 'register' | null>('login');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [activeScreen, setActiveScreen] = useState<'dashboard-pf' | 'control-gasto' | 'dashboard-pm' | 'reporte' | 'priorizacion' | 'chat' | 'profile' | 'cifras'>('dashboard-pf');

  const handleLogin = (name: string, email: string, profile: 'pf' | 'pm') => {
    setUserData({ name, email, profile });
    setAuthScreen(null);
    setActiveScreen(profile === 'pf' ? 'dashboard-pf' : 'dashboard-pm');
  };

  const handleRegister = (name: string, email: string, profile: 'pf' | 'pm') => {
    setUserData({ name, email, profile });
    setAuthScreen(null);
    setActiveScreen(profile === 'pf' ? 'dashboard-pf' : 'dashboard-pm');
  };

  const handleLogout = () => {
    setUserData(null);
    setAuthScreen('login');
    setActiveScreen('dashboard-pf');
  };

  const handleProfileChange = (newProfile: 'pf' | 'pm') => {
    if (userData) {
      setUserData({ ...userData, profile: newProfile });
      setActiveScreen(newProfile === 'pf' ? 'dashboard-pf' : 'dashboard-pm');
    }
  };

  const renderScreen = () => {
    // Show auth screens if user is not logged in
    if (!userData) {
      if (authScreen === 'login') {
        return <Login onLogin={handleLogin} onNavigateToRegister={() => setAuthScreen('register')} />;
      }
      if (authScreen === 'register') {
        return <Register onRegister={handleRegister} onNavigateToLogin={() => setAuthScreen('login')} />;
      }
    }

    // Show app screens if user is logged in
    switch (activeScreen) {
      case 'dashboard-pf':
        return <DashboardPF onNavigate={(screen) => setActiveScreen(screen as any)} />;
      case 'control-gasto':
        return <ControlGasto />;
      case 'dashboard-pm':
        return <DashboardPM onNavigate={(screen) => setActiveScreen(screen as any)} />;
      case 'reporte':
        return <ReporteContador />;
      case 'priorizacion':
        return <PriorizacionGastos userProfile={userData.profile} />;
      case 'chat':
        return <ChatAsistente />;
      case 'profile':
        return <Profile 
          userName={userData.name}
          userEmail={userData.email}
          userProfile={userData.profile}
          onLogout={handleLogout}
          onChangeProfile={handleProfileChange}
          onNavigateToCifras={() => setActiveScreen('cifras')}
        />;
      case 'cifras':
        return <CifrasClave 
          userProfile={userData.profile}
          onBack={() => setActiveScreen('profile')}
        />;
      default:
        return userData.profile === 'pf' 
          ? <DashboardPF onNavigate={(screen) => setActiveScreen(screen)} />
          : <DashboardPM onNavigate={(screen) => setActiveScreen(screen)} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center p-4">
      {/* Mobile Container */}
      <div className="w-full max-w-[430px] h-[932px] bg-[#F5F5F5] rounded-[3rem] shadow-2xl overflow-hidden relative border-8 border-gray-900">
        {/* Status Bar */}
        <div className="absolute top-0 left-0 right-0 h-11 bg-gradient-to-b from-black/20 to-transparent z-50 pointer-events-none">
          <div className="flex items-center justify-between px-8 pt-2">
            <span className="text-xs text-white">9:41</span>
            <div className="flex items-center gap-1">
              <div className="w-4 h-3 bg-white/90 rounded-sm" />
              <div className="w-4 h-3 bg-white/90 rounded-sm" />
              <div className="w-4 h-3 bg-white/90 rounded-sm" />
            </div>
          </div>
        </div>

        {/* Screen Content */}
        <div className="h-full overflow-y-auto pb-20">
          {renderScreen()}
        </div>

        {/* Bottom Navigation - Only show when profile is selected */}
        {userData && (
          <BottomNav 
            activeScreen={activeScreen} 
            onNavigate={setActiveScreen}
            userProfile={userData.profile}
          />
        )}

        {/* Home Indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-gray-900 rounded-full z-50" />
      </div>
    </div>
  );
}
