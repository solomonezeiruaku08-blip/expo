// selma pro app company limited .dart

import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:stripe_payment/stripe_payment.dart';
import 'package:zego_uikit_prebuilt_call/zego_uikit_prebuilt_call.dart';
import 'package:agora_rtc_engine/agora_rtc_engine.dart';
import 'package:onesignal_flutter/onesignal_flutter.dart';
import 'package:qr_flutter/qr_flutter.dart'; // For displaying QR codes
import 'package:barcode_scan2/barcode_scan2.dart'; // For scanning barcodes/QR codes
import 'package:http/http.dart' as http; // For basic HTTP requests

// --- Placeholder Imports ---
// In a real app, these would point to specific screens/widgets.
// We'll create simple placeholder widgets for now.

// Authentication Screens
class LoginPage extends StatefulWidget {
  @override
  _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  final FirebaseAuth _auth = FirebaseAuth.instance;

  Future<void> _login() async {
    try {
      await _auth.signInWithEmailAndPassword(
        email: _emailController.text.trim(),
        password: _passwordController.text.trim(),
      );
      // Navigate to dashboard on successful login
      Navigator.of(context).pushReplacementNamed('/dashboard');
    } catch (e) {
      print("Error logging in: $e");
      // Show error message to user
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Login failed. Please check your credentials.')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Selma Global App Login')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            TextField(
              controller: _emailController,
              decoration: InputDecoration(labelText: 'Email'),
              keyboardType: TextInputType.emailAddress,
            ),
            SizedBox(height: 10),
            TextField(
              controller: _passwordController,
              decoration: InputDecoration(labelText: 'Password'),
              obscureText: true,
            ),
            SizedBox(height: 20),
            ElevatedButton(
              onPressed: _login,
              child: Text('Login'),
            ),
            TextButton(
              onPressed: () {
                Navigator.of(context).pushNamed('/register');
              },
              child: Text('Don\'t have an account? Register.'),
            ),
          ],
        ),
      ),
    );
  }
}

class RegisterPage extends StatefulWidget {
  @override
  _RegisterPageState createState() => _RegisterPageState();
}

class _RegisterPageState extends State<RegisterPage> {
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  final FirebaseAuth _auth = FirebaseAuth.instance;

  Future<void> _register() async {
    try {
      await _auth.createUserWithEmailAndPassword(
        email: _emailController.text.trim(),
        password: _passwordController.text.trim(),
      );
      // Navigate to dashboard on successful registration
      Navigator.of(context).pushReplacementNamed('/dashboard');
    } catch (e) {
      print("Error registering: $e");
      // Show error message to user
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Registration failed. Please try again.')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Selma Global App Register')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            TextField(
              controller: _emailController,
              decoration: InputDecoration(labelText: 'Email'),
              keyboardType: TextInputType.emailAddress,
            ),
            SizedBox(height: 10),
            TextField(
              controller: _passwordController,
              decoration: InputDecoration(labelText: 'Password'),
              obscureText: true,
            ),
            SizedBox(height: 20),
            ElevatedButton(
              onPressed: _register,
              child: Text('Register'),
            ),
            TextButton(
              onPressed: () {
                Navigator.of(context).pop(); // Go back to login
              },
              child: Text('Already have an account? Login.'),
            ),
          ],
        ),
      ),
    );
  }
}


