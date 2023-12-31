import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDepartmentComponent } from './list-department.component';

describe('ListDepartmentComponent', () => {
  let component: ListDepartmentComponent;
  let fixture: ComponentFixture<ListDepartmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListDepartmentComponent]
    });
    fixture = TestBed.createComponent(ListDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
