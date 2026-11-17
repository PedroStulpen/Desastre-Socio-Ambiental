import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminListaNecessidadeComponent } from './admin-lista-necessidade.component';

describe('AdminListaNecessidadeComponent', () => {
  let component: AdminListaNecessidadeComponent;
  let fixture: ComponentFixture<AdminListaNecessidadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminListaNecessidadeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminListaNecessidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
