import 'dart:async';
//import 'dart:convert' show json;

//import "package:http/http.dart" as http;
import 'package:flutter/material.dart';
import 'package:google_sign_in/google_sign_in.dart';

GoogleSignIn _googleSignIn = GoogleSignIn();


class SignInDemo extends StatefulWidget {
  SignInDemo({this.currentUser});
  final GoogleSignInAccount currentUser ;
  @override
  State createState() => SignInDemoState(currentUser:currentUser);
}

class SignInDemoState extends State<SignInDemo> {
  SignInDemoState({this.currentUser});
   GoogleSignInAccount currentUser ;

  @override
  void initState() {
    super.initState();
    _googleSignIn.onCurrentUserChanged.listen((GoogleSignInAccount account) {
      setState(() {
        currentUser = account;
      });
//      if (currentUser != null) {
//        _handleGetContact();
//      }
    });
   // _googleSignIn.signInSilently();
  }


  Future<void> _handleSignIn() async {
    try {
      await _googleSignIn.signIn();
    } catch (error) {
      print(error);
    }
    //Navigator.pop(context);


  }

  Future<void> _handleSignOut() async {
    _googleSignIn.disconnect();
  }

  Widget _buildBody() {
    if (currentUser != null) {
      return Column(
        mainAxisAlignment: MainAxisAlignment.spaceAround,
        children: <Widget>[
          RaisedButton(
            child: const Text('SIGN OUT'),
            onPressed: _handleSignOut,
          ),
          RaisedButton(
            child: const Text('go to home'),
            onPressed: (){
              print(currentUser);
              Navigator.pop(context,currentUser);

            }
          ),
        ],
      );
    } else {
      print("else 구문에서 $currentUser");
      return Column(
        mainAxisAlignment: MainAxisAlignment.spaceAround,
        children: <Widget>[
          RaisedButton(
            child: const Text('GOOGLE SIGN IN'),
            onPressed: _handleSignIn,
          ),
        ],
      );
    }
  }

  @override
  Widget build(BuildContext context) {

    return Scaffold(

        body:SafeArea(
          child: ListView(
          padding: EdgeInsets.symmetric(horizontal: 24.0),
          children: <Widget>[
            SizedBox(height: 80.0,),
            Column(
              children: <Widget>[
//                AspectRatio(
//                  aspectRatio: 18.0 / 11.0,
//                  child: Image.asset('Vector.png',scale: 1.0,),
//                ),
                SizedBox(height: 16.0),
                Text('INIT PAGE'),
                //Container(width: 50,height: 50,child: Image.asset('assets/Vector.png',width: 30,height: 40,fit: BoxFit.contain,),padding:EdgeInsets.only(left: 2,right: 2,bottom: 2),),
                SizedBox(height: 120.0),
                Center(
                  child:
                  _buildBody(),
                )
              ],
            ),
          ],
        ))
    );
  }
}