import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MisPreguntasComponent } from './mis-preguntas.component';

describe('MisPreguntasComponent', () => {
  let component: MisPreguntasComponent;
  let fixture: ComponentFixture<MisPreguntasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisPreguntasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisPreguntasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
