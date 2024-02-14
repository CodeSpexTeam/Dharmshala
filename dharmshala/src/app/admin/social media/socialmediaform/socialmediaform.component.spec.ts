import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialmediaformComponent } from './socialmediaform.component';

describe('SocialmediaformComponent', () => {
  let component: SocialmediaformComponent;
  let fixture: ComponentFixture<SocialmediaformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocialmediaformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocialmediaformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
