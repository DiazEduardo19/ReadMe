import { ArrowLeft, Heart, Frown, Coffee, ShoppingBag, Film, Dumbbell } from 'lucide-react';
import { Slider } from './ui/slider';
import { useState } from 'react';

export function ControlGasto() {
  const [impactoEmocional, setImpactoEmocional] = useState([5]);

  const gastos = [
    { 
      id: 1, 
      categoria: 'Cafeterías Premium', 
      icon: Coffee,
      monto: 2400, 
      impacto: 3,
      sugerencia: 'Reduce visitas a cafeterías de $80/día a $40/día',
      ahorro: 1200
    },
    { 
      id: 2, 
      categoria: 'Streaming Múltiple', 
      icon: Film,
      monto: 850, 
      impacto: 2,
      sugerencia: 'Cancela 2 de 4 suscripciones de streaming',
      ahorro: 400
    },
    { 
      id: 3, 
      categoria: 'Compras Impulsivas', 
      icon: ShoppingBag,
      monto: 3200, 
      impacto: 1,
      sugerencia: 'Establece un presupuesto mensual de compras',
      ahorro: 2000
    },
    { 
      id: 4, 
      categoria: 'Gimnasio Premium', 
      icon: Dumbbell,
      monto: 1800, 
      impacto: 7,
      sugerencia: 'Considera opciones más económicas o ejercicio al aire libre',
      ahorro: 900
    },
  ];

  const filteredGastos = gastos.filter(g => g.impacto <= impactoEmocional[0]);
  const ahorroTotal = filteredGastos.reduce((sum, g) => sum + g.ahorro, 0);

  return (
    <div className="min-h-full bg-[#F5F5F5]">
      {/* Header */}
      <div className="bg-white px-6 pt-14 pb-4 shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-4 mb-1">
          <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100">
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <div className="flex-1">
            <h2 className="text-gray-900">Gastos No Esenciales</h2>
            <p className="text-sm text-green-600">Ahorro potencial: ${ahorroTotal.toLocaleString()}/mes</p>
          </div>
        </div>
      </div>

      {/* Emotional Impact Filter */}
      <div className="bg-white px-6 py-6 mb-4 shadow-sm">
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <label className="text-gray-900">Impacto Emocional</label>
            <span className="text-[#FFC72C] px-3 py-1 bg-[#FFF8DC] rounded-full text-sm">
              Nivel {impactoEmocional[0]}/10
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Ajusta el nivel para ver qué gastos puedes reducir sin afectar tu bienestar
          </p>
        </div>

        <Slider
          value={impactoEmocional}
          onValueChange={setImpactoEmocional}
          max={10}
          min={1}
          step={1}
          className="mb-4"
        />

        <div className="flex justify-between text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <Frown className="w-4 h-4" />
            Bajo impacto
          </span>
          <span className="flex items-center gap-1">
            <Heart className="w-4 h-4" />
            Alto impacto
          </span>
        </div>
      </div>

      {/* Transactions List */}
      <div className="px-6 pb-40">
        <p className="text-sm text-gray-600 mb-4">
          Mostrando {filteredGastos.length} de {gastos.length} categorías de gasto
        </p>
        
        <div className="space-y-3">
          {filteredGastos.map((gasto) => {
            const Icon = gasto.icon;
            const shouldReduce = gasto.impacto <= 4;
            
            return (
              <div 
                key={gasto.id}
                className={`bg-white rounded-2xl p-4 shadow-sm border-2 ${
                  shouldReduce ? 'border-orange-200 bg-orange-50' : 'border-transparent'
                }`}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    shouldReduce ? 'bg-orange-100' : 'bg-gray-100'
                  }`}>
                    <Icon className={`w-6 h-6 ${shouldReduce ? 'text-orange-600' : 'text-gray-600'}`} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-gray-900 mb-1">{gasto.categoria}</h4>
                    <p className="text-2xl text-gray-900">${gasto.monto.toLocaleString()}/mes</p>
                  </div>
                  <div className="flex items-center gap-1">
                    {gasto.impacto > 6 ? (
                      <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                    ) : (
                      <Heart className="w-5 h-5 text-gray-300" />
                    )}
                    <span className="text-sm text-gray-500">{gasto.impacto}/10</span>
                  </div>
                </div>
                
                {shouldReduce && (
                  <div className="bg-white rounded-xl p-3 border border-orange-200">
                    <p className="text-sm text-gray-700 mb-2">{gasto.sugerencia}</p>
                    <p className="text-sm text-green-600">
                      Ahorro: <span className="font-semibold">${gasto.ahorro.toLocaleString()}/mes</span>
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Banner */}
      <div className="absolute bottom-0 left-0 right-0 bg-green-500 text-white px-8 py-5 shadow-lg mb-24">
        <p className="text-sm mb-1 opacity-90">✨ Maya ha encontrado tu punto de paz mental</p>
        <p className="text-lg">Ahorro proyectado: <span className="font-semibold">${ahorroTotal.toLocaleString()}/mes</span></p>
      </div>
    </div>
  );
}
