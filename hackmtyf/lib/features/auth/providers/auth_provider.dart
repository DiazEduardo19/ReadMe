import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:hackmtyf/features/auth/domain/user.dart';

final authProvider = StateNotifierProvider<AuthNotifier, User?>((ref) {
  return AuthNotifier();
});

class AuthNotifier extends StateNotifier<User?> {
  AuthNotifier() : super(null);

  Future<void> login(String email, String password) async {
    // TODO: Implement actual authentication
    state = User(
      id: '1',
      name: 'Test User',
      email: email,
      type: UserType.personal,
    );
  }

  Future<void> register(
    String name,
    String email,
    String password,
    UserType type,
  ) async {
    // TODO: Implement actual registration
    state = User(id: '1', name: name, email: email, type: type);
  }

  void updateType(UserType newType) {
    if (state != null) {
      state = User(
        id: state!.id,
        name: state!.name,
        email: state!.email,
        type: newType,
      );
    }
  }

  void logout() {
    state = null;
  }
}
