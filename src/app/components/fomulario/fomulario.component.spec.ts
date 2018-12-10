import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FomularioComponent } from './fomulario.component';

describe('FomularioComponent', () => {
  let component: FomularioComponent;
  let fixture: ComponentFixture<FomularioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FomularioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FomularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
