import { TestBed } from '@angular/core/testing';

import { AdminListaExcedenteService } from './admin-lista-excedente.service';

describe('AdminListaExcedenteService', () => {
  let service: AdminListaExcedenteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminListaExcedenteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
