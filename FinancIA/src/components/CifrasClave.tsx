import { useState } from 'react';
import { ArrowLeft, Target, TrendingDown, TrendingUp, AlertCircle, CheckCircle, Edit2, Save, Lightbulb } from 'lucide-react';

interface CifrasClaveProps {
  userProfile: 'pf' | 'pm';
  onBack: () => void;
}

export function CifrasClave({ userProfile, onBack }: CifrasClaveProps) {
  const [editMode, setEditMode] = useState(false);
  
  // Cifras para Persona Física
  const [limiteGastosPF, setLimiteGastosPF] = useState('45000');
  const [metaAhorroPF, setMetaAhorroPF] = useState('10000');
  const [limiteDeudaPF, setLimiteDeudaPF] = useState('50000');
  
  // Cifras para Persona Moral
  const [limiteGastosPM, setLimiteGastosPM] = useState('350000');
  const [metaGananciasPM, setMetaGananciasPM] = useState('200000');
  const [limitePerdidaPM, setLimitePerdidaPM] = useState('50000');

  // Datos actuales (simulados)
  const datosActualesPF = {
    gastosActuales: 40000,
    ahorroActual: 9200,
    deudaActual: 35000,
  };

  const datosActualesPM = {
    gastosActuales: 336000,
    gananciasActuales: 180000,
    perdidasActuales: 0,
  };

  const handleSave = () => {
    setEditMode(false);
  };

  const getStatus = (actual: number, limite: number, type: 'gasto' | 'meta' | 'deuda' | 'perdida') => {
    if (type === 'gasto' || type === 'deuda' || type === 'perdida') {
      // Para gastos, deudas y pérdidas: menor es mejor
      const percentage = (actual / limite) * 100;
      if (percentage < 70) return { status: 'ok', color: 'green', text: 'Controlado' };
      if (percentage < 90) return { status: 'warning', color: 'yellow', text: 'Atención' };
      return { status: 'danger', color: 'red', text: 'Excedido' };
    } else {
      // Para metas: mayor es mejor
      const percentage = (actual / limite) * 100;
      if (percentage >= 100) return { status: 'ok', color: 'green', text: 'Cumplido' };
      if (percentage >= 80) return { status: 'warning', color: 'yellow', text: 'Cerca' };
      return { status: 'danger', color: 'red', text: 'Lejos' };
    }
  };

  const getAdvice = () => {
    if (userProfile === 'pf') {
      const gastoStatus = getStatus(datosActualesPF.gastosActuales, parseInt(limiteGastosPF), 'gasto');
      const ahorroStatus = getStatus(datosActualesPF.ahorroActual, parseInt(metaAhorroPF), 'meta');
      const deudaStatus = getStatus(datosActualesPF.deudaActual, parseInt(limiteDeudaPF), 'deuda');

      const consejos = [];
      
      if (gastoStatus.status === 'danger') {
        consejos.push({
          type: 'danger',
          text: 'Tus gastos están cerca del límite. Considera reducir gastos no esenciales este mes.'
        });
      } else if (gastoStatus.status === 'warning') {
        consejos.push({
          type: 'warning',
          text: 'Estás acercándote a tu límite de gastos. Mantén un control estricto en lo que resta del mes.'
        });
      }

      if (ahorroStatus.status === 'danger') {
        consejos.push({
          type: 'danger',
          text: 'No estás cumpliendo tu meta de ahorro. Intenta automatizar tus ahorros al inicio del mes.'
        });
      } else if (ahorroStatus.status === 'ok') {
        consejos.push({
          type: 'success',
          text: '¡Excelente! Estás cumpliendo tu meta de ahorro. Considera incrementarla gradualmente.'
        });
      }

      if (deudaStatus.status === 'ok') {
        consejos.push({
          type: 'success',
          text: 'Tu nivel de deuda está bajo control. Sigue enfocándote en reducirla progresivamente.'
        });
      }

      return consejos;
    } else {
      const gastoStatus = getStatus(datosActualesPM.gastosActuales, parseInt(limiteGastosPM), 'gasto');
      const gananciaStatus = getStatus(datosActualesPM.gananciasActuales, parseInt(metaGananciasPM), 'meta');
      
      const consejos = [];
      
      if (gastoStatus.status === 'danger') {
        consejos.push({
          type: 'danger',
          text: 'Gastos operativos excedidos. Revisa contratos y renegocia con proveedores de inmediato.'
        });
      } else if (gastoStatus.status === 'ok') {
        consejos.push({
          type: 'success',
          text: 'Gastos operativos controlados. Mantén esta disciplina financiera.'
        });
      }

      if (gananciaStatus.status === 'danger') {
        consejos.push({
          type: 'danger',
          text: 'Ganancias por debajo de la meta. Analiza estrategias de incremento de ventas o reducción de costos.'
        });
      } else if (gananciaStatus.status === 'ok') {
        consejos.push({
          type: 'success',
          text: '¡Meta de ganancias alcanzada! Considera reinvertir parte de las utilidades.'
        });
      }

      consejos.push({
        type: 'info',
        text: 'Mantén un flujo de caja positivo reservando al menos el 15% de tus ingresos mensuales.'
      });

      return consejos;
    }
  };

  const renderPFContent = () => {
    const gastoStatus = getStatus(datosActualesPF.gastosActuales, parseInt(limiteGastosPF), 'gasto');
    const ahorroStatus = getStatus(datosActualesPF.ahorroActual, parseInt(metaAhorroPF), 'meta');
    const deudaStatus = getStatus(datosActualesPF.deudaActual, parseInt(limiteDeudaPF), 'deuda');

    return (
      <>
        {/* Límite de Gastos */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 bg-${gastoStatus.color === 'green' ? 'green' : gastoStatus.color === 'yellow' ? 'yellow' : 'red'}-100 rounded-xl flex items-center justify-center`}>
                <TrendingDown className={`w-6 h-6 text-${gastoStatus.color === 'green' ? 'green' : gastoStatus.color === 'yellow' ? 'yellow' : 'red'}-600`} />
              </div>
              <div>
                <h3 className="text-gray-900">Límite de Gastos Mensual</h3>
                <p className="text-xs text-gray-500">Control de egresos</p>
              </div>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs ${
              gastoStatus.color === 'green' ? 'bg-green-100 text-green-700' :
              gastoStatus.color === 'yellow' ? 'bg-yellow-100 text-yellow-700' :
              'bg-red-100 text-red-700'
            }`}>
              {gastoStatus.text}
            </div>
          </div>

          {editMode ? (
            <div className="mb-4">
              <label className="block text-sm text-gray-600 mb-2">Establecer límite</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  value={limiteGastosPF}
                  onChange={(e) => setLimiteGastosPF(e.target.value)}
                  className="w-full bg-gray-50 rounded-xl pl-8 pr-4 py-3 outline-none focus:ring-2 focus:ring-[#FFC72C]"
                />
              </div>
            </div>
          ) : (
            <div className="mb-4">
              <p className="text-2xl text-gray-900 mb-2">${parseInt(limiteGastosPF).toLocaleString()}</p>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                <div 
                  className={`h-3 rounded-full transition-all ${
                    gastoStatus.color === 'green' ? 'bg-green-500' :
                    gastoStatus.color === 'yellow' ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`}
                  style={{ width: `${Math.min((datosActualesPF.gastosActuales / parseInt(limiteGastosPF)) * 100, 100)}%` }}
                />
              </div>
              <p className="text-sm text-gray-600">
                Gastado: ${datosActualesPF.gastosActuales.toLocaleString()} ({Math.round((datosActualesPF.gastosActuales / parseInt(limiteGastosPF)) * 100)}%)
              </p>
            </div>
          )}
        </div>

        {/* Meta de Ahorro */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 bg-${ahorroStatus.color === 'green' ? 'green' : ahorroStatus.color === 'yellow' ? 'yellow' : 'red'}-100 rounded-xl flex items-center justify-center`}>
                <Target className={`w-6 h-6 text-${ahorroStatus.color === 'green' ? 'green' : ahorroStatus.color === 'yellow' ? 'yellow' : 'red'}-600`} />
              </div>
              <div>
                <h3 className="text-gray-900">Meta de Ahorro Mensual</h3>
                <p className="text-xs text-gray-500">Objetivo de ahorro</p>
              </div>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs ${
              ahorroStatus.color === 'green' ? 'bg-green-100 text-green-700' :
              ahorroStatus.color === 'yellow' ? 'bg-yellow-100 text-yellow-700' :
              'bg-red-100 text-red-700'
            }`}>
              {ahorroStatus.text}
            </div>
          </div>

          {editMode ? (
            <div className="mb-4">
              <label className="block text-sm text-gray-600 mb-2">Establecer meta</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  value={metaAhorroPF}
                  onChange={(e) => setMetaAhorroPF(e.target.value)}
                  className="w-full bg-gray-50 rounded-xl pl-8 pr-4 py-3 outline-none focus:ring-2 focus:ring-[#FFC72C]"
                />
              </div>
            </div>
          ) : (
            <div className="mb-4">
              <p className="text-2xl text-gray-900 mb-2">${parseInt(metaAhorroPF).toLocaleString()}</p>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                <div 
                  className={`h-3 rounded-full transition-all ${
                    ahorroStatus.color === 'green' ? 'bg-green-500' :
                    ahorroStatus.color === 'yellow' ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`}
                  style={{ width: `${Math.min((datosActualesPF.ahorroActual / parseInt(metaAhorroPF)) * 100, 100)}%` }}
                />
              </div>
              <p className="text-sm text-gray-600">
                Ahorrado: ${datosActualesPF.ahorroActual.toLocaleString()} ({Math.round((datosActualesPF.ahorroActual / parseInt(metaAhorroPF)) * 100)}%)
              </p>
            </div>
          )}
        </div>

        {/* Límite de Deuda */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 bg-${deudaStatus.color === 'green' ? 'green' : deudaStatus.color === 'yellow' ? 'yellow' : 'red'}-100 rounded-xl flex items-center justify-center`}>
                <AlertCircle className={`w-6 h-6 text-${deudaStatus.color === 'green' ? 'green' : deudaStatus.color === 'yellow' ? 'yellow' : 'red'}-600`} />
              </div>
              <div>
                <h3 className="text-gray-900">Límite de Deuda</h3>
                <p className="text-xs text-gray-500">Deuda máxima aceptable</p>
              </div>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs ${
              deudaStatus.color === 'green' ? 'bg-green-100 text-green-700' :
              deudaStatus.color === 'yellow' ? 'bg-yellow-100 text-yellow-700' :
              'bg-red-100 text-red-700'
            }`}>
              {deudaStatus.text}
            </div>
          </div>

          {editMode ? (
            <div className="mb-4">
              <label className="block text-sm text-gray-600 mb-2">Establecer límite</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  value={limiteDeudaPF}
                  onChange={(e) => setLimiteDeudaPF(e.target.value)}
                  className="w-full bg-gray-50 rounded-xl pl-8 pr-4 py-3 outline-none focus:ring-2 focus:ring-[#FFC72C]"
                />
              </div>
            </div>
          ) : (
            <div className="mb-4">
              <p className="text-2xl text-gray-900 mb-2">${parseInt(limiteDeudaPF).toLocaleString()}</p>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                <div 
                  className={`h-3 rounded-full transition-all ${
                    deudaStatus.color === 'green' ? 'bg-green-500' :
                    deudaStatus.color === 'yellow' ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`}
                  style={{ width: `${Math.min((datosActualesPF.deudaActual / parseInt(limiteDeudaPF)) * 100, 100)}%` }}
                />
              </div>
              <p className="text-sm text-gray-600">
                Deuda actual: ${datosActualesPF.deudaActual.toLocaleString()} ({Math.round((datosActualesPF.deudaActual / parseInt(limiteDeudaPF)) * 100)}%)
              </p>
            </div>
          )}
        </div>
      </>
    );
  };

  const renderPMContent = () => {
    const gastoStatus = getStatus(datosActualesPM.gastosActuales, parseInt(limiteGastosPM), 'gasto');
    const gananciaStatus = getStatus(datosActualesPM.gananciasActuales, parseInt(metaGananciasPM), 'meta');
    const perdidaStatus = getStatus(datosActualesPM.perdidasActuales, parseInt(limitePerdidaPM), 'perdida');

    return (
      <>
        {/* Límite de Gastos Operativos */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 bg-${gastoStatus.color === 'green' ? 'green' : gastoStatus.color === 'yellow' ? 'yellow' : 'red'}-100 rounded-xl flex items-center justify-center`}>
                <TrendingDown className={`w-6 h-6 text-${gastoStatus.color === 'green' ? 'green' : gastoStatus.color === 'yellow' ? 'yellow' : 'red'}-600`} />
              </div>
              <div>
                <h3 className="text-gray-900">Límite Gastos Operativos</h3>
                <p className="text-xs text-gray-500">Control de costos</p>
              </div>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs ${
              gastoStatus.color === 'green' ? 'bg-green-100 text-green-700' :
              gastoStatus.color === 'yellow' ? 'bg-yellow-100 text-yellow-700' :
              'bg-red-100 text-red-700'
            }`}>
              {gastoStatus.text}
            </div>
          </div>

          {editMode ? (
            <div className="mb-4">
              <label className="block text-sm text-gray-600 mb-2">Establecer límite</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  value={limiteGastosPM}
                  onChange={(e) => setLimiteGastosPM(e.target.value)}
                  className="w-full bg-gray-50 rounded-xl pl-8 pr-4 py-3 outline-none focus:ring-2 focus:ring-[#FFC72C]"
                />
              </div>
            </div>
          ) : (
            <div className="mb-4">
              <p className="text-2xl text-gray-900 mb-2">${parseInt(limiteGastosPM).toLocaleString()}</p>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                <div 
                  className={`h-3 rounded-full transition-all ${
                    gastoStatus.color === 'green' ? 'bg-green-500' :
                    gastoStatus.color === 'yellow' ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`}
                  style={{ width: `${Math.min((datosActualesPM.gastosActuales / parseInt(limiteGastosPM)) * 100, 100)}%` }}
                />
              </div>
              <p className="text-sm text-gray-600">
                Gastado: ${datosActualesPM.gastosActuales.toLocaleString()} ({Math.round((datosActualesPM.gastosActuales / parseInt(limiteGastosPM)) * 100)}%)
              </p>
            </div>
          )}
        </div>

        {/* Meta de Ganancias */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 bg-${gananciaStatus.color === 'green' ? 'green' : gananciaStatus.color === 'yellow' ? 'yellow' : 'red'}-100 rounded-xl flex items-center justify-center`}>
                <TrendingUp className={`w-6 h-6 text-${gananciaStatus.color === 'green' ? 'green' : gananciaStatus.color === 'yellow' ? 'yellow' : 'red'}-600`} />
              </div>
              <div>
                <h3 className="text-gray-900">Meta de Ganancias Mensual</h3>
                <p className="text-xs text-gray-500">Utilidad neta objetivo</p>
              </div>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs ${
              gananciaStatus.color === 'green' ? 'bg-green-100 text-green-700' :
              gananciaStatus.color === 'yellow' ? 'bg-yellow-100 text-yellow-700' :
              'bg-red-100 text-red-700'
            }`}>
              {gananciaStatus.text}
            </div>
          </div>

          {editMode ? (
            <div className="mb-4">
              <label className="block text-sm text-gray-600 mb-2">Establecer meta</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  value={metaGananciasPM}
                  onChange={(e) => setMetaGananciasPM(e.target.value)}
                  className="w-full bg-gray-50 rounded-xl pl-8 pr-4 py-3 outline-none focus:ring-2 focus:ring-[#FFC72C]"
                />
              </div>
            </div>
          ) : (
            <div className="mb-4">
              <p className="text-2xl text-gray-900 mb-2">${parseInt(metaGananciasPM).toLocaleString()}</p>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                <div 
                  className={`h-3 rounded-full transition-all ${
                    gananciaStatus.color === 'green' ? 'bg-green-500' :
                    gananciaStatus.color === 'yellow' ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`}
                  style={{ width: `${Math.min((datosActualesPM.gananciasActuales / parseInt(metaGananciasPM)) * 100, 100)}%` }}
                />
              </div>
              <p className="text-sm text-gray-600">
                Ganancia: ${datosActualesPM.gananciasActuales.toLocaleString()} ({Math.round((datosActualesPM.gananciasActuales / parseInt(metaGananciasPM)) * 100)}%)
              </p>
            </div>
          )}
        </div>

        {/* Límite de Pérdidas */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 bg-${perdidaStatus.color === 'green' ? 'green' : perdidaStatus.color === 'yellow' ? 'yellow' : 'red'}-100 rounded-xl flex items-center justify-center`}>
                <AlertCircle className={`w-6 h-6 text-${perdidaStatus.color === 'green' ? 'green' : perdidaStatus.color === 'yellow' ? 'yellow' : 'red'}-600`} />
              </div>
              <div>
                <h3 className="text-gray-900">Límite de Pérdidas</h3>
                <p className="text-xs text-gray-500">Pérdida máxima aceptable</p>
              </div>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs ${
              perdidaStatus.color === 'green' ? 'bg-green-100 text-green-700' :
              perdidaStatus.color === 'yellow' ? 'bg-yellow-100 text-yellow-700' :
              'bg-red-100 text-red-700'
            }`}>
              {perdidaStatus.text}
            </div>
          </div>

          {editMode ? (
            <div className="mb-4">
              <label className="block text-sm text-gray-600 mb-2">Establecer límite</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  value={limitePerdidaPM}
                  onChange={(e) => setLimitePerdidaPM(e.target.value)}
                  className="w-full bg-gray-50 rounded-xl pl-8 pr-4 py-3 outline-none focus:ring-2 focus:ring-[#FFC72C]"
                />
              </div>
            </div>
          ) : (
            <div className="mb-4">
              <p className="text-2xl text-gray-900 mb-2">${parseInt(limitePerdidaPM).toLocaleString()}</p>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                <div 
                  className={`h-3 rounded-full transition-all ${
                    perdidaStatus.color === 'green' ? 'bg-green-500' :
                    perdidaStatus.color === 'yellow' ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`}
                  style={{ width: `${Math.min((datosActualesPM.perdidasActuales / parseInt(limitePerdidaPM)) * 100, 100)}%` }}
                />
              </div>
              <p className="text-sm text-gray-600">
                Pérdidas: ${datosActualesPM.perdidasActuales.toLocaleString()} ({Math.round((datosActualesPM.perdidasActuales / parseInt(limitePerdidaPM)) * 100)}%)
              </p>
            </div>
          )}
        </div>
      </>
    );
  };

  const consejos = getAdvice();

  return (
    <div className="min-h-full bg-[#F5F5F5] pb-6">
      {/* Header */}
      <div className="bg-[#ED1C24] text-white px-6 pt-14 pb-6 rounded-b-3xl shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <button 
            onClick={onBack}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h1 className="text-2xl">Cifras Clave</h1>
            <p className="text-sm opacity-90">Gestión y seguimiento</p>
          </div>
          <button
            onClick={() => editMode ? handleSave() : setEditMode(true)}
            className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full flex items-center gap-2 hover:bg-white/30 transition-colors"
          >
            {editMode ? (
              <>
                <Save className="w-4 h-4" />
                <span className="text-sm">Guardar</span>
              </>
            ) : (
              <>
                <Edit2 className="w-4 h-4" />
                <span className="text-sm">Editar</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 mt-6 space-y-4">
        {/* Consejos Personalizados */}
        {consejos.length > 0 && (
          <div className="bg-gradient-to-r from-[#FFF8DC] to-[#FFFAED] rounded-2xl p-5 shadow-sm border-l-4 border-[#FFC72C]">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="w-5 h-5 text-[#FFC72C]" />
              <h3 className="text-gray-900">Consejería Personalizada</h3>
            </div>
            <div className="space-y-2">
              {consejos.map((consejo, index) => (
                <div 
                  key={index}
                  className={`flex items-start gap-2 p-3 rounded-lg ${
                    consejo.type === 'success' ? 'bg-green-50' :
                    consejo.type === 'warning' ? 'bg-yellow-50' :
                    consejo.type === 'danger' ? 'bg-red-50' :
                    'bg-blue-50'
                  }`}
                >
                  {consejo.type === 'success' && <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />}
                  {consejo.type === 'warning' && <AlertCircle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />}
                  {consejo.type === 'danger' && <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />}
                  {consejo.type === 'info' && <Lightbulb className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />}
                  <p className="text-sm text-gray-700 leading-relaxed">{consejo.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Cifras Cards */}
        {userProfile === 'pf' ? renderPFContent() : renderPMContent()}
      </div>
    </div>
  );
}
