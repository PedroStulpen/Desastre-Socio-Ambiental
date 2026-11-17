import { TestBed } from '@angular/core/testing';

import { ListaExcedenteService } from './lista-excedente.service';

describe('ListaExcedenteService', () => {
  let service: ListaExcedenteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListaExcedenteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
