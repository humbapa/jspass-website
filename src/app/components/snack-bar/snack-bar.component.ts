import { Component, OnInit, Inject } from '@angular/core';
import {
  MatSnackBarRef,
  MAT_SNACK_BAR_DATA,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss'],
})
export class SnackBarComponent implements OnInit {
  duration = 2000;
  message = '';
  icon = 'thumb_up';
  progressValue = 0;
  private animationStart: number;

  constructor(
    private snackBarRef: MatSnackBarRef<SnackBarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) private data: any
  ) {}

  ngOnInit(): void {
    this.message = this.data.message;
    if (this.data.icon) {
      this.icon = this.data.icon;
    }

    if (this.data.duration) {
      this.duration = this.data.duration;
    }

    window.requestAnimationFrame(() => {
      this.animationStart = Date.now();
      this.updateDuration();
    });
  }

  dismiss(): void {
    this.snackBarRef.dismiss();
  }

  private updateDuration(): void {
    const animationDuration = Date.now() - this.animationStart;
    this.progressValue = (100 / this.duration) * animationDuration;
    if (this.progressValue <= 100) {
      window.requestAnimationFrame(() => {
        this.updateDuration();
      });
    } else {
      this.progressValue = 100;
    }
  }
}
