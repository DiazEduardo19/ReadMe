import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:intl/intl.dart';
import 'package:hackmtyf/features/chat/providers/chat_provider.dart';
import 'package:hackmtyf/features/auth/providers/auth_provider.dart';
import 'package:hackmtyf/features/auth/domain/user.dart';

class ChatScreen extends ConsumerStatefulWidget {
  const ChatScreen({super.key});

  @override
  ConsumerState<ChatScreen> createState() => _ChatScreenState();
}

class _ChatScreenState extends ConsumerState<ChatScreen> {
  final _controller = TextEditingController();
  final _focusNode = FocusNode();

  @override
  void dispose() {
    _controller.dispose();
    _focusNode.dispose();
    super.dispose();
  }

  void _send() {
    final text = _controller.text.trim();
    if (text.isEmpty) return;
    ref.read(chatProvider.notifier).sendUserMessage(text);
    _controller.clear();
    _focusNode.requestFocus();
  }

  @override
  Widget build(BuildContext context) {
    final messages = ref.watch(chatProvider);
    final isTyping = ref.watch(chatTypingProvider);
    final user = ref.watch(authProvider);
    final isPF = user?.type == UserType.personal;

    return Scaffold(
      appBar: AppBar(
        title: Row(
          children: [
            const CircleAvatar(
              backgroundColor: Colors.yellow,
              child: Icon(Icons.smart_toy_outlined, color: Colors.white),
            ),
            const SizedBox(width: 12),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: const [
                Text('Maya', style: TextStyle(fontWeight: FontWeight.bold)),
                Text(
                  'En línea',
                  style: TextStyle(fontSize: 12, color: Colors.green),
                ),
              ],
            ),
          ],
        ),
        actions: [
          IconButton(icon: const Icon(Icons.info_outline), onPressed: () {}),
        ],
        backgroundColor: Colors.white,
        foregroundColor: Colors.black87,
        elevation: 0,
      ),
      body: SafeArea(
        child: Column(
          children: [
            Expanded(
              child: ListView.builder(
                padding: const EdgeInsets.symmetric(
                  horizontal: 16,
                  vertical: 12,
                ),
                itemCount: messages.length + (isTyping ? 1 : 0),
                itemBuilder: (context, index) {
                  if (index < messages.length) {
                    final msg = messages[index];
                    return _MessageBubble(message: msg);
                  }

                  // Typing indicator
                  return Padding(
                    padding: const EdgeInsets.symmetric(vertical: 6),
                    child: Row(
                      crossAxisAlignment: CrossAxisAlignment.end,
                      children: [
                        const SizedBox(width: 8),
                        CircleAvatar(
                          backgroundColor: Colors.yellow.shade700,
                          child: const Icon(
                            Icons.smart_toy_outlined,
                            color: Colors.white,
                          ),
                        ),
                        const SizedBox(width: 12),
                        Container(
                          padding: const EdgeInsets.symmetric(
                            horizontal: 14,
                            vertical: 12,
                          ),
                          decoration: BoxDecoration(
                            color: Colors.green.shade50,
                            borderRadius: BorderRadius.circular(16),
                          ),
                          child: const Text('Maya está escribiendo...'),
                        ),
                      ],
                    ),
                  );
                },
              ),
            ),

            // quick suggestion chips
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
              color: Colors.white,
              child: SingleChildScrollView(
                scrollDirection: Axis.horizontal,
                child: Row(
                  children: isPF
                      ? [
                          const SizedBox(width: 4),
                          _SuggestionChip(label: '¿Cómo ahorro más?'),
                          const SizedBox(width: 8),
                          _SuggestionChip(label: 'Simular +\$1,500/mes'),
                          const SizedBox(width: 8),
                          _SuggestionChip(label: 'Balance por cuenta'),
                          const SizedBox(width: 8),
                          _SuggestionChip(label: 'Recomendaciones'),
                          const SizedBox(width: 4),
                        ]
                      : [
                          const SizedBox(width: 4),
                          _SuggestionChip(
                            label: '¿Cómo optimizar gastos operativos?',
                          ),
                          const SizedBox(width: 8),
                          _SuggestionChip(label: 'Simular aumento de ingresos'),
                          const SizedBox(width: 8),
                          _SuggestionChip(label: 'Balance por área'),
                          const SizedBox(width: 8),
                          _SuggestionChip(label: 'Alertas de riesgo'),
                          const SizedBox(width: 4),
                        ],
                ),
              ),
            ),

            // input area
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
              color: Colors.white,
              child: Row(
                children: [
                  IconButton(
                    onPressed: () {},
                    icon: const Icon(Icons.add_circle_outline),
                    color: Theme.of(context).primaryColor,
                  ),
                  Expanded(
                    child: ConstrainedBox(
                      constraints: const BoxConstraints(maxHeight: 150),
                      child: TextField(
                        controller: _controller,
                        focusNode: _focusNode,
                        minLines: 1,
                        maxLines: 5,
                        decoration: InputDecoration(
                          hintText: 'Escribe un mensaje...',
                          contentPadding: const EdgeInsets.symmetric(
                            horizontal: 12,
                            vertical: 12,
                          ),
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(24),
                            borderSide: BorderSide.none,
                          ),
                          filled: true,
                          fillColor: Colors.grey.shade100,
                        ),
                        onSubmitted: (_) => _send(),
                      ),
                    ),
                  ),
                  const SizedBox(width: 8),
                  IconButton(
                    onPressed: _send,
                    icon: const Icon(Icons.send),
                    color: Theme.of(context).primaryColor,
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _MessageBubble extends StatelessWidget {
  final Message message;

  const _MessageBubble({required this.message});

  @override
  Widget build(BuildContext context) {
    final isUser = message.fromUser;

    final bubbleColor = isUser ? Colors.blueAccent : Colors.green.shade50;
    final textColor = isUser ? Colors.white : Colors.black87;

    final formattedTime = DateFormat.Hm().format(message.time);

    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 6),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.end,
        mainAxisAlignment: isUser
            ? MainAxisAlignment.end
            : MainAxisAlignment.start,
        children: [
          if (!isUser) const SizedBox(width: 8),
          if (!isUser)
            CircleAvatar(
              backgroundColor: Colors.yellow.shade700,
              child: const Icon(Icons.smart_toy_outlined, color: Colors.white),
            ),
          if (!isUser) const SizedBox(width: 12),

          Flexible(
            child: Column(
              crossAxisAlignment: isUser
                  ? CrossAxisAlignment.end
                  : CrossAxisAlignment.start,
              children: [
                Container(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 14,
                    vertical: 12,
                  ),
                  decoration: BoxDecoration(
                    color: bubbleColor,
                    borderRadius: BorderRadius.only(
                      topLeft: const Radius.circular(16),
                      topRight: const Radius.circular(16),
                      bottomLeft: Radius.circular(isUser ? 16 : 4),
                      bottomRight: Radius.circular(isUser ? 4 : 16),
                    ),
                  ),
                  child: Text(message.text, style: TextStyle(color: textColor)),
                ),
                const SizedBox(height: 4),
                Text(
                  formattedTime,
                  style: const TextStyle(fontSize: 11, color: Colors.grey),
                ),
              ],
            ),
          ),

          if (isUser) const SizedBox(width: 12),
          if (isUser)
            CircleAvatar(
              backgroundColor: Colors.blueAccent,
              child: const Icon(Icons.person, color: Colors.white),
            ),
          if (isUser) const SizedBox(width: 8),
        ],
      ),
    );
  }
}

class _SuggestionChip extends StatelessWidget {
  final String label;

  const _SuggestionChip({required this.label});

  @override
  Widget build(BuildContext context) {
    return Consumer(
      builder: (context, ref, _) {
        return GestureDetector(
          onTap: () {
            // send the chip text using the notifier
            ref.read(chatProvider.notifier).sendUserMessage(label);
          },
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
            decoration: BoxDecoration(
              color: Colors.grey.shade100,
              borderRadius: BorderRadius.circular(20),
            ),
            child: Text(label),
          ),
        );
      },
    );
  }
}
