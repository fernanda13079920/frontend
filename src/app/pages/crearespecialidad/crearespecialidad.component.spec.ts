import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearespecialidadComponent } from './crearespecialidad.component';

describe('CrearespecialidadComponent', () => {
  let component: CrearespecialidadComponent;
  let fixture: ComponentFixture<CrearespecialidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrearespecialidadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearespecialidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
