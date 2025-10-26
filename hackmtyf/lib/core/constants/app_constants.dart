import 'package:flutter/material.dart';

class AppConstants {
  static const primaryColor = Color(0xFFD31C1C);
  static const backgroundColor = Color(0xFFF5F5F5);

  static const double defaultPadding = 24.0;
  static const double defaultRadius = 16.0;

  static final BoxDecoration cardDecoration = BoxDecoration(
    color: Colors.white,
    borderRadius: BorderRadius.circular(defaultRadius),
    boxShadow: [
      BoxShadow(
        color: Colors.black.withAlpha(13),
        blurRadius: 10,
        offset: const Offset(0, 5),
      ),
    ],
  );

  static const inputDecoration = InputDecoration(
    filled: true,
    fillColor: Colors.white,
    contentPadding: EdgeInsets.symmetric(horizontal: 16, vertical: 16),
    border: OutlineInputBorder(
      borderRadius: BorderRadius.all(Radius.circular(12)),
      borderSide: BorderSide.none,
    ),
    enabledBorder: OutlineInputBorder(
      borderRadius: BorderRadius.all(Radius.circular(12)),
      borderSide: BorderSide.none,
    ),
    focusedBorder: OutlineInputBorder(
      borderRadius: BorderRadius.all(Radius.circular(12)),
      borderSide: BorderSide.none,
    ),
    errorBorder: OutlineInputBorder(
      borderRadius: BorderRadius.all(Radius.circular(12)),
      borderSide: BorderSide(color: Colors.red),
    ),
  );
}
