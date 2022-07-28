import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivdadComponent } from './activdad.component';

describe('ActivdadComponent', () => {
  let component: ActivdadComponent;
  let fixture: ComponentFixture<ActivdadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivdadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivdadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
