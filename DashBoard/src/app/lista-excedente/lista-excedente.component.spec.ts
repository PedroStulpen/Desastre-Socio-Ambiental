import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaExcedenteComponent } from './lista-excedente.component';

describe('ListaExcedenteComponent', () => {
  let component: ListaExcedenteComponent;
  let fixture: ComponentFixture<ListaExcedenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaExcedenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaExcedenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
