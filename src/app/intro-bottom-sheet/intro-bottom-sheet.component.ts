import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-intro-bottom-sheet',
  templateUrl: './intro-bottom-sheet.component.html',
  styleUrls: ['./intro-bottom-sheet.component.scss'],
})
export class IntroBottomSheetComponent implements OnInit {
  constructor(
    private bottomSheetRef: MatBottomSheetRef<IntroBottomSheetComponent>,
    private router: Router
  ) {}

  ngOnInit(): void {}

  gotoOptions(event: Event): void {
    event.preventDefault();
    this.bottomSheetRef.dismiss();
    this.router.navigate(['/options']);
  }
}
