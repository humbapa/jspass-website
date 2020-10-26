import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroBottomSheetComponent } from './intro-bottom-sheet.component';

import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';

describe('IntroBottomSheetComponent', () => {
  let component: IntroBottomSheetComponent;
  let fixture: ComponentFixture<IntroBottomSheetComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [IntroBottomSheetComponent],
        providers: [
          { provide: MatBottomSheetRef, useValue: {} },
          { provide: Router, useValue: {} },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(IntroBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
