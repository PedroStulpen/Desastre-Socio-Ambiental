import { TestBed } from '@angular/core/testing';

import { AdminItensService } from './admin-itens.service';

describe('AdminItensService', () => {
  let service: AdminItensService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminItensService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
