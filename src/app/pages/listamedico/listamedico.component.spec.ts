import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListamedicoComponent } from './listamedico.component';

describe('ListamedicoComponent', () => {
  let component: ListamedicoComponent;
  let fixture: ComponentFixture<ListamedicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListamedicoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListamedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
