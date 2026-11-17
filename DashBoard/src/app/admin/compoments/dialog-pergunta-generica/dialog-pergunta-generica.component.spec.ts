import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPerguntaGenericaComponent } from './dialog-pergunta-generica.component';

describe('DialogPerguntaGenericaComponent', () => {
  let component: DialogPerguntaGenericaComponent;
  let fixture: ComponentFixture<DialogPerguntaGenericaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogPerguntaGenericaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPerguntaGenericaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
