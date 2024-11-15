import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearmedicoComponent } from './crearmedico.component';

describe('CrearmedicoComponent', () => {
  let component: CrearmedicoComponent;
  let fixture: ComponentFixture<CrearmedicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrearmedicoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearmedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
