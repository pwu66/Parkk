import 'dart:async';
import 'dart:io';

import 'package:firebase_ml_vision/firebase_ml_vision.dart';
import 'package:flutter/material.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:image_picker/image_picker.dart';

import 'google_login.dart';
import 'history.dart';
import 'package:progress_dialog/progress_dialog.dart';

void main() => runApp(MyApp());

GoogleSignInAccount currentUser; // new

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      initialRoute: '/login',
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: MyHomePage(title: 'Flutter Demo Home Page'),
      routes: {
        // When navigating to the "/" route, build the FirstScreen widget.
        '/login': (context) => SignInDemo(currentUser: currentUser,),
        '/home': (context) => MyHomePage(),

      },
    );
  }
}

class MyHomePage extends StatefulWidget {
  MyHomePage({Key key, this.title}) : super(key: key);

  final String title;

  @override
  MyHomePageState createState() => MyHomePageState();
}

class MyHomePageState extends State<MyHomePage> {
  final List<ChatMessage> messages = <ChatMessage>[];
  ProgressDialog pr;
  int i = 0;
  bool end =false;
  TextEditingController f_controller = TextEditingController();

  List<double> datal = [
    0,
  ];
  List<double> datat = [
    0,
  ];
  List<double> datar = [
    0,
  ];
  List<double> datab = [
    0,
  ];
  List<String> data = [
    "",
  ];
  List<double> w = [
    0,
  ];
  List<double> h = [
    0,
  ];
  int field_check = 0;
  File _imageFile;
  dynamic _scanResults;
  Size _imageSize;
  final TextRecognizer recognizer = FirebaseVision.instance.textRecognizer();
  FirebaseVisionImage imaged;

  void inititdata() {
    i = 0;
    datal = [
      0.0,
    ];
    datat = [
      0.0,
    ];
    datar = [
      0.0,
    ];
    datab = [
      0.0,
    ];
    data = [
      "",
    ];
    w = [
      0.0,
    ];
    h = [
      0.0,
    ];
    field_check=0;

    f_controller.text = "";
    end =false;

  }

  Future getImage(BuildContext context,String what) async {
    inititdata();
    File file;
    if(what == "Gallery")
    file = await ImagePicker.pickImage(source: ImageSource.gallery);
    else if(what =="Camera"){
      file = await ImagePicker.pickImage(source: ImageSource.camera);
    }
    if (file != null) {
     _scanImage(file);
      _getImageSize(file);
    }
    setState(() {
      _imageFile = file;
      readData();
    });

    Navigator.pop(context);

  }

  Future<void> _scanImage(File _imageFile) async {
    setState(() {
      _scanResults = null;
    });
    dynamic results;

    imaged = FirebaseVisionImage.fromFile(_imageFile);
    results = await recognizer.processImage(imaged);

    setState(() {
      _scanResults = results;
    });
  }

  Future<void> _getImageSize(File _imageFile) async {
    final Completer<Size> completer = Completer<Size>();

    final Image image = Image.file(_imageFile);
    image.image.resolve(const ImageConfiguration()).addListener(
      ImageStreamListener((ImageInfo info, bool _) {
        completer.complete(Size(
          info.image.width.toDouble(),
          info.image.height.toDouble(),
        ));
      }),
    );

    final Size size = await completer.future;
    setState(() {
      _imageSize = size;
    });
  }

  Future readData() async {
    imaged = FirebaseVisionImage.fromFile(_imageFile);

    dynamic result = await recognizer.processImage(imaged);

    for (TextBlock block in result.blocks) {
      for (TextLine line in block.lines) {
        for (TextElement word in line.elements) {
          setState(() {
            datal.insert(i, word.boundingBox.left);
            datat.insert(i, word.boundingBox.top);
            datar.insert(i, word.boundingBox.right);
            datab.insert(i, word.boundingBox.bottom);
            w.insert(i, datar[i] - datal[i]);
            h.insert(i, datab[i] - datat[i]);
            data.insert(i, word.text);
          });
          i++;
        }
      }
    }
  }

  Widget makingButton() {
    return Container(
      child: _imageFile != null
          ? Stack(children: <Widget>[
        Container(
            width: MediaQuery
                .of(context)
                .size
                .width ?? 0,
            height: MediaQuery
                .of(context)
                .size
                .height ?? 0,
            child: Image.file(_imageFile, fit: BoxFit.fill)),
        ...buttonizing(),
      ])
          : Container(),
    );
  }


