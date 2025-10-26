import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:hackmtyf/core/constants/app_constants.dart';
import 'package:hackmtyf/features/auth/providers/auth_provider.dart';
import 'package:hackmtyf/features/auth/domain/user.dart';

class ProfileScreen extends ConsumerWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final user = ref.watch(authProvider);
    final isPF = user?.type == UserType.personal;

    // Keep header fixed and content scrollable beneath it.
    const double headerHeight = 200;

    return Scaffold(
      body: SafeArea(
        child: Stack(
          children: [
            // Fixed header
            Positioned(
              left: 0,
              right: 0,
              top: 0,
              height: headerHeight,
              child: Container(
                padding: const EdgeInsets.fromLTRB(16, 28, 16, 20),
                decoration: BoxDecoration(
                  color: AppConstants.primaryColor,
                  borderRadius: const BorderRadius.vertical(
                    bottom: Radius.circular(24),
                  ),
                ),
                child: Column(
                  children: [
                    CircleAvatar(
                      radius: 36,
                      backgroundColor: Colors.yellow.shade700,
                      child: const Icon(
                        Icons.person,
                        color: Colors.white,
                        size: 36,
                      ),
                    ),
                    const SizedBox(height: 12),
                    Text(
                      user?.name ?? 'Juan Pérez',
                      style: const TextStyle(
                        color: Colors.white,
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: 8),
                    Container(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 12,
                        vertical: 6,
                      ),
                      decoration: BoxDecoration(
                        color: Colors.white.withAlpha(31),
                        borderRadius: BorderRadius.circular(20),
                      ),
                      child: Text(
                        isPF ? 'Persona Física' : 'Persona Moral',
                        style: TextStyle(color: Colors.white),
                      ),
                    ),
                  ],
                ),
              ),
            ),

            // Scrollable content positioned below header
            Positioned(
              left: 0,
              right: 0,
              top: headerHeight, // overlap a bit for rounded effect
              bottom: 0,
              child: Container(
                // give a background so rounded header visually overlaps
                color: AppConstants.backgroundColor,
                child: SingleChildScrollView(
                  padding: const EdgeInsets.fromLTRB(16, 42, 16, 24),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text(
                        'Información de Cuenta',
                        style: TextStyle(
                          fontWeight: FontWeight.w600,
                          fontSize: 16,
                        ),
                      ),
                      const SizedBox(height: 12),

                      // Account info card
                      Container(
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
                          children: [
                            _ProfileRow(
                              icon: Icons.email_outlined,
                              title: 'Correo electrónico',
                              subtitle: user?.email ?? 'test@test.com',
                            ),
                            const Divider(height: 1),
                            _ProfileRow(
                              icon: Icons.credit_card,
                              title: 'Número de cuenta',
                              subtitle: '**** **** 5027',
                            ),
                            const Divider(height: 1),
                            _ProfileRow(
                              icon: Icons.verified,
                              title: 'Estado de cuenta',
                              subtitle: 'Verificada',
                              subtitleColor: Colors.green,
                            ),
                          ],
                        ),
                      ),

                      const SizedBox(height: 18),
                      const Text(
                        'Datos de Contacto',
                        style: TextStyle(
                          fontWeight: FontWeight.w600,
                          fontSize: 16,
                        ),
                      ),
                      const SizedBox(height: 12),

                      Container(
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
                          children: [
                            _ProfileRow(
                              icon: Icons.phone,
                              title: 'Teléfono',
                              subtitle: '+52 55 1234 5678',
                              trailing: const Icon(Icons.chevron_right),
                            ),
                            const Divider(height: 1),
                            _ProfileRow(
                              icon: Icons.location_on_outlined,
                              title: 'Dirección',
                              subtitle: 'Ciudad de México',
                              trailing: const Icon(Icons.chevron_right),
                            ),
                          ],
                        ),
                      ),

                      const SizedBox(height: 18),
                      const Text(
                        'Tipo de Perfil',
                        style: TextStyle(
                          fontWeight: FontWeight.w600,
                          fontSize: 16,
                        ),
                      ),
                      const SizedBox(height: 12),

                      Container(
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
                          children: [
                            _ProfileRow(
                              icon: Icons.swap_horiz,
                              title: 'Cambiar Tipo de Perfil',
                              subtitle: user?.type == UserType.personal
                                  ? 'Cambiar a Persona Moral'
                                  : 'Cambiar a Persona Física',
                              trailing: const Icon(Icons.chevron_right),
                              onTap: () {
                                if (user != null) {
                                  showDialog(
                                    context: context,
                                    builder: (context) {
                                      UserType selectedType = user.type;
                                      return AlertDialog(
                                        title: const Text(
                                          'Cambiar Tipo de Perfil',
                                          style: TextStyle(fontSize: 20),
                                        ),
                                        content: StatefulBuilder(
                                          builder: (context, setState) {
                                            return Column(
                                              mainAxisSize: MainAxisSize.min,
                                              children: [
                                                const Text(
                                                  '¿Estás seguro de que deseas cambiar tu perfil?',
                                                  style: TextStyle(
                                                    fontSize: 14,
                                                    color: Colors.black54,
                                                  ),
                                                ),
                                                const Text(
                                                  'Esto cambiará tu vista del dashboard y las funcionalidades disponibles.',
                                                  style: TextStyle(
                                                    fontSize: 14,
                                                    color: Colors.black54,
                                                  ),
                                                ),
                                                const SizedBox(height: 20),
                                                Container(
                                                  decoration: BoxDecoration(
                                                    border: Border.all(
                                                      color:
                                                          Colors.grey.shade300,
                                                    ),
                                                    borderRadius:
                                                        BorderRadius.circular(
                                                          12,
                                                        ),
                                                  ),
                                                  child: RadioListTile<UserType>(
                                                    title: Row(
                                                      children: [
                                                        Container(
                                                          padding:
                                                              const EdgeInsets.all(
                                                                8,
                                                              ),
                                                          decoration:
                                                              BoxDecoration(
                                                                color: Colors
                                                                    .red
                                                                    .shade50,
                                                                shape: BoxShape
                                                                    .circle,
                                                              ),
                                                          child: Icon(
                                                            Icons
                                                                .person_outline,
                                                            color: Colors
                                                                .red
                                                                .shade300,
                                                          ),
                                                        ),
                                                        const SizedBox(
                                                          width: 12,
                                                        ),
                                                        const Column(
                                                          crossAxisAlignment:
                                                              CrossAxisAlignment
                                                                  .start,
                                                          children: [
                                                            Text(
                                                              'Persona Física',
                                                            ),
                                                            Text(
                                                              'Finanzas personales',
                                                              style: TextStyle(
                                                                fontSize: 12,
                                                                color:
                                                                    Colors.grey,
                                                              ),
                                                            ),
                                                          ],
                                                        ),
                                                      ],
                                                    ),
                                                    value: UserType.personal,
                                                    groupValue: selectedType,
                                                    onChanged: (value) {
                                                      setState(
                                                        () => selectedType =
                                                            value!,
                                                      );
                                                    },
                                                  ),
                                                ),
                                                const SizedBox(height: 12),
                                                Container(
                                                  decoration: BoxDecoration(
                                                    border: Border.all(
                                                      color:
                                                          Colors.grey.shade300,
                                                    ),
                                                    borderRadius:
                                                        BorderRadius.circular(
                                                          12,
                                                        ),
                                                  ),
                                                  child: RadioListTile<UserType>(
                                                    title: Row(
                                                      children: [
                                                        Container(
                                                          padding:
                                                              const EdgeInsets.all(
                                                                8,
                                                              ),
                                                          decoration:
                                                              BoxDecoration(
                                                                color: Colors
                                                                    .red
                                                                    .shade50,
                                                                shape: BoxShape
                                                                    .circle,
                                                              ),
                                                          child: Icon(
                                                            Icons.business,
                                                            color: Colors
                                                                .red
                                                                .shade300,
                                                          ),
                                                        ),
                                                        const SizedBox(
                                                          width: 4,
                                                        ),
                                                        const Column(
                                                          crossAxisAlignment:
                                                              CrossAxisAlignment
                                                                  .start,
                                                          children: [
                                                            Text(
                                                              'Persona Moral',
                                                            ),
                                                            Text(
                                                              'Finanzas empresariales',
                                                              style: TextStyle(
                                                                fontSize: 12,
                                                                color:
                                                                    Colors.grey,
                                                              ),
                                                            ),
                                                          ],
                                                        ),
                                                      ],
                                                    ),
                                                    value: UserType.business,
                                                    groupValue: selectedType,
                                                    onChanged: (value) {
                                                      setState(
                                                        () => selectedType =
                                                            value!,
                                                      );
                                                    },
                                                  ),
                                                ),
                                              ],
                                            );
                                          },
                                        ),
                                        actions: [
                                          TextButton(
                                            onPressed: () =>
                                                Navigator.pop(context),
                                            child: const Text(
                                              'Cancelar',
                                              style: TextStyle(
                                                color: Colors.grey,
                                              ),
                                            ),
                                          ),
                                          ElevatedButton(
                                            onPressed: () {
                                              ref
                                                  .read(authProvider.notifier)
                                                  .updateType(selectedType);
                                              Navigator.pop(context);
                                            },
                                            style: ElevatedButton.styleFrom(
                                              backgroundColor: Colors.red,
                                              foregroundColor: Colors.white,
                                            ),
                                            child: const Text(
                                              'Confirmar Cambio',
                                            ),
                                          ),
                                        ],
                                      );
                                    },
                                  );
                                }
                              },
                            ),
                          ],
                        ),
                      ),

                      const SizedBox(height: 18),

                      // Cifras Clave red card
                      Container(
                        width: double.infinity,
                        padding: const EdgeInsets.all(16),
                        decoration: BoxDecoration(
                          color: AppConstants.primaryColor,
                          borderRadius: BorderRadius.circular(14),
                          boxShadow: [
                            BoxShadow(
                              color: Colors.black.withAlpha(13),
                              blurRadius: 8,
                              offset: const Offset(0, 4),
                            ),
                          ],
                        ),
                        child: Row(
                          children: [
                            Container(
                              width: 48,
                              height: 48,
                              decoration: BoxDecoration(
                                color: Colors.white,
                                borderRadius: BorderRadius.circular(12),
                              ),
                              child: Icon(
                                Icons.track_changes,
                                color: AppConstants.primaryColor,
                              ),
                            ),
                            const SizedBox(width: 12),
                            Expanded(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: const [
                                  Text(
                                    'Cifras Clave',
                                    style: TextStyle(
                                      color: Colors.white,
                                      fontWeight: FontWeight.bold,
                                      fontSize: 16,
                                    ),
                                  ),
                                  SizedBox(height: 6),
                                  Text(
                                    'Controla gastos, ahorro y deudas',
                                    style: TextStyle(color: Colors.white70),
                                  ),
                                ],
                              ),
                            ),
                            const Icon(
                              Icons.chevron_right,
                              color: Colors.white,
                            ),
                          ],
                        ),
                      ),

                      const SizedBox(height: 18),

                      const Text(
                        'Configuración',
                        style: TextStyle(
                          fontWeight: FontWeight.w600,
                          fontSize: 16,
                        ),
                      ),
                      const SizedBox(height: 12),

                      Container(
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
                          children: [
                            _ProfileRow(
                              icon: Icons.notifications_outlined,
                              title: 'Notificaciones',
                              subtitle: 'Configurar alertas y avisos',
                              trailing: const Icon(Icons.chevron_right),
                            ),
                            const Divider(height: 1),
                            _ProfileRow(
                              icon: Icons.lock_outline,
                              title: 'Seguridad y Privacidad',
                              subtitle: 'Contraseña, autenticación',
                              trailing: const Icon(Icons.chevron_right),
                            ),
                            const Divider(height: 1),
                            _ProfileRow(
                              icon: Icons.payment_outlined,
                              title: 'Métodos de Pago',
                              subtitle: 'Tarjetas y cuentas vinculadas',
                              trailing: const Icon(Icons.chevron_right),
                            ),
                          ],
                        ),
                      ),

                      const SizedBox(height: 18),

                      // Maya card
                      Container(
                        width: double.infinity,
                        padding: const EdgeInsets.all(16),
                        decoration: BoxDecoration(
                          color: Colors.yellow.shade700,
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
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: const [
                                  Text(
                                    'Maya',
                                    style: TextStyle(
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                  SizedBox(height: 6),
                                  Text(
                                    'Tu asistente de IA\nMaya está aprendiendo tus hábitos financieros para ofrecerte las mejores recomendaciones personalizadas.',
                                  ),
                                ],
                              ),
                            ),
                          ],
                        ),
                      ),

                      const SizedBox(height: 18),

                      Center(
                        child: OutlinedButton.icon(
                          onPressed: () {
                            // logout
                            ref.read(authProvider.notifier).logout();
                            Navigator.of(
                              context,
                            ).pushReplacementNamed('/login');
                          },
                          icon: const Icon(Icons.logout, color: Colors.red),
                          label: const Text(
                            'Cerrar Sesión',
                            style: TextStyle(color: Colors.red),
                          ),
                          style: OutlinedButton.styleFrom(
                            side: const BorderSide(color: Colors.red),
                            padding: const EdgeInsets.symmetric(
                              horizontal: 20,
                              vertical: 14,
                            ),
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(12),
                            ),
                          ),
                        ),
                      ),

                      const SizedBox(height: 12),
                      // Footer small grey centered text
                      Center(
                        child: Column(
                          children: const [
                            Text(
                              'FinancIA Banorte v1.0.0',
                              style: TextStyle(
                                color: Colors.grey,
                                fontSize: 12,
                              ),
                            ),
                            SizedBox(height: 6),
                            Text(
                              '© 2025 Banorte. Todos los derechos reservados.',
                              style: TextStyle(
                                color: Colors.grey,
                                fontSize: 12,
                              ),
                            ),
                          ],
                        ),
                      ),

                      const SizedBox(height: 40),
                    ],
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _ProfileRow extends StatelessWidget {
  final IconData icon;
  final String title;
  final String subtitle;
  final Widget? trailing;
  final Color? subtitleColor;
  final VoidCallback? onTap;

  const _ProfileRow({
    required this.icon,
    required this.title,
    required this.subtitle,
    this.trailing,
    this.subtitleColor,
    this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return ListTile(
      leading: Container(
        width: 44,
        height: 44,
        decoration: BoxDecoration(
          color: Colors.grey.shade100,
          borderRadius: BorderRadius.circular(10),
        ),
        child: Icon(icon, color: Colors.purple),
      ),
      title: Text(title, style: const TextStyle(fontWeight: FontWeight.w600)),
      subtitle: Text(
        subtitle,
        style: TextStyle(color: subtitleColor ?? Colors.grey.shade600),
      ),
      trailing: trailing,
      onTap: onTap,
    );
  }
}
