import {
  Component,
  OnInit,
  Inject,
  ViewChild,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';

@Component({
  selector: 'app-password-generator-dialog',
  templateUrl: './password-generator-dialog.component.html',
  styleUrls: ['./password-generator-dialog.component.scss'],
})
export class PasswordGeneratorDialogComponent implements OnInit, AfterViewInit {
  constructor(
    private dialogRef: MatDialogRef<PasswordGeneratorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private changeDetector: ChangeDetectorRef,
    private snackBar: MatSnackBar
  ) {}

  @ViewChild('passwordField') passwordField;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.passwordField.nativeElement.focus();
    this.passwordField.nativeElement.select();
    this.changeDetector.detectChanges();
  }

  copyAndClose(event): void {
    event.preventDefault();
    this.passwordField.nativeElement.focus();
    this.passwordField.nativeElement.select();
    navigator.clipboard
      .writeText(this.passwordField.nativeElement.value)
      .then(() => {
        this.passwordField.nativeElement.value = '';
        this.snackBar.openFromComponent(SnackBarComponent, {
          data: {
            message: 'Site password copied to clipbard.',
            duration: 2000,
          },
          duration: 2000,
        });
        this.dialogRef.close();
      });
  }
}
