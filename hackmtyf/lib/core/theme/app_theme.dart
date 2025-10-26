import 'package:flutter/material.dart';

class AppTheme {
  static const primaryColor = Color(0xFFED1C24);
  static const accentColor = Color(0xFFFFC72C);

  static ThemeData lightTheme = ThemeData(
    useMaterial3: true,
    colorScheme: ColorScheme.fromSeed(
      seedColor: primaryColor,
      primary: primaryColor,
      secondary: accentColor,
    ),
    textTheme: const TextTheme(),
    appBarTheme: const AppBarTheme(
      backgroundColor: primaryColor,
      foregroundColor: Colors.white,
    ),
    cardTheme: const CardThemeData(elevation: 2),
    bottomNavigationBarTheme: const BottomNavigationBarThemeData(
      selectedItemColor: primaryColor,
      unselectedItemColor: Colors.grey,
    ),
  );
}
