import { TestBed } from '@angular/core/testing';

import { AdminPerfilService } from './admin-perfil.service';

describe('AdminPerfilService', () => {
  let service: AdminPerfilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminPerfilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