// Dashboard Screen
class DashboardScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Selma Global App Dashboard'),
        actions: [
          IconButton(
            icon: Icon(Icons.logout),
            onPressed: () async {
              await FirebaseAuth.instance.signOut();
              Navigator.of(context).pushReplacementNamed('/login');
            },
          ),
        ],
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text('Welcome to your business dashboard!', style: TextStyle(fontSize: 20)),
            SizedBox(height: 30),
            ElevatedButton(
              onPressed: () => Navigator.of(context).pushNamed('/product_posting'),
              child: Text('Post a New Product'),
              style: ElevatedButton.styleFrom(padding: EdgeInsets.symmetric(horizontal: 20, vertical: 15)),
            ),
            SizedBox(height: 20),
            ElevatedButton(
              onPressed: () => Navigator.of(context).pushNamed('/scan_code'),
              child: Text('Scan Item Code'),
              style: ElevatedButton.styleFrom(padding: EdgeInsets.symmetric(horizontal: 20, vertical: 15)),
            ),
            SizedBox(height: 20),
            ElevatedButton(
              onPressed: () => Navigator.of(context).pushNamed('/video_call'),
              child: Text('Start Video Call'),
              style: ElevatedButton.styleFrom(padding: EdgeInsets.symmetric(horizontal: 20, vertical: 15)),
            ),
            SizedBox(height: 20),
            ElevatedButton(
              onPressed: () => Navigator.of(context).pushNamed('/streaming'),
              child: Text('Go Live (Stream)'),
              style: ElevatedButton.styleFrom(padding: EdgeInsets.symmetric(horizontal: 20, vertical: 15)),
            ),
            SizedBox(height: 20),
            ElevatedButton(
              onPressed: () => Navigator.of(context).pushNamed('/messages'),
              child: Text('Messages'),
              style: ElevatedButton.styleFrom(padding: EdgeInsets.symmetric(horizontal: 20, vertical: 15)),
            ),
            SizedBox(height: 20),
            ElevatedButton(
              onPressed: () => Navigator.of(context).pushNamed('/payment'),
              child: Text('Manage Payments'),
              style: ElevatedButton.styleFrom(padding: EdgeInsets.symmetric(horizontal: 20, vertical: 15)),
            ),
          ],
        ),
      ),
    );
  }
}

// Product Posting Tool
class ProductPostingScreen extends StatefulWidget {
  @override
  _ProductPostingScreenState createState() => _ProductPostingScreenState();
}

class _ProductPostingScreenState extends State<ProductPostingScreen> {
  final _formKey = GlobalKey<FormState>();
  String _productName = '';
  String _productDescription = '';
  String _productPrice = '';
  String _productCode = ''; // For generating QR/Barcode

  void _postProduct() {
    if (_formKey.currentState!.validate()) {
      _formKey.currentState!.save();
      // In a real app, you would save this data to a database (e.g., Firebase Firestore)
      // and potentially generate a unique product code.
      print('Product Posted:');
      print('Name: $_productName');
      print('Description: $_productDescription');
      print('Price: $_productPrice');
      print('Code: $_productCode');

      // Generate and display QR code for the product
      setState(() {
        // Dummy generation for now, a real app would generate unique codes
        if (_productCode.isEmpty) {
          _productCode = DateTime.now().millisecondsSinceEpoch.toString();
        }
      });


      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Product posted successfully!')),
      );
      // Optionally clear form or navigate away
      _formKey.currentState!.reset();
      setState(() {
        _productCode = ''; // Clear the generated code after showing
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Post Your Product')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: SingleChildScrollView(
          child: Form(
            key: _formKey,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                TextFormField(
                  decoration: InputDecoration(labelText: 'Product Name'),
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Please enter a product name';
                    }
                    return null;
                  },
                  onSaved: (value) => _productName = value!,
                ),
                SizedBox(height: 10),
                TextFormField(
                  decoration: InputDecoration(labelText: 'Product Description'),
                  maxLines: 3,
                  onSaved: (value) => _productDescription = value!,
                ),
                SizedBox(height: 10),
                TextFormField(
                  decoration: InputDecoration(labelText: 'Price'),
                  keyboardType: TextInputType.number,
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Please enter a price';
                    }
                    if (double.tryParse(value) == null) {
                      return 'Please enter a valid number for price';
                    }
                    return null;
                  },
                  onSaved: (value) => _productPrice = value!,
                ),
                SizedBox(height: 20),
                ElevatedButton(
                  onPressed: _postProduct,
                  child: Text('Post Product'),
                ),
                if (_productCode.isNotEmpty) ...[
                  SizedBox(height: 30),
                  Text('Product Code Generated:', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
                  SizedBox(height: 10),
                  Center(
                    child: QrImage(
                      data: _productCode,
                      version: QrVersions.auto,
                      size: 200.0,
                      gapless: false,
                    ),
                  ),
                  SizedBox(height: 10),
                  Text('Share this code for inventory tracking or linking.', textAlign: TextAlign.center, style: TextStyle(fontSize: 12, color: Colors.grey)),
                ],
              ],
            ),
          ),
        ),
      ),
    );
  }
}

