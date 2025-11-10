import 'package:flutter/material.dart';
import 'package:get/get.dart';
import '../controllers/controller.dart';

class AuthScreen extends StatelessWidget {
  const AuthScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final AuthController controller = Get.put(AuthController());
    final TextEditingController emailController = TextEditingController();
    final TextEditingController passwordController = TextEditingController();

    return Scaffold(
      appBar: AppBar(title: const Text('Login')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            TextField(
              controller: emailController,
              decoration: const InputDecoration(labelText: 'Email'),
            ),
            TextField(
              controller: passwordController,
              decoration: const InputDecoration(labelText: 'Password'),
              obscureText: true,
            ),
            const SizedBox(height: 20),
            Obx(
              () => controller.isLoading.value
                  ? const CircularProgressIndicator()
                  : ElevatedButton(
                      onPressed: () {
                        final email = emailController.text.trim();
                        final password = passwordController.text;
                        if (email.isEmpty || password.isEmpty) {
                          Get.snackbar(
                            'Validation',
                            'Email and password are required',
                          );
                          return;
                        }
                        controller.login(email, password);
                      },
                      child: const Text('Login'),
                    ),
            ),
          ],
        ),
      ),
    );
  }
}
