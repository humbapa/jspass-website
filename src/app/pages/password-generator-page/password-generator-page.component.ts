import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { OptionsService, VERSION } from '../../services/options.service';
import { IntroBottomSheetComponent } from '../../components/intro-bottom-sheet/intro-bottom-sheet.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-password-generator-page',
  templateUrl: './password-generator-page.component.html',
  styleUrls: ['./password-generator-page.component.scss'],
})
export class PasswordGeneratorPageComponent implements OnInit, OnDestroy {
  showV1 = false;
  showV2 = false;

  private unsubscribeVersion: Subject<void> = new Subject();

  constructor(
    private optionsService: OptionsService,
    private bottomSheet: MatBottomSheet
  ) {}

  ngOnInit(): void {
    this.optionsService.observedVersion
      .pipe(takeUntil(this.unsubscribeVersion))
      .subscribe((version) => {
        if (version === VERSION.ONE) {
          this.showV1 = true;
        } else {
          this.showV1 = false;
        }

        if (version === VERSION.TWO) {
          this.showV2 = true;
        } else {
          this.showV2 = false;
        }

        if (this.optionsService.getOptionsForVersion(version) === null) {
          this.bottomSheet.open(IntroBottomSheetComponent);
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribeVersion.next();
    this.unsubscribeVersion.complete();
  }
}
