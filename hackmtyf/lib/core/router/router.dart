import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:hackmtyf/core/widgets/app_shell.dart';
import 'package:hackmtyf/features/auth/presentation/login_screen.dart';
import 'package:hackmtyf/features/auth/presentation/register_screen.dart';
import 'package:hackmtyf/features/auth/providers/auth_provider.dart';
import 'package:hackmtyf/features/dashboard/presentation/screens/dashboard_screen.dart';
import 'package:hackmtyf/features/chat/presentation/chat_screen.dart';
import 'package:hackmtyf/features/expenses/presentation/analysis_screen.dart';
import 'package:hackmtyf/features/profile/presentation/profile_screen.dart';

final routerProvider = Provider<GoRouter>((ref) {
  final router = RouterNotifier(ref);

  return GoRouter(
    initialLocation: '/login',
    refreshListenable: router,
    routes: [
      // Auth Routes
      GoRoute(path: '/login', builder: (context, state) => const LoginScreen()),
      GoRoute(
        path: '/register',
        builder: (context, state) => const RegisterScreen(),
      ),

      // Main App Shell with Bottom Navigation
      StatefulShellRoute.indexedStack(
        builder: (context, state, navigationShell) {
          return AppShell(navigationShell: navigationShell);
        },
        branches: [
          // Dashboard Branch
          StatefulShellBranch(
            routes: [
              GoRoute(
                path: '/dashboard',
                builder: (context, state) => const DashboardScreen(),
              ),
            ],
          ),
          // Expenses Branch
          StatefulShellBranch(
            routes: [
              GoRoute(
                path: '/expenses',
                builder: (context, state) => const AnalysisScreen(),
                routes: [
                  GoRoute(
                    path: 'control',
                    builder: (context, state) => const Scaffold(
                      body: Center(child: Text('Expense Control')),
                    ),
                  ),
                ],
              ),
            ],
          ),
          // Chat Branch
          StatefulShellBranch(
            routes: [
              GoRoute(
                path: '/chat',
                builder: (context, state) => const ChatScreen(),
              ),
            ],
          ),
          // Profile Branch
          StatefulShellBranch(
            routes: [
              GoRoute(
                path: '/profile',
                builder: (context, state) => const ProfileScreen(),
              ),
            ],
          ),
        ],
      ),
    ],
    redirect: (context, state) {
      final user = ref.read(authProvider);
      final isAuth = user != null;
      final isLoginRoute =
          state.matchedLocation == '/login' ||
          state.matchedLocation == '/register';

      if (!isAuth && !isLoginRoute) {
        return '/login';
      }

      if (isAuth && isLoginRoute) {
        return '/dashboard';
      }

      return null;
    },
  );
});

class RouterNotifier extends ChangeNotifier {
  final Ref _ref;

  RouterNotifier(this._ref) {
    _ref.listen(authProvider, (_, __) => notifyListeners());
  }
}
