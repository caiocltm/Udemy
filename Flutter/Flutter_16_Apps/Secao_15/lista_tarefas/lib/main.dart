import 'package:flutter/material.dart';
import 'package:path_provider/path_provider.dart';
import 'dart:io';
import 'dart:async';
import 'dart:convert';

void main() {
  runApp(
		MaterialApp(
			home: Home(),
			theme: ThemeData(
				primaryColor: Colors.blue, 
				backgroundColor: Colors.grey
			),
  	)
	);
}

class Home extends StatefulWidget {
	@override
	_HomeState createState() => _HomeState();
}

class _HomeState extends State<Home> {
	
	List _toDoList = [];

	@override
	Widget build(BuildContext context) {
		return Scaffold(
      appBar: AppBar(
        title: Text("Lista de Tarefas"),
        backgroundColor: Colors.blue,
        centerTitle: true
      ),
      body: Column(
        children: <Widget>[
          Container(
            padding: EdgeInsets.fromLTRB(17.0, 1.0, 7.0, 1.0),
            child: Row(
              children: <Widget>[
                
              ],
            ),
          )
        ]
      )
    );
	}

	
	Future<File> _getFile() async { 
		final directory = await getApplicationDocumentsDirectory();
		return File("${directory.path}/data.json");
	}

	Future<File> _saveData() async { 
		String data = json.encode(_toDoList);
		final file = await _getFile();
		return file.writeAsString(data);
	}

	Future<String> __readData() async {
		try {
			final file = await _getFile();
			return file.readAsString();
		} catch(e) {
			return null;
		}
	}
}
