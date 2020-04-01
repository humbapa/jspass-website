import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-options-bottom-sheet',
  templateUrl: './options-bottom-sheet.component.html',
  styleUrls: ['./options-bottom-sheet.component.scss'],
})
export class OptionsBottomSheetComponent implements OnInit {
  constructor(
    private bottomSheetRef: MatBottomSheetRef<OptionsBottomSheetComponent>,
    private router: Router
  ) {}

  ngOnInit(): void {}

  gotoOptions(event: Event): void {
    event.preventDefault();
    this.bottomSheetRef.dismiss();
    this.router.navigate(['/options']);
  }
}
