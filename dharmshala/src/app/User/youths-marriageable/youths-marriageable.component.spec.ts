import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YouthsMarriageableComponent } from './youths-marriageable.component';

describe('YouthsMarriageableComponent', () => {
  let component: YouthsMarriageableComponent;
  let fixture: ComponentFixture<YouthsMarriageableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YouthsMarriageableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YouthsMarriageableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
