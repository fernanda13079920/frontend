import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearconsultaComponent } from './crearconsulta.component';

describe('CrearconsultaComponent', () => {
  let component: CrearconsultaComponent;
  let fixture: ComponentFixture<CrearconsultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrearconsultaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearconsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
