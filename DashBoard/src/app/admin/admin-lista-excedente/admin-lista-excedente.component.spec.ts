import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminListaExcedenteComponent } from './admin-lista-excedente.component';

describe('AdminListaExcedenteComponent', () => {
  let component: AdminListaExcedenteComponent;
  let fixture: ComponentFixture<AdminListaExcedenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminListaExcedenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminListaExcedenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
