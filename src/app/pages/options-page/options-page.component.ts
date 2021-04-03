import { Component, OnInit, OnDestroy } from '@angular/core';
import { VERSION, OptionsService } from '../../services/options.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-options',
  templateUrl: './options-page.component.html',
  styleUrls: ['./options-page.component.scss'],
})
export class OptionsPageComponent implements OnInit, OnDestroy {
  versionOne = VERSION.one;
  versionTwo = VERSION.two;
  selectedTab = 0;

  private unsubscribeVersion: Subject<void> = new Subject();

  constructor(private optionsService: OptionsService) {}

  ngOnInit(): void {
    this.optionsService.observedVersion
      .pipe(takeUntil(this.unsubscribeVersion))
      .subscribe((version) => {
        switch (version) {
          case VERSION.one:
            this.selectedTab = 1;
            break;
          case VERSION.two:
            this.selectedTab = 0;
            break;
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribeVersion.next();
    this.unsubscribeVersion.complete();
  }
}
