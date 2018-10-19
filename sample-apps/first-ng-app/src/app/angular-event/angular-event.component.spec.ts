import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularEventComponent } from './angular-event.component';

describe('AngularEventComponent', () => {
  let component: AngularEventComponent;
  let fixture: ComponentFixture<AngularEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
