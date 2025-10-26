import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:hackmtyf/features/auth/providers/auth_provider.dart';
import 'package:hackmtyf/features/auth/domain/user.dart';

class CifrasClaveScreen extends ConsumerWidget {
  const CifrasClaveScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final user = ref.watch(authProvider);
    final isPF = user?.type == UserType.personal;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Cifras Clave'),
        backgroundColor: Colors.red,
        foregroundColor: Colors.white,
      ),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              isPF
                  ? 'Límites y Metas Personales'
                  : 'Límites y Metas Empresariales',
              style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 18),
            ),
            const SizedBox(height: 16),
            // Limite de gastos
            _CifraCard(
              title: isPF ? 'Límite de Gastos' : 'Límite de Gastos Operativos',
              value: isPF ? '40,000' : '100,000',
              progress: isPF ? 0.7 : 0.6,
              color: Colors.red,
            ),
            const SizedBox(height: 16),
            // Meta de ahorro/ganancias
            _CifraCard(
              title: isPF ? 'Meta de Ahorro' : 'Meta de Ganancias',
              value: isPF ? '15,000' : '40,000',
              progress: isPF ? 0.5 : 0.8,
              color: Colors.yellow.shade700,
            ),
            const SizedBox(height: 16),
            // Limite de deuda/pérdidas
            _CifraCard(
              title: isPF ? 'Límite de Deuda' : 'Límite de Pérdidas',
              value: isPF ? '10,000' : '15,000',
              progress: isPF ? 0.3 : 0.2,
              color: Colors.grey,
            ),
            const SizedBox(height: 24),
            // Consejería Maya
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: Colors.yellow.shade100,
                borderRadius: BorderRadius.circular(12),
              ),
              child: Row(
                children: [
                  CircleAvatar(
                    backgroundColor: Colors.white,
                    child: Icon(
                      Icons.smart_toy_outlined,
                      color: Colors.yellow.shade700,
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Text(
                      isPF
                          ? 'Maya: Recuerda revisar tus límites de gasto y ahorrar cada mes.'
                          : 'Maya: Analiza tus KPIs y ajusta tus metas empresariales periódicamente.',
                      style: const TextStyle(fontSize: 14),
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 24),
            Center(
              child: ElevatedButton(
                onPressed: () {},
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
                  'Guardar Cambios',
                  style: TextStyle(fontWeight: FontWeight.bold),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _CifraCard extends StatelessWidget {
  final String title;
  final String value;
  final double progress;
  final Color color;

  const _CifraCard({
    required this.title,
    required this.value,
    required this.progress,
    required this.color,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withAlpha(8),
            blurRadius: 8,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            title,
            style: TextStyle(fontWeight: FontWeight.bold, color: color),
          ),
          const SizedBox(height: 8),
          Text(
            value,
            style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 8),
          LinearProgressIndicator(
            value: progress,
            color: color,
            backgroundColor: color.withAlpha(40),
            minHeight: 8,
          ),
        ],
      ),
    );
  }
}
