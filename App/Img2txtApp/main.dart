import 'package:flutter/material.dart';
import 'package:google_ml_kit/google_ml_kit.dart';
import 'package:image_picker/image_picker.dart';
import 'dart:io';
import 'package:clipboard/clipboard.dart';
import 'package:photo_view/photo_view.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        // This is the theme of your application.
        //
        // Try running your application with "flutter run". You'll see the
        // application has a blue toolbar. Then, without quitting the app, try
        // changing the primarySwatch below to Colors.green and then invoke
        // "hot reload" (press "r" in the console where you ran "flutter run",
        // or simply save your changes to "hot reload" in a Flutter IDE).
        // Notice that the counter didn't reset back to zero; the application
        // is not restarted.
        primarySwatch: Colors.blue,
      ),
      home: MyHomePage(title: 'Flutter Demo Home Page'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  MyHomePage({Key? key, required this.title}) : super(key: key);

  // This widget is the home page of your application. It is stateful, meaning
  // that it has a State object (defined below) that contains fields that affect
  // how it looks.

  // This class is the configuration for the state. It holds the values (in this
  // case the title) provided by the parent (in this case the App widget) and
  // used by the build method of the State. Fields in a Widget subclass are
  // always marked "final".

  final String title;

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  File? _image;
  RecognisedText? recognisedText;
  Text? text;
  TextDetector textDetector = GoogleMlKit.vision.textDetector();
  List<String> message = <String>[];
  TextEditingController? _controller;

  @override
  void initState(){
    super.initState();
    _controller = TextEditingController();
  }

  // @override
  // void dispose(){
  //   _controller.dispose();
  //   textDetector.dispose();
  //   super.dispose();
  // }

  @override
  Widget build(BuildContext context) {
    // This method is rerun every time setState is called, for instance as done
    // by the _incrementCounter method above.
    //
    // The Flutter framework has been optimized to make rerunning build methods
    // fast, so that you can just rebuild anything that needs updating rather
    // than having to individually change instances of widgets.
    return Scaffold(
      appBar: AppBar(
        // Here we take the value from the MyHomePage object that was created by
        // the App.build method, and use it to set our appbar title.
        title: Text(widget.title),
      ),
      body: _body(),
      floatingActionButton: _floatingButton(),
    );
  }

  Widget _body() {
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: Column(
        children: [
          // SizedBox(height: 16,),
          BuildImage(),
          SizedBox(
            height: 8,
          ),
          TextArea(),
          SizedBox(
            height: 8,
          ),
          _Textfield(),
          SizedBox(
            height: 64,
          ),
        ],
      ),
    );
  }

  Widget BuildImage() => Flexible(
    child: Container(
      child: _image != null
          ? ClipRect(
        child: PhotoView(
          imageProvider: FileImage(_image!),
          tightMode: true,
        ),
      )
          : Icon(
        Icons.image,
        size: 100,
      ),
    ),
  );

  Widget TextArea() => message.length != 0
      ? Flexible(
    child: ListView.separated(
      padding: EdgeInsets.all(8.0),
      //reverse: true,
      itemCount: message.length,
      itemBuilder: (_, int index) => _ListTile(index),
      separatorBuilder: (BuildContext context, int index) =>
      const Divider(),
    ),
  )
      : Container();

  // Widget _ListTile(int index) {
  //   return TextField(onSubmitted:(String value)=>{print(value)} ,);
  //   }

  Widget _ListTile(int index) {
    return Row(
      children: [
        Flexible(
          child: ListTile(
            title: Center(child: Text(message[index])),
            //selected: true,
            // onTap: () {},
          ),
        ),
        //Icons.border_color
        IconButton(onPressed: (){
          _controller!.value = TextEditingValue(text:message[index]);
        }, icon: Icon(Icons.border_color)),

        IconButton(
            color: Colors.blue,
            onPressed: () {
              FlutterClipboard.copy(message[index]);
              ScaffoldMessenger.of(context).showSnackBar(SnackBar(
                content: Text('Copied!'),
                duration: Duration(milliseconds: 500),
              ));
            },
            icon: Icon(Icons.content_copy))
      ],
    );
  }

  Widget _Textfield() {
    return _image != null ? Row(
      children: [
        Flexible(child: TextField(
          controller: _controller,
        )),IconButton(onPressed: (){
          FlutterClipboard.copy(_controller!.text);
          ScaffoldMessenger.of(context).showSnackBar(SnackBar(
            content: Text('Copied!'),
            duration: Duration(milliseconds: 500),
          ));

        }, icon: Icon(Icons.copy,color: Colors.blue,))
      ],
    ):Container();
  }

  Widget _floatingButton() {
    return FloatingActionButton(
      onPressed: _showDialog,
      child: Icon(Icons.photo_camera_rounded),
    );
  }

  Future _showDialog() async {
    return showDialog(
        context: context,
        builder: (BuildContext context) => AlertDialog(
          title: Center(
            child: Text(
              'Camera or Gallery',
            ),
          ),
          content: Row(
            children: [
              Expanded(
                child: IconButton(
                    iconSize: 48,
                    onPressed: () {
                      _getImage(ImageSource.camera);
                    },
                    icon: Icon(Icons.photo_camera)),
              ),
              SizedBox(
                width: 16,
              ),
              Expanded(
                  child: IconButton(
                      iconSize: 48,
                      onPressed: () {
                        _getImage(ImageSource.gallery);
                      },
                      icon: Icon(Icons.image)))
            ],
          ),
        ));
  }

  Future _getImage(var what) async {
    Navigator.of(context).pop();
    final pickedFile = await ImagePicker.platform.pickImage(source: what);
    //final pickedFile = await _imagePicker?.getImage(source: ImageSource.camera);
    if (pickedFile != null) {
      _processPickedFile(pickedFile);
    } else {
      print('No image selected.');
    }
    setState(() {});
  }

  Future _processPickedFile(PickedFile pickedFile) async {
    setState(() {
      _image = File(pickedFile.path);
    });
    final inputImage = InputImage.fromFilePath(pickedFile.path);
    processImage(inputImage);
    // final recognisedText = await textDetector.processImage(inputImage);
  }

  Future<void> processImage(InputImage inputImage) async {
    message.clear();
    final recognisedText = await textDetector.processImage(inputImage);
    for (final textBlock in recognisedText.blocks) {
      for (final textLine in textBlock.lines) {
        message.add(textLine.text);
      }
    }
    setState(() {});
  }
}
