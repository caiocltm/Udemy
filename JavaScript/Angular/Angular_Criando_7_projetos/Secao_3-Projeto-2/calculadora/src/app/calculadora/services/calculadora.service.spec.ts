import { TestBed } from '@angular/core/testing';

import { CalculadoraService } from './calculadora.service';

describe('CalculadoraService', () => {
  let service: CalculadoraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculadoraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be 1 + 4 = 5', () => {
    let soma = service.calcular(1, 4, '+');
    expect(soma).toEqual(5);
  });

  it('should be 1 - 4 = -3', () => {
    let subtracao = service.calcular(1, 4, '-');
    expect(subtracao).toEqual(-3);
  });

  it('should be 1 * 4 = 4', () => {
    let multiplicacao = service.calcular(1, 4, '*');
    expect(multiplicacao).toEqual(4);
  });

  it('should be 4 / 2 = 2', () => {
    let divisao = service.calcular(4, 2, '/');
    expect(divisao).toEqual(2);
  });

  it('should be 0 for invalid operation', () => {
    let invalidOperation = service.calcular(4, 2, '&');
    expect(invalidOperation).toEqual(0);
  });
  
});
