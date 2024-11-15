import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarmedicoComponent } from './actualizarmedico.component';

describe('ActualizarmedicoComponent', () => {
  let component: ActualizarmedicoComponent;
  let fixture: ComponentFixture<ActualizarmedicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActualizarmedicoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActualizarmedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
