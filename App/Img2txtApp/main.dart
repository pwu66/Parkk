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
        primarySwatch: Colors.blue,
      ),
      home: MyHomePage(title: 'Flutter Demo Home Page'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  MyHomePage({Key? key, required this.title}) : super(key: key);
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
  void initState() {
    super.initState();
    _controller = TextEditingController();
  }

  @override
  void dispose(){
    _controller!.dispose();
    textDetector.close();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {

    return Scaffold(
      appBar: AppBar(
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
          BuildImage(),
          SizedBox(
            height: 8,
          ),
          GetText(),
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

  Widget GetText() => message.length != 0
      ? Flexible(
          child: ListView.separated(
            padding: EdgeInsets.all(8.0),
            itemCount: message.length,
            itemBuilder: (_, int index) => _ListTile(index),
            separatorBuilder: (BuildContext context, int index) =>
                const Divider(),
          ),
        )
      : Container();

  Widget _ListTile(int index) {
    return Row(
      children: [
        Flexible(
          child: ListTile(
            title: Center(child: Text(message[index])),
          ),
        ),
        //Icons.border_color
        IconButton(
            onPressed: () {
              _controller!.value = TextEditingValue(text:_controller!.text+message[index]);
            },
            icon: Icon(Icons.add_rounded)),

        // IconButton(
        //     onPressed: () {
        //       _controller!.value = TextEditingValue(text: message[index]);
        //     },
        //     icon: Icon(Icons.border_color)),

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
    return _image != null
        ? Row(
            children: [
              Flexible(
                  child: TextField(
                controller: _controller,
              )),
              IconButton(
                  onPressed: () {
                    _controller!.value = TextEditingValue(text: '');
                  },
                  icon: Icon(
                    Icons.delete,
                    color: Colors.black,
                  )),
              IconButton(
                  onPressed: () {
                    FlutterClipboard.copy(_controller!.text);
                    ScaffoldMessenger.of(context).showSnackBar(SnackBar(
                      content: Text('Copied!'),
                      duration: Duration(milliseconds: 500),
                    ));
                  },
                  icon: Icon(
                    Icons.copy,
                    color: Colors.blue,
                  ))
            ],
          )
        : Container();
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
  }
  String? str;
  Future<void> processImage(InputImage inputImage) async {
    message.clear();
    final recognisedText = await textDetector.processImage(inputImage);
    for (final textBlock in recognisedText.blocks) {
      for (final textLine in textBlock.lines) {
        var tmp = textLine.text;
        if(textLine.text.contains('o')||textLine.text.contains('O')||textLine.text.contains('e')){
          tmp = tmp.replaceAll(RegExp('o'), '0');
          tmp = tmp.replaceAll(RegExp('O'), '0');
          tmp = tmp.replaceAll(RegExp('e'), '0');
        }
        if(textLine.text.contains('l')||textLine.text.contains('I')||textLine.text.contains('/')||textLine.text.contains('\\|')) {
          tmp = tmp.replaceAll(RegExp('l'), '1');
          tmp = tmp.replaceAll(RegExp('I'), '1');
          tmp = tmp.replaceAll(RegExp('/'), '1');
          tmp = tmp.replaceAll(RegExp('\\|'), '1');
        }
        if(textLine.text.contains('S')||textLine.text.contains('s')) {
          tmp = tmp.replaceAll(RegExp('S'), '5');
          tmp = tmp.replaceAll(RegExp('s'), '5');
        }
        if(textLine.text.contains('b')) {
          tmp = tmp.replaceAll(RegExp('b'), '6');
        }

        if(textLine.text.contains('M')||textLine.text.contains('m')||textLine.text.contains('n')||textLine.text.contains(')')) {
          tmp = tmp.replaceAll(RegExp('M'), '7');
          tmp = tmp.replaceAll(RegExp('m'), '7');
          tmp = tmp.replaceAll(RegExp('n'), '7');
          tmp = tmp.replaceAll(RegExp('\\)'), '7');
        }
        if(textLine.text.contains('q')) {
          tmp = tmp.replaceAll(RegExp('q'), '9');
        }
        message.add(tmp);
      }
    }
    setState(() {});
  }
}
