import { User, Building2, ArrowRight } from 'lucide-react';
import logo from 'figma:asset/16157d43241245ce9abe8a332354d7a508cce5ea.png';

interface ProfileSelectorProps {
  onSelectProfile: (profile: 'pf' | 'pm') => void;
}

export function ProfileSelector({ onSelectProfile }: ProfileSelectorProps) {
  return (
    <div className="min-h-full bg-gradient-to-br from-[#ED1C24] to-[#C41820] flex flex-col items-center justify-center px-8 py-12">
      {/* Logo */}
      <div className="mb-12">
        <div className="flex justify-center mb-6">
          <div className="bg-[#ED1C24]">
            <img 
              src={logo} 
              alt="FinancIA Banorte" 
              className="w-64 h-auto mix-blend-lighten"
            />
          </div>
        </div>
      </div>

      {/* Title */}
      <div className="text-center mb-12">
        <h1 className="text-white text-3xl mb-3">Bienvenido a FinancIA</h1>
        <p className="text-white/90 text-lg">Selecciona tu tipo de perfil</p>
      </div>

      {/* Profile Cards */}
      <div className="w-full space-y-4 mb-8">
        {/* Persona Física */}
        <button
          onClick={() => onSelectProfile('pf')}
          className="w-full bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all hover:scale-105 active:scale-100"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-[#FFC72C] to-[#FFD147] rounded-2xl flex items-center justify-center flex-shrink-0">
              <User className="w-8 h-8 text-gray-900" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="text-xl text-gray-900 mb-1">Persona Física</h3>
              <p className="text-sm text-gray-600">Gestiona tus finanzas personales</p>
            </div>
            <ArrowRight className="w-6 h-6 text-gray-400" />
          </div>
        </button>

        {/* Persona Moral */}
        <button
          onClick={() => onSelectProfile('pm')}
          className="w-full bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all hover:scale-105 active:scale-100"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="text-xl text-gray-900 mb-1">Persona Moral</h3>
              <p className="text-sm text-gray-600">Administra las finanzas de tu empresa</p>
            </div>
            <ArrowRight className="w-6 h-6 text-gray-400" />
          </div>
        </button>
      </div>

      {/* Footer Info */}
      <div className="text-center">
        <p className="text-white/70 text-sm">
          Podrás cambiar tu perfil más tarde desde Configuración
        </p>
      </div>
    </div>
  );
}
