import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:hackmtyf/features/auth/providers/auth_provider.dart';
import 'package:hackmtyf/features/auth/domain/user.dart';

class ReporteContadorScreen extends ConsumerWidget {
  const ReporteContadorScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final user = ref.watch(authProvider);
    final isPF = user?.type == UserType.personal;

    return Scaffold(
      appBar: AppBar(
        title: Text(isPF ? 'Reporte Personal' : 'Reporte Contador'),
        backgroundColor: Colors.red,
        foregroundColor: Colors.white,
      ),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              isPF ? 'Reporte Mensual' : 'Reporte Empresarial',
              style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 18),
            ),
            const SizedBox(height: 16),
            // Selector de periodo
            Row(
              children: [
                const Text('Período: '),
                DropdownButton<String>(
                  value: 'Mensual',
                  items: ['Mensual', 'Trimestral', 'Anual']
                      .map((e) => DropdownMenuItem(value: e, child: Text(e)))
                      .toList(),
                  onChanged: (_) {},
                ),
              ],
            ),
            const SizedBox(height: 16),
            // Botón generar reporte
            Center(
              child: ElevatedButton(
                onPressed: () {
                  showDialog(
                    context: context,
                    builder: (_) => _ProcessingModal(),
                  );
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.red,
                  foregroundColor: Colors.white,
                  padding: const EdgeInsets.symmetric(
                    horizontal: 40,
                    vertical: 16,
                  ),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                ),
                child: const Text(
                  'Generar Reporte',
                  style: TextStyle(fontWeight: FontWeight.bold),
                ),
              ),
            ),
            const SizedBox(height: 24),
            // Datos financieros
            Text(
              'Datos financieros',
              style: const TextStyle(fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 8),
            ...isPF
                ? [
                    _KpiRow('Ingresos', '9,000'),
                    _KpiRow('Egresos', '7,500'),
                    _KpiRow('Ahorro', '1,500'),
                  ]
                : [
                    _KpiRow('Ingresos', '120,000'),
                    _KpiRow('Egresos', '65,000'),
                    _KpiRow('Nómina', '40,000'),
                    _KpiRow('EBITDA', '20,000'),
                    _KpiRow('ROI', '12%'),
                    _KpiRow('Margen', '18%'),
                  ],
            const SizedBox(height: 24),
            // Tabla resumen
            Text(
              'KPIs clave',
              style: const TextStyle(fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 8),
            Table(
              border: TableBorder.all(color: Colors.grey.shade300),
              children: [
                TableRow(children: [_TableCell('KPI'), _TableCell('Valor')]),
                ...isPF
                    ? [
                        TableRow(
                          children: [
                            _TableCell('Ahorro mensual'),
                            _TableCell('1,500'),
                          ],
                        ),
                        TableRow(
                          children: [
                            _TableCell('Meta de ahorro'),
                            _TableCell('15,000'),
                          ],
                        ),
                      ]
                    : [
                        TableRow(
                          children: [
                            _TableCell('Utilidad neta'),
                            _TableCell('55,000'),
                          ],
                        ),
                        TableRow(
                          children: [
                            _TableCell('Meta de ganancias'),
                            _TableCell('40,000'),
                          ],
                        ),
                      ],
              ],
            ),
          ],
        ),
      ),
    );
  }
}

class _KpiRow extends StatelessWidget {
  final String label;
  final String value;
  const _KpiRow(this.label, this.value);
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(label),
          Text(value, style: const TextStyle(fontWeight: FontWeight.bold)),
        ],
      ),
    );
  }
}

class _TableCell extends StatelessWidget {
  final String text;
  const _TableCell(this.text);
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: Text(text, style: const TextStyle(fontSize: 14)),
    );
  }
}

class _ProcessingModal extends StatefulWidget {
  @override
  State<_ProcessingModal> createState() => _ProcessingModalState();
}

class _ProcessingModalState extends State<_ProcessingModal> {
  int step = 0;
  final steps = ['Recopilando datos', 'Analizando', 'Generando documento'];
  @override
  void initState() {
    super.initState();
    _nextStep();
  }

  void _nextStep() async {
    for (int i = 0; i < steps.length; i++) {
      await Future.delayed(const Duration(seconds: 1));
      setState(() => step = i);
    }
  }

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      title: const Text('Procesando Reporte'),
      content: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          const CircularProgressIndicator(),
          const SizedBox(height: 16),
          LinearProgressIndicator(value: (step + 1) / steps.length),
          const SizedBox(height: 16),
          Text(steps[step]),
        ],
      ),
      actions: [
        if (step == steps.length - 1)
          ElevatedButton(
            onPressed: () => Navigator.of(context).pop(),
            child: const Text('Descargar PDF'),
          ),
      ],
    );
  }
}
