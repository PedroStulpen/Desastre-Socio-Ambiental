import { TestBed } from '@angular/core/testing';

import { ListaNecessidadesService } from './lista-necessidades.service';

describe('ListaNecessidadesService', () => {
  let service: ListaNecessidadesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListaNecessidadesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
