import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogExcedenteComponent } from './dialog-excedente.component';

describe('DialogExcedenteComponent', () => {
  let component: DialogExcedenteComponent;
  let fixture: ComponentFixture<DialogExcedenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogExcedenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogExcedenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
