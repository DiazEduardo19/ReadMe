import { useState } from 'react';
import { Mail, Lock, User, Building2, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import logo from 'figma:asset/16157d43241245ce9abe8a332354d7a508cce5ea.png';

interface RegisterProps {
  onRegister: (name: string, email: string, profile: 'pf' | 'pm') => void;
  onNavigateToLogin: () => void;
}

export function Register({ onRegister, onNavigateToLogin }: RegisterProps) {
  const [profileType, setProfileType] = useState<'pf' | 'pm' | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    if (!profileType) {
      alert('Por favor selecciona un tipo de perfil');
      return;
    }
    onRegister(name, email, profileType);
  };

  return (
    <div className="min-h-full bg-gradient-to-b from-[#ED1C24] to-[#C41119] flex flex-col px-6 pt-14 pb-8 overflow-y-auto">
      {/* Back Button */}
      <button
        onClick={onNavigateToLogin}
        className="flex items-center gap-2 text-white mb-6 hover:opacity-80 transition-opacity"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="text-sm">Volver</span>
      </button>

      {/* Logo */}
      <div className="mb-8">
        <div className="flex justify-center">
          <div className="bg-[#ED1C24]">
            <img 
              src={logo} 
              alt="FinancIA Banorte" 
              className="h-16 mix-blend-lighten"
            />
          </div>
        </div>
        <p className="text-white text-center mt-2 text-sm opacity-90">Crea tu cuenta</p>
      </div>

      {/* Register Card */}
      <div className="w-full bg-white rounded-3xl p-6 shadow-2xl mb-6">
        <h1 className="text-gray-900 text-center mb-2">Registro</h1>
        <p className="text-gray-500 text-center text-sm mb-6">Completa tus datos para comenzar</p>

        <form onSubmit={handleRegister} className="space-y-4">
          {/* Profile Type Selection */}
          <div>
            <label className="block text-sm text-gray-700 mb-3">Tipo de perfil</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setProfileType('pf')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  profileType === 'pf'
                    ? 'border-[#ED1C24] bg-red-50'
                    : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                }`}
              >
                <User className={`w-8 h-8 mx-auto mb-2 ${profileType === 'pf' ? 'text-[#ED1C24]' : 'text-gray-400'}`} />
                <p className={`text-sm ${profileType === 'pf' ? 'text-[#ED1C24]' : 'text-gray-600'}`}>
                  Persona Física
                </p>
              </button>

              <button
                type="button"
                onClick={() => setProfileType('pm')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  profileType === 'pm'
                    ? 'border-[#ED1C24] bg-red-50'
                    : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                }`}
              >
                <Building2 className={`w-8 h-8 mx-auto mb-2 ${profileType === 'pm' ? 'text-[#ED1C24]' : 'text-gray-400'}`} />
                <p className={`text-sm ${profileType === 'pm' ? 'text-[#ED1C24]' : 'text-gray-600'}`}>
                  Persona Moral
                </p>
              </button>
            </div>
          </div>

          {/* Name Input */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              {profileType === 'pm' ? 'Razón Social' : 'Nombre completo'}
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2">
                {profileType === 'pm' ? (
                  <Building2 className="w-5 h-5 text-gray-400" />
                ) : (
                  <User className="w-5 h-5 text-gray-400" />
                )}
              </div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={profileType === 'pm' ? 'TechSolutions SA de CV' : 'Juan Pérez'}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ED1C24] focus:border-transparent transition-all"
                required
              />
            </div>
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">Correo electrónico</label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2">
                <Mail className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ED1C24] focus:border-transparent transition-all"
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">Contraseña</label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2">
                <Lock className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mínimo 8 caracteres"
                className="w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ED1C24] focus:border-transparent transition-all"
                required
                minLength={8}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Confirm Password Input */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">Confirmar contraseña</label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2">
                <Lock className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repite tu contraseña"
                className="w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ED1C24] focus:border-transparent transition-all"
                required
                minLength={8}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Terms */}
          <div className="bg-gray-50 rounded-xl p-3 border border-gray-200">
            <p className="text-xs text-gray-600 text-center">
              Al registrarte, aceptas nuestros{' '}
              <button type="button" className="text-[#ED1C24] hover:underline">
                Términos y Condiciones
              </button>
              {' '}y{' '}
              <button type="button" className="text-[#ED1C24] hover:underline">
                Política de Privacidad
              </button>
            </p>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-[#ED1C24] text-white py-4 rounded-xl shadow-lg hover:bg-[#C41119] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!profileType}
          >
            Crear Cuenta
          </button>
        </form>

        {/* Login Link */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            ¿Ya tienes cuenta?{' '}
            <button
              onClick={onNavigateToLogin}
              className="text-[#ED1C24] hover:underline"
            >
              Inicia sesión
            </button>
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-4">
        <p className="text-white text-xs opacity-75">
          © 2025 Banorte. Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
}
