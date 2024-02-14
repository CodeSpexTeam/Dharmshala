import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembereditformComponent } from './membereditform.component';

describe('MembereditformComponent', () => {
  let component: MembereditformComponent;
  let fixture: ComponentFixture<MembereditformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembereditformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MembereditformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
