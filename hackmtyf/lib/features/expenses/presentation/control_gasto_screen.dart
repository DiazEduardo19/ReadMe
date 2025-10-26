import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:hackmtyf/features/auth/providers/auth_provider.dart';
import 'package:hackmtyf/features/auth/domain/user.dart';

class ControlGastoScreen extends ConsumerWidget {
  const ControlGastoScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final user = ref.watch(authProvider);
    final isPF = user?.type == UserType.personal;

    final gastos = isPF
        ? [
            {'cat': 'Supermercado', 'monto': '4,000'},
            {'cat': 'Transporte', 'monto': '1,200'},
            {'cat': 'Entretenimiento', 'monto': '800'},
            {'cat': 'Restaurantes', 'monto': '1,500'},
            {'cat': 'Servicios', 'monto': '1,000'},
          ]
        : [
            {'cat': 'Nómina', 'monto': '40,000'},
            {'cat': 'Operaciones', 'monto': '25,000'},
            {'cat': 'Servicios', 'monto': '10,000'},
            {'cat': 'Marketing', 'monto': '8,000'},
            {'cat': 'Otros', 'monto': '5,000'},
          ];

    double total = gastos.fold(
      0,
      (sum, g) =>
          sum +
          double.parse(
            (g['monto'] ?? '').replaceAll('', '').replaceAll(',', ''),
          ),
    );

    return Scaffold(
      appBar: AppBar(
        title: Text(isPF ? 'Control de Gasto' : 'Control de Gasto Empresarial'),
        backgroundColor: Colors.red,
        foregroundColor: Colors.white,
      ),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            ...gastos.map(
              (g) => ListTile(
                title: Text(g['cat'] ?? ''),
                trailing: Text(
                  g['monto'] ?? '',
                  style: const TextStyle(fontWeight: FontWeight.bold),
                ),
              ),
            ),
            const SizedBox(height: 24),
            Text(
              'Impacto emocional',
              style: const TextStyle(fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 8),
            _EmotionalSlider(),
            const SizedBox(height: 24),
            Text(
              'Total de gastos',
              style: const TextStyle(fontWeight: FontWeight.bold),
            ),
            Text(
              '${total.toStringAsFixed(2)}',
              style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
            ),
          ],
        ),
      ),
    );
  }
}

class _EmotionalSlider extends StatefulWidget {
  @override
  State<_EmotionalSlider> createState() => _EmotionalSliderState();
}

class _EmotionalSliderState extends State<_EmotionalSlider> {
  double value = 5;

  @override
  Widget build(BuildContext context) {
    String emoji;
    if (value < 3) {
      emoji = '😐';
    } else if (value < 7) {
      emoji = '🙂';
    } else {
      emoji = '😃';
    }
    return Column(
      children: [
        Slider(
          value: value,
          min: 0,
          max: 10,
          divisions: 10,
          label: value.toStringAsFixed(0),
          onChanged: (v) => setState(() => value = v),
        ),
        Text('Impacto: $emoji', style: const TextStyle(fontSize: 24)),
      ],
    );
  }
}
