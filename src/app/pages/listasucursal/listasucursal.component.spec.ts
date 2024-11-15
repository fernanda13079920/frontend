import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListasucursalComponent } from './listasucursal.component';

describe('ListasucursalComponent', () => {
  let component: ListasucursalComponent;
  let fixture: ComponentFixture<ListasucursalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListasucursalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListasucursalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
