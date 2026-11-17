import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAdminItemComponent } from './dialog-admin-item.component';

describe('DialogAdminItemComponent', () => {
  let component: DialogAdminItemComponent;
  let fixture: ComponentFixture<DialogAdminItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAdminItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAdminItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
