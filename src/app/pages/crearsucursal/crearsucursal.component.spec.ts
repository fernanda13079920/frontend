import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearsucursalComponent } from './crearsucursal.component';

describe('CrearsucursalComponent', () => {
  let component: CrearsucursalComponent;
  let fixture: ComponentFixture<CrearsucursalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrearsucursalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearsucursalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
