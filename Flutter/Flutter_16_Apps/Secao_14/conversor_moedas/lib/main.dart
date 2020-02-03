import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:async';
import 'dart:convert';

const GET_MOEDAS = "https://economia.awesomeapi.com.br/all/USD-BRL,EUR-BRL,";

void main() async {

  runApp(
		MaterialApp(
			home: Home(),
      theme: ThemeData(
        hintColor: Colors.amber,
        primaryColor: Colors.white
      ),
		)
	);
}

Future<Map> getData() async {
  http.Response response = await http.get(GET_MOEDAS);
  return json.decode(response.body);
}

class Home extends StatefulWidget {
  @override
  _HomeState createState() => _HomeState();
}

class _HomeState extends State<Home> {

  double _dolar;
  double _euro;
  final _realController = TextEditingController();
  final _dolarController = TextEditingController();
  final _euroController = TextEditingController();


  void _realChanged(String value) {
    if(value.isEmpty) {
      _clearAll();
      return;
    }
    double real = double.parse(value);
    _dolarController.text = (real / _dolar).toStringAsFixed(2);
    _euroController.text = (real / _euro).toStringAsFixed(2);
  }

  void _dolarChanged(String value) {
    if(value.isEmpty) {
      _clearAll();
      return;
    }
    double dolar = double.parse(value);
    _euroController.text = (dolar * _dolar / _euro).toStringAsFixed(2);
    _realController.text = (dolar * _dolar).toStringAsFixed(2);
  }

  void _euroChanged(String value) {
    if(value.isEmpty) {
      _clearAll();
      return;
    }
    double euro = double.parse(value);
    _dolarController.text = (euro * _euro / _dolar).toStringAsFixed(2);
    _realController.text = (euro * _euro).toStringAsFixed(2);
  }

  void _clearAll() {
    _realController.text = "";
    _dolarController.text = "";
    _euroController.text = "";
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
				title: Text("\$ Conversor de Moedas \$",
          style: TextStyle(
            color: Colors.black,
            fontSize: 20.0
          )
        ),
				centerTitle: true,
				backgroundColor: Colors.amber
			),
      backgroundColor: Colors.black,
      body: FutureBuilder<Map>(
        future: getData(),
        builder: (context, snapshot) {
          switch(snapshot.connectionState) {
            case ConnectionState.none:
            case ConnectionState.waiting:
              return Center(
                child: Text("Carregando dados...",
                  style: TextStyle(
                    color: Colors.amber,
                    fontSize: 20.0,
                    fontWeight: FontWeight.bold,
                  ),
                  textAlign: TextAlign.center,
                )
              );
            default:
              if(snapshot.hasError) {
                return Center(
                  child: Text("Erro ao carregar os dados!",
                    style: TextStyle(
                      color: Colors.amber,
                      fontSize: 20.0,
                      fontWeight: FontWeight.bold,
                    ),
                    textAlign: TextAlign.center,
                  )
                );
              } else {
                _dolar = double.parse(snapshot.data["USD"]["high"]);
                _euro = double.parse(snapshot.data["EUR"]["high"]);

                return SingleChildScrollView(
                  padding: EdgeInsets.all(15.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: <Widget>[
                      Padding(
                        padding: EdgeInsets.only(top: 15.0, bottom: 15.0),
                        child: Icon(
                          Icons.monetization_on,
                          size: 120.0,
                          color: Colors.amber
                        )
                      ),
                      buildTextField("Reais", "R\$", _realController, _realChanged),
                      buildTextField("Dólares", "US\$", _dolarController, _dolarChanged),
                      buildTextField("Euros", "€", _euroController, _euroChanged)
                    ]
                  )
                );

              } 
          }
        }
      )
    );
  }
}

Widget buildTextField(String label, String prefix, TextEditingController textController, Function changed) {
  return Padding(
    padding: EdgeInsets.only(top: 15.0, bottom: 15.0),
    child: TextField(
      onChanged: (value) => changed(value),
      controller: textController,
      cursorColor: Colors.amber,
      keyboardType: TextInputType.numberWithOptions(decimal: true),
      decoration: InputDecoration(
        prefixText: "${prefix} ",
        labelText: label,
        labelStyle: TextStyle(color: Colors.amber),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.all(Radius.circular(5.0)),
          borderSide: BorderSide(
            color: Colors.amber,
            width: 1.0,
            style: BorderStyle.solid
          )
        ),
        prefixIcon: Icon(
          Icons.attach_money, 
          size: 18.0, 
          semanticLabel: "Valor monetário em ${label}", 
          color: Colors.amber
        )
      ),                          
      textAlign: TextAlign.left,
      style: TextStyle(color: Colors.amber, fontSize: 17.0)
    )
  );
}