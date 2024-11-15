import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerconsultaComponent } from './verconsulta.component';

describe('VerconsultaComponent', () => {
  let component: VerconsultaComponent;
  let fixture: ComponentFixture<VerconsultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerconsultaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerconsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
