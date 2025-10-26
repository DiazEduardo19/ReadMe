import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:hackmtyf/core/constants/app_constants.dart';
import 'package:hackmtyf/features/auth/providers/auth_provider.dart';
import 'package:hackmtyf/features/auth/domain/user.dart';
import 'package:hackmtyf/features/dashboard/presentation/widgets/dashboard_card.dart';

class DashboardScreen extends ConsumerWidget {
  const DashboardScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final user = ref.watch(authProvider);
    final isPF = user?.type == UserType.personal;

    return Scaffold(
      body: SingleChildScrollView(
        child: Column(
          children: [
            // Header
            Container(
              padding: const EdgeInsets.fromLTRB(24, 60, 24, 24),
              color: AppConstants.primaryColor,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            isPF
                                ? 'Hola, ${user?.name ?? "Usuario"}'
                                : 'Bienvenido, ${user?.name ?? "Empresa"}',
                            style: const TextStyle(
                              color: Colors.white,
                              fontSize: 24,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          Text(
                            isPF
                                ? 'Aquí está tu panorama financiero'
                                : 'Panel de control empresarial',
                            style: const TextStyle(
                              color: Colors.white,
                              fontSize: 16,
                            ),
                          ),
                        ],
                      ),
                      Container(
                        padding: const EdgeInsets.symmetric(
                          horizontal: 10,
                          vertical: 6,
                        ),
                        decoration: BoxDecoration(
                          color: Colors.white,
                          borderRadius: BorderRadius.circular(20),
                        ),
                        child: Text(
                          isPF ? 'Persona Física' : 'Persona Moral',
                          style: const TextStyle(
                            color: AppConstants.primaryColor,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),

            // Content
            Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Financial Overview Cards
                  isPF
                      ? GridView.count(
                          shrinkWrap: true,
                          physics: const NeverScrollableScrollPhysics(),
                          crossAxisCount: 2,
                          mainAxisSpacing: 16,
                          crossAxisSpacing: 16,
                          childAspectRatio: 1.1,
                          children: [
                            // Saldo Total
                            DashboardCard(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  const Icon(
                                    Icons.account_balance_wallet,
                                    color: Colors.green,
                                  ),
                                  const SizedBox(height: 8),
                                  const Text(
                                    'Saldo Total',
                                    style: TextStyle(
                                      color: Colors.grey,
                                      fontSize: 14,
                                    ),
                                  ),
                                  const Text(
                                    'Todas tus cuentas',
                                    style: TextStyle(
                                      color: Colors.grey,
                                      fontSize: 12,
                                    ),
                                  ),
                                  const Text(
                                    '\$84,250',
                                    style: TextStyle(
                                      fontSize: 24,
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                            // Flujo Neto
                            DashboardCard(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  const Icon(
                                    Icons.trending_up,
                                    color: Colors.blue,
                                  ),
                                  const SizedBox(height: 8),
                                  const Text(
                                    'Flujo Neto',
                                    style: TextStyle(
                                      color: Colors.grey,
                                      fontSize: 14,
                                    ),
                                  ),
                                  const Text(
                                    'Ingresos - gastos mes',
                                    style: TextStyle(
                                      color: Colors.grey,
                                      fontSize: 12,
                                    ),
                                  ),
                                  const Text(
                                    '+\$9,000',
                                    style: TextStyle(
                                      fontSize: 24,
                                      fontWeight: FontWeight.bold,
                                      color: Colors.green,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                            // Tasa de Ahorro
                            DashboardCard(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  const Icon(
                                    Icons.savings,
                                    color: Colors.purple,
                                  ),
                                  const SizedBox(height: 8),
                                  const Text(
                                    'Tasa de Ahorro',
                                    style: TextStyle(
                                      color: Colors.grey,
                                      fontSize: 14,
                                    ),
                                  ),
                                  const Text(
                                    '\$9,200',
                                    style: TextStyle(
                                      fontSize: 24,
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                  const SizedBox(height: 4),
                                  Container(
                                    height: 4,
                                    width: double.infinity,
                                    decoration: BoxDecoration(
                                      color: Colors.blue.withAlpha(51),
                                      borderRadius: BorderRadius.circular(2),
                                    ),
                                    child: FractionallySizedBox(
                                      alignment: Alignment.centerLeft,
                                      widthFactor: 0.7,
                                      child: Container(
                                        decoration: BoxDecoration(
                                          color: Colors.blue,
                                          borderRadius: BorderRadius.circular(
                                            2,
                                          ),
                                        ),
                                      ),
                                    ),
                                  ),
                                  const SizedBox(height: 4),
                                  const Text(
                                    'Faltan \$800 para tu meta mensual',
                                    style: TextStyle(
                                      color: Colors.blue,
                                      fontSize: 11,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                            // Meta: Viaje
                            DashboardCard(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  const Icon(
                                    Icons.flight,
                                    color: Colors.orange,
                                  ),
                                  const SizedBox(height: 8),
                                  const Text(
                                    'Meta: Viaje',
                                    style: TextStyle(
                                      color: Colors.grey,
                                      fontSize: 14,
                                    ),
                                  ),
                                  const Text(
                                    '\$25,000',
                                    style: TextStyle(
                                      fontSize: 24,
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                  const Text(
                                    'Europa 2026',
                                    style: TextStyle(
                                      color: Colors.grey,
                                      fontSize: 12,
                                    ),
                                  ),
                                  const SizedBox(height: 4),
                                  Container(
                                    height: 4,
                                    width: double.infinity,
                                    decoration: BoxDecoration(
                                      color: Colors.purple.withAlpha(51),
                                      borderRadius: BorderRadius.circular(2),
                                    ),
                                    child: FractionallySizedBox(
                                      alignment: Alignment.centerLeft,
                                      widthFactor: 0.4,
                                      child: Container(
                                        decoration: BoxDecoration(
                                          color: Colors.purple,
                                          borderRadius: BorderRadius.circular(
                                            2,
                                          ),
                                        ),
                                      ),
                                    ),
                                  ),
                                  const SizedBox(height: 4),
                                  const Text(
                                    'Faltan \$13,500 de \$38,500',
                                    style: TextStyle(
                                      color: Colors.purple,
                                      fontSize: 11,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ],
                        )
                      : GridView.count(
                          shrinkWrap: true,
                          physics: const NeverScrollableScrollPhysics(),
                          crossAxisCount: 2,
                          mainAxisSpacing: 16,
                          crossAxisSpacing: 16,
                          childAspectRatio: 1.1,
                          children: [
                            // Ingresos Mensuales
                            DashboardCard(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  const Icon(
                                    Icons.business_center,
                                    color: Colors.blue,
                                  ),
                                  const SizedBox(height: 8),
                                  const Text(
                                    'Liquidez Operativa',
                                    style: TextStyle(
                                      color: Colors.grey,
                                      fontSize: 14,
                                    ),
                                  ),
                                  const Text(
                                    'Efectivo Disponible',
                                    style: TextStyle(
                                      color: Colors.grey,
                                      fontSize: 12,
                                    ),
                                  ),
                                  const Text(
                                    '\$120,000',
                                    style: TextStyle(
                                      fontSize: 24,
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                            // Gastos Operativos
                            DashboardCard(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  const Icon(
                                    Icons.receipt_long,
                                    color: Colors.red,
                                  ),
                                  const SizedBox(height: 8),
                                  const Text(
                                    'Perdidas y Ganancias',
                                    style: TextStyle(
                                      color: Colors.grey,
                                      fontSize: 14,
                                    ),
                                  ),
                                  const Text(
                                    'Mes actual',
                                    style: TextStyle(
                                      color: Colors.grey,
                                      fontSize: 12,
                                    ),
                                  ),
                                  const Text(
                                    '\$65,000',
                                    style: TextStyle(
                                      fontSize: 24,
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                            // Utilidad Neta
                            DashboardCard(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  const Icon(
                                    Icons.trending_up,
                                    color: Colors.green,
                                  ),
                                  const SizedBox(height: 8),
                                  const Text(
                                    'Presupuesto',
                                    style: TextStyle(
                                      color: Colors.grey,
                                      fontSize: 14,
                                    ),
                                  ),
                                  const Text(
                                    'Gasto vs proyectado',
                                    style: TextStyle(
                                      color: Colors.grey,
                                      fontSize: 12,
                                    ),
                                  ),
                                  const Text(
                                    '\$336,000',
                                    style: TextStyle(
                                      fontSize: 24,
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                            // Consejo del día empresa
                            DashboardCard(
                              child: Row(
                                children: [
                                  Expanded(
                                    child: Column(
                                      crossAxisAlignment:
                                          CrossAxisAlignment.start,
                                      children: [
                                        Container(
                                          width: 40,
                                          height: 40,
                                          decoration: const BoxDecoration(
                                            color: Color(0xFFFFE082),
                                            shape: BoxShape.circle,
                                          ),
                                          child: const Center(
                                            child: Icon(
                                              Icons.lightbulb_outline,
                                              color: Colors.orange,
                                            ),
                                          ),
                                        ),
                                        Text(
                                          'Deuda Total',
                                          style: TextStyle(
                                            fontWeight: FontWeight.bold,
                                            fontSize: 16,
                                          ),
                                        ),
                                        SizedBox(height: 4),
                                        Text(
                                          'Pasivos actuales.',
                                          style: TextStyle(fontSize: 14),
                                        ),
                                        SizedBox(height: 4),
                                        const Text(
                                          '\$450,000',
                                          style: TextStyle(
                                            fontSize: 24,
                                            fontWeight: FontWeight.bold,
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ],
                        ),
                  const SizedBox(height: 24),

                  // Consejo del día
                  DashboardCard(
                    backgroundColor: const Color(0xFFFFF8E1),
                    child: Row(
                      children: [
                        Container(
                          width: 40,
                          height: 40,
                          decoration: const BoxDecoration(
                            color: Color(0xFFFFE082),
                            shape: BoxShape.circle,
                          ),
                          child: const Center(
                            child: Icon(
                              Icons.lightbulb_outline,
                              color: Colors.orange,
                            ),
                          ),
                        ),
                        const SizedBox(width: 16),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: const [
                              Text(
                                'Consejo del día ✨',
                                style: TextStyle(
                                  fontWeight: FontWeight.bold,
                                  fontSize: 16,
                                ),
                              ),
                              SizedBox(height: 4),
                              Text(
                                'Compara precios antes de compras grandes. Pequeñas diferencias suman mucho.',
                                style: TextStyle(fontSize: 14),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 24),

                  // Cifras Clave
                  DashboardCard(
                    backgroundColor: AppConstants.primaryColor,
                    onTap: () {
                      // TODO: Navigate to key figures screen
                    },
                    child: Row(
                      children: [
                        Container(
                          width: 40,
                          height: 40,
                          decoration: BoxDecoration(
                            color: Colors.white,
                            borderRadius: BorderRadius.circular(12),
                          ),
                          child: Icon(
                            Icons.bar_chart,
                            color: AppConstants.primaryColor,
                          ),
                        ),
                        const SizedBox(width: 16),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                'Cifras Clave',
                                style: const TextStyle(
                                  color: Colors.white,
                                  fontWeight: FontWeight.bold,
                                  fontSize: 18,
                                ),
                              ),
                              Text(
                                isPF
                                    ? 'Gestiona tus límites de gastos, metas de ahorro y recibe consejería personalizada'
                                    : 'Límite de gastos operativos, meta de ganancias y alertas de riesgo',
                                style: const TextStyle(
                                  color: Colors.white,
                                  fontSize: 14,
                                ),
                              ),
                            ],
                          ),
                        ),
                        const Icon(Icons.chevron_right, color: Colors.white),
                      ],
                    ),
                  ),
                  const SizedBox(height: 24),

                  // Chart
                  const Text(
                    'Ingresos vs. Egresos (6 meses)',
                    style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                  ),
                  const SizedBox(height: 16),
                  SizedBox(
                    height: 300,
                    child: BarChart(
                      BarChartData(
                        alignment: BarChartAlignment.spaceAround,
                        maxY: 60000,
                        minY: 0,
                        groupsSpace: 12,
                        barGroups: [
                          createBarGroup(0, 35000, 32000, 'May'),
                          createBarGroup(1, 38000, 35000, 'Jun'),
                          createBarGroup(2, 42000, 38000, 'Jul'),
                          createBarGroup(3, 40000, 36000, 'Ago'),
                          createBarGroup(4, 45000, 38000, 'Sep'),
                          createBarGroup(5, 43000, 39000, 'Oct'),
                        ],
                        titlesData: FlTitlesData(
                          show: true,
                          rightTitles: AxisTitles(
                            sideTitles: SideTitles(showTitles: false),
                          ),
                          topTitles: AxisTitles(
                            sideTitles: SideTitles(showTitles: false),
                          ),
                          bottomTitles: AxisTitles(
                            sideTitles: SideTitles(
                              showTitles: true,
                              getTitlesWidget: bottomTitles,
                            ),
                          ),
                          leftTitles: AxisTitles(
                            sideTitles: SideTitles(
                              showTitles: true,
                              getTitlesWidget: leftTitles,
                              reservedSize: 50,
                            ),
                          ),
                        ),
                        borderData: FlBorderData(show: false),
                        gridData: FlGridData(
                          show: true,
                          drawVerticalLine: false,
                          horizontalInterval: 15000,
                          getDrawingHorizontalLine: (value) {
                            return FlLine(
                              color: Colors.grey.withAlpha(51),
                              strokeWidth: 1,
                            );
                          },
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(height: 24),

                  // Maya Recommendation
                  DashboardCard(
                    backgroundColor: const Color(0xFFFFF8E1),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: [
                            Container(
                              width: 40,
                              height: 40,
                              decoration: const BoxDecoration(
                                color: Color(0xFFFFE082),
                                shape: BoxShape.circle,
                              ),
                              child: const Center(
                                child: Icon(
                                  Icons.smart_toy_outlined,
                                  color: Colors.orange,
                                ),
                              ),
                            ),
                            const SizedBox(width: 16),
                            const Text(
                              'Maya te recomienda',
                              style: TextStyle(
                                fontWeight: FontWeight.bold,
                                fontSize: 16,
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 16),
                        const Text(
                          'He detectado oportunidades de ahorro en tus gastos no esenciales. Usa la herramienta de Ahorro Inteligente para encontrar tu punto de paz mental sin sacrificar lo que realmente importa.',
                        ),
                        const SizedBox(height: 16),
                        ElevatedButton(
                          onPressed: () {
                            // TODO: Implement Ahorro Inteligente
                          },
                          style: ElevatedButton.styleFrom(
                            backgroundColor: Colors.orange,
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(8),
                            ),
                          ),
                          child: const Text('Activar Ahorro Inteligente'),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  BarChartGroupData createBarGroup(
    int x,
    double income,
    double expense,
    String label,
  ) {
    return BarChartGroupData(
      x: x,
      groupVertically: true,
      barRods: [
        BarChartRodData(
          toY: income,
          color: Colors.green,
          width: 12,
          borderRadius: BorderRadius.circular(2),
        ),
        BarChartRodData(
          toY: expense,
          color: Colors.red,
          width: 12,
          borderRadius: BorderRadius.circular(2),
        ),
      ],
    );
  }

  Widget bottomTitles(double value, TitleMeta meta) {
    const style = TextStyle(color: Colors.grey, fontSize: 12);
    String text;
    switch (value.toInt()) {
      case 0:
        text = 'May';
        break;
      case 1:
        text = 'Jun';
        break;
      case 2:
        text = 'Jul';
        break;
      case 3:
        text = 'Ago';
        break;
      case 4:
        text = 'Sep';
        break;
      case 5:
        text = 'Oct';
        break;
      default:
        text = '';
        break;
    }
    return SideTitleWidget(
      axisSide: meta.axisSide,
      child: Text(text, style: style),
    );
  }

  Widget leftTitles(double value, TitleMeta meta) {
    if (value == 0) {
      return const SizedBox();
    }
    return SideTitleWidget(
      axisSide: meta.axisSide,
      child: Text(
        '\$${(value / 1000).toStringAsFixed(0)}k',
        style: const TextStyle(color: Colors.grey, fontSize: 12),
      ),
    );
  }
}
