import { Component, OnInit } from "@angular/core";

import { CalculadoraService } from "../services";

@Component({
  selector: "app-calculadora",
  templateUrl: "./calculadora.component.html",
  styleUrls: ["./calculadora.component.scss"]
})
export class CalculadoraComponent implements OnInit {
  private num1: string;
  private num2: string;
  private resultado: number;
  private operacao: string;

  constructor(private calculadoraService: CalculadoraService) {}

  ngOnInit(): void {
    this.limpar();
  }

  /**
   * Inicializa todos os operadores para os valores padrões.
   *
   * @returns void
   */
  limpar(): void {
    this.num1 = "0";
    this.num2 = null;
    this.resultado = null;
    this.operacao = null;
  }

  /**
   * Adiciona o número selecionado para o cálculo posteriormente.
   *
   * @param string numero
   * @returns void
   */

  adicionaNumero(numero: string): void {
    !this.operacao
      ? (this.num1 = this.concatenaNumero(this.num1, numero))
      : (this.num2 = this.concatenaNumero(this.num2, numero));
  }

  /**
   * Retorna o valor concatenado. Tratando o separador decimal.
   *
   * @param string numAtual
   * @param string numConcat
   * @returns string
   */
  concatenaNumero(numAtual: string, numConcat: string): string {
    //Caso contenha apenas '0' ou null, reinicia o valor.
    if (numAtual === "0" || numAtual === null) numAtual = "";
    // Primeiro digito é '.', concatena '0' antes do ponto.
    if (numConcat === "." && numAtual === "") return "0.";
    // Caso '.' digitado e já contenha um '.', apenas retorna.
    if (numConcat === "." && numAtual.indexOf(".") > -1) return numAtual;

    return numAtual + numConcat;
  }

  /**
   * Executa lógica quando um operador for selecionado.
   * Caso já possua uma operação selecionada, executa a
   * operação anterior e define a nova operação.
   *
   * @param string operacao
   * @returns void
   */
  definirOperacao(operacao: string): void {
    // Apenas define a operação caso não exista uma.
    if (!this.operacao) {
      this.operacao = operacao;
      return;
    }
    // Caso operação definida e número 2 selecionado, efetua o cálculo da operação.
    this.num2 && (
      (this.resultado = this.calculadoraService.calcular(
        parseFloat(this.num1),
        parseFloat(this.num2),
        this.operacao
      )),
      (this.operacao = operacao),
      (this.num1 = this.resultado.toString()),
      (this.num2 = null),
      (this.resultado = null)
    );
  }

  /**
   * Efetua o cálculo de uma operação.
   * 
   * @returns void
   */
  calcular(): void {
    if(!this.num2) return;
    this.resultado = this.calculadoraService.calcular(
      parseFloat(this.num1),
      parseFloat(this.num2),
      this.operacao
    );
  }

  /**
   * Retorna o valor a ser exibido na tela de calculadora.
   * 
   * @returns string
   */
  get display(): string {
    if(this.resultado) return this.resultado.toString();
    if(this.num2) return this.num2;
    return this.num1;
  }
}
