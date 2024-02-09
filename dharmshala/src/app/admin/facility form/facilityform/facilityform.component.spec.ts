import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityformComponent } from './facilityform.component';

describe('FacilityformComponent', () => {
  let component: FacilityformComponent;
  let fixture: ComponentFixture<FacilityformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacilityformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacilityformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
