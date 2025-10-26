import { ArrowLeft, FileText, Mail, Brain, CheckCircle2, Database, FileBarChart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';

export function ReporteContador() {
  const [isProcessing, setIsProcessing] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);

  const processingSteps = [
    'Consolidando 5 cuentas bancarias...',
    'Ejecutando lógica de P&G...',
    'Calculando estructura fiscal...',
    'Generando análisis de flujo de caja...',
    'Preparando documentación legal...',
    'Finalizando reporte consolidado...'
  ];

  useEffect(() => {
    if (isProcessing) {
      const interval = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= processingSteps.length - 1) {
            clearInterval(interval);
            setTimeout(() => setIsProcessing(false), 800);
            return prev;
          }
          return prev + 1;
        });
      }, 600);

      return () => clearInterval(interval);
    }
  }, [isProcessing]);

  return (
    <div className="min-h-full bg-[#F5F5F5]">
      {/* Header */}
      <div className="bg-white px-6 pt-14 pb-4 shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100">
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <div className="flex-1">
            <h2 className="text-gray-900">Reporte Contador</h2>
            <p className="text-sm text-gray-500">Generación automática con IA</p>
          </div>
        </div>
      </div>

      <div className="px-6 py-8">
        <AnimatePresence mode="wait">
          {isProcessing ? (
            <motion.div
              key="processing"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <div className="flex flex-col items-center text-center">
                {/* AI Brain Animation */}
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="w-24 h-24 bg-gradient-to-br from-[#FFC72C] to-[#FFD147] rounded-full flex items-center justify-center mb-6 shadow-lg"
                >
                  <Brain className="w-12 h-12 text-white" />
                </motion.div>

                <h3 className="text-xl text-gray-900 mb-4">Procesando Información</h3>

                {/* Processing Steps */}
                <div className="w-full space-y-3 mb-6">
                  {processingSteps.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ 
                        opacity: index <= currentStep ? 1 : 0.3,
                        x: 0
                      }}
                      className="flex items-center gap-3"
                    >
                      {index < currentStep ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                      ) : index === currentStep ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-[#FFC72C] border-t-transparent rounded-full flex-shrink-0"
                        />
                      ) : (
                        <div className="w-5 h-5 border-2 border-gray-300 rounded-full flex-shrink-0" />
                      )}
                      <p className={`text-sm text-left ${index <= currentStep ? 'text-gray-900' : 'text-gray-400'}`}>
                        {step}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <motion.div
                    className="bg-[#FFC72C] h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentStep + 1) / processingSteps.length) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <p className="text-sm text-gray-500">
                  {Math.round(((currentStep + 1) / processingSteps.length) * 100)}% completado
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="complete"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {/* Success Message */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="bg-green-50 border-2 border-green-500 rounded-2xl p-6 text-center"
              >
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl text-gray-900 mb-2">¡Reporte Generado!</h3>
                <p className="text-sm text-gray-600">
                  Maya ha consolidado toda tu información financiera
                </p>
              </motion.div>

              {/* Report Card */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <FileText className="w-8 h-8 text-[#ED1C24]" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-gray-900 mb-1">Reporte Legal Consolidado</h4>
                    <p className="text-sm text-gray-500 mb-2">Q3 2025 • TechSolutions SA de CV</p>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <FileBarChart className="w-4 h-4" />
                        47 páginas
                      </span>
                      <span className="flex items-center gap-1">
                        <Database className="w-4 h-4" />
                        5 cuentas
                      </span>
                    </div>
                  </div>
                </div>

                {/* Report Sections */}
                <div className="space-y-2 mb-6">
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-sm text-gray-700">✓ Estado de resultados consolidado</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-sm text-gray-700">✓ Balance general auditado</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-sm text-gray-700">✓ Flujo de efectivo proyectado</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-sm text-gray-700">✓ Análisis de estructura fiscal</p>
                  </div>
                </div>

                {/* Email Button */}
                <button className="w-full bg-green-500 text-white py-4 rounded-xl shadow-md hover:bg-green-600 transition-colors flex items-center justify-center gap-2">
                  <Mail className="w-5 h-5" />
                  Enviar al Contador y Obtener Tranquilidad
                </button>
              </div>

              {/* Additional Info */}
              <div className="bg-[#FFF8DC] rounded-2xl p-4 border border-[#FFC72C]">
                <p className="text-sm text-gray-700">
                  💡 <span className="font-semibold">Tip de Maya:</span> Este reporte cumple con todos 
                  los requisitos fiscales y contables vigentes en México.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