// Scan Code Tool
class ScanCodeScreen extends StatefulWidget {
  @override
  _ScanCodeScreenState createState() => _ScanCodeScreenState();
}

class _ScanCodeScreenState extends State<ScanCodeScreen> {
  String _scannedResult = 'Scan a QR code or barcode to check item details.';

  Future<void> _scanCode() async {
    try {
      final result = await BarcodeScanner.scan();
      setState(() {
        _scannedResult = result.rawContent;
        // In a real app, you would use this _scannedResult to fetch product details from your database.
        // For this example, we'll just display the scanned content.
        print("Scanned: $_scannedResult");
      });
    } catch (e) {
      setState(() {
        _scannedResult = 'Error scanning code: $e';
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Scan Item Code')),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(20.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(Icons.qr_code_scanner, size: 100, color: Colors.blue),
              SizedBox(height: 30),
              Text(
                _scannedResult,
                textAlign: TextAlign.center,
                style: TextStyle(fontSize: 18),
              ),
              SizedBox(height: 50),
              ElevatedButton.icon(
                onPressed: _scanCode,
                icon: Icon(Icons.camera_alt),
                label: Text('Scan Item'),
                style: ElevatedButton.styleFrom(padding: EdgeInsets.symmetric(horizontal: 30, vertical: 15)),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

// Video Call Screen (using Agora)
// Note: Agora setup requires an Agora App ID and Token. This is a simplified example.
class VideoCallScreen extends StatefulWidget {
  // Replace with actual user IDs or room IDs.
  // For simplicity, using a fixed channel name for demonstration.
  final String channelName = "selma_global_call_room";

  @override
  _VideoCallScreenState createState() => _VideoCallScreenState();
}

class _VideoCallScreenState extends State<VideoCallScreen> {
  // ZEGOCLOUD_APP_ID and ZEGOCLOUD_APP_SIGNATURE should be replaced with your actual ZEGOCLOUD credentials.
  // You can get them from the ZEGOCLOUD console: https://console.zegocloud.com/
  // For this example, we use placeholder values.
  final String ZEGOCLOUD_APP_ID = "YOUR_ZEGOCLOUD_APP_ID"; // Replace with your App ID
  final String ZEGOCLOUD_APP_SIGNATURE = "YOUR_ZEGOCLOUD_APP_SIGNATURE"; // Replace with your App Signature

  String? _userId; // Current user ID

  @override
  void initState() {
    super.initState();
    // Get current user ID or generate a random one for Agora/Zego
    _userId = FirebaseAuth.instance.currentUser?.uid ?? DateTime.now().millisecondsSinceEpoch.toString();
    _initZegoCloud();
  }

  Future<void> _initZegoCloud() async {
    // Initialize ZegoCloud SDK
    await ZegoCloudUser.init(
      appId: int.parse(ZEGOCLOUD_APP_ID),
      appSign: ZEGOCLOUD_APP_SIGNATURE,
    );

    // Login to ZegoCloud
    await ZegoCloudUser.login(
      userId: _userId!,
      userName: "User_$_userId", // Replace with a meaningful username if available
      onTokenWillExpire: (duration) async {
        // Implement token refresh logic here if needed
        print("ZegoCloud token will expire in $duration. Refreshing...");
        // await ZegoCloudUser.renewToken(newToken);
      },
    );
  }

  @override
  void dispose() {
    // Deinitialize ZegoCloud SDK when the widget is disposed
    ZegoCloudUser.logout();
    ZegoCloudUser.uninit();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Selma Global Video Call'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text('Video Call for Business Worldwide', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
            SizedBox(height: 30),
            Text('Channel: ${widget.channelName}', style: TextStyle(fontSize: 16)),
            SizedBox(height: 30),
            ElevatedButton(
              onPressed: () {
                // Navigate to ZegoCall as a caller
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => ZegoUIKitPrebuiltCall(
                      appId: int.parse(ZEGOCLOUD_APP_ID), // yourAppID,
                      appSign: ZEGOCLOUD_APP_SIGNATURE, // yourAppSign,
                      userID: _userId!, // yourUserID,
                      userName: "User_$_userId", // yourUserName,
                      callID: widget.channelName, // yourCallID,
                      // You can customize UI/logic here.
                      // For example, to add a button to end the call or change roles.
                    ),
                  ),
                );
              },
              child: Text('Join Call (as Caller)'),
              style: ElevatedButton.styleFrom(padding: EdgeInsets.symmetric(horizontal: 30, vertical: 15)),
            ),
            SizedBox(height: 20),
            // A separate screen/flow would be needed for receiving calls.
            // For simplicity, we are demonstrating joining as a caller.
          ],
        ),
      ),
    );
  }
}

