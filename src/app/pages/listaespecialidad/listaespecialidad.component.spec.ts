import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaespecialidadComponent } from './listaespecialidad.component';

describe('ListaespecialidadComponent', () => {
  let component: ListaespecialidadComponent;
  let fixture: ComponentFixture<ListaespecialidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaespecialidadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaespecialidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
