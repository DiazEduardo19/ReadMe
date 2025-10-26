import { AlertTriangle, Droplet, TrendingUp, Target, CreditCard, FileText, Lightbulb, Sparkles, ChevronRight } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import logo from 'figma:asset/16157d43241245ce9abe8a332354d7a508cce5ea.png';

interface DashboardPMProps {
  onNavigate: (screen: 'reporte' | 'cifras') => void;
}

const projectionData = [
  { mes: 'Oct', actual: 850000, proyectado: 850000 },
  { mes: 'Nov', actual: 820000, proyectado: 780000 },
  { mes: 'Dic', actual: 790000, proyectado: 710000 },
  { mes: 'Ene', actual: null, proyectado: 640000 },
  { mes: 'Feb', actual: null, proyectado: 570000 },
  { mes: 'Mar', actual: null, proyectado: 500000 },
];

const dailyTipsPM = [
  "Mantén un flujo de caja saludable: proyecta tus ingresos y egresos con al menos 3 meses de anticipación.",
  "Revisa tus gastos operativos mensuales. Identifica y elimina costos innecesarios.",
  "Diversifica tus fuentes de ingreso para reducir la dependencia de un solo cliente.",
  "Programa tus pagos a proveedores para optimizar tu ciclo de conversión de efectivo.",
  "Separa las finanzas personales de las empresariales. Asígnate un salario fijo.",
  "Aprovecha las deducciones fiscales: mantén todos tus comprobantes organizados.",
  "Invierte en tecnología que automatice procesos y reduzca costos operativos a largo plazo.",
];

const getTodayTip = (tips: string[]) => {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  return tips[dayOfYear % tips.length];
};

export function DashboardPM({ onNavigate }: DashboardPMProps) {
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
            <span className="text-xs">Persona Moral</span>
          </div>
        </div>
        <h1 className="text-2xl mb-1">TechSolutions SA de CV</h1>
        <p className="text-sm opacity-90">Panel de control empresarial</p>
      </div>

      {/* KPI Cards */}
      <div className="px-6 -mt-12 mb-6">
        <div className="grid grid-cols-2 gap-3">
          {/* Liquidez */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <Droplet className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <p className="text-gray-500 text-xs mb-1">Liquidez Operativa</p>
            <p className="text-gray-400 text-[10px] mb-1">Efectivo disponible</p>
            <p className="text-2xl text-gray-900">$790K</p>
          </div>

          {/* P&G */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
            </div>
            <p className="text-gray-500 text-xs mb-1">Pérdidas y Ganancias</p>
            <p className="text-gray-400 text-[10px] mb-1">Utilidad neta del mes</p>
            <p className="text-2xl text-gray-900">+$125K</p>
          </div>

          {/* Gasto Proyectado */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                <Target className="w-5 h-5 text-orange-600" />
              </div>
            </div>
            <p className="text-gray-500 text-xs mb-1">Presupuesto</p>
            <p className="text-gray-400 text-[10px] mb-2">Gasto vs. proyectado</p>
            <div className="mb-1">
              <p className="text-2xl text-red-600 mb-2">$336K</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                <div 
                  className="bg-red-600 h-2 rounded-full transition-all"
                  style={{ width: '100%' }}
                />
              </div>
              <p className="text-[10px] text-red-600">+$36K por encima de $300K</p>
            </div>
          </div>

          {/* Deuda */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-purple-600" />
              </div>
            </div>
            <p className="text-gray-500 text-xs mb-1">Deuda Total</p>
            <p className="text-gray-400 text-[10px] mb-1">Pasivos actuales</p>
            <p className="text-2xl text-gray-900">$450K</p>
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
                {getTodayTip(dailyTipsPM)}
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
                Controla gastos operativos, metas de ganancias y obtén consejería empresarial
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full flex-shrink-0"></div>
                  <span className="text-xs text-white/90">Límite de gastos: 96% consumido</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-400 rounded-full flex-shrink-0"></div>
                  <span className="text-xs text-white/90">Meta de ganancias: 90% alcanzado</span>
                </div>
              </div>
            </div>
            <ChevronRight className="w-6 h-6 text-white flex-shrink-0" />
          </div>
        </button>
      </div>

      {/* Critical Alert Widget */}
      <div className="px-6 mb-6">
        <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-5 shadow-lg border-2 border-red-700">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center flex-shrink-0 animate-pulse">
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
            <div className="flex-1 text-white">
              <h3 className="text-xl mb-3">¡RIESGO DETECTADO!</h3>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-3">
                <p className="mb-3">
                  <span className="font-semibold">Advertencia:</span> El ritmo de gasto en Operaciones 
                  agotará el presupuesto 3 meses antes de lo planeado.
                </p>
                <div className="bg-white/20 rounded-lg p-3">
                  <p className="text-sm mb-1">💡 Solución recomendada:</p>
                  <p className="font-semibold">
                    Reasigna el 10% del presupuesto de IT a Operaciones
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Projection Chart */}
      <div className="px-6 mb-6">
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <h3 className="text-gray-900 mb-4">Flujo de Caja Proyectado</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={projectionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="mes" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} tickFormatter={(value) => `${value/1000}K`} />
              <Tooltip formatter={(value: any) => `$${(value/1000).toFixed(0)}K`} />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Line 
                type="monotone" 
                dataKey="actual" 
                stroke="#10B981" 
                strokeWidth={3}
                name="Real"
                dot={{ r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="proyectado" 
                stroke="#EF4444" 
                strokeWidth={3}
                strokeDasharray="5 5"
                name="Proyección"
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="mt-4 bg-yellow-50 rounded-xl p-3 border border-yellow-200">
            <p className="text-sm text-gray-700">
              La línea roja punteada muestra el escenario si no se toman medidas correctivas
            </p>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <div className="px-6 mb-6">
        <button 
          onClick={() => onNavigate('reporte')}
          className="w-full bg-[#FFC72C] text-gray-900 py-4 rounded-xl shadow-md hover:bg-[#FFD147] transition-colors flex items-center justify-center gap-2"
        >
          <FileText className="w-5 h-5" />
          Generar Reporte para Contador
        </button>
      </div>
    </div>
  );
}
