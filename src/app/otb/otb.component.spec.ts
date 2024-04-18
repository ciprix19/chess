import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtbComponent } from './otb.component';

describe('OtbComponent', () => {
  let component: OtbComponent;
  let fixture: ComponentFixture<OtbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OtbComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OtbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
