import { ArrowLeft, Send, Brain, Calculator, Lightbulb, X, TrendingUp, TrendingDown, PiggyBank, CreditCard } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useState } from 'react';

const simulationData = [
  { mes: 'Nov', actual: 49000, simulado: 49000 },
  { mes: 'Dic', actual: 48500, simulado: 50200 },
  { mes: 'Ene', actual: 47800, simulado: 51500 },
  { mes: 'Feb', actual: null, simulado: 52800 },
  { mes: 'Mar', actual: null, simulado: 54200 },
  { mes: 'Abr', actual: null, simulado: 55800 },
];

interface Message {
  id: number;
  type: 'user' | 'ai';
  text: string;
  chart?: boolean;
  calculator?: 'prestamo' | 'inversion' | 'hipoteca' | 'ahorro';
}

export function ChatAsistente() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'ai',
      text: '¡Hola! Soy Maya, tu asistente de FinancIA. ¿En qué puedo ayudarte hoy?',
    },
    {
      id: 2,
      type: 'user',
      text: '¿Qué pasaría si ahorro $1,500 más al mes?',
    },
    {
      id: 3,
      type: 'ai',
      text: 'Excelente pregunta. He simulado tu flujo de caja si ahorras $1,500 adicionales cada mes. Aquí está la proyección:',
      chart: true,
    },
  ]);

  const [inputText, setInputText] = useState('');
  const [showCalculatorMenu, setShowCalculatorMenu] = useState(false);
  const [showWhatIf, setShowWhatIf] = useState(false);
  const [activeCalculator, setActiveCalculator] = useState<string | null>(null);
  
  // What-If States
  const [whatIfType, setWhatIfType] = useState<'ahorro' | 'gasto' | 'inversion' | 'deuda'>('ahorro');
  const [whatIfAmount, setWhatIfAmount] = useState('');
  const [whatIfMonths, setWhatIfMonths] = useState('6');

  // Financial Calculator States
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [downPayment, setDownPayment] = useState('');

  const handleSend = () => {
    if (inputText.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        type: 'user',
        text: inputText,
      };
      setMessages([...messages, newMessage]);
      setInputText('');

      // Simulate AI response
      setTimeout(() => {
        const aiResponse: Message = {
          id: messages.length + 2,
          type: 'ai',
          text: 'Déjame analizar eso para ti. Un momento...',
        };
        setMessages((prev) => [...prev, aiResponse]);
      }, 1000);
    }
  };

  // Activate financial calculator
  const activateCalculator = (type: 'prestamo' | 'inversion' | 'hipoteca' | 'ahorro') => {
    const calculatorNames = {
      prestamo: 'Calculadora de Préstamo',
      inversion: 'Calculadora de Inversión',
      hipoteca: 'Calculadora de Hipoteca',
      ahorro: 'Calculadora de Ahorro'
    };

    const userMsg: Message = {
      id: messages.length + 1,
      type: 'user',
      text: `Quiero usar la ${calculatorNames[type]}`,
    };

    const aiMsg: Message = {
      id: messages.length + 2,
      type: 'ai',
      text: `Perfecto! Voy a ayudarte con el cálculo. Completa los siguientes datos:`,
      calculator: type,
    };

    setMessages([...messages, userMsg, aiMsg]);
    setShowCalculatorMenu(false);
    setActiveCalculator(type);
  };

  // Close active calculator
  const closeCalculator = () => {
    setActiveCalculator(null);
    setLoanAmount('');
    setInterestRate('');
    setLoanTerm('');
    setDownPayment('');

    const aiMsg: Message = {
      id: messages.length + 1,
      type: 'ai',
      text: '¿En qué más puedo ayudarte?',
    };
    setMessages([...messages, aiMsg]);
  };

  // Calculate loan payment
  const calculateLoan = () => {
    const principal = parseFloat(loanAmount) || 0;
    const rate = parseFloat(interestRate) / 100 / 12 || 0;
    const term = parseFloat(loanTerm) || 0;
    const down = parseFloat(downPayment) || 0;

    const loanPrincipal = principal - down;
    const monthlyPayment = rate === 0 
      ? loanPrincipal / term 
      : (loanPrincipal * rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1);

    const totalPayment = monthlyPayment * term;
    const totalInterest = totalPayment - loanPrincipal;

    const resultMsg: Message = {
      id: messages.length + 1,
      type: 'ai',
      text: `📊 **Resultados del Cálculo:**\n\n**Monto del préstamo:** $${loanPrincipal.toLocaleString('es-MX', { minimumFractionDigits: 2 })}\n**Pago mensual:** $${monthlyPayment.toLocaleString('es-MX', { minimumFractionDigits: 2 })}\n**Total a pagar:** $${totalPayment.toLocaleString('es-MX', { minimumFractionDigits: 2 })}\n**Intereses totales:** $${totalInterest.toLocaleString('es-MX', { minimumFractionDigits: 2 })}\n\nCon una tasa del ${interestRate}% anual durante ${loanTerm} meses.`,
    };

    setMessages([...messages, resultMsg]);
    // Reset fields
    setLoanAmount('');
    setInterestRate('');
    setLoanTerm('');
    setDownPayment('');
  };

  // What-If simulation
  const runWhatIfSimulation = () => {
    const amount = parseFloat(whatIfAmount) || 0;
    const months = parseInt(whatIfMonths) || 6;
    
    let resultText = '';
    if (whatIfType === 'ahorro') {
      const total = amount * months;
      resultText = `Si ahorras $${amount.toLocaleString()} mensuales durante ${months} meses, acumularás $${total.toLocaleString()}.`;
    } else if (whatIfType === 'gasto') {
      const total = amount * months;
      resultText = `Si reduces tus gastos en $${amount.toLocaleString()} al mes, ahorrarás $${total.toLocaleString()} en ${months} meses.`;
    } else if (whatIfType === 'inversion') {
      const rate = 0.08 / 12; // 8% anual
      let total = 0;
      for (let i = 0; i < months; i++) {
        total = (total + amount) * (1 + rate);
      }
      resultText = `Invirtiendo $${amount.toLocaleString()} mensuales al 8% anual durante ${months} meses, tendrás aproximadamente $${Math.round(total).toLocaleString()}.`;
    } else if (whatIfType === 'deuda') {
      const monthlyPayment = amount;
      const totalDebt = 50000; // Ejemplo
      const monthsToPayOff = Math.ceil(totalDebt / monthlyPayment);
      resultText = `Pagando $${amount.toLocaleString()} mensuales, liquidarás tu deuda en aproximadamente ${monthsToPayOff} meses.`;
    }

    const userMsg: Message = {
      id: messages.length + 1,
      type: 'user',
      text: `Simular: ${whatIfType} de $${amount.toLocaleString()} por ${months} meses`,
    };

    const aiMsg: Message = {
      id: messages.length + 2,
      type: 'ai',
      text: resultText,
    };

    setMessages([...messages, userMsg, aiMsg]);
    setShowWhatIf(false);
    setWhatIfAmount('');
  };

  return (
    <div className="min-h-full bg-[#F5F5F5] flex flex-col">
      {/* Header */}
      <div className="bg-white px-6 pt-14 pb-4 shadow-sm">
        <div className="flex items-center gap-3">
          <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100">
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <div className="flex items-center gap-3 flex-1">
            <div className="w-10 h-10 bg-gradient-to-br from-[#FFC72C] to-[#FFD147] rounded-full flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-gray-900">Maya</h2>
              <p className="text-xs text-green-500">● En línea</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setShowCalculatorMenu(true)}
              className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <Calculator className="w-4 h-4 text-gray-700" />
            </button>
            <button 
              onClick={() => setShowWhatIf(true)}
              className="w-9 h-9 bg-[#FFC72C] rounded-full flex items-center justify-center hover:bg-[#FFD147] transition-colors"
            >
              <Lightbulb className="w-4 h-4 text-gray-900" />
            </button>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                message.type === 'user'
                  ? 'bg-gray-200 text-gray-900'
                  : 'bg-green-100 text-gray-900'
              }`}
            >
              {message.type === 'ai' && (
                <div className="flex items-center gap-2 mb-2">
                  <Brain className="w-4 h-4 text-green-600" />
                  <span className="text-xs text-green-600">Maya</span>
                </div>
              )}
              <p className="text-sm leading-relaxed whitespace-pre-line">{message.text}</p>

              {/* Financial Calculator Form */}
              {message.calculator === 'prestamo' && (
                <div className="mt-4 bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Monto del préstamo</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">$</span>
                        <input
                          type="number"
                          value={loanAmount}
                          onChange={(e) => setLoanAmount(e.target.value)}
                          placeholder="50,000"
                          className="w-full bg-gray-50 rounded-lg pl-8 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#FFC72C]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Tasa de interés anual (%)</label>
                      <input
                        type="number"
                        value={interestRate}
                        onChange={(e) => setInterestRate(e.target.value)}
                        placeholder="12"
                        step="0.1"
                        className="w-full bg-gray-50 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#FFC72C]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Plazo (meses)</label>
                      <input
                        type="number"
                        value={loanTerm}
                        onChange={(e) => setLoanTerm(e.target.value)}
                        placeholder="24"
                        className="w-full bg-gray-50 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#FFC72C]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Pago inicial (opcional)</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">$</span>
                        <input
                          type="number"
                          value={downPayment}
                          onChange={(e) => setDownPayment(e.target.value)}
                          placeholder="0"
                          className="w-full bg-gray-50 rounded-lg pl-8 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#FFC72C]"
                        />
                      </div>
                    </div>

                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={calculateLoan}
                        disabled={!loanAmount || !interestRate || !loanTerm}
                        className="flex-1 bg-[#FFC72C] text-gray-900 py-2.5 rounded-lg hover:bg-[#FFD147] transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm flex items-center justify-center"
                      >
                        Calcular
                      </button>
                      <button
                        onClick={closeCalculator}
                        className="px-4 bg-gray-100 text-gray-700 py-2.5 rounded-lg hover:bg-gray-200 transition-colors text-sm flex items-center justify-center"
                      >
                        Cerrar
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {message.calculator === 'inversion' && (
                <div className="mt-4 bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                  <p className="text-xs text-gray-600 mb-3">Calculadora de inversión próximamente...</p>
                  <button
                    onClick={closeCalculator}
                    className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                  >
                    Cerrar
                  </button>
                </div>
              )}

              {message.calculator === 'hipoteca' && (
                <div className="mt-4 bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                  <p className="text-xs text-gray-600 mb-3">Calculadora de hipoteca próximamente...</p>
                  <button
                    onClick={closeCalculator}
                    className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                  >
                    Cerrar
                  </button>
                </div>
              )}

              {message.calculator === 'ahorro' && (
                <div className="mt-4 bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                  <p className="text-xs text-gray-600 mb-3">Calculadora de ahorro próximamente...</p>
                  <button
                    onClick={closeCalculator}
                    className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                  >
                    Cerrar
                  </button>
                </div>
              )}

              {/* Embedded Chart */}
              {message.chart && (
                <div className="mt-4 bg-white rounded-xl p-3 shadow-sm">
                  <h4 className="text-sm text-gray-900 mb-3">Proyección de Flujo de Caja</h4>
                  <ResponsiveContainer width="100%" height={180}>
                    <LineChart data={simulationData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="mes" tick={{ fontSize: 10 }} />
                      <YAxis tick={{ fontSize: 10 }} tickFormatter={(value) => `${value/1000}k`} />
                      <Tooltip 
                        formatter={(value: any) => `$${value.toLocaleString()}`}
                        contentStyle={{ fontSize: '12px' }}
                      />
                      <Line
                        type="monotone"
                        dataKey="actual"
                        stroke="#94A3B8"
                        strokeWidth={2}
                        name="Flujo Actual"
                        dot={{ r: 3 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="simulado"
                        stroke="#10B981"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        name="Con Ahorro Extra"
                        dot={{ r: 3 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                  <div className="mt-3 bg-green-50 rounded-lg p-2">
                    <p className="text-xs text-gray-700">
                      <span className="font-semibold text-green-600">Resultado:</span> En 6 meses 
                      tendrás $9,000 adicionales, alcanzando $55,800 en ahorro total.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 px-6 py-4 pb-20">
        {/* Active Calculator Indicator */}
        {activeCalculator && (
          <div className="mb-3 bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calculator className="w-4 h-4 text-yellow-600" />
              <p className="text-xs text-gray-700">Modo calculadora activo</p>
            </div>
            <button
              onClick={closeCalculator}
              className="text-xs text-[#ED1C24] hover:underline"
            >
              Cerrar
            </button>
          </div>
        )}

        <div className="flex items-center gap-3">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Pregunta algo sobre tus finanzas..."
            className="flex-1 bg-gray-100 rounded-full px-5 py-3 text-sm outline-none focus:ring-2 focus:ring-[#FFC72C] transition-all"
          />
          <button
            onClick={handleSend}
            className="w-12 h-12 bg-[#FFC72C] rounded-full flex items-center justify-center hover:bg-[#FFD147] transition-colors shadow-md"
          >
            <Send className="w-5 h-5 text-gray-900" />
          </button>
        </div>

        {/* Quick Suggestions */}
        {!activeCalculator && (
          <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
            <button className="px-4 py-2 bg-gray-100 rounded-full text-xs text-gray-700 hover:bg-gray-200 transition-colors whitespace-nowrap flex items-center justify-center">
              ¿Cómo reducir gastos?
            </button>
            <button className="px-4 py-2 bg-gray-100 rounded-full text-xs text-gray-700 hover:bg-gray-200 transition-colors whitespace-nowrap flex items-center justify-center">
              Simular ahorro
            </button>
            <button className="px-4 py-2 bg-gray-100 rounded-full text-xs text-gray-700 hover:bg-gray-200 transition-colors whitespace-nowrap flex items-center justify-center">
              Meta de inversión
            </button>
          </div>
        )}
      </div>

      {/* Calculator Menu Modal */}
      {showCalculatorMenu && (
        <div className="fixed inset-0 bg-black/50 flex items-end z-50">
          <div className="w-full bg-white rounded-t-3xl p-6 pb-32 animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-[#ED1C24]" />
                <h3 className="text-gray-900">Calculadoras Financieras</h3>
              </div>
              <button
                onClick={() => setShowCalculatorMenu(false)}
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200"
              >
                <X className="w-4 h-4 text-gray-700" />
              </button>
            </div>

            <p className="text-sm text-gray-600 mb-6">
              Selecciona el tipo de cálculo que necesitas realizar
            </p>

            <div className="space-y-3">
              <button
                onClick={() => activateCalculator('prestamo')}
                className="w-full bg-white border-2 border-gray-200 rounded-xl p-4 hover:border-[#FFC72C] hover:bg-yellow-50 transition-all text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-gray-900 mb-1">Préstamo Personal</h4>
                    <p className="text-xs text-gray-500">Calcula pagos mensuales e intereses</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => activateCalculator('hipoteca')}
                className="w-full bg-white border-2 border-gray-200 rounded-xl p-4 hover:border-[#FFC72C] hover:bg-yellow-50 transition-all text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-gray-900 mb-1">Hipoteca</h4>
                    <p className="text-xs text-gray-500">Calcula tu crédito hipotecario</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => activateCalculator('inversion')}
                className="w-full bg-white border-2 border-gray-200 rounded-xl p-4 hover:border-[#FFC72C] hover:bg-yellow-50 transition-all text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-gray-900 mb-1">Inversión</h4>
                    <p className="text-xs text-gray-500">Proyecta rendimientos futuros</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => activateCalculator('ahorro')}
                className="w-full bg-white border-2 border-gray-200 rounded-xl p-4 hover:border-[#FFC72C] hover:bg-yellow-50 transition-all text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <PiggyBank className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-gray-900 mb-1">Meta de Ahorro</h4>
                    <p className="text-xs text-gray-500">Planifica tus ahorros mensuales</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* What-If Simulator Modal */}
      {showWhatIf && (
        <div className="fixed inset-0 bg-black/50 flex items-end z-50">
          <div className="w-full bg-white rounded-t-3xl p-6 pb-32 animate-slide-up max-h-[75vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-[#FFC72C]" />
                <h3 className="text-gray-900">Simulador What-If</h3>
              </div>
              <button
                onClick={() => setShowWhatIf(false)}
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200"
              >
                <X className="w-4 h-4 text-gray-700" />
              </button>
            </div>

            <p className="text-sm text-gray-600 mb-6">
              Explora diferentes escenarios financieros y descubre cómo impactan tu economía
            </p>

            {/* Scenario Type Selector */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button
                onClick={() => setWhatIfType('ahorro')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  whatIfType === 'ahorro'
                    ? 'border-[#FFC72C] bg-yellow-50'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <PiggyBank className={`w-6 h-6 mb-2 mx-auto ${
                  whatIfType === 'ahorro' ? 'text-[#FFC72C]' : 'text-gray-400'
                }`} />
                <p className="text-sm text-gray-900">Ahorro</p>
              </button>

              <button
                onClick={() => setWhatIfType('gasto')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  whatIfType === 'gasto'
                    ? 'border-[#FFC72C] bg-yellow-50'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <TrendingDown className={`w-6 h-6 mb-2 mx-auto ${
                  whatIfType === 'gasto' ? 'text-[#FFC72C]' : 'text-gray-400'
                }`} />
                <p className="text-sm text-gray-900">Reducir Gasto</p>
              </button>

              <button
                onClick={() => setWhatIfType('inversion')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  whatIfType === 'inversion'
                    ? 'border-[#FFC72C] bg-yellow-50'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <TrendingUp className={`w-6 h-6 mb-2 mx-auto ${
                  whatIfType === 'inversion' ? 'text-[#FFC72C]' : 'text-gray-400'
                }`} />
                <p className="text-sm text-gray-900">Inversión</p>
              </button>

              <button
                onClick={() => setWhatIfType('deuda')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  whatIfType === 'deuda'
                    ? 'border-[#FFC72C] bg-yellow-50'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <CreditCard className={`w-6 h-6 mb-2 mx-auto ${
                  whatIfType === 'deuda' ? 'text-[#FFC72C]' : 'text-gray-400'
                }`} />
                <p className="text-sm text-gray-900">Pagar Deuda</p>
              </button>
            </div>

            {/* Input Fields */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Monto mensual
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    value={whatIfAmount}
                    onChange={(e) => setWhatIfAmount(e.target.value)}
                    placeholder="0"
                    className="w-full bg-gray-100 rounded-xl px-10 py-3 text-gray-900 outline-none focus:ring-2 focus:ring-[#FFC72C]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Periodo (meses)
                </label>
                <input
                  type="number"
                  value={whatIfMonths}
                  onChange={(e) => setWhatIfMonths(e.target.value)}
                  placeholder="6"
                  className="w-full bg-gray-100 rounded-xl px-4 py-3 text-gray-900 outline-none focus:ring-2 focus:ring-[#FFC72C]"
                />
              </div>
            </div>

            <button
              onClick={runWhatIfSimulation}
              disabled={!whatIfAmount}
              className="w-full bg-[#FFC72C] text-gray-900 py-4 rounded-xl hover:bg-[#FFD147] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              Simular Escenario
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
