angular.module('lista-telefonica', [])

.controller('listaTelefonicaController', function($scope){
    
    $scope.appName = "Lista Telefônica";
    $scope.titleContatos = "Contatos";
    $scope.titleForm = "Cadastro de Contatos";
    $scope.titleAddButton = "Adicionar Contato";
    $scope.titleDelButton = "Excluir Contato";
    $scope.contatos = [
        {nome: "Caio César", telefone: "991199683"},
        {nome: "Vitor Calazans", telefone: "9911232090"},
        {nome: "Marli Lopes", telefone: "991146326"}
    ];
    $scope.operadoras = [
        {nome: "Oi", codigo: 14, categoria: "Móvel"},
        {nome: "Vivo", codigo: 15, categoria: "Móvel"},
        {nome: "Tim", codigo: 41, categoria: "Móvel"},
        {nome: "NET", codigo: 27, categoria: "Fixo"},
        {nome: "GVT", codigo: 25, categoria: "Fixo"},
        {nome: "Embratel", codigo: 21, categoria: "Fixo"}
    ];
    
    $scope.adicionarContato = function(contato){
        $scope.contatos.push(angular.copy(contato));
        delete $scope.contato;
    };

    $scope.excluirContato = function(contatos){
        $scope.contatos = contatos.filter(function(contato){
            if(!contato.selecionado) return contato;
        });
    };  
})