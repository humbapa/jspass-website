import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OptionsPageComponent } from './pages/options-page/options-page.component';
import { PasswordGeneratorPageComponent } from './pages/password-generator-page/password-generator-page.component';

const routes: Routes = [
  { path: '', component: PasswordGeneratorPageComponent },
  { path: 'options', component: OptionsPageComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
