import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:hackmtyf/features/auth/providers/auth_provider.dart';
import 'package:hackmtyf/features/auth/domain/user.dart';
import 'dart:math';

class Message {
  final String id;
  final String text;
  final bool fromUser;
  final DateTime time;

  Message({
    required this.id,
    required this.text,
    required this.fromUser,
    required this.time,
  });
}

class ChatNotifier extends StateNotifier<List<Message>> {
  final Ref _ref;

  ChatNotifier(this._ref) : super([]);

  final _random = Random();

  final List<String> _pfResponses = [
    'Recuerda separar un porcentaje de tus ingresos para el ahorro.',
    'Puedes optimizar tus gastos revisando tus suscripciones mensuales.',
    '¿Te gustaría ver una gráfica de tus gastos por categoría?',
    '¡Buen trabajo! Tu meta de ahorro está cerca.',
    '¿Quieres simular un aumento de ingresos?',
  ];
  final List<String> _pmResponses = [
    'Revisa tus gastos operativos y busca oportunidades de optimización.',
    'Puedes mejorar tu utilidad neta ajustando el presupuesto de marketing.',
    '¿Te gustaría ver una gráfica de tendencia mensual?',
    'Alerta: Se detectó un posible riesgo financiero en operaciones.',
    '¿Quieres simular un aumento de ingresos empresariales?',
  ];

  void sendUserMessage(String text) {
    final userMsg = Message(
      id: DateTime.now().millisecondsSinceEpoch.toString(),
      text: text,
      fromUser: true,
      time: DateTime.now(),
    );

    state = [...state, userMsg];

    // set typing indicator and simulate assistant response after ~2 seconds
    _ref.read(chatTypingProvider.notifier).state = true;
    _simulateResponse();
  }

  Future<void> _simulateResponse() async {
    await Future.delayed(const Duration(seconds: 2));
    final user = _ref.read(authProvider);
    final isPF = user?.type == UserType.personal;
    final responses = isPF ? _pfResponses : _pmResponses;
    final response = responses[_random.nextInt(responses.length)];

    final assistantMsg = Message(
      id: (DateTime.now().millisecondsSinceEpoch + 1).toString(),
      text: response,
      fromUser: false,
      time: DateTime.now(),
    );

    state = [...state, assistantMsg];
    // clear typing indicator
    _ref.read(chatTypingProvider.notifier).state = false;
  }

  void clear() {
    state = [];
  }
}

final chatTypingProvider = StateProvider<bool>((ref) => false);

final chatProvider = StateNotifierProvider<ChatNotifier, List<Message>>((ref) {
  return ChatNotifier(ref);
});
