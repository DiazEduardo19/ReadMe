import 'package:flutter/material.dart';
// ...existing code...
import 'widgets/expense_item.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:hackmtyf/features/auth/providers/auth_provider.dart';
import 'package:hackmtyf/features/auth/domain/user.dart';

class AnalysisScreen extends ConsumerWidget {
  const AnalysisScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final user = ref.watch(authProvider);
    final isPF = user?.type == UserType.personal;
    final items = isPF
        ? [
            {
              'title': 'Renta/Hipoteca',
              'subtitle': '\$12,000/mes',
              'amount': '\$12,000/mes',
              'rank': 1,
              'blocked': true,
            },
            {
              'title': 'Alimentación',
              'subtitle': '\$8,000/mes',
              'amount': '\$8,000/mes',
              'rank': 2,
              'blocked': true,
            },
            {
              'title': 'Servicios Básicos',
              'subtitle': '\$2,500/mes',
              'amount': '\$2,500/mes',
              'rank': 3,
              'blocked': false,
            },
            {
              'title': 'Transporte',
              'subtitle': '\$3,500/mes',
              'amount': '\$3,500/mes',
              'rank': 4,
              'blocked': false,
            },
            {
              'title': 'Entretenimiento',
              'subtitle': '\$2,000/mes',
              'amount': '\$2,000/mes',
              'rank': 5,
              'blocked': false,
            },
          ]
        : [
            {
              'title': 'Nómina',
              'subtitle': '\$40,000/mes',
              'amount': '\$40,000/mes',
              'rank': 1,
              'blocked': true,
            },
            {
              'title': 'Operaciones',
              'subtitle': '\$25,000/mes',
              'amount': '\$25,000/mes',
              'rank': 2,
              'blocked': true,
            },
            {
              'title': 'Servicios',
              'subtitle': '\$10,000/mes',
              'amount': '\$10,000/mes',
              'rank': 3,
              'blocked': false,
            },
            {
              'title': 'Marketing',
              'subtitle': '\$8,000/mes',
              'amount': '\$8,000/mes',
              'rank': 4,
              'blocked': false,
            },
            {
              'title': 'Otros',
              'subtitle': '\$5,000/mes',
              'amount': '\$5,000/mes',
              'rank': 5,
              'blocked': false,
            },
          ];

    return Scaffold(
      appBar: AppBar(
        title: const Text('Priorización de Gastos'),
        centerTitle: true,
        backgroundColor: Colors.white,
        foregroundColor: Colors.black87,
        elevation: 0,
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Container(
                  width: double.infinity,
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: const Color(0xFFFFF8E1),
                    borderRadius: BorderRadius.circular(12),
                    border: Border.all(color: Colors.yellow.shade200),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: const [
                      Text(
                        'Arrastra las tarjetas para ordenar tus gastos del más al menos importante.',
                        style: TextStyle(fontSize: 14),
                      ),
                      SizedBox(height: 8),
                      Text(
                        'Los gastos bloqueados no pueden bajar de prioridad, pero puedes configurarlos tocando el ícono de ajustes.',
                        style: TextStyle(color: Colors.black54),
                      ),
                    ],
                  ),
                ),

                const SizedBox(height: 16),

                // List of items
                Column(
                  children: items.map((it) {
                    return Padding(
                      padding: const EdgeInsets.symmetric(vertical: 8.0),
                      child: ExpenseItem(
                        title: it['title'] as String,
                        subtitle: it['subtitle'] as String,
                        amount: it['amount'] as String,
                        rank: it['rank'] as int,
                        blocked: it['blocked'] as bool,
                        onSettings: () {
                          // open settings modal (placeholder)
                          showDialog(
                            context: context,
                            builder: (_) => AlertDialog(
                              title: const Text('Configuración'),
                              content: Text('Ajustes para ${it['title']}'),
                              actions: [
                                TextButton(
                                  onPressed: () => Navigator.of(context).pop(),
                                  child: const Text('Cerrar'),
                                ),
                              ],
                            ),
                          );
                        },
                      ),
                    );
                  }).toList(),
                ),

                const SizedBox(height: 24),

                Center(
                  child: ElevatedButton(
                    onPressed: () {
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(content: Text('Prioridades guardadas')),
                      );
                    },
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.yellow.shade700,
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
                      'Guardar Prioridades',
                      style: TextStyle(fontWeight: FontWeight.bold),
                    ),
                  ),
                ),

                const SizedBox(height: 48),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