// Messages Screen (Placeholder, uses OneSignal for Notifications)
class MessagesScreen extends StatefulWidget {
  @override
  _MessagesScreenState createState() => _MessagesScreenState();
}

class _MessagesScreenState extends State<MessagesScreen> {
  @override
  void initState() {
    super.initState();
    _configureOneSignal();
  }

  Future<void> _configureOneSignal() async {
    // Replace with your OneSignal App ID
    // You can get this from your OneSignal dashboard: https://onesignal.com/
    final String ONE_SIGNAL_APP_ID = "YOUR_ONE_SIGNAL_APP_ID"; // Replace with your App ID

    OneSignal.Debug.setLogLevel(OSLogLevel.verbose);
    OneSignal.consentRequired(false); // Set to true if you need explicit user consent.
    await OneSignal.setAppId(ONE_SIGNAL_APP_ID);

    // Get device state for token and subscription status
    OneSignal.Notifications.requestPermission(true); // Request permission to show notifications
    final status = await OneSignal.Notifications.getPermissionState();
    print("OneSignal notification permission: $status");

    // Listen for notifications
    OneSignal.Notifications.addForegroundWillDisplayListener((event) {
      /// event.preventDefault(); // Prevent the default notification from displaying

      final notification = event.notification;

      // Customize notification display if needed
      print(
          "Foreground notification received: ${notification.title} with body ${notification.body}");
      // Show a dialog or a snackbar instead of the default notification
      // showDialog(
      //   context: context,
      //   builder: (context) => AlertDialog(
      //     title: Text(notification.title ?? 'New Message'),
      //     content: Text(notification.body ?? ''),
      //     actions: [
      //       TextButton(
      //         onPressed: () => Navigator.pop(context),
      //         child: Text('OK'),
      //       ),
      //     ],
      //   ),
      // );
    });

    // Handle notification opened
    OneSignal.Notifications.addClickListener((event) {
      print("Notification clicked with event: ${event.notification.toMap()}");
      // Navigate to a specific screen based on notification payload
      // final data = event.notification.additionalData;
      // if (data != null && data.containsKey('route')) {
      //   Navigator.of(context).pushNamed(data['route']);
      // }
    });
  }

  // Function to send a test notification (e.g., from your backend)
  Future<void> _sendTestNotification() async {
    // This is a simplified example. In a real app, you'd send this from your server
    // to specific user IDs or segments.
    final response = await http.post(
      Uri.parse('https://onesignal.com/api/v1/notifications'),
      headers: {
        'Content-Type': 'applicat
