import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearhorarioComponent } from './crearhorario.component';

describe('CrearhorarioComponent', () => {
  let component: CrearhorarioComponent;
  let fixture: ComponentFixture<CrearhorarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrearhorarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearhorarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
