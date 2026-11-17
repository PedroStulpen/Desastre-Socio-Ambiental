import { TestBed } from '@angular/core/testing';

import { AdminListaNecessidadeService } from './admin-lista-necessidade.service';

describe('AdminListaNecessidadeService', () => {
  let service: AdminListaNecessidadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminListaNecessidadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
