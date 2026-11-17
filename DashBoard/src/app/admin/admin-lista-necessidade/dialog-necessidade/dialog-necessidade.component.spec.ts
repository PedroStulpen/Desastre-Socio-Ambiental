import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogNecessidadeComponent } from './dialog-necessidade.component';

describe('DialogNecessidadeComponent', () => {
  let component: DialogNecessidadeComponent;
  let fixture: ComponentFixture<DialogNecessidadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogNecessidadeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogNecessidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