  Widget textfield() {
    return  Container(
      margin: EdgeInsets.symmetric(horizontal: 8.0),
      child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              Flexible(
                child: TextField(
                  readOnly: true,
                  onTap: () {
                    field_check = 1;
                  },
                 controller: f_controller,
                  decoration: new InputDecoration.collapsed(
                   hintText: "Make a sentance"),
                ),
              ),
              Container(                                                 //new
                margin: new EdgeInsets.symmetric(horizontal: 4.0),           //new
                child: new IconButton(                                       //new
                    icon: new Icon(Icons.clear),                                //new
                    onPressed: () {
                      f_controller.clear();
                    }
                ),  //new
              ),
              Container(                                                 //new
                margin: new EdgeInsets.symmetric(horizontal: 4.0),           //new
                child: new IconButton(                                       //new
                    icon: new Icon(Icons.save_alt),                                //new
                    onPressed: () =>_handleSubmitted(f_controller.text),
                ),  //new
              ),

            ],
      ),
    );
  }
  void _handleSubmitted(String text) {
    f_controller.clear();
    ChatMessage message = new ChatMessage(                         //new
      text: text,                                                  //new
    );                                                             //new
    setState(() {                                                  //new
      messages.insert(0, message);                                //new
    });

  }

  List<Widget> buttonizing() {

    return List<Widget>.generate(w.length, (i) {
      return Positioned(
        left: (datal[i] * MediaQuery.of(context).size.width / (_imageSize.width ?? 0)) ?? 0,
        top:
        (datat[i] * MediaQuery
            .of(context)
            .size
            .height / (_imageSize.height ?? 0) )?? 0,
        child: Container(
          decoration: BoxDecoration(
            border: Border.all(color: Colors.red, width: 2),
          ),
          width:
          (w[i] * MediaQuery
              .of(context)
              .size
              .width / (_imageSize.width ?? 0) )?? 0,
          height:
          ( h[i] * MediaQuery
              .of(context)
              .size
              .height  / (_imageSize.height ?? 0) )?? 0,
          child: FlatButton(
              child: Text(
                "",
              ),
              onPressed: () {
                f_controller.text = "${f_controller.text + data[i]} ";
              }),
        ),
      );
    });

  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        iconTheme: IconThemeData(color: Colors.yellow),
        title: Text("Taking text"),

        actions: <Widget>[
          IconButton(icon: Icon(Icons.arrow_forward), onPressed:(){
            Navigator.push(
              context,
              MaterialPageRoute(builder: (context) => SecondRoute(messaga: messages)),
            );
          } ),
        ],
      ),
      body: _imageFile == null
          ? Container()
          :
        ListView(
        children: <Widget>[
        makingButton(),
          Container(
            decoration: BoxDecoration(
            color: Theme.of(context).cardColor
            ),                  //new
            child: textfield(),                       //modified
          ),                                                        //new
        ],                                                          //new
      ),
      floatingActionButton: Padding(
        padding: const EdgeInsets.fromLTRB(0.0, 0, 0, 40.0),
        child: FloatingActionButton(
          onPressed: (){
            CreatDialog(context);
            print(currentUser);

          },
          child: Icon(Icons.add_a_photo),
        ),
      ),
    );
  }



  Future<void> CreatDialog(BuildContext context) {
    return showDialog(context: context, builder: (BuildContext context){
      return AlertDialog(
        content: SingleChildScrollView(
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: <Widget>[
              GestureDetector(
                child: Container(
                child: Icon(Icons.photo,size: 20.0,)
                ),
          onTap:(){
            getImage(context,"Gallery");
          }
              ),
              Padding(padding: EdgeInsets.symmetric(horizontal: 8.0)),
              GestureDetector(
                  child: Container(
                     child: Icon(Icons.photo_camera,size: 20.0,)
                  ),
                  onTap:(){
                    getImage(context,"Camera");
                  }              ),
            ],
          ),
        ),
      );
    });
  }
}
class ChatMessage extends StatelessWidget {
  ChatMessage({this.text});
  final String text;
  @override
  Widget build(BuildContext context) {
    return new Container(
      margin: const EdgeInsets.symmetric(vertical: 10.0),
      child: new Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
           Container(
            margin: const EdgeInsets.only(top: 5.0),
            child: Text(text),
          ),
        ],
      ),
    );
  }
}