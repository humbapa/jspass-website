import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OptionsPageComponent } from './options-page/options-page.component';
import { PasswordGeneratorPageComponent } from './password-generator-page/password-generator-page.component';

const routes: Routes = [
  { path: '', component: PasswordGeneratorPageComponent },
  { path: 'options', component: OptionsPageComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
