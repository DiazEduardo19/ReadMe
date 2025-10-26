import { TrendingUp, TrendingDown, Plane, DollarSign, Brain, Lightbulb, Sparkles, Target, ChevronRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import logo from 'figma:asset/16157d43241245ce9abe8a332354d7a508cce5ea.png';

interface DashboardPFProps {
  onNavigate: (screen: 'control-gasto' | 'cifras') => void;
}

const chartData = [
  { mes: 'May', ingresos: 45000, egresos: 38000 },
  { mes: 'Jun', ingresos: 47000, egresos: 42000 },
  { mes: 'Jul', ingresos: 46000, egresos: 39000 },
  { mes: 'Ago', ingresos: 48000, egresos: 41000 },
  { mes: 'Sep', ingresos: 50000, egresos: 43000 },
  { mes: 'Oct', ingresos: 49000, egresos: 40000 },
];

const dailyTipsPF = [
  "Destina al menos el 20% de tus ingresos mensuales al ahorro antes de cualquier gasto.",
  "Revisa tus suscripciones mensuales. Cancela las que no uses regularmente.",
  "Crea un fondo de emergencia equivalente a 3-6 meses de tus gastos.",
  "Aprovecha las promociones sin intereses solo si pagarás el total antes del fin del periodo.",
  "Automatiza tus ahorros: programa transferencias automáticas cada que cobres.",
  "Compara precios antes de compras grandes. Pequeñas diferencias suman mucho.",
  "Invierte en ti: cursos y educación financiera siempre generan buenos rendimientos.",
];

const getTodayTip = (tips: string[]) => {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  return tips[dayOfYear % tips.length];
};

export function DashboardPF({ onNavigate }: DashboardPFProps) {
  return (
    <div className="min-h-full bg-[#F5F5F5]">
      {/* Header */}
      <div className="bg-[#ED1C24] text-white px-6 pt-14 pb-20 rounded-b-3xl shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div className="bg-[#ED1C24]">
            <img 
              src={logo} 
              alt="FinancIA Banorte" 
              className="h-14 mix-blend-lighten"
            />
          </div>
          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
            <span className="text-xs">Persona Física</span>
          </div>
        </div>
        <h1 className="text-2xl mb-1">Hola, Carlos</h1>
        <p className="text-sm opacity-90">Aquí está tu panorama financiero</p>
      </div>

      {/* KPI Cards */}
      <div className="px-6 -mt-12 mb-6">
        <div className="grid grid-cols-2 gap-3">
          {/* Saldo Total */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
            </div>
            <p className="text-gray-500 text-xs mb-1">Saldo Total</p>
            <p className="text-gray-400 text-[10px] mb-1">Todas tus cuentas</p>
            <p className="text-2xl text-gray-900">$84,250</p>
          </div>

          {/* Flujo Neto */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-10 h-10 bg-[#FFF8DC] rounded-xl flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-[#FFC72C]" />
              </div>
            </div>
            <p className="text-gray-500 text-xs mb-1">Flujo Neto</p>
            <p className="text-gray-400 text-[10px] mb-1">Ingresos - gastos mes</p>
            <p className="text-2xl text-gray-900">+$9,000</p>
          </div>

          {/* Tasa Ahorro */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <TrendingDown className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <p className="text-gray-500 text-xs mb-1">Tasa de Ahorro</p>
            <p className="text-gray-400 text-[10px] mb-2">% de ingreso ahorrado</p>
            <div className="mb-1">
              <p className="text-2xl text-gray-900 mb-2">$9,200</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all"
                  style={{ width: '92%' }}
                />
              </div>
              <p className="text-[10px] text-blue-600">Faltan $800 para tu meta mensual</p>
            </div>
          </div>

          {/* Meta Ahorro */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                <Plane className="w-5 h-5 text-purple-600" />
              </div>
            </div>
            <p className="text-gray-500 text-xs mb-1">Meta: Viaje</p>
            <p className="text-gray-400 text-[10px] mb-2">Europa 2026</p>
            <div className="mb-1">
              <p className="text-2xl text-gray-900 mb-2">$25,000</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                <div 
                  className="bg-purple-600 h-2 rounded-full transition-all"
                  style={{ width: '65%' }}
                />
              </div>
              <p className="text-[10px] text-purple-600">Faltan $13,500 de $38,500</p>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Tip */}
      <div className="px-6 mb-6">
        <div className="bg-gradient-to-r from-[#FFF8DC] to-[#FFFAED] rounded-2xl p-4 shadow-sm border-l-4 border-[#FFC72C]">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-[#FFC72C] rounded-full flex items-center justify-center flex-shrink-0">
              <Lightbulb className="w-5 h-5 text-gray-900" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-gray-900">Consejo del día</h3>
                <Sparkles className="w-3.5 h-3.5 text-[#FFC72C]" />
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                {getTodayTip(dailyTipsPF)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Cifras Clave CTA - Featured */}
      <div className="px-6 mb-6">
        <button
          onClick={() => onNavigate('cifras')}
          className="w-full bg-gradient-to-r from-[#ED1C24] to-[#C41119] rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all active:scale-98"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center flex-shrink-0">
              <Target className="w-8 h-8 text-[#ED1C24]" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="text-white mb-2">Cifras Clave</h3>
              <p className="text-sm text-white/90 leading-relaxed mb-3">
                Gestiona tus límites de gastos, metas de ahorro y recibe consejería personalizada
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0"></div>
                  <span className="text-xs text-white/90">Límite de gastos: Dentro del rango</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full flex-shrink-0"></div>
                  <span className="text-xs text-white/90">Meta de ahorro: 92% alcanzado</span>
                </div>
              </div>
            </div>
            <ChevronRight className="w-6 h-6 text-white flex-shrink-0" />
          </div>
        </button>
      </div>

      {/* Chart */}
      <div className="px-6 mb-6">
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <h3 className="text-gray-900 mb-4">Ingresos vs. Egresos (6 meses)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="mes" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Bar dataKey="ingresos" fill="#10B981" radius={[8, 8, 0, 0]} />
              <Bar dataKey="egresos" fill="#EF4444" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* AI Alert Widget */}
      <div className="px-6 mb-6">
        <div className="bg-gradient-to-br from-[#FFF8DC] to-[#FFFAED] rounded-2xl p-5 shadow-sm border-2 border-[#FFC72C]">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-12 h-12 bg-[#FFC72C] rounded-full flex items-center justify-center flex-shrink-0">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-gray-900 mb-2">Maya te recomienda</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                He detectado oportunidades de ahorro en tus gastos no esenciales. 
                Usa la herramienta de <span className="font-semibold">Ahorro Inteligente</span> para 
                encontrar tu punto de paz mental sin sacrificar lo que realmente importa.
              </p>
            </div>
          </div>
          <button 
            onClick={() => onNavigate('control-gasto')}
            className="w-full bg-[#FFC72C] text-gray-900 py-4 rounded-xl shadow-md hover:bg-[#FFD147] transition-colors flex items-center justify-center"
          >
            Activar Ahorro Inteligente
          </button>
        </div>
      </div>
    </div>
  );
}
