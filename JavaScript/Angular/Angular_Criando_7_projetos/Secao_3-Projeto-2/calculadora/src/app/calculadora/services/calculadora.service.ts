/**
 * Serviço responsável por executar operações da calculadora.
 * 
 * @author Caio Menezes<caiocesarlopestelesdemenezes@gmail.com
 * @since 1.0.0
 */
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculadoraService {

  constructor() { }

  /**
   * Calcula dois números dada uma operação matemática.
   * 
   * Operações disponíveis: 
   * '+' (Soma)
   * '-' (Substração)
   * '*' (Multiplicação)
   * '/' (Divisão)
   * 
   * @param num1 number
   * @param num2 number
   * @param operacao string: Operação a ser executada
   * @returns number: Resultado da operação
   */
  calcular(num1: number, num2: number, operacao: string): number {
    const calcular = {
      "+": () => num1 + num2,
      "-": () => num1 - num2,
      "/": () => num1 / num2,
      "*": () => num1 * num2,
      "invalid": () => 0
    };
    return (calcular[operacao] || calcular["invalid"])();
  }
}
