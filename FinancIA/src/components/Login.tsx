import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import logo from 'figma:asset/16157d43241245ce9abe8a332354d7a508cce5ea.png';

interface LoginProps {
  onLogin: (name: string, email: string, profile: 'pf' | 'pm') => void;
  onNavigateToRegister: () => void;
}

export function Login({ onLogin, onNavigateToRegister }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulación: si el email contiene "empresa", es PM, si no, es PF
    const profile = email.toLowerCase().includes('empresa') ? 'pm' : 'pf';
    const name = profile === 'pm' ? 'TechSolutions SA de CV' : 'Juan Pérez';
    onLogin(name, email, profile);
  };

  return (
    <div className="min-h-full bg-gradient-to-b from-[#ED1C24] to-[#C41119] flex flex-col items-center justify-center px-6">
      {/* Logo */}
      <div className="mb-12 mt-16">
        <div className="flex justify-center">
          <div className="bg-[#ED1C24]">
            <img 
              src={logo} 
              alt="FinancIA Banorte" 
              className="h-20 mix-blend-lighten"
            />
          </div>
        </div>
        <p className="text-white text-center mt-3 opacity-90">Tu asistente financiero inteligente</p>
      </div>

      {/* Login Card */}
      <div className="w-full bg-white rounded-3xl p-8 shadow-2xl">
        <h1 className="text-gray-900 text-center mb-2">Bienvenido de nuevo</h1>
        <p className="text-gray-500 text-center text-sm mb-8">Inicia sesión para continuar</p>

        <form onSubmit={handleLogin} className="space-y-5">
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
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ED1C24] focus:border-transparent transition-all"
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
                placeholder="••••••••"
                className="w-full pl-12 pr-12 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ED1C24] focus:border-transparent transition-all"
                required
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

          {/* Forgot Password */}
          <div className="text-right">
            <button type="button" className="text-sm text-[#ED1C24] hover:underline">
              ¿Olvidaste tu contraseña?
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-[#ED1C24] text-white py-4 rounded-xl shadow-lg hover:bg-[#C41119] transition-colors flex items-center justify-center"
          >
            Iniciar Sesión
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-sm text-gray-400">o</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Register Link */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            ¿No tienes cuenta?{' '}
            <button
              onClick={onNavigateToRegister}
              className="text-[#ED1C24] hover:underline"
            >
              Regístrate aquí
            </button>
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 mb-8 text-center">
        <p className="text-white text-xs opacity-75">
          © 2025 Banorte. Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
}
