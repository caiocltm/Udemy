<?php
// Conhecendo os Tipos de Dados em PHP.

// Padrão Camel Case: AnoNascimento, NomeFuncionario, DinheiroSaque.
$AnoNascimento = "1995";
$NomeFuncionario = "Caio César Lopes";
$DinheiroSaque = 123.54;

// Usa-se '.' ou ',' para efetuar concatenações entre strings.
echo '<br/>Nome: ' . $NomeFuncionario . '<br/>Ano de Nascimento: ' . $AnoNascimento . '<br/>Dinheiro Sacado: R$ ' . $DinheiroSaque;

// Unset: Apaga os dados armazenados em uma ou várias variáveis.
unset($NomeFuncionario, $AnoNascimento, $DinheiroSaque);

/* Isset: Função de verificação de variáveis, para saber se a mesma está definida 
   com algum tipo de dado ou não (True or False). */
if(isset($AnoNascimento, $NomeFuncionario, $DinheiroSaque)) {
    echo '<br/>Nome: ' . $NomeFuncionario . '<br/>Ano de Nascimento: ' . $AnoNascimento . '<br/>Dinheiro Sacado: R$ ' . $DinheiroSaque;
} else {
    echo '<br/><br/>Variáveis indefinidas!';
}

echo '<br/><br/>';

// -------------------------------------------------------------------------------------------

// Tipos de Dados - Primitivo: String.
$nome = "HCode Treinamentos";
echo var_dump($nome);

echo '<br/><br/>';

// Tipos de Dados - Primitivo: Int.
$ano = 1995;
echo var_dump($ano);

echo '<br/><br/>';

// Tipos de Dados - Primitivo: Float.
$valor = 78213.98;
echo var_dump($valor);

echo '<br/><br/>';

// Tipos de Dados - Primitivo: Bool.
$condicao = false;
echo var_dump($condicao);

echo '<br/><br/>';

// Tipos de Dados - Composto: Array.
$frutas = Array("Manga", "Uva", "Abacaxi", "Kiwi");
echo var_dump($frutas);

echo '<br/><br/>';

//Tipo de Dados - Composto: Object.
$nascimento = new DateTime();
echo var_dump($nascimento);

echo '<br/><br/>';

// Tipo de Dados: Nulo
$variavel = null;
echo var_dump($variavel);

echo '<br/><br/>';

//Tipo de Dados: Vazio
$variavel = '';
echo var_dump($variavel);

?>