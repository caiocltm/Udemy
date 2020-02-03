import 'package:flutter/material.dart';

void main() {
  runApp(
		MaterialApp(
			home: Home(),
		)
	);
}

class Home extends StatefulWidget {
	@override
	_HomeState createState() => _HomeState();
}

class _HomeState extends State<Home> {

	GlobalKey<FormState> _formKey = GlobalKey<FormState>();
	TextEditingController weightController = TextEditingController();
	TextEditingController heightController = TextEditingController();
	String _infoIMC = "Informe seus dados!";

	void _resetFields(){
		weightController.text = "";
		heightController.text = "";
		setState(() {
			_infoIMC = "Informe seus dados!";
			_formKey = GlobalKey<FormState>();    // ADICIONE ESTA LINHA!
		});
	}

	void _calcularIMC() {
		/*
			MENOR QUE 18,5	MAGREZA	0
			ENTRE 18,5 E 24,9	NORMAL	0
			ENTRE 25,0 E 29,9	SOBREPESO	I
			ENTRE 30,0 E 39,9	OBESIDADE	II
			MAIOR QUE 40,0	OBESIDADE GRAVE	III 
		*/
		double weight = double.parse(weightController.text.replaceAll(',', '.'));
		double heigth = double.parse(heightController.text.replaceAll(',', '.'));
		double imc = (weight / (heigth * heigth));

		setState(() {  
			if(imc < 18.5) _infoIMC = "Magreza (${imc.toStringAsPrecision(4)})";
			if(imc >= 18.5 && imc <= 24.9) _infoIMC = "Normal (${imc.toStringAsPrecision(4)})";
			if(imc >= 25.0 && imc <= 29.9) _infoIMC = "Sobrepeso I (${imc.toStringAsPrecision(4)})";
			if(imc >= 30.0 && imc <= 39.9) _infoIMC = "Obesidade I (${imc.toStringAsPrecision(4)})";
			if(imc > 40.0) _infoIMC = "Obesidade Grave II (${imc.toStringAsPrecision(4)})";
		});
	}

	@override
	Widget build(BuildContext context) {
		return Scaffold(
			appBar: AppBar(
				title: Text("Calculadora de IMC"),
				centerTitle: true,
				backgroundColor: Colors.green,
				actions: <Widget>[
					IconButton(
						icon: Icon(Icons.refresh), 
						onPressed: () => _resetFields()
					)
				],
			),
			backgroundColor: Colors.white,
			body: SingleChildScrollView(
				padding: EdgeInsets.all(15.0),
				child: Form(
					key: _formKey,
					child: Column(
						crossAxisAlignment: CrossAxisAlignment.stretch,
						children: <Widget>[
							Icon(
								Icons.person,
								size: 120.0,
								color: Colors.green,
							),
							TextFormField(
								controller: weightController,
								keyboardType: TextInputType.number,
								decoration: InputDecoration(
									labelText: "Peso (Kg)",
									labelStyle: TextStyle(color: Colors.green)
								),
								textAlign: TextAlign.center,
								style: TextStyle(color: Colors.green, fontSize: 18.0),
								validator: (value) {
									if(value.isEmpty) return "Insira seu peso!";
								}
							),
							TextFormField(
								controller: heightController,
								keyboardType: TextInputType.number,
								decoration: InputDecoration(
									labelText: "Altura (Cm)",
									labelStyle: TextStyle(color: Colors.green)
								),
								textAlign: TextAlign.center,
								style: TextStyle(color: Colors.green, fontSize: 18.0),
								validator: (value) {
									if(value.isEmpty) return "Insira sua altura!";
								}
							),
							Padding(
								padding: EdgeInsets.only(top: 30.0, bottom: 30.0),
								child: Container(
									height: 50.0,
									child: RaisedButton(
										onPressed: () {
											if(_formKey.currentState.validate()) _calcularIMC();
										},
										child: Text("Calcular", style: TextStyle(color: Colors.white, fontSize: 18.0)),
										color: Colors.green
									)
								)
							),
							Text(_infoIMC,
								textAlign: TextAlign.center,
								style: TextStyle(color: Colors.green, fontSize: 20.0)
							)
						]
					)
				)
			)
		);
	}
}