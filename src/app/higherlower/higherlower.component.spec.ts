import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HigherlowerComponent } from './higherlower.component';

describe('HigherlowerComponent', () => {
  let component: HigherlowerComponent;
  let fixture: ComponentFixture<HigherlowerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HigherlowerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HigherlowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
