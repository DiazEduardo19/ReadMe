import { ArrowLeft, GripVertical, Briefcase, Home, Zap, Users, ShoppingCart, Lock, Settings, Unlock, Trash2, X } from 'lucide-react';
import { useState } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface GastoItem {
  id: string;
  categoria: string;
  monto: number;
  icon: any;
  tipo: 'pf' | 'pm';
  locked: boolean;
}

interface PriorizacionGastosProps {
  userProfile: 'pf' | 'pm';
}

function SortableItem({ item, index, onOpenSettings }: { item: GastoItem; index: number; onOpenSettings: (item: GastoItem) => void }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const Icon = item.icon;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-white rounded-2xl p-4 shadow-sm border-2 ${
        isDragging ? 'border-[#FFC72C]' : item.locked ? 'border-red-200' : 'border-transparent'
      } ${item.locked ? 'bg-red-50/50' : ''} cursor-move`}
    >
      <div className="flex items-center gap-3">
        <div
          {...attributes}
          {...listeners}
          className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center cursor-grab active:cursor-grabbing flex-shrink-0"
        >
          <GripVertical className="w-5 h-5 text-gray-400" />
        </div>

        <div className="w-11 h-11 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
          <Icon className="w-5 h-5 text-blue-600" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <h4 className="text-gray-900 truncate">{item.categoria}</h4>
            {item.locked && (
              <Lock className="w-4 h-4 text-[#ED1C24] flex-shrink-0" />
            )}
          </div>
          <p className="text-sm text-gray-500 truncate">${item.monto.toLocaleString()}/mes</p>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => onOpenSettings(item)}
            className="w-9 h-9 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <Settings className="w-4 h-4 text-gray-600" />
          </button>

          <div className="w-11 h-11 bg-[#FFC72C] rounded-full flex items-center justify-center">
            <span className="text-gray-900">{index + 1}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PriorizacionGastos({ userProfile }: PriorizacionGastosProps) {
  const [gastosPF] = useState<GastoItem[]>([
    { id: '1', categoria: 'Renta/Hipoteca', monto: 12000, icon: Home, tipo: 'pf', locked: true },
    { id: '2', categoria: 'Alimentación', monto: 8000, icon: ShoppingCart, tipo: 'pf', locked: true },
    { id: '3', categoria: 'Servicios Básicos', monto: 2500, icon: Zap, tipo: 'pf', locked: false },
    { id: '4', categoria: 'Transporte', monto: 3500, icon: Briefcase, tipo: 'pf', locked: false },
    { id: '5', categoria: 'Entretenimiento', monto: 2000, icon: Users, tipo: 'pf', locked: false },
  ]);

  const [gastosPM] = useState<GastoItem[]>([
    { id: 'pm1', categoria: 'Nómina', monto: 450000, icon: Users, tipo: 'pm', locked: true },
    { id: 'pm2', categoria: 'Operaciones', monto: 280000, icon: Briefcase, tipo: 'pm', locked: true },
    { id: 'pm3', categoria: 'Tecnología/IT', monto: 120000, icon: Zap, tipo: 'pm', locked: false },
    { id: 'pm4', categoria: 'Marketing', monto: 85000, icon: ShoppingCart, tipo: 'pm', locked: false },
    { id: 'pm5', categoria: 'Infraestructura', monto: 95000, icon: Home, tipo: 'pm', locked: false },
  ]);

  const [itemsPF, setItemsPF] = useState(gastosPF);
  const [itemsPM, setItemsPM] = useState(gastosPM);
  const [selectedItem, setSelectedItem] = useState<GastoItem | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      if (userProfile === 'pf') {
        setItemsPF((items) => {
          const oldIndex = items.findIndex((item) => item.id === active.id);
          const newIndex = items.findIndex((item) => item.id === over.id);
          const draggedItem = items[oldIndex];
          
          // Si el item está bloqueado y se intenta mover hacia abajo (menor prioridad), no permitir
          if (draggedItem.locked && newIndex > oldIndex) {
            return items;
          }
          
          return arrayMove(items, oldIndex, newIndex);
        });
      } else {
        setItemsPM((items) => {
          const oldIndex = items.findIndex((item) => item.id === active.id);
          const newIndex = items.findIndex((item) => item.id === over.id);
          const draggedItem = items[oldIndex];
          
          // Si el item está bloqueado y se intenta mover hacia abajo (menor prioridad), no permitir
          if (draggedItem.locked && newIndex > oldIndex) {
            return items;
          }
          
          return arrayMove(items, oldIndex, newIndex);
        });
      }
    }
  };

  const handleToggleLock = (itemId: string) => {
    if (userProfile === 'pf') {
      setItemsPF((items) =>
        items.map((item) =>
          item.id === itemId ? { ...item, locked: !item.locked } : item
        )
      );
    } else {
      setItemsPM((items) =>
        items.map((item) =>
          item.id === itemId ? { ...item, locked: !item.locked } : item
        )
      );
    }
  };

  const handleDeleteItem = (itemId: string) => {
    if (userProfile === 'pf') {
      setItemsPF((items) => items.filter((item) => item.id !== itemId));
    } else {
      setItemsPM((items) => items.filter((item) => item.id !== itemId));
    }
    setSelectedItem(null);
  };

  const currentItems = userProfile === 'pf' ? itemsPF : itemsPM;

  return (
    <div className="min-h-full bg-[#F5F5F5] relative">
      {/* Header */}
      <div className="bg-white px-6 pt-14 pb-4 shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100">
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <div className="flex-1">
            <h2 className="text-gray-900">Priorización de Gastos</h2>
            <p className="text-sm text-gray-500">
              {userProfile === 'pf' ? 'Gastos personales' : 'Líneas presupuestales'}
            </p>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="px-6 py-4">
        <div className="bg-[#FFF8DC] rounded-2xl p-4 border border-[#FFC72C]">
          <p className="text-sm text-gray-700 mb-2">
            💡 <span className="font-semibold">Instrucciones:</span> Mantén presionado el ícono de 
            líneas y arrastra cada tarjeta para ordenar tus gastos del más al menos importante.
          </p>
          <p className="text-xs text-gray-600 flex items-center gap-2">
            <Lock className="w-3 h-3 text-[#ED1C24]" />
            Los gastos bloqueados no pueden bajar de prioridad, pero puedes configurarlos tocando el ícono de ajustes.
          </p>
        </div>
      </div>

      {/* Sortable List */}
      <div className="px-6 pb-32">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={currentItems.map((item) => item.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-3">
              {currentItems.map((item, index) => (
                <SortableItem 
                  key={item.id} 
                  item={item} 
                  index={index} 
                  onOpenSettings={setSelectedItem}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>

      {/* Settings Modal */}
      {selectedItem && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end">
          <div className="bg-white rounded-t-3xl w-full max-h-[75vh] overflow-y-auto pb-6">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-gray-900">Configuración de Gasto</h2>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              <p className="text-sm text-gray-500">
                {selectedItem.categoria}
              </p>
            </div>

            {/* Modal Content */}
            <div className="px-6 py-6 space-y-6">
              {/* Category Info */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center">
                    {(() => {
                      const Icon = selectedItem.icon;
                      return <Icon className="w-8 h-8 text-blue-600" />;
                    })()}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-gray-900 mb-1">{selectedItem.categoria}</h3>
                    <p className="text-sm text-gray-600">
                      ${selectedItem.monto.toLocaleString()} MXN/mes
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 bg-white/60 rounded-xl px-4 py-3">
                  {selectedItem.locked ? (
                    <>
                      <Lock className="w-5 h-5 text-[#ED1C24]" />
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">Gasto bloqueado</p>
                        <p className="text-xs text-gray-600">No puede bajar de prioridad</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <Unlock className="w-5 h-5 text-green-600" />
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">Gasto desbloqueado</p>
                        <p className="text-xs text-gray-600">Se puede reorganizar libremente</p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Lock/Unlock Action */}
              <div>
                <h3 className="text-gray-500 text-sm mb-3">Acciones</h3>
                <button
                  onClick={() => {
                    handleToggleLock(selectedItem.id);
                    setSelectedItem((prev) => prev ? { ...prev, locked: !prev.locked } : null);
                  }}
                  className={`w-full rounded-2xl p-4 flex items-center gap-4 transition-colors ${
                    selectedItem.locked 
                      ? 'bg-green-50 hover:bg-green-100 border-2 border-green-200' 
                      : 'bg-red-50 hover:bg-red-100 border-2 border-red-200'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    selectedItem.locked ? 'bg-green-500' : 'bg-[#ED1C24]'
                  }`}>
                    {selectedItem.locked ? (
                      <Unlock className="w-6 h-6 text-white" />
                    ) : (
                      <Lock className="w-6 h-6 text-white" />
                    )}
                  </div>
                  <div className="flex-1 text-left">
                    <p className={`text-sm ${selectedItem.locked ? 'text-green-900' : 'text-red-900'}`}>
                      {selectedItem.locked ? 'Desbloquear gasto' : 'Bloquear gasto'}
                    </p>
                    <p className="text-xs text-gray-600">
                      {selectedItem.locked 
                        ? 'Permitir reorganización libre de prioridad' 
                        : 'Evitar que baje de prioridad'}
                    </p>
                  </div>
                </button>
              </div>

              {/* Delete Action */}
              <div>
                <h3 className="text-gray-500 text-sm mb-3">Zona de peligro</h3>
                <button
                  onClick={() => {
                    if (window.confirm(`¿Estás seguro de eliminar "${selectedItem.categoria}"?`)) {
                      handleDeleteItem(selectedItem.id);
                    }
                  }}
                  className="w-full bg-red-50 hover:bg-red-100 border-2 border-red-200 rounded-2xl p-4 flex items-center gap-4 transition-colors"
                >
                  <div className="w-12 h-12 bg-[#ED1C24] rounded-xl flex items-center justify-center">
                    <Trash2 className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-sm text-red-900">Eliminar categoría</p>
                    <p className="text-xs text-gray-600">
                      Esta acción no se puede deshacer
                    </p>
                  </div>
                </button>
              </div>

              {/* Maya Recommendation */}
              <div className="bg-gradient-to-r from-[#FFC72C] to-yellow-400 rounded-2xl p-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">🤖</span>
                  </div>
                  <div>
                    <p className="text-gray-900 mb-1">Recomendación de Maya</p>
                    <p className="text-sm text-gray-700">
                      {selectedItem.locked 
                        ? `"${selectedItem.categoria}" es una prioridad esencial. Te recomiendo mantenerlo bloqueado para proteger tu estabilidad financiera.`
                        : `Considera bloquear "${selectedItem.categoria}" si es un gasto esencial que no debe reducirse de prioridad.`
                      }
                    </p>
                  </div>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="w-full bg-gray-100 text-gray-700 py-4 rounded-xl hover:bg-gray-200 transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Save Button */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#F5F5F5] via-[#F5F5F5] to-transparent pt-4 pb-20 px-6">
        <button className="w-full bg-[#FFC72C] text-gray-900 py-4 px-8 rounded-xl shadow-lg hover:bg-[#FFD147] transition-colors flex items-center justify-center">
          Guardar Prioridades
        </button>
      </div>
    </div>
  );
}
