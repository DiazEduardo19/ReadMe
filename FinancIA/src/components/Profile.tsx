import { useState } from 'react';
import { User, Building2, Mail, Phone, MapPin, CreditCard, Shield, Bell, LogOut, ChevronRight, RefreshCw, Target } from 'lucide-react';

interface ProfileProps {
  userName: string;
  userEmail: string;
  userProfile: 'pf' | 'pm';
  onLogout: () => void;
  onChangeProfile: (newProfile: 'pf' | 'pm') => void;
  onNavigateToCifras?: () => void;
}

export function Profile({ userName, userEmail, userProfile, onLogout, onChangeProfile, onNavigateToCifras }: ProfileProps) {
  const [showProfileChangeModal, setShowProfileChangeModal] = useState(false);
  
  // Generar número de cuenta simulado
  const accountNumber = `**** **** ${Math.floor(1000 + Math.random() * 9000)}`;

  return (
    <div className="min-h-full bg-[#F5F5F5] pt-14 pb-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#ED1C24] to-[#C41119] px-6 py-8 rounded-b-[2rem]">
        <h1 className="text-white text-center mb-6">Mi Perfil</h1>
        
        {/* Avatar and Name */}
        <div className="flex flex-col items-center">
          <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-4 ${
            userProfile === 'pf' ? 'bg-[#FFC72C]' : 'bg-blue-500'
          }`}>
            {userProfile === 'pf' ? (
              <User className="w-12 h-12 text-gray-900" />
            ) : (
              <Building2 className="w-12 h-12 text-white" />
            )}
          </div>
          <h2 className="text-white text-center mb-1">{userName}</h2>
          <div className="bg-white/20 px-4 py-1 rounded-full">
            <p className="text-white text-sm">
              {userProfile === 'pf' ? 'Persona Física' : 'Persona Moral'}
            </p>
          </div>
        </div>
      </div>

      <div className="px-6 mt-6 space-y-6">
        {/* Account Information */}
        <div>
          <h3 className="text-gray-500 text-sm mb-3 px-2">Información de Cuenta</h3>
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="flex items-center gap-4 p-4 border-b border-gray-100">
              <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center">
                <Mail className="w-5 h-5 text-[#ED1C24]" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500">Correo electrónico</p>
                <p className="text-sm text-gray-900">{userEmail}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 border-b border-gray-100">
              <div className="w-10 h-10 bg-yellow-50 rounded-full flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-[#FFC72C]" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500">Número de cuenta</p>
                <p className="text-sm text-gray-900">{accountNumber}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4">
              <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500">Estado de cuenta</p>
                <p className="text-sm text-green-600">Verificada</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div>
          <h3 className="text-gray-500 text-sm mb-3 px-2">Datos de Contacto</h3>
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <button className="flex items-center gap-4 p-4 w-full hover:bg-gray-50 transition-colors border-b border-gray-100">
              <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                <Phone className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-xs text-gray-500">Teléfono</p>
                <p className="text-sm text-gray-900">+52 55 1234 5678</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>

            <button className="flex items-center gap-4 p-4 w-full hover:bg-gray-50 transition-colors">
              <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center">
                <MapPin className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-xs text-gray-500">Dirección</p>
                <p className="text-sm text-gray-900">Ciudad de México</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Change Profile Type */}
        <div>
          <h3 className="text-gray-500 text-sm mb-3 px-2">Tipo de Perfil</h3>
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <button 
              onClick={() => setShowProfileChangeModal(true)}
              className="flex items-center gap-4 p-4 w-full hover:bg-gray-50 transition-colors"
            >
              <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center">
                <RefreshCw className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm text-gray-900">Cambiar Tipo de Perfil</p>
                <p className="text-xs text-gray-500">
                  {userProfile === 'pf' ? 'Cambiar a Persona Moral' : 'Cambiar a Persona Física'}
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Financial Management - Featured */}
        <button
          onClick={onNavigateToCifras}
          className="w-full bg-gradient-to-r from-[#ED1C24] to-[#C41119] rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all active:scale-98"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center flex-shrink-0">
              <Target className="w-8 h-8 text-[#ED1C24]" />
            </div>
            <div className="flex-1 text-left">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-white">Cifras Clave</h3>
                <div className="px-2 py-0.5 bg-[#FFC72C] rounded-full">
                  <span className="text-[10px] text-gray-900">NUEVO</span>
                </div>
              </div>
              <p className="text-sm text-white/90">
                {userProfile === 'pf' 
                  ? 'Controla gastos, ahorro y deudas'
                  : 'Gestiona gastos, ganancias y pérdidas'}
              </p>
            </div>
            <ChevronRight className="w-6 h-6 text-white flex-shrink-0" />
          </div>
        </button>

        {/* Settings */}
        <div>
          <h3 className="text-gray-500 text-sm mb-3 px-2">Configuración</h3>
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <button className="flex items-center gap-4 p-4 w-full hover:bg-gray-50 transition-colors border-b border-gray-100">
              <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center">
                <Bell className="w-5 h-5 text-orange-600" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm text-gray-900">Notificaciones</p>
                <p className="text-xs text-gray-500">Configurar alertas y avisos</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>

            <button className="flex items-center gap-4 p-4 w-full hover:bg-gray-50 transition-colors border-b border-gray-100">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5 text-gray-600" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm text-gray-900">Seguridad y Privacidad</p>
                <p className="text-xs text-gray-500">Contraseña, autenticación</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>

            <button className="flex items-center gap-4 p-4 w-full hover:bg-gray-50 transition-colors">
              <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-indigo-600" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm text-gray-900">Métodos de Pago</p>
                <p className="text-xs text-gray-500">Tarjetas y cuentas vinculadas</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Maya AI Badge */}
        <div className="bg-gradient-to-r from-[#FFC72C] to-yellow-400 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <span className="text-2xl">🤖</span>
            </div>
            <div>
              <p className="text-gray-900">Maya</p>
              <p className="text-sm text-gray-700">Tu asistente de IA</p>
            </div>
          </div>
          <p className="text-sm text-gray-700">
            Maya está aprendiendo tus hábitos financieros para ofrecerte las mejores recomendaciones personalizadas.
          </p>
        </div>

        {/* Logout Button */}
        <button
          onClick={onLogout}
          className="w-full bg-white border-2 border-[#ED1C24] text-[#ED1C24] py-4 rounded-xl shadow-sm hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
        >
          <LogOut className="w-5 h-5" />
          <span>Cerrar Sesión</span>
        </button>

        {/* App Version */}
        <div className="text-center pb-4">
          <p className="text-xs text-gray-400">FinancIA Banorte v1.0.0</p>
          <p className="text-xs text-gray-400 mt-1">© 2025 Banorte. Todos los derechos reservados.</p>
        </div>
      </div>

      {/* Profile Change Modal */}
      {showProfileChangeModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center px-6">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl">
            <h2 className="text-gray-900 text-center mb-4">Cambiar Tipo de Perfil</h2>
            <p className="text-sm text-gray-600 text-center mb-6">
              ¿Estás seguro de que deseas cambiar tu perfil a{' '}
              <span className="text-[#ED1C24]">
                {userProfile === 'pf' ? 'Persona Moral' : 'Persona Física'}
              </span>
              ? Esto cambiará tu vista del dashboard y las funcionalidades disponibles.
            </p>

            {/* Profile Cards */}
            <div className="space-y-3 mb-6">
              <div className={`p-4 rounded-xl border-2 transition-all ${
                userProfile === 'pf' 
                  ? 'border-gray-200 bg-gray-50' 
                  : 'border-[#ED1C24] bg-red-50'
              }`}>
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    userProfile === 'pf' ? 'bg-gray-300' : 'bg-blue-500'
                  }`}>
                    <Building2 className={`w-6 h-6 ${userProfile === 'pf' ? 'text-gray-600' : 'text-white'}`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900">Persona Moral</p>
                    <p className="text-xs text-gray-500">Finanzas empresariales</p>
                  </div>
                  {userProfile === 'pm' && (
                    <div className="bg-[#ED1C24] text-white text-xs px-2 py-1 rounded-full">
                      Actual
                    </div>
                  )}
                </div>
              </div>

              <div className={`p-4 rounded-xl border-2 transition-all ${
                userProfile === 'pm' 
                  ? 'border-gray-200 bg-gray-50' 
                  : 'border-[#ED1C24] bg-red-50'
              }`}>
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    userProfile === 'pm' ? 'bg-gray-300' : 'bg-[#FFC72C]'
                  }`}>
                    <User className={`w-6 h-6 ${userProfile === 'pm' ? 'text-gray-600' : 'text-gray-900'}`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900">Persona Física</p>
                    <p className="text-xs text-gray-500">Finanzas personales</p>
                  </div>
                  {userProfile === 'pf' && (
                    <div className="bg-[#ED1C24] text-white text-xs px-2 py-1 rounded-full">
                      Actual
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowProfileChangeModal(false)}
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl hover:bg-gray-200 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  const newProfile = userProfile === 'pf' ? 'pm' : 'pf';
                  onChangeProfile(newProfile);
                  setShowProfileChangeModal(false);
                }}
                className="flex-1 bg-[#ED1C24] text-white py-3 rounded-xl hover:bg-[#C41119] transition-colors"
              >
                Confirmar Cambio
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
