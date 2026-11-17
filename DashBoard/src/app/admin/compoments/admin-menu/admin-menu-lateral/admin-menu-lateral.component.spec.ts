import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMenuLateralComponent } from './admin-menu-lateral.component';

describe('AdminMenuLateralComponent', () => {
  let component: AdminMenuLateralComponent;
  let fixture: ComponentFixture<AdminMenuLateralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminMenuLateralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMenuLateralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
