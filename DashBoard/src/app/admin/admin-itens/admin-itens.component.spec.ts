import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminItensComponent } from './admin-itens.component';

describe('AdminItensComponent', () => {
  let component: AdminItensComponent;
  let fixture: ComponentFixture<AdminItensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminItensComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminItensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
