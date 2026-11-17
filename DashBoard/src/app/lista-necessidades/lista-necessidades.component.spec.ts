import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaNecessidadesComponent } from './lista-necessidades.component';

describe('ListaNecessidadesComponent', () => {
  let component: ListaNecessidadesComponent;
  let fixture: ComponentFixture<ListaNecessidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaNecessidadesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaNecessidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
