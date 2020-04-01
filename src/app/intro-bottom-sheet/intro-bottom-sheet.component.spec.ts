import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroBottomSheetComponent } from './intro-bottom-sheet.component';

describe('IntroBottomSheetComponent', () => {
  let component: IntroBottomSheetComponent;
  let fixture: ComponentFixture<IntroBottomSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IntroBottomSheetComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntroBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
