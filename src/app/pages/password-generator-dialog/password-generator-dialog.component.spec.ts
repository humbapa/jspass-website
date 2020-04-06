import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordGeneratorDialogComponent } from './password-generator-dialog.component';

describe('PasswordGeneratorDialogComponent', () => {
  let component: PasswordGeneratorDialogComponent;
  let fixture: ComponentFixture<PasswordGeneratorDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordGeneratorDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordGeneratorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
