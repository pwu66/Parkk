import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import 'main.dart';

class SecondRoute extends StatefulWidget {
  SecondRoute({this.messaga});
  final List<ChatMessage> messaga ;
  @override
  SecondRouteState createState() => SecondRouteState(message: messaga);
}

class SecondRouteState extends State<SecondRoute> {
  SecondRouteState({this.message});
  final List<ChatMessage> message ;
  // new
  @override
  Widget build(BuildContext context) {
    return Scaffold(
    appBar: AppBar(
    title:Text("History"),
    ),
     body: message.length != null ?
        Column(
          children: <Widget>[
            Flexible(
              child: ListView.builder(
                 padding: EdgeInsets.all(8.0),
                 reverse: true,
                 itemCount: message.length,
                itemBuilder: (_, int index) {
                   //message[index];
                   return ListTile(title: message[index],
                   selected:true,
                     leading: Icon(Icons.content_copy),
                     onTap: () {
                     Clipboard.setData(ClipboardData(text: message[index].text));},
                   );
                }
               ),
            ),
          ],
        ) : Container()
    );
  }
}
